import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contextDir = path.join(root, "packages/visual-engineering-context/context");
const context = JSON.parse(await readFile(path.join(contextDir, "context.json"), "utf8"));
const requestedVersion = process.argv[2] || process.env.VE_CONTEXT_VERSION || context.contextVersion;
const version = requestedVersion.replace(/^ui-context-v/, "");

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  throw new Error(`Release version must be semantic, received: ${requestedVersion}`);
}
if (context.contextVersion !== version) {
  throw new Error(`Generated context version ${context.contextVersion} does not match release ${version}`);
}

const outputDir = path.join(root, "build-reports/ui-context-release");
const bundleName = `visual-engineering-context-${version}`;
const bundleDir = path.join(outputDir, bundleName);
const archive = path.join(outputDir, `${bundleName}.tar.gz`);

await rm(outputDir, { recursive: true, force: true });
await mkdir(bundleDir, { recursive: true });
await cp(contextDir, bundleDir, { recursive: true });

const releaseManifest = {
  schemaVersion: "1.0",
  release: `ui-context-v${version}`,
  contextVersion: version,
  sourceCommit: context.sourceCommit,
  generatedAt: context.generatedAt,
  researchDocuments: context.researchDocuments,
};
await writeFile(path.join(bundleDir, "release.json"), `${JSON.stringify(releaseManifest, null, 2)}\n`);

execFileSync("tar", ["-czf", archive, "-C", outputDir, bundleName]);

const archiveHash = createHash("sha256").update(await readFile(archive)).digest("hex");
const checksums = `${archiveHash}  ${path.basename(archive)}\n`;
await writeFile(path.join(outputDir, "SHA256SUMS"), checksums);
await writeFile(path.join(outputDir, "context.json"), `${JSON.stringify(context, null, 2)}\n`);

process.stdout.write(`${JSON.stringify({
  version,
  tag: `ui-context-v${version}`,
  archive,
  checksum: archiveHash,
}, null, 2)}\n`);
