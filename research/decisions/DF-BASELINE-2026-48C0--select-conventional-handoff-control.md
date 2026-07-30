---
id: DF-BASELINE-2026-48C0
title: Select a conventional status note as the handoff artifact control
research_area: ros-evaluation
status: review
confidence: medium
created: 2026-07-30
updated: 2026-07-30
related_documents:
  - JR-BASELINE-2026-C61E
  - RP-MEASURES-2026-71B4
  - EX-HANDOFF-2026-0D7A
tags: [baseline, comparator, decision-record]
---

# Decision Record

## Context

The handoff experiment needs a credible control before data are observed. A
no-documentation control would be a straw comparison, while treating a handoff
artifact experiment as a test of all ROS components would exceed its estimand.

## Decision

Compare the ROS structured handoff bundle with a conventional free-form status
note prompted only for goal, current status, remaining work, blockers/risks, and
checks run. Hold task information, tools, safeguards, accessibility, authoring
opportunity, recipient instruction, and verification action constant.

Use a randomized parallel-group recipient design for the initial effect
estimate. Do not expose a recipient to both formats in treatment data unless a
later preregistration explicitly handles learning, period, and carryover effects.

## Alternatives

- No handoff artifact: rejected as an artificially weak baseline.
- Existing repository artifacts only: retained as shared context, but not a
  credible substitute for a successor-directed note.
- Equal-word-count control: rejected because it hides a treatment cost and
  changes normal author behavior.
- Same participant in both conditions: deferred because structured-format
  exposure can contaminate later control behavior.
- Historical ROS-versus-pre-ROS project comparison: insufficient for the
  artifact effect and highly confounded for whole-system attribution.

## Evidence

EV-BASELINE-2026-2B6D requires reproducible descriptions of intervention
delivery and fidelity. EV-BASELINE-2026-A4F8 identifies learning, period, and
carryover risks in software-engineering crossover designs.

## Consequences

The experiment may support or weaken an artifact-level and bounded
workflow-level claim. It cannot validate ROS portfolio value. A separate
prospective ROS attribution study is required.

## Reversibility

High before preregistration and data collection. Reconsider if formative real
handoffs show the comparator is implausible or if a pilot establishes negligible
carryover.

## Follow-up validation

Independent review, formative plausibility check, task/author preflight, rubric
reliability pilot, and final preregistration.
