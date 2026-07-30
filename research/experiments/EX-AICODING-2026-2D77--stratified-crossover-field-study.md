---
id: EX-AICODING-2026-2D77
title: Stratified crossover field study of AI coding net value
research_area: ai-assisted-development
status: proposed
maturity: scoping
created: 2026-07-29
author_agent: codex
tests_hypotheses: [HY-AICODING-2026-7C2D]
related_theories: [TH-AICODING-2026-44D0]
inputs: [real-maintenance-tasks, repository-telemetry, review-rubric]
outputs: [causal-effect-estimates, moderator-estimates, lifecycle-cost-estimates]
depends_on:
  - research-partner
  - privacy-and-telemetry-review
  - preregistration
---

# Experiment

## Research question

Which observable task, developer, repository, and verification conditions
change the sign of AI assistance's lifecycle-adjusted effect?

## Hypotheses tested

HY-AICODING-2026-7C2D.

## Variables

Treatment: AI allowed with logged use versus a normal-workflow comparison.
Pre-registered moderators: task novelty, repository familiarity, task
specifiability, automated-check coverage, dependency breadth, and interaction
mode. Outcomes: active human time, elapsed time, reviewer time, lead time,
rework, escaped defects, change failure, satisfaction, and comprehension.

## Method

Multi-team randomized crossover or randomized encouragement design. Stratify
real tasks before assignment; collect outcomes through merge plus a 30-day
window. Analyze treatment-by-moderator interactions with team/developer
clustering and report distributions, not only means.

## Acceptance criteria

Adequate power for pre-registered primary interactions; blinded merge-readiness
ratings; treatment adherence measured; missingness and selection audited.

## Falsification criteria

Reject the conditional-effects hypothesis if effects are stable across strata
and horizons within practically meaningful equivalence bounds.

## Controls

Tool/model version, task size, developer fixed effects where possible,
repository, concurrent work, review policy, and baseline test coverage.

## Procedure

1. Pre-register tasks, outcomes, estimands, equivalence bounds, and exclusions.
2. Pilot telemetry without estimating effects.
3. Randomize or encourage treatment within strata.
4. Log human and agent activity without collecting sensitive content.
5. Obtain blinded review and follow merged changes for 30 days.
6. Publish null, adverse, and heterogeneous results.

## Results

Not run.

## Analysis

Estimate intention-to-treat and treatment-on-treated effects; test mediation by
verification/review time and batch size; perform sensitivity analysis for
noncompliance and attrition.

## Threats to validity

Rapid tool drift, treatment contamination, abstention bias, task selection,
privacy constraints, learning effects, and organization-specific review norms.

## Replication notes

Preserve the protocol while allowing tool versions to vary as an explicit
factor. Replicate in unfamiliar and familiar codebases.

## Conclusion

Proposed as the highest-value next test.

## Registry updates required

Update experiment, evidence, hypothesis, and theory records after execution.
