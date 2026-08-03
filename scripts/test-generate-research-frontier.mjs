import assert from "node:assert/strict";
import test from "node:test";

import {
  frontierIdentity,
  isGeneratedFrontierSource,
} from "./research-frontier-identity.mjs";

test("frontier identity remains distinct for sources with the same generic heading", () => {
  const first = frontierIdentity(
    "content/projects/alpha/recommendation.md",
    "Recommendation",
  );
  const second = frontierIdentity(
    "content/projects/beta/recommendation.md",
    "Recommendation",
  );

  assert.notEqual(first.id, second.id);
  assert.notEqual(first.documentId, second.documentId);
  assert.notEqual(first.slug, second.slug);
  assert.notEqual(`/research/${first.slug}/`, `/research/${second.slug}/`);
  assert.match(first.title, /Recommendation — Projects \/ Alpha \/ Recommendation/);
  assert.match(second.title, /Recommendation — Projects \/ Beta \/ Recommendation/);
});

test("frontier identity is deterministic for a source path", () => {
  const source = "content/projects/alpha/purpose.md";
  assert.deepEqual(
    frontierIdentity(source, "Purpose"),
    frontierIdentity(source, "Purpose"),
  );
});

test("generated frontier output is not reused as generator input", () => {
  assert.equal(isGeneratedFrontierSource("research/frontier/FRONTIER-MASTER.md"), true);
  assert.equal(isGeneratedFrontierSource("research/frontier/document-frontiers/example.md"), true);
  assert.equal(isGeneratedFrontierSource("research/source-study.md"), false);
});
