---
id: EX-HANDOFF-2026-0D7A
title: Controlled handoff reconstruction evaluation
research_area: engineering-handoff
status: proposed
maturity: deep-investigation
created: 2026-07-29
author_agent: codex
tests_hypotheses: [HY-HANDOFF-2026-6B31]
related_theories: [TH-HANDOFF-2026-81C0]
inputs: [paired-task-records, structured-handoffs, conventional-status-notes]
outputs: [reconstruction-time, plan-correctness, omissions, authoring-cost]
depends_on:
  - MS-MEASURES-2026-4C2A
  - MS-SAFEGUARDS-2026-89D1
  - MS-BASELINE-2026-E5A7
  - EX-HANDOFF-2026-6E42
---

# Experiment

## Claim boundary

This is a confirmatory artifact-efficacy experiment, not the bounded preflight
and not a test of ROS as a whole. It must not begin until
EX-HANDOFF-2026-6E42 passes and a final sample-size analysis is locked.

## Research question

Does a task-targeted structured handoff improve correct continuation relative to
a conventional free-form status note?

## Method

Use matched completed repository tasks and the comparator defined by
DF-BASELINE-2026-48C0. Randomize recipients to a parallel group for the initial
effect estimate; stratify broad expertise and task difficulty. Ask each
recipient to produce a continuation plan and execute one safe verification
step. Independent reviewers score plans against concealed source records.

## Acceptance criteria

Use the outcome model in RP-MEASURES-2026-71B4. Pre-register safe continuation
success under an accessible time policy as primary; a critical-harm non-inferiority gate;
and separate efficiency, calibration, coordination, accessibility, and lifecycle
cost outcomes. Do not create post-hoc composite weights.

Apply JR-SAFEGUARDS-2026-7F14 to both conditions. Do not recruit participants
until qualified ethics/human-subject review, data stewardship, fixture safety,
and participatory accessibility gates are satisfied.

## Preregistration draft

### Population and unit

The unit of randomization and analysis is an eligible adult recipient performing
one scored continuation task. Define the target developer population,
recruitment frame, required repository skills, compensation, and broad
expertise/familiarity strata before enrollment. Do not use employer performance
ratings or require disability diagnosis.

### Treatment and control

Use the treatment and conventional-status-note comparator in
DF-BASELINE-2026-48C0, generated without cross-condition contamination. Preserve
the exact prompts, templates, training, examples, authoring budget, and actual
protocol fidelity for both conditions.

### Assignment and concealment

Randomize within predeclared fixture-difficulty and expertise strata using a
reproducible seed held by a person or service not enrolling/scoring
participants. Conceal allocation until the workspace is assigned. Participants
cannot be blinded to visible format; reviewers receive a normalized,
pseudonymous response that conceals condition where feasible.

### Primary estimand

Intention-to-treat risk difference in safe continuation success under the
predeclared accessible time policy: structured bundle minus conventional note.
All randomized participants with retained consent remain in the denominator.
Noncompletion is failure. Withdrawal requiring deletion is not imputed; report
its count and condition without retaining prohibited outcome data.

### Harm estimand

Risk difference in critical unsafe action or high-confidence materially
incorrect continuation. Any critical event triggers protocol review. A small
pilot cannot establish rare-harm non-inferiority merely because no event is
observed.

### Secondary outcomes

Time among successful recipients, plan correctness dimensions, omissions,
unsupported assumptions, verification result, confidence calibration,
clarification usefulness, cognitive load/satisfaction, accessibility-critical
failure, authoring/review/maintenance/interruption time, and rework.

### Primary analysis

Estimate the stratified risk difference with a two-sided 95% confidence
interval and randomization-based test preserving assignment strata. Report
unadjusted condition counts. Use a prespecified task/author hierarchical model
only as sensitivity analysis after qualified statistical review. Secondary
outcomes are estimation-oriented; control the family or label them exploratory.

### Missingness and exclusions

Define eligibility and fixture failure before assignment. Do not exclude
protocol-adherent difficult cases, incorrect answers, long times, or
noncompleters. Record post-assignment technical failure, consent withdrawal,
accessibility failure, and protocol deviation separately. Run worst/best-case
sensitivity analysis for missing retained outcomes where ethically permitted.

### Sample-size constraint

The final sample size is unresolved because baseline success and task/author
clustering are unknown. Under a simple independent two-group normal
approximation, 80% power and two-sided 5% alpha require about 388 recipients per
arm to distinguish 50% from 60% success, before clustering, attrition, or
multiple safeguards. This scenario is a feasibility warning, not a final power
analysis.

Do not relabel a small convenience sample as confirmatory. Use the preflight to
estimate rubric and operational parameters, then obtain an independent
statistical review and lock the smallest practically meaningful effect,
baseline-rate range, clustering assumptions, attrition, and sample size before
treatment data.

### Stopping and changes

Pause for a critical harm, security/privacy incident, consent failure,
accessibility-critical barrier, fixture leakage, allocation failure, or reviewer
reliability failure. Do not stop for apparent benefit or futility without a
predeclared sequential design. Date, reason, author, and impact of every
post-registration amendment; label analyses affected by outcome-aware changes
exploratory.

## Falsification criteria

No practically meaningful improvement, increased unsafe confidence, or total
authoring cost exceeding reconstruction savings.

## Threats to validity

Template familiarity, task difficulty, reviewer subjectivity, artificial time
pressure, author effects, visible condition, task representativeness, and
reviewer inference of condition. A later crossover would add period, learning,
and carryover threats.

## Results

Not run.
