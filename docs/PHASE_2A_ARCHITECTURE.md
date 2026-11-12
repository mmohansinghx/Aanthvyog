# Phase 2A — Backend Architecture

**Status:** In Design — documentation-only blueprint, 2026-11-12
**Implementation status:** Not implemented, not tested, no Catalyst account/project configured.
**Authority:** This document defines the proposed component architecture. Account-dependent statements remain unverified. The attached Phase 2A prompt ended mid quality-gate list; this blueprint completes the explicit requirements and uses conservative inferred review gates.

## Scope and decision status

Founder-approved requirements remain: intended India region, real invite-only authentication, persistent core records, and INR 0 target. They do not establish provider configuration or authorize remote initialization, deployment, payment setup, or overage.

| Decision | State after this design review |
|---|---|
| Next.js App Router, TypeScript, Tailwind | Implemented in the local-only preview. Slate hosting remains a proposal pending account/runtime/cost checks. |
| Catalyst Functions, Node.js 24 | Proposed. Current public docs list Node 24 and Node 22 for Functions; no project or function exists. |
| Catalyst Authentication, invite-only | Founder-approved requirement. Public docs describe admin invitations, password setup/reset, and public signup disabled by default. Account configuration, invitation expiry/revocation, and API session-verification path remain unverified. |
| Catalyst Data Store | Proposed. Public docs describe relational tables, foreign keys, and CRUD/ZCQL. Required concurrency/transaction properties are not verified for this design. |
| Modular Catalyst JavaScript SDK | Preferred SDK direction for evaluation because Catalyst announced it as the replacement for the Node.js v2 and Web v4 SDKs. Exact module packages, Function runtime compatibility, auth-context behavior, and version remain unverified. Do not add a dependency until those checks pass. |
| AppSail, Stratus, AI/model providers | Excluded from this phase. Reconsider only on a documented need and separate approval. |

## Product and execution boundary

The product intent is to turn a user's software goal into a reviewed specification and delivery. Phase 2A defines the process; it does not operate agents. Architect, Engineer, and QA & Delivery are future workflow roles, not connected AI systems. No model call, code generation, code execution, task worker, live activity stream, or successful task is claimed.

### Requirement processing pipeline

1. **Intake:** capture the desired outcome, project category, target users, pages/features, constraints, references, required data, integrations, and success criteria. Preserve the user's original wording separately from normalized fields.
2. **Clarification:** identify missing or conflicting requirements. Ask before locking a specification when a decision affects data sensitivity, identity/roles, external systems, billing, ownership, deployment, compliance, destructive behavior, or acceptance. Label non-blocking assumptions and obtain user confirmation for them in the specification.
3. **Structured requirements:** validate a versioned JSON contract with an allowlisted category, bounded text/arrays, explicit unknowns, assumptions, exclusions, and acceptance criteria. Input validation is documented in the API contract.
4. **Technical specification:** Architect role maps each requirement to a proposed architecture, data entities, API surface, security/privacy impact, dependency/service choices, cost risks, and testable criteria. Each decision is marked Proposed, Founder Approved, Technically Verified, Implemented, or Tested with evidence.
5. **Implementation plan:** break approved scope into small tasks with dependencies, owners/roles, measurable outcomes, risk and cost gates, and rollback/recovery notes. No task starts before its required approval.
6. **Approval checkpoint:** persist an immutable specification version and canonical content hash; record the owner's decision against the exact version/hash. A changed specification requires a new version and new approval.
7. **Engineer handoff:** Engineer receives only the approved version, bounded task, non-secret configuration references, allowed tools, isolated workspace, and resource ceiling. No arbitrary host access or unrestricted shell/network access is designed.
8. **Independent QA:** QA & Delivery receives acceptance criteria plus a read-only candidate revision and executes independently recorded checks. Findings return as bounded defects; QA cannot silently alter the candidate or approve its own work.
9. **Delivery:** provide source/revision, requirements/specification versions, test evidence, setup instructions, known limits, dependency inventory, data/export instructions, and safe handover. User acceptance and any deployment are separate gates.

Before specification, the product should ask about: primary outcome; audience; project type; required pages and user flows; roles and access rules; data/entities and sensitivity; integrations and who owns their credentials; preferred stack only when material; visual identity/assets; accessibility/browser targets; performance/availability needs; region/legal constraints; deployment/account ownership; timeline; budget/usage ceilings; acceptance examples; and explicitly excluded work. It must not request passwords, API secrets, payment data, or sensitive personal data in project prompts.

## Logical component architecture

~~~mermaid
flowchart LR
  U[User browser] --> W[Next.js App Router on Slate, if later approved]
  W -->|sign-in via supported browser SDK| A[Catalyst Authentication]
  W -->|versioned HTTPS API, verified user session| F[Catalyst Functions, Node.js]
  F --> I[Identity adapter: verify caller, map provider subject]
  I --> Z[Authorization service: derive owner and check parent]
  Z --> D[Data repository adapter]
  D --> DS[Catalyst Data Store]
  F --> V[Request validation and domain services]
  V --> S[State transition service]
  S --> AP[Specification and approval service]
  V --> AU[Append-oriented audit writer]
  V --> UC[Usage ceiling and pause gate]
  F --> E[Safe error mapper and correlation ID]
  QA[Independent QA role] -. read-only candidate + evidence .-> F
  X[AI/model execution] -. excluded from M1 and Phase 2A .-> V
~~~

The diagram is logical, not proof that an account or deployment exists. Exact Slate-to-Functions routing, authenticated request context, CORS, cookie/token handling, and Data Store scopes must be tested in a separately approved non-production environment before this design becomes implementation.

### Trust and communication model

- The browser is untrusted. It may submit identifiers, state requests, content, hashes, and expected versions, but none grants authority.
- Catalyst Authentication (or another founder-approved identity provider) is the identity authority. The application must use its supported browser-side sign-in and recovery path. Catalyst public documentation says sign-in is client-side; it does not justify a homemade auth form or server-side trust in browser claims.
- Functions are the only proposed application data API. They must reject missing, invalid, expired, or wrong-project sessions and derive the provider subject from verified provider context. They must fail closed if SDK initialization returns an admin context where an end-user context was required.
- The identity adapter maps provider plus opaque subject to an internal app user ID. No email address is needed for authorization.
- The authorization service loads the parent project and checks its server-derived owner on every protected operation. It then checks the requested child record belongs to that same project and owner. A row ID, Catalyst role, table scope, frontend filter, or client-supplied owner is insufficient.
- The Data Store adapter is server-only. No browser Data Store access is proposed. Catalyst table scopes/permissions are defense in depth, not the owner boundary.
- The API is versioned at /api/v1, uses TLS, strict request schemas, bounded requests, idempotency for mutations, optimistic versions, correlation IDs, stable errors, and redacted logs.
- Until routing/session behavior is proven, direct browser-to-Function calls with provider-managed session headers are a proposed path. If the current SDK/runtime cannot securely validate that path, stop and evaluate a same-origin server proxy; do not improvise token storage or trust unsigned claims. Slate server-side Next.js routing may introduce additional compute/cost and must be separately evaluated.

### Authentication and invite flow

1. A named administrator adds a user through the Catalyst Authentication admin path after the actual account is reviewed; public signup stays disabled.
2. Catalyst's published docs describe an invitation email and password setup flow, plus admin-triggered password reset. Treat invite validity period, revocation semantics, rate limits, and automated email costs as unverified until confirmed.
3. The user completes provider-controlled setup and signs in through the official browser SDK. No fake local authentication exists.
4. Every protected Function validates the request's provider session and resolves the identity. A missing/invalid identity returns the safe authentication error; the Function never silently falls back to project-admin context.
5. Account recovery stays in the supported provider flow. Any application-specific recovery or invitation UI must not reveal whether an account exists.

The exact current Catalyst JavaScript SDK integration and Function identity context is a pre-implementation spike gate. Older Node.js v2 and Web v4 SDKs are now in deprecation according to Catalyst release notes, so do not start from stale examples without verifying the replacement SDK.

## Domain and API boundaries

The normalized model comprises minimal app-user identity references, projects, project requests, immutable specification versions, tasks, task dependencies, task attempts, approvals, audit events, artifact metadata, usage records, and operator-only system configuration. All project-scoped rows carry owner_user_id and a project foreign key. Detailed field types, limits, relationships, and verification gaps are in [Phase 2A Database Design](PHASE_2A_DATABASE_DESIGN.md).

The API contract is the sole public application boundary. Domain services perform: parse/validate; authenticate; resolve internal user; verify project/child ownership; enforce lifecycle/version/hash; perform persistence; write audit evidence; return a redacted result. No public route performs arbitrary database queries or dispatches generated code. Endpoint-specific contracts are in [Phase 2A API Contracts](PHASE_2A_API_CONTRACTS.md).

### Error handling and audit

Return a stable envelope with machine-readable code, generic safe message, correlation ID, and allowlisted sanitized field errors. Map validation, auth, forbidden/not-found, conflict/stale version, rate limit, provider unavailable, and unexpected errors consistently. Never include stack traces, SQL/ZCQL, access tokens, invitation links, credentials, raw provider messages, or another user's record existence.

Audit records capture actor, action, entity, old/new state where appropriate, specification/version/hash references, timestamp, correlation ID, safe reason code, and result. Use append-only application APIs and an event hash chain as tamper-evidence only. Catalyst admins or a privileged service could still rewrite provider rows; this design does not claim immutable/tamper-proof audit storage. Transactional consistency between domain writes and audit records is a release blocker until verified.

## Technology evaluation

| Choice | Evidence and fit | Limit / decision |
|---|---|---|
| Next.js App Router + TypeScript + Tailwind | Already present in local frontend; app build and local checks previously passed. Slate public docs list Next.js as natively supported and describe Next.js memory settings. | Slate deployment, India availability, SSR behavior, build/runtime versions, route behavior, quotas, pricing, and secret management are unverified in the actual account. |
| Catalyst Functions, Node.js | Official public docs list Node 24 and Node 22 as supported Function runtimes. Functions align with current functions-first proposal and avoid introducing a long-running service. | Function runtime limits, cold starts, body/time/concurrency ceilings, request auth context and exact India component availability must be verified. No AppSail need has been established. |
| Catalyst Authentication | Public docs support admin-managed users/invites/password setup/reset and document public signup disabled by default. | Current auth SDK is a newly announced modular JS SDK; exact invite-only/session flow, expiration, error behavior, and current project limits require an account-backed spike. |
| Catalyst Data Store | Public docs describe relational tables, ROWID, basic column types, foreign keys and ZCQL. | 100 columns/table default; Text max 10,000 characters; Var Char max 255; some mutation query result sets capped at 300 rows; up to four joins in a ZCQL query. Transaction/CAS/isolation guarantees needed by the lifecycle are not established by the reviewed docs. |
| Node.js SDK v2 / Web SDK v4 | Existing docs/tutorials remain available. | Catalyst release notes place them in deprecation from 2026-10-01 and end support on 2027-10-01. Do not choose for new code if modular JavaScript SDK covers the feature. |
| Catalyst modular JavaScript SDK | Officially generally available and described as a single TypeScript-capable SDK for browser and server, replacing old Node.js/Web SDKs. | Exact component package/version, supported Node 24 Functions packaging, Next bundling, auth-context semantics, and peer/runtime compatibility remain to test. No dependency added in this phase. |
| AppSail | Could host a long-running/custom Node service if a real capability gap appears. | Excluded in M1; adds another runtime and billing surface without a demonstrated requirement. |
| Data Store vs another database | Data Store is the proposed Catalyst-native relational option. | If atomic conditional writes, multi-row transactions, required indexes, or uniqueness cannot be proven, pause provider adoption and present alternatives. Do not silently add another provider or paid service. |

Public documentation sources and limitations are recorded in the cost/dependency review. Public docs verify feature descriptions only; they do not verify account setup or contractual data residency.

## Future execution roles and department responsibilities

The following are responsibility boundaries for future work, not 15 running agents or staffed departments. The three product execution roles exchange versioned, auditable artifacts.

| Function | Architecture/design responsibility | Boundary / output |
|---|---|---|
| CEO & Strategic Planning | Own product outcomes, milestone priorities, risk appetite, and founder decision log. | No technical approval is inferred; escalates material business choices to founder. |
| CTO & System Architecture | Own architecture tradeoffs, trust boundaries, ADRs, and technical verification register. | Produces reviewable architecture; cannot approve paid use or account changes. |
| Product Management | Own intake schema, clarifying questions, lifecycle requirements, and acceptance traceability. | Produces versioned product spec; assumptions remain labelled. |
| Frontend Engineering | Define accessible, responsive client contracts and demo/persisted separation. | Browser cannot establish authorization or expose secrets. |
| Backend Engineering | Define validated API/domain boundaries, owner checks, persistence adapter, safe errors. | No remote implementation in Phase 2A; no privileged raw data access. |
| AI Engineering | Define future model boundary, provider evaluation inputs, prompt/data minimization, and no-execution rules. | No provider configured, model called, or agent operational in M1/Phase 2A. |
| UI/UX Design | Define user flows, clear approval/uncertainty states, accessible error/loading/empty states. | No visual state may imply persistence or execution that did not occur. |
| Quality Assurance | Define independent tests and evidence bar; review contracts and state edges. | Read-only candidate, independent results, no self-approval. |
| Cybersecurity | Threat-model auth, tenant isolation, validation, secrets, abuse, and incident controls. | Findings remain open until tested and dispositioned. |
| DevOps & Infrastructure | Define local/dev/test/prod separation, reproducible builds, secrets, backups, monitoring, pause switches. | No environment created or deployment performed in this phase. |
| Finance & Cost Control | Inventory billable meters, shared quota, thresholds, and spend gates. | INR 0 is a hard gate; no paid action or overage. |
| Legal & Compliance Coordination | Track privacy notice, retention, export/deletion, jurisdiction and review questions. | Qualified counsel answers legal interpretation; no legal compliance claim. |
| Marketing & Brand | Define accurate, evidence-backed positioning and brand assets. | No claim of operational AI, unlimited free generation, or supported platform matrix. |
| Sales & Partnerships | Define future qualification and product handover information. | No outreach, partnership, or paid commitment. |
| Customer Success & Analytics | Define invite onboarding, error reporting, support escalation, delivery and usage metrics. | Minimize analytics and personal data; no tracking integration in this phase. |

**Architect role contract:** input = user request, unknowns, constraints; output = structured requirements, ADR/spec versions, task graph, threat/cost notes and acceptance mapping. It cannot modify code, approve the spec for the user, access secrets, or initiate paid operations.

**Engineer role contract:** input = exact approved spec hash, assigned task, isolated workspace, allowlisted tools and resource limits; output = source diff, dependency changes, test logs, migration/API docs and known limits. It cannot read unrestricted host files, access unrelated projects/secrets, deploy, change auth/billing, or self-approve.

**QA & Delivery role contract:** input = immutable acceptance set and candidate revision; output = independent test evidence, defect list, security findings, release recommendation and handover inventory. It must not infer success from generated logs, alter the candidate without a tracked finding/fix, or publish/deploy.

## Architecture acceptance gates

Before backend implementation: (1) actual Zoho account/DC confirms India and service availability; (2) Catalyst support statement covers data processing/storage/backup questions; (3) invite-only auth, password recovery, revocation/expiry behavior and server-verifiable Function context pass a proof; (4) modular SDK package/runtime and Slate/Next SSR compatibility pass local/account tests; (5) Data Store schema, index, referential behavior, atomic compare-and-set, multi-write transaction/audit strategy, paging and deletion behavior pass experiments; (6) owner isolation has adversarial tests; (7) quota/billing state and kill switch can satisfy the INR 0 gate without payment method/overage; (8) founder approves the detailed provider/initialization plan separately. Until then all provider integration states are UNVERIFIED or PROPOSED.

## Sources

- [Catalyst JavaScript SDK announcement](https://docs.catalyst.zoho.com/en/announcements/2026/js-sdk-launch/)
- [Catalyst SDK release notes](https://docs.catalyst.zoho.com/en/release-notes/sdk/)
- [Catalyst Functions runtimes](https://docs.catalyst.zoho.com/en/serverless/help/functions/stack/)
- [Catalyst Slate framework support](https://docs.catalyst.zoho.com/en/slate/)
- [Catalyst Data Store overview](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/introduction/)
- [Catalyst Data Store columns and types](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/columns/)
- [Catalyst Authentication and user management](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/introduction/)
- [Catalyst India data-center domains](https://docs.catalyst.zoho.com/en/api/introduction/multi-dc-support/)
- [Catalyst data residency FAQ](https://docs.catalyst.zoho.com/en/faq/general/)
