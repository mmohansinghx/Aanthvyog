# Security policy

**Status:** In Design
**Policy state:** requirements for future implementation; controls are not deployed or tested.

## Phase 2A threat model

The attack-surface review and required validation/evidence are now detailed in [Phase 2A Security Threat Model](PHASE_2A_SECURITY_THREAT_MODEL.md). The accompanying [API contracts](PHASE_2A_API_CONTRACTS.md), [approval design](PHASE_2A_APPROVAL_DESIGN.md), and [QA strategy](PHASE_2A_QA_STRATEGY.md) define owner checks, stale-approval controls and negative tests. These are requirements only; they do not establish that the preview or a future backend is secure. Key blockers include proving user identity in the current Catalyst Function SDK context, owner-filtered data access, and atomic state/audit writes.

## Security decision state

- **Founder Approved (2026-11-12):** real authentication with invite-only access; real persistent core records; India as intended region.
- **Proposed controls:** Catalyst Authentication, server-side owner checks, least-privilege Catalyst Functions/Data Store access, audited lifecycle, and explicit usage ceilings.
- India account selection, Catalyst service settings, and application controls are not implemented or verified.

## Local preview boundary

- `apps/web` is a local-only interface preview. The dashboard and workspace show static fixtures; the request form performs client-side validation and holds its preview only in component state.
- The local preview has no login, invitation, session, API, database, project ownership, approval write, audit store, or agent execution. It must never be treated as an access-controlled application.
- Do not enter personal, confidential, or sensitive information into the preview. Keep the development server bound to loopback; do not expose it on a shared/public interface.
- The disabled approval buttons are presentation only; they do not record an approval or enforce an authorization policy. All protected controls still require server-side auth/ownership enforcement when a backend is separately authorized and implemented.

## Identity and access

- No unrestricted public signup in M1. Invitation is controlled by an administrator through a verified provider-supported process.
- Do not implement mock/fake authentication. Provider-managed password setup and recovery flows must be tested; define how invites expire, are revoked, and handle expired/invalid links before release. No expiry guarantee is assumed.
- Every protected API authenticates the session/token server-side. Frontend middleware, hidden navigation, and disabled buttons are not authorization controls.
- The authenticated identity is derived from verified server context. `owner_user_id` is server-assigned and enforced for every project, request, task, approval, and artifact operation.
- The M1 model is individual ownership: one owner per project. Workspace, membership, and collaborator roles are deferred.
- Catalyst table scopes/roles are defense in depth. App-level filtering by owner is mandatory, and Function credentials must be reviewed to ensure they do not bypass the intended user boundary.
- Do not give administrators blanket access to project content by default. Any support/break-glass access requires a separately approved, least-privilege, time-bound, audited procedure.

## Input, output, and application security

- Validate all inputs on the server, including field allowlists, string size, nested collection bounds, identifiers, state transitions, version/hash checks, and idempotency.
- Use safe query and file APIs; defend against injection, XSS, CSRF, SSRF, path traversal, and unsafe redirects where applicable.
- Use secure cookie/session settings, CSRF protections, and rate limits appropriate to the verified hosting/auth model.
- Return safe structured errors with correlation IDs. Redact credentials, tokens, request secrets, personal data, and internal stack traces from logs and user responses.
- Keep UI demo fixtures visibly labelled and inaccessible as if they were real user records.

## Secrets and dependencies

- Keep secrets server-side in a supported protected environment. Never commit credentials or expose them in browser bundles, logs, examples, or user project content.
- Do not store raw auth tokens or passwords in platform data.
- Review dependency purpose, maintenance, license, vulnerabilities, permissions, cost, alternatives, and migration path before adoption.
- Rotate credentials and restrict scopes; do not copy production secrets into local development.

## Data protection and lifecycle

- Collect only identity references and project data required to deliver M1. Do not request unnecessary sensitive personal information.
- Confirm the actual Zoho account's India data center and component availability. Request written component-level data residency information for processing, storage, logs, and backups if required.
- Define data classification, retention duration, user export, account deletion, audit-event retention, and support access before release.
- Do not claim that deleting an application record immediately removes all provider backup copies; verify and document the provider's actual deletion and retention behavior.
- Approval records bind the actor and decision to an immutable specification version/hash. Audit events capture relevant lifecycle/security actions without secrets.
- No model provider, AI call, prompt transfer, generated-code execution, or external model data sharing is in M1.

## Billing and abuse controls

- Target operating cost is INR 0. No paid subscriptions, payment method entry, paid API, overage, or production deployment is authorized.
- Catalyst free-tier allowances are shared across projects/account resources; overage can become chargeable and may trigger minimum billing. Do not describe this as unlimited free infrastructure.
- Before any Catalyst initialization or use, verify account billing mode and current usage. M1 must apply internal per-user/per-project request ceilings and an automatic pause before unapproved usage. If quota/billing state is unavailable or uncertain, pause usage.
- Usage controls are not a substitute for account billing controls; monitor account-level usage and stop before the free boundary.

## Generated code and files (future scope)

- Treat prompts, generated source, archives, and dependencies as untrusted.
- M1 makes no model call and executes no generated code. Any future implementation requires an isolated workspace with restricted filesystem, process, network, CPU, memory, duration, and artifact permissions.
- Never allow arbitrary host paths or unrestricted shell execution. Validate archive paths, file types, size, and content before storage/download. Do not expose environment variables or platform credentials to generated processes.

## Reliability, audit, and response

- Persist lifecycle transitions with a matching append-oriented audit event, actor, timestamp, and correlation ID. Audit metadata must use an allowlist and redact secrets.
- Make retries idempotent, bound work, and ensure cancellation prevents future work from starting.
- Define backup, restore, incident escalation, vulnerability intake, and security patch timelines before release.
- Record exceptions with risk owner, expiry, and compensating controls; founder approval is required for material risk acceptance.

## Review gates

Security review must cover identity and ownership, invite/recovery behavior, input validation, data lifecycle, billing pauses, secrets, audit trail, and any external integration. QA independently verifies controls. Founder approval is required before paid services, payment method entry, production deployment, Catalyst project initialization, external account changes, generated-code execution, or material user-data change as set by the current approval record.

## Incident handling

A future runbook must define detection, triage, containment, evidence preservation, notification obligations with qualified counsel, recovery, and post-incident review. This document does not claim a staffed security operation or provide legal advice.
