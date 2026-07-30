---
title: Software Engineering Research Portfolio Queue
status: active
updated: 2026-07-30
owner: research-portfolio
source_of_truth: missions and canonical research artifacts
---

# Portfolio Objective

Reduce the uncertainties that most affect whether the first bounded pilot can
produce valid, safe, decision-relevant evidence at acceptable operating cost.
This is a generated-by-review navigation view; mission and research records are
the durable nodes.

# Prioritization Method

Rank considers decision consequence, uncertainty, dependency leverage,
falsifiability, feasibility, and risk. Rank is provisional and must be revisited
after every completed item. A blocked high-value item does not displace useful
unblocked work.

# Active and Backlog Graph

| Rank | Node | Maturity | Parents | Dependencies | Enables | Confidence | Largest uncertainty | State |
|---:|---|---|---|---|---|---|---|---|
| 1 | MS-PREREG-2026-6B9F | Deep Investigation | HY-HANDOFF-2026-6B31 | preflight, ethics, accessibility, statistics, independent review | EX-HANDOFF-2026-0D7A | Medium design | sample size and external gates | active; external-dependency |
| 2 | EX-HANDOFF-2026-6E42 | Validation | measurement, safeguards, baseline | independent reviewers, accessibility participants, ethics determination | confirmatory experiment | Low | rubric reliability and protocol feasibility | proposed; external-dependency |
| 3 | MS-REVIEW-2026-7A31 | Validation | four review REPs and three decisions | independent reviewer | acceptance or revision | Low | independent survivability | external-dependency |
| 4 | EX-AICODING-2026-2D77 | Scoping | HY-AICODING-2026-7C2D | partner, privacy-reviewed telemetry, preregistration | AI-use policy | Medium theory | current causal moderators | blocked |
| 5 | MS-ROSATTRIB-2026-31D9 | Idea | ROS pilot | first handoff milestone | ROS adoption decision | Low | credible project counterfactual | proposed; dependency-blocked |
| 6 | MS-TERMS-2026-0F4D | Idea | DF-BOUNDARY-2026-3F72 | none | label disposition | Very Low | any positive label value | proposed; low expected value |

# Completed Nodes Still Awaiting Review

| Node | Maturity | Finding | Review debt |
|---|---|---|---|
| MS-SAFEGUARDS-2026-89D1 | Synthesis | minimal-data sandboxed study is feasible in design | ethics, data steward, and participatory accessibility gates |
| MS-BASELINE-2026-E5A7 | Synthesis | conventional note is artifact control; ROS needs separate study | comparator plausibility and decision review |
| RP-MEASURES-2026-71B4 | Synthesis | safe continuation plus separate harm/cost gates | rubric reliability and independent review |
| RP-AICODING-2026-B7E2 | Synthesis | AI effects are conditional | independent source/disposition review |
| RP-HANDOFF-2026-A8E1 | Synthesis | handoff evaluator is best provisional slice | validate outcome model and baseline |
| RP-BOUNDARY-2026-5A7C | Synthesis | distinct discipline unsupported | independent boundary review |
| DF-HANDOFF-2026-5C9B | Synthesis | select reversible handoff pilot | remains review |
| DF-BASELINE-2026-48C0 | Synthesis | select competent conventional-note control | remains review |
| DF-BOUNDARY-2026-3F72 | Synthesis | reject distinct discipline | remains review |

# Knowledge Relationships

```text
RP-HANDOFF / HY-HANDOFF
  -> MS-MEASURES (complete) ───┐
  -> MS-SAFEGUARDS (complete) ─┼-> EX-PREFLIGHT
  -> MS-BASELINE (complete) ───┘      -> MS-PREREG -> EX-HANDOFF
                                                         |
first handoff milestone ---------------------------------┴-> MS-ROSATTRIB

RP-AICODING / HY-AICODING
  -> partner + safeguards + preregistration -> EX-AICODING

RP-BOUNDARY / DF-BOUNDARY
  -> MS-TERMS (low priority)
  -> comparative profile test embedded in EX-HANDOFF
```

# Monitoring and Review Triggers

- Re-rank after every mission completion or material contradictory evidence.
- Review AI-coding evidence when tool generation changes materially or by
  2026-10-30, whichever comes first.
- Review handoff/profile conclusions after the first pilot evidence.
- Move any item backward if construct validity, safety, or replication weakens.
- Never advance an item to Engineering Ready while its governing Decision
  Record remains in review.

# Portfolio Review — 2026-07-30

- **Priority change:** Outcome validity was resolved enough to stop blocking
  design. Safeguards and baseline are now complete in synthesis.
- **Invalidation:** The earlier queue ordering was invalidated; it placed
  baseline and safeguards ahead of the measurement dependency and treated
  reconstruction time as if already usable.
- **Merge/archive decision:** No duplicate or obsolete mission was found.
  Historical completed work remains visible because it carries review debt.
- **Repository decision:** No new repository is justified. All active questions
  concern this pilot and share its evidence graph.
- **Highest-value opportunity:** Determine whether the study can collect enough
  evidence while minimizing source exposure, behavioral surveillance,
  accessibility exclusion, and participant risk.

# Portfolio Review — after safeguards and baseline

- **Priority change:** Preregistration is the highest-value active item, but its
  next steps require independent reviewers, accessibility participants,
  qualified ethics determination, data stewardship, and statistical review.
- **Invalidated assumptions:** An identical time cap is not accessibility
  neutral; de-identification alone is not a privacy boundary; a no-documentation
  control is not credible; a handoff artifact experiment cannot validate ROS.
- **Queue split:** Whole-ROS attribution moved to MS-ROSATTRIB-2026-31D9.
  Rubric/protocol feasibility moved to EX-HANDOFF-2026-6E42 so it cannot be
  confused with confirmatory efficacy.
- **Feasibility challenge:** A simple scenario needs about 388 recipients per
  arm for a 50% versus 60% success contrast at 80% power and two-sided 5%
  alpha. The bounded pilot is therefore preflight research unless a justified
  larger effect, stronger design, or adequate sample is established.
- **Archive/merge decision:** No record should be archived. The original flat
  queue is superseded as a navigation model but preserved as a compact view.
- **Highest-value next action:** Obtain the external roles and approvals needed
  for EX-HANDOFF-2026-6E42; otherwise independent review has higher expected
  value than low-priority terminology work.
