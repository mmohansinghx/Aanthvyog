# Database schema

**Status:** In Design
**Schema state:** conceptual logical model; no migrations or tables have been created.

## Data principles
- Every user-owned record includes an owner or tenant scope and is checked server-side.
- Do not store credentials, provider secrets, or unrestricted execution tokens in project records.
- Minimize personal data; define retention, export, and deletion before production.
- Store large generated artifacts separately from metadata with access controls and retention rules.
- Record state changes and approvals with actor, timestamp, and correlation identifiers.

## Proposed logical entities

| Entity | Purpose | Candidate fields | Ownership and constraints |
|---|---|---|---|
| User | Platform identity reference. | id, identityProviderSubject, createdAt, status | Provider subject unique; profile fields minimized. |
| Workspace | Collaboration and billing boundary if approved. | id, name, createdBy, createdAt | Membership and tenant boundary are open decisions. |
| Membership | User role in a workspace. | workspaceId, userId, role, createdAt | Unique user/workspace pair; role changes audited. |
| Project | User project container. | id, ownerWorkspaceId or ownerUserId, name, category, createdAt, updatedAt, status | Exactly one explicit ownership scope; server checks every access. |
| ProjectVersion | Immutable specification or implementation snapshot. | id, projectId, version, kind, contentRef, createdAt | Project ownership inherited; content validated and versioned. |
| Run | Orchestration lifecycle record. | id, projectId, requestedBy, state, specVersion, createdAt, updatedAt, cancelRequestedAt | Owner and project scope enforced; unique idempotency key. |
| AgentTask | One bounded role execution. | id, runId, role, state, attempt, inputRef, outputRef, startedAt, finishedAt, errorCode | Role allowlist; attempt and timeout limit; no arbitrary paths. |
| Approval | Human decision at a gate. | id, runId, gate, decision, actorId, decidedAt, specHash, commentRef | Tied to exact reviewed version/hash. |
| Artifact | Generated file or deliverable reference. | id, projectId, runId, storageKey, mediaType, size, checksum, createdAt | Server-generated key; owner/project authorization on access. |
| AuditEvent | Security and lifecycle event. | id, actorType, actorId, action, targetType, targetId, occurredAt, correlationId, metadata | Append-oriented; redact secrets and unnecessary personal data. |
| UsageLedger | Bounded cost/usage accounting. | id, runId, providerKey, units, estimatedCost, recordedAt | Provider and cost data only after approved integration; access restricted. |

## Proposed constraints and indexes
- Index Project by owner scope and updatedAt.
- Index Run by projectId, state, and createdAt.
- Enforce unique provider identity subject and idempotency key within owner scope.
- Validate foreign keys and state transitions in server services even if the chosen store lacks relational constraints.
- Restrict Artifact lookup through its authorized Project; never trust a client-supplied storage key.
- Define deletion behavior across projects, versions, runs, tasks, artifacts, audit events, backups, and provider logs before production.

## Open decisions
Choose individual versus workspace ownership; roles; retention and deletion; export format; data region; datastore consistency; artifact lifecycle; audit retention; backup and recovery requirements. This model is not a migration plan or deployed schema.
