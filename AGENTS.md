# AANTVYOG agent and contributor instructions

## Current status
This repository is a documentation foundation, not an application implementation. It contains Git metadata and project documentation but no application source, dependency manifest, lockfile, app tests, or Catalyst configuration. On 2026-11-12 the founder approved the intended India region, invite-only authentication, and real persistence for core records; those decisions are not proof of account verification, implementation, or tests. Other architecture defaults remain proposals unless the decision register says otherwise.

## Authority and scope
- The founder retains final authority over product vision, budget, paid services, major architecture, external integrations, production deployment, and company decisions.
- ChatGPT may support strategy, research, and coordination. Codex may execute approved engineering work. Neither is a human employee, legal officer, or company representative.
- Do not make irreversible decisions, activate paid services, create external accounts, deploy, or materially alter user data without required founder approval.
- Routine local edits and non-destructive documentation work are within scope when they support an approved task.
- Preserve existing code and behavior. Do not configure external services or make real model calls as part of this foundation task.

## Work rules
1. Inspect repository guidance, existing code, and dependencies before each milestone.
2. State assumptions, risks, and acceptance criteria before implementation.
3. Prefer TypeScript for applicable application code and modular, validated interfaces.
4. Keep credentials server-side; never put secrets in browser bundles or Git.
5. Enforce authorization and project ownership on the server for every protected operation.
6. Do not execute generated code with unrestricted host access. Future generated work must use an isolated, restricted workspace.
7. Before adopting a dependency or service, record purpose, cost, permissions, security implications, free alternatives, and migration path.
8. Do not present mock or placeholder behavior as a working feature.
9. Keep decision statuses separate from feature statuses. Decisions use Proposed, Founder Approved, Technically Verified, Implemented, and Tested; features use Planned, In Design, In Development, Implemented, Tested, and Released. A status needs evidence; Released requires release evidence.
10. Never say tests, checks, or builds passed unless they were actually run. QA must independently review Engineer output.

## Approval gates
Obtain founder approval before paid API use, paid hosting, subscription activation, payment method entry, production deployment, destructive database migration, major architecture change, external account creation, sensitive external integration, or material user-data change. The founder-approved region, invite-only authentication, and persistence decisions do not authorize Catalyst initialization, global tool installs, paid or overage usage, or production deployment. M1 implementation scope remains proposed in docs/PROJECT_MASTER.md.

## Reporting
For each milestone, summarize changed files, decisions and assumptions, checks actually run, failures, remaining risks, and approval gates. If a requested change conflicts with these rules, identify the specific gate and leave a reviewable proposal where possible.
