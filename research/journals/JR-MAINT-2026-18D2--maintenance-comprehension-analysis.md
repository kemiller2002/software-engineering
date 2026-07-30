---
id: JR-MAINT-2026-18D2
title: Software maintenance and program comprehension analysis
research_area: software-maintenance
author_agent: codex
created: 2026-07-29
related_mission: MS-BOUNDARY-2026-C21E
related_package: RP-BOUNDARY-2026-5A7C
evidence_ids: [EV-MAINT-2026-0A52, EV-MAINT-2026-7B19, EV-HANDOFF-2026-2A10]
hypothesis_ids: [HY-HANDOFF-2026-6B31, HY-BOUNDARY-2026-E430]
theory_ids: [TH-HANDOFF-2026-81C0]
tags: [completed-topic, maintenance, comprehension]
---

# Maintenance and Program Comprehension Analysis

## Model and evidence

Maintenance is hypothesis-driven information seeking, navigation, mental-model
construction, and change-impact reasoning. Information scent predicts navigation
[EV-MAINT-2026-7B19]. Contextual resumption cues doubled success relative to
notes alone [EV-MAINT-2026-0A52]. Unavailable rationale and intended behavior
block work [EV-HANDOFF-2026-2A10].

## Counterevidence and interpretations

Cues can restore recent activity without conveying design intent. A complete
mental model is neither possible nor necessary. Better navigation may speed an
incorrect path. Production pressure can trade learning for immediate repair.

## Reusable methods and outcomes

Navigation logs, hypothesis traces, resumption lag, correct edit location,
change-impact accuracy, delayed comprehension, defect/rework, and cue ablation.

## Coverage, gap, and challenged assumptions

This field directly explains task resumption and comprehension. It challenges
the belief that a prose handoff is the natural solution: activity traces and
repository cues may be more effective. It does not fully cover authority,
commitments, or organizational knowledge distribution.

## Discriminating experiment

Compare structured prose, chronological activity/code cues, and their
combination. If cues alone dominate, “communication artifact” framing is too
broad or wrong.

## Confidence and limits

High evidence of overlap; study age and lab transfer limit effect estimates.

## Ten future questions

1. Which cues restore state versus merely familiarity?
2. Do chronological cues preserve rationale?
3. When does activity history mislead after code changes?
4. What predicts correct first navigation after handoff?
5. Does recipient-generated annotation outperform author notes?
6. How long do resumption benefits persist?
7. Which cues work for distributed versus localized changes?
8. Does production bias suppress necessary learning?
9. Can comprehension be measured without task execution?
10. What added value remains beyond repository-aware resumption tooling?

## Completion assessment

Bounded rapid map complete; modern-agent replication remains debt.

