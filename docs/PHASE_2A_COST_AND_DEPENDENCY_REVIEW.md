# Phase 2A — Cost and Dependency Review

**Status:** In Design — review based on public documentation on 2026-11-12
**Financial gate:** Founder-approved target INR 0; no paid subscriptions, payment method, paid API, overage, or production deployment.
**Activity in this phase:** Documentation and public-documentation research only. No Catalyst project/service call, package install, paid action, or account change was performed.

## Zero-spend conclusion

The Catalyst baseline cannot yet be represented as guaranteed INR 0. Catalyst states that its free allowance is shared across all organizations/projects for an account, applies under its pay-as-you-go model, and usage beyond a resource allowance becomes chargeable. Public Catalyst FAQs also describe a USD 5 minimum for projects with billable activity once the applicable free allowance is exceeded, and development usage counts. This creates an account-wide overage risk that an application-level limiter cannot see or control by itself.

**Safe default:** no Catalyst initialization, account login, remote reads/writes, invitations, builds, previews, monitoring, or deployments until the actual account billing mode, remaining shared quotas, service availability, and zero-spend controls are reviewed. If zero charge cannot be demonstrated without payment-method entry or risking overage, retain local development only. A “free tier” is not unlimited free infrastructure.

## Potential billable or externally metered events

| Component/event | Potential meter or external effect | Phase 2A/M1 rule | Verification needed |
|---|---|---|---|
| Catalyst Functions | Invocations, compute duration/memory, outbound network, retries/concurrency. | No Function created or called. One bounded retry only in future, never on unknown usage. | Current account/DC rates/quotas, runtime ceilings, invocation triggers and disable switch. |
| Catalyst Data Store | Storage, inserts, reads, updates/deletes, ZCQL, indexes/search, concurrency and background bulk operations. | No tables/queries. No usage-generated data. | Current shared quota/meter per operation; row storage; indexing/bulk costs; account remaining pool. |
| Catalyst Authentication | App users, invitation/setup/recovery emails, authentication requests and potentially provider email or security services. | No account setup, invite, reset email, or sign-in flow. | India availability, invitation limits, email cost and behavior, user limits, exact billing. Public docs mention up to 25 app users in Development; verify current account terms. |
| Catalyst Slate | Build, SSR/app compute, memory, deploy previews, requests, bandwidth, logs, private Git integrations. | No project/deploy/preview/auto-deploy. | Actual Next.js SSR and memory/runtime pricing, build/preview/request quotas, region. |
| Catalyst API Gateway / Functions API | API requests, auth/rules, traffic/concurrency; enablement can alter endpoint routing. | No gateway configuration. | Whether required, billable meters, identity and CORS behavior, free limits. |
| Catalyst DevOps/CI/Pipelines | Build jobs, tests, logs, pipeline minutes/storage and concurrent jobs. | No pipeline/workflow created. | Exact meter, GitHub integration and free allowance. |
| Logs/APM/monitoring | Ingestion, retained log data, traces, alerts, egress. | No monitoring service selected. | Default logs included or metered, retention, export, region, overage. |
| Stratus/object storage | Bytes, requests, egress, retention, signed link operations. | Excluded; no file storage/upload. | Separate architecture/cost/security review and approval if needed. |
| Domain/DNS/TLS | Domain registration, DNS provider, CDN/egress or custom-domain service. | No domain purchase or external connection. | Current pricing/renewal and free TLS conditions if a later launch is considered. |
| Email/support/analytics | Mail delivery, customer support seats, analytics events, data processing. | No new integrations or tracking. | Purpose, licensing, privacy, retention, data region, free-plan scope and cost. |
| Future AI/model calls | Per-token/model/API requests and generated artifact storage/compute. | Explicitly excluded; no provider config or call. | Separate model/security/privacy/cost approval before any use. |
| GitHub CI | Hosted runner minutes, artifact storage and build jobs. | No CI workflow added in Phase 2A. | Current repository visibility, Actions quota and billing policy before enabling. |

Even when a published resource allowance currently lists free usage, it may be account-shared, may change, and may trigger charges after a threshold. Prices, quota values, currency conversion, regional features, or account-specific credits are not inferred from public examples.

## Proposed kill switches and usage ceilings

Initial settings (proposed controls; no implementation):

1. `REMOTE_CATALYST_ENABLED=false` and `BILLABLE_OPERATIONS_ENABLED=false` by default in every environment. Missing, malformed, stale, or unavailable settings mean false.
2. Separate operation flags for Function writes, Data Store mutations, Authentication invitations, Slate builds/previews and future model calls; no one flag silently enables all external services.
3. Require a preflight record with account DC, billing model, current account usage per meter, remaining allowance, other-project use/owners, monthly reset timing, and explicit allowed operation budget before changing a flag.
4. Propose an AANTVYOG ceiling no greater than 10% of each verified free monthly account pool, with an operator pause at 8% AANTVYOG allocation. These are internal safeguards only. They do not prevent other projects from consuming the shared pool; if the account-wide remaining pool cannot be monitored, leave remote use off.
5. Pause before the provider's free allowance reaches zero, on any unexplained usage discrepancy, threshold alert, API error indicating a limit, quota/billing API outage, or suspected external project usage. No catch-up retry after a pause.
6. The kill switch is independent of a long-running task: a named operator can disable remote flags, function triggers/dispatch, and credentials; queued work must re-read the flag before every attempt. No deployment/automatic pipeline is active.
7. Treat provider console usage as billing source of truth. Application `USAGE_RECORDS` are an internal estimate, not a billing guarantee.

The 10%/8% allocation is a proposed operational ceiling, not a founder-approved numeric budget. It is unusable until actual shared quotas and monitoring are verified, and even then cannot guarantee INR 0 if other users/projects can consume the pool. Founder review is required before any actual external use. The firm guard remains no payment method, no paid subscription/API, no overage, and no production deployment.

## Dependency decisions

| Dependency/service | Current state | Phase 2A decision |
|---|---|---|
| Existing frontend toolchain | Local exact lockfile in `apps/web`; prior tests/build passed. npm audit has 7 moderate findings in development-only ESLint/TypeScript lint tooling, 0 high/critical, and is not clean. | Keep as baseline for design; resolve/version-review advisories before release. No new package installed. |
| Catalyst Node.js SDK v2 (`zcatalyst-sdk-node`) | Official release notes place Node SDK v2 and Web SDK v4 in maintenance/deprecation from 2026-10-01, with planned support end 2027-10-01. | Do not adopt for new code without a documented feature gap and exception. Existing docs/examples may be stale. |
| Catalyst modular JavaScript SDK | Officially announced generally available in September 2026 as the shared, modular TypeScript-capable browser/server SDK replacing Node.js/Web SDKs. | Preferred for compatibility evaluation, not yet selected/installed. Verify exact component packages, Function Node 24 runtime, bundling, auth verification/context and license/security details before adding. |
| Catalyst CLI | Not installed globally; no local install in this task. | No installation, login, or initialization in Phase 2A. Later requires separate founder approval. |
| OpenAPI/JSON Schema library, canonical JSON library, Playwright, rate-limit/store components | Not selected or installed. | Evaluate exact version, license, maintenance, transitive risk, permissions, cost and alternative before any addition. Prefer built-in validation/simple domain code only if secure and testable; do not hand-roll cryptography/canonicalization. |
| Stratus, AppSail, AI model SDKs, analytics, email service | Not selected. | Excluded absent a documented technical need, cost/data review and separate approval. |

Before adding dependencies, record package purpose, exact version, license, maintenance, dependency tree, permissions, network/data handling, cost, free alternative, security impact, and migration path. Keep lockfile integrity and run an advisory/license review. No global dependency or machine setting is changed in this phase.

## Strict founder approval gates

- No paid plan, subscription, paid API, payment method, chargeable overage, external account creation, remote Catalyst project, production deployment, domain purchase, or AI provider.
- The already approved India region, invite-only auth and persistence requirements do not approve service use, payment configuration, or deployment.
- Any free-tier usage still requires account/DC and shared quota review plus separate permission for remote setup/use. If a zero-spend guarantee cannot be substantiated, do not activate it.
- If a test could send an email, consume an account-wide quota, write user data, or trigger billable usage, it requires an explicit test budget and safe account gate; no such activity happened here.

## Sources reviewed

- [Catalyst free-tier usage](https://docs.catalyst.zoho.com/en/deployment-and-billing/billing/free-tier/)
- [Catalyst pay-as-you-go and minimum billing](https://docs.catalyst.zoho.com/en/deployment-and-billing/billing/pay-as-you-go-model/)
- [Catalyst billing FAQ: Development and project minimum](https://docs.catalyst.zoho.com/en/faq/general/)
- [Catalyst general billing overview](https://docs.catalyst.zoho.com/en/deployment-and-billing/billing/introduction/)
- [Catalyst Function runtimes](https://docs.catalyst.zoho.com/en/serverless/help/functions/stack/)
- [Catalyst Data Store limits and concurrency FAQ](https://docs.catalyst.zoho.com/en/faq/cloud-scale/)
- [Catalyst invite/user-management flow and Development user limit](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/introduction/)
- [Catalyst SDK deprecation and JavaScript SDK notice](https://docs.catalyst.zoho.com/en/release-notes/sdk/)
- [Catalyst Slate framework support and deployment features](https://docs.catalyst.zoho.com/en/slate/help/introduction/)
- [Catalyst data-center and data-residency FAQ](https://docs.catalyst.zoho.com/en/faq/general/)
