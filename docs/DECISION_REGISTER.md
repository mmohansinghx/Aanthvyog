# M1 decision register

**Last updated:** 2026-11-12
**Scope:** M1 secure project and request lifecycle
**Application state:** documentation only; no functional application, Catalyst project, or app tests exist.

## Status meanings

- **Proposed:** a recommended direction, not founder approval.
- **Founder Approved:** the founder explicitly approved the product/architecture decision. This records intent only.
- **Technically Verified:** current official documentation or actual account/environment evidence confirms the stated fact. Scope and limits are named; a documentation check is not an account configuration check.
- **Implemented:** present in application code or provider configuration, with evidence.
- **Tested:** behavior was executed and results recorded against acceptance criteria.

These are separate evidence states, not automatic steps. A decision may be Founder Approved while remaining unverified, unimplemented, and untested.

## Founder-approved decisions

| ID | Decision | Approval status | Technical verification | Implemented | Tested |
|---|---|---|---|---|---|
| 001 | India is the intended Catalyst data region. | **Founder Approved — 2026-11-12** | **Technically Verified (docs only):** India is a listed Catalyst DC. Actual Zoho account DC, project region, per-component availability, and written processing/storage/backup location statement remain unverified. | No. No Catalyst project exists. | No. |
| 002 | Real authentication with invite-only access; no unrestricted public signup in M1. | **Founder Approved — 2026-11-12** | **Technically Verified (docs only):** Catalyst documents disabled-by-default public signup, administrator-created invited users, password setup, and password reset. Actual account settings, expiry/revocation behavior for invite links, session verification path, and recovery flow require account-level confirmation. | No. No authentication is implemented. | No. |
| 003 | Real persistence for user identity references, projects, requests, task lifecycle, approvals, and audit events. | **Founder Approved — 2026-11-12** | **Technically Verified (platform docs only):** Catalyst Data Store is a relational persistence service with query and table-scope features. Exact schema fit, indexes, query/transaction behavior, server access scope, and account/region limits remain unverified. | No. No database or tables exist. | No. |
| 004 | Initial operating target is INR 0; no paid subscriptions/APIs, payment-method entry, overage, or production deployment. Pause before unapproved billable usage. | **Founder Approved — strict financial approval in this update (2026-11-12)** | **Technically Verified (public docs only):** free allowances are shared across projects/account resources; Catalyst documents chargeable overage and minimum project billing risks. Actual billing mode, usage, alerts, and account controls are unverified. | No application ceiling or pause control exists yet. | No. |

## Proposed implementation defaults

| Area | Proposed default or constraint | Status | Technical check remaining | Implemented / tested |
|---|---|---|---|---|
| Frontend | Next.js App Router, TypeScript, Tailwind CSS | Proposed | Verify supported versions and build/deploy behavior under chosen Slate configuration. | No / no. |
| Frontend hosting | Evaluate Catalyst Slate | Proposed | Verify actual India account availability, build settings, routing, and usage limits. | No / no. |
| Backend | Catalyst Functions with Node.js; Functions-first | Proposed | Verify Functions auth/session validation, execution/request limits, Data Store access, and supported runtime in selected DC. | No / no. |
| AppSail | Exclude from M1 unless a documented technical requirement shows Functions cannot satisfy it. | Proposed constraint | Reassess only if an evidenced Functions gap arises. | Not selected. |
| Persistence provider | Catalyst Data Store | Proposed provider choice under approved real-persistence requirement | Verify schema/query/transaction/access controls and account limits. | No / no. |
| Account model | Individual account; one `owner_user_id` per project; server-side owner validation; workspace migration later. | Proposed implementation constraint | Verify server credentials, token claims, and data-access patterns preserve ownership. | No / no. |
| AI/execution | No model calls, provider config, or generated-code execution in M1. | M1 exclusion | No integration evaluation for M1. | None / none. |

## Verified repository and local environment facts

- The original documentation commit `18c5f24` is present on the local `main` branch and remote `origin/main`.
- The repository contains documentation only. No package manifest, lockfile, test setup, `catalyst.json`, or `.catalystrc` was present at review.
- Local environment observed: Windows 11 Home Single Language (build 26300, 64-bit); Node.js `24.13.1`, npm `11.8.0`, Git `2.54.0.windows.1`; Catalyst CLI is not installed. Repository is clean at the founder-specified commit `6bc3f560e28c6f1850adae3b3daad40f59aceb4c`; 25.15 GiB was available on the repository volume.
- Catalyst's security floor is Node.js `24.22.1+` or `22.23.4+`. The latest Node 24 LTS patch published as of 2026-11-12 is `24.22.3` (security release on Nov 11); local Node remains unchanged. Catalyst Slate currently supports Node 22 for framework apps; latest Node 22 patch is `22.23.5`, so local Node 24 and hosted Slate Node 22 require a compatibility check.
- Catalyst CLI release notes list version `1.27.2` as the latest stable release as of this review. The current npm global prefix is user-scoped; no install was attempted.
- No global tool install, Node update, Catalyst login/initialization, remote project creation, payment setup, production deployment, or test run occurred in this update.

## Required evidence before Catalyst initialization

1. Inspect the actual Zoho account console/domain and record the selected India DC. Verify Slate, Functions, Authentication, and Data Store availability in that DC.
2. Request or review written component-level data processing, storage, and backup residency details. Document the data-minimization, retention, export, and deletion policy without inventing backup deletion guarantees.
3. Verify the invite-only flow with public signup disabled, including admin role controls, password setup/recovery, expiration/revocation of invite links, and current development account limits.
4. Review Data Store schema constraints, query/index semantics, atomicity/transactions, table scopes, and server-side owner enforcement with Functions credentials.
5. Review current account free-tier usage, billing mode, alerts, and overage terms. Establish conservative application ceilings and pause behavior compatible with INR 0.
6. Update local Node.js to the recommended patch level and install/verify current stable Catalyst CLI only after separate explicit permission. Generate Catalyst configuration only using the official CLI.
7. Prepare local development configuration and a safe test identity/data plan. Obtain further explicit permission before initializing the remote project.

## Sources reviewed

- [Catalyst data center and data residency FAQ](https://docs.catalyst.zoho.com/en/faq/general/)
- [Catalyst Public Signup](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/public-signup/)
- [Catalyst User Management and invitations](https://docs.catalyst.zoho.com/en/cloud-scale/help/authentication/user-management/users/implementation/)
- [Catalyst Data Store](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/introduction/)
- [Catalyst Data Store scopes and permissions](https://docs.catalyst.zoho.com/en/cloud-scale/help/data-store/scopes-and-permissions/)
- [Catalyst free-tier usage](https://docs.catalyst.zoho.com/en/deployment-and-billing/billing/free-tier/)
- [Catalyst billing FAQ](https://docs.catalyst.zoho.com/en/faq/general/)
- [Catalyst Node.js security update](https://docs.catalyst.zoho.com/en/announcements/2026/node-security-update/)
- [Catalyst CLI release notes](https://docs.catalyst.zoho.com/en/release-notes/cli/)
- [Catalyst Slate introduction](https://docs.catalyst.zoho.com/en/slate/help/introduction/)
