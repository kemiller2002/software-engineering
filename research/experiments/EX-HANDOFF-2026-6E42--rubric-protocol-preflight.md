---
id: EX-HANDOFF-2026-6E42
title: Handoff rubric and protocol preflight
research_area: engineering-handoff
status: proposed
maturity: validation
created: 2026-07-30
author_agent: codex
tests_hypotheses: []
related_theories: [TH-HANDOFF-2026-81C0]
inputs: [synthetic-response-set, scoring-rubric, accessible-study-workspace]
outputs: [reviewer-agreement, protocol-defects, accessibility-defects, fixture-defects]
depends_on:
  - independent-reviewers
  - accessibility-preflight-participants
  - applicable-ethics-determination
---

# Experiment

## Research question

Can the safe-continuation rubric, fixtures, study workspace, and safeguard
protocol operate reliably enough to justify a treatment-effect study?

## Non-efficacy boundary

This preflight does not estimate whether structured handoffs work. Synthetic and
deliberately varied example responses may be used to test scoring. Any
condition-labelled observations are for defect finding only and must not be
reported as treatment effects.

## Method

1. Build a response set spanning correct, incomplete, unsupported,
   high-confidence incorrect, accessibility-failed, and noncompleted cases.
2. Two independent reviewers score concealed examples using the draft rubric.
3. Measure category-specific agreement, not only an overall average.
4. Adjudicate disagreements and change the rubric only in a versioned log.
5. Repeat with a held-out response set; do not report only the training set.
6. Run the complete accessible workspace and consent/withdrawal path with
   participants representing required assistive-technology use.

## Advancement criteria

- Primary safe-continuation and critical-harm categories meet a preregistered
  agreement threshold on held-out examples.
- No unresolved accessibility-critical or security-critical defect.
- Every fixture passes authorization, secret/PII, realism, and safe-action review.
- Reviewers can score without participant identity and with condition concealed
  as far as artifact format permits.
- The study owner, data steward, and qualified ethics reviewer approve the
  revised protocol.

## Falsification and stopping

Stop and redesign if critical categories cannot be scored reliably, if format
reveals condition in a way that biases scoring, if accommodations change the
construct, or if safe/authorized fixtures are too artificial to represent the
target task.

## Results

Not run. It requires independent reviewers and direct accessibility
participation; autonomous repository agents cannot satisfy those roles.
