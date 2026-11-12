# Project master

**Status:** In Development — local frontend preview
**Last inspected:** 2026-11-12

## Project state at inspection
At the start of the local implementation authorization, `main` and `origin/main` both pointed to `55586d6475b4120d8a43b73be16dd587ebd282be`; the checkout was clean. That revision had no application source, package manifest, lockfile, app tests, `catalyst.json`, or `.catalystrc`. The current local tree now has an `apps/web` Next.js frontend, exact dependency lockfile, and local unit/component tests. This records local state; consult Git status and the current remote separately to determine what is committed or pushed.

The local frontend production build and local unit/component tests have been run. No Catalyst service or project has been configured, and none of the three AI agents is operational. The founder approved the intended India region, invite-only authentication, and persistent core records on 2026-11-12. Actual account-region/service compatibility remains to be verified. The frontend preview does not implement real authentication, server APIs, persistence, ownership enforcement, audit storage, approvals, cancellation, export, or deletion.

## Mission and product
AANTVYOG's tagline is "Intelligence. United." The intended first product is an AI Website & Web Application Builder for business sites, portfolio sites, college and education sites, admin dashboards, SaaS web applications, CRUD applications, authentication-based applications, and database-driven applications. This is an initial target list, not a verified support matrix.

The planned three-agent workflow is Architect -> Engineer -> QA & Delivery, with structured handoffs and user approval before implementation. The system must use bounded execution, isolated workspaces, explicit usage limits, cancellation, independent QA, and auditable states.

## Scope of this foundation
- Record the functional organization model and authority boundaries.
- Define the three proposed agents and their coordination contract.
- Establish product, architecture, security, engineering, research, marketing, and financial documentation.
- Record unknown decisions without converting them into assumptions or claims.
- Define the first product development milestone and track its implementation status.
- Implement the founder-authorized local M1 frontend preview while keeping the backend and connected services clearly unimplemented.

## Status conventions
- **Decision register:** Proposed, Founder Approved, Technically Verified, Implemented, Tested. These states describe different evidence: founder approval records intent; technical verification checks provider/account capability; implementation requires working code/configuration; testing requires recorded results. Do not infer later states from earlier ones.
- **Product features:** Planned, In Design, In Development, Implemented, Tested, Released. Feature status describes delivered evidence; Released requires release evidence.
- Local UI implementation and test evidence are listed below; these do not satisfy the secure, persisted M1 acceptance criteria.

## First development milestone
**M1 - Secure project and request lifecycle.** The founder authorized local-only frontend implementation on 2026-11-12. This does not authorize Catalyst initialization or remote/paid services.

Goal: establish the smallest real platform foundation that accepts a user project request, persists it under the correct owner, exposes its lifecycle, and pauses at explicit approval before agent implementation. This milestone does not include live model calls or generated-code execution.

Deliverables and current evidence:

| M1 item | Current status | Evidence / limit |
|---|---|---|
| Responsive landing page | Implemented and tested locally | `apps/web/src/app/page.tsx`; Next.js build succeeds. |
| Dashboard | Implemented and tested locally | `apps/web/src/app/dashboard/page.tsx`; static examples labelled. |
| Project request creation UI and structured requirements | Implemented and tested as a browser-only preview | Client validation and a temporary summary; it does not submit or persist. |
| Project workspace and status display | Implemented and tested locally | Static fixture, sample stage tracker, no live state transitions. |
| Approval interface | Implemented and tested locally | Buttons are disabled; no approval record is made. |
| Activity / agent activity interface | Implemented and tested locally | Static example events and an empty “not connected” agent state; no agents run. |
| Authenticated dashboard, API, persistence, ownership checks, lifecycle enforcement, approvals and audit records | Not implemented or tested | Catalyst is not initialized; there is no server/data service. |
| Export, deletion, billing guard, safe cancellation and independent backend QA | Not implemented or tested | Remain future M1 acceptance work. |

M1 excludes live model calls, provider configuration, generated-code execution, unrestricted public registration, production deployment, and unapproved billable activity. Any UI fixtures must be explicitly labelled demo data and kept distinct from persisted records.

Real M1 acceptance criteria (not yet implemented or tested):
- An invited authenticated user can create a project request; unrestricted public signup is disabled.
- A request has a server-assigned owner, validated lifecycle state, timestamps, and audit events.
- Every read/write checks the authenticated owner server-side; cross-owner access fails safely.
- A state change is accepted only when allowed by the lifecycle rules and current version.
- Approval records identify the exact immutable specification version/hash, actor, and timestamp.
- Cancellation prevents future work from starting and records the actor/reason; M1 has no live agent execution to fake.
- Errors are structured, safe, and correlated without exposing secrets or internal traces.
- Usage ceilings pause work before an unapproved billable operation; target operating cost remains INR 0.
- QA evidence traces each criterion to an independently reviewed check.

The three core decisions (India region, invite-only real authentication, and real persistence) are Founder Approved; their account-level and technical conditions remain open. The local frontend baseline is authorized and implemented only as a fixture-based preview. M1 as a secure, persisted lifecycle is not complete. Catalyst initialization requires separate explicit permission.

The initial environment and coding blueprint are recorded in [M1 Technical Preflight](M1_TECHNICAL_PREFLIGHT.md). The founder later authorized a checksum-verified side-by-side Node 24.22.3 runtime and local frontend dependencies; the system Node and machine-wide PATH were not changed. Catalyst initialization, database creation, and deployment remain unauthorized.

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

## Phase 2A backend architecture status

Phase 2A has a documentation-only backend blueprint in the nine [Phase 2A design documents](PHASE_2A_ARCHITECTURE.md). It defines proposed Functions-first components, ownership and API boundaries, a normalized 12-entity schema, strict task transitions, specification-hash approvals, threat model, independent QA and a cost-gated roadmap. No backend code, Catalyst CLI, project, account configuration, table, invitation, deployment or new dependency was created in this phase. Nothing in this design is marked Implemented or Tested.

Public Catalyst documentation confirms that India is a listed data center, Functions list Node 24/22, Slate lists Next.js, Data Store documents relational tables/foreign keys, and admin invitations/public-signup controls exist. This is public-doc verification only; actual account region, per-component availability, invite expiry/session verification, SDK compatibility and quotas remain unverified. The modular Catalyst JavaScript SDK is now the preferred evaluation path because the older Node/Web SDKs are in deprecation. Data Store transaction, atomic conditional update, and audit consistency needed for approval/lifecycle writes are not proven by the reviewed documentation; this is a blocking implementation gate.

The INR 0 goal cannot be guaranteed by application throttles alone because Catalyst documents shared account quotas and chargeable overage/minimum billing risk. No Catalyst use should occur unless account billing/usage is reviewed and the founder separately authorizes it. See [Phase 2A Cost and Dependency Review](PHASE_2A_COST_AND_DEPENDENCY_REVIEW.md) and the [Implementation Roadmap](PHASE_2A_IMPLEMENTATION_ROADMAP.md). The Phase 2A source prompt attachment ended mid quality-gate list; the recorded review gates complete its explicit scope conservatively.
