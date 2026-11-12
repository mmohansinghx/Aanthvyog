# Engineering standards

**Status:** In Design

## Architecture and code
- Use TypeScript for web and Node.js application layers where appropriate.
- Prefer small modules with explicit boundaries, typed contracts, and dependency injection at external boundaries.
- Keep presentation, domain logic, persistence, orchestration, and provider adapters separable.
- Avoid unnecessary dependencies and hidden global state.
- Preserve existing behavior unless the approved requirement intentionally changes it.

## Validation and authorization
- Validate environment variables at startup and fail clearly when required configuration is missing.
- Validate API request and response data at runtime at trust boundaries.
- Enforce server-side authorization and project ownership for every protected operation.
- Use explicit state-transition rules and idempotency for retried requests.
- Centralize safe error mapping; do not return stack traces, secrets, or raw provider errors.

## Data, logging, and secrets
- Keep secrets out of browser code, Git, generated projects, fixtures, logs, and documentation examples.
- Use structured logs with correlation IDs and redaction.
- Define data access, retention, export, deletion, and audit behavior before production.
- Do not trust client-supplied ownership fields, storage keys, paths, or role claims.

## Dependencies and external services
Before adoption, document purpose, cost, permissions, security implications, free alternative, and migration path in TECHNOLOGY_REGISTRY.md. Review license, maintenance, transitive dependencies, and supported versions. Do not activate paid services or create external accounts without founder approval.

## Change workflow
1. Inspect repository instructions, existing code, dependencies, and behavior.
2. State scope, risks, and acceptance criteria.
3. Make focused changes and update docs.
4. Review authorization, data exposure, injection, dependency, and failure behavior.
5. After implementation, run lint, TypeScript checks, automated tests, a production build, and a security review as applicable to the approved milestone. Record each exact check and outcome. If a check cannot be run or fails, report that clearly; do not claim it passed.
6. Report changed files, evidence, failures, and remaining risks.

## Naming and API conventions
Use descriptive domain names and consistent casing within each layer. Avoid ambiguous abbreviations. Version externally consumed APIs and schemas. Document compatibility and migration requirements before breaking changes. Keep status labels limited to Planned, In Design, In Development, Implemented, Tested, and Released.
