# First-wave assessment drafts

## Completion status

All 15 instruments identified in the first implementation wave are **draft-complete**.

| Assessment | File | Sections | Statements | Status |
|---|---|---:|---:|---|
| Software Delivery Performance | `software-delivery-performance.json` | 5 | 25 | Draft complete |
| Developer Experience | `developer-experience.json` | 5 | 25 | Draft complete |
| Product Strategy Quality | `product-strategy-quality.json` | 5 | 25 | Draft complete |
| Product Discovery Effectiveness | `product-discovery-effectiveness.json` | 5 | 25 | Draft complete |
| Outcome Measurement | `outcome-measurement.json` | 5 | 25 | Draft complete |
| Architecture Fitness and Evolvability | `architecture-fitness-evolvability.json` | 5 | 25 | Draft complete |
| Reliability Engineering | `reliability-engineering.json` | 5 | 25 | Draft complete |
| Incident Management | `incident-management.json` | 5 | 25 | Draft complete |
| Secure Software Development Lifecycle | `secure-software-development-lifecycle.json` | 5 | 25 | Draft complete |
| Privacy Engineering and Data Protection | `privacy-engineering-data-protection.json` | 5 | 25 | Draft complete |
| Digital Accessibility Capability | `digital-accessibility-capability.json` | 5 | 25 | Draft complete |
| Technology Value and FinOps | `technology-value-finops.json` | 5 | 25 | Draft complete |
| Engineering Leadership Effectiveness | `engineering-leadership-effectiveness.json` | 5 | 25 | Draft complete |
| Team Health and Sustainability | `team-health-sustainability.json` | 5 | 25 | Draft complete |
| Responsible AI Governance | `responsible-ai-governance.json` | 5 | 25 | Draft complete |

Machine-readable status is available in `completion-register.json`.

## Instrument design

Every assessment follows the established JSON structure:

- assessment `name`;
- visible `scores`;
- five `items`, each representing a distinct subconstruct;
- five observable `entries` per item;
- stable section and entry IDs;
- deterministic numeric keys;
- `sectionScoreDefault`;
- a shared answer key.

Each section contains:

- two negatively scored risk or anti-pattern statements (`-1`);
- one foundational capability statement (`1`);
- one managed and repeatable capability statement (`2`);
- one adaptive, evidence-driven capability statement (`3`).

The response scale is:

- `0` — Not Observed
- `1` — Partially Observed
- `2` — Consistently Observed

This wording works for both positive and negative statements. It replaces the ambiguous use of “In Progress” for anti-patterns.

## Interpretation constraints

These are structured expert drafts, not validated psychometric instruments. “Draft complete” means:

- all planned constructs and statements are authored;
- score direction has been reviewed;
- structural checks pass;
- statements are written to support evidence-based discussion.

It does **not** mean the instruments have completed cognitive interviews, field pilots, reliability testing, construct validation, fairness analysis, or outcome validation.

Do not:

- combine all instruments into one universal company score;
- compare companies without accounting for context;
- use team-health, leadership, or developer-experience results for individual performance decisions;
- treat a high additive score as proof that a critical control exists;
- score Responsible AI Governance when the applicability gate shows no material AI use.

## Administration guidance

Use a defined reference period, normally the preceding 90 days. Ask respondents to answer from observed evidence rather than aspiration.

Recommended respondent groups:

- delivery, architecture, reliability, and security: engineers, relevant enabling teams, product partners, and leaders;
- product strategy, discovery, and outcomes: product, design, research, analytics, engineering, commercial, and customer-facing groups;
- privacy and accessibility: specialists plus the product and engineering roles responsible for actual implementation;
- leadership, developer experience, and team health: stratified workforce samples with anonymity and small-group suppression;
- FinOps: engineering, finance, product, architecture, procurement, and executive sponsors;
- responsible AI: product, AI/data, security, privacy, legal/risk, operations, domain experts, and affected-user perspectives.

For each item, capture:

- the selected response;
- evidence or example;
- evidence date;
- respondent confidence;
- applicability;
- material disagreement or contradictory evidence.

## Scoring guidance

The current format supports weighted additive diagnostics. Report section profiles before any rollup.

At minimum, reporting should show:

- positive capability score;
- observed risk score;
- unanswered and not-applicable counts;
- evidence coverage;
- respondent distribution and disagreement;
- critical concerns that should not be averaged away;
- trend over time;
- three highest-value improvement opportunities.

A later schema revision should add explicit `polarity`, `critical`, `applicability`, `evidencePrompt`, `referencePeriod`, and `scoringMode` fields.

## Required next validation stage

Before operational or comparative use:

1. Conduct cognitive interviews with every major respondent role.
2. Confirm that each statement expresses one interpretable claim in real administration.
3. Pilot in multiple company sizes, product types, lifecycle stages, and risk contexts.
4. Examine missingness, ceiling/floor effects, response dispersion, and role-related disagreement.
5. Review item score direction and whether the proposed four capability bands are supported.
6. Test temporal stability where the underlying capability should not have changed.
7. Compare results with relevant operational, customer, workforce, and risk evidence.
8. Review sensitive instruments for privacy, fairness, anonymity, and misuse risks.
9. Revise and version the instruments; preserve stable IDs or record explicit supersession.
10. Publish intended uses, unsupported uses, limitations, and validation evidence.

## Generation

`generate-first-wave.mjs` contains the reviewed source definitions and deterministically generates the 15 JSON instruments and completion register.
