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
| Frontend | Next.js App Router + TypeScript + Tailwind CSS | Founder authorized local M1 preview implementation (2026-11-12); Catalyst hosting remains Proposed. | Local framework/runtime/build verified; Slate/account/region behavior not checked. | Local UI implemented and tested; no hosting connection. |
| Frontend hosting | Evaluate Catalyst Slate | Proposed default | Slate lists native Next.js support, but Next apps run Node while serving requests; account/region/build settings, memory/usage costs, and the zero-cost fit are unverified. | Not implemented / not tested. |
| Backend | Catalyst Functions with Node.js; Functions-first | Proposed default | Catalyst documents Node 22 and 24 runtimes; account availability/limits and function auth pattern still require verification. The current modular JavaScript SDK is preferred for evaluation; legacy Node SDK v2/Web SDK v4 entered deprecation on 2026-10-01. | Not implemented / not tested. |
| AppSail | Excluded from M1 absent a documented Functions gap | Proposed constraint | No M1 requirement currently demonstrates a gap. | Not selected. |
| Data store | Catalyst Data Store | Proposed platform default; persistence requirement Founder Approved | Data Store supports relational records, queries, and table scopes/permissions. Row-level owner checks remain an application responsibility. | Not initialized. |
| AI | No model, provider, or generated-code execution | M1 exclusion | No service evaluation needed for M1. | No calls or configuration. |
| Package manager | npm | Founder authorized local implementation default | App lockfile installed with npm `11.19.1`; system npm remains `11.8.0`. | Implemented and used locally. |
| Unit/component testing | Vitest + React Testing Library | Founder authorized local implementation default | Next.js's Vitest guide supports this combination for synchronous components; async Server Components need E2E coverage. | Implemented; 3 files / 6 tests passed locally. |
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

- Local environment observed 2026-11-12: Windows 11 Home Single Language (build 26300, 64-bit), system Node.js `24.13.1`, system npm `11.8.0`, Git `2.54.0.windows.1`; Catalyst CLI absent; current npm global prefix is user-scoped.
- Catalyst security guidance floor: Node.js `24.22.1+` or `22.23.4+`. The latest Node 24 LTS release on the Node.js official site as of 2026-11-12 is `24.22.3` (security release, published Nov 11); official Node archive associates npm `11.19.1` with the v24.22.3 archive. Recommend that release for local Node 24 target.
- Catalyst Slate currently offers Node 22 for framework applications, while Catalyst Functions supports Node 22 and 24. Latest Node 22 LTS patch is `22.23.5`. Therefore Next.js on Slate will run under Node 22 even if local development uses Node 24; validate both runtimes. Do not pin a production runtime until account support and build behavior are confirmed.
- Catalyst CLI release notes list `1.27.2` as the latest stable release as of this review. Catalyst's Windows installation page directs users to run the global npm install in an administrator terminal; the local npm prefix is user-scoped, so inspect permissions and avoid unnecessary elevation. `npm install -g` changes the active Node/npm global tool environment and PATH-visible CLI, and may require administrator rights if the prefix is machine-owned.
- Founder authorized the side-by-side Node trial on 2026-11-12. Official Node.js v24.22.3 Windows x64 ZIP SHA-256 was checked against the downloaded official `SHASUMS256.txt` and the official release page: `e612af99f626ab415ea225af6bce5c971feb448cb5cae250bb1c3fa50c5f7d9f`. The ZIP is extracted under `%LOCALAPPDATA%\AANTVYOG\toolchains\node-v24.22.3`; `node --version` reports `v24.22.3`, `npm --version` reports `11.19.1`. `apps/web/scripts/use-local-node.ps1` prepends the binary folder only to the current PowerShell process when dot-sourced. The system Node installation and machine-wide PATH were not changed.
- After explicit permission, recheck the latest Node 24 patch and CLI release, install the CLI at the approved scope, verify `node --version`, `npm --version`, `catalyst --version`, then authenticate only against the confirmed account/DC. Use official CLI initialization to generate configuration; do not fabricate `catalyst.json` or `.catalystrc`.

Sources: [Node.js 24.22.3 LTS release](https://nodejs.org/en/blog/release/v24.22.3), [Node.js 24 archive](https://nodejs.org/en/download/archive/v24), [Catalyst Node security update](https://docs.catalyst.zoho.com/en/announcements/2026/node-security-update/), [Catalyst CLI release notes](https://docs.catalyst.zoho.com/en/release-notes/cli/), [Install Catalyst CLI](https://docs.catalyst.zoho.com/en/getting-started/installing-catalyst-cli/).

## Region, privacy, and account review

India is a supported Catalyst data center. Catalyst says the account and its projects use the Zoho account's data center; use the actual account domain/API domain to verify it. Confirm each needed component is available there and ask Catalyst support for a written statement identifying where each component processes, stores, and backs up data. A region decision is not a data-residency guarantee for every subprocess or backup. Collect only account email/identity reference and project data needed for service. Define user export, deletion, retention and audit handling. Do not state backup deletion guarantees until confirmed.

Source: [Catalyst data-center and data-residency FAQ](https://docs.catalyst.zoho.com/en/faq/general/).

## Billing and usage controls

Strict target is INR 0. Catalyst's current public docs state that free-tier usage is account-wide across organizations/projects, and that exceeding a resource allowance makes usage chargeable; Catalyst also documents a USD 5 minimum bill per project with billable activity after a free-tier limit is exceeded. A free plan is not an unlimited-free guarantee. Do not assume internal application throttles alone can guarantee zero billing. Before any Catalyst use, check account billing mode and usage, establish conservative per-account ceilings, disable/pause work as the limit approaches or usage status is uncertain, and obtain founder review. No payment method, credits requiring a card, subscription, paid API, or production deployment is authorized.

Sources: [Free Tier Usage](https://docs.catalyst.zoho.com/en/deployment-and-billing/billing/free-tier/), [Catalyst billing FAQ](https://docs.catalyst.zoho.com/en/faq/general/), [Free Tier page](https://catalyst.zoho.com/free-tier/).

## Local development and test approach

Local UI workflow: dot-source the local Node helper, then run `npm ci` and `npm run dev` in `apps/web`; bind the development server to loopback. The app has an npm manifest and lockfile. Its fixture mode is explicitly labelled, and there is no live integration mode yet. Catalyst Functions remain uninitialized and require separate approval before CLI installation/login or account access. Vitest + React Testing Library are installed and cover local validation/preview components; Playwright remains proposed for future browser/integration coverage, especially async Server Components.

Sources: [Next.js App Router installation](https://nextjs.org/docs/app/getting-started/installation), [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Next.js testing guide](https://nextjs.org/docs/app/guides/testing), [Catalyst Slate Next.js runtime details](https://docs.catalyst.zoho.com/en/announcements/2026/node-security-update/), [Slate runtime settings](https://docs.catalyst.zoho.com/en/slate/help/monitor-deployment/), [Catalyst local serve behavior](https://docs.catalyst.zoho.com/en/cli/v1/serve-resources/serve-all-resources/), [Catalyst modular JavaScript SDK](https://docs.catalyst.zoho.com/en/announcements/2026/js-sdk-launch/).

## Dependency evaluation rule

Before adding an application dependency, record version, license, maintenance, transitive risk, owner, permissions, cost, free alternative, security impact, and migration path. Prefer current Catalyst SDKs only after verifying runtime support; older Node.js/Web SDK generations are deprecated in current Catalyst documentation. No app dependencies were installed during the preflight; the separately authorized local M1 install and exact lockfile are recorded below.

## Authorized local M1 frontend dependency record

**Status:** Founder authorized local-only implementation on 2026-11-12. Package purpose and npm license metadata were recorded before dependency installation. The exact resolved versions are in `apps/web/package-lock.json` and were checked with `npm ls --depth=0`. This authorization does not approve Catalyst setup, external service integration, payment, or deployment.

| Package | Planned version | Purpose | npm license | Status |
|---|---:|---|---|---|
| `create-next-app` | `16.4.6` | One-time local App Router scaffold tool; not an application runtime dependency | MIT | Used from npm cache; not retained in app dependencies |
| `next` | `16.4.6` | App Router, local development server, and production build | MIT | Installed |
| `react`, `react-dom` | `19.3.1` | UI components and DOM rendering | MIT | Installed |
| `tailwindcss`, `@tailwindcss/turbopack` | `4.3.5` | Utility CSS and its Tailwind v4 integration with the Next.js Turbopack scaffold | MIT | Installed |
| `typescript` | `5.9.3` | Static type checking; selected from the stable 5.x line rather than newly released TS 7 to reduce framework integration risk | Apache-2.0 | Installed |
| `@types/node` | `24.19.2` | Node.js 24 type declarations for local tooling | MIT | Installed |
| `@types/react`, `@types/react-dom` | `19.3.0` | React and DOM type declarations | MIT | Installed |
| `eslint`, `eslint-config-next` | `9.39.5`, `16.4.6` | Static linting and Next.js rules; current Next config's nested React/a11y plugins declare ESLint peer support through 9 | MIT | Installed; lint passes. npm marks ESLint 9.39.5 deprecated/unsupported. |
| `vitest`, `vite` | `5.1.0`, `8.3.8` | Local unit/component test runner and its compatible Vite engine | MIT | Installed; 3 files / 6 tests pass. |
| `@vitejs/plugin-react` | `6.3.0` | React JSX/refresh support for Vitest; peer range requires Vite 8 | MIT | Installed |
| `jsdom` | `31.0.0` | Browser-like DOM for local component tests | MIT | Installed |
| `@testing-library/react`, `@testing-library/dom` | `16.3.3`, `10.4.2` | User-facing component rendering and DOM assertions | MIT | Installed |
| `@testing-library/user-event`, `@testing-library/jest-dom` | `14.6.10`, `7.0.1` | Accessible interaction simulation and readable DOM matchers | MIT | Installed |
| `vite-tsconfig-paths` | `6.1.1` | Alternative alias resolver; considered but not retained because Vite 8 includes native tsconfig-path support | MIT | Not selected |

**Evaluation notes:** All packages are open-source registry packages with no paid service or account requirement. Direct maintainers are the respective upstream projects; npm and the lockfile capture transitive dependencies/integrity. No package receives credentials or additional permissions. Avoided an icon library by using inline SVG/CSS. Maintenance and security will be reviewed through lockfile updates and dependency advisories before any hosted release. Alternatives considered: native CSS instead of Tailwind; Node's built-in test runner instead of Vitest; direct DOM assertions instead of Testing Library. These alternatives reduce dependencies but add styling/test setup cost or reduce accessible interaction coverage. Migration path is standard Next.js/React, CSS, and testing-library APIs; none binds the app to Catalyst. Exact transitive licenses are not exhaustively enumerated here and remain a release-review task. ESLint 10.14.0 was trialled but its peer ranges conflict with current Next.js config plugins; ESLint 9.39.5 was selected for peer compatibility and passes lint, though npm marks it deprecated/unsupported. Current `npm audit` reports 7 moderate findings in development-only ESLint/TypeScript lint dependencies (including minimatch and typescript-eslint); none are high or critical. Do not claim the dependency audit is clean; revisit when a peer-compatible fixed toolchain is available.

**Sources:** [Next.js install requirements](https://nextjs.org/docs/app/getting-started/installation), [Next.js Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest), [Next.js v16 upgrade requirements](https://nextjs.org/docs/app/guides/upgrading/version-16), npm registry package metadata checked on 2026-11-12.
