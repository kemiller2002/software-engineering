---
id: MS-SAFEGUARDS-2026-89D1
title: Define privacy security accessibility and ethics safeguards for the handoff pilot
status: completed
maturity: synthesis
artifact_tier: research-cycle
priority: high
portfolio_rank: 1
research_area: handoff-safeguards
discipline: [privacy, security, accessibility, research-ethics]
created: 2026-07-30
owner_agent: codex
parent_questions: [EX-HANDOFF-2026-0D7A]
child_questions:
  - What data can be collected without sensitive source or behavioral surveillance?
  - Which participant and accessibility risks require protocol changes?
supporting_evidence: [EV-A11Y-2026-58E0]
contradicting_evidence: []
related_research: [JR-A11Y-2026-CA09, RP-HANDOFF-2026-A8E1]
depends_on: []
enables: [MS-PREREG-2026-6B9F]
repositories_impacted: [software-engineering]
outputs:
  - research/journals/JR-SAFEGUARDS-2026-7F14--handoff-study-safeguards.md
confidence: medium
remaining_uncertainty: Whether the actual study context receives ethics approval and passes participatory accessibility preflight.
---

# Mission

Produce a data-flow/threat review, accessibility protocol, participant-risk
assessment, retention policy, synthetic/public-data boundary, and stop criteria.

## Completion record

- **Completed:** 2026-07-30.
- **Summary:** A valid study appears possible without invasive telemetry if it
  uses authorized public/synthetic fixtures, disposable sandboxes, event-level
  observations, pseudonymous scoring, and accessible participation.
- **Major findings:** Screen/keystroke capture is unnecessary; de-identification
  alone is insufficient; uniform timing is not accessibility-neutral; agents
  cannot self-declare ethics or regulatory exemption.
- **Confidence:** Medium for technical feasibility; Low for authorization and
  accessibility until qualified review and participatory preflight.
- **Limitations:** No legal opinion, IRB determination, security test, fixture
  review, consent review, or direct disabled-participant evidence.
- **Remaining unknowns:** Sponsor/jurisdiction, approved retention, accessible
  toolchain, representativeness of safe fixtures, and condition blinding.
- **Supporting references:** EV-SAFEGUARDS-2026-3A91,
  EV-SAFEGUARDS-2026-64C2, EV-SAFEGUARDS-2026-D8E5, and
  EV-A11Y-2026-58E0.
- **Follow-on research:** Define the baseline under identical safeguards; obtain
  qualified ethics review; run an accessibility preflight; preregister incidents,
  exclusions, reliability, and harms.
- **Roadmap impact:** Baseline becomes the highest-value internally executable
  mission. Preregistration remains blocked by baseline and external safeguards
  gates.
- **Other repositories:** No production or external repository should be
  connected. Cross-repository fixtures require separate authorization.
- **Recommended engineering work:** Build no production telemetry. After review,
  create only a disposable, network-restricted fixture and blinded scoring
  harness.

## Verification

Completion means the safeguard design is synthesized, not that participant
research is authorized. The unchecked gates in JR-SAFEGUARDS-2026-7F14 remain
hard prerequisites.
