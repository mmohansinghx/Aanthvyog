# Phase 2A — Task Lifecycle

**Status:** In Design — transition contract proposal 1, 2026-11-12
**Implementation/test status:** No persisted task state machine, queue, worker, or agent exists.

## Purpose and limits

This state machine is the future backend contract for bounded work tasks. It is not a claim that an AI agent is running. M1/Phase 2A has no model call, code generation, generated-code execution, task queue, background worker, or completed task. A UI may show only explicitly labelled demo fixtures or real persisted state with evidence.

Task state belongs to an immutable specification version where applicable. Request intake state is a separate aggregate (see API and database design); do not use task states as a substitute for request clarification/approval states.

## States

| State | Meaning | Required evidence/conditions |
|---|---|---|
| DRAFT | Task plan exists but is incomplete or not ready for user review. | Server-created plan and schema-valid scope; no execution. |
| PENDING_APPROVAL | Exact specification/operation is ready for owner decision. | specification_id, canonical hash and approval request are persisted; all approval prerequisites shown. |
| APPROVED | Owner approved the exact currently active specification hash. | Current approval record, actor and timestamp match; no spec change/revocation. |
| QUEUED | Execution is authorized, resources are reserved, and a real dispatch can occur. | Only in a later, explicitly approved execution phase; cost gate open, concurrency token acquired, no cancellation. Never used as decorative progress. |
| RUNNING | A real isolated worker has acknowledged the attempt. | Attempt ID, worker identity, start time, bounded resource grant and lease/heartbeat evidence. No worker means no RUNNING. |
| BLOCKED | Work cannot safely continue pending user/provider/QA/cost/security action. | Allowlisted blocker code, optional safe details, actor/time and event. No silent wait. |
| FAILED | A real attempt ended with a verified error and cannot continue automatically. | Attempt record, safe error code, timestamp, sanitized evidence reference. |
| COMPLETED | Work finished and passed its declared verification gate. | Required output hashes, acceptance evidence, and independent QA disposition where the task type requires it. A process exit code alone is insufficient. |
| CANCELLED | Cancellation was accepted and no future attempt may start. | Actor, timestamp, reason code, cancellation state, audit event, and worker acknowledgement if it was running. |

## Transition matrix

| From | Allowed to | Conditions |
|---|---|---|
| DRAFT | PENDING_APPROVAL, CANCELLED | Complete bounded plan/spec exists; or owner cancels. |
| PENDING_APPROVAL | APPROVED, BLOCKED, CANCELLED | Owner approves exact current hash; rejection is recorded and moves task to BLOCKED with reason APPROVAL_REJECTED; unresolved provider/cost/security gate blocks; or owner cancels. |
| APPROVED | QUEUED, BLOCKED, CANCELLED | QUEUED only after an execution feature is separately approved and budget/resources are reserved; block on revocation, stale spec, exceeded/unknown quota, missing prerequisites; owner/system cancellation before dispatch. |
| QUEUED | RUNNING, BLOCKED, CANCELLED, FAILED | A real worker claim starts an attempt; unavailable limits/lease or changed approval blocks; no work has started when cancellation wins; FAILED only for a real dispatch/claim failure. |
| RUNNING | COMPLETED, BLOCKED, FAILED, CANCELLED | Verified completion; safe pause/block; real failed attempt; or acknowledged cooperative cancellation. |
| BLOCKED | PENDING_APPROVAL, QUEUED, CANCELLED | New/changed spec requires a fresh approval review; resolved blocker may resume only with still-valid approval and cost gate; user cancels. No direct BLOCKED -> RUNNING. |
| FAILED | QUEUED, BLOCKED, CANCELLED | Retry policy permits a bounded new attempt and approval remains valid; otherwise block pending user review; or owner cancels. |
| COMPLETED | none | Terminal. New work is a new task. |
| CANCELLED | none | Terminal and never restarted. New work requires a new task. |

All unspecified transitions are forbidden. In particular: client-supplied states cannot be persisted directly; APPROVED cannot skip into RUNNING; FAILED cannot be represented without an attempt failure; COMPLETED cannot be claimed without evidence; CANCELLED/COMPLETED never reopen. A rejection is an Approval Record plus BLOCKED state, not a success-like state.

### Specification changes and approvals

A task stores specification_id and specification_sha256. Before approval, a changed spec creates a new immutable spec version and a new approval checkpoint; the existing task returns to PENDING_APPROVAL only through a version-checked transition, or a new task is created when that preserves clearer audit history. After approval, a change makes the task ineligible for QUEUED; block it and require a new approved task/version. Revocation blocks any not-yet-started task; a running worker receives a cancellation request and the task remains RUNNING until safely acknowledged or reaches a documented blocked/failed outcome.

## Request intake state (separate aggregate)

Request states are DRAFT -> SUBMITTED -> NEEDS_INFORMATION -> SUBMITTED -> SPECIFICATION_READY -> PENDING_APPROVAL -> APPROVED, with REJECTED/CANCELLED terminal for that request revision and FAILED reserved for a real persistence/processing failure. M1 stops after persisting the user's approval. Do not create QUEUED/RUNNING/COMPLETED task states to imply future implementation.

## Required invariants

1. Every transition requires an authenticated actor (or explicit, audited service actor), current owner authorization and an expected row_version.
2. The server checks current state, target state, spec version/hash, approval status, cancellation flag, usage gate, and required evidence in one domain operation.
3. The task owner, project, request, and specification references must agree. All reads/writes independently verify parent project ownership.
4. A mutation is idempotent for the same scoped Idempotency-Key. Reusing the key with different canonical payload returns CONFLICT.
5. Append a corresponding audit event containing old/new state, actor, time, reason code, correlation ID, and expected/new version. Domain write and audit write must have a verified consistency strategy.
6. A successful start reserves an attempt number exactly once. A retry creates a new attempt; do not overwrite prior attempt evidence.
7. No operation begins if the cost/billing gate is closed or unknown. Usage pause is fail-closed.
8. `COMPLETED` requires the task-type evidence contract; `FAILED` requires a real failed attempt. Neither can be manually selected by the UI.
9. A cancellation request is monotonic and idempotent. No later queue claim may win after accepted cancellation.

## Cancellation and recovery

- Before queue claim: atomically set CANCELLED; any later worker claim must reject the task/version.
- Queued but not started: cancel task and invalidate the dispatch claim; a delayed message/duplicate job must re-read state and be rejected.
- Running: record cancel_requested_at and actor/reason while state remains RUNNING. Send a cooperative signal only through a bounded worker channel in a later phase. Do not claim cancellation complete until worker confirms it stopped or the operation is known to have been safely interrupted. If confirmation times out, move to BLOCKED with blocker code CANCELLATION_UNCONFIRMED and alert an operator; do not start a retry. CANCEL_PENDING is not a separate state in this contract.
- Irreversible external action: define the point of no return and compensating action before adding that task type. Cancellation cannot promise rollback of an action already accepted by an external provider.
- Partial database write: return a safe error and reconcile using idempotency and append-only events. Do not report success if task state, attempt, approval, or audit facts disagree.
- Provider outage or unknown billing status: pause queue/dispatch and mark affected work BLOCKED with a safe provider/cost code. No automatic high-frequency retry loop.

## Retry and failure policy

- Retry only transient, allowlisted failure classes. Authentication, validation, authorization, stale-version, policy/cost, and security failures are not automatically retried.
- Initial retry count and backoff are intentionally UNSET pending actual Functions/SDK quotas and zero-cost policy. A later proposal must state max attempts, elapsed-time cap, exponential backoff with jitter, and operator pause behavior.
- Each retry requires a new attempt record and stable idempotency/dispatch key. Before retry, re-check task state, current spec hash, approval, cancellation, parent ownership, and usage gate.
- Exhaustion moves to FAILED with safe error code; no attempt may self-change the task to COMPLETED.
- DLQ/queue service is not selected. If a managed queue would add billable usage or unavailable regional capability, it must pass the same cost and region gate.

## Concurrency and provider blockers

The desired implementation requires atomic compare-and-set on current state + row_version and consistent audit/attempt insertion. The reviewed Data Store docs do not prove conditional update, multi-row rollback/commit, or serializable behavior. Catalyst documents component-level concurrent-request limits and HTTP 429 behavior, so callers need bounded backoff; exact quotas are account-dependent. A database proof-of-capability is mandatory before implementing any transition with side effects. Without it, do not simulate correctness with a read-then-write race or rely only on a Function mutex that does not cover multiple instances.

## Required tests and evidence

For the full matrix, create positive and forbidden-edge unit tests; integration tests for stale versions, duplicate idempotency, owner spoofing, concurrent cancel/start, spec edit/approval race, revocation/dispatch race, retry cap, missing evidence, provider 429/outage, audit partial-write recovery, and usage gate closed/unknown. Evidence includes exact DB behavior and concurrent runs against an isolated test environment. No lifecycle test is marked passed in this documentation-only phase.

## Source notes

- [Catalyst Data Store FAQ and concurrency-limit behavior](https://docs.catalyst.zoho.com/en/faq/cloud-scale/)
- [Catalyst Data Store and ZCQL](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/introduction/)
- [Catalyst Function runtimes](https://docs.catalyst.zoho.com/en/serverless/help/functions/stack/)
- Companion design: [Database](PHASE_2A_DATABASE_DESIGN.md), [API](PHASE_2A_API_CONTRACTS.md), [Approval](PHASE_2A_APPROVAL_DESIGN.md).
