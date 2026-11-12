# Security policy

**Status:** In Design
**Policy state:** baseline requirements for future implementation; controls are not deployed.

## Security objectives
Protect identity, project data, source artifacts, provider credentials, and generated execution environments. Apply least privilege, secure defaults, defense in depth, and evidence-based release review.

## Required controls
### Identity and authorization
- Authenticate through an approved identity mechanism.
- Authorize every protected server action; never rely on client-hidden controls.
- Verify user, workspace, project, run, and artifact ownership on every read and write.
- Define roles and privileged operations before collaboration or administration.

### Input, output, and application security
- Validate input types, size, and allowed values; encode output for its context.
- Use safe query and file APIs; defend against injection, XSS, CSRF, SSRF, path traversal, and unsafe redirects as applicable.
- Use secure cookie/session settings and rate limiting where supported.
- Return generic errors to users; keep sensitive diagnostics in access-controlled logs.

### Secrets and dependencies
- Keep secrets server-side in an approved secret store or protected environment.
- Never commit credentials or expose them in browser bundles, generated workspaces, examples, logs, or support artifacts.
- Review dependency purpose, maintenance, license, vulnerabilities, permissions, cost, alternatives, and migration path before adoption.
- Rotate credentials and restrict scopes; do not copy production secrets into local development.

### Generated code and files
- Treat prompts, generated source, archives, and dependencies as untrusted.
- Use isolated workspaces with restricted filesystem, process, network, CPU, memory, duration, and artifact permissions.
- Never allow arbitrary host paths or unrestricted shell execution.
- Validate archive contents, path names, file types, size, and content before storage or download.
- Do not expose environment variables or platform credentials to generated processes.

### Privacy and data lifecycle
- Define data classification, purpose, retention, export, deletion, backup deletion, and provider sharing before production.
- Minimize model context; approve provider and data terms before real model calls.
- Restrict support and operator access and audit sensitive access.
- Avoid unnecessary personal or sensitive data collection.

### Reliability and response
- Add structured logs with correlation IDs and redaction.
- Define backup, restore, incident escalation, vulnerability intake, and security patch timelines before release.
- Record exceptions, risk owner, expiry, and compensating controls; founder approves material risk acceptance.

## Review gates
Security reviews identity and ownership, file handling, generated execution, external integrations, secrets, data policy, and production readiness. QA independently verifies applicable controls. Founder approval is mandatory for external integrations, paid services, production deployment, major architecture, and material user-data changes.

## Incident handling
A future runbook must define detection, triage, containment, evidence preservation, notification obligations with qualified counsel, recovery, and post-incident review. This document does not claim a staffed security operation or provide legal advice.
