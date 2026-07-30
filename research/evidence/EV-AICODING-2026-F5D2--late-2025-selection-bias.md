---
id: EV-AICODING-2026-F5D2
title: Later METR RCT became unreliable because AI abstention induced selection
research_area: ai-assisted-development
evidence_type: primary
source_title: We are Changing our Developer Productivity Experiment Design
source_author: Joel Becker, Nate Rush, Tom Cunningham, David Rein, and Khalid Mahamud
source_uri: https://metr.org/blog/2026-02-24-uplift-update/
source_date: 2026-02-24
retrieved: 2026-07-29
created_by_agent: codex
confidence: high
supports: [HY-AICODING-2026-7C2D]
contradicts: []
related_theories: [TH-AICODING-2026-44D0]
tags: [selection-bias, measurement, productivity]
---

# Evidence Record

## Evidence summary

METR's later experiment produced apparent small speedups but the authors judged
the estimate unreliable because developers unwilling to work without AI
selectively declined participation and concurrent agents complicated time
measurement.

## Exact claim supported or contradicted

As AI becomes embedded, randomized abstention studies can lose external
validity and time-on-task can cease to represent parallelized work.

## Source provenance

Primary methodological update by the study authors.

## Relevant excerpt or data

Original-developer estimate: 18% speedup with CI spanning 38% speedup to 9%
slowdown; new-developer estimate: 4% speedup with CI spanning 15% speedup to 9%
slowdown. Authors characterize the signal as weak.

## Interpretation

Measurement design must evolve with treatment adoption and concurrency.

## Limitations

The report does not estimate the size of selection bias and cannot establish a
current population effect.

## Counterevidence

The raw direction may indicate improving tools, but is not decisive.

## Reproduction or verification notes

Prefer stepped-wedge rollouts, encouragement designs, telemetry, or matched
within-person task portfolios that do not require prolonged abstention.

