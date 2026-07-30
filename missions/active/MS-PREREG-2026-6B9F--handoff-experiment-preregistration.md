---
id: MS-PREREG-2026-6B9F
title: Preregister the controlled handoff reconstruction experiment
status: active
maturity: deep-investigation
artifact_tier: full-rep
priority: high
portfolio_rank: 1
research_area: handoff-experiment
discipline: [software-engineering, experimental-design, human-factors]
created: 2026-07-30
owner_agent: codex
parent_questions: [HY-HANDOFF-2026-6B31]
child_questions:
  - What treatment components are causal?
  - Does benefit exceed authoring and maintenance cost?
supporting_evidence: [EV-MAINT-2026-0A52, EV-SAFETY-2026-19D5]
contradicting_evidence: [EV-SAFETY-2026-7EA2, EV-COG-2026-27F1]
related_research: [EX-HANDOFF-2026-0D7A]
depends_on:
  - EX-HANDOFF-2026-6E42
enables:
  - EX-HANDOFF-2026-0D7A
repositories_impacted: [software-engineering]
outputs:
  - research/experiments/EX-HANDOFF-2026-0D7A--reconstruction-evaluation.md
confidence: medium
remaining_uncertainty: Final sample size, rubric reliability, ethics authorization, accessibility preflight, and practical harm threshold.
---

# Mission

Advance EX-HANDOFF-2026-0D7A from proposed to active only after every dependency
is complete and the protocol fixes hypotheses, outcomes, exclusions, analysis,
harms, and stopping rules before data collection.

## Execution checklist

- [x] Measurement dependency completed: RP-MEASURES-2026-71B4.
- [x] Safeguard design completed: JR-SAFEGUARDS-2026-7F14.
- [x] Artifact baseline selected: DF-BASELINE-2026-48C0.
- [x] Treatment/control and artifact-level claim boundary specified.
- [x] Primary and harm estimands drafted.
- [x] Assignment, blinding limits, missingness, exclusions, and stopping drafted.
- [x] Small-pilot efficacy assumption challenged with a power scenario.
- [x] Preflight split from confirmatory experiment: EX-HANDOFF-2026-6E42.
- [ ] Independent rubric reliability on held-out examples.
- [ ] Participatory accessibility preflight.
- [ ] Qualified ethics/human-subjects determination and named data steward.
- [ ] Fixture authorization, realism, security, and safe-action approval.
- [ ] Baseline success and clustering inputs established without inspecting
  confirmatory treatment effects.
- [ ] Qualified statistical review and final sample-size calculation.
- [ ] Minimum practical effect and rare-harm interpretation approved.
- [ ] Independent protocol review.
- [ ] Versioned preregistration frozen and timestamped before enrollment.

## Current disposition

Substantial protocol drafting is complete, but the mission remains active and
the confirmatory experiment remains proposed. Advancing maturity further would
misstate evidence: every unchecked item requires independent people, an approved
study context, or preflight observations that do not yet exist.
