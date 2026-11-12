# Phase 2A — API Contracts

**Status:** In Design — HTTP API proposal v1, 2026-11-12
**Implementation/test status:** No backend endpoint is implemented or tested.
**Base path:** /api/v1

## Contract-wide rules

- All application endpoints use HTTPS and JSON. Request/response envelopes include schemaVersion: 1 where a JSON body is present. Route version and payload schema version are both explicit.
- Every endpoint except a minimal non-sensitive health probe requires a verified provider session. Invitation and password setup/recovery are handled through the supported Catalyst Authentication flow; the application must not implement fake auth or public registration.
- The server verifies the session, derives provider subject and internal app user, then authorizes the project. It never trusts client user ID, role, owner, state, actor, timestamp, attempt, provider error, or content hash as authority.
- Every protected project operation loads the parent project and checks project.owner_user_id == authenticated app user. Every protected child operation additionally checks child.project_id and child.owner_user_id match that project. Never query a child by public ID alone. Non-owner resources return the same safe NOT_FOUND response as nonexistent resources.
- Authenticate, validate, authorize, enforce lifecycle/hash/version, apply idempotency, persist, append audit evidence, and only then return success. Required transaction/compare-and-set guarantees are unverified; state-changing operations remain blocked until proved.
- Mutation schemas use an allowlist and reject unknown fields. Body max 16 KiB, nesting depth 8. Request/spec canonical JSON max 8 KiB UTF-8; project name 1–120 UTF-8 bytes; goal max 4,000 bytes; requirement arrays max 25 entries each and 300 bytes per entry. These are proposed application limits, not Catalyst quotas.
- Strings are trimmed where appropriate; reject control characters, malformed UTF-8, invalid enums, oversized arrays/text, duplicate unknown identifiers, and empty required values. Do not silently truncate. No arbitrary URL, file, code, shell command, or credentials field is accepted.
- Every mutation requires an Idempotency-Key of 16–128 safe printable characters and an If-Match/expected row_version where updating an existing aggregate. Persist only a digest scoped to authenticated owner, method, canonical route, and key. Same key/same payload replays the original safe outcome; same key/different payload returns CONFLICT. Exact retention duration is UNSET pending data policy.
- List endpoints use owner-scoped filtering and stable opaque cursors, max page_size 100. Catalyst's documented ZCQL operation may cap a query at 300 rows; verify exact API behavior and avoid unbounded reads.
- Responses omit internal ROWID, identity provider secrets, tokens, invitation URLs, private diagnostics, unrestricted audit metadata, and other users' data. Expose public UUIDs only.
- Mutations and sensitive export/deletion/admin operations create audit events with server time and correlation ID. Read/list does not create a per-row audit flood; record sensitive exports, security denials, and administrative actions under a documented safe policy.
- No endpoint runs agents, calls an AI provider, executes generated source, deploys, or returns fabricated success in M1/Phase 2A.

## Authentication and response envelope

Identity/session must use the current supported Catalyst browser/server integration. Public docs say sign-in is client-side, public signup can be disabled, and current Node.js v2/Web v4 SDKs are in deprecation in favor of the modular JavaScript SDK. The exact Function request context, token verification method, CORS and cookie/storage behavior is UNVERIFIED and is a blocking proof-of-capability. If a Function can enter admin scope because no valid user session exists, it must reject the request; no fallback.

~~~json
{
  "schemaVersion": 1,
  "data": { "id": "opaque-uuid", "state": "DRAFT", "version": 1 },
  "meta": { "correlationId": "server-generated-uuid" }
}
~~~

Safe error envelope:

~~~json
{
  "schemaVersion": 1,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request could not be accepted.",
    "correlationId": "server-generated-uuid",
    "details": [{ "field": "name", "rule": "MAX_LENGTH" }]
  }
}
~~~

HTTP mapping: 400 malformed/unknown fields; 401 missing or invalid session; 403 authenticated but lacks allowed capability where existence disclosure is safe; 404 nonexistent or not owned; 409 stale version, idempotency conflict, duplicate current decision, or raced state; 413 body too large; 422 valid JSON but invalid domain transition; 429 rate/cap limit with safe retry guidance; 503 provider unavailable/usage state unknown; 500 generic unexpected error. Do not return internal stack/provider messages. Use Retry-After only when a bounded retry is safe.

## Endpoint catalogue

In the matrix, “owner” means server verification of project owner plus child-parent consistency. All requests and responses are schemaVersion 1. All endpoint parameters and payload limits follow the contract-wide rules.

| Method and path | Request → response | Auth and authorization | Idempotency / audit |
|---|---|---|---|
| GET /api/v1/me | None → own opaque user ID, active/disabled state, minimal profile fields. | Verified current session; derives subject server-side. | No mutation audit; security failure may be logged redacted. |
| GET /api/v1/me/invitation-status | None → own application user state; invitation timestamps/status only if provider exposes them safely. | Verified current session; own record only. | No. Do not disclose a user's existence pre-auth. Provider invite completion remains provider-hosted. |
| GET /api/v1/me/auth-status | None → authenticated boolean and safe session/account status; no token claims or token. | Verified session, own account. Unauthenticated response is 401, not a public user lookup. | No. |
| POST /api/v1/projects | {name, category} → new project summary with server owner and version. | Authenticated; server creates APP_USER mapping if safely established; owner derived from session. | Required; PROJECT_CREATED audit. |
| GET /api/v1/projects | Query cursor/page_size/status → caller-owned project summaries. | Authenticated; query always owner-scoped. | No; page size <=100. |
| GET /api/v1/projects/{projectId} | None → project detail summary. | Authenticated + owner. | No; generic 404 if absent/non-owner. |
| PATCH /api/v1/projects/{projectId} | {name?, category?, expectedVersion} → updated project. | Authenticated + owner; allowlisted editable fields; state fields rejected. | Required; If-Match; PROJECT_UPDATED. |
| POST /api/v1/projects/{projectId}/archive | {expectedVersion} → archived project state. | Authenticated + owner; only allowed when no active operation. | Required; If-Match; PROJECT_ARCHIVED. |
| DELETE /api/v1/projects/{projectId} | {expectedVersion, confirmation} → 202 deletion request/status, not promise of immediate provider-backup removal. | Authenticated + owner; recent re-authentication if provider supports; child retention policy applies. | Required; idempotent; PROJECT_DELETION_REQUESTED. Physical deletion is policy-driven, not inline cascade. |
| POST /api/v1/projects/{projectId}/requests | {schemaVersion, category, goal, requirements} → DRAFT request and server owner. | Authenticated + owner; project active; state/owner not accepted from client. | Required; PROJECT_REQUEST_CREATED. |
| POST /api/v1/projects/{projectId}/requests/{requestId}/validate | {expectedVersion?} → validation result, missing/contradictory fields, no state change. | Authenticated + owner; validates request. | Optional request-key for replay/rate control; log abuse only. |
| POST /api/v1/projects/{projectId}/requests/{requestId}/submit | {expectedVersion} → SUBMITTED or NEEDS_INFORMATION response with required fields. | Authenticated + owner; current request is editable. | Required; If-Match; REQUEST_SUBMITTED or REQUEST_NEEDS_INFORMATION. |
| GET /api/v1/projects/{projectId}/requests | Query cursor/page_size/state → caller-owned request summaries. | Authenticated + owner. | No; page <=100. |
| GET /api/v1/projects/{projectId}/requests/{requestId} | None → request + active specification pointer/version, no provider internals. | Authenticated + owner and child-parent match. | No. |
| PATCH /api/v1/projects/{projectId}/requests/{requestId} | {expectedVersion, editable requirement fields} → updated request revision/hash. | Authenticated + owner; reject state, owner, hash, actor, and timestamp fields. Edit after approval creates a new request/spec version and invalidates old authorization. | Required; If-Match; REQUEST_UPDATED / SPEC_VERSION_INVALIDATED. |
| POST /api/v1/projects/{projectId}/requests/{requestId}/specifications | {content, sourceRequestRevision, expectedVersion} → immutable version ID, number, server hash. | Authenticated + owner; parent and revision checked; server canonicalizes/hashes. | Required; If-Match; SPECIFICATION_VERSION_CREATED. |
| GET /api/v1/projects/{projectId}/requests/{requestId}/specifications/{specificationId} | None → exact immutable spec content, version, hash. | Authenticated + owner and parent consistency. | No. |
| GET /api/v1/projects/{projectId}/requests/{requestId}/specifications/compare?from={id}&to={id} | Query IDs → field-level diff of two owned immutable versions. | Authenticated + owner; both versions belong to same request. | No; bounded response and sanitized fields. |
| POST /api/v1/projects/{projectId}/requests/{requestId}/approval-submissions | {specificationId, expectedHash, expectedVersion, scope} → pending record with server-computed spec and scope hashes. | Authenticated + owner; exact active spec checked; approval scope allowlisted. | Required; If-Match; APPROVAL_SUBMITTED. |
| GET /api/v1/approvals/{approvalId} | None → owned approval history/current effective status and exact spec reference. | Authenticated + owner; generic 404 on cross-owner. | No. |
| POST /api/v1/approvals/{approvalId}/decision | {decision: APPROVED\|REJECTED, specificationId, expectedHash, expectedVersion, acknowledgment: true} → append-only decision. | Authenticated + owner only; hash recomputed; exact active spec and state required. No admin self-approval. | Required; If-Match; APPROVAL_APPROVED or APPROVAL_REJECTED. |
| POST /api/v1/approvals/{approvalId}/revocations | {reasonCode, expectedVersion} → append-only revocation result. | Authenticated + owner; allowed only before point of no return; active work is safely paused/cancelled. | Required; APPROVAL_REVOKED + task blocked/cancel event. |
| POST /api/v1/approvals/{approvalId}/supersessions | {newSpecificationId, newHash, expectedVersion} → append supersession event. | Authenticated + owner; new spec same request/project, current hash matches. Usually emitted with creating next spec. | Required; SPECIFICATION_SUPERSEDED / APPROVAL_SUPERSEDED. |
| POST /api/v1/projects/{projectId}/requests/{requestId}/tasks | {taskKind, specificationId, expectedVersion} → DRAFT or PENDING_APPROVAL task only. | Authenticated + owner; task plan validation. M1 cannot queue/execute. | Required; TASK_CREATED. |
| GET /api/v1/projects/{projectId}/tasks | Query cursor/page_size/state → owner-scoped summaries. | Authenticated + owner. | No; page <=100. |
| GET /api/v1/tasks/{taskId} | None → task state, safe blocker/error, spec hash reference. | Authenticated + owner and parent consistency. | No. |
| PATCH /api/v1/tasks/{taskId}/state | {targetState, expectedVersion, reasonCode} → transition result. | Authenticated + owner; target must be server-approved edge. QUEUED/RUNNING/COMPLETED are disabled in M1. | Required; If-Match; TASK_STATE_CHANGED. |
| POST /api/v1/tasks/{taskId}/cancel | {expectedVersion, reasonCode} → state CANCELLED if safely stopped, otherwise current state plus cancelRequested=true. | Authenticated + owner; no execution in M1; server checks current transition. RUNNING remains RUNNING until stop is acknowledged; timeout becomes BLOCKED with CANCELLATION_UNCONFIRMED. | Required; idempotent; TASK_CANCELLATION_REQUESTED/CONFIRMED. |
| GET /api/v1/tasks/{taskId}/history | Query cursor/page_size → owned task attempts and lifecycle events, safe fields only. | Authenticated + owner. | No; page <=100. |
| GET /api/v1/projects/{projectId}/activity | Query cursor/page_size → project activity timeline from persisted audit events only. | Authenticated + owner; demo fixtures are never returned from this API. | No; reads scoped; audit export policy applies. |
| GET /api/v1/projects/{projectId}/audit-events | Query cursor/page_size/action → owner-visible, redacted audit events. | Authenticated + owner; restricted fields excluded. | No; sensitive activity retrieval may be logged. |
| GET /api/v1/me/export | Query format=jsonl\|json, schemaVersion → owner-only archive/data set. | Authenticated; re-authentication and async job behavior require provider/hosting verification. | Idempotent export key; USER_DATA_EXPORTED event; rate and size capped. |
| POST /api/v1/me/deletion-requests | {scope, confirmation, expectedVersion} → pending deletion workflow and status ID. | Authenticated; recent re-authentication; scope, legal retention exceptions, and final confirmation required. | Required; USER_DELETION_REQUESTED. Do not claim complete until every data class is processed/reconciled. |

Admin invitations are performed through the administrator-controlled Catalyst Authentication process after account verification; this phase proposes no user-facing public signup or invitation API. If a future admin API is justified, it requires separate role design, explicit founder approval, rate limit, audit, invitation-expiry verification, and a separate authorization matrix.

## Request and response contracts

### Project request

~~~json
{
  "schemaVersion": 1,
  "category": "business_website",
  "goal": "Describe the intended outcome",
  "requirements": {
    "targetUsers": [],
    "requiredPages": [],
    "features": [],
    "constraints": [],
    "integrations": [],
    "acceptanceCriteria": []
  }
}
~~~

No owner, actor, request state, timestamps, provider identity, API key, password, external URL to fetch, or execution directive appears in this request body. Those are derived or disallowed.

### Specification create

~~~json
{
  "schemaVersion": 1,
  "sourceRequestRevision": 3,
  "expectedVersion": 4,
  "content": {
    "requirements": [],
    "architecture": {},
    "dataModel": {},
    "apiContractVersion": 1,
    "securityReview": [],
    "approvalCheckpoints": [],
    "tasks": [],
    "acceptanceCriteria": [],
    "knownRisks": [],
    "assumptions": [],
    "exclusions": []
  }
}
~~~

Response includes server-created specification ID/version and canonical SHA-256. The client hash is never accepted as evidence.

### Approval decision

~~~json
{
  "schemaVersion": 1,
  "decision": "APPROVED",
  "specificationId": "opaque-uuid",
  "expectedHash": "64-lowercase-hex-characters",
  "expectedScopeHash": "64-lowercase-hex-characters",
  "expectedVersion": 5,
  "acknowledgment": true
}
~~~

The approval-submission request includes a bounded scope object: scope schema version, purpose, exact task IDs, environment, allowlisted resources/tools, network policy, operation ceiling, cost ceiling in INR, data scope, and expiry/review condition. Under the current approval this scope must explicitly authorize no paid usage; the example below is review-only.

~~~json
{
  "schemaVersion": 1,
  "purpose": "Review this exact project specification",
  "taskIds": ["opaque-task-uuid"],
  "environment": "DEVELOPMENT",
  "allowedResources": [],
  "allowedTools": [],
  "networkPolicy": "DENY",
  "maxOperations": 0,
  "costCeilingInr": 0,
  "dataScope": "project-and-specification-only",
  "expiresAt": null
}
~~~

The server derives actor, reloads and hashes immutable content and scope, checks owner and current pointer, verifies all required checkpoints, and writes the decision/audit under a verified atomicity strategy. A newer version, changed scope/hash, revoked/closed project, or stale version yields 409 and no approval. The decision body must reference the hash returned by the approval-submission response; it is not allowed to change scope during the decision.

## Authorization matrix

| Operation | Unauthenticated | Invited active owner | Other authenticated user | Admin/operator |
|---|---|---|---|---|
| Own project/request/spec/task read and allowed update | Deny | Allow only after server owner/state checks | Deny; safe 404 | No implicit content access |
| Approval/rejection/revocation | Deny | Allow for exact own active version and permitted state | Deny; safe 404 | No approval on behalf of owner |
| User invite/disable/recovery | Deny | No public/self-invite in M1 | Deny | Admin-controlled provider process only; logged where supported |
| System configuration/usage kill switch | Deny | Deny | Deny | Least-privilege operator only, separate approval and audit |
| Export/deletion | Deny | Own data only after confirmation | Deny | No blanket access; narrow supervised support procedure requires separate approval |

## Open verification and errors

Unverified: exact Catalyst Function auth/session validation for calls from Slate; SDK modular auth module/version and Node 24 compatibility; public signup disabled in actual account; invitation expiry/revoke/recovery details; CORS/cookie/token behavior; Function/API Gateway URL and route setup; Data Store parameter binding, uniqueness, transactions/CAS, indexes, pagination, deletion/export; regional component availability; per-user/per-IP throttles and quotas. Endpoint contracts must not be implemented as if these are facts.

Cross-owner object access returns the same safe 404 envelope. Use 401 for absent/invalid identity, 409 for stale version/idempotency conflict, 422 for a forbidden state edge after ownership verification, 429 for rate/usage pause, and 503 when provider/billing state is unknown. Internally log safe category, correlation ID, and latency; redact tokens, payload contents by default, SQL, invitation links, stack traces, and provider secrets. Exact retry timing is unset; never automatically retry side-effecting calls without idempotency.

## Sources

- [Catalyst Authentication overview](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/introduction/)
- [Catalyst invite flow and user management](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/users/implementation/)
- [Public signup behavior](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/public-signup/)
- [Catalyst modular JavaScript SDK and migration notice](https://docs.catalyst.zoho.com/en/release-notes/sdk/)
- [Catalyst Functions Node runtimes](https://docs.catalyst.zoho.com/en/serverless/help/functions/stack/)
- [Data Store and query limitations](https://docs.catalyst.zoho.com/en/faq/cloud-scale/)
- Companion documents: [database](PHASE_2A_DATABASE_DESIGN.md), [lifecycle](PHASE_2A_TASK_LIFECYCLE.md), [approval](PHASE_2A_APPROVAL_DESIGN.md).
