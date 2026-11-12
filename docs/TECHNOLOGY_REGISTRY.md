# Technology registry

**Status:** In Design
**Selection state:** founder-approved requirements and proposed stack defaults are recorded separately from provider/account verification and implementation.

## Status vocabulary

- **Proposed:** recommended option, not founder approval.
- **Founder Approved:** founder approved the decision/requirement on the recorded date; does not imply provider compatibility or setup.
- **Technically Verified:** checked against current official documentation and, where required, the actual account. Account-dependent checks must state their evidence.
- **Implemented:** configured or used in application code.
- **Tested:** behavior was checked and results recorded.

## M1 decision matrix

| Area | M1 decision | Decision status | Technical verification | Implementation / test |
|---|---|---|---|---|
| Data region | India | Founder Approved (2026-11-12) | India is a listed Catalyst DC, but the actual Zoho account/DC and per-component service availability have not been checked. | Not implemented / not tested. |
| Authentication | Real authentication; invite-only; public signup disabled | Founder Approved (2026-11-12) | Catalyst documents admin-managed invitations and password setup/reset. Invitation expiry and actual account configuration remain unverified. | Not implemented / not tested. |
| Persistence | Real persistence for identity references, projects, requests/tasks, approvals, audit events | Founder Approved (2026-11-12) | Catalyst Data Store is documented as relational persistence; exact schema, queries, indexes, access scopes, consistency and account capability remain to verify. | Not implemented / not tested. |
| Ownership | Individual account; one project owner; server checks `owner_user_id`; workspace collaboration later | Proposed implementation constraint | Must validate token/session and confirm server Function credentials do not bypass required filters. | Not implemented / not tested. |
| Frontend | Next.js App Router + TypeScript + Tailwind CSS | Proposed default | Next.js and Slate compatibility documented; app build and region behavior not checked. | Not implemented / not tested. |
| Frontend hosting | Evaluate Catalyst Slate | Proposed default | Slate lists native Next.js support, but Next apps run Node while serving requests; account/region/build settings, memory/usage costs, and the zero-cost fit are unverified. | Not implemented / not tested. |
| Backend | Catalyst Functions with Node.js; Functions-first | Proposed default | Catalyst documents Node 22 and 24 runtimes; account availability/limits and function auth pattern still require verification. | Not implemented / not tested. |
| AppSail | Excluded from M1 absent a documented Functions gap | Proposed constraint | No M1 requirement currently demonstrates a gap. | Not selected. |
| Data store | Catalyst Data Store | Proposed platform default; persistence requirement Founder Approved | Data Store supports relational records, queries, and table scopes/permissions. Row-level owner checks remain an application responsibility. | Not initialized. |
| AI | No model, provider, or generated-code execution | M1 exclusion | No service evaluation needed for M1. | No calls or configuration. |
| Package manager | npm | Proposed local default because npm is present with Node; no app manifest/lockfile exists. | Confirmed local npm `11.8.0`; no app dependencies are installed. | Not configured. |
| Unit testing | Vitest | Proposed | Verify Next.js version compatibility and async server component coverage. | Not installed / not tested. |
| Browser testing | Playwright | Proposed | Verify supported browsers and local/hosted test strategy. | Not installed / not tested. |
| Cost | INR 0 target; no paid plan, payment method, overage, or production deployment | Founder financial constraint in the request | Public docs state free allowances are shared across the account and usage past a resource allowance can trigger billable use/minimum project billing. Billing state unverified. | No billable actions authorized. |

## Backend options

| Option | Fit for M1 | Reason / tradeoff | Decision |
|---|---|---|---|
| Catalyst Functions (Node.js) | Good candidate | Small server-side APIs and lifecycle operations fit Functions-first; avoids a separately managed always-on web service. Must confirm runtime limits, request handling, auth verification, and transaction/query needs. | Proposed. |
| Catalyst AppSail | Not currently justified | General managed application runtime may help if persistent process, unsupported framework, or request/runtime needs exceed Functions. Adds a service and separate usage/billing surface. | Excluded unless documented gap and founder approval. |
| Next.js server routes as sole backend | Alternative to compare | Slate documents Next.js support and a Node runtime while serving Next.js requests. This could consolidate hosting but couples APIs to the Slate runtime; compare auth, request limits, and cost with Functions before selection. Keeping a separate Functions boundary is the current proposal, not a verified technical necessity. | Not selected; compatibility/cost comparison remains open. |
| Self-hosted Node service | Fallback only | Offers control but requires separately evaluated hosting, operations, security, and cost; conflicts with current zero-cost target until proven otherwise. | Not selected. |

## Authentication and invitation notes

The proposed initial flow is Catalyst's native hosted authentication with public signup disabled and administrator-created invitations. Public Signup disabled means no signup UI/social-login path; Catalyst docs describe console user invitations that send password setup links and administrator password reset. Catalyst documentation states a maximum of 25 end-users in a development environment; confirm the current account limit. The reviewed docs do not state invitation-link expiration behavior. Verify expiry, revocation, account recovery, session/token validation, and development user limits before initialization. Do not build a home-grown or fake login screen.

Sources: [Public Signup](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/public-signup/), [User Management](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/users/implementation/), [User Management overview](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/introduction/).

## Node.js and CLI readiness

- Local environment observed during this review: Node.js `24.13.1`, npm `11.8.0`; Catalyst CLI is absent.
- Current Catalyst security guidance specifies Node.js `24.22.1` or later, or `22.23.4` or later. The current local 24.x patch is below that recommendation. Slate currently offers Node 22 for framework applications; if Slate is selected for Next.js, prefer a local Node 22.23.4+ baseline for runtime parity, while verifying Function runtime compatibility separately.
- Catalyst CLI release notes list `1.27.2` as the September 2026 release with a deployment fix. Recheck the latest stable version at installation and run `catalyst --version` afterward.
- Do not silently update system Node.js or install/upgrade global tools. Those actions require further explicit permission.
- After approval, install the supported Node version, install current stable CLI, verify Node/npm/CLI versions, authenticate only against the approved account/DC, and use official CLI initialization to generate configuration. Do not fabricate `catalyst.json` or `.catalystrc`.

Sources: [Catalyst Node security update and CLI guidance](https://docs.catalyst.zoho.com/en/announcements/2026/node-security-update/), [Catalyst CLI release notes](https://docs.catalyst.zoho.com/en/release-notes/cli/), [Install Catalyst CLI](https://docs.catalyst.zoho.com/en/getting-started/installing-catalyst-cli/).

## Region, privacy, and account review

India is a supported Catalyst data center. Catalyst says the account and its projects use the Zoho account's data center; use the actual account domain/API domain to verify it. Confirm each needed component is available there and ask Catalyst support for a written statement identifying where each component processes, stores, and backs up data. A region decision is not a data-residency guarantee for every subprocess or backup. Collect only account email/identity reference and project data needed for service. Define user export, deletion, retention and audit handling. Do not state backup deletion guarantees until confirmed.

Source: [Catalyst data-center and data-residency FAQ](https://docs.catalyst.zoho.com/en/faq/general/).

## Billing and usage controls

Strict target is INR 0. Catalyst's current public docs state that free-tier usage is account-wide across organizations/projects, and that exceeding a resource allowance makes usage chargeable; Catalyst also documents a USD 5 minimum bill per project with billable activity after a free-tier limit is exceeded. A free plan is not an unlimited-free guarantee. Do not assume internal application throttles alone can guarantee zero billing. Before any Catalyst use, check account billing mode and usage, establish conservative per-account ceilings, disable/pause work as the limit approaches or usage status is uncertain, and obtain founder review. No payment method, credits requiring a card, subscription, paid API, or production deployment is authorized.

Sources: [Free Tier Usage](https://docs.catalyst.zoho.com/en/deployment-and-billing/billing/free-tier/), [Catalyst billing FAQ](https://docs.catalyst.zoho.com/en/faq/general/), [Free Tier page](https://catalyst.zoho.com/free-tier/).

## Local development and test approach

Proposed local workflow: run the Next.js app locally with a sanitized, explicitly labelled fixture mode; run Catalyst Functions locally through the official CLI only after the runtime and CLI are approved; connect only to isolated non-production test data; keep local secrets in ignored environment files. Keep a distinct integration mode for real Catalyst Auth/Data Store verification and never label fixtures as persisted data. npm is the proposed package manager; no package manifest or lockfile exists. Proposed test tools are Vitest for unit/domain rules and Playwright for browser flows, cross-owner behavior, and asynchronous Server Component paths. These tools are not installed.

Sources: [Next.js App Router installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Next.js testing guide](https://nextjs.org/docs/app/guides/testing), [Catalyst Slate Next.js runtime details](https://docs.catalyst.zoho.com/en/announcements/2026/node-security-update/), [Catalyst local serve behavior](https://docs.catalyst.zoho.com/en/cli/v1/serve-resources/serve-all-resources/).

## Dependency evaluation rule

Before adding an application dependency, record version, license, maintenance, transitive risk, owner, permissions, cost, free alternative, security impact, and migration path. Prefer current Catalyst SDKs only after verifying runtime support; older Node.js/Web SDK generations are deprecated in current Catalyst documentation. No app dependencies were installed in this review.
