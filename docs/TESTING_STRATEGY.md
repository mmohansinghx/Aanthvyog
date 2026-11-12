# Testing strategy

**Status:** In Design
**Test evidence:** no application exists in the inspected workspace; no tests were run for this documentation-only foundation.

## Independent QA model
QA & Delivery uses criteria prepared independently of Engineer claims. An agent or engineer cannot mark its own unverified output Tested. QA records environment, version, exact command or procedure, outcome, defects, and reviewer. Founder retains release authority.

## Proposed test layers
- **Unit:** domain rules, state transitions, validation, cost and usage limits.
- **Contract:** request/response schemas and versioned agent handoffs.
- **Integration:** identity, persistence, storage, API behavior, and ownership enforcement using isolated test data.
- **Security:** cross-owner access, auth bypass, injection, CSRF, SSRF where applicable, file traversal, secret leakage, rate limits, and generated-workspace boundaries.
- **End-to-end:** approved flows from request intake through approval, cancellation, QA findings, and handover.
- **Accessibility and responsive:** keyboard operation, semantics, contrast, layout, supported viewport/browser matrix.
- **Resilience:** timeout, retry, idempotency, cancellation, provider failure, partial writes, and recovery behavior.
- **Migration and recovery:** schema compatibility, backup restore, export, and deletion behavior.

## Required post-implementation checks
For each approved implementation milestone, run and record the applicable lint command, TypeScript check, automated tests, production build, and security review. Include exact commands, environment, source revision, results, and failures. Do not mark a check passed when it was skipped or not run. QA independently reviews the evidence and acceptance criteria.

## Release evidence
For each acceptance criterion, record a traceable test or review result. A release candidate should include:
- Exact source revision and environment.
- Lint, type-check, automated-test, and production-build outcomes.
- Security findings and disposition.
- Dependency and configuration review.
- Data migration and rollback evidence where applicable.
- QA recommendation and founder release decision.

## Open decisions
Define browser support, accessibility target, performance thresholds, availability and recovery objectives, test data policy, staging strategy, security test ownership, and release evidence retention. Values are intentionally not invented here.
