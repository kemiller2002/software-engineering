---
id: MS-BASELINE-2026-E5A7
title: Preregister the lightweight comparison baseline for the ROS pilot
status: completed
maturity: synthesis
artifact_tier: research-cycle
priority: high
portfolio_rank: 3
research_area: ros-evaluation
discipline: [software-engineering, experimental-design]
created: 2026-07-30
owner_agent: codex
parent_questions: [PILOT-MEASUREMENT-software-engineering]
child_questions:
  - What is the credible non-ROS workflow?
  - Which differences make the comparison unfair?
supporting_evidence: []
contradicting_evidence: []
related_research:
  - docs/PILOT-MEASUREMENT-PLAN.md
  - MS-MEASURES-2026-4C2A
depends_on: [MS-MEASURES-2026-4C2A]
enables: [MS-PREREG-2026-6B9F]
repositories_impacted: [software-engineering]
outputs:
  - research/journals/JR-BASELINE-2026-C61E--handoff-and-ros-baselines.md
  - research/decisions/DF-BASELINE-2026-48C0--select-conventional-handoff-control.md
confidence: medium
remaining_uncertainty: Whether the conventional-note proxy is ecologically credible and whether whole-ROS attribution is feasible.
---

# Mission

Specify the comparison workflow before outcomes are observed, document
non-equivalence, and define a decision rule that cannot reward documentation
volume by construction.

## Completion record

- **Completed:** 2026-07-30.
- **Summary:** Selected a competent conventional status note as the artifact
  control and separated artifact efficacy, workflow effectiveness, and
  whole-ROS portfolio value.
- **Major findings:** “No documentation” is a straw baseline; equal word count
  hides treatment mechanisms and cost; a crossover can be contaminated by
  learning; the handoff experiment cannot validate the full ROS.
- **Confidence:** Medium pending formative plausibility and independent review.
- **Limitations:** No real-handoff sample, task preflight, power analysis, or
  treatment data; the control is designed rather than empirically established.
- **Remaining unknowns:** Ecological validity, task matching, author variance,
  carryover magnitude, reviewer blinding, and project-level counterfactual.
- **Supporting references:** EV-BASELINE-2026-2B6D and
  EV-BASELINE-2026-A4F8.
- **Follow-on research:** Preregister the artifact experiment and separately
  design prospective whole-ROS attribution under MS-ROSATTRIB-2026-31D9.
- **Roadmap impact:** The internal baseline dependency is complete.
  Preregistration becomes the next internally executable synthesis, but
  recruitment remains externally blocked by safeguards.
- **Other repositories:** No comparison data may be imported from another
  repository without authorization and comparability review.
- **Recommended engineering work:** Prepare immutable paired fixtures and a
  conventional-note prompt only after protocol review; do not build portfolio
  attribution claims into the evaluator.
