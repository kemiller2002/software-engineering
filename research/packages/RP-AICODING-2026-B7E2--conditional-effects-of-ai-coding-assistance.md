---
id: RP-AICODING-2026-B7E2
title: Conditional effects of AI coding assistance
research_area: ai-assisted-development
discipline:
  - software-engineering
  - human-computer-interaction
  - organizational-science
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
  - MS-AICODING-2026-A1C4
  - JR-AICODING-2026-91AF
  - prompts/Software-Engineering-Research-Mission-REP-v2.0.md
supersedes: []
superseded_by: []
tags: [ai-coding, productivity, quality, empirical-software-engineering]
keywords: [coding assistants, agents, productivity, maintenance, verification]
---

# Research State Snapshot

- **Theory version:** TH-AICODING-2026-44D0 v0.1.0, candidate.
- **Knowledge-base version:** First domain research package.
- **Highest-confidence areas:** A universal speedup claim is not justified.
- **Lowest-confidence areas:** Causal size of specific moderators.
- **Largest remaining unknown:** Which observable conditions predict lifecycle-adjusted net benefit.
- **Active research streams:** Proposed EX-AICODING-2026-2D77.
- **Recently invalidated ideas:** Universal positive and universal negative effects.
- **Priority changes:** Measure transferred downstream cost before expanding adoption.

# Executive Summary

The evidence does not support “AI coding assistance increases productivity” as
a context-free claim. Controlled greenfield work shows large speed gains
[EV-AICODING-2026-10A1], while realistic work by experienced maintainers shows
a slowdown and inaccurate self-assessment [EV-AICODING-2026-3B8F].
Organizational evidence separates positive individual experience from weaker
delivery outcomes [EV-AICODING-2026-6E21], and holistic evaluation shows that
test-passing code can remain unmergeable [EV-AICODING-2026-C940].

The best current explanation is conditional net value: generation/search
savings compete with interaction, verification, coordination, rework, and
lifecycle costs [HY-AICODING-2026-7C2D; TH-AICODING-2026-44D0]. Confidence is
Medium (0.65) for heterogeneity, and Low-to-Medium for any specific causal
moderator. The largest caveat is that this rapid evidence map is neither a
systematic review nor a meta-analysis.

# Original Objective

Determine whether empirical evidence supports a general productivity claim for
AI coding assistance, identify boundary conditions, and define discriminating
experiments.

## Success Criterion

State what can and cannot be concluded, preserve contradictions, give a
testable explanatory model, and specify an executable next experiment.

# Scope

## Included

Five primary reports covering controlled task speed, realistic maintenance,
organization-level outcomes, holistic merge readiness, and measurement bias.

## Excluded

An exhaustive literature search; security, education, labor, licensing, and
environmental impacts; tool rankings; practitioner rollout decisions.

## Scope Changes

The parent prompt names the whole discipline. Canonical governance requires
bounded research, so this package executes the first high-value topic and
turns broader work into a backlog.

# Repository Context

The repository was a greenfield ROS 1.0.0 pilot with no accepted domain
evidence. All 39 Markdown files were read. `./ros registry check` and
`./ros validate` passed before research. The parent mission is
`prompts/Software-Engineering-Research-Mission-REP-v2.0.md`.

# Current Understanding

AI assistance is an intervention in a sociotechnical workflow, not a constant
multiplier on typing. Its effect depends on the baseline cost it removes and
the new cost it creates. The relevant outcome boundary must include the
developer, reviewer, delivery system, and a declared time horizon. This model
explains why a bounded greenfield task, familiar-repository maintenance, and
organizational delivery measures can all produce different valid results.

# Key Discoveries

1. A positive causal effect is possible on a narrow task, but not portable
   without boundary conditions [EV-AICODING-2026-10A1].
2. Experienced maintainers can be slower while believing they are faster,
   weakening self-report as a standalone productivity measure
   [EV-AICODING-2026-3B8F].
3. Individual well-being/productivity perceptions can diverge from throughput
   and stability [EV-AICODING-2026-6E21].
4. Passing hidden tests is an incomplete proxy for merge readiness
   [EV-AICODING-2026-C940].
5. AI abstention and parallel agents introduce selection and measurement
   problems into newer field experiments [EV-AICODING-2026-F5D2].

# Evidence Registry

| ID | Claim/Observation | Source and Method | Supports/Contradicts | Quality and Limits |
|---|---|---|---|---|
| EV-AICODING-2026-10A1 | 55% faster bounded-task completion | Vendor RCT, n=95 | Conditional benefit | Medium; narrow, interested party |
| EV-AICODING-2026-3B8F | 19% slower realistic maintenance | Independent crossover RCT, 16 developers/246 tasks | Conditional/adverse effect | High; narrow population, early-2025 tools |
| EV-AICODING-2026-6E21 | Better individual reports, worse delivery associations | Large industrial survey/interviews | Outcome-level divergence | Medium; observational |
| EV-AICODING-2026-C940 | Tests overstated merge readiness | 18-task algorithmic/manual comparison | Evaluation moderator | Medium; small sample |
| EV-AICODING-2026-F5D2 | Later experiment biased by abstention/concurrency | Methodological update | Measurement instability | High for bias existence; effect unknown |

## Contradictory Evidence Matrix

| Claim | Supporting evidence | Contradictory evidence | Reconciliation |
|---|---|---|---|
| AI makes developers faster | EV-AICODING-2026-10A1 | EV-AICODING-2026-3B8F | Task realism, familiarity, and tool era differ |
| Perceived productivity tracks performance | Survey components of EV-AICODING-2026-6E21 | EV-AICODING-2026-3B8F | Perception measures experience, not elapsed causal effect |
| Passing tests implies useful completion | Automated success in EV-AICODING-2026-10A1 | EV-AICODING-2026-C940 | Evaluation coverage differs |
| Newer tools have positive effects | Raw direction in EV-AICODING-2026-F5D2 | Selection and measurement bias in the same record | Current magnitude unresolved |

# Hypothesis Registry

| ID | Statement | Evidence For | Evidence Against | Unknowns | Confidence | Disposition | Implications |
|---|---|---|---|---|---|---|---|
| HY-AICODING-2026-7C2D | Effects vary by task, person, repository, verification, workflow, and outcome level | All five EV records | No invariant-effect study found | Causal moderators | Medium 0.65 | supported | Measure strata and lifecycle costs |
| provisional universal-positive | AI always increases productivity | EV-AICODING-2026-10A1 | EV-AICODING-2026-3B8F, -6E21 | Population average | Low | rejected for context-free use | Do not mandate from headline effects |
| provisional universal-negative | AI always reduces productivity | EV-AICODING-2026-3B8F | EV-AICODING-2026-10A1 | Population average | Low | rejected | Do not ban from one setting |

# Failed Assumptions

- **Productivity is one variable:** weakened; speed, satisfaction, review,
  throughput, stability, and lifecycle quality can diverge.
- **Developer perception is a usable proxy:** rejected as a sole measure by
  EV-AICODING-2026-3B8F.
- **Tests fully represent completion:** rejected for holistic merge readiness by
  EV-AICODING-2026-C940.
- **Randomized abstention remains easy:** weakened by EV-AICODING-2026-F5D2.

# Open Questions

The following questions were refined by rejecting broad “does AI help?”
formulations, requiring measurable interventions, naming a decision, and adding
falsification or boundary conditions.

## Q1 — Task allocation

- **Final Question:** Can pre-task observable features predict, with calibrated
  uncertainty, whether AI assistance will reduce lifecycle-adjusted cost?
- **Why this question matters:** Enables selective use instead of mandates.
- **Existing evidence:** Effects reverse across EV-AICODING-2026-10A1 and
  EV-AICODING-2026-3B8F.
- **Unknowns:** Stable predictors and transport across tools.
- **Difficulty / Expected impact / Novelty:** High / Very high / High.
- **Suggested experiments:** Prospective stratified crossover with held-out
  repositories.
- **Why this may be the wrong question:** Prediction may hide causal mechanisms
  or encode team bias. Alternative: estimate modifiable mediators. Retain only
  if calibration and subgroup error are reported.

## Q2 — Evaluation completeness

- **Final Question:** How much of apparent agent task success disappears as the
  evaluation expands from tests to blinded merge review and 30-day outcomes?
- **Why this question matters:** Determines benchmark validity.
- **Existing evidence:** EV-AICODING-2026-C940.
- **Unknowns:** Generality beyond two repositories.
- **Difficulty / Expected impact / Novelty:** Medium / Very high / Medium.
- **Suggested experiments:** Nested evaluation ladder on representative tasks.
- **Why this may be the wrong question:** Human review is itself noisy. Use
  multiple blinded raters, agreement measures, and production outcomes.

## Q3 — Expertise and familiarity

- **Final Question:** Is repository familiarity, rather than generic seniority,
  the moderator that reverses AI's time effect?
- **Why this question matters:** Training and assignment policies differ.
- **Existing evidence:** Experienced familiar maintainers slowed in
  EV-AICODING-2026-3B8F.
- **Unknowns:** Separate effects of expertise and familiarity.
- **Difficulty / Expected impact / Novelty:** High / High / High.
- **Suggested experiments:** Factorial design crossing expertise and repository
  familiarity.
- **Why this may be the wrong question:** Familiarity may proxy task choice.
  Randomize standardized tasks and model task-developer fit.

## Q4 — Verification economics

- **Final Question:** At what generated-change size does marginal verification
  cost exceed marginal generation savings?
- **Why this question matters:** Could define safe batch-size controls.
- **Existing evidence:** EV-AICODING-2026-6E21 and -C940.
- **Unknowns:** Shape of the threshold by system criticality.
- **Difficulty / Expected impact / Novelty:** Medium / High / High.
- **Suggested experiments:** Randomize AI-generated batch sizes with fixed
  requirements and measure review/rework.
- **Why this may be the wrong question:** Lines changed are a poor size unit.
  Use semantic dependency breadth and risk as competing measures.

## Q5 — Parallel-agent productivity

- **Final Question:** When multiple agents run concurrently, does reduced wall
  time compensate for increased human coordination and verification time?
- **Why this question matters:** Time-on-task methods break under concurrency.
- **Existing evidence:** EV-AICODING-2026-F5D2.
- **Unknowns:** Optimal concurrency and cognitive switching cost.
- **Difficulty / Expected impact / Novelty:** High / High / Very high.
- **Suggested experiments:** Randomize concurrency levels; log active human,
  agent, elapsed, and repair time.
- **Why this may be the wrong question:** Throughput may encourage low-value
  work. Include outcome value and abandoned work.

## Q6 — Perception calibration

- **Final Question:** Which feedback interventions reduce the gap between
  perceived and measured AI benefit without reducing useful adoption?
- **Why this question matters:** Teams make purchasing and policy decisions from
  perceptions.
- **Existing evidence:** EV-AICODING-2026-3B8F.
- **Unknowns:** Whether dashboards improve judgment or cause gaming.
- **Difficulty / Expected impact / Novelty:** Medium / High / High.
- **Suggested experiments:** Randomized feedback dashboards with forecast
  scoring and delayed outcome review.
- **Why this may be the wrong question:** “Measured benefit” may omit well-being.
  Present a multidimensional scorecard rather than one number.

## Q7 — Long-term comprehension

- **Final Question:** Does AI assistance change a developer's ability to explain,
  modify, and debug the same code 30 and 180 days later?
- **Why this question matters:** Short-term speed may create maintenance debt.
- **Existing evidence:** Current records expose the horizon gap but do not test
  comprehension.
- **Unknowns:** Memory, ownership, and team diffusion.
- **Difficulty / Expected impact / Novelty:** High / Very high / High.
- **Suggested experiments:** Delayed blinded maintenance tasks after randomized
  original implementation.
- **Why this may be the wrong question:** Original authors may not maintain code.
  Include author and non-author maintainers.

## Q8 — Organizational mediation

- **Final Question:** Are AI adoption's delivery effects mediated by batch size,
  review queues, test latency, or deployment policy?
- **Why this question matters:** Identifies modifiable system constraints.
- **Existing evidence:** EV-AICODING-2026-6E21.
- **Unknowns:** Causal direction and dominant mediator.
- **Difficulty / Expected impact / Novelty:** High / Very high / Medium.
- **Suggested experiments:** Stepped-wedge rollout plus causal mediation and
  repository telemetry.
- **Why this may be the wrong question:** Adoption is endogenous. Use randomized
  encouragement and pre-trend checks.

## Q9 — Security externalities

- **Final Question:** Which AI-assisted workflow controls reduce introduced
  vulnerability risk without erasing time gains?
- **Why this question matters:** Productivity without security is false economy.
- **Existing evidence:** Not measured in this package.
- **Unknowns:** Threat-class and language interactions.
- **Difficulty / Expected impact / Novelty:** High / Very high / Medium.
- **Suggested experiments:** Seeded secure-coding tasks, expert red-team review,
  and time/security Pareto analysis.
- **Why this may be the wrong question:** Seeded tasks may not represent real
  attacks. Replicate with post-merge vulnerability data.

## Q10 — Adaptive policy

- **Final Question:** Does an adaptive AI-use policy based on measured task risk
  outperform both unrestricted use and blanket prohibition?
- **Why this question matters:** Tests the practical implication of the theory.
- **Existing evidence:** Conditional effects across all five records.
- **Unknowns:** Policy accuracy, burden, and behavioral adaptation.
- **Difficulty / Expected impact / Novelty:** High / Very high / Very high.
- **Suggested experiments:** Cluster-randomized three-arm team trial.
- **Why this may be the wrong question:** Policy compliance may dominate tool
  effect. Measure compliance and compare advisory versus enforced variants.

# Recommended Next Research

1. Peer-review this rapid map and complete a protocol-driven systematic search.
2. Preregister EX-AICODING-2026-2D77 with a participating organization.
3. Pilot privacy-preserving telemetry and blinded merge-readiness scoring.
4. Stop or redesign if treatment adherence, selection, or outcome capture
   cannot support a causal estimate.

# Research Backlog

1. Security externalities and licensing provenance.
2. Delayed learning and comprehension.
3. Framework- and language-specific effects.
4. Economics of reviewer/agent substitution.
5. Documentation and visual-engineering tasks.
6. Environmental and infrastructure costs.
7. Cross-cultural and accessibility effects.

# Suggested Specialized Research Agents

- **Systematic-review specialist:** Search strategy, inclusion/exclusion,
  duplicate screening, and bias assessment.
- **Causal-inference specialist:** Estimands, noncompliance, selection, and
  mediation.
- **Developer-productivity specialist:** Multidimensional outcome validity.
- **Security researcher:** Vulnerability and data-governance outcomes.

Each should receive this REP and the five evidence records and return new
records rather than editing accepted findings.

# Parallel Research Opportunities

Security, delayed comprehension, and benchmark validity can proceed
independently after shared outcome definitions. The field experiment depends on
telemetry/privacy review and a partner organization.

# Risks

- **Epistemic:** selection, publication, sponsorship, construct, and tool-drift
  bias.
- **Operational:** intrusive telemetry and treatment contamination.
- **Ethical/privacy:** capture of source code or developer behavior.
- **Safety:** faster generation may increase review load or vulnerabilities.
- **Adoption:** headlines may strip away boundary conditions.

# Cross-Discipline Opportunities

Use causal inference for heterogeneous effects, cognitive psychology for
calibration and comprehension, operations research for queue/batch effects,
economics for transferred cost, and safety engineering for risk-weighted
outcomes.

# Knowledge Relationships

`EV-AICODING-* → HY-AICODING-2026-7C2D → TH-AICODING-2026-44D0 →
EX-AICODING-2026-2D77`. No implementation Decision Record is created because
the evidence does not yet authorize a deployment choice.

# Theory Impact Assessment

- **Affected Theory Records:** Created TH-AICODING-2026-44D0.
- **Affected Engineering Principles:** Reinforces evidence-driven architecture,
  proportionate testing, and explicit outcome boundaries.
- **New Principle Candidates:** Evaluate AI at lifecycle and system levels, not
  generated-output speed alone.
- **Deprecated Principles:** Context-free productivity claims.
- **Confidence Changes:** Heterogeneity from unknown to Medium (0.65).
- **Predictions Created:** Four predictions in HY-AICODING-2026-7C2D.
- **Predictions Invalidated:** Universal positive and negative effects.
- **Required Theory Registry Updates:** Add the candidate theory; do not promote
  until prospective evidence exists.

# Research Quality Metrics

| Metric | Value | Method/Limit |
|---|---:|---|
| Primary Sources | 5 | Distinct first-party study/method reports |
| Independent Sources | 3 organizations | GitHub, METR, DORA; not all independent of studied products |
| Counterexamples Reviewed | 2 central reversals | Positive versus negative task effect; local versus delivery outcome |
| Competing Viewpoints Reviewed | 4 | universal positive, universal negative, temporal-only, conditional |
| Hypotheses Tested | 3 informal; 1 retained | Cross-study evidence map, not a preregistered test |
| Failed Hypotheses | 2 | Context-free positive and negative claims |
| Research Completeness | 40% | Rubric: 2/5—rapid map with primary sources, no systematic search/meta-analysis |
| Confidence Gain | unknown to Medium | Ordinal judgment, not calibrated probability |
| Open Questions Reduced | 1 | Universal claim resolved as unjustified; moderators remain |

# Research Debt

- **P0 Missing evidence:** Systematic peer-reviewed and industrial literature
  search; consequence is unknown selection bias.
- **P0 Missing experiments:** EX-AICODING-2026-2D77; consequence is unverified
  moderator causality.
- **P1 Missing disciplines:** Security, education, labor economics, law, and
  accessibility.
- **P1 Weak areas:** DORA full-method extraction and vendor-study independence.
- **P1 Replication needed:** Holistic merge-readiness gap and delayed outcomes.
- **P2 Tool limitations:** Rapidly changing models weaken temporal transport.
- **P0 Assumptions awaiting evidence:** Lifecycle cost can be measured without
  unacceptable privacy burden.

# Repository Updates

Created one completed mission, five evidence records, one supported hypothesis,
one candidate theory, one proposed experiment, one journal, and this review REP.
Updated current context, research queue, and handoff. Generated registries must
be rebuilt. No canonical governance was changed.

# Website Updates

Not applicable; no research website exists.

# AI Consumption Notes

Reliable retrieval terms: `AI coding conditional effects`, `experienced
maintainer slowdown`, `merge readiness evaluation`, `developer productivity
selection bias`. Do not summarize this package as “AI slows developers” or “AI
speeds developers.” Preserve population, task, tool era, outcome boundary, and
confidence. Numeric effects are study-specific.

# Handoff Instructions

1. Read this REP, JR-AICODING-2026-91AF, and linked EV records.
2. Run `./ros registry check` and `./ros validate`.
3. Have an independent reviewer assess evidence selection and dispositions.
4. Move the REP from `review` to `accepted` only after review; accepted content
   is immutable.
5. Preregister EX-AICODING-2026-2D77 before collecting outcomes.

# Research Journal

JR-AICODING-2026-91AF records baseline, search, falsification, decisions,
limitations, and next action.

# Appendix

Methods: targeted web search for recent primary controlled, field, industrial,
and contradictory evidence; claim-level extraction; qualitative comparison of
population, task, treatment, outcome, and validity threats. No quantitative
pooling was attempted because constructs and designs differ materially.

# Completion Checklist

- [x] Required metadata is complete and internally consistent.
- [x] Research State Snapshot is complete.
- [x] All mandatory sections exist.
- [x] Important claims reference evidence, hypothesis, and theory IDs.
- [x] Contradictory evidence and failed assumptions are preserved.
- [x] Theory impacts and registry changes are explicit.
- [x] Quality metrics state methods and limits.
- [x] Research debt is prioritized.
- [x] Completion state and recovery instructions are explicit.
- [x] Repository and website updates are accurate.
- [x] Handoff permits continuation without conversation history.
- [ ] Links, identifiers, and registries validate after registry rebuild.
- [x] Another capable agent can reconstruct and continue the investigation.

