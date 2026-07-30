---
id: EV-AICODING-2026-10A1
title: GitHub controlled HTTP-server task reported faster completion with Copilot
research_area: ai-assisted-development
evidence_type: primary
source_title: Quantifying GitHub Copilot's impact on developer productivity and happiness
source_author: GitHub Research
source_uri: https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
source_date: 2022-09-07
retrieved: 2026-07-29
created_by_agent: codex
confidence: medium
supports: [HY-AICODING-2026-7C2D]
contradicts: []
related_theories: [TH-AICODING-2026-44D0]
tags: [controlled-study, productivity, vendor-study]
---

# Evidence Record

## Evidence summary

In a randomized task with 95 professional developers, the Copilot group
completed a bounded JavaScript HTTP-server task 55% faster on average and had
a 78% completion rate versus 70% for the control group.

## Exact claim supported or contradicted

AI assistance can improve completion speed for a bounded, greenfield,
automatically scored implementation task.

## Source provenance

Primary report by the product vendor. The report gives design, sample size,
effect, confidence interval, and p-value; interested-party and publication-bias
risks remain.

## Relevant excerpt or data

95 participants; mean times 1:11 versus 2:41; reported speed gain 55%, 95% CI
21%–89%, p=.0017.

## Interpretation

This demonstrates possibility, not a general effect across maintenance work.

## Limitations

One artificial task, older completion-style tooling, limited quality measure,
vendor sponsorship, and unclear transfer to familiar mature repositories.

## Counterevidence

EV-AICODING-2026-3B8F reports slowdown in realistic maintenance tasks.

## Reproduction or verification notes

Replicate with preregistration, independent investigators, maintenance tasks,
and downstream review/defect measures.

