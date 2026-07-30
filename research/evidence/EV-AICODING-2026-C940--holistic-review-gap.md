---
id: EV-AICODING-2026-C940
title: Passing tests overstated agent merge readiness on realistic tasks
research_area: ai-assisted-development
evidence_type: primary
source_title: Research Update - Algorithmic vs. Holistic Evaluation
source_author: METR
source_uri: https://metr.org/blog/2025-08-12-research-update-towards-reconciling-slowdown-with-time-horizons/
source_date: 2025-08-13
retrieved: 2026-07-29
created_by_agent: codex
confidence: medium
supports: [HY-AICODING-2026-7C2D]
contradicts: []
related_theories: [TH-AICODING-2026-44D0]
tags: [evaluation, quality, benchmark-validity]
---

# Evidence Record

## Evidence summary

On 18 real tasks from two mature repositories, agent solutions could pass
reference tests yet fail holistic merge-readiness review because of testing,
documentation, formatting, typing, or general-quality defects.

## Exact claim supported or contradicted

Algorithmic task completion can overestimate real-world engineering utility.

## Source provenance

Primary follow-up evaluation by METR on tasks related to its developer RCT.

## Relevant excerpt or data

Eighteen tasks; reference-test scoring compared with manual review across five
failure modes.

## Interpretation

Evaluation completeness is a candidate moderator of measured AI benefit.

## Limitations

Small sample, two repositories, one agent/model generation, and subjective
elements in manual review.

## Counterevidence

Tests remain useful evidence; the result shows insufficiency, not uselessness.

## Reproduction or verification notes

Use blinded repository maintainers, inter-rater reliability, and logged repair
time in replication.

