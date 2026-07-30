# Software Engineering handoff

## Objective

Bootstrap Software Engineering as a greenfield Repository Operating System pilot.

## Current state

- ROS 1.0.0 greenfield profile installed on 2026-07-29.
- Project charter is a draft.
- No first vertical slice, evidence record, hypothesis, or experiment has been
  accepted for implementation.
- `MS-AICODING-2026-A1C4` completed the first bounded research cycle.
- `RP-AICODING-2026-B7E2` is in review with five evidence records, supported
  hypothesis `HY-AICODING-2026-7C2D`, candidate theory
  `TH-AICODING-2026-44D0`, and proposed experiment
  `EX-AICODING-2026-2D77`.
- `RP-HANDOFF-2026-A8E1` provisionally selects a handoff reconstruction
  evaluator as the first slice; `EX-HANDOFF-2026-0D7A` is proposed.
- `MS-BOUNDARY-2026-C21E` completed twelve bounded body-of-work maps.
  `RP-BOUNDARY-2026-5A7C` and `DF-BOUNDARY-2026-3F72` reject a distinct
  discipline at review stage; an experimental integration profile remains
  unvalidated.
- `MS-MEASURES-2026-4C2A` is complete. `RP-MEASURES-2026-71B4` rejects
  reconstruction time, document quality, and clarification count as sufficient
  primary outcomes. It specifies safe continuation success plus independent
  harm and lifecycle-cost gates.
- `research/frontier/PORTFOLIO-QUEUE.md` is the ranked graph view. Safeguards is
  complete in synthesis, as is the artifact baseline.
- `JR-SAFEGUARDS-2026-7F14` defines the minimal-data, sandbox, consent,
  accessibility, retention, and stop boundaries. It does not authorize
  participant research.
- `DF-BASELINE-2026-48C0` selects a competent conventional status note as the
  artifact control. `MS-ROSATTRIB-2026-31D9` preserves whole-ROS attribution as
  a separate future question.
- `MS-PREREG-2026-6B9F` is active. Its internal protocol draft is complete
  through estimands and analysis, but independent preflight and authorization
  gates remain.
- The operating system is under evaluation.

## Validation

Last run on 2026-07-30:

```bash
./ros registry build
./ros registry check
./ros validate
```

Registry build updated six generated registries; registry check and validation
passed. `git diff --check` also passed.

## Unresolved questions

1. Can safe continuation and critical harm be scored reliably on held-out cases?
2. Can disabled participants use the complete study path equivalently?
3. Which ethics/human-subject rules and retention requirements apply to the
   actual sponsor, jurisdiction, participants, and intended publication?
4. Is confirmatory recruitment feasible? A simple 50%-to-60% scenario needs
   about 388 recipients per arm before clustering or attrition.
5. What evidence could attribute value to ROS beyond the handoff artifact?

## Next action

Supply the independent and accountable roles required by
`EX-HANDOFF-2026-6E42`: study owner, data steward, qualified ethics reviewer,
statistical reviewer, two rubric reviewers, and direct accessibility
participants. Freeze preregistration only after those gates pass. Independently
review all four completed REPs and three Decision Records. Do not run
`EX-AICODING-2026-2D77` until a partner, telemetry review, and preregistration
exist.
