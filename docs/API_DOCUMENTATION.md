# API documentation

**Status:** In Design
**API state:** proposed contracts only; no endpoints have been implemented.

## Contract rules
- Use versioned JSON APIs and validate request and response shapes at runtime.
- Authenticate each request and enforce project ownership on the server.
- Reject unknown state transitions and return safe errors with a correlation ID.
- Never expose secrets, internal paths, raw provider errors, or another user's records.
- Examples are design sketches; final schemas require architecture approval.

## Proposed endpoints

| Method and path | Purpose | Authorization |
|---|---|---|
| POST /api/v1/projects | Create a project container. | Authenticated user; server assigns ownership. |
| GET /api/v1/projects | List caller's projects. | Authenticated user; owner scope enforced. |
| GET /api/v1/projects/{projectId} | Read a project and safe summary. | Project owner or approved workspace member. |
| POST /api/v1/projects/{projectId}/requests | Create a request and start Architect planning. | Project access; usage and rate limits. |
| GET /api/v1/runs/{runId} | Read run state, approvals, and safe progress. | Run's project access. |
| POST /api/v1/runs/{runId}/approvals | Record approval or rejection for a specific spec hash. | Authorized human approver; policy gate. |
| POST /api/v1/runs/{runId}/cancel | Request cancellation. | Run's project access. |
| GET /api/v1/projects/{projectId}/artifacts | List handover artifacts. | Project access; artifact policy. |

## Example request: submit a project request
~~~json
{
  "category": "business_website",
  "description": "Describe the desired outcome and constraints",
  "constraints": {
    "targetUsers": [],
    "requiredPages": [],
    "integrations": []
  },
  "idempotencyKey": "client-generated-unique-value"
}
~~~
The authenticated identity is derived from the session or token, never from a client-supplied ownerId.

## Example response: accepted planning request
~~~json
{
  "projectId": "server-assigned-id",
  "runId": "server-assigned-id",
  "state": "architect_queued",
  "createdAt": "ISO-8601 timestamp",
  "correlationId": "server-assigned-id"
}
~~~

## Proposed safe error shape
~~~json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "The request could not be accepted.",
    "correlationId": "server-assigned-id",
    "details": []
  }
}
~~~
Detailed provider, database, and stack traces remain in restricted redacted logs.

## Open API decisions
Choose identity token mechanism, pagination, rate limiting, request size limits, public versus internal orchestration endpoints, compatibility policy, idempotency retention, and webhook needs. No contract is final until Product, Architecture, Security, and Backend review.
