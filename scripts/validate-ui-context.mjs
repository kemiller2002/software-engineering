import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contextDir = path.join(root, "packages/visual-engineering-context/context");
const required = [
  "AGENT-INSTRUCTIONS.md",
  "UI-FOUNDATIONS.md",
  "UI-DECISION-CHECKLIST.md",
  "UI-ANTI-PATTERNS.md",
  "RESEARCH-INDEX.md",
  "sources.json",
  "context.json",
];

for (const file of required) await access(path.join(contextDir, file));

const manifest = JSON.parse(await readFile(path.join(contextDir, "context.json"), "utf8"));
const sources = JSON.parse(await readFile(path.join(contextDir, "sources.json"), "utf8"));
const errors = [];

if (manifest.schemaVersion !== "1.0") errors.push("Unsupported schemaVersion");
if (!manifest.contextVersion) errors.push("Missing contextVersion");
if (!manifest.sourceCommit || manifest.sourceCommit === "unknown") errors.push("Missing sourceCommit");
if (manifest.researchDocuments < 10) errors.push("Research selection is unexpectedly small");
if (sources.records.length !== manifest.researchDocuments) errors.push("Research document count mismatch");

for (const artifact of manifest.artifacts) {
  const content = await readFile(path.join(contextDir, artifact.file));
  const actual = createHash("sha256").update(content).digest("hex");
  if (actual !== artifact.sha256) errors.push(`Checksum mismatch: ${artifact.file}`);
}

const allText = (await Promise.all(required.map((file) => readFile(path.join(contextDir, file), "utf8")))).join("\n");
if (allText.includes("/Users/") || allText.includes("\\Users\\")) errors.push("Published context contains a local absolute path");
if (allText.includes("TODO") || allText.includes("TBD")) errors.push("Published context contains unresolved placeholders");

const ids = new Set();
for (const record of sources.records) {
  if (!record.id || !record.sourcePath || !record.contentHash) errors.push(`Incomplete source record: ${record.title}`);
  if (ids.has(record.id)) errors.push(`Duplicate source ID: ${record.id}`);
  ids.add(record.id);
}

if (errors.length) {
  process.stderr.write(`${errors.map((error) => `- ${error}`).join("\n")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Validated UI context ${manifest.contextVersion} (${manifest.researchDocuments} documents).\n`);
}
