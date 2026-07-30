# Revised software-company assessments

These files are revised copies of every JSON assessment in the parent directory. The originals are intentionally unchanged.

## Evaluation principles

- Measure observable organizational behavior and outcomes, not adoption of a named framework, meeting, role, tool, or ritual.
- Keep each statement specific enough to answer with evidence and avoid combining unrelated claims where practical.
- Treat customer value, product discovery, engineering effectiveness, operational resilience, accessibility, psychological safety, and sustainable delivery as complementary capabilities.
- Prefer context-sensitive evidence over universal thresholds. Team comparisons should account for product, risk, and operating context.
- Keep negative statements negatively keyed. In weighted assessments they receive a negative score; in Likert assessments they use the reversed answer key.
- Preserve each source file's schema, IDs, keys, response options, and scoring mechanism so existing consumers can continue to load it.

## Score interpretation

The weighted assessments retain the existing maturity weights:

- `-1`: an observable anti-pattern or material risk
- `1`: a foundational practice
- `2`: a managed and repeatable capability
- `3`: an adaptive, outcome-driven capability

The distributed assessment and Scrum Master 360 use Likert response scales. Their item-level `score` remains `0` by design; direction is expressed through `likert5` versus `likert5Reversed`. A base score of zero in these files is not a maturity judgment.

Scores should be interpreted by section and alongside qualitative evidence. They are diagnostic signals, not rankings of people or teams.

## Material corrections

- Replaced brittle maturity proxies such as fixed pairing hours, fixed goal counts, named scaling structures, and prescribed testing tools.
- Reframed release planning away from velocity as a target and toward evidence-based forecasting, risk, capacity, and outcome tradeoffs.
- Corrected negatively phrased regression-testing items that previously earned positive maturity points.
- Corrected the static UX handoff and disengaged-leadership items so they carry negative weight.
- Updated distributed-assessment scoring direction for corrected negative items while retaining its Likert design.
- Repaired grammar, spacing, punctuation, obsolete terminology, and ambiguous section descriptions throughout.

`generate.mjs` records the deterministic transformation from the original files to these copies.
