import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cli = path.join(root, "packages/visual-engineering-context/bin/ve-context.mjs");
const temporary = await mkdtemp(path.join(os.tmpdir(), "ve-context-test-"));

try {
  const first = execFileSync(process.execPath, [cli, "sync"], { cwd: temporary, encoding: "utf8" });
  const second = execFileSync(process.execPath, [cli, "sync"], { cwd: temporary, encoding: "utf8" });
  const verified = execFileSync(process.execPath, [cli, "verify"], { cwd: temporary, encoding: "utf8" });
  const status = JSON.parse(execFileSync(process.execPath, [cli, "status"], { cwd: temporary, encoding: "utf8" }));
  const instructions = await readFile(path.join(temporary, ".visual-engineering/AGENT-INSTRUCTIONS.md"), "utf8");

  if (!first.includes("synced") || !second.includes("synced")) throw new Error("Sync did not complete");
  if (!verified.includes("Verified")) throw new Error("Verification did not complete");
  if (!status.sourceCommit || !status.researchDocuments) throw new Error("Status is incomplete");
  if (!instructions.includes("Before UI work")) throw new Error("Agent instructions are missing");

  process.stdout.write(`Consumer smoke test passed for ${status.packageVersion}.\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
