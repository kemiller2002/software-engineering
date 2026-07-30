---
id: JR-SAFEGUARDS-2026-7F14
title: Handoff study safeguards and data boundary
research_area: handoff-safeguards
author_agent: codex
created: 2026-07-30
related_mission: MS-SAFEGUARDS-2026-89D1
related_package: RP-MEASURES-2026-71B4
evidence_ids:
  - EV-SAFEGUARDS-2026-3A91
  - EV-SAFEGUARDS-2026-64C2
  - EV-SAFEGUARDS-2026-D8E5
  - EV-A11Y-2026-58E0
hypothesis_ids: [HY-HANDOFF-2026-6B31]
theory_ids: [TH-HANDOFF-2026-81C0]
tags: [safeguards, privacy, security, accessibility, research-ethics]
---

# Handoff Study Safeguards

## Objective and disposition

Determine whether EX-HANDOFF-2026-0D7A can produce decision-relevant evidence
without unnecessary surveillance, sensitive-source exposure, inaccessible
participation, or coercive research practices.

**Disposition:** feasible only as a minimal-data, sandboxed study using
authorized public or purpose-built synthetic task fixtures. Recruitment remains
blocked until a qualified human-subjects/ethics determination and a named data
steward approve the final protocol.

## Challenged assumptions

1. **Screen or keystroke recording is needed to measure reconstruction.**
   Rejected. The primary outcome can be scored from a submitted plan, one
   predeclared verification result, coarse timestamps, and reviewer ratings.
2. **Removing names makes workplace traces safe.** Rejected. Repository
   contents, rare task facts, timing, and expertise combinations can identify
   people or expose proprietary information.
3. **A uniform time cap is fair.** Rejected. It can measure disability or tool
   accessibility rather than the intervention [EV-SAFEGUARDS-2026-D8E5].
4. **WCAG conformance proves inclusion.** Rejected. It is a floor for relevant
   digital materials, not evidence that disabled developers can participate
   equivalently.
5. **A low-risk software study can self-declare exemption.** Rejected. The
   actual sponsor and jurisdiction must make or obtain the applicable
   determination.

## Data-flow and minimization model

| Stage | Permitted data | Prohibited data | Control |
|---|---|---|---|
| Fixture intake | authorized public snapshot or synthetic completed task; answer key held separately | private customer code, personal messages, production data, secrets, unresolved vulnerabilities | fixture owner attests authorization; secret/PII scan; manual review |
| Recruitment | contact channel, consent state, accommodation request, broad expertise/familiarity bands | diagnosis, unrelated demographics, manager ratings, covert employee selection | consent record separated from response ID; no manager recruitment pressure |
| Study workspace | immutable fixture, assigned handoff condition, accessible task instructions | participant's real repository, credentials, network tokens, personal dotfiles | disposable sandbox; network off by default; least privilege |
| Observation | start/end event, submitted plan, declared confidence, clarification request, allowlisted verification result | screen/audio/video, keystrokes, clipboard, browser history, continuous IDE telemetry | event-level logging only; no background recorder |
| Review | pseudonymous response, concealed answer key, condition-hidden format where feasible | identity, employer, accommodation details | two independent reviewers; role-based access |
| Analysis | outcome scores and broad prespecified strata | free-text identifiers, small-cell disclosure, individual performance reports | aggregate reporting; suppress identifiable cells |
| Disposal | audit record and aggregate results | raw response artifacts after retention deadline | verified deletion log and backup-expiry check |

## Threat review

| Threat | Consequence | Required prevention/detection |
|---|---|---|
| Secret or proprietary fixture content | confidentiality breach | public/synthetic boundary, automated scan plus human review, immediate stop |
| Malicious or unsafe verification step | device/network harm | disposable sandbox, no production access, allowlisted read-only or test action |
| Participant re-identification | employment or reputational harm | random study ID, separate consent mapping, broad strata, small-cell suppression |
| Coercion or performance surveillance | invalid consent and workplace harm | no direct-manager recruitment, no performance use, withdrawal without penalty |
| Accessibility exclusion | biased estimate and participant burden | accessible formats/tools, accommodation channel, preflight with disabled participants |
| False confidence induced by handoff | unsafe downstream action | synthetic/public tasks, harm rubric, stop on critical unsafe behavior |
| Reviewer exposure or bias | confidentiality loss or invalid scores | least access, blinded condition, adjudication, agreement threshold |
| Over-retention | expanding breach and secondary-use risk | purpose-bound retention, deletion verification, no reuse without new consent/review |

## Accessibility protocol

- Publish instructions and consent in structured text with equivalent semantics
  for diagrams and non-text material.
- Ensure keyboard-only operation, visible focus, sufficient contrast, zoom/reflow,
  and assistive-technology compatibility for the selected editor and forms.
- Offer an accommodation channel before assignment without requiring diagnosis.
- Predeclare participant-specific timing or break accommodations. Use the same
  accommodation in both conditions; analyze elapsed time only as secondary.
- Do not infer cognitive ability from speed or clarification behavior.
- Run a small participatory preflight with disabled developers before the
  treatment-effect study. Automated checks alone are insufficient.
- Record accessibility-critical failures as harms and pause the affected task,
  rather than treating the response as ordinary missing data.

## Consent and participant protections

Consent must identify the research purpose, procedures, expected duration,
foreseeable privacy/accessibility/workplace risks, data collected and not
collected, retention, access, reporting, compensation, contact, and the right to
withdraw without penalty. Compensation must not depend on correctness or task
completion. Results must not be provided to employers as individual performance
data. Deception is not justified by the present design.

The protocol should recruit across relevant expertise levels without using a
convenience sample of subordinates. It should state that direct participant
benefit is not established and distinguish research from job evaluation.

## Provisional retention and access policy

- Collect only the fields listed in the data-flow table.
- Store the consent/identity map separately from study responses.
- Limit raw access to the study lead and named data steward; reviewers receive
  only pseudonymous material needed for scoring.
- Default raw retention: until scoring audit and any required review are
  complete, then delete within 90 days. The approved protocol must replace this
  default if law, sponsor policy, publication, or participant consent requires a
  different period.
- Retain aggregate, disclosure-reviewed results and non-identifying protocol
  artifacts. Do not publish raw plans if they can expose participant writing
  style or source details.
- No secondary use, model training, or cross-study linkage without new
  authorization and, where applicable, renewed consent/review.

## Required gates before recruitment

- [ ] Sponsor, jurisdiction, funding, publication intent, and participant
  relationship documented.
- [ ] Qualified IRB/human-subjects/ethics determination obtained where
  applicable; repository agents do not self-certify exemption.
- [ ] Named principal investigator/study owner and data steward.
- [ ] Final consent and withdrawal/deletion process reviewed.
- [ ] Fixture authorization, secret/PII scan, and safe-action allowlist complete.
- [ ] Accessible tools/materials checked and participatory preflight completed.
- [ ] Data access, encrypted storage, retention, incident response, and deletion
  verification approved.
- [ ] Rubric reliability threshold and critical-harm definitions preregistered.

## Stop and incident criteria

Immediately stop the affected session and preserve only the minimum incident
record if a secret, personal data, unapproved network access, security event,
participant distress, consent withdrawal, accessibility-critical barrier, or
critical unsafe action occurs. Pause the study if reviewer reliability fails,
the protocol drifts, small cells risk identification, or an accommodation cannot
be provided without invalidating the task. Resume only after documented review.

## Confidence, limitations, and remaining unknowns

Confidence is Medium that a minimal-data design is feasible. Confidence is Low
that it will be accessible and legally/ethically authorized until participatory
preflight and qualified review occur. This analysis is not legal advice, an IRB
determination, a penetration test, or direct disabled-participant evidence.

Unknowns include actual jurisdiction and sponsor, available accessible tooling,
whether condition blinding survives format differences, appropriate retention,
and whether public/synthetic fixtures represent real handoff difficulty.

## Follow-on research and engineering implications

1. Baseline design must use the same sandbox, data fields, accommodation policy,
   and safe verification action in both conditions.
2. Preregistration must include incident handling, exclusions, accessibility
   failures, reviewer agreement, and missing-data rules.
3. Build only disposable fixture/scoring infrastructure; do not connect the
   study to production repositories or employee telemetry.
4. Validate the primary score against later execution before treating it as a
   production quality metric.
