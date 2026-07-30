import fs from "node:fs";
import path from "node:path";

const sourceDir = path.resolve(import.meta.dirname, "..");
const outputDir = import.meta.dirname;

const replacements = new Map(Object.entries({
  "Build long-lived teams and bring the work to them": "Evaluate whether stable, cross-functional teams can own and deliver customer value with minimal handoffs.",
  "Encourage collaboration through deliberate workflow design": "Evaluate whether the team's workflow enables timely collaboration, clear ownership, and sustainable flow.",
  "Build a strong team foundation by asking team members to agree upon and document their norms": "Evaluate whether the team creates, follows, and improves explicit working agreements.",
  "Formalize the processes teams use to manage cross team dependencies, decreasing cycle time": "Evaluate how teams make dependencies visible, coordinate delivery, and reduce avoidable handoffs.",
  "Formalize the processes used to form a collaborative relationship between engineering and business": "Evaluate whether product, business, and engineering partners share decisions, evidence, and tradeoffs.",
  "Adjust customer appetite via a velocity-based estimate of engineering capacity": "Evaluate whether release forecasts use evidence, capacity, risk, and outcome-based scope tradeoffs.",
  "Collaboratively build the customer's definition of success for a program": "Evaluate whether teams define measurable customer and business outcomes and use them to guide delivery.",
  "Express work as small, independent requests for value from a customer persona's perspective": "Evaluate whether backlog items represent small, testable slices of customer value and support meaningful conversation.",
  "Ensure visibility of valuable project status indicators": "Evaluate whether current, decision-relevant information is visible and understandable to teams and stakeholders.",
  "Build a culture of sharing and growth while maintaining focus on T-Shaped people": "Evaluate whether the organization builds capability through learning, knowledge sharing, and reduced skill bottlenecks.",
  "Meet to determine which user stories will be taken into the sprint backlog": "Evaluate whether teams establish a realistic sprint goal and select a coherent, achievable body of work.",
  "Meet frequently to keep the backlog up-to-date and ready for the next sprint": "Evaluate whether teams continuously clarify, split, validate, and order near-term work.",
  "Meet briefly to share progress made against the sprint backlog": "Evaluate whether the team inspects progress toward its goal daily and adapts its plan when needed.",
  "Confirm that sprint output meets customer expectations and gather feedback": "Evaluate whether teams inspect usable outcomes with relevant stakeholders and turn feedback into decisions.",
  "Team drives their own, effective process of looking for opportunities to improve": "Evaluate whether the team regularly identifies, owns, and verifies meaningful improvements.",
  "Write fast and durable tests to ensure independent units of code continue to work as intended": "Evaluate whether fast, reliable unit tests support design, change safety, and rapid feedback.",
  "Define rich acceptance criteria in plain language": "Evaluate whether executable examples and acceptance tests provide shared, trustworthy evidence of behavior.",
  "Consistently rework code to reduce technical debt": "Evaluate whether teams continuously improve internal design while preserving observable behavior.",
  "Often perform work in pairs to improve quality and limit specialization": "Evaluate whether collaborative engineering is used deliberately to improve decisions, quality, and knowledge flow.",
  "Solve problems with the minimum necessary code and limited complexity": "Evaluate whether teams minimize unnecessary complexity and evolve design using evidence.",
  "Formalize a shared definition of what it means to be truly \"done\" with a unit of work": "Evaluate whether a shared Definition of Done produces integrated, usable, and releasable increments.",
  "Bring changes together very frequently to avoid conflicts and speed learning": "Evaluate whether small changes are integrated frequently with fast, trustworthy automated feedback.",
  "Strive to make the output of every sprint potentially releasable": "Evaluate whether software can be released safely, repeatably, and on demand.",
  "Build a fast & durable suite of tests ensuring features continue to meet acceptance criteria": "Evaluate whether automated regression tests provide fast, reliable evidence that critical behavior still works.",
  "Employ modern tools to control and manage all items that constitute the application": "Evaluate whether all software and delivery artifacts are versioned, traceable, protected, and easy to integrate.",
  "Measure how effectively teams integrate customer feedback into the agile delivery process": "Evaluate how consistently teams discover customer needs, validate assumptions, and use outcomes to guide product decisions.",
  "Assess leadership alignment with agile principles and their role in empowering teams": "Evaluate whether leaders create clear boundaries, enable team autonomy, remove systemic constraints, and learn from outcomes.",
  "Assess how safe and supported team members feel when expressing themselves": "Evaluate whether people can raise concerns, admit mistakes, disagree, ask for help, and take interpersonal risks without retaliation.",
  "Assess how effectively teams coordinate across programs and value streams": "Evaluate whether multiple teams align on outcomes, manage dependencies, and improve end-to-end flow without excessive coordination overhead.",
  "Evaluate how engineering practices support speed, quality, and sustainable delivery": "Evaluate whether engineering practices enable fast feedback, dependable quality, operational resilience, and sustainable change.",
  "Evaluate how well user experience design is embedded into agile delivery practices": "Evaluate whether product discovery, research, design, engineering, accessibility, and measurement operate as one continuous learning system.",

  "Team has significantly unhealthy churn.": "The team experiences frequent involuntary or avoidable membership changes that disrupt delivery and knowledge continuity.",
  "Communication is ineffective, for example reliance on email or other asynchronous forms of communication.": "The team regularly loses context or waits for decisions because communication methods do not match the urgency or complexity of the work.",
  "Developers work from written documents and do not communicate directly with PO or other teammates": "Engineers rely on handoff documents and rarely collaborate directly with product partners or teammates.",
  "Developers work in close digital proximity to each other": "Team members have shared collaboration channels and can reach one another during agreed working hours.",
  "Team has standard tools for sharing in their workflow": "The team uses a small, agreed set of tools to share work, decisions, and status.",
  "Team has digital collaboration space dedicated to the team": "The team maintains an accessible collaboration space for current work, decisions, and working agreements.",
  "Scrum of scrums in place.": "Teams use a lightweight coordination mechanism when shared outcomes or dependencies require it.",
  "Meritocracy is used among teams.": "Cross-team decisions use relevant evidence and expertise, with affected teams able to contribute and challenge assumptions.",
  "The business partner has taken steps to revise their governance (which may be a tollgate process) to align to the development team's agile processes.": "Governance and funding controls support incremental decisions, evidence-based review, and timely delivery.",
  "There are less than 20 high level goals.": "The organization maintains a limited, coherent set of high-level goals.",
  "There are less than 12 high level goals.": "Teams focus on a small set of explicitly prioritized outcomes and resolve conflicts between them.",
  "Goals have metrics (KPI's) that will prove business value delivered.": "Goals include measures that can provide credible evidence of customer or business value.",
  "Team seeks ways to evaluate the KPI's as soon as reasonably possible after deployment.": "The team evaluates outcome measures as soon as meaningful evidence is available after release.",
  "Development work isplanned out 6 months in advance or longer.": "Detailed development work is fixed six months or more in advance despite changing evidence.",
  "Development work issplit along process lines orfunctional areas, e.g., design, code, test, integrate, architect, UX etc.": "Work is split into functional handoffs such as design, coding, testing, integration, architecture, and UX.",
  "Development work issplit along architectural lines, e.g., UI, database, data access layer, etc.": "Work is split by technical layer rather than as end-to-end slices of usable value.",
  "User stories can all be easily foundin one place.": "Current backlog items and their status are easy for relevant participants to find.",
  "User stories areordered by priority in a backlog.": "Backlog items are ordered using explicit value, risk, learning, and dependency considerations.",
  "User storiesfollow a standard form such as 'In order to <business value description>, As a <persona>, I want <feature>.": "Backlog items express the user, intended outcome, and need when that format improves shared understanding.",
  "There is an awareness ofmocks, stubs and test doublesand some use of them in tests.": "Developers use test doubles selectively when they improve isolation without hiding important integration behavior.",
  "Tests are independent, can be run in anyorder, and don't share test data.": "Unit tests are isolated, order-independent, and do not depend on shared mutable test data.",
  "These tests are developed in parallel to story development by QA using our standard tools - Karate and Playwright.": "Acceptance tests are developed alongside the behavior by the people best positioned to clarify, implement, and verify it.",
  "The Three Amigo's have collective ownership of the testing approach.": "Product, engineering, and testing perspectives jointly shape examples and the testing approach.",
  "More than 4 hours of pair programming per day.": "The team uses pairing or ensemble work when it materially reduces risk, accelerates learning, or improves design decisions.",
  "At least 1 hour per developer per week of pair programming.": "Team members occasionally collaborate in pairs to solve difficult problems or share knowledge.",
  "At least 1 hour per developer per day of pair programming.": "Collaborative engineering is a normal option for complex, risky, or learning-intensive work.",
  "Promiscuous pairing.": "Pairing partners rotate intentionally to spread context and avoid persistent knowledge silos.",
  "In addition to more than 4 hours of pair programming, regularly switching navigator and driver roles without pairing with the same partner everyday.": "When pairing, participants rotate roles and partners often enough to maintain engagement and broaden knowledge.",
  "Pair programming is a promoted as part of a desirable environment for potential recruits.": "The organization explains collaborative engineering practices accurately to candidates and supports teams in choosing them.",
  "All of the developers understand and work to SOLID (https://en.wikipedia.org/wiki/SOLID).": "Developers apply appropriate design principles and can explain the tradeoffs in the context of their system.",
  "Spikes are used with each release to introduce new ideas and test architectural decisions.": "Teams use time-boxed experiments when uncertainty warrants them and record what was learned.",
  "Continuous deployment enabled.": "The Definition of Done is strong enough that qualifying changes can be released safely on demand.",
  "Broken builds get fixed within 24 hours.": "A failing mainline build is treated as urgent, with recovery time measured and improved.",
  "Builds are done in parallel reducing overall build time.": "Pipeline stages run in parallel where this safely shortens decision-relevant feedback.",
  "Reporting capabilities provide analytics, and cross module comparisons.": "Delivery telemetry helps teams identify trends and choose improvements without ranking teams by context-free comparisons.",
  "Deploy can be made based on limited access to specific target end users.": "Teams can progressively expose changes to selected users or traffic segments when risk or learning goals warrant it.",
  "Continuous delivery environment collects data about feature usage and allows for blue green testing before full feature release in production.": "Delivery controls support progressive exposure, production telemetry, rapid rollback, and evidence-based release decisions.",
  "Code coverage is measured on automated functional tests.": "The team monitors meaningful regression coverage and known risk gaps without treating a single coverage percentage as proof of quality.",
  "There may be time sequences where all of the builds are not running successfully because the tests are failing.": "Regression suites are allowed to remain failing long enough that teams lose confidence in their signal.",
  "Sometimes they will allow a small set of tests to be commented out as they are difficult to debug/fix.": "Difficult or flaky tests are disabled without a visible owner, risk decision, and time-bounded repair plan.",
  "All the tests are allocated to a CI build to ensure they run at some times.": "Every maintained automated test runs on a defined cadence appropriate to the risk it covers.",
  "The team understand that the automated tests are a real safety net and use them to strive for zero defects to production.": "The team treats automated tests as one layer of risk control and tracks escaped defects to improve the overall safety system.",
  "The team uses a supported SCM for code and tests..": "The team versions source code, tests, configuration, and delivery automation in a supported repository.",
  "Developers include meaningful comments in commits.": "Commits are small, coherent, and traceable to their intent and review context.",
  "SCM supports merging; optimistic check-ins.": "The version-control workflow supports frequent integration and makes conflicts visible early.",
  "Gated check-in's are enforced; all steps passing with improving metrics.": "Protected branches require proportionate automated checks and explicit handling of exceptions.",
  "Branches are used effectively, and merges are are easily supported.": "Branches are short-lived where practical, and merges are routine rather than high-risk integration events.",
  "Value streams and ARTs (Agile Release Trains) are optimized for flow and minimal handoffs.": "Team and product boundaries are shaped to improve end-to-end value flow and reduce handoffs.",
  "Design decisions are validated with users or customers before implementation begins.": "High-risk design assumptions are tested with representative users early enough to change direction.",
  "UX designers attend team ceremonies like stand-ups and retrospectives.": "UX practitioners participate in the team interactions where their contribution improves decisions and learning.",
  "Experiments and A/B tests are regularly used to optimize features based on real usage data.": "Teams use ethical, appropriately designed experiments or other causal evidence when the decision warrants them.",
  "Customer feedback loops are rapid, automated, and integral to the delivery process.": "Qualitative feedback and product telemetry reach decision-makers quickly enough to influence discovery, delivery, and support.",
  "Agile values are reflected in performance reviews, goals, and incentives.": "Goals, performance systems, and incentives reward customer outcomes, collaboration, learning, and sustainable delivery.",
  "Leaders act as servant leaders, removing obstacles and enabling team growth.": "Leaders remove systemic constraints, clarify decision boundaries, and build team capability.",
  "Leadership agility is continuously developed through feedback, reflection, and learning programs.": "Leaders use feedback, reflection, and observed outcomes to improve how they enable the organization.",
  "Infrastructure as Code and automated testing enable frequent, reliable deployments.": "Versioned infrastructure, automated verification, and safe delivery controls enable frequent, reliable changes.",
  "Technical practices are continuously improved through retrospectives, learning sessions, and experimentation.": "Teams use delivery and reliability evidence to choose, test, and verify improvements to technical practices."
  ,
  "Guide and mentor team members in self-management.": "Helps team members strengthen self-management, facilitation, conflict navigation, and collective ownership.",
  "Empowers the team to maximize productivity and efficiency within the Scrum framework.": "Helps the team improve value flow and effectiveness without taking ownership of its decisions.",
  "Relentlessly focuses on delivering incremental value aligned with the Definition of Done.": "Keeps attention on valuable, usable increments that meet the Definition of Done.",
  "Facilitates the team's commitment to achieving sprint objectives.": "Helps the team create a coherent Sprint Goal, inspect progress, and adapt its plan without manufacturing commitment.",
  "Proactively identifies and resolves impediments that hinder the team's progress.": "Makes impediments visible and helps the right owners remove them promptly.",
  "Enables seamless workflow and productivity.": "Uses flow evidence to help the team reduce avoidable waiting, handoffs, and work in progress.",
  "Ensure the smooth execution and positive outcomes of Scrum events.": "Ensures each Scrum event serves its inspection-and-adaptation purpose and produces a useful outcome.",
  "Fosters an environment of collaboration, efficiency and continuous improvement.": "Facilitates inclusive participation, candid inspection, and ownership of improvement actions.",
  "Assists in refining the Product Backlog.": "Helps the Product Owner and developers keep the Product Backlog transparent, ordered, and sufficiently understood.",
  "Contributes to effective Product Goal definition.": "Facilitates a clear, measurable Product Goal grounded in stakeholder and customer evidence.",
  "Facilitates its management to align with stakeholder expectations.": "Helps the Product Owner reconcile stakeholder needs while preserving clear product accountability.",
  "Fosters and facilitates empirical product planning methodologies within a complex work environment.": "Helps product planning use short feedback loops, explicit assumptions, and evidence in complex conditions.",
  "Ensures adaptability and responsiveness to evolving requirements.": "Helps the team adapt scope and plans when evidence changes while protecting the Product and Sprint Goals.",
  "Facilitate seamless collaboration between internal and external stakeholders.": "Creates effective, accessible collaboration between the Scrum Team and relevant internal and external stakeholders.",
  "Ensures alignment with project objectives and priorities.": "Helps participants align on product outcomes and explicit priorities rather than relying on activity or project-output measures alone.",
  "Leads, trains, and coach the organization in Scrum adoption and maturity.": "Teaches and coaches the organization on Scrum accountabilities, empiricism, and the limits of the framework.",
  "Advocates for an empirical approach to complex work and promoting a culture of continuous improvement.": "Advocates for transparency, inspection, adaptation, and verified improvement in complex work.",
  "Actively eliminates barriers between stakeholders and the team.": "Works with leaders and stakeholders to remove organizational barriers that prevent direct, timely collaboration.",
  "Fosters open communication channels and mutual understanding.": "Builds communication patterns that surface disagreements, decisions, and feedback without bypassing product accountability."
}));

const scoreOverrides = new Map(Object.entries({
  "UX design is delivered to engineering as static documents without collaboration.": -1,
  "Leaders are not actively involved in agile practices and rarely attend team ceremonies.": -1,
  "There may be time sequences where all of the builds are not running successfully because the tests are failing.": -1,
  "Sometimes they will allow a small set of tests to be commented out as they are difficult to debug/fix.": -1
}));

const idOverrides = new Map(Object.entries({
  "1:10": "The team adapts its workflow using evidence about flow, collaboration, and communication rather than waiting for external direction.",
  "8:7": "Information radiators evolve with decision needs and combine delivery, quality, customer-outcome, and system-health evidence where relevant.",
  "15:10": "Fast, reliable unit tests give developers confidence to refactor, evolve design, and detect regressions close to their source."
}));

const sectionDescriptions = new Map(Object.entries({
  "Coach and Mentorship": "Evaluate whether the Scrum Master builds team capability and self-management without becoming the team's manager.",
  "Value Creation": "Evaluate whether the Scrum Master helps the team focus on valuable, usable outcomes and meaningful goals.",
  "Obstacle Removal": "Evaluate whether the Scrum Master improves flow by making impediments visible and enabling durable removal.",
  "Scrum Events": "Evaluate whether Scrum events enable focused transparency, inspection, adaptation, and inclusive decisions.",
  "Product Management": "Evaluate whether the Scrum Master supports effective Product Ownership without assuming the Product Owner's accountability.",
  "Empirical Product Planning": "Evaluate whether planning responds to evidence, uncertainty, and learning in complex work.",
  "Stakeholder Collaboration": "Evaluate whether the Scrum Master enables direct, productive collaboration around product outcomes.",
  "Training and Leadership": "Evaluate whether the Scrum Master teaches, coaches, and influences the wider system effectively.",
  "Barriers Removal": "Evaluate whether the Scrum Master addresses organizational boundaries that obstruct the Scrum Team."
}));

function cleanText(value) {
  if (typeof value !== "string") return value;
  let text = replacements.get(value) ?? value;
  text = text
    .replaceAll("end to end", "end-to-end")
    .replaceAll("cross team", "cross-team")
    .replaceAll("self enforces", "self-enforces")
    .replaceAll("self organizing", "self-organizing")
    .replaceAll("Product owner", "Product Owner")
    .replaceAll("scrum master", "Scrum Master")
    .replaceAll("KPI's", "KPIs")
    .replaceAll("check-in's", "check-ins")
    .replaceAll("are are", "are")
    .replaceAll("done-ness", "completeness")
    .replace(/\s+([.,;:])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (text && /[A-Za-z0-9)\]'"”]$/.test(text)) text += ".";
  return text;
}

function reviseEntry(entry, sourceName) {
  const original = entry.descriptor;
  const revised = {
    ...entry,
    descriptor: cleanText(idOverrides.get(entry.id) ?? original)
  };
  if (sourceName !== "agile-assessment-distributed-v1.json" && scoreOverrides.has(original)) {
    revised.score = scoreOverrides.get(original);
  }
  if (sourceName === "agile-assessment-distributed-v1.json") {
    const sourceScore = scoreOverrides.get(original);
    if (sourceScore === -1) revised.options = "likert5Reversed";
  }
  return revised;
}

function reviseItem(item, sourceName) {
  const section = cleanText(item.section).replace(/\.$/, "");
  const descriptor = cleanText(item.descriptor || sectionDescriptions.get(section) || "");
  const revised = {
    ...item,
    section,
    descriptor,
    ...(Object.hasOwn(item, "raw") ? { raw: `${section} ${descriptor}` } : {}),
    entries: item.entries.map((entry) => reviseEntry(entry, sourceName))
  };
  for (const [key, value] of Object.entries(revised)) {
    if (!key.startsWith("section-") || !value || !Array.isArray(value.entries)) continue;
    revised[key] = {
      ...value,
      descriptor: cleanText(value.descriptor),
      raw: value.raw ? `${cleanText(value.section).replace(/\.$/, "")} ${cleanText(value.descriptor)}` : value.raw,
      entries: value.entries.map((entry) => {
        if (typeof entry !== "string" || /^-?\\d+$/.test(entry)) return entry;
        if (entry === "TBD" && section === "Daily Standup") {
          return "The team continuously improves its daily coordination using evidence about progress, flow, and impediments.";
        }
        return cleanText(entry);
      })
    };
  }
  return revised;
}

for (const sourceName of fs.readdirSync(sourceDir).filter((name) => name.endsWith(".json")).sort()) {
  const sourcePath = path.join(sourceDir, sourceName);
  const document = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  let revised;
  if (Array.isArray(document.items)) {
    revised = {
      ...document,
      name: cleanText(document.name).replace(/\.$/, ""),
      items: document.items.map((item) => reviseItem(item, sourceName))
    };
  } else {
    revised = reviseItem(document, sourceName);
  }
  fs.writeFileSync(path.join(outputDir, sourceName), `${JSON.stringify(revised, null, 2)}\n`);
}
