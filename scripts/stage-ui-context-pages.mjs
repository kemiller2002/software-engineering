import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "packages/visual-engineering-context/context");
const destination = path.join(root, "dist/context");
const latest = path.join(destination, "latest");

await rm(destination, { recursive: true, force: true });
await mkdir(latest, { recursive: true });
await cp(source, latest, { recursive: true });

// Preserve the original flat URLs while consumers migrate to /context/latest/.
await cp(source, destination, { recursive: true });

const context = JSON.parse(await readFile(path.join(source, "context.json"), "utf8"));
const manifest = {
  schemaVersion: "1.0",
  channel: "latest",
  contextVersion: context.contextVersion,
  sourceCommit: context.sourceCommit,
  generatedAt: context.generatedAt,
  context: "latest/context.json",
  briefing: "latest/UI-FOUNDATIONS.md",
  checklist: "latest/UI-DECISION-CHECKLIST.md",
  antiPatterns: "latest/UI-ANTI-PATTERNS.md",
  researchIndex: "latest/RESEARCH-INDEX.md",
  sources: "latest/sources.json",
  bundle: "visual-engineering-context-latest.tar.gz",
  checksums: "SHA256SUMS",
  immutableReleases: "https://github.com/kemiller2002/Visual-Engineering/releases?q=ui-context-v",
};
await writeFile(path.join(destination, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const archiveName = "visual-engineering-context-latest.tar.gz";
const archive = path.join(destination, archiveName);
execFileSync("tar", ["-czf", archive, "-C", destination, "latest"]);
const archiveHash = createHash("sha256").update(await readFile(archive)).digest("hex");
await writeFile(path.join(destination, "SHA256SUMS"), `${archiveHash}  ${archiveName}\n`);

process.stdout.write(`Staged latest UI context ${context.contextVersion} for GitHub Pages at ${destination}\n`);
