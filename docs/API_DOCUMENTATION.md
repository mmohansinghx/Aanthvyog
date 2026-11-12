# API documentation

**Status:** In Design
**API state:** proposed contract only; no endpoints are implemented or tested. The local frontend's request preview does not call a server or API.

## Contract rules

- Require a real authenticated session/token at every protected API boundary. Frontend route guards improve UX only and never authorize an operation.
- Derive the caller identity server-side. Assign `owner_user_id` on creation; never accept a client-supplied owner as authoritative.
- For every project/request/task/approval read or write, resolve the project and verify `owner_user_id` equals the authenticated subject before returning or mutating data.
- Validate JSON shape, size, field types, and allowed values on the server. Reject unknown mutation fields and unsafe state transitions.
- Persist state changes and corresponding audit records; use idempotency and optimistic concurrency to protect retries and stale updates.
- Return stable safe errors and a correlation ID. Do not reveal existence of another user's object, stack traces, provider internals, secrets, or raw tokens.
- Endpoint names and schemas remain proposals pending technical verification of Catalyst authentication and Functions runtime.
- The initial contract version is HTTP `/api/v1` with `schemaVersion: 1` on validated request/response objects. Incompatible contract changes require a new version; adding a field is allowed only where the schema explicitly permits it.

## Invite-only access

Proposed identity path: Catalyst Authentication with public signup disabled. An administrator invites a user through the supported admin-controlled process; the invitation sends a password setup link. Account recovery uses the provider's documented password reset path. Do not implement a fake login or custom public registration form. Invitation expiration and invalid/expired-link behavior were not specified in the reviewed docs and must be verified before implementation. The actual account settings must be checked.

## Proposed endpoint set

| Method and path | Purpose | Authorization |
|---|---|---|
| `POST /api/v1/projects` | Create a project. | Authenticated; server assigns owner. |
| `GET /api/v1/projects` | List caller's projects. | Authenticated; server queries by owner. |
| `GET /api/v1/projects/{projectId}` | Read project and safe summary. | Authenticated and project owner verified server-side. |
| `PATCH /api/v1/projects/{projectId}` | Update allowed project metadata. | Owner verified; field allowlist; version check. |
| `POST /api/v1/projects/{projectId}/requests` | Create structured request in `draft` or `submitted`. | Owner verified; server validates/sets owner and state. |
| `GET /api/v1/projects/{projectId}/requests/{requestId}` | Read request and specification versions. | Owner of parent project verified. |
| `PATCH /api/v1/projects/{projectId}/requests/{requestId}` | Update editable requirements or move through an allowed transition. | Owner verified; state machine and version check. |
| `POST /api/v1/projects/{projectId}/requests/{requestId}/approval` | Record approve/reject on exact spec version/hash. | Owner authenticated; spec/hash current; decision audited. |
| `POST /api/v1/projects/{projectId}/requests/{requestId}/cancel` | Safely cancel uncompleted request. | Owner verified; transition allowed; audit event appended. |
| `GET /api/v1/projects/{projectId}/requests/{requestId}/activity` | Read persisted lifecycle/audit activity. | Owner verified; response omits restricted details. |
| `GET /api/v1/me/export` | Export the authenticated user's owned projects, requests, specification versions, approvals, and user-visible audit history. | Authenticated; export query is scoped to the verified caller; response format/version documented. |
| `POST /api/v1/me/deletion-requests` | Begin an account/project data deletion workflow after explicit confirmation. | Authenticated and recently re-authenticated where supported; scope, retention exceptions, and audit treatment follow the approved deletion policy. |

M1 has no endpoint to invoke an AI agent, execute generated code, deploy a project, or return fabricated task success. Admin invitation/recovery operations remain in the provider's controlled admin path until a separately reviewed API is justified.

## Proposed lifecycle state machine

```text
draft -> submitted -> needs_information -> submitted
                   -> specification_ready -> awaiting_approval
                                            -> approved -> cancelled (before any future execution)
                                            -> rejected
Any nonterminal state -> cancelled
failed is reserved for a real persisted operation failure; no simulated AI/agent failure is allowed.
```

`rejected`, `cancelled`, and `failed` are terminal for a request version. A user needing another review creates a new specification version or request revision under an explicit policy. M1 does not create `running`/`completed` agent states; `failed` is unused for agent work because no agents run. A UI must not show activity events that were not persisted, except visibly labelled demo fixtures.

Every state transition must be checked against `(current_state, requested_state, actor, version)` in a domain service; state values supplied by the client alone never authorize a transition. Record who changed the state, UTC timestamp, old/new state, and correlation ID.

## Proposed structured request

~~~json
{
  "schemaVersion": 1,
  "category": "business_website",
  "goal": "Describe the intended outcome",
  "requirements": {
    "targetUsers": [],
    "requiredPages": [],
    "features": [],
    "constraints": []
  },
  "idempotencyKey": "client-generated-unique-value",
  "expectedVersion": 1
}
~~~

The server rejects unknown fields, invalid category values, missing required fields, oversized content/arrays, malformed version numbers, and reused idempotency keys with incompatible content. Exact limits must be chosen and enforced before implementation. Identity, owner, server timestamps, state transitions, approval actor, and spec hash are server-controlled fields.

## Approval record

An approval request includes a specification-version identifier, its expected content hash, and a decision (`approved` or `rejected`). The server loads the persisted immutable version and compares the hash before recording the decision, derives `actor_user_id` from the authenticated session, writes the approval and audit event, and rejects stale or mismatched versions. A client cannot submit a spec hash as proof that the user reviewed it.

## Safe error shape

~~~json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request could not be accepted.",
    "correlationId": "server-generated-id",
    "details": []
  }
}
~~~

`code` is stable and safe for clients; `details` contains only sanitized field names and rule codes. Use a generic not-found/forbidden response policy that does not disclose another user's resource. Restricted logs may contain redacted diagnostics keyed by the correlation ID.

## Authorization matrix

| Action | Unauthenticated | Authenticated owner | Other authenticated user | Administrator |
|---|---|---|---|---|
| Read/create/update own project/request | Deny | Allow after server ownership/state checks | Deny without existence disclosure | No implicit access to user content; audited break-glass process would require separate approval. |
| Approve/reject/cancel own request | Deny | Allow on current version and permitted state | Deny | No implicit approval on behalf of owner. |
| Invite/disable/recover account | Deny | No self-service invite in M1 | Deny | Allow only through provider's controlled admin process; invite/recovery action must be auditable where supported. |
| Read account-wide operations/usage | Deny | Own usage summary only if implemented | Deny | Restricted operator view only if approved and audited. |

## Open API decisions

Verify token/session validation for Catalyst Functions and least-privilege Data Store access; decide pagination, exact body/field limits, rate limits, state transition API shape, idempotency retention, concurrency token, audit write atomicity, account-recovery path, and sanitized error policy. No implementation or test evidence exists.
