#!/usr/bin/env python3
from __future__ import annotations

import json
import hashlib
import shutil
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "input-documents"
CATALOG_PATH = ROOT / "knowledge-platform" / "repository.json"
CONTENT_DIR = ROOT / "content"
ARCHIVE_DIR = CONTENT_DIR / "archive"
PROJECTS_DIR = CONTENT_DIR / "projects"


def load_catalog() -> list[dict]:
    payload = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    return payload["catalog"]


def target_path(record: dict) -> Path:
    suggested = record["suggested_location"]
    if suggested.startswith("content/"):
        relative = suggested[len("content/") :]
    else:
        relative = suggested
    parts = Path(relative).parts
    if not parts:
        return CONTENT_DIR / relative

    project_roots = {"composition-science", "project-atlas", "design-library", "product-genome", "unclassified"}
    if parts[0] in project_roots:
        return CONTENT_DIR / "projects" / Path(*parts)
    return CONTENT_DIR / Path(*parts)


def archive_path(record: dict) -> Path:
    project_slug = slugify(record["project"])
    return ARCHIVE_DIR / "duplicates" / project_slug / record["filename"]


def slugify(text: str) -> str:
    return "-".join("".join(ch.lower() if ch.isalnum() else " " for ch in text).split())


def write_stub(path: Path, title: str, body: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(f"# {title}\n\n{body}\n", encoding="utf-8")


def create_root_docs(records: list[dict]) -> None:
    readme = CONTENT_DIR / "README.md"
    summary = Counter(record["project"] for record in records)
    body = "\n".join(f"- {project}: {count} documents organized" for project, count in summary.most_common())
    write_stub(
        readme,
        "Structured Content Layer",
        "This directory is the canonical structured content layer for processed research artifacts.\n\n"
        "`input-documents` is reserved for unprocessed intake only.\n\n"
        "## Projects\n\n"
        f"{body}",
    )

    intake = CONTENT_DIR / "intake-preservation.md"
    write_stub(
        intake,
        "Intake Preservation",
        "Processed files are relocated into `content/`. Future unprocessed documents should land in `input-documents` until they are classified and moved.",
    )


def create_concept_stubs(records: list[dict]) -> None:
    concepts_dir = CONTENT_DIR / "concepts"
    concept_map: dict[str, list[str]] = {}
    for record in records:
        for concept in record.get("concepts", []):
            concept_map.setdefault(concept, []).append(record["filename"])

    for concept, docs in sorted(concept_map.items()):
        body = "Canonical concept stub generated from repository inventory.\n\n## Related Documents\n\n"
        body += "\n".join(f"- {doc}" for doc in sorted(docs)[:20])
        write_stub(concepts_dir / slugify(concept) / "index.md", concept.title(), body)


def same_content(left: Path, right: Path) -> bool:
    if not left.exists() or not right.exists():
        return False
    return hashlib.sha256(left.read_bytes()).digest() == hashlib.sha256(right.read_bytes()).digest()


def process_documents(records: list[dict]) -> tuple[int, int]:
    moved = 0
    archived = 0
    for record in records:
        source = ROOT / record["path"]
        if not source.exists():
            continue
        if not (str(source).startswith(str(SOURCE_DIR)) or str(source).startswith(str(PROJECTS_DIR))):
            continue

        if record["migration_action"] == "merge" and record["duplicate_of"]:
            preferred_name = min([record["filename"], *record["duplicate_of"]], key=str.lower)
            if record["filename"] != preferred_name:
                target = archive_path(record)
                target.parent.mkdir(parents=True, exist_ok=True)
                if source == target:
                    continue
                if target.exists() and target != source:
                    target.unlink()
                shutil.move(str(source), str(target))
                archived += 1
                continue

        target = target_path(record)
        if source == target:
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        if target.exists():
            if same_content(source, target):
                if target != source:
                    target.unlink()
            else:
                conflict_target = ARCHIVE_DIR / "conflicts" / record["project"].lower().replace(" ", "-") / record["filename"]
                conflict_target.parent.mkdir(parents=True, exist_ok=True)
                if conflict_target.exists():
                    conflict_target.unlink()
                shutil.move(str(source), str(conflict_target))
                archived += 1
                continue

        shutil.move(str(source), str(target))
        moved += 1

    return moved, archived


def create_registry_stubs() -> None:
    registries = {
        "evidence/index.md": "Generated evidence registry placeholder.",
        "hypotheses/index.md": "Generated hypothesis registry placeholder.",
        "experiments/index.md": "Generated experiment registry placeholder.",
        "decisions/index.md": "Generated decision registry placeholder.",
    }
    for rel, body in registries.items():
        write_stub(CONTENT_DIR / "registries" / rel, Path(rel).parent.name.title(), body)


def ensure_intake_placeholder() -> None:
    SOURCE_DIR.mkdir(parents=True, exist_ok=True)
    write_stub(
        SOURCE_DIR / "README.md",
        "Input Documents",
        "Place new, unprocessed source documents here. Once classified, they should be moved into `content/` by the cleanup workflow.",
    )


def main() -> None:
    records = load_catalog()
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    moved, archived = process_documents(records)
    create_root_docs(records)
    create_concept_stubs(records)
    create_registry_stubs()
    ensure_intake_placeholder()
    print(f"moved={moved}")
    print(f"archived={archived}")


if __name__ == "__main__":
    main()
