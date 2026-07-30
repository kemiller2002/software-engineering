# Second-wave assessment drafts

## Completion status

The next 15 unimplemented P0 assessments from the portfolio are **draft-complete**.

| Assessment | File | Sections | Statements | Status |
|---|---|---:|---:|---|
| Technology Strategy Alignment | `technology-strategy-alignment.json` | 5 | 25 | Draft complete |
| Product Operating Model | `product-operating-model.json` | 5 | 25 | Draft complete |
| Decision Effectiveness | `decision-effectiveness.json` | 5 | 25 | Draft complete |
| Organizational Design for Flow | `organizational-design-for-flow.json` | 5 | 25 | Draft complete |
| Portfolio Investment and Prioritization | `portfolio-investment-prioritization.json` | 5 | 25 | Draft complete |
| Product-Market Fit Evidence | `product-market-fit-evidence.json` | 5 | 25 | Draft complete |
| Customer Feedback System | `customer-feedback-system.json` | 5 | 25 | Draft complete |
| End-to-End Customer Journey | `end-to-end-customer-journey.json` | 5 | 25 | Draft complete |
| Customer Onboarding Effectiveness | `customer-onboarding-effectiveness.json` | 5 | 25 | Draft complete |
| Customer Support Capability | `customer-support-capability.json` | 5 | 25 | Draft complete |
| Customer Retention and Expansion System | `customer-retention-expansion-system.json` | 5 | 25 | Draft complete |
| Code Maintainability | `code-maintainability.json` | 5 | 25 | Draft complete |
| Continuous Delivery Capability | `continuous-delivery-capability.json` | 5 | 25 | Draft complete |
| Test Strategy and Quality Engineering | `test-strategy-quality-engineering.json` | 5 | 25 | Draft complete |
| Platform Engineering Product Maturity | `platform-engineering-product-maturity.json` | 5 | 25 | Draft complete |

Machine-readable status is in `completion-register.json`.

## Selection rule

This wave contains the first 15 P0 assessments in catalog order that were not already completed in the first wave. It covers company strategy and operating model, product evidence and customer lifecycle, and foundational engineering effectiveness.

The next P0 candidates after this wave are:

1. Service Ownership
2. Observability and Production Insight
3. Operational Readiness
4. Cybersecurity Governance
5. Identity and Access Management
6. Vulnerability Management
7. Data Governance
8. Data Quality Management
9. AI-Assisted Software Development
10. Inclusive Product Design
11. Manager Effectiveness
12. Talent Retention Risk
13. SaaS Unit Economics
14. Product Investment Economics
15. Product Quality Management
16. Quality Signal Integrity

## Shared design

Each instrument follows the same schema and scoring model as the first wave:

- 5 subconstruct sections;
- 5 observable statements per section;
- scores `-1`, `-1`, `1`, `2`, and `3`;
- response options `Not Observed`, `Partially Observed`, and `Consistently Observed`;
- deterministic keys and stable item IDs `275–349`;
- visible section scores with a default of zero.

The two negative entries capture material risks or anti-patterns. Positive entries represent foundational, managed, and adaptive capability. Score direction and response selection must remain separate: respondents report observed evidence; the instrument applies polarity.

## Administration and interpretation

Use a defined reference period, normally the preceding 90 days. Require an example or artifact for consequential responses and capture confidence, missing evidence, applicability, and disagreement outside the current JSON response record.

Report:

- capability and risk separately;
- section profiles before rollups;
- distribution across roles and products;
- evidence coverage and freshness;
- critical concerns that should not be averaged away;
- contextual factors such as company stage, product model, regulation, and architecture;
- change over time and the actions taken.

Do not use these assessments for individual performance evaluation or unsupported company rankings. Product-market fit, platform, customer, and strategy conclusions require operational evidence beyond respondent agreement.

## Validation status

These instruments are structurally validated expert drafts. They have not completed cognitive interviews, field pilots, psychometric testing, fairness analysis, benchmark construction, or outcome validation. The machine register therefore marks each assessment `draft-complete` and `pilotValidation: not-started`.

Before comparative or high-stakes use:

1. Run cognitive interviews across all intended respondent roles.
2. Pilot in varied company stages, product models, and risk contexts.
3. Test interpretation, missingness, dispersion, role disagreement, and ceiling/floor effects.
4. Compare results with relevant product, delivery, customer, financial, workforce, and risk evidence.
5. Review negative polarity, critical gates, applicability, and scoring weights.
6. Version all revisions and record item supersession.

## Generation

`generate-second-wave.mjs` contains the reviewed source definitions and deterministically generates the 15 JSON files and completion register.
