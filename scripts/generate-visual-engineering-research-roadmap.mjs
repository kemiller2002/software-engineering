import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "prompts", "visual-engineering");
const date = "2026-07-23";

const sections = [
  {
    id:"VE-PER", slug:"perception-attention", title:"Perception and Attention",
    purpose:"Explain how visual signals become selectable, discriminable, and stable under realistic viewing conditions.",
    maturity:"Evidence-building", confidence:"medium", priority:"P0", action:"retain and narrow",
    paths:["content/concepts/perception/","content/concepts/attention/","content/projects/composition-science/"],
    assumptions:["Laboratory salience effects predict task-directed attention in production interfaces","Perceptual findings transfer across devices, expertise, and impairment"],
    rivals:["Goals, expectation, and learned task structure dominate bottom-up salience","Effects reverse under time pressure, peripheral viewing, or assistive technology"],
    questions:["Which perceptual mechanisms predict task success rather than first fixation?","Where do crowding, eccentricity, contrast, and expertise change conclusions?","Which measurements survive transfer from laboratory stimuli to interfaces?"],
    methods:"systematic review, replication audit, task-based eye-tracking and error experiments",
    deps:[], related:["spatial-composition","evaluation-measurement","accessibility-cultural-transfer"]
  },
  {
    id:"VE-TYP", slug:"typography-legibility", title:"Typography and Legibility",
    purpose:"Determine when typographic choices improve recognition, reading, comprehension, and action.",
    maturity:"Evidence-building", confidence:"medium", priority:"P1", action:"retain; separate legibility from preference",
    paths:["content/concepts/typography/","content/projects/project-atlas/"],
    assumptions:["Typographic legibility can be summarized by stable universal rules","Letter-confusion evidence predicts continuous reading and interface performance"],
    rivals:["Task, script, language, display, and reader variation dominate typeface-level effects","Typography changes preference or identity without materially changing performance"],
    questions:["Which typography effects replicate across tasks and populations?","How do letter recognition, reading speed, comprehension, and navigation differ?","What evidence warrants token or component constraints?"],
    methods:"systematic review, multilingual evidence audit, controlled reading and recognition experiments",
    deps:["perception-attention"], related:["accessibility-cultural-transfer","spatial-composition","evaluation-measurement"]
  },
  {
    id:"VE-COL", slug:"color-contrast", title:"Color, Contrast, and Appearance",
    purpose:"Model relational color appearance and determine safe engineering uses for differentiation, emphasis, and meaning.",
    maturity:"Theory-forming", confidence:"medium", priority:"P1", action:"retain; split measurement from semantic use",
    paths:["content/concepts/color/","content/projects/project-atlas/"],
    assumptions:["Modern perceptual spaces adequately predict interface color differences","Relational color principles transfer from art pedagogy to digital task performance"],
    rivals:["Context, adaptation, device, gamut, age, and deficiency overwhelm nominal color-space distance","Historical systems are useful vocabularies but weak causal models"],
    questions:["Which color metrics predict discrimination and meaning under interface conditions?","When do simultaneous contrast and adaptation matter operationally?","How should redundant encodings constrain semantic color?"],
    methods:"measurement review, standards crosswalk, device simulations, discrimination and comprehension experiments",
    deps:["perception-attention"], related:["accessibility-cultural-transfer","evaluation-measurement","spatial-composition"]
  },
  {
    id:"VE-SPA", slug:"spatial-composition", title:"Spatial Composition, Density, and Hierarchy",
    purpose:"Explain how grouping, spacing, proportion, density, and hierarchy form usable visual scenes.",
    maturity:"Theory-forming", confidence:"medium", priority:"P0", action:"merge composition, spacing, hierarchy, and density",
    paths:["content/concepts/composition/","content/concepts/spacing/","content/concepts/hierarchy/","content/projects/composition-science/"],
    assumptions:["A coherent hierarchy reliably improves comprehension and action","Spacing ratios can be converted into reusable rules independent of content and task"],
    rivals:["Multiple task-relative hierarchies outperform a single visual order","Semantic structure and interaction history explain benefits attributed to geometry"],
    questions:["What mechanisms connect spatial relations to task outcomes?","When does density aid expert scanning rather than create overload?","Which relational measures generalize across viewport and content changes?"],
    methods:"mechanism review, corpus measurement, factorial layout experiments, expert–novice comparison",
    deps:["perception-attention"], related:["wayfinding-familiarity","typography-legibility","evaluation-measurement"]
  },
  {
    id:"VE-WAY", slug:"wayfinding-familiarity", title:"Wayfinding, Familiarity, and Learning",
    purpose:"Separate inherent comprehensibility from learned convention, predictive fit, and navigation skill.",
    maturity:"Theory-forming", confidence:"medium", priority:"P0", action:"merge wayfinding with familiarity and learning",
    paths:["content/concepts/wayfinding/","content/concepts/learning/","content/projects/composition-science/research-note/intuitive-is-just-familiar-predictive-fit-rep-v2.md"],
    assumptions:["Perceived intuitiveness is primarily predictive fit built through familiarity","Consistent placement and labels necessarily improve navigation"],
    rivals:["Affordance, semantic transparency, feedback, and motor fluency contribute independently","Strategic inconsistency can improve notice, learning, or safety"],
    questions:["What proportion of intuitive performance is explained by exposure versus semantic transparency?","When does consistency create negative transfer?","How should learning curves and recoverability be measured?"],
    methods:"longitudinal learning studies, convention perturbation experiments, cross-product transfer tests",
    deps:["perception-attention","spatial-composition"], related:["product-semantics","accessibility-cultural-transfer","evaluation-measurement"]
  },
  {
    id:"VE-SEM", slug:"product-semantics", title:"Product Semantics and Information Architecture",
    purpose:"Connect product concepts, tasks, evidence, and states to representations users and agents can reason about.",
    maturity:"Structured", confidence:"low", priority:"P0", action:"create from Product Genome and ontology work",
    paths:["content/concepts/product-design/","content/concepts/ontology/","content/projects/product-genome/"],
    assumptions:["A product genome can capture stable structures across product domains","Shared semantic models improve both human understanding and agent generation"],
    rivals:["Product structure is irreducibly domain- and workflow-specific","Shared schemas create false equivalence and suppress important local meaning"],
    questions:["What semantic units remain stable across products?","How should task, state, evidence, and action relationships be represented?","Which schema constraints reduce agent error without reducing useful variation?"],
    methods:"comparative product modeling, ontology competency tests, agent-generation trials, domain expert review",
    deps:[], related:["component-systems","wayfinding-familiarity","governance-knowledge-system"]
  },
  {
    id:"VE-CMP", slug:"component-systems", title:"Components, Tokens, and Declarative Systems",
    purpose:"Test whether reusable visual primitives preserve semantics, accessibility, and adaptability across projects.",
    maturity:"Evidence-building", confidence:"medium", priority:"P1", action:"retain; broaden beyond framework choice",
    paths:["content/concepts/component-architecture/","content/projects/design-library/"],
    assumptions:["Standardized components reduce human and agent error","A shared component core can preserve meaning across contexts"],
    rivals:["Standardization shifts errors into composition and misuse","Domain-specific components outperform universal abstractions on safety and clarity"],
    questions:["Which invariants belong in components, tokens, schemas, or guidance?","How do escape hatches affect consistency and safety?","What tests demonstrate semantic durability across renderers?"],
    methods:"architecture evidence review, mutation testing, cross-project prototypes, accessibility conformance tests",
    deps:["product-semantics"], related:["governance-knowledge-system","accessibility-cultural-transfer","evaluation-measurement"]
  },
  {
    id:"VE-EVL", slug:"evaluation-measurement", title:"Evaluation, Measurement, and Experimentation",
    purpose:"Create valid measures and research infrastructure linking visual interventions to consequential outcomes.",
    maturity:"Exploratory", confidence:"low", priority:"P0", action:"create as foundational shared infrastructure",
    paths:["content/concepts/research-methodology/","content/projects/composition-science/experiment-report/","content/projects/design-library/experiment-report/"],
    assumptions:["Common UX metrics adequately detect visual-engineering effects","Repository evidence grades are comparable across methods and projects"],
    rivals:["Metric choice changes conclusions and encourages proxy optimization","Evidence quality is multidimensional and cannot be collapsed into one grade"],
    questions:["Which outcomes distinguish notice, comprehension, decision quality, error, and trust?","What minimal experiment metadata enables replication?","How should external validity and heterogeneity affect promotion thresholds?"],
    methods:"measurement validity review, protocol design, benchmark construction, preregistered replication",
    deps:[], related:["perception-attention","spatial-composition","governance-knowledge-system"]
  },
  {
    id:"VE-ACC", slug:"accessibility-cultural-transfer", title:"Accessibility, Individual Difference, and Cultural Transfer",
    purpose:"Treat human variation, assistive technology, language, culture, and context as core boundary conditions.",
    maturity:"Unframed", confidence:"low", priority:"P0", action:"create; prohibit edge-case treatment",
    paths:["content/concepts/human-factors/","content/projects/clinical-communication-engineering/"],
    assumptions:["Findings from typical Western desktop users generalize sufficiently for defaults","Conformance standards are adequate proxies for accessible task performance"],
    rivals:["Effects vary qualitatively across disability, age, language, culture, device, and expertise","Formal conformance can coexist with serious usability and comprehension failures"],
    questions:["Which current claims lack representative populations or contexts?","Where do accessibility needs conflict with hierarchy, density, motion, or customization?","What must be redundant, adaptable, or user-controlled?"],
    methods:"coverage audit, participatory research, assistive-technology testing, cross-cultural replication",
    deps:["evaluation-measurement"], related:["typography-legibility","color-contrast","human-agent-communication"]
  },
  {
    id:"VE-HAC", slug:"human-agent-communication", title:"Human–Agent Visual Communication",
    purpose:"Determine how interfaces communicate provenance, uncertainty, intent, control, and evidence between people and AI agents.",
    maturity:"Unframed", confidence:"low", priority:"P1", action:"create as distinct domain",
    paths:["content/projects/clinical-communication-engineering/","content/projects/product-genome/","content/projects/design-library/"],
    assumptions:["Human-centered visual principles transfer directly to agent-facing representations","More explanation and visible uncertainty necessarily improve calibrated trust"],
    rivals:["Agents need machine-readable semantics that diverge from human presentation","Additional explanation can overload people or create unwarranted confidence"],
    questions:["Which representations support calibrated reliance and contestability?","How should provenance and uncertainty remain traceable across summary layers?","What visual contracts reduce agent generation and interpretation errors?"],
    methods:"human–AI interaction review, agent benchmark tasks, calibrated-trust experiments, failure-case analysis",
    deps:["product-semantics","evaluation-measurement"], related:["component-systems","accessibility-cultural-transfer","domain-safety"]
  },
  {
    id:"VE-GOV", slug:"governance-knowledge-system", title:"Research Governance and Knowledge System",
    purpose:"Make claims, evidence, decisions, failures, and updates reconstructable without freezing provisional theory.",
    maturity:"Structured", confidence:"medium", priority:"P0", action:"merge governance, ontology, graph, and evidence operations",
    paths:["knowledge-platform/","content/concepts/evidence/","content/concepts/knowledge-graph/","content/projects/composition-science/canonical/"],
    assumptions:["Stable IDs and registries produce traceability and cumulative learning","A shared ontology can align heterogeneous disciplines without distortion"],
    rivals:["Documentation overhead causes stale or performative records","Premature ontology stabilizes disputed categories and hides disagreement"],
    questions:["What is the minimum durable research record?","How are conflicts, supersession, and uncertainty represented?","Which automated checks detect orphan claims, broken provenance, and stale standards?"],
    methods:"governance comparison, schema threat modeling, repository audits, workflow usability tests",
    deps:["evaluation-measurement"], related:["product-semantics","component-systems","domain-safety"]
  },
  {
    id:"VE-DOM", slug:"domain-safety", title:"Domain Adaptation, Trust, and Safety",
    purpose:"Test transfer into consequential domains and define when general visual principles require local override.",
    maturity:"Exploratory", confidence:"low", priority:"P1", action:"retain Clinical Communication as exemplar; generalize cautiously",
    paths:["content/projects/clinical-communication-engineering/","content/projects/project-atlas/case-study/"],
    assumptions:["General visual-engineering principles can be adapted through parameter changes","Clarity, trust, and credibility tend to move together"],
    rivals:["High-stakes domains require distinct representations, workflows, and accountability","Fluent clarity can increase dangerous overtrust and mask uncertainty"],
    questions:["Which principles reverse under safety, legal, or time-critical constraints?","How should provenance, escalation, and uncertainty alter visual priorities?","What evidence is required before a general principle becomes a domain standard?"],
    methods:"domain evidence review, cognitive walkthrough, hazard analysis, simulation with domain experts",
    deps:["evaluation-measurement","accessibility-cultural-transfer","human-agent-communication"], related:["governance-knowledge-system","product-semantics"]
  }
];

const commonProcess = `## Required research process

Work in repeated cycles: (1) inspect repository knowledge; (2) identify the largest consequential uncertainty; (3) refine hypotheses; (4) specify supporting and disconfirming observations; (5) search reliable sources; (6) compare explanations; (7) attempt falsification; (8) update confidence and scope; (9) record unresolved questions and negative results; (10) choose the highest-information next investigation. Stop only under the stated stop conditions.

## Evidence and discernment standard

Prioritize original empirical research, systematic reviews, standards and official guidance, technical documentation, foundational and historical sources, field studies, controlled experiments, accessibility and cross-cultural research, documented failures, and technically relevant patents. Require source diversity and independence. Blogs, trends, vendor claims, and opinion can supply leads but cannot carry conclusions.

Explicitly assess confirmation, survivorship, novelty, authority, and publication bias; false universality; preference versus performance; familiarity versus inherent clarity; correlation versus causation; laboratory-to-production transfer; human-to-agent transfer; assumptions that standardization or customization is always beneficial; and treatment of accessibility as an edge case. Preserve mixed results. Distinguish descriptive, causal, predictive, normative, engineering, and governance claims.

## Cross-disciplinary and applied synthesis

Inspect relevant neighboring disciplines, name the transfer mechanism, and bound the analogy; analogy is not proof. Translate warranted findings into candidate principles, constraints, component behavior, defaults and customization boundaries, measures, predictions, experiments, anti-patterns, and decision frameworks. Label speculative recommendations.

## Required Research Execution Package

Use the repository's current REP equivalent and metadata standard. Include: executive synthesis; objective and scope; repository context separated from external evidence; current understanding; discoveries; evidence and hypothesis registry entries; rival hypotheses; failed assumptions; counterexamples; contradictions; boundary conditions; open questions; research debt; theory impact; engineering implications; recommended and parallel research; repository updates; handoff; research journal; and completion checklist. Propose registry changes; do not silently rewrite canonical theory.

## Durable recording and continuation

Record what was examined; queries and strategies; accepted and rejected sources with reasons; evidence IDs and claim mappings; hypotheses tested, created, weakened, rejected, or narrowed; confidence changes; contradictions; negative results; failed approaches; access limitations; missing evidence; replications; new questions; exact next steps; specialist agents and dependencies; files changed; registry updates; and the exact resume point. Another agent must be able to continue without conversation history.

## Stop conditions

Do not stop after finding supporting sources. Stop only after priority hypotheses and major rivals have been meaningfully challenged, high-value source classes are covered, limitations are mapped, and added searching has low expected information gain—or when the remaining work requires an experiment, inaccessible evidence, or another specialist and that dependency is precisely documented.

## Final self-audit

Answer: What did I expect? What most challenged it? What conclusion is strongest and why? Which is fragile? Where might I be overgeneralizing? Which stakeholder or discipline is missing? What would a skeptical expert dispute? What evidence would most change the roadmap? Can another agent reconstruct and continue from the artifacts alone?`;

function fm(id,title,type, concepts=[], metadata={}){
 const updated = metadata.updated ?? date;
 const status = metadata.status ?? "research-draft";
 const canonical = metadata.canonical ?? false;
 return `---\nid: ${id}\ntitle: ${title}\nabstract: Research-program artifact for the Visual Engineering repository.\ncreated: ${date}\nupdated: ${updated}\nproject: Visual Engineering\ndocument_type: ${type}\nstatus: ${status}\ncanonical: ${canonical}\nconcepts:\n${concepts.map(x=>`  - ${x}`).join("\n") || "  - research-methodology"}\n---\n`;
}
function link(fromDir, target) { return path.relative(fromDir, target).replaceAll(path.sep,"/"); }
function write(rel, text){ const p=path.join(out,rel); fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p,text.trim()+"\n"); }

for (const s of sections) {
 const dir=path.join(out,"sections",s.slug);
 const hypotheses=s.assumptions.map((h,i)=>`### ${s.id}-H${i+1}\n\n- **Statement:** ${h}.\n- **Rationale:** This assumption is implicit in current repository framing.\n- **Support:** Repository material is suggestive but not sufficient for promotion.\n- **Contradiction/rivals:** ${s.rivals[i] || s.rivals[0]}.\n- **Predicted observation:** A preregistered intervention improves a consequential task measure across specified contexts.\n- **Disconfirming observation:** The effect fails, reverses, or is explained by the rival under representative conditions.\n- **Boundary conditions:** population, task, expertise, language, impairment, device, environment, and time pressure.\n- **Confidence / cost of error:** low-to-medium / high.\n- **Method:** ${s.methods}.`).join("\n\n");
 const qcats=["Foundational","Explanatory","Comparative","Boundary-condition","Applied engineering","Measurement","Ethical/accessibility","Cross-disciplinary"];
 const questions=qcats.map((c,i)=>`- **${c}:** ${s.questions[i%s.questions.length]}`).join("\n");
 const roadmap=`${fm(`RDM-${s.id}-001`,`${s.title} Research Roadmap`,"roadmap",[s.slug])}
# ${s.title} Research Roadmap

## A. Identity and scope

- **Identifier:** ${s.id}
- **Area and disciplines:** ${s.title}; ${s.methods}
- **Repository paths:** ${s.paths.map(x=>`\`${x}\``).join(", ")}
- **Why it exists:** ${s.purpose}
- **In scope:** mechanisms, boundary conditions, measurement validity, engineering translation.
- **Out of scope:** untested style preference presented as universal guidance.
- **Adjacent sections:** ${s.related.join(", ")}.
- **Taxonomy judgment:** ${s.action}. This boundary follows mechanisms and decisions, not current folders.

## B. Current state

- **Maturity / confidence / priority:** ${s.maturity} / ${s.confidence} / ${s.priority}.
- **Understanding:** The repository contains useful models and examples, but uneven traceability and little independent replication.
- **Existing theory/evidence:** Inspect the paths above; treat registries and REPs as claims to audit, not truth.
- **Contradictions and failed assumptions:** Preserve reversals, null results, inaccessible citations, and project-specific exceptions.
- **Research debt:** representative populations, production transfer, preregistration, shared outcome measures, and independent evidence.
- **Missing perspectives:** accessibility, cross-cultural research, statistics, implementation operations, and affected domain experts.

## C. Critical evaluation

- **Strongest claim class:** relational and context-dependent effects are more plausible than universal constants.
- **Weakest claim class:** numerical defaults or standards inferred from historical authority, preference, or small laboratory studies.
- **Hidden assumptions:** ${s.assumptions.join("; ")}.
- **Rivals:** ${s.rivals.join("; ")}.
- **Category-error risks:** preference→performance, correlation→causation, human→agent, descriptive→normative.
- **Premature-standardization risk:** constraints may encode narrow populations or tasks and make contradictory evidence harder to see.

## D. Research questions

${questions}

## E. Hypothesis portfolio

${hypotheses}

## F. Research streams

### Stream 1 — Foundation and falsification

- **Objective:** map credible evidence and directly challenge ${s.id}-H1/H2.
- **Disciplines/sources/method:** ${s.methods}; primary research, reviews, standards, failures, and counterexamples.
- **Artifacts:** REP, evidence/hypothesis updates, contradiction ledger, coverage table.
- **Dependencies:** ${s.deps.length?s.deps.join(", "):"none; may begin immediately"}.
- **Parallelization:** source-class and population audits may run independently, then integrate.
- **Saturation:** new searches cease changing confidence, boundaries, or rival coverage.
- **Impact:** determines whether theory should be retained, narrowed, replaced, or withheld.

### Stream 2 — Engineering translation and validation

- **Objective:** turn only supported mechanisms into testable engineering guidance.
- **Artifacts:** candidate constraints, benchmark tasks, experiment protocol, counterexamples, adoption gate.
- **Dependency:** Stream 1 and the evaluation-measurement protocol.
- **Saturation:** predictions are measurable and failure/rollback criteria are explicit.

## G. Prioritization

${s.priority} because the section has ${s.deps.length?"important upstream dependencies but":"few prerequisites and"} high cross-section reuse, consequential error cost, and falsifiable assumptions. Foundation work precedes translation because available documentation is not equivalent to validated evidence. Accessibility and external-validity audits run in parallel to reduce avoidable rework.

## H. Execution sequence

1. Run \`01-foundation-falsification-research-prompt.md\`.
2. Integrate at the evidence/hypothesis registry checkpoint; re-score confidence.
3. Run \`02-engineering-validation-prompt.md\` only for hypotheses that survive.
4. Block standards on unresolved validity, safety, or population gaps.
5. Reopen when replication fails, a new domain reverses an effect, standards change, or production monitoring conflicts.

## I. Completion and saturation criteria

- **Provisional theory:** convergent independent evidence plus investigated rivals and explicit scope.
- **Engineering principle:** measurable prediction, representative task evidence, constraints, and rollback condition.
- **Reusable standard/component:** replication across required contexts, accessibility review, conformance tests, and ownership.
- **Insufficient:** preference evidence, analogy, single-source authority, or unresolved high-cost contradiction.
- **Diminishing return:** additional sources no longer change claim, confidence, boundaries, or next experiment.

## J. Expected repository updates

Update the REP, research journal, evidence/hypothesis/theory registries, ontology/glossary, roadmap, knowledge graph, generated catalog, experiments, and examples/counterexamples as warranted. Never silently overwrite history.`;
 write(`sections/${s.slug}/roadmap.md`,roadmap);
 const mission=`${fm(`PRM-${s.id}-001`,`${s.title}: Foundation and Falsification Research Prompt`,"research-prompt",[s.slug])}
# ${s.title}: Foundation and Falsification

## Mission

Discover whether the repository's governing claims about ${s.title.toLowerCase()} survive serious evidence review and why that matters to Visual Engineering. Do not attempt to validate current theory. Treat it as provisional. Evidence overrides repository preference. Contradictions are valuable. Do not stop at a surface summary.

## Repository context

Read \`${link(dir,path.join(out,"research-roadmap.md"))}\`, \`roadmap.md\`, ${s.paths.map(x=>`\`${link(dir,path.join(root,x))}\``).join(", ")}, the repository metadata standard, governance specification, relevant REPs, and neighboring sections (${s.related.join(", ")}). Distinguish repository assertions from external evidence.

## Prioritized questions

${s.questions.map((q,i)=>`${i+1}. ${q}`).join("\n")}

## Initial and rival hypotheses

${s.assumptions.map((h,i)=>`- **${s.id}-H${i+1}:** ${h}. Rival: ${s.rivals[i]||s.rivals[0]}. Define precisely; expose assumptions; seek support, disconfirmation, counterexamples, and boundaries; revise or reject when warranted.`).join("\n")}

${commonProcess}`;
 write(`sections/${s.slug}/01-foundation-falsification-research-prompt.md`,mission);
 const eng=`${fm(`PRM-${s.id}-002`,`${s.title}: Engineering Translation and Validation Prompt`,"research-prompt",[s.slug])}
# ${s.title}: Engineering Translation and Validation

## Mission

Determine which surviving findings can responsibly become measurable Visual Engineering constraints, defaults, components, tests, or decision rules. Do not attempt to validate current theory. Treat all candidates as provisional. Evidence overrides repository preference; contradictions are valuable; do not stop at surface translation.

## Repository context and entry gate

Read \`roadmap.md\`, the completed foundation REP and registry updates, ${s.paths.map(x=>`\`${link(dir,path.join(root,x))}\``).join(", ")}, and evaluation/accessibility roadmaps. If no completed foundation REP exists, stop and record the dependency. Separate repository claims, external evidence, and engineering judgment.

## Questions and hypotheses

1. Which supported mechanisms yield measurable predictions and which only describe preference?
2. What defaults, constraints, escape hatches, monitoring, and rollback rules follow?
3. Where do population, culture, domain, device, expertise, or agent use change the design?
4. What experiment can distinguish each candidate from ${s.rivals.join(" and ")}?

Treat engineering usefulness as a hypothesis. Attempt misuse, mutation, accessibility, cross-context, and reversal tests. A component or standard is rejected or narrowed when it cannot preserve semantics, exposes high-cost failure, or lacks a measurable conformance test.

${commonProcess}`;
 write(`sections/${s.slug}/02-engineering-validation-prompt.md`,eng);
 write(`sections/${s.slug}/README.md`,`${fm(`IDX-${s.id}-001`,`${s.title} Prompt Set`,"index",[s.slug])}
# ${s.title}

${s.purpose}

- [Roadmap](roadmap.md)
- [01 — Foundation and falsification](01-foundation-falsification-research-prompt.md)
- [02 — Engineering translation and validation](02-engineering-validation-prompt.md)

Run prompt 01 first. Prompt 02 is gated on a durable REP and registry checkpoint.`);
}

const waves=[
 ["Wave 0 — research infrastructure",["evaluation-measurement","governance-knowledge-system"]],
 ["Wave 1 — foundational mechanisms",["perception-attention","product-semantics","accessibility-cultural-transfer"]],
 ["Wave 2 — visual systems",["spatial-composition","typography-legibility","color-contrast","wayfinding-familiarity"]],
 ["Wave 3 — implementation and interaction",["component-systems","human-agent-communication"]],
 ["Wave 4 — consequential transfer",["domain-safety"]]
];
const taxonomy=sections.map(s=>`| ${s.id} | ${s.title} | ${s.action} | ${s.maturity} | ${s.confidence} | ${s.priority} |`).join("\n");
write("research-roadmap.md",`${fm("RDM-VE-001","Visual Engineering Research Roadmap","roadmap",["research-methodology"],{updated:"2026-07-24",status:"approved",canonical:true})}
# Visual Engineering Research Roadmap

## Approval

Approved as the canonical research-program roadmap on 2026-07-24. This approval governs the taxonomy, sequencing, dependencies, and operationalization gates. It does not promote provisional research claims, domain prompts, or generated engineering guidance beyond their independently recorded evidence and status.

## Executive judgment

The repository has substantial research artifacts but is not yet one unified validated theory. Its project folders mix mechanisms, applications, infrastructure, and implementation. This roadmap replaces project-as-taxonomy with twelve research domains connected by evidence and decision dependencies. It merges composition/spacing/hierarchy, wayfinding/familiarity/learning, and governance/ontology/graph operations. It creates explicit sections for evaluation, accessibility/cultural transfer, product semantics, and human–agent communication. No existing source is deleted or declared obsolete; duplicate archived material remains evidence of provenance.

## Canonical standard resolution

This program follows \`knowledge-platform/metadata-standard.md\` and the Composition Science governance workflow: journal → REP → registry/graph updates, stable IDs, preserved history, and explicit uncertainty. The local governance file uses legacy \`RP\` while newer packages use \`REP\`; generated prompts say “current REP equivalent” and require agents to use the receiving project's convention. The repository-wide registries are placeholders, so prompts propose changes but must not invent silent canonical state.

## Proposed taxonomy

| ID | Domain | Decision | Maturity | Confidence | Priority |
|---|---|---|---|---|---|
${taxonomy}

Projects remain application/coordination containers: Project Atlas contributes visual primitives; Composition Science contributes scene construction and cognition; Product Genome contributes semantic architecture; Design Library contributes implementation; Clinical Communication Engineering is a consequential-domain exemplar.

## Largest unknowns and highest-risk assumptions

- Whether laboratory perception, historical design systems, and preference findings predict consequential production tasks.
- Whether shared semantic/component systems reduce total error rather than relocating it.
- Whether “intuitive” behavior is familiarity, semantic transparency, feedback, or an interaction.
- Whether evidence generalizes across disability, age, language, culture, expertise, device, and domain.
- Whether visual fluency improves calibrated trust or creates dangerous overconfidence.
- Whether evidence grades and current measures support theory promotion.

## Priority waves and rationale

${waves.map(([w,ss])=>`### ${w}\n\n${ss.map(x=>`- [${sections.find(s=>s.slug===x).title}](sections/${x}/roadmap.md)`).join("\n")}`).join("\n\n")}

Infrastructure comes first because weak measures can make every later result confidently wrong. Perception and semantics can proceed in parallel because they have different evidence bases. Visual-system streams then consume shared measurement and boundary protocols. Components and agents depend on semantic results. Domain standards are last because transfer and error costs require the strongest gate.

## Parallel assignments and integration

Within a wave, foundation prompts may run in parallel. Integrate at four checkpoints: evidence-ID collision and source-quality audit; cross-section contradiction review; accessibility/external-validity review; theory-to-engineering promotion review. Shared needs are benchmark tasks, population/context descriptors, preregistration templates, effect/uncertainty reporting, provenance graphs, accessible prototypes, and failure corpora.

## Operationalization gates

Component framework mechanics and limited color/typography measurements may support scoped implementation, but no repository-wide universal standard is justified. Spatial hierarchy, intuitiveness, human–agent trust, and cross-cultural claims must not become mandatory standards until representative replication and reversal tests exist.

## Revision criteria

Revise this roadmap when a replicated result changes a dependency, a domain shows a reversal, a new population invalidates scope, evidence quality changes, an ontology boundary repeatedly fails, or two consecutive integration reviews find low information gain. Preserve the prior roadmap and record supersession.`);

const indexRows=sections.map((s,i)=>`| ${s.id} | ${s.title} | ${s.purpose} | ${s.maturity}/${s.confidence} | ${s.priority} | [roadmap](sections/${s.slug}/roadmap.md) | [01](sections/${s.slug}/01-foundation-falsification-research-prompt.md); [02](sections/${s.slug}/02-engineering-validation-prompt.md) | ${s.deps.join(", ")||"none"} | ${s.related.join(", ")} | ${i+1} | planned |`).join("\n");
write("section-index.md",`${fm("IDX-VE-001","Visual Engineering Section Index","index",["research-methodology"])}
# Section Index

| ID | Title | Purpose | Maturity/confidence | Priority | Roadmap | Prompts | Dependencies | Related | Order | Status |
|---|---|---|---|---|---|---|---|---|---:|---|
${indexRows}`);

write("research-dependency-map.md",`${fm("MAP-VE-001","Visual Engineering Research Dependency Map","roadmap",["research-methodology"])}
# Research Dependency Map

\`\`\`text
evaluation-measurement ─┬─> accessibility-cultural-transfer ─┬─> domain-safety
                       ├─> governance-knowledge-system ──────┤
                       └─> perception-attention ─┬─> spatial-composition ─> wayfinding-familiarity
                                                ├─> typography-legibility
                                                └─> color-contrast
product-semantics ─────────> component-systems ──────────────┤
        └──────────────────> human-agent-communication ──────┘
\`\`\`

Arrows are evidence or protocol gates, not claims of exclusive causation. Foundation reviews within the same wave can run in parallel. Engineering prompts wait for their section's foundation REP and the relevant evaluation/accessibility checkpoint. Integration reviews must preserve cross-section contradictions rather than force consensus.`);

const scoreRows=sections.map(s=>{
 const score={P0:9,P1:7,P2:4}[s.priority];
 return `| ${s.title} | ${s.priority} | ${score} | high | ${s.confidence} | ${s.deps.length?"dependent":"ready"} | ${s.methods} |`;
}).join("\n");
write("research-priority-matrix.md",`${fm("MAT-VE-001","Visual Engineering Research Priority Matrix","roadmap",["research-methodology"])}
# Research Priority Matrix

Scores are ordinal decision aids, not measurements. Priority reflects foundational leverage, uncertainty, error cost, falsifiability, feasibility, reuse, and present engineering urgency.

| Domain | Priority | Composite | Error cost | Confidence | Readiness | Best next method |
|---|---:|---:|---|---|---|---|
${scoreRows}

P0 work either supplies shared validity infrastructure or challenges assumptions whose failure would invalidate several downstream standards. P1 work is consequential but benefits from P0 protocols or evidence. Re-score after every integration checkpoint.`);

write("research-coverage-audit.md",`${fm("AUD-VE-001","Visual Engineering Research Coverage Audit","audit",["research-methodology"])}
# Research Coverage Audit

## Coverage judgment

Every publishable project, concept index, archive class, registry placeholder, build/metadata document, and prompt directory was considered. The audit uses repository inventory and source structure; it is not a new external evidence review.

| Coverage | Domains | Judgment |
|---|---|---|
| Relatively strong corpus | color; spatial composition; typography; component systems | Many artifacts, but uneven replication and claim-to-evidence traceability |
| Structured but incomplete | perception/attention; familiarity/wayfinding; product semantics; governance | Strong framing, important unresolved mechanisms and validation gaps |
| Weak or implicit | evaluation; accessibility/cultural transfer; human–agent communication; domain transfer | Must be explicit before repository-wide standards |
| Redundant | archived Composition Science and Project Atlas duplicates; overlapping research-library versions | Preserve archive; use supersession metadata and avoid new duplicate prompts |

## Quality risks

- Repository-wide evidence, hypothesis, and experiment indexes are placeholders while project registries are richer.
- Metadata and identifier conventions vary across projects.
- Numerous mature-sounding claims rest on narrow, historical, laboratory, or secondary evidence.
- Accessibility, culture, language, age, expertise, mobile conditions, and assistive technology are not consistently first-class.
- Human findings are sometimes positioned for agent systems without mechanism tests.
- Generated/published output can appear authoritative despite draft source status.

## Missing sections considered

Motion and emotional response were considered but not made standalone sections because the current corpus is too thin; track them as research debt within perception and domain adaptation until distinct mechanisms and source bases justify a split. Trust/credibility is assigned to human–agent and domain safety. Architecture is split between spatial composition, product semantics, and component systems to avoid mixing physical analogy, information structure, and software implementation.

## Quality gate result

Taxonomy, dependencies, assumptions, rivals, boundaries, execution gates, and durable handoffs are present. Research completeness is intentionally not claimed: this artifact plans evidence work and identifies blind spots.`);

write("README.md",`${fm("IDX-VE-000","Visual Engineering Research Program","index",["research-methodology"])}
# Visual Engineering Research Program

This directory is the executable research-program layer generated from the repository-wide roadmap prompt.

1. Read [the master roadmap](research-roadmap.md).
2. Use [the priority matrix](research-priority-matrix.md) and [dependency map](research-dependency-map.md).
3. Choose a section from [the section index](section-index.md).
4. Run its \`01\` foundation/falsification prompt.
5. Integrate the REP and registry updates before running \`02\`.

Supporting audits: [coverage](research-coverage-audit.md) and [generated files](generated-files-manifest.md).`);

// Manifest is generated last from the exact output tree.
const files=[];
for (const p of fs.readdirSync(out,{recursive:true})) {
 const abs=path.join(out,p);
 if (fs.statSync(abs).isFile() && p!=="generated-files-manifest.md") files.push(p);
}
files.sort();
const manifestRows=files.map(p=>{
 const sec=sections.find(s=>p.includes(`/sections/${s.slug}/`)||p.startsWith(`sections/${s.slug}/`));
 const type=p.endsWith("roadmap.md")?"roadmap":p.includes("prompt.md")?"executable prompt":p.endsWith("README.md")?"navigation":"program control";
 return `| \`${p}\` | ${type} | ${sec?.title||"repository-wide"} | created | yes |`;
}).join("\n");
write("generated-files-manifest.md",`${fm("MAN-VE-001","Visual Engineering Generated Files Manifest","manifest",["research-methodology"])}
# Generated Files Manifest

All prompt-program entries were created on ${date}. The repository validator also refreshed two generated inventory reports; no research source files were moved, superseded, deleted, or modified. Human review is recommended because taxonomy and priorities involve consequential judgment.

| Path | Artifact type | Source section | Status | Human review |
|---|---|---|---|---|
${manifestRows}
| \`generated-files-manifest.md\` | manifest | repository-wide | created | yes |
| \`../../build-reports/content-inventory.json\` | generated validation inventory | repository-wide | modified by \`npm run research:validate\` | no |
| \`../../build-reports/content-inventory.md\` | generated validation inventory | repository-wide | modified by \`npm run research:validate\` | no |`);

console.log(`Generated ${sections.length} sections and ${files.length+1} files under ${path.relative(root,out)}`);
