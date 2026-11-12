# Project master

**Status:** In Design
**Last inspected:** 2026-11-12

## Project state at inspection
At the initial task workspace inspection, the active folder contained only `outputs` and `work`, with no source code, dependency manifest, tests, or project docs. After the repository URL was provided, the public repository [mmohansinghx/Aanthvyog](https://github.com/mmohansinghx/Aanthvyog) was inspected and found empty; `git ls-remote --heads` returned no branch refs. A local clone is now at `work/Aanthvyog`, with this documentation package copied as uncommitted files. No remote write has been made.

These documents describe proposals and policies. No application has been built, no external service has been configured, and none of the three AI agents is operational. No tests or builds were run because no application exists.

## Mission and product
AANTVYOG's tagline is "Intelligence. United." The intended first product is an AI Website & Web Application Builder for business sites, portfolio sites, college and education sites, admin dashboards, SaaS web applications, CRUD applications, authentication-based applications, and database-driven applications. This is an initial target list, not a verified support matrix.

The planned three-agent workflow is Architect -> Engineer -> QA & Delivery, with structured handoffs and user approval before implementation. The system must use bounded execution, isolated workspaces, explicit usage limits, cancellation, independent QA, and auditable states.

## Scope of this foundation
- Record the functional organization model and authority boundaries.
- Define the three proposed agents and their coordination contract.
- Establish product, architecture, security, engineering, research, marketing, and financial documentation.
- Record unknown decisions without converting them into assumptions or claims.
- Propose a first product development milestone for founder review.

## Status convention
Use only: Planned, In Design, In Development, Implemented, Tested, Released. Status describes evidence, not aspiration. A document being written does not make a product feature implemented. Released requires release evidence.

## Proposed first development milestone
**M1 - Secure project and request lifecycle (proposal; approval required before implementation).**

Goal: establish the smallest real platform foundation that accepts a user project request, persists it under the correct owner, exposes its lifecycle, and pauses at explicit approval before agent implementation. This milestone does not include live model calls or generated-code execution.

Proposed deliverables:
1. Approved repository location and source-control workflow.
2. Approved application and service architecture, identity model, data region, and local development approach.
3. A typed project/request lifecycle contract and server-side ownership checks.
4. A minimal responsive product shell for creating and reviewing a project request.
5. Durable task and approval records, structured audit events, and cancellation behavior.
6. Validation, authorization, and lifecycle checks with independent QA evidence.
7. Setup, security, API, data, and operator documentation.

Proposed acceptance criteria:
- An authenticated user can create and view only their own project records.
- Invalid input is rejected on the server with a safe, structured error.
- Each request has a documented state, owner, timestamps, and audit trail.
- The request cannot proceed to implementation before a recorded user/founder approval.
- Cancellation and failure produce terminal states and useful logs without leaking secrets.
- No provider is called, no generated code is executed, and no production environment is used.
- QA evidence traces each acceptance criterion to an independently reviewed check.

The exact service stack and persistence cannot be finalized until open decisions are resolved. M1 is a proposal, not approved implementation work.

## Open founder decisions
1. Which user segment and project category should anchor the first validated MVP?
2. What is the initial repository location and source-control ownership?
3. Is Next.js, TypeScript, and Tailwind the approved frontend baseline?
4. Is Zoho Catalyst the approved backend, identity, data, and storage platform, and which deployment region/data-residency constraints apply?
5. What is the account model (individual, organization, workspace) and how are roles assigned?
6. What data may be retained, for how long, and how should users export or delete projects?
7. What is the permitted local development and test identity strategy?
8. What sandbox model will isolate generated project files and any future execution?
9. What human approval is required for each implementation run, file operation, dependency, and external action?
10. What budget and usage ceilings should constrain model calls and infrastructure when a provider is eventually evaluated?
11. Which accessibility, browser support, availability, recovery, and support targets apply?
12. What evidence is required before an internal prototype, user pilot, or public release?

## Risks
- Selecting services before customer, security, data-location, and cost requirements are known can cause rework.
- A code-generation product can expose host, tenant, secrets, or user data if isolation and tool permissions are weak.
- Model output is nondeterministic; QA must be independent and release evidence recorded.
- Market demand, competitor capabilities, willingness to pay, and operating costs have not been researched or validated in this task.

## Approval record
No founder approval for a technology, provider, paid service, production deployment, or M1 implementation is recorded in this package.
