#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
import math
import os
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from difflib import SequenceMatcher
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parent.parent
INTAKE_DIR = ROOT / "input-documents"
CONTENT_PROJECTS_DIR = ROOT / "content" / "projects"
CONTENT_ARCHIVE_DIR = ROOT / "content" / "archive"
OUTPUT_DIR = ROOT / "knowledge-platform"
GENERATED_AT = datetime.now(timezone.utc).replace(microsecond=0).isoformat()


CONCEPT_KEYWORDS = {
    "attention": ["attention", "salience", "priority"],
    "wayfinding": ["wayfinding", "navigation", "landmark"],
    "perception": ["perception", "perceptual", "visual perception"],
    "cognition": ["cognition", "cognitive", "mental model", "memory"],
    "typography": ["typography", "letter", "type", "readability"],
    "color": ["color", "colour", "contrast", "palette", "hue"],
    "hierarchy": ["hierarchy", "ranking", "importance"],
    "spacing": ["spacing", "proximity", "separation", "density", "alignment"],
    "composition": ["composition", "layout", "structure", "organization"],
    "evidence": ["evidence", "citation", "source", "registry"],
    "research methodology": ["methodology", "workflow", "research plan"],
    "ontology": ["ontology", "taxonomy", "vocabulary", "genome node"],
    "knowledge graph": ["knowledge graph", "graph", "crosswalk", "relationships"],
    "product design": ["product", "physical controls", "repairability"],
    "component architecture": ["component", "design system", "component library"],
    "human factors": ["human factors", "usability", "human scale", "ergonomics"],
    "architecture": ["architecture", "spatial", "built environment"],
    "learning": ["familiar", "learning", "automaticity"],
}

DISCIPLINE_HINTS = {
    "color": "Color Science",
    "typography": "Typography",
    "product design": "Industrial Design",
    "architecture": "Architecture",
    "component architecture": "Software Engineering",
    "knowledge graph": "Knowledge Engineering",
    "research methodology": "Research Methods",
    "perception": "Perception Science",
    "cognition": "Cognitive Science",
    "composition": "Composition Science",
}

DOCUMENT_TYPE_RULES = [
    ("constitution", "governance"),
    ("governance specification", "governance"),
    ("charter", "governance"),
    ("ontology", "ontology"),
    ("genome", "knowledge-model"),
    ("research library", "bibliography"),
    ("evidence registry", "evidence-registry"),
    ("evidence gallery", "evidence-gallery"),
    ("case study", "case-study"),
    ("audit", "audit"),
    ("methodology", "methodology"),
    ("template", "template"),
    ("cross-system design mechanism map", "crosswalk"),
    ("comparative study", "comparative-study"),
    ("foundational documents", "evidence-collection"),
    ("execution package", "research-execution-package"),
    ("framework", "research-framework"),
    ("phase", "phase-report"),
    ("report", "research-report"),
    ("plan", "research-plan"),
]

STATUS_NORMALIZATION = {
    "approved": "approved",
    "draft": "draft",
    "working": "working",
    "working draft": "working-draft",
    "working-draft": "working-draft",
    "research draft": "research-draft",
    "research-draft": "research-draft",
    "research-complete": "research-complete",
    "research-baseline": "research-baseline",
    "active": "active",
    "completed research phase": "completed",
    "initial verified crosswalk": "verified",
    "evidence review — working draft": "research-draft",
    "applied analysis — working draft": "working-draft",
    "verified source register and applied evidence review": "verified",
    "research synthesis": "research-synthesis",
    "research synthesis with falsification log": "research-synthesis",
}

CANONICAL_TITLE_HINTS = (
    "constitution",
    "ontology",
    "genome",
    "methodology",
    "knowledge graph specification",
    "project charter",
    "research library",
    "taxonomy",
    "template",
)

CANONICAL_NEGATIVE_HINTS = (
    "autonomous research",
    "research run",
    "research report",
    "case study",
    "evidence review",
    "comparative study",
)


@dataclass
class Document:
    path: str
    filename: str
    extension: str
    size: int
    created: str
    modified: str
    title: str
    summary: str
    abstract: str
    project: str
    discipline: str
    research_area: str
    document_type: str
    status: str
    status_normalized: str
    canonical: bool
    authority_score: float
    importance_score: float
    confidence_score: float
    duplicate_score: float
    duplicate_of: list[str]
    parent: str | None
    children: list[str]
    related_documents: list[str]
    incoming_links: list[str]
    outgoing_links: list[str]
    tags: list[str]
    keywords: list[str]
    existing_metadata: dict[str, Any]
    missing_metadata: list[str]
    suggested_location: str
    migration_action: str
    migration_reason: str
    word_count: int
    headings: list[str]
    concepts: list[str]


def ensure_dirs() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def stat_iso(ts: float) -> str:
    return datetime.fromtimestamp(ts, timezone.utc).replace(microsecond=0).isoformat()


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug or "untitled"


def parse_frontmatter(text: str) -> tuple[dict[str, Any], str]:
    if not text.startswith("---\n"):
        return {}, text

    lines = text.splitlines()
    frontmatter_lines: list[str] = []
    end_index = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            end_index = idx
            break
        frontmatter_lines.append(lines[idx])

    if end_index is None:
        return {}, text

    data: dict[str, Any] = {}
    i = 0
    while i < len(frontmatter_lines):
        line = frontmatter_lines[i]
        if not line.strip():
            i += 1
            continue
        if re.match(r"^[A-Za-z0-9_]+:\s*$", line):
            key = line.split(":", 1)[0].strip()
            items: list[str] = []
            i += 1
            while i < len(frontmatter_lines):
                nested = frontmatter_lines[i]
                stripped = nested.strip()
                if stripped.startswith("- "):
                    items.append(stripped[2:].strip().strip('"'))
                    i += 1
                    continue
                if nested.startswith("  ") or nested.startswith("\t"):
                    items.append(stripped.strip('"'))
                    i += 1
                    continue
                break
            data[key] = items
            continue
        if ": |" in line or line.rstrip().endswith(": |"):
            key = line.split(":", 1)[0].strip()
            block: list[str] = []
            i += 1
            while i < len(frontmatter_lines):
                nested = frontmatter_lines[i]
                if nested.startswith("  "):
                    block.append(nested[2:])
                    i += 1
                    continue
                if not nested.strip():
                    block.append("")
                    i += 1
                    continue
                break
            data[key] = "\n".join(block).strip()
            continue
        if ":" in line:
            key, value = line.split(":", 1)
            data[key.strip()] = value.strip().strip('"')
        i += 1

    body = "\n".join(lines[end_index + 1 :]).lstrip("\n")
    return data, body


def extract_title(meta: dict[str, Any], body: str, filename: str) -> str:
    if isinstance(meta.get("title"), str) and meta["title"].strip():
        return meta["title"].strip()
    for line in body.splitlines():
        if line.startswith("# "):
            return line[2:].strip()
    return filename.rsplit(".", 1)[0].replace("_", " ")


def extract_headings(body: str) -> list[str]:
    headings = []
    for line in body.splitlines():
        if re.match(r"^#{1,6}\s+\S", line):
            headings.append(re.sub(r"^#{1,6}\s+", "", line).strip())
    return headings


def first_nonempty_paragraph(body: str) -> str:
    paragraphs = re.split(r"\n\s*\n", body)
    for paragraph in paragraphs:
        cleaned = " ".join(line.strip() for line in paragraph.splitlines()).strip()
        if cleaned and not cleaned.startswith("#"):
            return cleaned
    return ""


def infer_project(meta: dict[str, Any], filename: str, text: str) -> str:
    project = meta.get("project")
    related_projects = meta.get("related_projects", [])
    title = str(meta.get("title", ""))
    research_area = str(meta.get("research_area", ""))

    joined_related = " ".join(related_projects) if isinstance(related_projects, list) else str(related_projects)
    haystack = " ".join([filename, text[:1000], title, research_area, joined_related])

    if any(token in haystack for token in ["Design Library", "Component Library", "RP-CLF-", "semantic durability"]):
        return "Design Library"
    if any(token in haystack for token in ["Product_Genome", "Product Genome", "RP-PROD-"]):
        return "Product Genome"
    if any(token in haystack for token in ["Project_Atlas", "Project Atlas", "ATLAS-", "REP-ATLAS", "DF-ATLAS", "RP-ATLAS"]):
        return "Project Atlas"

    if isinstance(project, str) and project.strip():
        value = project.strip()
        if value.startswith("Project Atlas"):
            return "Project Atlas"
        if value.startswith("Product Genome"):
            return "Product Genome"
        return value
    if "Composition" in filename or "Composition Science" in text:
        return "Composition Science"
    return "Unclassified"


def infer_document_type(meta: dict[str, Any], title: str, filename: str) -> str:
    if isinstance(meta.get("document_type"), str) and meta["document_type"].strip():
        return meta["document_type"].strip()
    haystack = f"{title} {filename}".lower()
    for needle, doc_type in DOCUMENT_TYPE_RULES:
        if needle in haystack:
            return doc_type
    return "research-note"


def infer_status(meta: dict[str, Any]) -> tuple[str, str]:
    raw = str(meta.get("status", "")).strip()
    if not raw:
        return "", "missing"
    normalized = STATUS_NORMALIZATION.get(raw.lower(), raw.lower().replace(" ", "-"))
    return raw, normalized


def extract_keywords(title: str, headings: list[str], summary: str) -> list[str]:
    bag = f"{title}\n" + "\n".join(headings[:12]) + "\n" + summary
    found: set[str] = set()
    lowered = bag.lower()
    for concept, variants in CONCEPT_KEYWORDS.items():
        if any(variant in lowered for variant in variants):
            found.add(concept)
    return sorted(found)


def infer_discipline(concepts: list[str], project: str) -> str:
    for concept in concepts:
        if concept in DISCIPLINE_HINTS:
            return DISCIPLINE_HINTS[concept]
    if "Typography" in project:
        return "Typography"
    if "Composition Science" in project:
        return "Composition Science"
    if "Project Atlas" in project:
        return "Visual Design Research"
    return "General Research"


def infer_research_area(project: str, concepts: list[str]) -> str:
    if concepts:
        return ", ".join(concepts[:3])
    return project


def infer_canonical(title: str, doc_type: str, status_normalized: str) -> bool:
    title_l = title.lower()
    if any(token in title_l for token in CANONICAL_NEGATIVE_HINTS):
        return False
    if any(token in title_l for token in CANONICAL_TITLE_HINTS):
        return True
    return doc_type in {"governance", "ontology", "knowledge-model", "methodology", "bibliography"} and status_normalized != "draft"


def extract_links(body: str, known_paths: list[str], known_names: list[str]) -> list[str]:
    links = set()
    for match in re.findall(r"\[[^\]]+\]\(([^)]+)\)", body):
        target = match.strip()
        if target in known_paths or target in known_names:
            links.add(target)
    for name in known_names:
        if name != Path(name).name and name in body:
            links.add(name)
    return sorted(links)


def score_authority(doc_type: str, canonical: bool, status_normalized: str, has_frontmatter: bool) -> float:
    score = 0.25
    if has_frontmatter:
        score += 0.15
    if canonical:
        score += 0.25
    if doc_type in {"governance", "ontology", "methodology", "knowledge-model"}:
        score += 0.2
    if status_normalized in {"approved", "verified", "research-complete"}:
        score += 0.15
    return round(min(score, 1.0), 2)


def score_importance(word_count: int, concept_count: int, canonical: bool, doc_type: str) -> float:
    score = min(word_count / 5000, 0.35) + min(concept_count / 10, 0.2)
    if canonical:
        score += 0.25
    if doc_type in {"research-report", "governance", "ontology", "knowledge-model"}:
        score += 0.15
    return round(min(score, 1.0), 2)


def score_confidence(has_frontmatter: bool, missing_metadata_count: int, duplicate_score: float) -> float:
    score = 0.4
    if has_frontmatter:
        score += 0.25
    score += max(0, 0.25 - (missing_metadata_count * 0.03))
    score -= duplicate_score * 0.15
    return round(max(0.05, min(score, 1.0)), 2)


def group_key(filename: str) -> str:
    stem = filename.rsplit(".", 1)[0]
    stem = re.sub(r"\s+\d+$", "", stem)
    stem = re.sub(r"_v\d+(?:\.\d+)?$", "", stem, flags=re.IGNORECASE)
    stem = re.sub(r"_\d{3}$", "", stem)
    return stem


def detect_parent(filename: str, groups: dict[str, list[str]]) -> str | None:
    siblings = groups[group_key(filename)]
    if len(siblings) <= 1:
        return None
    versions = sorted(siblings)
    for candidate in reversed(versions):
        if candidate != filename:
            return candidate
    return None


def suggested_location(project: str, doc_type: str, canonical: bool, filename: str) -> str:
    project_slug = slugify(project)
    area = "canonical" if canonical else slugify(doc_type)
    return f"content/projects/{project_slug}/{area}/{slugify(filename.rsplit('.', 1)[0])}.md"


def migration_action_for(doc: Document) -> tuple[str, str]:
    if doc.duplicate_of:
        return "merge", "Exact duplicate content exists; preserve one canonical file and keep the duplicate as lineage history."
    if doc.status_normalized == "missing":
        return "move", "Content is potentially useful but lacks enough metadata to remain in a flat intake directory."
    if doc.canonical:
        return "keep", "Acts as a canonical or governing artifact and should anchor future derived material."
    if doc.document_type in {"phase-report", "research-report", "comparative-study", "case-study", "audit"}:
        return "move", "Valuable derived research that should live under a project and document-type collection."
    return "rename", "Needs normalized naming and metadata before it can participate cleanly in automated indexes."


def build_documents() -> list[Document]:
    paths: list[Path] = []
    for root in [INTAKE_DIR, CONTENT_PROJECTS_DIR, CONTENT_ARCHIVE_DIR]:
        if root.exists():
            paths.extend(
                p
                for p in root.rglob("*")
                if p.is_file()
                and p.suffix.lower() == ".md"
                and not (p.parent == INTAKE_DIR and p.name == "README.md")
            )
    paths = sorted(set(paths))
    known_paths = [str(p.relative_to(ROOT)) for p in paths]
    known_names = [p.name for p in paths]
    text_cache = {p: p.read_text(encoding="utf-8") for p in paths}

    docs: list[Document] = []
    groups = defaultdict(list)
    hashes = defaultdict(list)
    for path in paths:
        groups[group_key(path.name)].append(path.name)
        hashes[hashlib.sha256(text_cache[path].encode("utf-8")).hexdigest()].append(path.name)

    for path in paths:
        stat = path.stat()
        text = text_cache[path]
        meta, body = parse_frontmatter(text)
        title = extract_title(meta, body, path.name)
        headings = extract_headings(body)
        summary = str(meta.get("summary") or meta.get("purpose") or first_nonempty_paragraph(body)).strip()
        abstract = str(meta.get("abstract") or summary).strip()
        project = infer_project(meta, path.name, text)
        document_type = infer_document_type(meta, title, path.name)
        raw_status, status_normalized = infer_status(meta)
        concepts = extract_keywords(title, headings, summary)
        discipline = infer_discipline(concepts, project)
        research_area = infer_research_area(project, concepts)
        canonical = infer_canonical(title, document_type, status_normalized)
        outgoing = extract_links(body, known_paths, known_names)
        duplicate_names = []
        content_hash = hashlib.sha256(text.encode("utf-8")).hexdigest()
        if len(hashes[content_hash]) > 1:
            duplicate_names = sorted(name for name in hashes[content_hash] if name != path.name)
        existing_metadata = meta.copy()
        missing_metadata = [
            field
            for field in ["title", "date", "status", "project", "document_type", "summary", "tags", "id", "version"]
            if field not in meta or meta[field] in ("", [], None)
        ]
        duplicate_score = 1.0 if duplicate_names else 0.0
        authority = score_authority(document_type, canonical, status_normalized, bool(meta))
        importance = score_importance(len(re.findall(r"\b\w+\b", text)), len(concepts), canonical, document_type)
        confidence = score_confidence(bool(meta), len(missing_metadata), duplicate_score)
        doc = Document(
            path=str(path.relative_to(ROOT)),
            filename=path.name,
            extension=path.suffix.lower(),
            size=stat.st_size,
            created=stat_iso(getattr(stat, "st_birthtime", stat.st_ctime)),
            modified=stat_iso(stat.st_mtime),
            title=title,
            summary=summary,
            abstract=abstract,
            project=project,
            discipline=discipline,
            research_area=research_area,
            document_type=document_type,
            status=raw_status,
            status_normalized=status_normalized,
            canonical=canonical,
            authority_score=authority,
            importance_score=importance,
            confidence_score=confidence,
            duplicate_score=duplicate_score,
            duplicate_of=duplicate_names,
            parent=detect_parent(path.name, groups),
            children=[],
            related_documents=[],
            incoming_links=[],
            outgoing_links=outgoing,
            tags=meta.get("tags", []) if isinstance(meta.get("tags"), list) else [],
            keywords=sorted(concepts),
            existing_metadata=existing_metadata,
            missing_metadata=missing_metadata,
            suggested_location=suggested_location(project, document_type, canonical, path.name),
            migration_action="",
            migration_reason="",
            word_count=len(re.findall(r"\b\w+\b", text)),
            headings=headings[:20],
            concepts=concepts,
        )
        docs.append(doc)

    by_name = {doc.filename: doc for doc in docs}
    for doc in docs:
        if doc.parent and doc.parent in by_name:
            by_name[doc.parent].children.append(doc.filename)

    for doc in docs:
        related = set(doc.outgoing_links)
        for other in docs:
            if other.filename == doc.filename:
                continue
            if other.project == doc.project:
                shared = set(doc.concepts) & set(other.concepts)
                if shared:
                    related.add(other.filename)
            if other.filename in doc.duplicate_of:
                related.add(other.filename)
        doc.related_documents = sorted(related)[:12]
        action, reason = migration_action_for(doc)
        doc.migration_action = action
        doc.migration_reason = reason

    for doc in docs:
        for target in doc.outgoing_links:
            target_doc = by_name.get(Path(target).name)
            if target_doc and doc.filename not in target_doc.incoming_links:
                target_doc.incoming_links.append(doc.filename)

    return docs


def repository_stats(docs: list[Document]) -> dict[str, Any]:
    total_size = sum(doc.size for doc in docs)
    core_fields = ["title", "date", "project", "status"]
    metadata_scores = []
    for doc in docs:
        present = sum(1 for field in core_fields if field in doc.existing_metadata and doc.existing_metadata[field] not in ("", [], None))
        metadata_scores.append(present / len(core_fields))
    duplicate_docs = [doc for doc in docs if doc.duplicate_of]
    orphaned = [doc for doc in docs if not doc.related_documents and not doc.incoming_links and not doc.outgoing_links]
    years = Counter(doc.modified[:4] for doc in docs)
    by_project = Counter(doc.project for doc in docs)
    by_type = Counter(doc.document_type for doc in docs)
    by_status = Counter(doc.status_normalized for doc in docs)
    by_discipline = Counter(doc.discipline for doc in docs)
    folder_sizes = Counter(str(Path(doc.path).parent) for doc in docs)

    return {
        "generated_at": GENERATED_AT,
        "total_files": len(docs),
        "file_types": Counter(doc.extension for doc in docs),
        "total_size_bytes": total_size,
        "average_document_size_bytes": round(total_size / len(docs), 2) if docs else 0,
        "average_word_count": round(sum(doc.word_count for doc in docs) / len(docs), 2) if docs else 0,
        "largest_documents": [
            {"filename": doc.filename, "word_count": doc.word_count}
            for doc in sorted(docs, key=lambda item: item.word_count, reverse=True)[:10]
        ],
        "largest_folders": [{"path": path, "count": count} for path, count in folder_sizes.most_common(10)],
        "by_project": by_project,
        "by_document_type": by_type,
        "by_status": by_status,
        "by_discipline": by_discipline,
        "growth_by_year": years,
        "metadata_completeness_ratio": round(sum(metadata_scores) / len(metadata_scores), 2) if metadata_scores else 0,
        "duplicate_ratio": round(len(duplicate_docs) / len(docs), 2) if docs else 0,
        "broken_links": 0,
        "orphaned_documents": [doc.filename for doc in orphaned],
        "canonical_documents": [doc.filename for doc in docs if doc.canonical],
        "generated_documents": [],
    }


def health_assessment(docs: list[Document], stats: dict[str, Any]) -> dict[str, Any]:
    status_vocab = sorted({doc.status for doc in docs if doc.status})
    titleless = [doc.filename for doc in docs if not doc.title]
    no_frontmatter = [doc.filename for doc in docs if not doc.existing_metadata]
    missing_ids = [doc.filename for doc in docs if "id" not in doc.existing_metadata and "document_id" not in doc.existing_metadata]
    duplicate_pairs = sorted(
        {tuple(sorted([doc.filename, duplicate])) for doc in docs for duplicate in doc.duplicate_of}
    )
    return {
        "organizational_quality": "low",
        "naming_consistency": {
            "assessment": "medium",
            "evidence": [
                "Most filenames follow long underscore-separated names, but duplicate suffixes like ' 2' exist.",
                "Version tokens are inconsistent across series and not all canonical files use stable IDs.",
            ],
        },
        "metadata_quality": {
            "assessment": "low",
            "metadata_completeness_ratio": stats["metadata_completeness_ratio"],
            "files_without_frontmatter": no_frontmatter,
            "files_missing_ids": missing_ids,
            "status_vocabulary": status_vocab,
        },
        "duplicated_knowledge": {
            "assessment": "high",
            "exact_duplicates": [list(pair) for pair in duplicate_pairs],
        },
        "fragmented_knowledge": {
            "assessment": "high",
            "evidence": [
                "Canonical governance, ontology, and genome artifacts exist, but related derived documents remain in a single intake directory.",
                "Project Atlas and Composition Science overlap conceptually but are not linked by a durable repository structure.",
            ],
        },
        "missing_relationships": {
            "assessment": "high",
            "evidence": [
                "No persistent graph store exists.",
                "Most documents reference concepts implicitly through headings rather than explicit related-document fields.",
            ],
        },
        "outdated_or_superseded_documents": [
            doc.filename
            for doc in docs
            if doc.parent and doc.filename != doc.parent and "research library" in doc.title.lower()
        ],
        "missing_indexes": [
            "No repository-level manifest",
            "No concept index",
            "No evidence registry spanning the full corpus",
            "No timeline or changelog index",
        ],
        "titleless_files": titleless,
    }


def concept_graph(docs: list[Document]) -> dict[str, Any]:
    concept_docs = defaultdict(list)
    relations = []
    for doc in docs:
        for concept in doc.concepts:
            concept_docs[concept].append(doc.filename)

    relation_rules = [
        ("perception", "supports", "attention"),
        ("attention", "supports", "hierarchy"),
        ("hierarchy", "supports", "wayfinding"),
        ("spacing", "supports", "hierarchy"),
        ("color", "extends", "hierarchy"),
        ("typography", "extends", "perception"),
        ("ontology", "organizes", "knowledge graph"),
        ("evidence", "supports", "research methodology"),
        ("component architecture", "derived-from", "composition"),
        ("product design", "related-to", "human factors"),
        ("architecture", "inspired-by", "composition"),
    ]
    for source, rel, target in relation_rules:
        if concept_docs[source] and concept_docs[target]:
            relations.append(
                {
                    "source": source,
                    "relationship": rel,
                    "target": target,
                    "evidence_documents": sorted(set(concept_docs[source] + concept_docs[target]))[:8],
                }
            )

    clusters = []
    for concept, members in sorted(concept_docs.items(), key=lambda item: len(item[1]), reverse=True):
        cluster_type = "emerging"
        if len(members) >= 6:
            cluster_type = "foundational"
        elif len(members) == 1:
            cluster_type = "isolated"
        clusters.append({"concept": concept, "cluster_type": cluster_type, "document_count": len(members)})

    canonical_pages = []
    for concept, members in concept_docs.items():
        candidates = [doc for doc in docs if doc.filename in members]
        candidates.sort(key=lambda doc: (doc.canonical, doc.authority_score, doc.importance_score), reverse=True)
        canonical_pages.append(
            {
                "concept": concept,
                "canonical_document": candidates[0].filename,
                "supporting_documents": [doc.filename for doc in candidates[1:4]],
            }
        )

    lineage = []
    groups = defaultdict(list)
    for doc in docs:
        groups[group_key(doc.filename)].append(doc)
    for key, members in groups.items():
        if len(members) < 2:
            continue
        ordered = sorted(members, key=lambda item: item.filename)
        lineage.append(
            {
                "series": key,
                "documents": [doc.filename for doc in ordered],
                "current_candidate": ordered[-1].filename,
            }
        )

    return {
        "concepts": [
            {"name": concept, "document_count": len(files), "documents": sorted(files)}
            for concept, files in sorted(concept_docs.items(), key=lambda item: len(item[1]), reverse=True)
        ],
        "relationships": relations,
        "clusters": clusters,
        "lineage": lineage,
        "canonical_pages": sorted(canonical_pages, key=lambda item: item["concept"]),
    }


def write_repository_json(docs: list[Document], stats: dict[str, Any], health: dict[str, Any], genome: dict[str, Any]) -> None:
    payload = {
        "repository_summary": {
            "generated_at": GENERATED_AT,
            "root": str(ROOT),
            "source_directory": "repository corpus",
            "intake_directory": str(INTAKE_DIR.relative_to(ROOT)),
            "content_directory": str(CONTENT_PROJECTS_DIR.relative_to(ROOT)),
        },
        "statistics": normalize(stats),
        "catalog": [normalize(doc.__dict__) for doc in docs],
        "quality_assessment": normalize(health),
        "knowledge_genome": normalize(genome),
        "confidence": round(sum(doc.confidence_score for doc in docs) / len(docs), 2) if docs else 0,
    }
    (OUTPUT_DIR / "repository.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")


def write_repository_csv(docs: list[Document]) -> None:
    rows = []
    for doc in docs:
        rows.append(
            {
                "path": doc.path,
                "filename": doc.filename,
                "extension": doc.extension,
                "size": doc.size,
                "created": doc.created,
                "modified": doc.modified,
                "title": doc.title,
                "summary": doc.summary,
                "discipline": doc.discipline,
                "project": doc.project,
                "research_area": doc.research_area,
                "document_type": doc.document_type,
                "canonical": doc.canonical,
                "parent": doc.parent or "",
                "children": "; ".join(doc.children),
                "related_documents": "; ".join(doc.related_documents),
                "incoming_links": "; ".join(doc.incoming_links),
                "outgoing_links": "; ".join(doc.outgoing_links),
                "tags": "; ".join(doc.tags),
                "keywords": "; ".join(doc.keywords),
                "missing_metadata": "; ".join(doc.missing_metadata),
                "duplicate_score": doc.duplicate_score,
                "similar_documents": "; ".join(doc.duplicate_of),
                "status": doc.status_normalized,
                "authority_score": doc.authority_score,
                "importance_score": doc.importance_score,
                "confidence_score": doc.confidence_score,
                "suggested_location": doc.suggested_location,
                "migration_action": doc.migration_action,
            }
        )
    with (OUTPUT_DIR / "repository.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)


def normalize(value: Any) -> Any:
    if isinstance(value, dict):
        return {key: normalize(val) for key, val in value.items()}
    if isinstance(value, (list, tuple)):
        return [normalize(item) for item in value]
    if isinstance(value, Counter):
        return dict(value)
    return value


def write_markdown(name: str, content: str) -> None:
    (OUTPUT_DIR / name).write_text(content.rstrip() + "\n", encoding="utf-8")


def bullet_list(items: list[str]) -> str:
    return "\n".join(f"- {item}" for item in items)


def top_concepts(genome: dict[str, Any], limit: int = 8) -> list[str]:
    return [f"{item['name']} ({item['document_count']})" for item in genome["concepts"][:limit]]


def top_files(docs: list[Document], limit: int = 8) -> list[str]:
    return [f"{doc.filename} ({doc.word_count} words)" for doc in sorted(docs, key=lambda item: item.word_count, reverse=True)[:limit]]


def render_manifest(docs: list[Document], stats: dict[str, Any], health: dict[str, Any]) -> str:
    duplicate_files = sorted({name for doc in docs for name in [doc.filename, *doc.duplicate_of] if doc.duplicate_of})
    move_candidates = [doc.filename for doc in docs if doc.migration_action == "move"][:12]
    return f"""# Repository Manifest

Generated: {GENERATED_AT}

## Summary

This repository currently contains a single flat intake corpus with {stats['total_files']} documents and no supporting automation, index, or website code. The corpus is already rich enough to justify a knowledge-platform architecture, but the repository itself is still in an intake state rather than an operational system of record.

## Repository Statistics

- Total files: {stats['total_files']}
- Markdown files: {stats['file_types'].get('.md', 0)}
- Average word count: {stats['average_word_count']}
- Metadata completeness ratio: {stats['metadata_completeness_ratio']}
- Duplicate ratio: {stats['duplicate_ratio']}
- Projects detected: {len(stats['by_project'])}
- Disciplines detected: {len(stats['by_discipline'])}

### Largest Documents

{bullet_list(top_files(docs))}

### Documents by Project

{bullet_list([f"{project}: {count}" for project, count in stats['by_project'].most_common()])}

## Health Assessment

- Organizational quality: {health['organizational_quality']}
- Naming consistency: {health['naming_consistency']['assessment']}
- Metadata quality: {health['metadata_quality']['assessment']}
- Duplicated knowledge: {health['duplicated_knowledge']['assessment']}
- Missing relationships: {health['missing_relationships']['assessment']}

### Evidence

{bullet_list(health['naming_consistency']['evidence'] + health['fragmented_knowledge']['evidence'] + health['missing_relationships']['evidence'])}

## Migration Assessment

### Keep

{bullet_list([doc.filename for doc in docs if doc.migration_action == 'keep'][:12])}

### Move

{bullet_list(move_candidates)}

### Merge

{bullet_list(duplicate_files)}

### Rename

{bullet_list([doc.filename for doc in docs if doc.migration_action == 'rename'][:12])}

## Confidence

Average catalog confidence score: {round(sum(doc.confidence_score for doc in docs) / len(docs), 2)}
"""


def render_genome(docs: list[Document], genome: dict[str, Any]) -> str:
    foundational = [item for item in genome["clusters"] if item["cluster_type"] == "foundational"]
    isolated = [item for item in genome["clusters"] if item["cluster_type"] == "isolated"]
    canonical_pages = genome["canonical_pages"][:12]
    return f"""# Knowledge Genome

Generated: {GENERATED_AT}

## Major Concepts

{bullet_list(top_concepts(genome, 12))}

## Concept Relationships

{bullet_list([f"{edge['source']} {edge['relationship']} {edge['target']}" for edge in genome['relationships']])}

## Concept Clusters

### Foundational

{bullet_list([f"{item['concept']} ({item['document_count']} documents)" for item in foundational])}

### Isolated

{bullet_list([f"{item['concept']} ({item['document_count']} document)" for item in isolated[:12]])}

## Knowledge Lineage

{bullet_list([f"{line['series']}: {' -> '.join(line['documents'])}" for line in genome['lineage']])}

## Recommended Canonical Concept Pages

{bullet_list([f"{item['concept']}: {item['canonical_document']}" for item in canonical_pages])}

## Interpretation

The corpus is centered on a Composition Science spine, with Project Atlas as the strongest applied branch and Product Genome as a parallel but currently less integrated branch. The repository should therefore model concepts explicitly and treat documents as evidence-bearing nodes attached to those concepts, rather than relying on folder proximity as the main organizing principle.
"""


def render_architecture(stats: dict[str, Any]) -> str:
    return f"""# Repository Architecture

Generated: {GENERATED_AT}

## Recommendation

Use a hybrid architecture:

- Concept-first for knowledge relationships
- Project-first for active research programs
- Artifact-type collections for generated indexes and registries
- Generated data layers for search, graph traversal, and website navigation

## Why This Fits The Evidence

The repository has {stats['total_files']} files but already spans multiple projects, document types, and maturity levels. A discipline-first tree would fragment shared concepts. A project-first tree would hide cross-project laws and evidence. An artifact-first tree would optimize storage at the expense of reasoning. A hybrid model keeps canonical concepts stable while allowing projects and derived artifacts to evolve independently.

## Target Structure

```text
content/
  concepts/
    perception/
    attention/
    hierarchy/
    wayfinding/
    color/
    typography/
  projects/
    composition-science/
      governance/
      canonical/
      research/
      evidence/
    project-atlas/
      charter/
      canonical/
      reports/
      evidence/
    product-genome/
      canonical/
      reports/
  registries/
    evidence/
    hypotheses/
    experiments/
    decisions/
  journals/
    research-journal/
data/
  catalog/
  graph/
  search/
  lineage/
site/
scripts/
```

## Canonical Rules

- Canonical concept pages own definitions and stable identifiers.
- Derived documents never duplicate canonical definitions; they cite them.
- Registries are generated, not edited by hand.
- Historical documents remain preserved under lineage-aware versioning.
"""


def render_metadata_standard() -> str:
    return """# Metadata Standard

Generated: {generated_at}

## Canonical Front Matter

```yaml
---
id: DOC-0001
title: Example Title
abstract: One-paragraph summary focused on evidence and scope.
authors:
  - Kevin Miller
created: 2026-07-21
updated: 2026-07-21
project: Composition Science
discipline: Composition Science
research_area:
  - perception
  - hierarchy
document_type: research-report
status: research-draft
evidence_level: B
confidence: medium
canonical: false
concepts:
  - perception
  - hierarchy
supersedes: []
superseded_by: []
related_documents: []
related_concepts: []
tags: []
keywords: []
source_stage: intake
reading_time_minutes: 12
machine_readable: true
llm_ingest: true
---
```

## Required Fields

- `id`
- `title`
- `abstract`
- `created`
- `updated`
- `project`
- `document_type`
- `status`
- `canonical`
- `concepts`

## Controlled Vocabularies

- Status: `intake`, `draft`, `working-draft`, `research-draft`, `verified`, `approved`, `superseded`, `archived`
- Document type: `governance`, `ontology`, `knowledge-model`, `research-report`, `phase-report`, `evidence-registry`, `case-study`, `comparative-study`, `journal-entry`, `decision-record`, `experiment-report`
- Confidence: `low`, `medium`, `high`
- Evidence level: `A`, `B`, `C`, `D`, `E`

## Standardization Notes

- Use stable IDs instead of filename-only identity.
- Separate `created` from `updated`; do not overload `date`.
- Prefer arrays for concepts, tags, and relationships.
- Keep filenames human-readable but treat metadata as the source of truth.
""".replace("{generated_at}", GENERATED_AT)


def render_search_architecture() -> str:
    return f"""# Search Architecture

Generated: {GENERATED_AT}

## Recommendation

Use hybrid retrieval:

- Metadata filters for precision
- BM25 or equivalent lexical search for exact terminology
- Embedding search for semantic recall
- Graph traversal for concept-aware expansion and citation paths

## Retrieval Stack

1. Normalize metadata and chunk canonical summaries plus section-level document chunks.
2. Build a lexical index over full text, titles, headings, IDs, and concept labels.
3. Build a vector index over canonical summaries and semantically chunked sections.
4. Build a graph index over concepts, documents, evidence, and lineage edges.
5. Fuse results with confidence, authority, and recency weighting.

## Query Modes

- Concept search
- Document search
- Evidence search
- Timeline search
- Relationship search
- Project-scoped search

## Ranking Factors

- Title and heading match
- Canonical status
- Authority score
- Confidence score
- Shared concept count
- Citation and backlink count
- Version freshness without hiding superseded history

## Why Not Single-Mode Search

Lexical search alone misses conceptual paraphrases. Vector search alone hides exact IDs, terminology, and structured filters. Graph traversal alone cannot serve as the first-pass retriever. The repository needs all three because it is a research corpus rather than a simple doc site.

## Current Product Research

- Quartz documents built-in full-text search, graph view, wikilinks, transclusions, and backlinks: <https://quartz.jzhao.xyz/>
- VitePress documents local full-text search with an in-browser index and Algolia support: <https://vitepress.dev/reference/default-theme-search>
- Docusaurus documents official Algolia DocSearch support and contextual search across versions: <https://docusaurus.io/docs/search>
"""


def render_website_architecture() -> str:
    return f"""# Website Architecture

Generated: {GENERATED_AT}

## Recommendation

Use Astro as the website framework and treat the website as a generated presentation layer over repository data products.

## Why Astro Wins

- Content collections provide a typed model for Markdown, JSON, and generated data products: <https://docs.astro.build/en/guides/content-collections/>
- Astro can stay mostly static while still supporting interactive graph and search islands.
- It is flexible enough to host canonical concept pages, generated registries, timelines, and custom visualization pages without forcing a docs-only information model.

## Why The Others Lose For This Repository

- Quartz is strong for note-native graphs and backlinks, but its Obsidian-first model is too opinionated for a multi-registry scientific platform.
- MkDocs is efficient for docs portals, but its core search and navigation model is too shallow for concept, graph, and registry-heavy needs: <https://www.mkdocs.org/user-guide/configuration/>
- Docusaurus is mature for documentation versioning and hosted search, but its primary abstraction is versioned docs rather than a knowledge graph platform: <https://docusaurus.io/docs/versioning>
- VitePress is elegant for documentation with local search, but still docs-centric: <https://vitepress.dev/reference/default-theme-search>
- Hugo and Eleventy are capable but would require more custom data plumbing for typed relationships and interactive knowledge views: <https://gohugo.io/methods/site/sections/> and <https://www.11ty.dev/>
- Next.js is viable if server features are required later, but it introduces unnecessary application weight for a mostly static scientific archive: <https://nextjs.org/docs/app/glossary>

## Required Site Sections

- Home
- Repository Health
- Recent Research
- Concepts
- Projects
- Evidence Registry
- Hypothesis Registry
- Experiment Registry
- Decision Records
- Timelines
- Knowledge Graph
- Reading Paths
- Search

## Rendering Model

- Canonical content pages are generated from Markdown.
- Registry pages are generated from normalized data.
- Graph and timeline views are generated from `data/graph` and `data/lineage`.
- Search UI queries a prebuilt lexical index plus a vector service or local semantic index.
"""


def render_build_pipeline() -> str:
    return f"""# Build Pipeline

Generated: {GENERATED_AT}

## Pipeline

```text
Repository Intake
  -> Inventory Scan
  -> Metadata Normalization
  -> Duplicate Detection
  -> Concept Extraction
  -> Relationship Extraction
  -> Canonicality Scoring
  -> Registry Generation
  -> Search Index Build
  -> Graph Build
  -> Website Build
  -> Validation
  -> Publish
  -> Version Archive
```

## Stages

1. Inventory scan
   Emit machine-readable catalog and repository statistics.
2. Metadata normalization
   Validate front matter, controlled vocabularies, IDs, and dates.
3. Relationship extraction
   Generate concept, citation, lineage, and similarity edges.
4. Registry generation
   Materialize evidence, hypothesis, experiment, and decision indexes.
5. Search index build
   Produce lexical, semantic, and graph-aware indexes.
6. Site generation
   Build a static site from content and generated data.
7. Validation
   Check broken links, missing metadata, duplicate IDs, stale lineage, and empty canonical pages.
8. Publish and archive
   Publish the current site and preserve immutable build artifacts for historical reconstruction.
"""


def render_migration_plan(docs: list[Document]) -> str:
    keep = [doc for doc in docs if doc.migration_action == "keep"]
    merge = [doc for doc in docs if doc.migration_action == "merge"]
    move = [doc for doc in docs if doc.migration_action == "move"]
    rename = [doc for doc in docs if doc.migration_action == "rename"]
    return f"""# Migration Plan

Generated: {GENERATED_AT}

## Principles

- No big-bang rewrite
- Preserve original filenames in intake history
- Promote canonical artifacts first
- Generate indexes before moving large volumes of files

## Phase A: Stabilize Intake

- Freeze `input-documents` as an intake area.
- Generate repository manifest and quality reports on every run.
- Add metadata to files currently missing front matter.

## Phase B: Establish Canonical Layer

- Promote governance, ontology, genome, methodology, and library documents into `content/projects/*/canonical`.
- Create concept pages for the highest-frequency concepts first.

## Phase C: Resolve Duplicates And Lineage

- Merge exact duplicates:
{bullet_list(sorted({doc.filename for doc in merge} | {dup for doc in merge for dup in doc.duplicate_of}))}

## Phase D: Move Derived Research

- Move derived reports and case studies into project collections:
{bullet_list([doc.filename for doc in move[:16]])}

## Phase E: Normalize Names

- Rename inconsistent intake files into slug and ID-backed forms:
{bullet_list([doc.filename for doc in rename[:16]])}

## Phase F: Generate Registries And Site

- Build evidence, hypothesis, experiment, and decision registries from metadata and document sections.
- Publish the generated website only after validation gates pass.

## Exit Condition

The repository exits migration mode when canonical concepts, registries, and search indexes are generated automatically and intake documents can be promoted without manual navigation edits.
"""


def render_roadmap() -> str:
    phases = [
        ("Phase 1", "Inventory automation", "None", "Low", "S", "Repository manifest, CSV catalog, validation script", "Catalog matches filesystem", "All files inventoried"),
        ("Phase 2", "Metadata normalization", "Phase 1", "Medium", "M", "Schema, linter, normalized status vocabulary", "No invalid front matter", "95% required-field coverage"),
        ("Phase 3", "Concept and relationship layer", "Phase 2", "Medium", "M", "Concept registry, graph edges, lineage model", "Concept pages render correctly", "Top concepts have canonical owners"),
        ("Phase 4", "Search stack", "Phase 3", "High", "M", "Lexical index, semantic chunks, ranking model", "Golden queries return expected results", "Hybrid retrieval beats lexical-only baseline"),
        ("Phase 5", "Website generation", "Phases 2-4", "Medium", "M", "Astro site, registry pages, graph views", "Static build passes", "All required sections generated"),
        ("Phase 6", "AI readiness", "Phases 3-5", "Medium", "M", "Chunking strategy, provenance-rich RAG exports", "Citations preserved in retrieval", "Agents can answer from repository alone"),
        ("Phase 7", "Scale hardening", "All prior phases", "High", "L", "Performance tuning, archival strategy, incremental builds", "Build remains acceptable at larger fixture sizes", "100k-doc design validated"),
    ]
    lines = ["# Implementation Roadmap", "", f"Generated: {GENERATED_AT}", ""]
    for phase, obj, deps, risk, effort, deliverables, validation, exit_criteria in phases:
        lines.extend(
            [
                f"## {phase}",
                "",
                f"- Objectives: {obj}",
                f"- Dependencies: {deps}",
                f"- Risks: {risk}",
                f"- Effort: {effort}",
                f"- Deliverables: {deliverables}",
                f"- Validation criteria: {validation}",
                f"- Exit criteria: {exit_criteria}",
                "",
            ]
        )
    return "\n".join(lines)


def render_risk_assessment() -> str:
    return f"""# Risk Assessment

Generated: {GENERATED_AT}

## Rejected Alternatives

- Discipline-first folders as the primary architecture
- Project-only organization without shared concept ownership
- Docs-only static site generators as the full platform model
- Manual curation of registries and backlinks

## Architectural Tradeoffs

- A hybrid concept-plus-project model is more complex than a plain docs tree, but it preserves cross-project reasoning.
- Hybrid retrieval requires more infrastructure than local full-text search, but single-mode search will fail at scale.
- Typed metadata adds authoring overhead, but the repository is already large enough that untyped growth would create long-term entropy.

## Scalability Risks

- Flat intake directories become unmanageable well before 10,000 documents.
- Semantic indexing costs increase sharply if chunking and canonical summaries are not normalized.
- Graph density can become noisy without controlled relationship vocabularies.

## Maintenance Costs

- Metadata linting and schema evolution must be treated as first-class engineering work.
- Canonical concept ownership requires editorial governance.
- Search quality tuning needs periodic evaluation against real queries.

## Technical Debt To Avoid

- Hard-coding navigation in website templates
- Allowing duplicate status vocabularies
- Embedding relationships only in prose
- Using filenames as the only durable identifiers

## Future Migration Concerns

- If Astro no longer fits, keep generated data products framework-agnostic so the site can be replatformed without reclassifying the corpus.
- Preserve immutable manifests and graph exports so future researchers can reconstruct repository state independent of the website stack.
"""


def main() -> None:
    ensure_dirs()
    docs = build_documents()
    stats = repository_stats(docs)
    health = health_assessment(docs, stats)
    genome = concept_graph(docs)

    write_repository_json(docs, stats, health, genome)
    write_repository_csv(docs)
    write_markdown("repository-manifest.md", render_manifest(docs, stats, health))
    write_markdown("knowledge-genome.md", render_genome(docs, genome))
    write_markdown("repository-architecture.md", render_architecture(stats))
    write_markdown("metadata-standard.md", render_metadata_standard())
    write_markdown("search-architecture.md", render_search_architecture())
    write_markdown("website-architecture.md", render_website_architecture())
    write_markdown("build-pipeline.md", render_build_pipeline())
    write_markdown("migration-plan.md", render_migration_plan(docs))
    write_markdown("implementation-roadmap.md", render_roadmap())
    write_markdown("risk-assessment.md", render_risk_assessment())


if __name__ == "__main__":
    main()
