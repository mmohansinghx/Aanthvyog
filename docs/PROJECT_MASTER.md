# Project master

**Status:** In Design
**Last inspected:** 2026-11-12

## Project state at inspection
The repository review confirmed that commit `18c5f24` is present in the local clone and GitHub `origin/main`. The repository contains documentation, but no application source, package manifest, lockfile, tests, `catalyst.json`, or `.catalystrc`. The working tree was clean at the start of this update. Record any changes from this review with Git status and the changelog; do not infer implementation from documentation.

No application has been built, no Catalyst service or project has been configured, and none of the three AI agents is operational. The founder approved the intended India region, invite-only authentication, and persistent core records on 2026-11-12. Actual account-region/service compatibility remains to be verified. No tests or builds were run because no application exists.

## Mission and product
AANTVYOG's tagline is "Intelligence. United." The intended first product is an AI Website & Web Application Builder for business sites, portfolio sites, college and education sites, admin dashboards, SaaS web applications, CRUD applications, authentication-based applications, and database-driven applications. This is an initial target list, not a verified support matrix.

The planned three-agent workflow is Architect -> Engineer -> QA & Delivery, with structured handoffs and user approval before implementation. The system must use bounded execution, isolated workspaces, explicit usage limits, cancellation, independent QA, and auditable states.

## Scope of this foundation
- Record the functional organization model and authority boundaries.
- Define the three proposed agents and their coordination contract.
- Establish product, architecture, security, engineering, research, marketing, and financial documentation.
- Record unknown decisions without converting them into assumptions or claims.
- Propose a first product development milestone for founder review.

## Status conventions
- **Decision register:** Proposed, Founder Approved, Technically Verified, Implemented, Tested. These states describe different evidence: founder approval records intent; technical verification checks provider/account capability; implementation requires working code/configuration; testing requires recorded results. Do not infer later states from earlier ones.
- **Product features:** Planned, In Design, In Development, Implemented, Tested, Released. Feature status describes delivered evidence; Released requires release evidence.
- No tests or implementation are claimed in this update.

## Proposed first development milestone
**M1 - Secure project and request lifecycle (scope proposal; no application implementation is authorized by the architecture decisions alone).**

Goal: establish the smallest real platform foundation that accepts a user project request, persists it under the correct owner, exposes its lifecycle, and pauses at explicit approval before agent implementation. This milestone does not include live model calls or generated-code execution.

Proposed deliverables:
1. A responsive landing page and authenticated dashboard.
2. Project creation and project details screens with structured project requirements and status tracking.
3. A specification review/approval screen and agent-activity interface that never implies AI work occurred when it did not.
4. Server-validated lifecycle APIs and real persistence for identity references, projects, requests/tasks, approvals, and audit events.
5. Per-project `owner_user_id` enforcement on every protected operation.
6. Safe cancellation and structured, redacted API errors.
7. Independent QA evidence and updated setup, security, API, data, and operator documentation.

M1 excludes live model calls, provider configuration, generated-code execution, unrestricted public registration, production deployment, and unapproved billable activity. Any UI fixtures must be explicitly labelled demo data and kept distinct from persisted records.

Acceptance criteria (not yet implemented or tested):
- An invited authenticated user can create a project request; unrestricted public signup is disabled.
- A request has a server-assigned owner, validated lifecycle state, timestamps, and audit events.
- Every read/write checks the authenticated owner server-side; cross-owner access fails safely.
- A state change is accepted only when allowed by the lifecycle rules and current version.
- Approval records identify the exact immutable specification version/hash, actor, and timestamp.
- Cancellation prevents future work from starting and records the actor/reason; M1 has no live agent execution to fake.
- Errors are structured, safe, and correlated without exposing secrets or internal traces.
- Usage ceilings pause work before an unapproved billable operation; target operating cost remains INR 0.
- QA evidence traces each criterion to an independently reviewed check.

Three architecture decisions are Founder Approved; their account-level and technical conditions remain open. The implementation baseline remains proposed. M1 is not implemented or tested, and Catalyst initialization requires separate explicit permission.

## Remaining decisions and verification
1. Confirm the account's India data center in the actual Zoho console and verify service availability. Obtain a written component-level data residency statement from Catalyst support if required.
2. Verify the exact invite-only authentication configuration, invitation expiry/invalid-link handling, recovery flow, and current development user limits in the account. No expiry guarantee is assumed.
3. Verify Catalyst Data Store field types, indexes, query/transaction/consistency behavior, row-level access implications, and export/deletion controls against the proposed schema.
4. Confirm Node.js and Catalyst CLI compatibility, then prepare local development configuration. Do not install global tools or initialize Catalyst without further explicit permission.
5. Define retention durations, export format/operation, account deletion workflow, audit retention, and provider-side/backups deletion behavior. Do not promise backup deletion until confirmed.
6. Choose initial customer segment, project category, generated-code sandbox design, approval granularity, accessibility/browser targets, and release evidence thresholds.
7. Define internal per-user/per-project usage ceilings and pause thresholds that prevent unapproved billable activity under an INR 0 target.

## Risks
- Selecting services before customer, security, data-location, and cost requirements are known can cause rework.
- A code-generation product can expose host, tenant, secrets, or user data if isolation and tool permissions are weak.
- Model output is nondeterministic; QA must be independent and release evidence recorded.
- Market demand, competitor capabilities, willingness to pay, and operating costs have not been researched or validated in this task.

## Approval record
On 2026-11-12, the founder approved (1) India as the intended data region, (2) real invite-only authentication, and (3) real persistence for core platform records. These approvals do not verify the actual account, initialize Catalyst, approve public registration, authorize paid usage, or claim implementation. See [DECISION_REGISTER.md](DECISION_REGISTER.md) for the evidence state. The other stack defaults are proposed pending technical verification; there is no approval for paid services, payment method entry, production deployment, live AI, or generated-code execution.
