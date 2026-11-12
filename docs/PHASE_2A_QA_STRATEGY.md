# Phase 2A — QA Strategy

**Status:** In Design — independent validation plan, 2026-11-12
**Execution status:** No backend QA, Catalyst integration test, or release test was executed in Phase 2A. The previous six passing tests cover local frontend preview behavior only.

## QA independence and evidence

QA & Delivery is a review role, not a live agent. QA derives tests from the approved requirement/specification and security contracts independently of implementation claims. QA should receive a read-only candidate revision, test environment with synthetic data, defined allowed commands, and acceptance trace. QA cannot approve its own implementation or change candidate source without a separately tracked finding/fix.

Every result records: requirement/test ID, source revision, environment/runtime, test data profile, exact command/procedure, expected and observed result, pass/fail/blocked/skipped, evidence location/hash, defect ID, tester/reviewer, and timestamp. A skipped or unconfigured test is never counted as passed. Redact credentials and personal data from captured evidence.

## Test layers

1. **Unit:** request schemas, canonicalization/hash vectors, ownership predicates, safe error mapping, state matrix, idempotency, quota pause rules and deletion planner.
2. **Contract:** OpenAPI/JSON schema or equivalent checks for all /api/v1 request/response/error shapes, unknown-field rejection, compatibility and stable error codes.
3. **Repository/provider integration:** Data Store mapping, foreign keys, unique behavior, paging, retry, compare-and-set/transactions, authentication context, invitation/recovery, audit write consistency. Requires isolated synthetic account and separate authorization; not available in this phase.
4. **Security:** anonymous/invalid/expired session, user isolation, spoofed owner/actor/state, IDOR, injection, CSRF/CORS, XSS, SSRF, abuse, secret/log redaction, privileged alteration limits and dependency review.
5. **End-to-end:** named admin invite -> password setup -> login -> create project/request -> submit -> specification version -> owner approval/rejection -> lifecycle/activity -> export -> deletion request. No AI/agent execution occurs in M1.
6. **Concurrency/resilience:** stale versions, duplicate/reordered mutations, simultaneous approvals, cancellation/start races, failed audit writes, provider 429/5xx/timeouts, retry exhaustion and account usage unknown.
7. **Frontend quality:** responsive layouts, keyboard and screen-reader semantics, error/empty/loading states, accurate mock-versus-persisted labels, supported browser matrix and no misleading agent-success UI.
8. **Cost/privacy operations:** usage gate, operator kill switch, zero-spend gate, retention, two-user export separation, deletion reconciliation, backup/restore evidence and privacy notice.

## Acceptance coverage matrix

| Area | Positive case | Negative/boundary/security cases | Required evidence |
|---|---|---|---|
| Authentication/invite-only | Invited named user completes provider setup and signs in. | Public signup remains disabled; unknown, disabled, invalid, expired, revoked, wrong-DC, missing and expired session are rejected safely; recovery does not enumerate accounts. | Actual account settings plus browser and API tests against the current SDK; expiry/revocation behavior explicitly observed. |
| Ownership / IDOR | Owner lists and reads owned project/request/spec/task/approval. | User B guesses User A IDs; nested record belongs to another project; client supplies owner/actor/admin role; forged ROWID. | For each protected endpoint and record class, B gets safe 404/deny and no data change; server-assigned owner inspected. |
| Project CRUD | Owner creates, updates, archives and requests deletion per policy. | Empty/oversized name, invalid category, stale ETag, archived mutation, DELETE replay, wrong owner and hard-delete attempt. | Stored row, version/audit evidence, safe error contract, no unintended cascade. |
| Request validation | Valid structured request is normalized and versioned. | Unknown field, wrong type, 0/over-limit string, >25 array items, >300 bytes/item, >8KiB canonical JSON, depth>8, malformed Unicode, duplicate key, injection/control characters. | Unit and API tests for every schema rule; no silent truncation or raw provider/query error. |
| Specification integrity | Server stores immutable new version and computes approved canonical SHA-256. | Client hash mismatch, mutated content, duplicate version, wrong source revision, over 8KiB, racing spec edit, version replay. | Known canonical JSON/hash vectors on runtime; stored bytes/hash recomputation; concurrent version-write tests. |
| Task state machine | Each allowed edge succeeds with current version and prerequisites. | Every forbidden edge, stale version, fabricated RUNNING/COMPLETED, unapproved queue, revoked approval, wrong owner, duplicate transition and missing evidence. | Exhaustive transition-matrix tests; actual persistence concurrency evidence; no state implies work that did not run. |
| Retry and dependencies | Bounded transient retry creates next immutable attempt; valid dependency accepted. | Retry auth/validation errors, exceed cap, duplicate attempt, self-dependency, cycle, concurrent cycle creation, provider 429 storm. | Attempt history, cap behavior, backoff bounds, dependency consistency and no unlimited work. |
| Approval | Owner approves/rejects exact current version/hash. | Non-owner, forged actor, spec changed after display, wrong hash, old version, duplicate/out-of-order decision, revocation/dispatch race, wrong task/project. | Immutable approval records, exact hash, actor/time, audit; no approval on stale hash; atomicity/concurrency proof. |
| Audit integrity | Every successful material mutation emits required actor/action/time/target/correlation. | Secrets in metadata, invalid actor, duplicate event, partial DB write, sequence race, attempt to update/delete event, privileged row modification. | Field-level redaction tests, reconciliation tests, hash-chain check; clearly distinguish tamper-evidence from provider-enforced immutability. |
| Safe errors | Validation, auth, not found, conflict, rate and provider errors map to stable envelope. | Stack trace, SQL/ZCQL, token, invite link, other user's existence, raw provider response or PII leaks. | Contract tests and captured-log scan with synthetic canary secrets; body and logs both reviewed. |
| Cancellation | Owner cancels draft/awaiting task; repeated identical request idempotently returns same result. | Cancel vs worker claim, cancel vs retry, wrong owner, completed/terminal task, worker unacknowledged, external irreversible operation. | No later task starts after accepted cancellation; running task not labeled stopped before acknowledgement; audit event present. |
| Export/deletion/retention | User export contains all in-scope owned records; deletion workflow reaches documented completion. | Cross-user leakage, partial export, export over size limit, repeated request, deletion outage, backup guarantee claim, retention exception. | Two-user export diff, deletion state and reconciliation, data-class checklist, written provider backup/deletion evidence. |
| Cost and abuse | Work proceeds only within approved internal ceiling and known account status. | Counter at limit, over limit, unknown billing/usage, other project consumes quota, app kill-switch unavailable, retry causes extra metering. | Test switch defaults off, pause tests, account console usage/billing review and verified non-billable conditions before any live test. |
| Accessibility/mobile | All key flows usable via keyboard and responsive viewport. | Focus loss, unlabeled controls, low contrast, 200% zoom, narrow screens, long text overflow, reduced motion. | Automated a11y plus manual screen-reader/keyboard and viewport evidence; target WCAG version and browser set decided before acceptance. |
| Integration failure | Provider success and recoverable transient errors behave according to contract. | Auth provider unavailable, Function timeout, Data Store 429, partial write, CORS failure, wrong region, malformed upstream response. | Bounded retries/circuit breaker, safe 503/429, no duplicate writes, pause on unknown cost/state. |

## QA workflow

1. Product provides approved requirements/spec version/hash and acceptance mapping.
2. Architect provides APIs, schema, lifecycle and security threat references.
3. Engineer provides a diff, dependency manifest, migration plan, test execution logs, and known issues; no credential is included.
4. QA builds independent tests from acceptance criteria and adversarial cases, runs against an isolated seeded environment, and records all outcomes.
5. Defects are classified by impact, linked to evidence, and returned to Engineer. Fixes require a new revision and focused regression.
6. QA reruns affected tests plus regression set and gives a release recommendation; founder retains release decision.

Test environment should use separate development/staging projects and synthetic identities/data, never copy production personal data. Before using Catalyst, verify selected India region, free-tier/billing state and account isolation; use no test that might cross a billable threshold. No account/project exists now.

## Tooling proposal

Existing local frontend uses Vitest and React Testing Library; prior recorded results are 3 test files / 6 tests. Retain these for existing local logic. Proposed future: pure domain unit/contract tests with Vitest; HTTP contract tests; Playwright browser E2E after its version/license/purpose/cost/security review; provider integration tests only after a separate approval and synthetic account setup. Do not install any new package in this architecture-only phase. Exact Catalyst SDK version and a current supported OpenAPI/test generator are not selected.

Potential local commands after backend implementation and authorization: npm run lint, npm run typecheck, npm test, npm run build, plus separately documented integration/E2E/security commands. No such Phase 2A commands were run; no pass is asserted.

## Completion evidence bar

A feature becomes **Implemented** only with source/config and a change reference. It becomes **Tested** only after the exact required tests run and evidence is attached. It is not **Released** until provider region/settings, cost gates, security review, data retention/export/deletion, rollback/recovery, independent QA and founder release decision are recorded. Security design content alone is not a security pass.

## Companion documents

[API contracts](PHASE_2A_API_CONTRACTS.md), [task lifecycle](PHASE_2A_TASK_LIFECYCLE.md), [approval design](PHASE_2A_APPROVAL_DESIGN.md), [security threat model](PHASE_2A_SECURITY_THREAT_MODEL.md), [implementation roadmap](PHASE_2A_IMPLEMENTATION_ROADMAP.md).
