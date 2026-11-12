# Changelog

All notable changes to the AANTVYOG foundation package are recorded here.

## 2026-11-12 - Local M1 frontend foundation
- Founder authorized a local-only Next.js App Router, TypeScript, and Tailwind implementation and a checksum-verified side-by-side Node.js 24.22.3 runtime; the system Node installation and machine-wide PATH were left unchanged.
- Added the responsive landing page, dashboard, structured request preview, project workspace/status tracker, disabled approval actions, static activity timeline, explicit no-agent state, and access-status page.
- Labelled demo fixtures and browser-only request preview throughout. No account identity, API, database write, Catalyst integration, AI provider, agent execution, or generated-code execution is present.
- Added local Vitest/React Testing Library tests and PowerShell helper for using the verified Node binary in the current shell only.
- Checks passed: `npm run lint`, `npm run typecheck`, `npm test` (3 files / 6 tests), `npm run build`. Mobile browser review at 390px showed no horizontal overflow on the activity route.
- `npm audit` reports 7 moderate findings in development-only ESLint/TypeScript lint tooling; no high or critical advisories were reported. The audit is not clean and the findings remain documented for follow-up.
- No Catalyst CLI/project, remote database, account, payment method, paid service, or production deployment was created.

## 2026-11-12 - Repository review and documentation baseline
- Verified that documentation commit `18c5f24` is present on local `main` and GitHub `origin/main`.
- Corrected the repository history: the docs are present remotely and locally; the repository remains documentation-only.
- The initial repository state at that commit had no application source, package manifest, tests, or Catalyst configuration.

## 2026-11-12 - Organization and engineering foundation
- Inspected the initial task workspace; found no application code, package manifest, or project documentation.
- Created the operating model for 15 functional departments and defined founder authority.
- Documented the proposed Architect, Engineer, and QA & Delivery roles and controlled orchestration workflow.
- Added proposed requirements, architecture, conceptual schema, API contracts, security policy, engineering standards, and independent testing strategy.
- Added technology evaluation, evidence-based research, marketing, financial model, and migration guidance.
- Recorded the first development milestone as a proposal requiring founder review.
- No external services were configured; no paid APIs were connected; no AI agents were represented as operational.
- No application tests or builds were run because the inspected workspace had no application.

## 2026-11-12 - M1 founder decisions and readiness documentation
- Recorded founder approval for India as the intended data region, real invite-only authentication, and real persistence for core records.
- Documented proposed Next.js/TypeScript/Tailwind, Catalyst Slate evaluation, Catalyst Functions, Catalyst Data Store, and Catalyst Authentication defaults; AppSail remains excluded absent a documented need.
- Added individual project ownership, server-side owner validation, a request/approval/audit data model, lifecycle and authorization requirements, and migration guidance.
- Recorded current account, invite expiry, region, schema/query, billing, retention, export, deletion, Node, and CLI verification gaps.
- Recorded the INR 0 target and the shared free-tier and minimum-billing risk; no paid services or payment method are authorized.
- No Catalyst project was initialized, no global tool was installed, no app code was added, and no tests were run.

## 2026-11-12 - M1 technical preflight
- Audited the Windows/Node/npm/Git environment, free space, CLI availability, and global developer tools without reporting personal identifiers.
- Verified the requested repository commit against local `main` and remote `origin/main`.
- Recorded current Node 24 LTS patch `24.22.3`, Catalyst security minimum, CLI `1.27.2`, Slate Node 22 compatibility, and the side-by-side upgrade proposal.
- Added a versioned frontend/backend, data/API, test, cost-control, and coding-sequence blueprint for founder review.
- No Node or global tool was installed/changed; no Catalyst project, database table, deployment, or test was created/run.
