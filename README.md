# AANTVYOG - organization and engineering foundation

**Tagline:** Intelligence. United.

This repository contains the AANTVYOG operating model, engineering documentation, M1 architecture decisions, and a local-only frontend preview for the AI Website & Web Application Builder. The preview is not a connected product: it uses labelled fixtures and browser-only request state. It has no real authentication, API, database persistence, Catalyst services, or operational AI agents.

## Current project state
At the start of the local implementation authorization, `main` and `origin/main` both pointed to `55586d6475b4120d8a43b73be16dd587ebd282be`, with a clean local working tree. That revision contained documentation only. The local working clone is under the Codex workspace at `work/Aanthvyog`. The current local tree now includes `apps/web` with an App Router frontend, package manifest/lockfile, and local unit/component tests. Check `git status` for any uncommitted work and check the remote branch separately; local files are not evidence of remote presence.

## Status and evidence
Decision statuses use: Proposed, Founder Approved, Technically Verified, Implemented, Tested. Feature statuses use: Planned, In Design, In Development, Implemented, Tested, Released. These status tracks are separate: a founder-approved decision is not proof of technical verification or implementation. India region, invite-only authentication, and real persistence were Founder Approved on 2026-11-12; the account setup and application controls remain unverified and unimplemented. The landing, dashboard, request form, project workspace, approval, activity, and access-status interfaces are implemented and locally tested as a demo preview only. The request form validates and previews in browser memory; nothing is persisted or submitted. See the app README for exact local commands and limits.

## Documents
- [AGENTS.md](AGENTS.md) - instructions and approval gates for future contributors.
- [Company operating model](docs/COMPANY_OPERATING_MODEL.md) - 15 functional departments, deliverables, inputs, boundaries, dependencies, and reviews.
- [Project master](docs/PROJECT_MASTER.md) - inspected state, open decisions, and proposed first development milestone.
- [Decision register](docs/DECISION_REGISTER.md) - approval and verification state for M1 architecture decisions.
- [Local frontend preview](apps/web/README.md) - local development commands, routes, and demo-only limitations.
- [M1 technical preflight](docs/M1_TECHNICAL_PREFLIGHT.md) - environment audit, implementation blueprint, service checks, cost controls, and coding sequence.
- [Product requirements](docs/PRODUCT_REQUIREMENTS.md) - initial product brief and proposed requirements.
- [System architecture](docs/SYSTEM_ARCHITECTURE.md) - proposed component and trust boundaries.
- [Database schema](docs/DATABASE_SCHEMA.md) - conceptual data model; not deployed.
- [API documentation](docs/API_DOCUMENTATION.md) - proposed contracts; not implemented.
- [Security policy](docs/SECURITY_POLICY.md) - design and operating requirements.
- [Agent workflow](docs/AGENT_WORKFLOW.md) - three-agent lifecycle, structured contracts, gates, and failure handling.
- [Engineering standards](docs/ENGINEERING_STANDARDS.md) - proposed code and change standards.
- [Testing strategy](docs/TESTING_STRATEGY.md) - independent QA requirements and evidence.
- [Technology registry](docs/TECHNOLOGY_REGISTRY.md) - approved requirements, proposed stack, technical checks, and cost risks.
- [Business research](docs/BUSINESS_RESEARCH.md) - evidence discipline and research backlog; no market claims asserted.
- [Marketing strategy](docs/MARKETING_STRATEGY.md) - positioning hypothesis and proof requirements.
- [Financial model](docs/FINANCIAL_MODEL.md) - model structure and unknown inputs, without invented estimates.
- [Migration guide](docs/MIGRATION_GUIDE.md) - future schema and provider migration controls.
- [Changelog](docs/CHANGELOG.md) - documentation foundation record.

## Approval status
The founder approved India as the intended data region, real invite-only authentication, and real persistence for core records on 2026-11-12. The founder later authorized the local Next.js App Router/TypeScript/Tailwind frontend and demo fixtures, plus a side-by-side Node.js 24.22.3 runtime. The local frontend does not implement the approved authentication or persistence requirements. Catalyst Slate evaluation, Catalyst Functions, Catalyst Data Store, and Catalyst Authentication still require account and technical verification. No Catalyst project has been initialized, no paid service or model provider is configured, and INR 0 remains the strict operating target. See [the decision register](docs/DECISION_REGISTER.md).
