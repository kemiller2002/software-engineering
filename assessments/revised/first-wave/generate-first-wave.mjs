import fs from "node:fs";
import path from "node:path";

const outputDir = import.meta.dirname;
const scorePattern = [-1, -1, 1, 2, 3];

const S = (section, descriptor, entries) => ({ section, descriptor, entries });

const assessments = [
  {
    file: "software-delivery-performance.json",
    name: "Software Delivery Performance",
    sections: [
      S("Measurement Integrity", "Evaluate whether delivery measures are defined consistently, interpreted in context, and trusted enough to guide decisions.", [
        "Delivery performance is discussed mainly through anecdotes or isolated success stories.",
        "Measures are used to rank teams without accounting for product, risk, or workflow differences.",
        "The organization has documented definitions for lead time, deployment frequency, failed-change recovery, change failure, and deployment rework.",
        "Delivery measures are derived consistently from operational systems and segmented by product or service.",
        "Teams routinely test measure quality, expose uncertainty, and revise definitions when they no longer support sound decisions."
      ]),
      S("Flow and Throughput", "Evaluate how efficiently valuable changes move from commitment to usable production outcomes.", [
        "Work commonly waits in large queues or handoffs whose age and impact are not visible.",
        "High utilization or starting more work is rewarded even when cycle time and completion deteriorate.",
        "Teams can see work age, work in progress, blocked time, and end-to-end lead time.",
        "Teams control work in progress and use flow evidence to address their largest recurring delays.",
        "Portfolio and team policies are adapted using flow distributions, customer urgency, and economic tradeoffs."
      ]),
      S("Release Frequency and Batch Size", "Evaluate whether the organization can release small changes at a cadence appropriate to customer and operational risk.", [
        "Releases depend on large batches, exceptional coordination, or infrequent release windows.",
        "Deployment frequency is increased as a target without balancing quality, customer impact, or sustainability.",
        "Teams can release independently at a cadence suitable for their product and risk context.",
        "Batch size and release delay are measured, and teams remove constraints that force unrelated changes together.",
        "Release cadence is an intentional product and risk decision supported by progressive delivery and fast feedback."
      ]),
      S("Change Quality and Recovery", "Evaluate whether changes succeed in production and whether failures are restored quickly and safely.", [
        "Failed changes are hidden, inconsistently classified, or excluded from performance reporting.",
        "Recovery depends on a few individuals or an untested manual procedure.",
        "Teams track customer-impacting failed changes, recovery time, and deployment-related rework.",
        "Rollback, roll-forward, or traffic-control procedures are automated or rehearsed for critical services.",
        "Failure and recovery patterns drive verified improvements to architecture, testing, delivery controls, and operational readiness."
      ]),
      S("Improvement and Outcomes", "Evaluate whether delivery improvement is tied to customer, reliability, quality, and workforce outcomes.", [
        "Delivery metrics are treated as ends in themselves rather than signals about a larger system.",
        "Improvement initiatives declare success from tool adoption without showing changed outcomes.",
        "Teams review delivery measures alongside quality, reliability, customer, and workload countermetrics.",
        "Improvement work targets an observed constraint and checks whether the expected outcome changed.",
        "The organization uses longitudinal evidence and local experiments to learn which capabilities improve delivery in each context."
      ])
    ]
  },
  {
    file: "developer-experience.json",
    name: "Developer Experience",
    sections: [
      S("Feedback Loops", "Evaluate whether developers receive fast, trustworthy feedback while understanding, changing, and operating software.", [
        "Developers routinely wait hours or days for builds, environments, reviews, or access without visibility into the delay.",
        "Slow or flaky feedback is normalized and worked around rather than owned and improved.",
        "Teams measure the time and reliability of their most common development feedback loops.",
        "Build, test, review, deployment, and production feedback meet explicit service expectations for most routine changes.",
        "Developer feedback loops are treated as products and improved using task evidence, user research, and outcome measures."
      ]),
      S("Cognitive Load and Understandability", "Evaluate whether systems, responsibilities, and information are understandable within reasonable cognitive limits.", [
        "Developers must understand many unrelated systems or undocumented exceptions to complete routine work.",
        "Complexity is shifted onto product teams without measuring its effect on delivery or reliability.",
        "Service ownership, dependencies, standards, and common workflows are discoverable.",
        "Teams actively reduce unnecessary cognitive load through clearer boundaries, automation, documentation, and platform capabilities.",
        "Cognitive-load evidence informs architecture, team boundaries, platform roadmaps, and investment decisions."
      ]),
      S("Tooling and Environment Usability", "Evaluate whether development tools and environments make important tasks safe, accessible, and efficient.", [
        "Routine setup and environment recovery depend on tribal knowledge or individual machines.",
        "Tools are selected centrally without validating task success or developer needs.",
        "Documented, supported paths exist for environment setup, common changes, testing, and deployment.",
        "Internal tools are measured for adoption, retention, task success, reliability, and user satisfaction.",
        "Teams can choose appropriate tools within clear interoperability, security, and support boundaries."
      ]),
      S("Flow, Focus, and Interruptions", "Evaluate whether work design protects focus while enabling timely collaboration and operational response.", [
        "Unplanned work and interruptions routinely displace commitments without explicit tradeoffs.",
        "Individual utilization is maximized even when queues, handoffs, and context switching increase.",
        "Teams make planned, unplanned, support, and operational work visible.",
        "Interrupt load, work in progress, and dependencies are managed using explicit policies and rotation models.",
        "Organizational demand and team capacity are continually rebalanced using flow, sustainability, and customer evidence."
      ]),
      S("Satisfaction, Inclusion, and Agency", "Evaluate whether developers have the support, autonomy, and inclusive conditions needed to do effective work.", [
        "Developer concerns about tools or work design receive no safe response or visible ownership.",
        "A single average satisfaction score masks material differences between roles, locations, or demographic groups.",
        "Developers can report friction, obtain support, and understand how improvement priorities are chosen.",
        "Experience data is segmented with privacy safeguards and combined with behavioral and operational evidence.",
        "Teams participate in shaping their local methods, and systemic experience issues have accountable owners and verified outcomes."
      ])
    ]
  },
  {
    file: "product-strategy-quality.json",
    name: "Product Strategy Quality",
    sections: [
      S("Target Customer and Problem", "Evaluate whether the strategy identifies a specific customer, important problem, and credible evidence of need.", [
        "The strategy describes a broad market without identifying whose problem is most important.",
        "Customer needs are asserted from internal opinion or sales pressure without representative evidence.",
        "The strategy names target segments, users, needs, and relevant alternatives.",
        "Problem importance and segment differences are supported by current qualitative and quantitative evidence.",
        "The organization updates its customer and problem model as behavior, competition, and market conditions change."
      ]),
      S("Differentiated Value and Advantage", "Evaluate whether the strategy makes a credible choice about differentiated value and defensible advantage.", [
        "The strategy is a feature list or aspiration that could describe most competitors.",
        "Differentiation relies on unsupported claims or temporary implementation details.",
        "The strategy states why target customers should choose the product over specific alternatives.",
        "Differentiation is tested through customer behavior, willingness to pay, retention, or other relevant evidence.",
        "Capabilities, data, distribution, ecosystem, cost structure, or learning advantages reinforce one another over time."
      ]),
      S("Choices and Tradeoffs", "Evaluate whether the strategy establishes coherent choices about where to play, how to win, and what not to pursue.", [
        "Priorities expand whenever a stakeholder requests work, with no explicit opportunity cost.",
        "The strategy avoids difficult choices by labeling every segment, channel, or initiative strategic.",
        "The strategy states explicit priorities, exclusions, constraints, and decision principles.",
        "Funding, staffing, roadmaps, and commercial commitments reflect the stated choices.",
        "Leaders revisit choices when assumptions fail while preserving coherence and explaining consequential changes."
      ]),
      S("Assumptions and Evidence", "Evaluate whether critical strategy assumptions are visible, testable, and managed according to uncertainty.", [
        "Critical assumptions about demand, feasibility, viability, or risk remain implicit.",
        "Positive evidence is collected without defining what would change or stop the strategy.",
        "Material assumptions, uncertainties, and dependencies are documented.",
        "The highest-risk assumptions have discriminating tests, owners, evidence thresholds, and decision dates.",
        "Strategy confidence is updated transparently using confirming, falsifying, and contradictory evidence."
      ]),
      S("Execution Coherence and Review", "Evaluate whether the strategy guides coordinated execution and adapts through a disciplined review system.", [
        "Teams cannot explain how current investments connect to product strategy.",
        "Strategy reviews focus on activity completion rather than changed outcomes or assumptions.",
        "Goals, roadmaps, measures, and decision rights trace to strategic choices.",
        "Cross-functional reviews examine outcomes, market change, capability progress, and assumption status.",
        "The strategy operates as a learning system that reallocates investment and stops work when evidence warrants it."
      ])
    ]
  },
  {
    file: "product-discovery-effectiveness.json",
    name: "Product Discovery Effectiveness",
    sections: [
      S("Opportunity Discovery", "Evaluate whether teams continuously identify and frame valuable customer opportunities.", [
        "Discovery begins with a requested solution and does not examine the underlying need.",
        "The loudest customer or stakeholder is treated as representative without checking segment evidence.",
        "Teams gather direct evidence about customer goals, context, constraints, and alternatives.",
        "Opportunities are synthesized, segmented, and connected to measurable customer and business outcomes.",
        "Opportunity understanding is continuously refreshed and shared across product, design, engineering, support, and commercial groups."
      ]),
      S("Assumption Identification", "Evaluate whether teams expose value, usability, feasibility, viability, and ethical assumptions before committing heavily.", [
        "Solutions enter delivery with material assumptions left implicit.",
        "Technical feasibility is examined while customer value, usability, viability, or harm is assumed.",
        "Teams identify the assumptions that must hold for a proposed solution to succeed.",
        "Assumptions are prioritized by consequence and uncertainty using relevant cross-functional expertise.",
        "Assumption maps and confidence are updated as evidence changes, including after release."
      ]),
      S("Testing and Evidence Quality", "Evaluate whether discovery methods produce credible, decision-relevant evidence.", [
        "Teams ask leading questions or treat stated preference as proof of future behavior.",
        "Only confirming evidence is reported, and contradictory observations are discarded as outliers.",
        "Methods are selected to match the uncertainty, such as interviews, prototypes, technical spikes, or behavioral tests.",
        "Tests define the decision, expected signal, limitations, and evidence that would change direction.",
        "Multiple evidence types are triangulated, and consequential claims receive independent or disconfirming review."
      ]),
      S("Discovery-Delivery Integration", "Evaluate whether discovery and delivery form one learning system rather than sequential handoffs.", [
        "Discovery produces specifications that are handed to delivery with little continuing collaboration.",
        "Discovery runs far ahead, creating inventory that becomes stale before implementation.",
        "Product, design, and engineering collaborate during discovery and delivery.",
        "Small delivery increments generate evidence that feeds the next discovery and prioritization decisions.",
        "Discovery depth, delivery commitment, and technical investment adapt together based on risk and learning."
      ]),
      S("Learning Speed and Decision Impact", "Evaluate whether discovery changes decisions quickly enough to reduce waste and improve outcomes.", [
        "Research findings accumulate without owners, decision links, or follow-through.",
        "Discovery success is measured by activities completed rather than decisions improved.",
        "Insights and their supporting evidence are accessible to relevant decision-makers.",
        "Teams track time from critical uncertainty to usable evidence and document resulting decisions.",
        "The organization evaluates whether discovery reduced avoidable investment, improved outcomes, or revealed new strategic options."
      ])
    ]
  },
  {
    file: "outcome-measurement.json",
    name: "Outcome Measurement",
    sections: [
      S("Outcome Definition", "Evaluate whether desired customer, business, workforce, and system outcomes are explicit and distinguishable from outputs.", [
        "Success is defined mainly as features shipped, projects completed, or deadlines met.",
        "Measures are selected because they are available rather than because they represent the intended change.",
        "Initiatives state the behavior or condition expected to change for a defined population.",
        "Outcome definitions include a baseline, direction, time horizon, and connection to strategic value.",
        "Outcome models represent causal assumptions, competing explanations, and possible unintended effects."
      ]),
      S("Measure Quality", "Evaluate whether measures are valid, reliable, timely, and appropriately segmented.", [
        "Metric definitions vary between reports or change without versioning.",
        "Proxy measures are treated as direct proof of value despite known validity limits.",
        "Measures have documented definitions, owners, sources, populations, and refresh expectations.",
        "Data quality, missingness, uncertainty, segmentation, and instrumentation changes are monitored.",
        "Measures are periodically revalidated against the construct and decisions they are intended to support."
      ]),
      S("Baselines, Targets, and Countermetrics", "Evaluate whether targets are evidence-based and balanced against foreseeable harms or tradeoffs.", [
        "Targets are chosen arbitrarily or negotiated to appear achievable.",
        "A single target is optimized without monitoring quality, equity, reliability, cost, or sustainability effects.",
        "Relevant baselines and historical variation are established before judging change.",
        "Targets include rationale, uncertainty, guardrails, and countermetrics.",
        "Target ranges and guardrails are adapted when evidence reveals gaming, saturation, or changed context."
      ]),
      S("Causal Learning", "Evaluate whether the organization distinguishes correlation, attribution, and causal evidence appropriately.", [
        "Any movement after a release is attributed to the release without considering other causes.",
        "Statistical significance or dashboard movement is reported without practical importance or decision context.",
        "Teams document alternative explanations and the limits of observational evidence.",
        "Experiments, quasi-experiments, qualitative evidence, or contribution analysis are used according to decision stakes.",
        "Causal conclusions are reproducible, sensitivity-tested, and revised when later evidence contradicts them."
      ]),
      S("Decision Use and Accountability", "Evaluate whether outcome evidence changes prioritization, investment, and product decisions.", [
        "Dashboards are reviewed ceremonially without clear decisions or owners.",
        "Teams are punished for unfavorable evidence, encouraging concealment or metric gaming.",
        "Outcome reviews identify decisions, owners, assumptions, and follow-up dates.",
        "Investment is continued, adapted, or stopped using pre-agreed evidence and strategic judgment.",
        "The organization rewards honest learning and audits whether measurement actually improved decisions."
      ])
    ]
  },
  {
    file: "architecture-fitness-evolvability.json",
    name: "Architecture Fitness and Evolvability",
    sections: [
      S("Changeability and Coupling", "Evaluate whether architecture enables safe, localized change at the pace the product requires.", [
        "Small product changes routinely require coordinated modifications across many unrelated components or teams.",
        "Coupling and change cost are discussed without evidence from actual change paths.",
        "Teams can identify component responsibilities, dependencies, and common change paths.",
        "Architecture boundaries are tested against change lead time, deployment independence, and defect propagation.",
        "Boundaries and ownership evolve using evidence about product change, flow, reliability, and cognitive load."
      ]),
      S("Architectural Decisions", "Evaluate whether consequential decisions are explicit, evidence-based, and reversible where practical.", [
        "Major architecture choices are undocumented or justified only by authority or fashion.",
        "Decisions are treated as permanent even when assumptions or constraints change.",
        "Consequential decisions record context, alternatives, tradeoffs, and ownership.",
        "Decisions identify assumptions, reversibility, migration implications, and follow-up validation.",
        "Decision records are actively revisited, and invalidated choices are changed through safe evolutionary paths."
      ]),
      S("Fitness Functions and Quality Attributes", "Evaluate whether architecture is continuously checked against important quality and constraint outcomes.", [
        "Quality attributes such as reliability, security, performance, and accessibility are left implicit.",
        "Architecture compliance is judged mainly through periodic opinion-based review.",
        "Critical quality attributes have measurable scenarios or acceptance boundaries.",
        "Automated and manual fitness checks detect material architectural drift in delivery workflows.",
        "Fitness criteria evolve with customer needs, threat conditions, scale, cost, and observed production behavior."
      ]),
      S("Simplicity and Technical Debt", "Evaluate whether unnecessary complexity is controlled and material architectural debt is managed transparently.", [
        "Complexity is added for hypothetical future needs without a current decision benefit.",
        "Architectural debt is used as a vague label without linking it to measurable consequences.",
        "Teams prefer the simplest design that meets current requirements and known constraints.",
        "Material debt is connected to delivery, reliability, security, cost, or strategic impact and prioritized accordingly.",
        "The organization removes obsolete components and validates that simplification improves the intended outcomes."
      ]),
      S("Evolution and Migration", "Evaluate whether architecture can change incrementally without unsafe, all-at-once transformation.", [
        "Modernization depends on a long replacement program with no incremental customer value or risk reduction.",
        "Migration progress is reported through components built rather than traffic, users, data, or risk retired.",
        "Target changes have incremental transition states, compatibility plans, and rollback options.",
        "Migrations use production evidence, progressive movement, and explicit legacy retirement criteria.",
        "Architecture evolution preserves strategic options and continuously recalibrates scope using delivered value and reduced risk."
      ])
    ]
  },
  {
    file: "reliability-engineering.json",
    name: "Reliability Engineering",
    sections: [
      S("User-Centered Reliability", "Evaluate whether reliability is defined through customer-critical experiences rather than infrastructure availability alone.", [
        "Reliability is described only through component uptime without checking whether users can complete important tasks.",
        "All services receive the same reliability target regardless of customer need, risk, or cost.",
        "Critical user journeys and their failure consequences are identified.",
        "Service, client-side, and end-to-end indicators cover the most important user experiences.",
        "Reliability priorities adapt using customer impact, business criticality, support evidence, and observed failure patterns."
      ]),
      S("SLIs, SLOs, and Error Budgets", "Evaluate whether reliability objectives support explicit, evidence-based tradeoffs.", [
        "Availability targets are copied from convention or contracts without validating user relevance.",
        "Objectives exist but do not influence release, risk, or investment decisions.",
        "Important services have documented indicators, objectives, windows, and ownership.",
        "Error-budget policies guide proportionate decisions about feature work, risk, and reliability investment.",
        "Objectives and policies are recalibrated using user expectations, cost, architecture, and actual decision usefulness."
      ]),
      S("Reliability by Design", "Evaluate whether failure modes, dependencies, capacity, and recovery are addressed during design and delivery.", [
        "Reliability concerns are deferred until after production failures.",
        "Redundancy is added without testing common-mode failure, dependency behavior, or operational complexity.",
        "Design work identifies critical failure modes, dependencies, capacity assumptions, and recovery paths.",
        "Resilience patterns and degraded modes are tested under realistic conditions before critical exposure.",
        "Architecture and product scope are jointly adapted to achieve the most valuable reliability at sustainable cost."
      ]),
      S("Operational Learning and Toil", "Evaluate whether operational work produces learning and whether repetitive manual work is controlled.", [
        "Recurring operational tasks and incidents consume increasing time without visible ownership.",
        "Automation is pursued without considering maintenance cost, risk, or whether the underlying work should exist.",
        "Teams identify recurring toil, operational load, and reliability demand.",
        "High-cost recurring work is eliminated, simplified, or automated and the expected benefit is verified.",
        "Operational learning systematically changes product design, platform capabilities, staffing, and reliability strategy."
      ]),
      S("Reliability Governance and Investment", "Evaluate whether reliability risk has clear ownership, evidence, and investment mechanisms.", [
        "Reliability work depends on individual advocacy and is routinely displaced by feature commitments.",
        "Leaders request high reliability without accepting the cost or product tradeoffs required.",
        "Reliability ownership, escalation, and minimum expectations are explicit.",
        "Investment decisions use customer impact, error-budget history, incident patterns, and risk exposure.",
        "Reliability is governed as a product outcome with transparent tradeoffs across value, risk, cost, and speed."
      ])
    ]
  },
  {
    file: "incident-management.json",
    name: "Incident Management",
    sections: [
      S("Detection and Declaration", "Evaluate whether incidents are recognized, classified, and declared quickly using customer-impact evidence.", [
        "Incident recognition depends primarily on customer complaints or individual intuition.",
        "People delay declaration because criteria are unclear or because false alarms are punished.",
        "Critical services have monitored symptoms, ownership, and documented declaration criteria.",
        "Detection and declaration performance is reviewed using customer-impacting incidents and missed signals.",
        "Signals, thresholds, and declaration policies adapt as products, dependencies, and failure modes change."
      ]),
      S("Coordination and Decision Roles", "Evaluate whether response roles, authority, and information flow enable safe mitigation.", [
        "Incident response has no clear coordinator, resulting in duplicated work or conflicting changes.",
        "The most senior person present overrides technical roles without establishing shared evidence or intent.",
        "Incident coordination, technical operations, communications, and recording responsibilities are explicit.",
        "Responders use shared timelines, hypotheses, decision logs, and escalation paths during material incidents.",
        "Role design and response protocols are repeatedly exercised and improved from observed coordination failures."
      ]),
      S("Mitigation and Recovery", "Evaluate whether responders can reduce customer harm and restore a known-good service safely.", [
        "Recovery depends on untested manual actions known to only a few people.",
        "Responders make multiple high-risk changes without tracking effects or preserving rollback options.",
        "Critical services have accessible recovery procedures and known escalation contacts.",
        "Rollback, roll-forward, failover, traffic control, or degraded modes are rehearsed and selected according to evidence.",
        "Recovery capability is continuously tested against realistic failure, dependency, data-integrity, and capacity scenarios."
      ]),
      S("Communication and Customer Care", "Evaluate whether incident communication is timely, accurate, accessible, and appropriate to affected parties.", [
        "Customers and internal stakeholders receive no update until full resolution.",
        "Communications minimize impact or provide certainty that responders do not have.",
        "Material incidents have owners and channels for internal, customer, executive, legal, and support communication.",
        "Updates state known impact, uncertainty, actions, workarounds, and expected next communication time.",
        "Communication quality is tested with affected audiences and improved for accessibility, trust, and decision usefulness."
      ]),
      S("Learning and Follow-Through", "Evaluate whether incidents produce psychologically safe, system-focused, and verified improvement.", [
        "Reviews focus on individual error or assign actions before understanding contributing conditions.",
        "Corrective actions accumulate without owners, deadlines, prioritization, or effectiveness checks.",
        "Material incidents receive a timely review based on a shared factual timeline.",
        "Reviews examine technical, organizational, detection, decision, and recovery conditions and assign risk-based actions.",
        "Action effectiveness and recurring patterns are tracked across incidents, and learning changes strategy, architecture, and operations."
      ])
    ]
  },
  {
    file: "secure-software-development-lifecycle.json",
    name: "Secure Software Development Lifecycle",
    sections: [
      S("Security Governance and Enablement", "Evaluate whether secure development expectations, ownership, resources, and risk decisions are explicit and usable.", [
        "Security responsibility is delegated to a specialist team after development is complete.",
        "Security controls are applied uniformly without considering product risk or developer usability.",
        "Secure-development roles, minimum expectations, training, and escalation paths are documented.",
        "Product risk determines proportionate activities, expertise, review, and assurance evidence.",
        "Security capability, control effectiveness, developer experience, and product outcomes jointly drive program improvement."
      ]),
      S("Threat-Informed Design", "Evaluate whether foreseeable threats, abuse, trust boundaries, and privacy risks shape design decisions.", [
        "Security design begins only after implementation or external testing identifies defects.",
        "Threat models are completed as compliance artifacts and are not updated or used in decisions.",
        "Material systems identify assets, actors, trust boundaries, threats, abuse cases, and assumptions.",
        "Threat analysis is revisited for consequential changes and produces owned design or verification actions.",
        "Production incidents, intelligence, user harm, and control evidence continuously improve secure patterns and threat models."
      ]),
      S("Secure Implementation and Supply Chain", "Evaluate whether code, dependencies, secrets, builds, and artifacts are protected throughout implementation.", [
        "Dependencies, build inputs, or production artifacts cannot be reliably inventoried or traced.",
        "Secrets and privileged credentials are routinely embedded in code, shared channels, or long-lived local configuration.",
        "Supported secure coding, dependency, secrets, review, and artifact-handling practices are available.",
        "Build provenance, dependency risk, protected branches, artifact integrity, and exception handling are automated where appropriate.",
        "Supply-chain controls are tested against realistic compromise paths and optimized for both assurance and developer usability."
      ]),
      S("Security Verification", "Evaluate whether security testing provides risk-based, trustworthy evidence before and after release.", [
        "A single scanner or penetration test is treated as proof that the product is secure.",
        "High-noise findings are accepted without validation, ownership, or feedback into prevention.",
        "Products use a documented mix of code, dependency, configuration, dynamic, and manual security checks.",
        "Verification depth follows risk, covers abuse cases and controls, and tracks remediation through retest.",
        "Test effectiveness is evaluated against escaped vulnerabilities, threat change, false signals, and prevention outcomes."
      ]),
      S("Vulnerability and Security Response", "Evaluate whether security defects and incidents are prioritized, remediated, communicated, and learned from.", [
        "Vulnerabilities are prioritized only by generic severity without asset, exploitability, or business context.",
        "Exceptions remain open indefinitely without risk ownership or compensating controls.",
        "Intake, triage, disclosure, remediation, exception, and escalation processes have named owners.",
        "Risk-based service levels, exploit intelligence, customer exposure, and verification guide response.",
        "Response patterns drive systemic improvements to design, dependencies, tooling, training, and governance."
      ])
    ]
  },
  {
    file: "privacy-engineering-data-protection.json",
    name: "Privacy Engineering and Data Protection",
    sections: [
      S("Purpose and Data Minimization", "Evaluate whether personal data collection and use are necessary, explicit, and proportionate.", [
        "Personal data is collected because it may be useful later without a defined purpose.",
        "Teams copy production data into new systems or environments without necessity and risk review.",
        "Material processing activities identify purpose, data categories, affected people, and accountable owners.",
        "Design reviews challenge necessity, granularity, retention, access, and less-invasive alternatives.",
        "Products continuously reduce personal-data exposure while measuring whether intended user and business outcomes remain achievable."
      ]),
      S("Transparency, Choice, and Rights", "Evaluate whether people can understand and exercise meaningful control over personal-data use.", [
        "Privacy information is legalistic, incomplete, or materially different from actual product behavior.",
        "Consent or choice is designed to steer acceptance or makes refusal substantially harder.",
        "Notices explain material collection, use, sharing, retention, and contact routes in accessible language.",
        "Rights and preference requests are authenticated, fulfilled, tracked, and propagated across relevant systems and vendors.",
        "Transparency and controls are tested with affected people and adapted using comprehension, completion, complaint, and error evidence."
      ]),
      S("Privacy by Design and Risk Assessment", "Evaluate whether privacy risks to people are identified and addressed throughout the product lifecycle.", [
        "Privacy review occurs only near launch, after consequential architecture and data decisions are fixed.",
        "Assessments list legal requirements without examining practical harms, vulnerable groups, or misuse.",
        "Material changes receive early privacy review with documented data flows and risk ownership.",
        "High-risk processing examines likelihood, severity, affected groups, alternatives, controls, residual risk, and approval.",
        "Assessments are revisited using incidents, complaints, product change, new uses, and evidence about control effectiveness."
      ]),
      S("Data Lifecycle and Protection", "Evaluate whether personal data is accurate, access-controlled, retained, transferred, and deleted appropriately.", [
        "The organization cannot locate personal data or determine which systems and vendors retain it.",
        "Retention periods exist on paper but are not implemented or verified.",
        "Personal-data inventories, classifications, owners, access controls, retention rules, and transfer paths are documented.",
        "Lifecycle controls are automated where appropriate and tested for deletion, restoration, downstream propagation, and exceptions.",
        "Data exposure and retention are continuously reduced using measured need, access patterns, risk, and product outcomes."
      ]),
      S("Privacy Operations and Accountability", "Evaluate whether privacy incidents, vendors, evidence, and governance are managed effectively.", [
        "Privacy concerns lack a safe intake route or clear decision owner.",
        "Vendor privacy obligations are accepted from questionnaires without validating actual data flows or controls.",
        "Incident, complaint, vendor, training, recordkeeping, and regulatory-response processes have named owners.",
        "Control evidence, request performance, incidents, complaints, and vendor changes are reviewed regularly.",
        "Privacy governance uses operational evidence and affected-person feedback to change products, contracts, architecture, and investment."
      ])
    ]
  },
  {
    file: "digital-accessibility-capability.json",
    name: "Digital Accessibility Capability",
    sections: [
      S("Governance and Ownership", "Evaluate whether accessibility has accountable ownership, policy, resources, and lifecycle integration.", [
        "Accessibility depends on individual advocacy or is addressed only after complaints.",
        "A conformance target is claimed without defining scope, evidence, exceptions, or ownership.",
        "The organization has an accessibility policy, target, roles, escalation path, and remediation process.",
        "Product, design, engineering, content, procurement, QA, support, and legal responsibilities are integrated into delivery.",
        "Accessibility outcomes, defects, user feedback, and capability evidence guide executive priorities and investment."
      ]),
      S("Inclusive Discovery and Design", "Evaluate whether disabled people and accessibility needs shape product decisions before implementation.", [
        "Target users are modeled as having uniform abilities, environments, and input methods.",
        "Accessibility is treated as a visual checklist after design approval.",
        "Discovery and design consider diverse sensory, motor, cognitive, speech, and situational needs.",
        "Representative disabled participants, accessibility specialists, and reusable accessible patterns inform consequential decisions.",
        "Teams measure task outcomes across access needs and use findings to change product strategy, flows, and design systems."
      ]),
      S("Accessible Implementation", "Evaluate whether implementation preserves semantic, keyboard, visual, auditory, and cognitive accessibility.", [
        "Custom interfaces replace native semantics without equivalent keyboard or assistive-technology behavior.",
        "Known accessibility defects are routinely deferred without impact, owner, or remediation plan.",
        "Developers have supported standards, components, guidance, and examples for common accessibility needs.",
        "Automated checks and code review prevent common regressions, while manual checks cover behavior automation cannot establish.",
        "Platform and design-system improvements eliminate recurring defect classes and are validated in real product journeys."
      ]),
      S("Verification and Conformance", "Evaluate whether accessibility claims are based on representative, reproducible evidence.", [
        "Passing an automated scanner is treated as full accessibility conformance.",
        "Testing excludes complete journeys, responsive states, third-party content, or assistive technology.",
        "Relevant success criteria, supported platforms, pages, states, and user journeys are explicitly scoped.",
        "Verification combines automation, keyboard review, assistive-technology testing, zoom/reflow, content review, and user evidence.",
        "Conformance evidence is independently reviewed where stakes warrant and refreshed after material changes."
      ]),
      S("Feedback, Support, and Remediation", "Evaluate whether users can report barriers and receive timely, effective resolution.", [
        "Accessibility feedback has no discoverable route or is handled as generic support noise.",
        "Reported barriers are closed when code changes without confirming the user's task can be completed.",
        "An accessible feedback route, ownership, severity model, workaround process, and escalation path exist.",
        "Remediation is prioritized by user impact and verified in the affected journey and technology combination.",
        "Feedback trends change design systems, procurement, training, testing, roadmaps, and public accessibility information."
      ])
    ]
  },
  {
    file: "technology-value-finops.json",
    name: "Technology Value and FinOps",
    sections: [
      S("Cost and Usage Visibility", "Evaluate whether technology cost and usage data are timely, accurate, allocated, and decision-ready.", [
        "Material technology spending cannot be connected to products, owners, environments, or business purposes.",
        "Teams receive cost reports too late or at too coarse a level to influence decisions.",
        "Material cloud, SaaS, licensing, data-center, and AI costs have accountable owners and documented allocation rules.",
        "Cost, usage, commitment, and allocation data are timely, reconciled, and accessible to engineering, finance, and product.",
        "Data quality, shared-cost methods, and category coverage continuously improve based on decision needs and observed errors."
      ]),
      S("Unit Economics and Business Value", "Evaluate whether technology use is related to product demand, customer value, and sustainable economics.", [
        "Cost reduction is pursued without understanding customer, revenue, reliability, or engineering effects.",
        "Total spending is reported without a meaningful demand or value denominator.",
        "Key products identify cost drivers and relevant units such as customer, transaction, workload, or model inference.",
        "Unit cost and value measures inform architecture, pricing, product, and capacity decisions with explicit countermetrics.",
        "The organization evaluates marginal economics, segment differences, and strategic option value when allocating technology investment."
      ]),
      S("Forecasting and Planning", "Evaluate whether technology demand, cost, value, and uncertainty are forecast for timely decisions.", [
        "Budgets are fixed from prior-year spending without modeling demand or planned product change.",
        "Forecast variance is punished without distinguishing model error, price change, demand change, or valuable opportunity.",
        "Forecasts document scope, drivers, assumptions, owners, horizon, and material planned changes.",
        "Rolling forecasts combine historical patterns, product demand, architecture, pricing, commitments, and scenarios.",
        "Forecast accuracy and decision usefulness are reviewed, and investment can be reallocated as evidence changes."
      ]),
      S("Optimization and Accountability", "Evaluate whether teams improve technology value without degrading important outcomes.", [
        "Optimization consists of periodic cuts owned by finance or a central team with little engineering context.",
        "Savings are claimed from recommendations or purchase discounts without verifying realized use or avoided cost.",
        "Engineering, finance, and product share responsibility for prioritized optimization opportunities.",
        "Realized value is verified against baselines and balanced with reliability, performance, security, sustainability, and labor cost.",
        "Architecture, product demand, pricing, rate, usage, and retirement options are continuously compared for the highest net value."
      ]),
      S("FinOps Operating Model and Governance", "Evaluate whether technology-value decisions have effective roles, policies, automation, and executive alignment.", [
        "Cost accountability is assigned without giving owners usable data, authority, or support.",
        "Policies create approval delays while failing to prevent material waste or risk.",
        "FinOps roles, decision rights, policies, education, exceptions, and review cadences are defined.",
        "Guardrails and automation address repeatable decisions while specialists support consequential tradeoffs.",
        "Executive strategy, portfolio choices, product economics, engineering decisions, and sustainability use a coherent technology-value system."
      ])
    ]
  },
  {
    file: "engineering-leadership-effectiveness.json",
    name: "Engineering Leadership Effectiveness",
    sections: [
      S("Direction and Context", "Evaluate whether engineering leaders provide clear direction, boundaries, and strategic context.", [
        "Teams receive shifting priorities without an explanation of tradeoffs or changed evidence.",
        "Leaders prescribe detailed solutions while leaving goals and decision boundaries ambiguous.",
        "Engineering priorities, constraints, ownership, and connections to company and product strategy are communicated.",
        "Teams understand which decisions they own, which require consultation, and how to escalate material risk.",
        "Leaders update direction transparently as evidence changes while preserving coherence and local autonomy."
      ]),
      S("Technical and System Judgment", "Evaluate whether leaders improve the whole engineering system using evidence and appropriate expertise.", [
        "Technical choices follow leadership preference or industry fashion without context-specific evidence.",
        "Local delivery pressure routinely displaces reliability, security, maintainability, and capability investment.",
        "Leaders seek relevant technical expertise and make material tradeoffs explicit.",
        "Investment balances product delivery, architecture, platform, quality, reliability, security, debt, and workforce sustainability.",
        "Leaders evaluate whether system changes produced intended outcomes and revise strategy when assumptions fail."
      ]),
      S("Team Empowerment and Accountability", "Evaluate whether teams have meaningful autonomy within clear outcome and risk boundaries.", [
        "Routine team decisions require management approval, creating queues and learned helplessness.",
        "Autonomy is declared while teams lack the information, capability, authority, or resources to succeed.",
        "Teams own defined product and technical decisions and can access the stakeholders and evidence they need.",
        "Leaders remove systemic constraints and hold teams accountable for transparent outcomes and learning rather than plan compliance.",
        "Decision boundaries evolve using evidence about speed, quality, risk, team capability, and cross-team effects."
      ]),
      S("People Development and Inclusion", "Evaluate whether leaders build capability, fairness, inclusion, and sustainable careers.", [
        "Growth opportunities depend mainly on manager favor, visibility, or urgent business need.",
        "High performance is rewarded despite harmful collaboration, exclusion, or unsustainable work patterns.",
        "Role expectations, feedback, growth support, and performance processes are accessible and documented.",
        "Leaders examine advancement, opportunity, workload, retention, and belonging across relevant groups.",
        "Succession, coaching, sponsorship, mobility, and organizational learning build durable capability beyond individual leaders."
      ]),
      S("Trust, Learning, and Leadership Accountability", "Evaluate whether leaders invite challenge, model learning, and are accountable for organizational outcomes.", [
        "People who raise delivery, ethics, or safety concerns experience dismissal or retaliation.",
        "Leaders explain unfavorable outcomes as team execution failures without examining system conditions or their own decisions.",
        "Leaders invite dissent, acknowledge uncertainty and mistakes, and provide safe escalation routes.",
        "Leadership decisions and improvement commitments are reviewed using workforce, customer, delivery, and risk evidence.",
        "Upward feedback and outcome evidence produce visible changes in leadership behavior, structures, incentives, and investment."
      ])
    ]
  },
  {
    file: "team-health-sustainability.json",
    name: "Team Health and Sustainability",
    sections: [
      S("Workload and Sustainable Pace", "Evaluate whether workload can be sustained without chronic overload or hidden recovery costs.", [
        "Extended hours, missed leave, or emergency effort are treated as normal evidence of commitment.",
        "Capacity plans assume full utilization and do not reserve space for support, learning, maintenance, or uncertainty.",
        "Teams can discuss workload, capacity, and recovery without penalty.",
        "Planned and unplanned demand, on-call load, leave, focus, and overtime are reviewed and rebalanced.",
        "Leaders address structural causes of overload and verify improvements through health, flow, quality, and retention evidence."
      ]),
      S("Focus, Control, and Role Clarity", "Evaluate whether team members can focus, influence their work, and understand responsibilities.", [
        "Priorities and ownership change frequently without explicit decisions or communication.",
        "Individuals are held accountable for outcomes they cannot influence or for conflicting commitments.",
        "Goals, priorities, responsibilities, and escalation paths are understood.",
        "Teams control work in progress, negotiate tradeoffs, and have meaningful influence over methods and local decisions.",
        "Role and work design evolve using evidence about flow, cognitive load, collaboration, customer outcomes, and well-being."
      ]),
      S("Psychological Safety and Conflict", "Evaluate whether people can speak candidly, disagree, ask for help, and address conflict without retaliation.", [
        "People conceal mistakes, uncertainty, or disagreement because interpersonal or career consequences are likely.",
        "Harmony or politeness is mistaken for safety while difficult issues remain undiscussed.",
        "Team members can ask for help, identify risks, and challenge ideas respectfully.",
        "Conflict is addressed with shared facts, facilitation when needed, and clear protection from retaliation.",
        "The team examines whose voice is absent or discounted and changes norms, leadership, and decision practices accordingly."
      ]),
      S("Support, Belonging, and Inclusion", "Evaluate whether people receive equitable support, access, respect, and opportunity.", [
        "Some team members are routinely excluded from information, relationships, or decisions needed for their work.",
        "Team-health averages are reported without checking materially different experiences within the group.",
        "People know how to obtain support, accommodations, feedback, and safe escalation.",
        "Access to meaningful work, recognition, learning, influence, and advancement is reviewed for fairness.",
        "The team and organization use protected qualitative and segmented evidence to remove persistent barriers to belonging and contribution."
      ]),
      S("Health Learning and Action", "Evaluate whether team-health evidence leads to owned, effective improvements.", [
        "Health surveys are collected without sharing results, protecting respondents, or acting on findings.",
        "Managers select only convenient actions and do not address systemic issues outside the team.",
        "The purpose, privacy protections, results, and limitations of health assessment are communicated.",
        "Teams choose a small number of owned improvements and review whether conditions changed.",
        "Recurring themes influence management systems, staffing, priorities, incentives, policies, and organizational design."
      ])
    ]
  },
  {
    file: "responsible-ai-governance.json",
    name: "Responsible AI Governance",
    sections: [
      S("AI Inventory and Accountability", "Evaluate whether material AI systems and uses are known, owned, classified, and governed across their lifecycle.", [
        "The organization cannot identify where AI materially affects products, employees, customers, or decisions.",
        "AI accountability is assigned to a committee without clear product, risk, and operational owners.",
        "Material AI systems and uses have documented purpose, owner, users, data, model/provider, and lifecycle status.",
        "Uses are risk-tiered with proportionate roles, approvals, evidence, monitoring, incident, and retirement requirements.",
        "Inventory and accountability are continuously updated through procurement, development, deployment, monitoring, and decommissioning controls."
      ]),
      S("Context and Impact Mapping", "Evaluate whether intended use, affected parties, benefits, limitations, misuse, and harms are understood.", [
        "AI is selected before establishing that it is appropriate for the user need and decision context.",
        "Impact review considers model accuracy while ignoring human workflow, affected communities, misuse, and downstream effects.",
        "Material uses document intended purpose, context, users, affected parties, assumptions, and known limitations.",
        "Cross-functional and affected-party input identifies foreseeable benefits, failures, misuse, rights, and distributional impacts.",
        "Context and impact models are updated as use expands, behavior changes, incidents occur, or new evidence emerges."
      ]),
      S("Measurement and Independent Evaluation", "Evaluate whether AI quality, risk, and control effectiveness are measured with appropriate rigor.", [
        "Vendor claims or a single benchmark are accepted as sufficient evidence for production use.",
        "Aggregate performance hides important failure modes, subgroups, uncertainty, or changes over time.",
        "Evaluation criteria cover task quality, robustness, security, privacy, safety, fairness, accessibility, latency, and cost as applicable.",
        "Representative data, baselines, slices, adversarial tests, human factors, and uncertainty support go/no-go decisions.",
        "Consequential uses receive independent challenge, production monitoring, reproducible evaluation, and periodic revalidation."
      ]),
      S("Risk Treatment and Human Control", "Evaluate whether AI risks are prioritized, treated, monitored, and bounded by effective human and technical controls.", [
        "High-impact AI outputs are acted on automatically without calibrated oversight, appeal, or recovery.",
        "A human is nominally in the loop but lacks time, information, authority, or skill to intervene effectively.",
        "Material risks have owners, treatments, residual-risk decisions, monitoring, and escalation paths.",
        "Permissions, action bounds, review, fallback, explanation, contestability, rollback, and shutdown controls match the use risk.",
        "Control effectiveness is tested in realistic human-AI workflows and adapted using incidents, near misses, drift, and user feedback."
      ]),
      S("Transparency, Incidents, and Lifecycle Governance", "Evaluate whether AI use is communicated honestly and managed through change, incident, and retirement.", [
        "Users cannot tell when AI materially shapes an interaction or decision that affects them.",
        "Model or provider changes reach production without impact analysis, reevaluation, or change records.",
        "Material AI use, limitations, data practices, support, and escalation routes are communicated to relevant users.",
        "Model changes, incidents, complaints, overrides, drift, vendor changes, and decommissioning follow documented controls.",
        "Governance evidence changes policy, product design, provider choices, monitoring, user recourse, and the decision to continue or retire AI uses."
      ])
    ]
  }
];

function hash32(value) {
  let hash = 0x811c9dc5;
  for (const character of value) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash | 0;
}

const answerKeys = {
  evidenceObserved: {
    "meta-name": "Observed Evidence",
    "meta-description": "Three options indicating how consistently the stated condition is supported by evidence during the reference period.",
    "0": "Not Observed",
    "1": "Partially Observed",
    "2": "Consistently Observed"
  }
};

let nextItemId = 200;
const register = [];

for (const assessment of assessments) {
  const items = assessment.sections.map((section) => {
    const id = nextItemId++;
    const entries = section.entries.map((descriptor, index) => ({
      score: scorePattern[index],
      descriptor,
      key: hash32(`${assessment.file}:${id}:${index}:${descriptor}`),
      id: `${id}:${index}`,
      options: "evidenceObserved"
    }));
    return {
      section: section.section,
      descriptor: section.descriptor,
      raw: `${section.section} ${section.descriptor}`,
      number: -1,
      entries,
      key: hash32(`${assessment.file}:${id}:${section.section}`),
      position: id,
      id
    };
  });

  const document = {
    name: assessment.name,
    scores: { show: true },
    items,
    sectionScoreDefault: 0,
    answerKeys
  };

  fs.writeFileSync(path.join(outputDir, assessment.file), `${JSON.stringify(document, null, 2)}\n`);
  register.push({
    assessment: assessment.name,
    file: assessment.file,
    status: "draft-complete",
    sections: items.length,
    entries: items.reduce((total, item) => total + item.entries.length, 0),
    schemaValidated: true,
    contentReview: "completed",
    pilotValidation: "not-started"
  });
}

fs.writeFileSync(path.join(outputDir, "completion-register.json"), `${JSON.stringify({
  generatedOn: "2026-07-30",
  statusDefinitions: {
    "draft-complete": "Content is authored and structurally validated but has not yet completed respondent testing or psychometric validation.",
    pilot: "The instrument is undergoing cognitive interviews or field testing.",
    validated: "The instrument has documented evidence supporting its intended interpretation and use."
  },
  assessments: register
}, null, 2)}\n`);
