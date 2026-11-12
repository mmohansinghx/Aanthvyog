# Product requirements

**Status:** In Design
**Product:** AI Website & Web Application Builder

## Product intent
Help a user turn a natural-language software request into a reviewed, documented web project. The initial target list includes business websites, portfolio websites, college and education websites, admin dashboards, SaaS web applications, CRUD applications, authentication-based applications, and database-driven applications. Supported technologies must be stated only after implemented and tested.

## Evidence labels
- **Founder brief:** requested product direction and initial project category list.
- **Assumption:** a hypothesis needing customer or technical validation.
- **Recommendation:** proposed next step, not an approved decision.
Target users and workflows below are assumptions until validated.

## Proposed users and jobs
- A small business owner who needs a business website but lacks a development team.
- A student, educator, or institution representative who needs a portfolio or education site.
- A team member who needs an internal CRUD app or admin dashboard.
- A founder or product builder who needs a database-backed SaaS starting point.

Proposed job: describe the outcome, review a structured specification, approve a bounded implementation plan, inspect QA findings, and receive a project with usable documentation.

## Proposed end-to-end requirements
1. **Request intake - Planned:** collect goal, project category, constraints, and missing details; ask focused clarification questions.
2. **Specification - Planned:** Architect creates requirements, technology proposal, data model, API outline, security needs, implementation plan, and risks.
3. **Approval - Planned:** show specification and risks; record approval, rejection, revision, and cancellation.
4. **Implementation - Planned:** Engineer works only from an approved specification in an isolated, restricted workspace.
5. **Independent QA - Planned:** QA & Delivery reviews requirements, code, tests, security properties, and documentation.
6. **Fix loop - Planned:** return actionable defects to Engineer under retry/time limits; QA re-reviews each fix.
7. **Handover - Planned:** provide source, test evidence, known limits, setup instructions, architecture, data/API docs, and security notes.
8. **Project control - Planned:** show task state, safe progress, usage limits, cancellation, and approval requests.

## Proposed non-functional requirements
- Enforce identity, authorization, and project ownership on the server.
- Validate requests and responses at trust boundaries.
- Prevent generated projects from unrestricted host-file access or shell execution.
- Keep secrets out of client code, source control, and user-visible logs.
- Support responsive and accessible interfaces.
- Maintain an auditable lifecycle and clear error states.
- Define retention, export, deletion, recovery, and cost limits before production.

## Exclusions for the initial planning baseline
Universal framework/database/hosting claims; uncontrolled autonomous execution or agent self-approval; live model calls before provider approval; production deployment or paid service activation; security or production-ready guarantees without evidence.

## Decisions needed before scope approval
Choose first validated customer segment and project type, identity/account model, approved stack, storage and retention, generated-code sandbox, initial usage limits, and release evidence. Proposed M1 acceptance criteria are in PROJECT_MASTER.md.
