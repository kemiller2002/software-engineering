---
id: HY-AICODING-2026-7C2D
title: AI coding effects are conditional rather than universally positive
research_area: ai-assisted-development
status: supported
confidence: medium
created: 2026-07-29
author_agent: codex
supporting_evidence:
  - EV-AICODING-2026-10A1
  - EV-AICODING-2026-3B8F
  - EV-AICODING-2026-6E21
  - EV-AICODING-2026-C940
  - EV-AICODING-2026-F5D2
contradicting_evidence: []
related_theories: [TH-AICODING-2026-44D0]
supersedes: []
superseded_by: []
---

# Hypothesis

## Statement

The net effect of AI coding assistance changes sign and magnitude with task
structure, developer/repository familiarity, verification completeness,
interaction mode, and the level at which outcomes are measured.

## Mechanism

Generation and search savings compete with prompting, inspection, correction,
integration, and downstream maintenance costs. Familiar experts have less
search cost to remove; underspecified or cross-cutting tasks create more
verification burden. Fast local output may enlarge batches and transfer cost to
reviewers or operations.

## Predictions

- Bounded, greenfield, automatically checkable tasks show larger speed gains.
- Familiar-repository maintenance shows smaller gains or losses unless context
  acquisition and verification are unusually strong.
- Effects shrink when outcome measures include review, rework, defects, and
  operational stability.
- Perceived speedup is an unreliable proxy for elapsed or system-level benefit.

## Evidence that would support it

Pre-registered interactions between treatment and task/repository/evaluation
features that replicate across teams and tool versions.

## Evidence that would contradict it

A stable positive or negative effect across representative strata with no
meaningful moderator interactions and equal downstream quality.

## Tests performed

Rapid comparison of five primary empirical reports; no new experiment run.

## Results

Observed effects differ by setting and outcome level in the predicted
direction, but the studies are not directly comparable enough to identify
causal moderators.

## Falsification attempts

The strongest universal-positive evidence is the GitHub controlled task; its
narrow setting does not explain maintenance results. The strongest
universal-negative evidence is the early METR RCT; its authors explicitly
reject generalization to most developers and later tools.

## Current assessment

Supported at Medium confidence (0.65). Heterogeneity is well supported;
specific moderator effects remain provisional.

## Next experiment

Run EX-AICODING-2026-2D77.

