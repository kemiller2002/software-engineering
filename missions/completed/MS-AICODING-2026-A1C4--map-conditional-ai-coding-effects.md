---
id: MS-AICODING-2026-A1C4
title: Map conditional effects of AI coding assistance
status: completed
artifact_tier: full-rep
priority: high
research_area: ai-assisted-development
discipline:
  - software-engineering
  - human-computer-interaction
  - economics
created: 2026-07-29
owner_agent: codex
depends_on: []
related_projects:
  - software-engineering
required_framework:
  - framework/REP-SPECIFICATION.md
  - framework/policies/RESEARCH-POLICY.md
  - framework/policies/EVIDENCE-POLICY.md
outputs:
  - research/packages/RP-AICODING-2026-B7E2--conditional-effects-of-ai-coding-assistance.md
  - research/journals/JR-AICODING-2026-91AF--initial-evidence-synthesis.md
---

# Mission

## Objective

Determine whether available empirical evidence supports a general productivity
claim for AI coding assistance, identify boundary conditions, and define the
next discriminating experiments.

## Why this matters

Tool adoption is moving faster than valid measurement. A false universal claim
can cause either wasteful rejection or unsafe over-adoption.

## Scope

### Included

Controlled and field evidence about developer speed, delivery outcomes, and
merge readiness; evidence published through 2026-07-29.

### Excluded

Security-specific effects, learning outcomes, labor-market effects, model
comparisons, and a complete systematic review.

## Existing context

Parent mandate:
`prompts/Software-Engineering-Research-Mission-REP-v2.0.md`.
The repository contained no accepted domain evidence before this mission.

## Initial hypotheses

- AI assistance produces a positive average productivity effect.
- Effects vary materially with task, developer, repository familiarity,
  evaluation method, and workflow controls.

## Required evidence

At least one controlled study, one realistic field study, one organizational
study, contradictory findings, and explicit threats to validity.

## Constraints

This is a bounded rapid evidence map, not an exhaustive systematic review.
Vendor studies are treated as interested-party evidence.

## Execution instructions

Preserve claim-level provenance, distinguish perception from observation, seek
counterevidence, and propose tests that measure both speed and downstream cost.

## Deliverables

Evidence records, hypothesis, theory, experiment proposal, journal, full REP,
future questions, and generated registry updates.

## Success criteria

The REP states what can and cannot be concluded, explains contradictions with
testable moderators, and gives an executable next experiment.

## Stop conditions

Stop after the evidence establishes that a universal effect is unjustified and
the highest-value discriminating test is specified.

## Verification

Completed on 2026-07-29. Outputs exist; `./ros registry build` and
`./ros validate` are the required final checks.

