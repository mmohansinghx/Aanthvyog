# Technology registry

**Status:** In Design
**Selection state:** preferred options are proposals, not confirmation of configured or available services.

## Evaluation rule
Before adopting any dependency or external service, record purpose, cost, permissions, security implications, free alternative, and migration path. Confirm current plans, terms, region, limits, and pricing directly before commitment. No paid service or account is activated by this registry.

| Area | Preferred option | Purpose | Cost | Permissions and security | Free alternative | Migration path | Status |
|---|---|---|---|---|---|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS | Responsive web interface and type-safe client. | Not estimated; hosting/runtime separate. | Browser gets no secrets; server routes enforce auth. | Other open-source TypeScript frameworks; local development. | Separate UI and domain APIs; document routing and CSS dependencies. | Proposed |
| Backend | Zoho Catalyst Functions with Node.js | Server-side application and orchestration endpoints. | Not evaluated; plan and usage dependent. | Scoped service credentials; isolate environments; confirm region and access model. | Local Node.js services or another approved platform option. | Provider adapter and domain service interfaces; export data and rewrite platform adapters. | Proposed |
| Authentication | Zoho Catalyst Authentication | User identity and session foundation. | Not evaluated; plan dependent. | Validate identity claims server-side; define roles, recovery, MFA, and region. | Local test identity for development only; evaluate alternatives. | Keep provider subject behind internal identity interface; plan account linking. | Proposed |
| Platform data | Zoho Catalyst Data Store | Project, task, approval, and metadata persistence. | Not evaluated; capacity and plan dependent. | Enforce owner scope in server data access; define backups and deletion. | Local test datastore; evaluate managed or self-hosted options. | Version schemas, export records, keep provider logic out of domain layer. | Proposed |
| Artifact storage | Zoho Catalyst Stratus | Store generated project artifacts. | Not evaluated; storage and transfer dependent. | Private buckets, scoped access, safe keys, retention, download authorization. | Local restricted test storage. | Artifact storage interface and portable content formats. | Proposed |
| Version control | Git and GitHub | Source history and collaboration. | Git is local; hosted service cost and terms not evaluated. | Review repository visibility, tokens, branch protections, secret scanning. | Local Git or another approved host. | Standard Git history; retain portable CI configuration. | Proposed |
| AI | Provider-neutral adapter; none selected | Permit controlled future model integration. | Unknown until evaluated; no calls authorized. | Review prompt exposure, retention, training terms, region, scopes, limits, abuse controls. | No-model workflow for development; compare provider alternatives on evidence. | Adapter contract and provider-neutral task records; avoid sensitive prompt logging. | Planned |

## Dependency decisions
No application dependencies were installed or evaluated in this documentation task. For later dependencies, add version, license, maintenance, transitive risk, owner, and approval record. "Free" does not mean risk-free or approved.
