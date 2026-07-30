---
id: JR-BASELINE-2026-C61E
title: Handoff artifact and ROS portfolio baseline design
research_area: ros-evaluation
author_agent: codex
created: 2026-07-30
related_mission: MS-BASELINE-2026-E5A7
related_package: RP-MEASURES-2026-71B4
evidence_ids:
  - EV-BASELINE-2026-2B6D
  - EV-BASELINE-2026-A4F8
  - EV-MEASURES-2026-11AF
  - EV-SAFEGUARDS-2026-3A91
hypothesis_ids: [HY-HANDOFF-2026-6B31]
theory_ids: [TH-HANDOFF-2026-81C0]
tags: [baseline, comparator, estimand, attribution]
---

# Baseline Design

## Objective

Define a credible comparison workflow before outcome observation and prevent a
bounded handoff study from being interpreted as validation of the whole
Repository Operating System.

## Estimands that must remain separate

1. **Artifact efficacy:** Does the structured handoff bundle improve safe
   continuation relative to a credible conventional status note, under the same
   task, workspace, safeguards, and recipient procedure?
2. **Workflow effectiveness:** Does authoring and maintaining the structured
   bundle improve lifecycle-adjusted outcomes when its information-elicitation
   process and cost are included?
3. **ROS portfolio value:** Does the repository operating system improve
   decision quality, traceability, handoff continuity, and rework net of total
   operating cost?

EX-HANDOFF-2026-0D7A can estimate the first and, with authoring data, explore the
second. It cannot estimate the third. ROS includes governance, evidence,
decisions, registries, validation, and portfolio operations that are neither
randomized nor held constant by that experiment.

## Selected comparator

The primary control is a **conventional repository handoff**:

- the same immutable task snapshot, code, tests, issue/PR text, and version
  history available in treatment;
- one free-form status note produced for the named successor;
- the neutral instruction: “State what you were trying to do, current status,
  what remains, blockers or risks, and checks run”;
- ordinary links permitted, but no ROS template, required identifiers, evidence
  graph, rubric preview, or section checklist;
- the same authoring time budget and accessible authoring tools as treatment.

This is not “no documentation.” It represents a competent lightweight workflow
and avoids making the control artificially negligent. Actual content length and
authoring time are outcomes, not quantities to force equal after the fact.

## Structured-handoff treatment

The treatment receives the same source material and authoring opportunity, plus
the ROS handoff requirements: objective, current state, completed work,
evidence/decisions, tests, assumptions, risks, unresolved questions, and exact
next action with durable links. The final protocol must preserve the treatment
version and examples without revealing the recipient scoring rubric.

## Shared conditions

| Dimension | Required equality or control |
|---|---|
| Task | matched immutable source fixtures with concealed answer keys |
| Information access | identical repository snapshot and task records |
| Tools | same disposable sandbox, editor, search, test access, and network rule |
| Safety | JR-SAFEGUARDS-2026-7F14 applied identically |
| Accessibility | same participant accommodation in both assigned conditions |
| Recipient instruction | same continuation goal and allowed clarification path |
| Verification | same task-specific allowlisted safe action |
| Review | same pseudonymous, condition-blinded scoring format |
| Expertise | measure repository familiarity and task expertise in broad bands |
| Authoring | same maximum opportunity; record actual author/review time |

## Design choice and carryover

Use a randomized parallel-group recipient design for the first effect estimate.
Each recipient sees one condition for one scored task. Match or stratify
assignment by broad expertise and fixture difficulty. This sacrifices some
efficiency but avoids teaching recipients the structured handoff schema before
they encounter the control [EV-BASELINE-2026-A4F8].

A small non-effect-estimating preflight may expose reviewers and accessibility
testers to both formats. Its data must not enter the treatment estimate.

If later work uses a crossover design, it must use non-redundant matched tasks,
randomized sequence, explicit period and carryover analysis, and a sensitivity
analysis excluding the second period. Counterbalancing alone is insufficient.

## Author generation and contamination

Do not have the same author create the control after creating the structured
version of the same task: the schema can contaminate the free-form note. Use one
of these preregistered approaches:

1. independent authors randomly assigned to one condition per task; or
2. a balanced author-by-task design in which an author never sees both
   conditions for the same task and condition order is randomized.

Record author expertise, familiarity, actual time, source accesses, and
deviations at event level without keystroke or screen surveillance. Review both
artifacts for answer leakage and protocol adherence before recipient assignment.

## What must not be normalized away

- Do not equalize word count; verbosity may be a treatment cost or mechanism.
- Do not repair weak control notes after seeing treatment artifacts.
- Do not force equal clarification counts; clarification can be useful.
- Do not combine success, harm, time, and authoring cost into one fitted score.
- Do not exclude noncompleters to make successful recipients appear faster.
- Do not call the conventional note “unstructured” if its neutral prompt
  provides structure; report the prompt verbatim.

## Decision rules

The artifact efficacy claim requires the preregistered meaningful improvement in
safe continuation under the accessible time policy and passage of the
critical-harm gate. Workflow effectiveness additionally requires positive
lifecycle value after authoring, review, clarification, and rework costs.

No result from this experiment, positive or negative, is sufficient to accept or
reject ROS as a whole. The portfolio-level claim requires a separate prospective
comparison with a frozen lightweight operating baseline and repeated milestones.

## Threats, confidence, and limitations

Confidence is Medium that this is a credible first comparator. Major threats
remain task representativeness, author effects, visible format that prevents
participant blinding, reviewer inference of condition, small samples, fixture
difficulty, and artificial continuation goals.

The conventional note is a designed proxy, not an observed industry standard.
A formative sample of real, authorized handoffs should test ecological
plausibility without becoming treatment data. This record does not specify
sample size or analysis code.

## Follow-on work

1. Preregister task sampling, assignment, author design, adherence, exclusions,
   estimand, effect thresholds, and analysis.
2. Preflight artifact plausibility and rubric reliability without estimating
   treatment effects.
3. Create a separate ROS attribution mission with a prospective lightweight
   workflow baseline and repeated milestones.
