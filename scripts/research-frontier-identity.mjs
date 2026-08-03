import crypto from "node:crypto";
import path from "node:path";

export function slug(value, limit = 100) {
  return String(value || "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, limit);
}

function sourceDigest(source) {
  return crypto.createHash("sha256").update(source).digest("hex").slice(0, 12);
}

function sourceLabel(source) {
  return source
    .replace(/\.[^.]+$/, "")
    .split(path.posix.sep)
    .slice(-3)
    .map((segment) => segment
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase()))
    .join(" / ");
}

export function frontierIdentity(source, visibleTitle) {
  const digest = sourceDigest(source);
  const label = sourceLabel(source);
  const sourceTitle = String(visibleTitle || label).trim();
  const title = slug(sourceTitle) === slug(label)
    ? sourceTitle
    : `${sourceTitle} — ${label}`;
  const sourcePathSlug = slug(source.replace(/\.[^.]+$/, ""), 72);

  return {
    documentId: `DOC-${digest.toUpperCase()}`,
    id: `DFR-${digest.toUpperCase()}`,
    slug: `document-frontier-${sourcePathSlug}-${digest}`,
    title,
  };
}

export function isGeneratedFrontierSource(source) {
  return source === "research/frontier" || source.startsWith("research/frontier/");
}
