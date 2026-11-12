# AANTVYOG - organization and engineering foundation

**Tagline:** Intelligence. United.

This repository contains the AANTVYOG operating model, engineering documentation, M1 architecture decisions, and a local-only frontend preview for the AI Website & Web Application Builder. The preview is not a connected product: it uses labelled fixtures and browser-only request state. It has no real authentication, API, database persistence, Catalyst services, or operational AI agents.

## Current project state
At the start of the local implementation authorization, `main` and `origin/main` both pointed to `55586d6475b4120d8a43b73be16dd587ebd282be`, with a clean local working tree. That revision contained documentation only. The local working clone is under the Codex workspace at `work/Aanthvyog`. The current local tree now includes `apps/web` with an App Router frontend, package manifest/lockfile, and local unit/component tests. Check `git status` for any uncommitted work and check the remote branch separately; local files are not evidence of remote presence.

## Status and evidence
Decision statuses use: Proposed, Founder Approved, Technically Verified, Implemented, Tested. Feature statuses use: Planned, In Design, In Development, Implemented, Tested, Released. These status tracks are separate: a founder-approved decision is not proof of technical verification or implementation. India region, invite-only authentication, and real persistence were Founder Approved on 2026-11-12; the account setup and application controls remain unverified and unimplemented. The landing, dashboard, structured request form, project workspace, approval, activity, and access-status interfaces have a premium responsive UI and are locally tested as a demo preview only. The request form validates and previews in browser memory; nothing is persisted or submitted. Approval actions remain disabled, and no account, database, API, or AI agents are connected. See the app README for local commands and limits.

## Documents
- [AGENTS.md](AGENTS.md) - instructions and approval gates for future contributors.
- [Company operating model](docs/COMPANY_OPERATING_MODEL.md) - 15 functional departments, deliverables, inputs, boundaries, dependencies, and reviews.
- [Project master](docs/PROJECT_MASTER.md) - inspected state, open decisions, and proposed first development milestone.
- [Decision register](docs/DECISION_REGISTER.md) - approval and verification state for M1 architecture decisions.
- [Local frontend preview](apps/web/README.md) - local development commands, routes, and demo-only limitations.
- [M1 technical preflight](docs/M1_TECHNICAL_PREFLIGHT.md) - environment audit, implementation blueprint, service checks, cost controls, and coding sequence.
- [Phase 2A backend architecture](docs/PHASE_2A_ARCHITECTURE.md) - documentation-only system design and provider verification gates.
- [Phase 2A database design](docs/PHASE_2A_DATABASE_DESIGN.md) and [API contracts](docs/PHASE_2A_API_CONTRACTS.md) - proposed versioned schema, ownership, validation, and endpoint contracts.
- [Phase 2A security threat model](docs/PHASE_2A_SECURITY_THREAT_MODEL.md), [task lifecycle](docs/PHASE_2A_TASK_LIFECYCLE.md), and [approval design](docs/PHASE_2A_APPROVAL_DESIGN.md) - access risks, transitions, and immutable approval versioning.
- [Phase 2A QA strategy](docs/PHASE_2A_QA_STRATEGY.md), [cost/dependency review](docs/PHASE_2A_COST_AND_DEPENDENCY_REVIEW.md), and [implementation roadmap](docs/PHASE_2A_IMPLEMENTATION_ROADMAP.md) - independent evidence requirements, zero-spend gates, and proposed next phases.
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

Phase 2A documents are an architecture proposal, not backend implementation evidence. Where the older M1 schema/API drafts differ, the Phase 2A database design and API contracts are authoritative for the next review. Catalyst account configuration, authentication, persistence, ownership checks and provider capabilities remain unimplemented or unverified.

## Approval status
The founder approved India as the intended data region, real invite-only authentication, and real persistence for core records on 2026-11-12. The founder later authorized the local Next.js App Router/TypeScript/Tailwind frontend and demo fixtures, plus a side-by-side Node.js 24.22.3 runtime. The local frontend does not implement the approved authentication or persistence requirements. Catalyst Slate evaluation, Catalyst Functions, Catalyst Data Store, and Catalyst Authentication still require account and technical verification. No Catalyst project has been initialized, no paid service or model provider is configured, and INR 0 remains the strict operating target. See [the decision register](docs/DECISION_REGISTER.md).
