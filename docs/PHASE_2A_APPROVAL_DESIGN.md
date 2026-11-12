# Phase 2A — Approval and Specification Versioning

**Status:** In Design — approval contract proposal 1, 2026-11-12
**Implementation/test status:** The local approval UI is presentation-only and disabled. No approval records, signatures, or hashes are persisted.

## Security objective

An approval authorizes one immutable specification snapshot for one project operation. Editing requirements, changing the specification, switching the task, or changing a security/cost constraint invalidates the old approval for the new content. An approval record is not a generic consent to future work and does not authorize deployment, spending, model use, or code execution unless a later specification explicitly requests that scope and the founder separately approves applicable gates.

## Immutable specification version

1. The server validates the requirements/specification schema and rejects unknown fields, unbounded values, and unsupported versions.
2. The server canonicalizes the entire approval-relevant object including schemaVersion using RFC 8785 JSON Canonicalization Scheme (JCS) or another explicitly versioned, fixture-tested canonical form. The exact library and version must be pinned after dependency/license/security review.
3. Compute SHA-256 over the UTF-8 canonical bytes and store lowercase hex in canonical_sha256. Recompute from stored bytes before every approval decision and before any later execution authorization. Never trust a client-provided hash as proof of content.
4. Insert a new SPECIFICATION_VERSIONS row with request revision, monotonically increasing version number, creator, timestamp, schema version, exact canonical content, and hash. Existing versions are never updated in place.
5. Update the request's active specification pointer only under verified compare-and-set/transaction semantics. Do not allow concurrent spec writers to produce two active heads.
6. When a new version becomes active, all earlier approvals cease to authorize work because approval validity is derived against the current spec ID and hash. Record a SUPERSESSION event when the old approval was already decided.

Catalyst Data Store's public Text limit is 10,000 characters. The schema proposal caps canonical spec bytes at 8 KiB. Reject oversize content visibly; do not silently truncate or store it in Stratus, which is not selected.

## Approval record model

Approval history is append-only. The proposed APPROVAL_RECORDS table stores:

- record ID and schema version;
- project, request, optional task, owner, and exact specification-version references;
- the expected specification SHA-256;
- an immutable canonical operation-scope JSON snapshot and its SHA-256;
- record type: SUBMITTED, DECISION, REVOCATION, or SUPERSESSION;
- decision for DECISION records: APPROVED or REJECTED;
- server-derived actor user ID and UTC time;
- related approval ID for revocation/supersession;
- allowlisted reason code and optional bounded comment;
- idempotency digest and correlation reference.

Do not mutate an earlier approval into a different decision. A revocation is a new record referencing the prior approval. Supersession is a new record referencing the old approval and the new active specification. State is derived by replaying valid records and checking the active specification pointer/hash. A specific current-state cache may be added only if it can be rebuilt from the event records and verified against concurrency behavior.

## Decision flow

~~~mermaid
sequenceDiagram
  participant O as Project owner
  participant W as Web UI
  participant F as Authenticated Function API
  participant D as Data Store
  O->>W: Review exact spec version and hash
  W->>F: Submit decision + spec ID + expected hash + expected version
  F->>F: Verify session, derive actor, validate input
  F->>D: Load project, owner, active spec, content, current approval
  D-->>F: Persisted current records
  F->>F: Recompute canonical hash and enforce state/version
  F->>D: Append decision + audit under required atomic strategy
  D-->>F: Confirm committed records
  F-->>W: Safe approval response + correlation ID
~~~

This is a logical sequence, not a verified Catalyst transaction. If a stale spec wins a race, a second approval races, or the audit insert fails, the API must not report success. The exact atomic write strategy is a blocking database proof-of-capability.

## Decision rules

- Only the authenticated project owner may approve/reject in the individual M1 model. `actor_user_id` comes from verified server identity; body actor/owner fields are rejected.
- The exact bounded approval scope is persisted before a decision and included in the decision reference: purpose; exact task IDs; environment (development only unless separately approved); allowed resources/tools; network policy (off by default); usage/operation ceiling; INR cost ceiling (INR 0 under current approval); data scope; and review/expiry condition. No wildcard tasks, open-ended duration, or future deployment/model/code-execution grant is implied. Unsupported scope fields are rejected.
- The submitted spec ID must belong to the same project/request/owner. The server loads canonical content, recomputes SHA-256, and verifies both stored hash and current active version.
- Scope is canonicalized and hashed server-side separately from specification content. A decision must match both the current specification hash and the exact submitted scope hash.
- The client sends expected specification ID, hash, and aggregate row_version/ETag. Any mismatch returns CONFLICT / APPROVAL_STALE and asks the user to review the new version.
- Before approval, display the complete bounded content, version, hash prefix/full hash in accessible UI, exclusions, cost/service scope, and evidence status. The recorded acknowledgment means the user submitted the displayed version/hash; it does not cryptographically prove attention or comprehension.
- Approval scope is explicit: `purpose`, `task_ids`, allowed resources/tools, environment, cost ceiling (must be zero unless separately approved), data scope, and expiry/review point where applicable. No open-ended blanket execution grant.
- Approval does not override policy, failed QA gates, usage pause, authentication/ownership checks, data deletion, or founder approval gates.
- Rejection creates an immutable rejection record and moves the related task to BLOCKED or request to REJECTED according to its aggregate. A revised spec is a new version and requires a new submission/decision.
- Revocation is available only before the operation's defined point of no return; it blocks queued/unstarted work. Running work receives safe cancellation and is not called revoked-and-stopped until acknowledged.
- On spec edit, the prior approval remains as historical fact but is no longer current/usable. Record a SUPERSESSION history event and require review of the new hash.
- Duplicate identical decision requests with the same scoped Idempotency-Key return the original safe outcome; a different body under the same key is a conflict.

## Concurrency and replay protection

Threats include: content changes after the user loads it; two users/requests approve different revisions; a second request repeats a decision; revocation races task dispatch; deletion races approval; and an attacker replays an old valid decision. Protect with immutable spec rows, server-side hash recomputation, expected row_version/ETag, idempotency digest, a verified atomic transition, and a dispatch-time recheck of owner/current hash/current approval/revocation/cost/cancellation. An approval event must be bound to one spec hash and never accepted on a different version.

Catalyst's public docs establish foreign keys and CRUD but do not establish the multi-row atomicity or compare-and-set semantics required here. Until an approved account test proves them, the approval feature remains design-only and provider adoption is not cleared for state-changing workflows.

## Audit requirements

Record APPROVAL_SUBMITTED, APPROVAL_APPROVED, APPROVAL_REJECTED, APPROVAL_REVOKED, APPROVAL_SUPERSEDED, APPROVAL_STALE_REJECTED, SPEC_VERSION_CREATED, and any operation blocked by an obsolete approval. Include actor, project/request/task/spec IDs, hash, old/new version, reason code, UTC time, correlation ID, and idempotency result. Never log raw auth token or unnecessary request content. Append-only application behavior and hash chaining are tamper-evidence, not a claim of immutable provider storage.

## Tests required before implementation is accepted

- Approving current version creates an approval for exactly the persisted hash and owner.
- Owner spoofing, unauthenticated request, non-owner, wrong project, unknown spec and wrong hash are denied without leaking cross-user existence.
- Content modified after render, stored content/hash mismatch, stale row_version, stale current pointer, and changed spec all fail safely.
- Approval and rejection are idempotent; same key/different payload conflicts.
- Two concurrent decisions cannot create an ambiguous current approval.
- New spec supersedes effective authorization but preserves old record.
- Revocation blocks queued work; a running worker is not claimed stopped without acknowledgement.
- Audit/domain partial failure does not return success or silently lose evidence.
- Hash canonicalization passes fixed test vectors across local and Function runtimes.

No approval behavior is implemented or tested in this phase.

## Sources

- [Catalyst Data Store column types and Text limit](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/columns/)
- [Catalyst Data Store foreign keys and delete behavior](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/columns/)
- [Catalyst Authentication and invited users](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/users/implementation/)
- Companion contracts: [Database design](PHASE_2A_DATABASE_DESIGN.md), [API contracts](PHASE_2A_API_CONTRACTS.md), [Task lifecycle](PHASE_2A_TASK_LIFECYCLE.md).
