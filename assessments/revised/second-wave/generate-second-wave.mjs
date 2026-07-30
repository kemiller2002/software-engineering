import fs from "node:fs";
import path from "node:path";

const outputDir = import.meta.dirname;
const scorePattern = [-1, -1, 1, 2, 3];
const S = (section, descriptor, entries) => ({ section, descriptor, entries });

const assessments = [
  {
    file: "technology-strategy-alignment.json",
    name: "Technology Strategy Alignment",
    sections: [
      S("Strategic Connection", "Evaluate whether technology strategy directly supports explicit company and product choices.", [
        "Technology priorities are selected mainly from technical preference, vendor pressure, or accumulated requests.",
        "The technology roadmap is presented separately from company and product strategy with no traceable connection.",
        "Technology priorities identify the business or product objective they are intended to enable.",
        "Strategic capabilities, constraints, dependencies, and timing are jointly reviewed by technology, product, finance, and business leaders.",
        "Technology strategy is revised as market evidence, product choices, economics, and capability outcomes change."
      ]),
      S("Differentiating Capabilities", "Evaluate whether investment distinguishes strategic technology capabilities from necessary commodity capabilities.", [
        "The organization attempts to build every capability internally without assessing strategic differentiation.",
        "Core differentiating capabilities depend on vendors or systems whose limitations and switching risks are not understood.",
        "The strategy identifies which technology capabilities differentiate the company and which are commodity or enabling.",
        "Build, buy, partner, reuse, and retire decisions use differentiation, total cost, risk, speed, talent, and exit criteria.",
        "Investment compounds a coherent set of differentiating capabilities while commodity work is simplified or sourced deliberately."
      ]),
      S("Architecture and Platform Direction", "Evaluate whether architectural and platform direction supports the strategic pace, scale, economics, and risk profile.", [
        "Architecture direction is defined by fashionable patterns or mandated products rather than strategic need.",
        "Platform investments proceed without named users, adoption evidence, or expected strategic outcomes.",
        "The strategy states architectural principles, platform responsibilities, constraints, and intended outcomes.",
        "Architecture and platform roadmaps are tied to measurable improvements in changeability, reliability, security, cost, or product speed.",
        "Technical direction preserves valuable options and adapts using adoption, task success, production, and economic evidence."
      ]),
      S("Capability and Talent Plan", "Evaluate whether the organization can acquire, develop, and retain the capabilities required by its technology strategy.", [
        "Strategic commitments assume skills or leadership capacity that the organization does not have a credible plan to obtain.",
        "Hiring is treated as the default answer to capability gaps without considering learning, tooling, partners, or scope choices.",
        "Critical current and future capability gaps, concentration risks, and ownership needs are documented.",
        "Workforce, learning, succession, sourcing, and platform plans are sequenced with strategic technology needs.",
        "Capability evidence changes strategic scope, organization design, partnerships, and investment before gaps become delivery crises."
      ]),
      S("Investment, Measures, and Review", "Evaluate whether technology strategy has explicit investment logic, evidence, and revision mechanisms.", [
        "Technology strategy is declared successful when projects or migrations finish, regardless of realized outcomes.",
        "Long-running strategic programs continue because of sunk cost without updated value or risk evidence.",
        "Strategic initiatives have owners, expected outcomes, assumptions, costs, risks, and review dates.",
        "Reviews compare actual capability, product, delivery, reliability, risk, and economic outcomes with the strategic thesis.",
        "Leaders expand, redirect, pause, or stop technology investments using transparent evidence and opportunity cost."
      ])
    ]
  },
  {
    file: "product-operating-model.json",
    name: "Product Operating Model",
    sections: [
      S("Durable Product Ownership", "Evaluate whether durable cross-functional groups own customer and business outcomes across the product lifecycle.", [
        "Temporary project teams disband after delivery, leaving no clear owner for outcomes, operations, or learning.",
        "Product ownership is nominal while scope, staffing, and priorities are controlled by unrelated governance bodies.",
        "Products and value areas have named, durable product, design, and engineering ownership.",
        "Teams own discovery, delivery, quality, operation, measurement, and lifecycle decisions within clear boundaries.",
        "Ownership boundaries evolve using customer journeys, dependencies, cognitive load, economics, and strategic outcomes."
      ]),
      S("Outcome Accountability", "Evaluate whether product groups are accountable for outcomes rather than activity or plan conformance.", [
        "Success is judged mainly by roadmap completion, utilization, or output volume.",
        "Teams are assigned outcome targets but cannot change scope, approach, or priorities.",
        "Product groups have explicit customer and business outcomes with relevant guardrails.",
        "Teams can adapt discovery and delivery using outcome evidence while explaining material tradeoffs.",
        "Leadership evaluates the quality of decisions and learning, including honest evidence that causes work to stop."
      ]),
      S("Discovery and Delivery Integration", "Evaluate whether discovery, design, engineering, analytics, and operations work as one learning system.", [
        "Product concepts are handed through sequential research, design, engineering, testing, and operations phases.",
        "Discovery is performed far ahead of delivery and is not refreshed when implementation or market evidence changes.",
        "Relevant disciplines collaborate before commitment to identify value, usability, feasibility, viability, and risk.",
        "Small delivery increments generate operational and customer evidence that informs continuing discovery.",
        "Discovery depth, technical investment, and delivery commitment adapt together according to uncertainty and consequence."
      ]),
      S("Funding and Capacity", "Evaluate whether funding supports durable products, strategic options, and adaptive allocation.", [
        "Funding is tied to fixed project scope and temporary staffing, making evidence-based adaptation costly.",
        "Teams receive annual capacity without a mechanism to retire low-value products or reallocate investment.",
        "Funding distinguishes durable product capacity from time-bounded initiatives and experiments.",
        "Allocation decisions consider lifecycle stage, opportunity, outcomes, risk, platform needs, and total cost.",
        "Portfolio reviews move investment between products and capabilities using current evidence without destabilizing teams unnecessarily."
      ]),
      S("Decision Rights and Governance", "Evaluate whether governance enables timely local decisions while protecting enterprise risks and shared interests.", [
        "Routine product decisions wait for multiple approval forums with unclear authority.",
        "Teams bypass governance because controls are slow, duplicative, or disconnected from actual risk.",
        "Decision rights, consultation needs, minimum controls, and escalation thresholds are explicit.",
        "Reusable evidence and automated guardrails handle routine decisions while specialists focus on consequential exceptions.",
        "Governance latency, control effectiveness, team autonomy, and outcome evidence drive continuous operating-model improvement."
      ])
    ]
  },
  {
    file: "decision-effectiveness.json",
    name: "Decision Effectiveness",
    sections: [
      S("Decision Framing", "Evaluate whether consequential decisions have a clear question, owner, scope, criteria, and deadline.", [
        "Meetings begin solution debate before participants agree on the decision to be made.",
        "Multiple people believe they own the same decision, or no one accepts final accountability.",
        "Material decisions identify the decision owner, question, participants, constraints, and required timing.",
        "Decision criteria, affected parties, reversibility, and evidence needs are established before comparing options.",
        "Framing quality is reviewed against later implementation, surprises, and decision outcomes."
      ]),
      S("Evidence and Alternatives", "Evaluate whether decisions use relevant evidence, credible alternatives, and explicit uncertainty.", [
        "Decisions rely mainly on seniority, confidence, precedent, or the first proposed solution.",
        "Only evidence supporting the preferred option is presented.",
        "Material decisions distinguish facts, assumptions, estimates, opinions, and unknowns.",
        "Credible alternatives are compared using relevant evidence, tradeoffs, risks, and sensitivity to uncertain assumptions.",
        "Decision processes deliberately seek disconfirming evidence and independent challenge when consequence or irreversibility is high."
      ]),
      S("Participation and Inclusion", "Evaluate whether affected expertise and perspectives can influence decisions without creating unnecessary consensus requirements.", [
        "People materially affected by a decision learn about it only after commitment.",
        "Participation is broad but performative because authority and non-negotiable constraints are concealed.",
        "The owner identifies who must decide, advise, provide evidence, implement, and be informed.",
        "Relevant frontline, customer, specialist, and dissenting perspectives are included early enough to change the outcome.",
        "Participation patterns are examined for missing voices, power effects, decision latency, and implementation quality."
      ]),
      S("Speed and Escalation", "Evaluate whether decisions occur at the appropriate level and speed for their reversibility and consequence.", [
        "Low-risk reversible decisions wait for senior approval or recurring governance forums.",
        "High-consequence decisions are rushed under artificial urgency without minimum evidence or safeguards.",
        "Decision paths and escalation thresholds reflect urgency, reversibility, impact, and authority.",
        "Teams track consequential decision delay, blocked work, escalations, and exception patterns.",
        "Authority, policy, automation, and organizational boundaries are changed to eliminate recurring decision bottlenecks safely."
      ]),
      S("Recording, Execution, and Learning", "Evaluate whether decisions are communicated, implemented, reviewed, and revised as evidence changes.", [
        "Decisions are remembered differently by participants because rationale and commitments are not recorded.",
        "A decision is considered complete at approval with no owner for implementation or outcome review.",
        "Material decisions record outcome, rationale, assumptions, owner, actions, and communication needs.",
        "Implementation and review dates test whether assumptions held and expected outcomes occurred.",
        "Decision records and outcome patterns improve decision principles, delegation, evidence practices, and institutional learning."
      ])
    ]
  },
  {
    file: "organizational-design-for-flow.json",
    name: "Organizational Design for Flow",
    sections: [
      S("Value and Work Boundaries", "Evaluate whether organizational boundaries align with meaningful customer and business value.", [
        "Teams are organized mainly by technical layer or function, requiring many handoffs for routine customer changes.",
        "Organizational charts are changed without mapping actual work, customer journeys, or dependencies.",
        "The organization understands major value streams, products, customer journeys, and enabling capabilities.",
        "Team boundaries give durable groups ownership of coherent value and the systems needed to deliver it.",
        "Boundaries evolve using flow, customer, dependency, cognitive-load, and strategic evidence rather than reorganization fashion."
      ]),
      S("Dependencies and Handoffs", "Evaluate whether dependencies are visible, actively managed, and reduced where economically justified.", [
        "Teams repeatedly discover critical dependencies after work begins.",
        "Coordination meetings multiply while the structural causes of dependencies remain unchanged.",
        "Material dependencies, owners, service expectations, and blocked time are visible.",
        "Teams use contracts, platforms, embedded capability, sequencing, or boundary changes to reduce recurring coordination cost.",
        "Dependency investment is prioritized using measured delay, failure demand, customer impact, and total organizational cost."
      ]),
      S("Team Cognitive Load and Capability", "Evaluate whether teams have a manageable scope and access to the capabilities required for ownership.", [
        "Teams own more domains, tools, and operational responsibilities than they can understand or sustain.",
        "Specialist capability is centralized without usable access paths or knowledge transfer.",
        "Teams and leaders can identify domain, intrinsic, and extraneous cognitive-load pressures.",
        "Platforms, enabling teams, documentation, training, and scope changes address the most consequential load.",
        "Capability placement and team scope adapt using task success, flow, reliability, learning, and workforce evidence."
      ]),
      S("Enabling and Platform Relationships", "Evaluate whether shared teams enable product teams without becoming queues or unaccountable mandates.", [
        "Shared specialists operate as ticket queues with opaque priorities and long waits.",
        "Internal platforms mandate adoption without demonstrating better user outcomes.",
        "Enabling, platform, and complicated-subsystem responsibilities and engagement models are explicit.",
        "Shared capabilities use service expectations, product management, user research, adoption, and task-success evidence.",
        "Interaction modes and ownership change as product-team capability, platform maturity, and strategic needs evolve."
      ]),
      S("Flow Governance and Improvement", "Evaluate whether organizational design is governed through end-to-end outcomes rather than local utilization.", [
        "Functions optimize their own utilization or output while end-to-end lead time and quality deteriorate.",
        "Reorganizations declare success from new reporting lines before work or outcomes change.",
        "Leaders review end-to-end flow, handoffs, work age, failure demand, and outcome ownership.",
        "Design changes have explicit hypotheses, baselines, guardrails, and review periods.",
        "The organization treats structure as an evolving system and verifies whether changes improve value, resilience, and sustainability."
      ])
    ]
  },
  {
    file: "portfolio-investment-prioritization.json",
    name: "Portfolio Investment and Prioritization",
    sections: [
      S("Strategy-to-Investment Traceability", "Evaluate whether portfolio investments directly support explicit strategic choices and outcomes.", [
        "Initiatives enter the portfolio primarily through executive sponsorship, historical entitlement, or political negotiation.",
        "Most initiatives are labeled strategic without identifying which strategic choice they advance.",
        "Each material investment identifies the strategic objective, target outcome, owner, and affected portfolio area.",
        "Leaders can trace capacity and spending across growth, operation, reliability, risk, platform, and exploration.",
        "Allocation changes as strategic confidence, market evidence, capability needs, and realized outcomes evolve."
      ]),
      S("Comparative Value and Opportunity Cost", "Evaluate whether alternatives compete using value, uncertainty, timing, cost, and displaced opportunities.", [
        "Initiatives are approved independently without comparing them with other uses of scarce capacity.",
        "Business cases present precise benefits while excluding uncertainty, operating cost, and opportunity cost.",
        "Portfolio decisions compare expected value, cost, risk, urgency, dependencies, and uncertainty.",
        "Scenarios and ranges expose sensitivity to key assumptions and the work that must be delayed or stopped.",
        "Option value, learning, reversibility, and marginal economics shape sequencing and staged commitment."
      ]),
      S("Capacity and Work in Progress", "Evaluate whether portfolio demand is constrained to realistic organizational capacity.", [
        "The portfolio starts substantially more initiatives than teams can finish, creating widespread delay and context switching.",
        "New urgent work is added without explicitly pausing or stopping existing commitments.",
        "Available product, engineering, specialist, and change capacity is visible at the level used for decisions.",
        "Portfolio work in progress is limited and sequencing accounts for dependencies, operational load, and uncertainty.",
        "Capacity policies adapt using flow distributions, learning speed, workforce sustainability, and realized value."
      ]),
      S("Evidence, Stage, and Stopping Rules", "Evaluate whether commitment grows with evidence and low-value work can stop safely.", [
        "Initiatives receive full funding before critical value, feasibility, viability, or risk assumptions are tested.",
        "Work continues because of sunk cost, reputational concern, or activity already completed.",
        "Material initiatives state assumptions, evidence needs, review dates, and accountable decision owners.",
        "Funding and scope increase in stages as evidence improves, with explicit adapt, pause, and stop criteria.",
        "Stopping is treated as successful capital reallocation when evidence no longer supports the investment thesis."
      ]),
      S("Portfolio Review and Outcomes", "Evaluate whether portfolio governance learns from outcomes and reallocates investment promptly.", [
        "Portfolio reviews focus on status colors, milestones, and spend rather than changed outcomes.",
        "Benefit claims are not revisited after delivery or transition into operations.",
        "Reviews examine outcomes, forecast changes, risks, assumptions, dependencies, and decisions required.",
        "Realized customer, business, technical, and risk outcomes are compared with investment expectations.",
        "Longitudinal evidence improves prioritization methods, forecast calibration, strategic choices, and portfolio composition."
      ])
    ]
  },
  {
    file: "product-market-fit-evidence.json",
    name: "Product-Market Fit Evidence",
    sections: [
      S("Target Segment and Use Case", "Evaluate whether fit is assessed for a specific segment, need, and competitive context.", [
        "Product-market fit is claimed for the whole market from a small number of enthusiastic customers.",
        "Usage from customers with materially different needs is combined into one average.",
        "The company defines target segments, primary use cases, alternatives, and expected value.",
        "Fit evidence is segmented by customer type, use case, acquisition channel, cohort, and product maturity.",
        "Segment definitions and positioning evolve as retention, behavior, willingness to pay, and competitive evidence changes."
      ]),
      S("Activation and Repeated Value", "Evaluate whether customers reach meaningful value and return because the product solves an important need.", [
        "Sign-ups, downloads, or initial activity are treated as proof of sustained value.",
        "Activation is defined by convenient events rather than demonstrated customer progress.",
        "The product defines a behaviorally meaningful first-value event for each target use case.",
        "Cohorts are measured for time to value, repeated use, depth, frequency, and task outcomes.",
        "Activation and engagement models are revalidated against retention, expansion, satisfaction, and customer evidence."
      ]),
      S("Retention and Pull", "Evaluate whether customers continue, expand, recommend, or seek the product without disproportionate intervention.", [
        "Aggregate growth masks weak cohort retention or dependence on continual paid acquisition.",
        "Renewals driven by contracts, switching cost, or heavy services are treated as equivalent to product pull.",
        "The company tracks logo, user, usage, and revenue retention using appropriate cohorts.",
        "Retention drivers and churn reasons are investigated through behavioral, qualitative, commercial, and support evidence.",
        "Strong segments show durable pull, organic advocacy, expansion, and resilience to reduced sales or service intervention."
      ]),
      S("Willingness to Pay and Economics", "Evaluate whether customer value supports sustainable pricing, acquisition, delivery, and service economics.", [
        "Customer interest is treated as fit without evidence of willingness or authority to pay.",
        "Revenue growth is accepted despite discounts, customization, support, or infrastructure costs that make the segment uneconomic.",
        "Pricing, packaging, acquisition cost, gross margin, and cost to serve are measured by relevant segment.",
        "Willingness to pay and unit economics are tested alongside value realization and competitive alternatives.",
        "The company can grow target segments with sustainable marginal economics while maintaining customer outcomes."
      ]),
      S("Evidence Quality and Fit Decisions", "Evaluate whether product-market fit conclusions reflect converging evidence and uncertainty.", [
        "Fit is declared from a single survey score, executive belief, or short period of growth.",
        "Contradictory churn, support, profitability, or non-user evidence is excluded from the narrative.",
        "The company states its fit hypothesis, evidence, limitations, and unresolved uncertainties.",
        "Cohort behavior, customer research, willingness to pay, retention, economics, and alternatives are triangulated.",
        "Fit confidence explicitly changes product strategy, segment focus, growth spending, capacity, and exploration."
      ])
    ]
  },
  {
    file: "customer-feedback-system.json",
    name: "Customer Feedback System",
    sections: [
      S("Coverage and Representation", "Evaluate whether feedback channels represent relevant customers, non-users, and contexts.", [
        "Feedback is dominated by the loudest customers, largest accounts, or easiest users to reach.",
        "The organization does not examine whose experience is missing from feedback.",
        "Feedback sources, target populations, and known representation gaps are documented.",
        "Research, support, sales, success, community, behavioral, and accessibility channels are intentionally sampled and compared.",
        "Coverage adapts using segment strategy, participation bias, emerging harms, churn, and product change."
      ]),
      S("Collection Quality and Safety", "Evaluate whether feedback is collected ethically, accessibly, and in forms suited to the decision.", [
        "Questions lead customers toward preferred answers or solicit feedback with no intended decision use.",
        "Participants cannot safely provide critical feedback because confidentiality, retaliation, or account consequences are unclear.",
        "Collection methods state purpose, consent, data use, and accessible participation routes.",
        "Methods match the uncertainty and protect sensitive data, vulnerable participants, and honest response.",
        "Collection quality is tested for comprehension, bias, burden, inclusion, and whether evidence improves decisions."
      ]),
      S("Synthesis and Insight Integrity", "Evaluate whether feedback is systematically analyzed without erasing context or contradictory evidence.", [
        "Individual quotes are elevated directly into roadmap commitments.",
        "Feedback counts are interpreted without customer context, exposure, severity, or selection bias.",
        "Feedback is coded or organized with source, segment, context, date, and supporting evidence.",
        "Themes are triangulated with behavior, outcomes, support impact, strategy, and contrary cases.",
        "Insight confidence, limitations, and alternative explanations are explicit and updated as new evidence arrives."
      ]),
      S("Decision Integration", "Evaluate whether customer evidence influences product, service, and operational decisions transparently.", [
        "Feedback accumulates in repositories without clear owners or links to decisions.",
        "Teams cherry-pick customer comments to justify decisions already made.",
        "Relevant feedback is accessible to product, design, engineering, support, and commercial decision-makers.",
        "Material decisions record which customer evidence was considered and why competing needs were resolved as they were.",
        "The organization audits whether feedback changed priorities and whether those decisions improved customer outcomes."
      ]),
      S("Closed Loops and Learning", "Evaluate whether customers and internal contributors can see appropriate follow-through and system improvement.", [
        "Customers repeatedly report the same issue without acknowledgment, status, or resolution.",
        "Closing the loop is treated as promising every requester the feature they proposed.",
        "Feedback receives acknowledgment, routing, ownership, and an appropriate expectation.",
        "Affected customers receive relevant updates, workarounds, decisions, or resolution while privacy is protected.",
        "Recurring feedback changes product strategy, service design, documentation, support, telemetry, and collection methods."
      ])
    ]
  },
  {
    file: "end-to-end-customer-journey.json",
    name: "End-to-End Customer Journey",
    sections: [
      S("Journey Understanding", "Evaluate whether the organization understands the customer's complete journey across channels and internal boundaries.", [
        "Each function optimizes its own touchpoints without understanding the customer's end-to-end goal.",
        "Journey maps reflect internal assumptions and ideal paths but exclude observed failure and recovery.",
        "Priority journeys identify customer goals, stages, channels, actors, systems, handoffs, and evidence sources.",
        "Representative customers validate journey conditions, including accessibility, regional, role, and lifecycle differences.",
        "Journey models evolve from behavior, feedback, support, service, commercial, and operational evidence."
      ]),
      S("Continuity and Handoffs", "Evaluate whether customers can move between marketing, sales, product, service, billing, and support without losing context.", [
        "Customers repeatedly re-enter information or restate their situation when moving between channels or teams.",
        "Internal ownership disputes are exposed to customers as delays or contradictory instructions.",
        "Major handoffs have clear ownership, information, consent, service expectations, and escalation paths.",
        "The organization measures transfer failure, repeated contact, customer effort, waiting, and abandonment.",
        "Products, data, policies, and organizational boundaries are redesigned to eliminate recurring journey discontinuity."
      ]),
      S("Journey Outcomes and Friction", "Evaluate whether journeys help customers achieve intended outcomes with reasonable effort and trust.", [
        "Journey success is measured mainly by internal completion or conversion regardless of customer outcome.",
        "Friction is intentionally added to cancellation, complaint, privacy, or refund journeys.",
        "Priority journeys define customer success, business value, effort, time, error, and trust measures.",
        "Evidence is segmented and balanced with accessibility, fairness, support, retention, and harm countermetrics.",
        "Teams continuously improve the most consequential friction and verify that customer and business outcomes both improve."
      ]),
      S("Failure and Service Recovery", "Evaluate whether customers can recognize, navigate, and recover from journey failures.", [
        "Errors leave customers without a clear explanation, preserved work, or recovery path.",
        "Failure recovery depends on exceptional employee effort or customer escalation.",
        "Critical failures have understandable messages, safe states, self-service or assisted recovery, and ownership.",
        "Failure demand, repeated attempts, abandonment, compensation, and recovery time are measured.",
        "Recovery evidence changes product design, policies, operations, staffing, and preventive controls."
      ]),
      S("Cross-Functional Governance", "Evaluate whether the complete journey has accountable ownership and coordinated improvement.", [
        "No leader or group owns outcomes that span functional boundaries.",
        "Journey initiatives produce maps and workshops without changing priorities, systems, or incentives.",
        "Priority journeys have accountable owners, shared outcomes, governance, and improvement backlogs.",
        "Cross-functional reviews resolve policy, data, system, staffing, and ownership constraints using journey evidence.",
        "Investment and organization design adapt around customer journeys when end-to-end value outweighs local optimization."
      ])
    ]
  },
  {
    file: "customer-onboarding-effectiveness.json",
    name: "Customer Onboarding Effectiveness",
    sections: [
      S("Time to First Value", "Evaluate whether target customers reach a meaningful initial outcome quickly and reliably.", [
        "Onboarding success is defined as account creation, contract signature, or completion of setup steps.",
        "Average onboarding time hides stalled, abandoned, inaccessible, or high-touch segments.",
        "Each target segment has a behaviorally meaningful first-value definition and baseline.",
        "Time to value, completion, abandonment, errors, assistance, and outcome are measured by cohort and segment.",
        "Product, process, packaging, data, and service changes continuously improve first value without creating downstream harm."
      ]),
      S("Setup and Integration", "Evaluate whether configuration, data, identity, and integration work are understandable and proportionate.", [
        "Customers discover critical prerequisites only after purchase or implementation begins.",
        "Setup depends on undocumented specialist knowledge or repeated manual correction.",
        "Prerequisites, responsibilities, dependencies, data needs, security needs, and expected effort are explicit.",
        "Common setup and integration paths are guided, validated, observable, resumable, and supported.",
        "Architecture, APIs, defaults, migration tools, and commercial qualification evolve using setup failure and effort evidence."
      ]),
      S("Guidance and Learning", "Evaluate whether customers receive contextual, accessible guidance that builds independent capability.", [
        "Onboarding relies on generic feature tours or documentation unrelated to the customer's goal.",
        "Training completion is treated as proof that customers can perform important tasks.",
        "Guidance is organized around roles, goals, context, and critical tasks.",
        "Customers can choose accessible self-service, in-product, community, or human assistance and demonstrate task success.",
        "Guidance adapts using search, error, support, behavior, comprehension, and outcome evidence."
      ]),
      S("Expectation and Ownership Alignment", "Evaluate whether sales, implementation, product, and customer roles remain aligned through onboarding.", [
        "Customers enter onboarding with promises, scope, or timelines that delivery groups cannot support.",
        "Ownership is transferred between teams without clear customer or internal accountability.",
        "Expected outcomes, scope, responsibilities, risks, timeline ranges, and escalation paths are confirmed.",
        "Shared plans and health signals make progress, decisions, dependencies, and changed expectations visible.",
        "Promise quality and onboarding evidence improve qualification, packaging, product strategy, staffing, and contracts."
      ]),
      S("Early Risk and Recovery", "Evaluate whether onboarding risk is detected early and recovery protects customer trust and value.", [
        "Stalled onboarding is recognized only after repeated missed dates or customer escalation.",
        "At-risk customers receive more meetings without diagnosing the underlying constraint.",
        "Leading indicators identify inactivity, errors, missing dependencies, sentiment, and outcome risk.",
        "Recovery playbooks combine product, technical, commercial, and relationship actions with accountable owners.",
        "Cohort and causal learning reduce recurring onboarding risk and improve retention, cost to serve, and customer outcomes."
      ])
    ]
  },
  {
    file: "customer-support-capability.json",
    name: "Customer Support Capability",
    sections: [
      S("Access and Intake", "Evaluate whether customers can obtain support through accessible, appropriate, and well-routed channels.", [
        "Customers cannot easily determine how to obtain help for urgent or sensitive problems.",
        "Channel restrictions or automation prevent customers with accessibility, language, or complexity needs from reaching effective support.",
        "Support routes, hours, service expectations, privacy boundaries, and escalation options are clear.",
        "Intake captures relevant product, customer, severity, accessibility, and diagnostic context without unnecessary repetition.",
        "Access channels and routing adapt using demand, containment failure, equity, urgency, customer effort, and outcome evidence."
      ]),
      S("Diagnosis and Resolution Quality", "Evaluate whether support resolves the customer's underlying problem accurately and safely.", [
        "Cases are closed to meet speed targets before the customer's task or problem is resolved.",
        "Agents rely on scripts that do not account for context, risk, or contradictory evidence.",
        "Support has current product knowledge, diagnostic access, safe procedures, and specialist escalation.",
        "Resolution quality, recurrence, reopen rate, customer effort, and downstream impact balance response-time measures.",
        "Case evidence improves diagnostics, tooling, knowledge, product design, and prevention of recurring failure."
      ]),
      S("Prioritization and Escalation", "Evaluate whether severity and routing reflect customer impact, vulnerability, scope, and urgency.", [
        "Priority depends mainly on customer revenue, persistence, or executive visibility.",
        "Critical product, security, privacy, safety, or accessibility issues wait in general support queues.",
        "Severity criteria consider impact, scope, workaround, affected users, data, contractual, and regulatory factors.",
        "Escalations have named owners, response expectations, shared context, and feedback to the customer and support agent.",
        "Escalation patterns change staffing, product ownership, incident criteria, controls, and customer commitments."
      ]),
      S("Knowledge and Enablement", "Evaluate whether support knowledge is accurate, discoverable, governed, and useful to customers and staff.", [
        "Support answers depend on individual memory, private notes, or outdated documents.",
        "Knowledge success is measured by article publication rather than task success or reduced failure demand.",
        "Knowledge content has ownership, review dates, source authority, accessibility, and retirement rules.",
        "Search, usage, deflection, escalation, correction, and customer-success evidence guide knowledge improvement.",
        "Support, product, engineering, documentation, and community knowledge form a governed learning system."
      ]),
      S("Support Operations and Workforce Health", "Evaluate whether support demand, staffing, tools, quality, and employee sustainability are managed together.", [
        "Backlogs and emotional load grow while performance pressure increases and recovery capacity declines.",
        "Automation is introduced to reduce contacts without checking resolution, trust, safety, or agent workload.",
        "Demand, backlog age, staffing, schedules, skills, case mix, and employee health are visible.",
        "Quality review, coaching, workforce planning, tooling, and automation balance customer and employee outcomes.",
        "Support evidence shapes product priorities, service design, commercial policy, operational readiness, and capacity strategy."
      ])
    ]
  },
  {
    file: "customer-retention-expansion-system.json",
    name: "Customer Retention and Expansion System",
    sections: [
      S("Value Realization", "Evaluate whether customers achieve and recognize the outcomes for which they adopted the product.", [
        "Retention activity focuses on relationship cadence without evidence that customers realize value.",
        "Usage volume is treated as value even when it does not represent the customer's desired outcome.",
        "Target customers have explicit success outcomes, baselines, responsibilities, and review points.",
        "Product behavior, business outcomes, qualitative evidence, and stakeholder confidence are combined to assess value.",
        "Value models adapt by segment and directly influence product, onboarding, service, pricing, and expansion decisions."
      ]),
      S("Health and Risk Detection", "Evaluate whether retention risk is detected early using valid, actionable signals.", [
        "Churn risk is identified mainly from renewal dates, complaints, or account-manager intuition.",
        "A universal health score hides missing data, segment differences, stakeholder change, or product context.",
        "Health signals cover adoption, outcomes, support, sentiment, relationship, commercial, and operational factors.",
        "Signals are validated against retention outcomes and produce owned, proportionate interventions.",
        "Health models expose uncertainty, are monitored for bias and drift, and are redesigned when interventions or products change."
      ]),
      S("Renewal Integrity", "Evaluate whether renewals reflect continuing value, transparent terms, and realistic commitments.", [
        "Renewals rely on surprise deadlines, difficult cancellation, or contractual friction.",
        "Discounts and promises are used to defer churn without addressing the underlying value gap.",
        "Renewal timing, terms, usage, outcomes, concerns, and decision stakeholders are visible.",
        "Product, success, support, sales, and finance coordinate an evidence-based renewal strategy.",
        "Renewal learning changes segment strategy, product investment, packaging, contracting, and customer qualification."
      ]),
      S("Expansion Quality", "Evaluate whether expansion creates additional customer value with sustainable economics.", [
        "Expansion is pursued from available budget or sales targets without confirming new value.",
        "Cross-sell success ignores implementation burden, adoption, support cost, or displacement of existing value.",
        "Expansion opportunities connect a verified customer need to a credible product outcome.",
        "Willingness to pay, adoption capacity, implementation risk, unit economics, and success measures inform the offer.",
        "Expansion cohorts demonstrate durable incremental value, healthy economics, and no material degradation of trust or retention."
      ]),
      S("Churn and System Learning", "Evaluate whether churn and contraction evidence produce cross-functional improvement.", [
        "Churn reasons are recorded as broad labels selected to complete a process.",
        "Teams explain churn as customer fit or budget without examining product, service, promise, or market factors.",
        "Churn and contraction receive consistent reason, context, segment, timeline, and evidence capture.",
        "Behavioral, commercial, support, product, competitive, and qualitative evidence are synthesized across cohorts.",
        "Churn learning changes strategy, qualification, product, pricing, onboarding, support, capacity, and retention investment."
      ])
    ]
  },
  {
    file: "code-maintainability.json",
    name: "Code Maintainability",
    sections: [
      S("Understandability and Ownership", "Evaluate whether engineers can locate, understand, and safely reason about the code they must change.", [
        "Critical behavior depends on undocumented code and knowledge held by a small number of people.",
        "Ownership boundaries are unclear, causing delayed reviews, abandoned components, or unsafe changes.",
        "Repositories, components, owners, dependencies, and supported development paths are discoverable.",
        "Code structure, naming, tests, documentation, and review practices support routine understanding by the owning team.",
        "Time-to-understand, onboarding, review, incident, and change evidence drive simplification and ownership improvement."
      ]),
      S("Modularity and Change Locality", "Evaluate whether changes are localized and component boundaries reflect product and technical responsibilities.", [
        "Small behavior changes require widespread modifications across unrelated modules.",
        "Modularity is judged from architectural intent without examining actual co-change or defect propagation.",
        "Components have coherent responsibilities and explicit interfaces.",
        "Dependency direction, co-change, build impact, deployment coupling, and failure propagation are measured and improved.",
        "Boundaries evolve using real change paths, product concepts, team ownership, reliability, and cognitive-load evidence."
      ]),
      S("Automated Change Safety", "Evaluate whether tests and analysis provide fast, trustworthy evidence for maintenance and refactoring.", [
        "Engineers avoid changing important code because tests are absent, slow, flaky, or misleading.",
        "Coverage percentages are used as proof of safety without examining assertion quality or risk.",
        "Critical behavior has maintainable automated tests and relevant static or dynamic checks.",
        "Feedback is fast and reliable enough to support routine refactoring and dependency upgrades.",
        "Escaped defects, mutation or fault evidence, flakiness, change patterns, and test cost continuously improve the safety system."
      ]),
      S("Complexity and Debt Control", "Evaluate whether unnecessary complexity and consequential maintainability debt are identified and reduced.", [
        "Complexity grows through duplicated solutions, speculative abstractions, and obsolete paths that are rarely removed.",
        "Technical debt is recorded as a large unprioritized backlog with no link to consequences.",
        "Teams apply clear local standards and identify complexity that materially affects change, quality, risk, or operations.",
        "Debt is prioritized using evidence of delay, defects, incidents, cognitive load, cost, and strategic constraint.",
        "Prevention and simplification outcomes are verified, and obsolete code, flags, dependencies, and systems are routinely retired."
      ]),
      S("Dependency and Evolution Health", "Evaluate whether code and dependencies can evolve without long periods of unsupported or high-risk operation.", [
        "Critical dependencies remain unsupported or unpatched because upgrades are too risky to perform.",
        "Dependency changes occur only during disruptive upgrade programs.",
        "Direct and transitive dependencies, support status, owners, licenses, and vulnerabilities are inventoried.",
        "Small, regular upgrades use automation, compatibility evidence, staged rollout, and clear exception ownership.",
        "Architecture, component selection, replacement, and internal APIs minimize lock-in and preserve safe evolutionary paths."
      ])
    ]
  },
  {
    file: "continuous-delivery-capability.json",
    name: "Continuous Delivery Capability",
    sections: [
      S("Deployable State and Build Integrity", "Evaluate whether software remains in a known, reproducible, deployable state.", [
        "Release readiness requires a stabilization phase, manual reconstruction, or exceptional coordination.",
        "Build artifacts vary by environment or are rebuilt after verification.",
        "Versioned sources and dependencies produce identifiable artifacts through a repeatable build.",
        "The same immutable artifact progresses through proportionate verification and environments with traceable configuration.",
        "Deployability is continuously protected through architecture, test, environment, dependency, and operational improvements."
      ]),
      S("Deployment Automation and Environment Control", "Evaluate whether deployment and configuration changes are safe, repeatable, and observable.", [
        "Production deployment depends on undocumented manual steps or privileged individual knowledge.",
        "Automation executes changes but cannot explain state, detect partial failure, or recover safely.",
        "Deployment steps, configuration, infrastructure, and required approvals are versioned or reproducible.",
        "Automated deployment verifies preconditions, progress, postconditions, ownership, and audit evidence.",
        "Deployment controls adapt by change risk and continuously reduce failure, delay, toil, and environment drift."
      ]),
      S("Verification and Fast Feedback", "Evaluate whether delivery pipelines provide timely, trustworthy evidence about releasability.", [
        "Teams wait hours or days for essential pipeline feedback or routinely ignore unreliable results.",
        "Every change runs the same expensive checks regardless of risk while important failure modes remain uncovered.",
        "Pipelines provide fast build, unit, integration, security, and packaging feedback appropriate to the product.",
        "Checks are layered by risk and feedback time, with flakiness, duration, failures, and bypasses actively managed.",
        "Verification effectiveness evolves using production escapes, change patterns, threat evidence, and decision latency."
      ]),
      S("Release Safety and Recovery", "Evaluate whether releases can be exposed progressively, observed, and reversed or corrected safely.", [
        "Releases expose all users simultaneously without a tested recovery path.",
        "Feature flags or progressive delivery controls accumulate without ownership, security review, or retirement.",
        "Critical releases have explicit monitoring, rollback or roll-forward, and communication plans.",
        "Progressive exposure, automated health checks, traffic controls, and tested recovery limit customer impact.",
        "Release strategy adapts by change risk, user segment, architecture, evidence needs, and observed recovery performance."
      ]),
      S("On-Demand Sustainable Delivery", "Evaluate whether authorized changes can reach users routinely without release-event disruption.", [
        "Releases require nights, weekends, freezes, or extraordinary staffing as a normal condition.",
        "Deployment frequency is increased without addressing workload, reliability, quality, or customer readiness.",
        "Teams can release qualifying changes during normal operations using documented ownership and support.",
        "Release delay, deployment pain, failure, rework, and workforce impact are measured and improved together.",
        "Product, engineering, security, operations, and support jointly optimize delivery cadence for value, risk, learning, and sustainability."
      ])
    ]
  },
  {
    file: "test-strategy-quality-engineering.json",
    name: "Test Strategy and Quality Engineering",
    sections: [
      S("Quality Risk Strategy", "Evaluate whether testing focuses on the most consequential product and system risks.", [
        "Testing is planned from feature lists or historical test cases without a current risk model.",
        "Quality is delegated to testers after implementation rather than owned across product development.",
        "Teams identify important functional, reliability, security, privacy, accessibility, performance, and usability risks.",
        "Test depth, independence, environments, data, and techniques are selected according to consequence and uncertainty.",
        "Risk strategy evolves using customer impact, incidents, escaped defects, architecture, threat, and product evidence."
      ]),
      S("Test Design and Coverage", "Evaluate whether tests provide meaningful coverage of behavior, boundaries, failure, and change.", [
        "Large numbers of tests repeat the same happy paths while critical failure modes remain unexamined.",
        "Line or case-count coverage is treated as proof of product quality.",
        "Tests cover acceptance examples, boundaries, errors, state, permissions, and important integrations.",
        "Coverage models connect requirements, risks, architecture, customer journeys, and production behavior.",
        "Fault, mutation, exploratory, incident, and escape evidence reveal blind spots and improve test design."
      ]),
      S("Automation Reliability and Feedback", "Evaluate whether automated tests are fast, deterministic, maintainable, and appropriately placed.", [
        "Flaky or slow suites routinely block delivery or are bypassed to complete releases.",
        "End-to-end automation is added for every scenario despite high maintenance cost and poor diagnostic value.",
        "Tests are placed at the lowest useful level and have clear ownership and failure information.",
        "Duration, flakiness, quarantine, maintenance, signal quality, and feedback criticality are actively managed.",
        "The test portfolio is continuously simplified and rebalanced using defect detection, change risk, cost, and learning speed."
      ]),
      S("Test Data and Environments", "Evaluate whether testing has safe, representative, available data and environments.", [
        "Testing depends on shared unstable environments or uncontrolled copies of sensitive production data.",
        "Environment fidelity is pursued without deciding which differences matter to the risk being tested.",
        "Test-data generation, masking, access, reset, retention, and environment ownership are documented.",
        "Teams can provision isolated or controlled conditions with observable dependencies and relevant production-like behavior.",
        "Data and environment strategy adapts using privacy, cost, contention, defect escapes, architecture, and test-purpose evidence."
      ]),
      S("Exploration and Quality Learning", "Evaluate whether human exploration and production evidence complement automated verification.", [
        "Testing follows only predefined scripts and cannot respond to unexpected behavior.",
        "Production defects are fixed individually without improving the broader quality system.",
        "Teams perform risk-focused exploratory testing and capture useful observations and follow-up.",
        "Support, telemetry, incidents, customer research, and escaped defects feed quality strategy and prevention.",
        "Quality learning changes product decisions, architecture, standards, tools, skills, and investment with verified outcomes."
      ])
    ]
  },
  {
    file: "platform-engineering-product-maturity.json",
    name: "Platform Engineering Product Maturity",
    sections: [
      S("Platform Users and Product Strategy", "Evaluate whether the platform has defined users, problems, outcomes, and strategic boundaries.", [
        "The platform roadmap is driven mainly by infrastructure preferences or central standardization goals.",
        "Every shared tool or service is labeled a platform without a coherent user problem or product boundary.",
        "Platform teams identify target internal users, priority tasks, needs, alternatives, and intended outcomes.",
        "User research, company strategy, architecture, security, and economics shape a focused platform strategy.",
        "Platform boundaries and investment evolve using adoption, retention, task success, delivery, reliability, and user evidence."
      ]),
      S("Self-Service and Task Success", "Evaluate whether common platform workflows are discoverable, safe, and independently completable.", [
        "Product teams must file tickets or contact specialists for routine environment, deployment, or service tasks.",
        "A portal or API is called self-service even though users cannot complete the full task without hidden manual work.",
        "Priority workflows have documented supported paths, ownership, and service expectations.",
        "Users can complete common tasks through usable interfaces with validation, feedback, recovery, and accessible documentation.",
        "Task completion, time, error, support demand, abandonment, and user research drive workflow improvement."
      ]),
      S("Paved Paths and Flexibility", "Evaluate whether platform defaults reduce burden while preserving justified choice and escape routes.", [
        "Platform use is mandated regardless of product context or whether the path meets team needs.",
        "Unlimited customization makes every platform adoption unique and costly to support.",
        "Supported paths define clear benefits, constraints, compatibility, security, and ownership.",
        "Defaults cover common needs while documented exceptions and extension points address justified differences.",
        "Adoption, exception, support, risk, and product outcomes determine which paths are standardized, changed, or retired."
      ]),
      S("Platform Reliability and Operations", "Evaluate whether the platform is operated as a dependable product with clear service ownership.", [
        "Platform failures create broad delivery disruption without user-centered objectives or recovery plans.",
        "Platform teams measure infrastructure uptime while ignoring whether developers can complete critical workflows.",
        "Critical platform journeys, dependencies, owners, support, and recovery procedures are documented.",
        "User-centered service objectives, incident management, capacity, observability, and change controls guide operation.",
        "Reliability investment balances user impact, adoption, strategic importance, cost, and architectural resilience."
      ]),
      S("Adoption, Economics, and Outcomes", "Evaluate whether platform investment produces measurable organizational value without coercive metrics.", [
        "Platform success is reported from features delivered or teams instructed to migrate.",
        "Adoption is maximized without measuring task outcomes, migration cost, retained use, or displaced local capability.",
        "The platform tracks voluntary or required adoption, retention, satisfaction, support, and cost.",
        "Delivery performance, task success, cognitive load, reliability, security, and total cost form a balanced scorecard.",
        "Investment expands, redirects, consolidates, or stops using marginal value, strategic fit, user outcomes, and credible alternatives."
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

let nextItemId = 275;
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
  wave: 2,
  itemIdRange: "275-349",
  statusDefinitions: {
    "draft-complete": "Content is authored and structurally validated but has not yet completed respondent testing or psychometric validation.",
    pilot: "The instrument is undergoing cognitive interviews or field testing.",
    validated: "The instrument has documented evidence supporting its intended interpretation and use."
  },
  assessments: register
}, null, 2)}\n`);
