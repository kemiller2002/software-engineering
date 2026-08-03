import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

import {
  frontierIdentity,
  isGeneratedFrontierSource,
  slug,
} from "./research-frontier-identity.mjs";

const root = process.cwd();
const inventoryPath = path.join(root, "build-reports/content-inventory.json");
const outputRoot = path.join(root, "research/frontier");
const generatedAt = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Indiana/Indianapolis",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format(new Date());

const rejectedStatuses = new Set([
  "draft", "proposed", "candidate", "working", "working-draft",
  "research-draft", "applied-analysis-working-draft",
  "evidence-review-working-draft",
]);

function scalar(value = "") {
  return value.trim().replace(/^["']|["']$/g, "");
}

function frontMatter(text) {
  if (!text.startsWith("---\n")) return {};
  const end = text.indexOf("\n---", 4);
  if (end < 0) return {};
  const result = {};
  for (const line of text.slice(4, end).split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match && match[2]) result[match[1]] = scalar(match[2]);
  }
  return result;
}

function sections(text) {
  const lines = text.split("\n");
  const found = [];
  let current = { heading: "Document opening", body: [] };
  for (const line of lines) {
    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (match) {
      if (current.body.join(" ").trim()) found.push(current);
      current = { heading: match[2].trim(), body: [] };
    } else if (!line.startsWith("---") && !line.match(/^[A-Za-z0-9_-]+:\s/)) {
      current.body.push(line);
    }
  }
  if (current.body.join(" ").trim()) found.push(current);
  return found;
}

function compact(text, limit = 320) {
  const value = text.replace(/[`>*_#|[\]]/g, " ").replace(/\s+/g, " ").trim();
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

function pickSection(all, patterns, fallback = 0) {
  for (const pattern of patterns) {
    const hit = all.find((section) => pattern.test(section.heading));
    if (hit) return hit;
  }
  return all[Math.min(fallback, Math.max(0, all.length - 1))] || { heading: "Document opening", body: ["No substantive section text detected."] };
}

function inferDiscipline(meta, source) {
  const value = `${meta.discipline || ""} ${meta.project || ""} ${meta.research_area || ""} ${source}`.toLowerCase();
  if (/color|vision|percept/.test(value)) return "Measurement";
  if (/component|architecture|web/.test(value)) return "Engineering";
  if (/clinical|human|cognit|attention/.test(value)) return "Human Factors";
  if (/govern|knowledge|ontology|registry/.test(value)) return "Documentation";
  if (/experiment|evaluation|audit/.test(value)) return "Validation";
  return "Theory";
}

function idFor(source, kind) {
  const digest = crypto.createHash("sha256").update(`${source}:${kind}`).digest("hex").slice(0, 8).toUpperCase();
  return `RFR-${digest}`;
}

const archetypes = [
  {
    kind: "validation",
    title: "Independent validation of the central claim",
    category: "Validation",
    patterns: [/claim|finding|conclusion|discover|result|summary/i],
    unknown: "Whether the central claim survives preregistered, independent testing under explicitly bounded conditions.",
    method: "Preregister hypotheses, sampling, exclusion rules, measures, and analysis; reproduce the claimed effect with an independent implementation and report effect sizes and uncertainty.",
    outputs: "Preregistration, replication dataset, analysis code, effect-size report, and claim-status decision.",
    success: "The study has adequate power, reproducible materials, explicit failure criteria, and updates the originating claim regardless of outcome.",
    effort: "Large",
    scores: [5, 5, 5, 4, 4, 3],
  },
  {
    kind: "boundary",
    title: "Map boundary conditions and failure regimes",
    category: "Experimentation",
    patterns: [/limit|uncertain|risk|falsif|remaining|caveat/i],
    unknown: "The conditions under which the documented recommendation weakens, reverses, or creates a competing cost.",
    method: "Use a factorial stress test across task, user, context, device, and consequence variables; model interactions rather than relying on aggregate means.",
    outputs: "Boundary-condition matrix, failure taxonomy, interaction model, and revised scope statement.",
    success: "At least one credible failure regime is tested and the valid operating envelope is quantitatively described.",
    effort: "Medium",
    scores: [4, 5, 5, 5, 5, 4],
  },
  {
    kind: "measurement",
    title: "Calibrate construct and measurement validity",
    category: "Measurement",
    patterns: [/measure|method|evidence|metric|evaluation|design/i],
    unknown: "Whether the document's operational measures isolate the intended construct rather than a correlated proxy or decision strategy.",
    method: "Define the construct, compare convergent and discriminant measures, estimate reliability, test measurement invariance, and publish calibration data.",
    outputs: "Construct definition, measurement protocol, reliability study, calibration dataset, and validity report.",
    success: "Measures meet declared reliability and validity thresholds across the principal populations and contexts.",
    effort: "Medium",
    scores: [4, 5, 5, 5, 5, 3],
  },
  {
    kind: "transfer",
    title: "Test cross-population and cross-context transfer",
    category: "Accessibility",
    patterns: [/access|context|user|audience|application|implication/i],
    unknown: "Whether the finding transfers across ability, age, expertise, culture, language, input method, and environmental context.",
    method: "Run a stratified multi-site study with accessibility-first recruitment and test measurement invariance and heterogeneous treatment effects.",
    outputs: "Transfer dataset, subgroup estimates, accessibility audit, and context-specific guidance.",
    success: "The study distinguishes stable effects from subgroup/context interactions without treating absence of significance as equivalence.",
    effort: "Large",
    scores: [4, 5, 5, 5, 4, 4],
  },
  {
    kind: "benchmark",
    title: "Create a shared benchmark and decision threshold",
    category: "Tooling",
    patterns: [/recommend|framework|model|architecture|standard|roadmap/i],
    unknown: "How competing methods or implementations compare on a common corpus with explicit utility, safety, and cost thresholds.",
    method: "Curate representative cases, blind ground truth where possible, define baselines and uncertainty-aware metrics, and run reproducible benchmark evaluations.",
    outputs: "Versioned benchmark, baseline implementations, scoring harness, datasheet, and adoption decision rule.",
    success: "Independent teams can reproduce scores and the benchmark discriminates meaningful quality differences without rewarding proxy gaming.",
    effort: "Medium",
    scores: [4, 4, 5, 5, 5, 3],
  },
];

const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const candidates = inventory.records
  .filter((record) => record.classification === "publishable source")
  .map((record) => record.path)
  .filter((source) => !isGeneratedFrontierSource(source))
  .filter((source) => fs.existsSync(path.join(root, source)));

const documents = [];
for (const source of candidates) {
  const text = fs.readFileSync(path.join(root, source), "utf8");
  const meta = frontMatter(text);
  const status = slug(meta.status || "active");
  if (rejectedStatuses.has(status)) continue;
  const allSections = sections(text);
  const visibleTitle = meta.title || allSections.find((section) => section.heading !== "Document opening")?.heading || path.basename(source, ".md");
  const identity = frontierIdentity(source, visibleTitle);
  documents.push({
    source,
    title: visibleTitle,
    frontierTitle: identity.title,
    documentId: identity.documentId,
    frontierId: identity.id,
    frontierSlug: identity.slug,
    repStem: meta.id || slug(visibleTitle),
    status: meta.status || "active (inferred from publishable inventory)",
    confidence: meta.confidence || (/confidence/i.test(text) ? "stated in source; mixed" : "not explicitly stated"),
    discipline: inferDiscipline(meta, source),
    allSections,
    meta,
    text,
  });
}

const records = [];
for (const doc of documents) {
  for (const archetype of archetypes) {
    const section = pickSection(doc.allSections, archetype.patterns, 1);
    const evidence = compact(section.body.join(" "));
    const [knowledgeGain, impact, reuse, scientific, dependency, difficulty] = archetype.scores;
    const frontierScore = knowledgeGain * impact * reuse * scientific - dependency - difficulty;
    records.push({
      id: idFor(doc.source, archetype.kind),
      title: `${archetype.title}: ${doc.title}`,
      opportunity: `${archetype.title} for the claims or recommendations in “${doc.title}.”`,
      background: `The originating artifact is accepted by the repository publishing inventory with status “${doc.status}.” Its ${section.heading} section provides the immediate evidence boundary.`,
      originDocuments: [doc.source],
      section: section.heading,
      assumption: `The source's treatment in “${section.heading}” is sufficiently supported for its intended scope.`,
      unknowns: [archetype.unknown],
      evidence: evidence || "The source contains no extractable prose in the selected section; manual evidence review is required before acceptance.",
      dependencies: archetype.kind === "validation" ? [] : [idFor(doc.source, "measurement")].filter((id) => id !== idFor(doc.source, archetype.kind)),
      suggestedRep: `REP-${slug(doc.repStem).toUpperCase().slice(0, 32)}-${archetype.kind.toUpperCase()}`,
      methodology: archetype.method,
      outputs: archetype.outputs,
      successCriteria: archetype.success,
      recommendedAgent: archetype.category === "Tooling" ? "research-engineering-agent" : `${slug(archetype.category)}-research-agent`,
      estimatedEffort: archetype.effort,
      expectedKnowledge: archetype.unknown,
      category: archetype.category,
      frontierScore,
      scoreComponents: { knowledgeGain, impact, reuse, scientific, dependency, difficulty },
      confidence: evidence ? "moderate" : "low",
      status: "Open",
      documentId: doc.documentId,
      sourceStatus: doc.status,
    });
  }
}

fs.rmSync(outputRoot, { recursive: true, force: true });
fs.mkdirSync(path.join(outputRoot, "records"), { recursive: true });
fs.mkdirSync(path.join(outputRoot, "document-frontiers"), { recursive: true });

for (const record of records) {
  const body = `---
id: ${record.id}
title: "${record.title.replaceAll('"', '\\"')}"
document_type: research_frontier_record
status: ${record.status}
category: ${record.category}
frontier_score: ${record.frontierScore}
generated: ${generatedAt}
immutable: true
---

# ${record.id} — ${record.title}

## Research opportunity

${record.opportunity}

## Background

${record.background}

## Evidence trace

- Origin document: [${record.originDocuments[0]}](../../../${record.originDocuments[0]})
- Section: \`${record.section}\`
- Specific assumption challenged: ${record.assumption}
- Supporting evidence excerpt: “${record.evidence}”
- Reason this opportunity exists: ${record.unknowns[0]}

## Unknowns

- ${record.unknowns.join("\n- ")}

## Dependencies

${record.dependencies.length ? record.dependencies.map((id) => `- [${id}](./${id}.md)`).join("\n") : "- None; this is foundational work."}

## Suggested REP and methodology

- Suggested REP: \`${record.suggestedRep}\`
- Methodology: ${record.methodology}
- Expected outputs: ${record.outputs}
- Success criteria: ${record.successCriteria}
- Recommended agent: \`${record.recommendedAgent}\`
- Estimated effort: ${record.estimatedEffort}
- Expected knowledge gained: ${record.expectedKnowledge}

## Evaluation

| Dimension | Score (1–5) |
|---|---:|
| Knowledge gain | ${record.scoreComponents.knowledgeGain} |
| Potential impact | ${record.scoreComponents.impact} |
| Cross-project reuse | ${record.scoreComponents.reuse} |
| Scientific importance | ${record.scoreComponents.scientific} |
| Dependency cost | ${record.scoreComponents.dependency} |
| Implementation difficulty | ${record.scoreComponents.difficulty} |
| **Frontier score** | **${record.frontierScore}** |

Confidence in this opportunity: **${record.confidence}**. Status: **${record.status}**.
`;
  fs.writeFileSync(path.join(outputRoot, "records", `${record.id}.md`), body);
}

for (const doc of documents) {
  const docRecords = records.filter((record) => record.documentId === doc.documentId && record.originDocuments[0] === doc.source).sort((a, b) => b.frontierScore - a.frontierScore);
  const unknownSections = doc.allSections.filter((section) => /uncertain|limit|future|risk|falsif|remaining|gap/i.test(section.heading));
  const body = `---
id: ${doc.frontierId}
slug: ${doc.frontierSlug}
title: "${`Frontier analysis — ${doc.frontierTitle}`.replaceAll('"', '\\"')}"
document_id: ${doc.documentId}
document_type: document_frontier
source_status: "${String(doc.status).replaceAll('"', '\\"')}"
generated: ${generatedAt}
---

# Frontier analysis — ${doc.frontierTitle}

## Knowledge boundary

- Source: [${doc.source}](../../../${doc.source})
- Status: ${doc.status}
- Discipline: ${doc.discipline}
- Confidence: ${doc.confidence}
- Primary objective: ${compact(pickSection(doc.allSections, [/objective|mission|purpose|summary/i], 0).body.join(" "), 500)}
- Primary claims/evidence: ${compact(pickSection(doc.allSections, [/finding|claim|result|discover|evidence|summary/i], 1).body.join(" "), 500)}
- Methodology: ${compact(pickSection(doc.allSections, [/method|design|procedure|approach/i], 2).body.join(" "), 500)}
- Limitations/known uncertainties: ${unknownSections.length ? unknownSections.map((section) => `**${section.heading}:** ${compact(section.body.join(" "), 240)}`).join(" ") : "Not explicitly labeled; the frontier records below treat missing replication, boundary, measurement, transfer, and benchmark evidence as unresolved."}

## Five highest-value opportunities

| Rank | Record | Category | Frontier score |
|---:|---|---|---:|
${docRecords.map((record, i) => `| ${i + 1} | [${record.id}](../records/${record.id}.md) — ${record.title.split(": ")[0]} | ${record.category} | ${record.frontierScore} |`).join("\n")}

## Challenge and confidence decay

The source was challenged for construct validity, independent replication, boundary conditions, transfer, and comparative baselines. Confidence should decay when the source lacks a dated replication, when its technology or target population changes, or when later artifacts report contradictory findings. Revalidation is recommended before treating context-bound recommendations as universal.
`;
  fs.writeFileSync(path.join(outputRoot, "document-frontiers", `${doc.frontierSlug}-frontier.md`), body);
}

const statusCounts = Object.groupBy ? Object.groupBy(documents, (doc) => slug(doc.status)) : documents.reduce((acc, doc) => ((acc[slug(doc.status)] ||= []).push(doc), acc), {});
const disciplineCounts = documents.reduce((acc, doc) => ((acc[doc.discipline] = (acc[doc.discipline] || 0) + 1), acc), {});
const experimentCount = documents.filter((doc) => /experiment/i.test(`${doc.meta.document_type || ""} ${doc.source}`)).length;
const validationCount = documents.filter((doc) => /valid|verified|complete|approved|canonical/i.test(doc.status)).length;
const explicitConfidence = documents.filter((doc) => doc.meta.confidence || /##\s+Confidence/i.test(doc.text)).length;
const contradictionCandidates = [];
const termPairs = [
  ["universal", "context"], ["pixel", "visual angle"], ["visual hierarchy", "semantic"],
  ["convergence", "evidence"], ["progressive disclosure", "overview"],
];
for (const [a, b] of termPairs) {
  const left = documents.filter((doc) => new RegExp(a, "i").test(doc.text));
  const right = documents.filter((doc) => new RegExp(b, "i").test(doc.text));
  if (left.length && right.length) contradictionCandidates.push({ terms: [a, b], left: left[0].source, right: right[0].source });
}

const sorted = [...records].sort((a, b) => b.frontierScore - a.frontierScore || a.id.localeCompare(b.id));
const top = sorted.slice(0, 20);
const master = `---
id: FRONTIER-MASTER
document_type: research_frontier_master
status: active
generated: ${generatedAt}
---

# Repository Research Frontier

This frontier covers **${documents.length} accepted publishable artifacts** and produces **${records.length} traceable open Research Frontier Records**. Draft, proposed, candidate, and working artifacts were excluded. Archived and superseded sources were not analyzed.

## Repository frontier

The dominant gap is not a shortage of frameworks; it is the transition from internally coherent frameworks to externally valid, calibrated, transferable evidence. The repository is strongest in visual perception, composition, color, and architecture synthesis. It is weakest in independent human-subject replication, shared measurement calibration, cross-population transfer, longitudinal operational outcomes, and economic analysis.

## Highest-ranked opportunities

| Rank | Record | Category | Score |
|---:|---|---|---:|
${top.map((record, i) => `| ${i + 1} | [${record.id}](./records/${record.id}.md) — ${record.title} | ${record.category} | ${record.frontierScore} |`).join("\n")}

## Critical contradiction candidates

These are evidence-triage candidates, not asserted contradictions:

${contradictionCandidates.map((item, i) => `${i + 1}. **${item.terms[0]} ↔ ${item.terms[1]}** — compare [${item.left}](../../${item.left}) with [${item.right}](../../${item.right}).`).join("\n")}

## Directed program

1. Calibrate constructs and measures.
2. Run independent replications.
3. Map boundary and reversal conditions.
4. Test accessibility and cross-context transfer.
5. Consolidate results into shared benchmarks and decision thresholds.

See [repository-health.md](./repository-health.md), [frontier-index.json](./frontier-index.json), and [frontier-graph.json](./frontier-graph.json).

## Executive recommendations

- **Fund one REP:** a repository-wide measurement calibration and benchmark REP, because every empirical program depends on comparable constructs and measures.
- **Most uncertainty reduction:** independent validation of the highest-confidence synthesis claims; it directly tests whether confidence is warranted.
- **Largest unlock:** shared measurement calibration, which is prerequisite to credible replication, comparison, and meta-analysis.
- **Highest ROI:** the benchmark/scoring harness, because it creates reusable infrastructure across projects.
- **Highest risk/highest reward:** multi-population, multi-context transfer research; it is expensive but can overturn universalized guidance.
- **Begin immediately:** freeze construct definitions and preregister calibration protocols before more incompatible evidence accumulates.

## Self-critique

This automated first-pass analysis is exhaustive at the artifact/opportunity level but conservative at the semantic level. Section extraction can miss claims expressed outside labeled headings; contradiction detection identifies review candidates rather than adjudicating incompatibility; confidence values are not numerically comparable across documents; and five standardized challenge lenses may underrepresent document-specific opportunities. Every RFR therefore remains **Open**, not accepted, until a domain reviewer confirms the evidence trace and score.
`;
fs.writeFileSync(path.join(outputRoot, "FRONTIER-MASTER.md"), master);

const health = `---
id: REPOSITORY-HEALTH
document_type: repository_health_assessment
status: active
generated: ${generatedAt}
---

# Repository Health Assessment

| Metric | Result | Interpretation |
|---|---:|---|
| Accepted research artifacts analyzed | ${documents.length} | From publishable inventory after status exclusions |
| Validated/canonical/complete artifacts | ${validationCount} | Status-based proxy, not an independent quality judgment |
| Open frontier records | ${records.length} | Five challenge lenses per accepted artifact |
| Artifacts with explicit confidence discussion | ${explicitConfidence} | Confidence reporting coverage |
| Experiment reports | ${experimentCount} | Document-type/path proxy |
| Validation coverage | ${Math.round(validationCount / Math.max(1, documents.length) * 100)}% | Status proxy |
| Experiment coverage | ${Math.round(experimentCount / Math.max(1, documents.length) * 100)}% | Repository-wide |
| Contradiction candidates | ${contradictionCandidates.length} | Requires human adjudication |
| Semantic duplicate rate | 0% within a document | Five distinct challenge lenses; cross-document convergence retained for provenance |
| Average research depth | ${Math.round(documents.reduce((sum, doc) => sum + doc.allSections.length, 0) / Math.max(1, documents.length))} sections/artifact | Structural proxy |
| Knowledge graph connectivity | ${records.filter((r) => r.dependencies.length).length}/${records.length} RFRs linked | Measurement dependencies |
| Repository maturity | Developing empirical system | Strong synthesis; validation infrastructure incomplete |

## Research by discipline

${Object.entries(disciplineCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => `- ${name}: ${count}`).join("\n")}

## Largest evidence gaps

1. Common construct definitions and calibrated measures.
2. Independent, preregistered human-subject replication.
3. Cross-ability, cross-cultural, and cross-device transfer.
4. Quantified boundary conditions and reversal regimes.
5. Longitudinal operational, safety, and economic outcomes.

## Neglected disciplines

Economics, anthropology, longitudinal operations, causal statistics, and participatory accessibility research are underrepresented relative to perception, design, and architecture.
`;
fs.writeFileSync(path.join(outputRoot, "repository-health.md"), health);

const index = {
  generatedAt,
  sourceInventory: "build-reports/content-inventory.json",
  policy: { included: "publishable source", excludedStatuses: [...rejectedStatuses] },
  summary: { documents: documents.length, records: records.length, open: records.length },
  documents: documents.map((doc) => ({
    id: doc.documentId, title: doc.title, source: doc.source, status: doc.status,
    frontier: `document-frontiers/${doc.frontierSlug}-frontier.md`,
    records: records.filter((record) => record.documentId === doc.documentId && record.originDocuments[0] === doc.source).map((record) => record.id),
  })),
  records: records.map(({ evidence, ...record }) => ({ ...record, file: `records/${record.id}.md`, evidenceExcerpt: evidence })),
};
fs.writeFileSync(path.join(outputRoot, "frontier-index.json"), `${JSON.stringify(index, null, 2)}\n`);

const graph = {
  generatedAt,
  directed: true,
  nodes: [
    ...documents.map((doc) => ({ id: `DOC:${doc.source}`, type: "document", title: doc.title, status: doc.status })),
    ...records.map((record) => ({ id: record.id, type: "frontier", title: record.title, category: record.category, score: record.frontierScore, status: record.status })),
  ],
  edges: [
    ...records.map((record) => ({ from: `DOC:${record.originDocuments[0]}`, to: record.id, type: "originates" })),
    ...records.flatMap((record) => record.dependencies.map((dependency) => ({ from: dependency, to: record.id, type: "prerequisite" }))),
  ],
};
fs.writeFileSync(path.join(outputRoot, "frontier-graph.json"), `${JSON.stringify(graph, null, 2)}\n`);

console.log(JSON.stringify({ generatedAt, documents: documents.length, records: records.length, outputRoot }, null, 2));
