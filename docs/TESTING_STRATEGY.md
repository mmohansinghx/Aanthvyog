# Testing strategy

**Status:** In Design
**Test evidence:** no application or test setup exists; no application tests were run for this documentation update.

## Independent QA model

QA uses criteria prepared independently of implementation claims. An engineer/agent cannot mark its own unverified output Tested. Record environment, source revision, exact command/procedure, outcome, defects, and reviewer. Founder retains release authority.

## M1 test layers

- **Unit:** input validation, state transition matrix, ownership predicates, specification hashing, safe error mapping, idempotency, usage-limit and pause rules.
- **Contract:** request/response schemas, stable error codes, field-size limits, version/concurrency behavior, lifecycle/API compatibility.
- **Integration:** real authentication session verification, Catalyst Functions to Data Store reads/writes, audit persistence, invitation/recovery integration, and safe structured API errors. Use isolated test data and verify the configured region/account.
- **Security:** no unauthenticated access; no public signup; cross-owner reads/writes blocked; owner spoofing fails; IDOR checks for project/request/task/approval; stale approvals rejected; admin privilege constrained; injection and CSRF protections; logs contain no secrets.
- **End-to-end:** admin invite -> user password setup -> login -> create project/request -> update structured requirements -> view status -> approve exact specification version/reject/cancel -> inspect persisted activity and audit history.
- **Cancellation/resilience:** cancellation blocks future lifecycle action; repeated requests are idempotent; stale updates fail; partial write recovery does not create a state without its audit event; actual failures are distinguished from demo fixtures.
- **Billing/limits:** ceilings pause before unapproved usage; task creation/continuation remains paused when account usage or billing status cannot be checked; no test crosses an account free-tier threshold.
- **Accessibility/responsive:** keyboard, semantics, contrast, responsive layout, and supported browser/viewport matrix.
- **Privacy lifecycle:** export contains only the user's data; deletion follows the approved retention policy; provider backup claims match written provider evidence.

## Acceptance evidence matrix

| Acceptance criterion | Minimum evidence |
|---|---|
| Invited user can create a request | End-to-end test with a real invite-only configured test account; public signup disabled. |
| Request has a defined owner | Persisted record inspection showing server-assigned owner; client spoofing test. |
| Only an authorized owner can view/update | Cross-owner integration tests for each protected entity and endpoint. |
| Lifecycle transitions are validated | Unit/contract tests for every allowed and rejected state edge, including stale versions. |
| Approval records specification version | Integration test that approval stores actor/version/hash and rejects mismatches/stale versions. |
| Cancellation is safe | End-to-end test showing cancellation state/audit record and no subsequent work dispatch. |
| Audit is recorded | Persistence test for required actor, timestamp, target, action, correlation; redaction test. |
| Errors are structured and safe | Contract test for validation/auth/not-found/conflict/internal errors with no stack/secret leakage. |
| INR 0 ceiling is respected | Usage guard tests plus manual account-level quota/billing review before any live use. |
| Demo data is distinct | UI/API test that identifies fixtures and confirms they are not returned as persisted data. |

## Required checks before release

For an approved implementation phase, record applicable lint, type-check, automated tests, production build, dependency review, security review, data export/deletion test, and independent QA. Include exact commands, environment, commit, outputs, and failures. Do not mark skipped checks passed. For Next.js asynchronous Server Components, prefer end-to-end coverage where unit-test tooling does not support the component behavior.

## Release evidence

- Exact source revision and environment, plus verified provider region/service configuration.
- Lint, type-check, automated-test, and build outcomes.
- Security findings and disposition; test-account invite/recovery and ownership evidence.
- Migration, cancellation, export/deletion, and rollback evidence where applicable.
- Account quota/billing review demonstrating the INR 0 guard condition.
- QA recommendation and founder release decision.

## Open decisions

Choose accessibility target, supported browsers, performance thresholds, availability/recovery goals, sanitized test-data policy, staging strategy, independent QA owner, and evidence retention. Exact thresholds are intentionally not invented here.
