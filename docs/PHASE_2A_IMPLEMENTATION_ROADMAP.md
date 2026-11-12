# Phase 2A — Implementation Roadmap

**Status:** In Design — proposed sequence only, 2026-11-12
**Phase 2A activity:** Architecture and documentation; no code, Catalyst resources, account changes, dependency installs or deployments.

## Current baseline

- Local branch is main at commit 9b5ae703fb597822d2de544522930aa1fe6f7548; that commit remains one commit ahead of origin/main because GitHub write authentication was unavailable during the prior publication attempt. This phase does not push or change remote history.
- The local Next.js/TypeScript/Tailwind preview and six frontend tests are present and must be preserved. Its fixtures are not persisted and it has no real authentication, ownership control, backend API or operational agents.
- Founder-approved requirements: intended India region, real invite-only authentication, real core-record persistence and INR 0 target. Account/DC, billing, service and technical conditions remain account-dependent or unverified.
- Current public docs list Catalyst Functions Node 24/22, Catalyst Data Store relational CRUD/FKs/ZCQL, admin invites with public signup disabled by default, and native Next.js support in Slate. They also describe shared quota/overage and minimum-billing risks. These are not evidence that this account is configured or safely free.
- Current Catalyst release notes place the older Node and Web SDKs in deprecation and announce a modular JavaScript SDK. Exact SDK/auth/runtime compatibility must be proven before dependency selection.
- A Data Store proof must establish the transactions/conditional writes, uniqueness races, indexes and deletion/export behavior required for approvals and audit; public docs reviewed here do not establish the required atomic guarantees.

## Phase 2A exit criteria

1. Architecture, identity/ownership, normalized schema, API contracts, lifecycle, approval/hash rules, threat model, QA, cost and implementation sequence have authoritative documents.
2. Cross-document state names, entity fields, paths, ownership, approval hash and error/idempotency rules agree.
3. Every protected API documents server-side project and child ownership checks.
4. All unknown provider/account facts are marked UNVERIFIED; no unverified transaction/auth guarantee is used as a design fact.
5. Existing local frontend/docs remain intact; no external service or paid action has occurred.
6. Founder receives open risks and exact gates before authorizing any backend implementation.

Phase 2A completion means the blueprint passed document review only. It does not mean any backend feature is implemented, tested, secure, or released.

## Proposed phases after Phase 2A

### Gate 0 — Founder review

Review this architecture and select/modify the proposed entity contracts, request size limits, canonical hash format, retention/export/deletion policy, role boundaries, cost ceiling and API contract. Decide whether the provider's missing transaction guarantees are acceptable to investigate and agree on a stop condition. No code or external action is implied by this roadmap.

### Phase 2B — Local domain contract prototype (requires separate implementation scope)

If separately authorized, implement provider-neutral TypeScript request schemas, state transition pure functions, ownership service interfaces, error schemas, idempotency contract and canonical hash test vectors. Use an explicitly named in-memory test adapter only for unit tests; the product UI must never present it as persistence/authentication. Add adversarial unit/contract tests. Do not add Catalyst SDK or remote services in this phase.

Exit: all domain state edges, input boundaries and hash vectors are tested locally; API/schema documents are generated/checked; local preview still identifies demo mode. This does not satisfy real-persistence or real-authentication requirements.

### Gate 1 — Provider/account qualification (requires separate explicit founder approval)

Before initialization/login/use, review actual Zoho account sign-in/API domain to confirm India; verify Authentication, Functions, Data Store and Slate availability in that DC; request a written component-level processing/storage/backup statement; review billing mode/current shared quotas/other projects and confirm zero-spend operation without entering a payment method. Verify Dev user limits, invites, recovery, expiry/revocation, session transport, CORS and current SDK. No remote account/project operation until permitted.

Exit: evidence log with account-region source, component availability, billing state, quota baseline, terms, invite/auth proof plan, and unresolved issues. If INR 0 cannot be defended, stop at local-only work.

### Gate 2 — Catalyst technical proof (requires explicit project initialization approval)

Only after Gate 1 and explicit permission: install/verify current CLI in approved local scope; log in; create a non-production Development project in the verified India DC; initialize resources using official CLI; no production deployment or payment setup. Check exact modular JS SDK package/version/licence/runtime. Build a throwaway synthetic-only proof for session identity, Function authorization, Data Store row ownership predicates, unique constraints, conditional updates/transactions, audit consistency, page/query limits, export/deletion, logs, and disable controls. Observe usage before/during/after each test.

Exit: repeatable test evidence and cost report. A transaction/CAS or identity gap blocks the provider or requires a revised architecture and founder decision. Do not switch to AppSail or another database without an ADR and approval.

### Phase 2C — Real authentication, persistence and API implementation (separate scope approval)

After Gate 2 passes: implement admin invite-only setup with public signup disabled; use provider session verification and server-side app-user mapping; implement owner-checked repository/domain/API; versioned persistence tables/migrations; validation and safe errors; approval/hash and lifecycle transitions; cancellation; append-oriented audit; export/deletion; internal usage gate and operator kill switch. Keep all AI and generated execution disabled. No demo fixture may be returned from real API routes.

Incremental slices: (1) identity/health and safe errors; (2) project ownership CRUD; (3) request validation/submission; (4) immutable specification versions; (5) approval/rejection/revocation; (6) task state and safe cancellation; (7) activity/audit/export/deletion; (8) usage pause/abuse controls. Each slice needs QA evidence before the next expands exposure.

### Gate 3 — Independent validation and founder review

Run unit, contract, integration, security, concurrency, accessibility, responsive, export/deletion and cost tests with isolated synthetic accounts. Verify region, quotas, billing state, backup/deletion statements, recovery, restore, error redaction, accessibility target and release evidence. QA reports separately from Engineering. Founder reviews open defects and decides whether to proceed. This gate does not authorize production.

### Later release stage — separately approved

Only a distinct founder approval may authorize any external preview/production deployment, custom domain, payment method, paid component, chargeable usage, live model/provider, code execution, public registration, external partnership or customer data import. The founder-approved INR 0 target remains the default.

## Cross-functional review owners

Strategic priority/risks: CEO & Strategic Planning; technical alternatives and account proof: CTO & System Architecture; requirements/approval UX: Product Management and UI/UX; interface contracts: Frontend Engineering; Functions/schema/auth: Backend Engineering; future model boundary only: AI Engineering; independent test/evidence: QA; threat controls: Cybersecurity; environment/backup/kill-switch: DevOps; meter review: Finance; privacy/legal questions: qualified counsel coordinated through Legal; accurate claims: Marketing; no paid commitment: Sales; onboarding/handover/support: Customer Success. These are future responsibility assignments, not staffed/operational agents.

## Go/no-go checklist

No implementation or remote service activation proceeds unless all are true: relevant scope is authorized; exact account/DC and components verified; credentials/session approach reviewed; Data Store atomicity/consistency supports the lifecycle; owner isolation is testable; current SDK/license/runtime reviewed; retention/export/deletion is defined; zero-spend/quota status is known with a working pause; synthetic test plan exists; API/data docs match; and founder approvals cover any external operation. A single unknown affecting identity, data isolation, atomic approvals, deletion or cost is a no-go for that capability.

## Companion documents

[Architecture](PHASE_2A_ARCHITECTURE.md), [database](PHASE_2A_DATABASE_DESIGN.md), [API](PHASE_2A_API_CONTRACTS.md), [security](PHASE_2A_SECURITY_THREAT_MODEL.md), [lifecycle](PHASE_2A_TASK_LIFECYCLE.md), [approval](PHASE_2A_APPROVAL_DESIGN.md), [QA](PHASE_2A_QA_STRATEGY.md), [cost/dependencies](PHASE_2A_COST_AND_DEPENDENCY_REVIEW.md).
