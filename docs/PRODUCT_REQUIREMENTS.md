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

## M1 secure project and request lifecycle requirements

These are product requirements; the secure and persisted behaviors remain planned. A local UI preview implements some screens, but it does not satisfy the full requirements for authentication, server-side ownership, lifecycle writes, approval records, audit storage, or persistence. The founder approved the data-region intent, invite-only authentication, and real persistence requirements on 2026-11-12; see [Decision Register](DECISION_REGISTER.md).

1. **Landing and access - Planned:** provide an AANTVYOG landing page and invite-only sign-in. Public registration is disabled; no fake authentication.
2. **Dashboard - Planned:** list authenticated user's projects from persisted data. UI preview fixtures must be clearly labelled and must not appear as saved records.
3. **Project creation and details - Planned:** allow a user to create and view a project with structured requirements.
4. **Lifecycle - Planned:** display and update only validated request states; server assigns and enforces the individual `owner_user_id` for every protected read and write.
5. **Approval - Planned:** show the exact specification version and record an authorized decision, actor, timestamp, and content hash.
6. **Activity - Planned:** show persisted lifecycle/audit activity. Do not imply AI execution, code generation, or success when no such work occurred.
7. **Cancellation and errors - Planned:** handle cancellation safely and return structured, redacted API errors with correlation IDs.
8. **Persistence and cost - Planned:** persist identity references, projects, requests/tasks, approvals, and audit events. Pause before unapproved billable usage under the strict INR 0 target.

M1 makes no AI model calls, configures no AI provider, executes no generated code, allows no unrestricted public registration, and has no production deployment.

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

## Decisions and verification still needed
The intended India data region, invite-only authentication, and real core-record persistence are Founder Approved; their account-level capability and setup still require verification. The Next.js/TypeScript/Tailwind and Catalyst service choices are proposed defaults. Remaining product decisions include the first validated customer segment and project category, retention/export/deletion details, future generated-code sandbox, exact usage ceilings, and release evidence. Proposed M1 acceptance criteria are in PROJECT_MASTER.md; none are implemented or tested yet.
