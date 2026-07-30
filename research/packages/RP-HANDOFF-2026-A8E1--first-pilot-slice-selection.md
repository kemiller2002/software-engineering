---
id: RP-HANDOFF-2026-A8E1
title: First communication pilot slice selection
research_area: engineering-handoff
discipline: [software-engineering, human-computer-interaction]
author_agent: codex
version: 1.0.0
status: review
confidence: medium
completion: complete
priority: high
created: 2026-07-29
updated: 2026-07-29
related_projects: [software-engineering]
related_documents:
  - MS-HANDOFF-2026-D4A8
  - JR-HANDOFF-2026-39E4
  - DF-HANDOFF-2026-5C9B
supersedes: []
superseded_by: []
tags: [pilot-selection, handoff, reconstruction]
keywords: [handoff, task continuation, documentation quality, evaluation]
---

# Research State Snapshot

- **Theory Version:** TH-HANDOFF-2026-81C0 v0.1.0.
- **Knowledge Base Version:** Second domain research package.
- **Highest Confidence Areas:** Missing rationale/state can block work.
- **Lowest Confidence Areas:** Structured-handoff causal effect.
- **Largest Remaining Unknown:** Whether benefits exceed authoring cost.
- **Active Research Streams:** EX-HANDOFF-2026-0D7A proposed.
- **Recently Invalidated Ideas:** Onboarding can be represented by reconstruction time.
- **Priority Changes:** Pilot-slice selection resolved; baseline/preregistration next.

# Executive Summary

The first vertical slice should be a handoff reconstruction evaluator for a
named successor and next task. Field evidence shows that work is deferred when
design rationale, intended behavior, or program-state explanations exist only
in unavailable coworkers [EV-HANDOFF-2026-2A10]. Documentation quality is
measurable through goal support, clarity, findability, and reliability
[EV-HANDOFF-2026-4F92], while explanation usefulness depends on audience and
goal [EV-HANDOFF-2026-73D4]. The choice is provisional at Medium confidence
because no direct experiment yet shows that the proposed structured handoff
outperforms a lightweight note.

# Original Objective

Select one valuable, measurable, safe, two-to-four-week communication problem.

## Success Criterion

One reversible decision with alternatives, evidence, acceptance outcomes, and
falsification conditions.

# Scope

## Included

Task handoff, architecture explanation, onboarding, and change-rationale
candidates.

## Excluded

Implementation, production data, automated acceptance, and discipline claims.

## Scope Changes

None.

# Repository Context

The draft charter required a first user and outcome. The ROS handoff standard
creates an immediate internal test surface. The top AI experiment remains
dependency-bound rather than complete.

# Current Understanding

The smallest useful communication unit is not “documentation” in general but a
recipient- and goal-specific continuation artifact. It must be evaluated by
what the successor can correctly do, not by template completeness.

# Key Discoveries

- Unavailable human knowledge can block engineering work
  [EV-HANDOFF-2026-2A10].
- Documentation quality is multidimensional and associated with technical
  capability outcomes [EV-HANDOFF-2026-4F92].
- Explanation scope must fit recipient role, experience, and goal
  [EV-HANDOFF-2026-73D4].
- Onboarding includes learning, confidence, and socialization, so task
  reconstruction is only one bounded outcome [EV-HANDOFF-2026-B6E8].

# Evidence Registry

| ID | Observation | Method | Quality and Limits |
|---|---|---|---|
| EV-HANDOFF-2026-2A10 | Unavailable coworkers can block information needs | Observation of 17 developers | Medium; one older site |
| EV-HANDOFF-2026-4F92 | Documentation quality associates with capability outcomes | Industrial survey/model | Medium; observational |
| EV-HANDOFF-2026-73D4 | Explanation depends on audience and goal | 17 interviews | Medium; exploratory |
| EV-HANDOFF-2026-B6E8 | Onboarding is multidimensional | Interviews plus surveys | Medium; single company |

## Contradictory Evidence Matrix

| Candidate claim | Supporting evidence | Contradiction/limit | Disposition |
|---|---|---|---|
| Better handoffs improve continuation | Problem/quality evidence in -2A10 and -4F92 | No direct intervention test | Active hypothesis |
| One standard handoff fits all | Template need | -73D4 shows audience dependence | Rejected |
| Reconstruction measures onboarding | Task component in -B6E8 | Learning, confidence, socialization omitted | Rejected |

# Hypothesis Registry

| ID | Evidence For | Evidence Against | Confidence | Disposition |
|---|---|---|---|---|
| HY-HANDOFF-2026-6B31 | -2A10, -4F92, -73D4 | -B6E8 bounds scope | Medium 0.55 | active |

# Failed Assumptions

- A complete template is sufficient: rejected; success is recipient action.
- A generic audience is sufficient: rejected.
- Onboarding can be the first narrow outcome: rejected as too multidimensional.

# Open Questions

Each question survived a measurability, practice-impact, hidden-assumption, and
alternative-formulation critique.

1. **Which handoff fields causally improve correct continuation?** Matters:
   removes ceremony. Evidence: -2A10/-73D4. Unknown: field interactions.
   Difficulty/impact/novelty: medium/high/high. Experiment: factorial ablation.
   Wrong-question risk: fields may proxy author effort; control authoring time.
2. **When does authoring cost exceed reconstruction savings?** Matters:
   adoption. Evidence: -4F92 says documentation costs work. Unknown: reuse rate.
   Medium/high/medium. Experiment: lifecycle cost crossover. Wrong-question
   risk: ignores risk avoided; include error severity.
3. **Can an evaluator detect false confidence as well as omissions?** Matters:
   superficially complete handoffs may harm. No direct evidence. High/very
   high/high. Experiment: seeded misleading handoffs. Wrong-question risk:
   evaluator gaming; blind adversarial cases.
4. **How should handoffs adapt to successor expertise?** Matters: avoids overload
   and gaps. Evidence: -73D4. Unknown: minimal expertise model. Medium/high/high.
   Experiment: expertise-by-detail factorial. Wrong-question risk: job title is
   a weak proxy; measure task-relevant knowledge.
5. **Does evidence linking outperform prose explanation?** Matters:
   verifiability. Evidence: -2A10 information needs. Unknown: navigation cost.
   Medium/high/high. Experiment: linked versus self-contained packets.
   Wrong-question risk: links decay; measure availability and update burden.
6. **Which reconstruction outcome predicts actual task success?** Matters:
   prevents metric theater. Evidence: no direct study. High/very high/high.
   Experiment: plan scores versus blinded task execution. Wrong-question risk:
   execution contains coding skill; stratify competence.
7. **Do AI-generated handoffs preserve rationale or fabricate coherence?**
   Matters: scalable automation safety. Evidence: current AI REP warns of
   verification cost. High/very high/very high. Experiment: provenance-blinded
   factuality and continuation trial. Wrong-question risk: model drift; record
   versions.
8. **How quickly do handoffs decay after repository change?** Matters:
   maintenance burden. Evidence: -4F92 values currency. Medium/high/high.
   Experiment: longitudinal contradiction detection. Wrong-question risk:
   decay may be task closure; distinguish active/closed work.
9. **Can handoff quality be scored without exposing sensitive source or
   telemetry?** Matters: privacy. Evidence: not established. High/high/high.
   Experiment: metadata-only versus full-content scoring. Wrong-question risk:
   privacy transformations destroy meaning; audit information loss.
10. **Does a structured handoff reduce interruptions to experts?** Matters:
    transfers benefit beyond successor. Evidence: -2A10 and older coordination
    findings. High/high/medium. Experiment: cluster crossover measuring
    clarification load. Wrong-question risk: fewer questions can indicate
    disengagement; measure correct progress.

# Recommended Next Research

Preregister EX-HANDOFF-2026-0D7A, define minimum practical effect and composite
failure rule, then pilot on synthetic/public repository tasks.

# Research Backlog

Field replication; expertise adaptation; decay detection; AI-generated handoff
factuality; privacy-preserving evaluation; expert interruption effects.

# Suggested Specialized Research Agents

None required before the small pilot. Later use an HCI experiment designer and
privacy reviewer.

# Parallel Research Opportunities

The boundary-language review and lightweight baseline design can proceed while
the handoff corpus is prepared.

# Risks

Template gaming, false confidence, reviewer subjectivity, authoring overhead,
privacy leakage, and overclaiming onboarding effects.

# Cross-Discipline Opportunities

Cognitive task analysis, information retrieval, educational assessment, human
factors, and organizational knowledge management.

# Knowledge Relationships

EV-HANDOFF-* → HY-HANDOFF-2026-6B31 → TH-HANDOFF-2026-81C0 →
EX-HANDOFF-2026-0D7A → DF-HANDOFF-2026-5C9B.

# Theory Impact Assessment

- **Affected Theory Records:** Created TH-HANDOFF-2026-81C0.
- **Affected Engineering Principles:** Handoff quality should be behaviorally tested.
- **New Principle Candidates:** Name recipient and next task; score action, not form.
- **Deprecated Principles:** Generic completeness as a sufficient outcome.
- **Confidence Changes:** No evidence → Medium problem confidence; Low mechanism confidence.
- **Predictions Created:** Four in HY-HANDOFF-2026-6B31.
- **Predictions Invalidated:** Reconstruction equals onboarding.
- **Required Theory Registry Updates:** Add candidate only.

# Research Quality Metrics

| Metric | Value | Method/Limit |
|---|---:|---|
| Primary Sources | 4 | First-party empirical reports |
| Independent Sources | 3 research groups/programs | Microsoft appears in two studies |
| Counterexamples Reviewed | 1 | Onboarding multidimensionality |
| Competing Viewpoints Reviewed | 4 candidates | Qualitative comparison |
| Hypotheses Tested | 1 provisionally | No intervention run |
| Failed Hypotheses | 2 assumptions | Audience-general and onboarding proxy |
| Research Completeness | 45% | Rapid map, no systematic review |
| Confidence Gain | none to Medium | Ordinal |
| Open Questions Reduced | 1 | Pilot scope selected |

# Research Debt

- **P0 Missing Experiment:** EX-HANDOFF-2026-0D7A.
- **P0 Missing Evidence:** Direct handoff intervention studies.
- **P1 Missing Disciplines:** Privacy and accessibility review.
- **P1 Weak Areas:** Cross-organization generalization.
- **P1 Replication Needed:** Audience-dependent explanation findings.
- **P2 Tool Limitations:** No evaluator or corpus yet.
- **P0 Assumptions Awaiting Evidence:** Authoring cost can be recovered.

# Repository Updates

Created mission, four evidence records, hypothesis, theory, experiment,
decision, journal, and REP; updated charter, queue, current state, and handoff.

# Website Updates

Not applicable.

# AI Consumption Notes

Do not infer that a template improves onboarding or productivity. Reliable
claim: a bounded handoff reconstruction pilot is the best current first slice.

# Handoff Instructions

Review this REP and DF record. Before implementation, preregister
EX-HANDOFF-2026-0D7A, define the unstructured baseline, and complete a
privacy/accessibility check of the evaluation flow.

# Research Journal

JR-HANDOFF-2026-39E4.

# Appendix

Candidate rubric: evidence strength, measurable outcome, feasible duration,
privacy/safety, ROS relevance, reversibility, and falsifiability.

# Completion Checklist

- [x] Metadata and snapshot complete.
- [x] Mandatory sections present.
- [x] Claims trace to evidence/hypothesis/theory.
- [x] Contradiction and failed assumptions preserved.
- [x] Theory impact and quality metrics explicit.
- [x] Research debt prioritized.
- [x] Repository and website updates stated.
- [x] Executable handoff provided.
- [ ] Independent review and acceptance.
- [ ] Registries validated after rebuild.

