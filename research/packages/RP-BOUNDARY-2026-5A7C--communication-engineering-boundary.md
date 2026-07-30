---
id: RP-BOUNDARY-2026-5A7C
title: Boundary analysis of Communication Engineering
research_area: discipline-boundary
discipline:
  - software-engineering
  - communication-theory
  - human-computer-interaction
  - systems-engineering
author_agent: codex
version: 1.0.0
status: review
confidence: high
completion: complete
priority: high
created: 2026-07-29
updated: 2026-07-29
related_projects: [software-engineering]
related_documents:
  - MS-BOUNDARY-2026-C21E
  - JR-BOUNDARY-2026-F60A
  - research/roadmaps/communication-engineering-body-of-work-analysis.md
supersedes: []
superseded_by: []
tags: [discipline-boundary, synthesis, completed-research]
keywords: [communication engineering, HCI, rhetoric, information architecture]
---

# Research State Snapshot

- **Theory Version:** Not established.
- **Knowledge Base Version:** Twelve-body bounded evidence map.
- **Highest Confidence Areas:** No exclusive object, method, or theory was found.
- **Lowest Confidence Areas:** Incremental utility of a lightweight assurance profile.
- **Largest Remaining Unknown:** Whether the profile beats tailored existing methods.
- **Active Research Streams:** Comparative experiment not yet preregistered.
- **Recently Invalidated Ideas:** Content, completeness, integration, and the label itself establish a discipline.
- **Priority Changes:** Reject discipline claim; test a profile only as an implementation hypothesis.

# Executive Summary

The twelve-body analysis does not support “Communication Engineering” as a
distinct discipline. Every proposed core capability has an established home:
task-oriented guidance in technical communication; coordination and boundary
objects in CSCW; traceability and validation in requirements engineering;
resumption in maintenance research; tacit/distributed knowledge in knowledge
management; recipient adaptation in cognitive psychology; findability in
information architecture; situation and genre in rhetoric; closed-loop
handoffs in human factors; evidence arguments and decision value in systems and
decision science; inclusive delivery in accessibility; and transformation risks
in AI research.

High confidence (0.82) supports rejecting the distinct-discipline claim. A
software communication-assurance profile may still be useful as a convenient
combination of established methods, but it has no demonstrated incremental
effect and must not be described as new science. The recommended disposition is
recorded in DF-BOUNDARY-2026-3F72.

# Original Objective

Determine whether the proposed label adds a distinct, decision-useful object,
method, or predictive theory.

## Success Criterion

Demonstrate incremental predictive or practical utility, or reject/narrow the
label.

# Scope

## Included

Twelve adjacent bodies: technical communication, CSCW, requirements,
maintenance/comprehension, safety handoffs, knowledge management, cognitive
psychology, information architecture/retrieval, rhetoric/discourse, systems and
decision science, accessibility, and AI-mediated communication.

## Excluded

Exhaustive systematic reviews, practitioner terminology studies, and the
comparative field experiment.

## Scope Changes

Scope expanded from five to twelve bodies at the user's direction. Each stream
used the shared bounded-map completion gate in the roadmap.

# Repository Context

The charter warns against assuming a distinct discipline. The selected handoff
pilot provides a future empirical test surface but cannot establish a field.

# Current Understanding

No distinct scientific boundary was found. The defensible residual is a project
profile: select and combine existing methods for high-consequence software
communication, with claims linked to evidence, recipient/action tests,
closed-loop confirmation, accessibility, lifecycle maintenance, and
risk-proportionate assurance. Its value is an untested convenience hypothesis.

# Key Discoveries

- Shannon covers message fidelity but brackets semantic meaning
  [EV-BOUNDARY-2026-01D3].
- HCI already supplies human-centred lifecycle design
  [EV-BOUNDARY-2026-274A].
- Systems engineering already claims transdisciplinary lifecycle integration
  [EV-BOUNDARY-2026-5E8B].
- IA covers findability and understandable structure
  [EV-BOUNDARY-2026-8C11].
- Rhetoric covers exigence, actionable audiences, and constraints
  [EV-BOUNDARY-2026-A792].
- Technical communication already makes guidance task- and audience-oriented
  [EV-TECHCOMM-2026-14B2].
- CSCW explains why shared artifacts require organizational scope, structure,
  trust, and management [EV-CSCW-2026-32A9; EV-CSCW-2026-9C40].
- Requirements engineering covers ambiguity, rationale, traceability,
  validation, and transformation [EV-REQ-2026-48A0; EV-REQ-2026-D781].
- Maintenance research supplies causal evidence that contextual cues improve
  resumption [EV-MAINT-2026-0A52].
- Knowledge management shows that knowing who knows and integrating knowledge
  can matter more than codification [EV-KM-2026-3E80; EV-KM-2026-91BC].
- Cognitive psychology invalidates one-template-for-all expertise
  [EV-COG-2026-27F1].
- Structured safety handoffs can reduce adverse outcomes, but fidelity and
  evidence certainty matter [EV-SAFETY-2026-19D5; EV-SAFETY-2026-7EA2].
- Systems and decision science already connect claims, evidence, uncertainty,
  and information value [EV-SYSTEMS-2026-22C8; EV-SYSTEMS-2026-A730].
- AI summarization adds factuality and evaluation risks rather than assured
  compression value [EV-AI-COMM-2026-3D6F; EV-AI-COMM-2026-D120].

# Evidence Registry

| ID | Field | Existing territory | Limit |
|---|---|---|---|
| EV-BOUNDARY-2026-01D3 | Information theory | Channel/message fidelity | Semantics bracketed |
| EV-BOUNDARY-2026-274A | HCI/HCD | Human-centred interactive-system lifecycle | Not all project management |
| EV-BOUNDARY-2026-5E8B | Systems engineering | Integrative engineered-system lifecycle | Broad rather than communication-specific |
| EV-BOUNDARY-2026-8C11 | Information architecture | Findability/understandability | Emphasis on information environments |
| EV-BOUNDARY-2026-A792 | Rhetoric | Situation, audience, constraints, action | Not an engineering validation lifecycle |

## Claim-by-Field Coverage Matrix

| Proposed capability | Established owner(s) | Residual gap |
|---|---|---|
| Reliable transmission | Information theory | Meaning and action |
| Task/audience guidance | Technical communication, HCI | Risk-weighted assurance |
| Coordination across roles | CSCW, knowledge management | Software-specific verification |
| Traceable action specifications | Requirements engineering | Transient task state |
| Resumption and comprehension | Maintenance, cognitive psychology | Authority/commitments |
| Findability and retrieval | IA/IR | Truth and action validity |
| Situated action and genre | Rhetoric/discourse | Technical verification |
| Closed-loop high-risk handoff | Human factors/safety | Software transfer |
| Lifecycle integration | Systems engineering | Lightweight routine use |
| Claims, arguments, evidence | Assurance cases | Adoption and maintenance cost |
| Information worth | Decision science | Practical estimand selection |
| Inclusive delivery | Accessibility/HCI | Direct disabled-developer evidence |
| Adaptive transformation | AI/NLP | Factuality, calibration, provenance |

No row is exclusively owned by the proposed discipline.

# Hypothesis Registry

| ID | Evidence For | Evidence Against | Confidence | Disposition |
|---|---|---|---|---|
| HY-BOUNDARY-2026-E430 | A convenient cross-layer profile may reduce integration effort | All constituent methods and mechanisms already exist; no incremental outcome evidence | Medium 0.50 | unresolved implementation hypothesis; distinct-discipline interpretation rejected |

# Failed Assumptions

Rejected assumptions are tracked in the roadmap. Most consequential: more
content is not necessarily better; communication is not only content; artifacts
cannot usually replace social knowledge; fewer questions are not necessarily
success; technical correctness does not guarantee action; one template cannot
fit expertise/risk; AI does not guarantee lower total cost; integration does not
create a discipline; and “engineering” requires predictive verification.

# Open Questions

1. Does the integrated profile outperform HCD alone?
2. What does technical communication already cover?
3. Does CSCW already model the coordination lifecycle?
4. Does requirements engineering own traceable action-bearing artifacts?
5. Which safety fields quantify communication failure?
6. Is “engineering” justified by repeatable prediction and verification?
7. What is the profile's smallest exclusive object of study?
8. Can the handoff pilot discriminate profile versus adjacent methods?
9. Would the label reduce or increase practitioner confusion?
10. What evidence would require abandoning the label entirely?

# Recommended Next Research

Do not invest in discipline-building. Preregister one comparative experiment:
strongest existing-method baseline versus the combined profile on the handoff
pilot. Measure correct action, dangerous error, evidence challengeability,
authoring/maintenance cost, accessibility, and clarification quality. Abandon
the profile if it lacks practically meaningful incremental value.

# Research Backlog

Comparative experiment; participatory accessibility study; terminology-confusion
study; systematic reviews for any field that would change the implementation
decision.

# Suggested Specialized Research Agents

For the comparative experiment: HCI experiment designer, accessibility
researcher, and safety/assurance reviewer.

# Parallel Research Opportunities

Accessibility participation and terminology testing can proceed independently.

# Risks

Rebranding established knowledge, disciplinary overreach, selective evidence,
and process overhead.

# Cross-Discipline Opportunities

The entire mission is cross-disciplinary; the opportunity is integration only
if incremental outcomes can be demonstrated.

# Knowledge Relationships

All EV and twelve JR topic maps → HY-BOUNDARY-2026-E430 →
RP-BOUNDARY-2026-5A7C → DF-BOUNDARY-2026-3F72.

# Theory Impact Assessment

- **Affected Theory Records:** None.
- **Affected Engineering Principles:** Prefer established names and assemble
  profiles only when integration cost/benefit is testable.
- **New Principle Candidates:** Boundary claims require discriminating predictions.
- **Deprecated Principles:** None; no prior accepted principle.
- **Confidence Changes:** Distinct-discipline claim rejected at High (0.82);
  profile utility remains unresolved at Medium (0.50).
- **Predictions Created:** Incremental outcome prediction in HY-BOUNDARY-2026-E430.
- **Predictions Invalidated:** Integration alone establishes a discipline.
- **Required Theory Registry Updates:** None; profile utility is not a theory.

# Research Quality Metrics

| Metric | Value | Method/Limit |
|---|---:|---|
| Primary Sources | 25 | Count of EV records used across the boundary/topic maps; some EVs are derived or reviews |
| Independent Sources | 20+ authoring groups/standards bodies | Organizational independence not guaranteed |
| Counterexamples Reviewed | 12 bodies plus adverse/low-certainty findings | Claim-coverage method |
| Competing Viewpoints Reviewed | 3 | distinct discipline, integration profile, existing-fields-only |
| Hypotheses Tested | 1 boundary hypothesis | Comparative coverage, not outcome experiment |
| Failed Hypotheses | 1 | Distinct scientific discipline |
| Research Completeness | 100% of bounded roadmap; not exhaustive literature | 12/12 completion gates |
| Confidence Gain | Low to High against discipline claim | Ordinal judgment |
| Open Questions Reduced | 8 of original 10 | Incremental value and terminology remain |

# Research Debt

- **P0 Missing Experiments:** Comparative incremental-utility test.
- **P1 Missing Evidence:** Direct disabled-developer participation.
- **P1 Missing Disciplines:** None in the declared roadmap.
- **P1 Weak Areas:** Terminology adoption and practitioner need.
- **P1 Replication Needed:** Software transfer of safety and cognitive effects.
- **P2 Tool Limitations:** Some standards expose only summaries.
- **P0 Assumptions Awaiting Evidence:** Integration adds measurable value.

# Repository Updates

Completed twelve bounded topic maps with evidence records and journals, created
the roadmap and boundary Decision Record, completed the boundary mission, and
updated queue/context/handoff.

# Website Updates

Not applicable.

# AI Consumption Notes

Do not call Communication Engineering a discipline or new science. Use
“experimental software communication-assurance profile” only when referring to
the unvalidated combination of existing methods.

# Handoff Instructions

Review this REP and DF-BOUNDARY-2026-3F72. If further work is authorized,
preregister the comparative experiment. Do not reopen the discipline claim
without evidence of an exclusive mechanism or replicated incremental outcomes.

# Research Journal

JR-BOUNDARY-2026-F60A plus the twelve `completed-topic` journals named in the
roadmap.

# Appendix

Execution status and stream-specific research questions:
`research/roadmaps/communication-engineering-body-of-work-analysis.md`.

# Completion Checklist

- [x] Metadata and snapshot complete.
- [x] Mandatory sections present.
- [x] Claims trace to evidence/hypothesis.
- [x] Contradictions and failed assumptions preserved.
- [x] Completion status and recovery instructions explicit.
- [x] Theory impact and metrics explicit.
- [x] Research debt prioritized.
- [x] Repository/site updates stated.
- [x] All twelve adjacent bodies mapped to the bounded completion gate.
- [x] Comparative test concept specified; preregistration remains debt.
- [ ] Independent review and acceptance.
- [x] Registries rebuilt and validated on 2026-07-29.
