# Phase 2A — Security Threat Model

**Status:** In Design — threat model proposal 1, 2026-11-12
**Security status:** No backend security control is implemented or tested. The local frontend remains a demo preview and must not receive confidential data. A design checklist is not evidence that the application is secure.

## System and trust boundaries

~~~mermaid
flowchart LR
  U[Untrusted user/browser] -->|HTTPS, untrusted JSON/session| W[Next.js UI / Slate if approved]
  W -->|Catalyst supported login| IDP[Catalyst Authentication]
  W -->|Authenticated /api/v1 request| F[Public Catalyst Function boundary]
  F --> AUTH[Session verification and identity mapping]
  AUTH --> OWN[Owner authorization/domain validation]
  OWN --> DS[Private server-side Data Store adapter]
  F --> LOG[Redacted app logs + correlation IDs]
  F --> BILL[Usage ceiling and fail-closed pause]
  ADMIN[Named account administrator] -->|invite, disable, recovery| IDP
  OPS[Named operator] -->|separate permission| CFG[System config / kill switch]
  ATTACK[Malicious request, dependency or future generated code] -. untrusted .-> W
  ATTACK -. restricted and isolated in any future execution phase .-> SANDBOX[Not implemented / separately approved]
~~~

Trust boundaries are logical. Exact Slate/Functions URL, CORS rules, provider session claims, SDK context behavior, and Data Store privilege model are unverified. Do not treat same-origin policy, UI route guards, API keys, Catalyst row IDs, or a hidden button as authorization.

## Assets and security objectives

- User identity references and sessions; project names, prompts, requirements, specifications, approval decisions and audit history.
- Ownership and state integrity; exact specification/hash that was approved; data export/deletion; operator configuration and usage caps.
- Catalyst credentials, OAuth tokens, API secrets, logs, build variables, and any future artifacts/source packages.
- The INR 0 usage gate and availability of the local preview.

Security objectives: confidentiality across users; authenticated and owner-authorized mutations; immutable-by-application spec/approval history with detectable tampering; safe cancellation/recovery; minimal collection and deletion/export; no secret exposure; no unapproved chargeable operation; verifiable—not assumed—delivery evidence.

## Threat review and proposed controls

| Threat | Example/impact | Proposed preventive/detective control | Required QA evidence / residual risk |
|---|---|---|---|
| Broken access control / IDOR | Change a project/request/task/approval ID to view or mutate another user's record. | Verify current session; resolve parent project; compare server-derived owner_user_id on every read/write and child-parent link; scope query with owner and project; return generic 404. Table scopes are defense in depth only. | Cross-user matrix for every endpoint/entity, including guessed/random IDs and nested ownership mismatch. No tests yet. |
| Client owner/actor spoofing | Submit another owner's ID, ADMIN role, timestamp, state, or approval actor. | Strict schema rejects protected fields; derive actor/owner/role/time server-side; field allowlist for patches. | Negative tests with every reserved field; inspect stored rows. |
| Authentication bypass / admin-context fallback | Missing token causes a Function SDK to run with project-admin credentials and access data. | Explicitly validate user context before business logic; fail closed if identity absent; distinguish end-user and service scopes; never fallback to admin. Public Catalyst SDK FAQ warns unauthenticated Function context can run as admin; validate exact new JS SDK behavior. | Anonymous, invalid, expired, wrong-DC and malformed-token integration tests; verify no admin identity accepted. Blocking provider spike. |
| Invite/public-signup bypass | Unrestricted registration or reusable/leaked invite link grants access. | Public signup off in all auth types; only named admin invites; restrict invite admin; test invalid/revoked/expired setup/recovery; generic messages; do not promise expiry until documented. | Account-console evidence plus real invite/recovery tests. Expiry/revoke behavior is UNVERIFIED. |
| Session theft/fixation | Token copied from browser storage, logs, URL, referrer, or script. | Use provider-supported SDK; HTTPS; avoid token in query/string/log/localStorage if SDK offers safer mechanism; minimize lifetime; CSP; logout and disable-user tests. Never roll custom JWT/session scheme without review. | Verify exact SDK cookie/storage, token refresh, revoke, logout and SSR support in current Catalyst JavaScript SDK. Unverified. |
| CSRF | A cross-site page causes cookie-authenticated state change. | If ambient cookies are used: SameSite, secure/HttpOnly where compatible, Origin/Referer validation, anti-CSRF token, no state-changing GET. If explicit bearer header: avoid ambient cookie fallback and still verify CORS. | Browser integration tests across origins and cookie settings. Auth transport choice unresolved. |
| CORS misconfiguration | Untrusted origin sends requests or reads responses. | Exact allowlist for actual preview/staging origins, no wildcard with credentials, restrict methods/headers; remember CORS is not authentication. | Browser tests for allowed and disallowed origins. Exact Catalyst settings unverified. |
| XSS / unsafe rendering | Prompt/spec/comment content executes in UI and steals session. | React escaped rendering, no unsanitized HTML/Markdown, sanitized allowlisted rich text if later needed, CSP/nonce strategy, restrictive links, security headers. Never render generated code as executable UI. | Stored/reflected/DOM XSS cases and CSP report; test all user-controlled fields. |
| Injection (ZCQL/SQL/command/template) | Malicious field changes query, command, or report renderer. | Use typed SDK methods and parameter binding where officially supported; otherwise strict validated values and fixed query shapes; no client-controlled table/column/operator; no shell command from content. | Confirm parameterization capability before code; injection payload suite for quotes, Unicode, null bytes and wildcard. SDK parameterization remains unverified. |
| SSRF / malicious URL | User submits URL to internal metadata/network endpoints. | M1 API does not fetch arbitrary user URLs; integrations must be allowlisted, use HTTPS/egress policy, resolve/check private/link-local IPs after redirects, cap response/time and block redirects to internal hosts. | SSRF/redirect/DNS-rebinding test before any fetch feature. No remote-fetch feature now. |
| Unsafe file upload/archive | Zip-slip, executable payload, oversized artifact or malware. | No uploads in M1/Phase 2A. Later enforce size/count/type by content sniff, random object keys, archive path normalization, malware scanning, private bucket, signed short-lived download, retention and no execution. | Adversarial archive/size/MIME tests before enabling; storage provider not selected. |
| Rate abuse / denial / resource exhaustion | Enumeration or huge requests consume Functions/Store quota. | Per-identity and network limits, body/depth/array/page caps, bounded time/retries, concurrency controls, generic throttling, circuit breaker; pause on unknown account usage. | Burst/429 tests and account quota verification. Exact limits are account-dependent. |
| Cost/usage abuse | Automated retries or shared-account usage causes billable overage. | Remote/billable switches OFF by default; application usage ceiling and operator kill switch; manual account usage review; one bounded idempotent retry; no polling/AI/invites/deploy until approved. If usage/billing unknown, fail closed. | Test every operation paused at and above caps; verify shared account and billing status. App-level control cannot see other projects. |
| Secret leakage | Keys in Git, Next public env, generated prompt, logs or errors. | Secret manager only after provider verification; no credential fields in product; server-only names, never NEXT_PUBLIC; redact headers/body and provider errors; repository secret scan and dependency secret audit. | Automated secret scan and log redaction tests; key rotation/revocation runbook. |
| Audit tampering / repudiation | Privileged account changes event rows; incomplete event after failed mutation. | App-level append-only API; actor/correlation/hash chain; restrict Data Store update/delete scope; separate audit writer if feasible; reconciliation; export signed digests only if separately approved. | Partial-write/concurrency/privileged tamper simulation. Hash chain is not immutable against privileged rewrite. Transaction guarantees unverified. |
| Approval replay/race | Approve v4 while v5 becomes current; replay stale decision to dispatch. | Immutable spec rows; server canonical hash recomputation; expected spec ID/hash and row version; idempotency; dispatch-time check of current approval/revocation/cost. | Concurrent spec-edit/approve/revoke/dispatch tests. Requires provider atomic compare-and-set/transaction proof. |
| Privilege escalation | Normal user invites others, changes configuration, grants roles, or accesses operator tools. | Deny by default; separate user/admin/operator roles; no client role authority; invite through named account admins; admin audit; no blanket support content access; time-bounded break glass only by separate approval. | Role/action matrix tests and negative privilege checks. |
| Dependency/supply chain | Compromised/transitive dependency runs in build or Function. | Exact lockfile, registry integrity, license/purpose review before install, advisory review, minimal imports; no unsigned code/plugins; review postinstall scripts; update/rollback plan. | Reproducible npm ci, audit/SBOM and vulnerability disposition before release. Existing frontend audit has documented moderate dev-tool findings. |
| Data deletion / export exposure | Export includes another owner's data; closure leaves records; backup is claimed deleted without evidence. | Owner-scoped export, re-auth + confirmation for delete, ordered child cleanup/de-identification, progress/status, audit policy, backup caveat. | Two-user export separation, deletion reconciliation and written provider backup evidence. Retention/backup behavior unresolved. |
| Future generated code execution | Prompt output accesses host secrets/network or escapes sandbox. | Excluded now. Future isolated disposable workspace, non-root, no host mounts/secrets, deny network by default, CPU/memory/time/process/file caps, signed artifact transfer and explicit task approval. | Escape testing, policy review and separate founder approval before any execution capability. |

## Validation boundary

All HTTP data is untrusted. Parse JSON with depth and byte caps; reject unknown mutation properties; validate opaque IDs, enums, state transitions, text lengths, array counts, URL schemes where allowed, and schema versions. Normalize Unicode consistently before canonical hashing; do not normalize secret/token values. Validate both before and after any provider serialization. Use fixed query templates and identifier allowlists. Enforce aggregate invariants on the server, not just field-level rules.

## Logging, audit, and response

Generate correlation ID at the trusted boundary. Log only event type, safe actor ID, public entity IDs, response class, latency, bounded safe reason code, and redacted provider category. Do not log raw Authorization/Cookie headers, prompt/spec content by default, email invite links, reset URLs, API keys, SQL, or stack traces in user-facing responses. Limit operator log access and retention. Security-relevant denies should be rate-limited and aggregated so logs cannot themselves be abused into a charge.

## Privacy, deletion, backups, and incident recovery

Collect only opaque identity provider/subject, needed account state, and project data the user submits. Do not request sensitive personal data, credentials, payment details, or secrets. Establish a clear notice describing data purpose, region, providers, security/contact, retention, export, closure and deletion. User owns their supplied project specification and generated artifacts subject to clearly disclosed provider/operational rights; AANTVYOG must not silently repurpose it for model training. Qualified counsel must review applicable India privacy, consumer, contract and cross-border processing obligations before a public launch; this is not a legal conclusion.

Define per-class retention and account closure before release. Export only owner-scoped data. Delete/de-identify project content by the approved policy; preserve only lawful/necessary minimal audit facts. Request written provider confirmation of processing/storage/backup locations and deletion behavior. No backup deletion timeline is known. Before production, define backup frequency/retention, restore-point objectives, restore test, breach response, security contact, evidence preservation, and notification obligations with counsel. No monitoring/on-call capability is claimed.

## Residual risks and release gates

High unresolved gates: actual India account/DC and component availability; current SDK identity verification inside Functions; public signup/invite expiry and recovery behavior; table permission semantics; state/approval/audit atomicity and concurrency; account billing/quota state and strict zero-spend feasibility; provider backup/deletion statements; any Slate SSR/token handling. Until verified and independently tested, no backend launch/security claim is permitted. Catalyst project creation and all external actions require separate approval; payment method, paid service, overage and production deployment remain prohibited.

## Sources

- [Catalyst Authentication public signup](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/public-signup/)
- [Catalyst User Management and invitation flow](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/users/implementation/)
- [Catalyst general FAQ: data center and written residency statement](https://docs.catalyst.zoho.com/en/faq/general/)
- [Catalyst Node SDK context/scopes documentation (legacy examples; do not copy without the new SDK check)](https://docs.catalyst.zoho.com/en/sdk/nodejs/v2/overview/)
- [Catalyst modular JavaScript SDK release/deprecation notes](https://docs.catalyst.zoho.com/en/release-notes/sdk/)
- [Catalyst Data Store scopes and permissions](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/scopes-and-permissions/)
- [Catalyst CloudScale FAQ: authentication, invite and concurrency behavior](https://docs.catalyst.zoho.com/en/faq/cloud-scale/)
- [Catalyst free-tier usage and overage](https://docs.catalyst.zoho.com/en/deployment-and-billing/billing/free-tier/)
- Companion documents: [Architecture](PHASE_2A_ARCHITECTURE.md), [API contracts](PHASE_2A_API_CONTRACTS.md), [QA strategy](PHASE_2A_QA_STRATEGY.md).
