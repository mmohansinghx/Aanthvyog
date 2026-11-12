# System architecture

**Status:** In Design
**Architecture state:** conceptual proposal only; no system is implemented.

## Design goals
- Separate request intake, specification, approval, implementation, and QA.
- Keep provider-specific model code behind a provider-neutral adapter.
- Enforce authorization and ownership in server-side services.
- Persist task state and audit events for traceable retries, cancellation, and handover.
- Isolate generated project files from the host and other users.
- Require explicit approval before costly, external, or user-impacting operations.

## Proposed logical components
1. **Web client:** responsive Next.js interface; never holds service secrets or makes authorization decisions.
2. **Application API:** validates input, authenticates caller, checks ownership, and authorizes transitions.
3. **Project service:** owns project metadata, membership, and lifecycle.
4. **Orchestrator:** dispatches bounded agent roles using versioned contracts, limits, and persistent records.
5. **Model adapter:** provider-neutral interface. No provider is selected and no real model call is configured.
6. **Workspace service:** allocates isolated, restricted work areas; denies arbitrary host paths and unrestricted shell access.
7. **Data and artifact services:** persist metadata and store artifacts under owner/project controls.
8. **QA service:** evaluates implementation against criteria independent of Engineer self-report.
9. **Audit and usage service:** records state transitions, approvals, errors, and bounded usage without logging secrets.

## Proposed flow
User request -> validation -> Architect -> structured specification -> user approval -> Engineer in isolated workspace -> QA & Delivery -> bounded fix loop if required -> final review and handover.

The orchestrator must not advance a state merely because an agent claims success. It checks contract validity, authorization, limits, and required review evidence.

## Trust boundaries
- **Browser to API:** untrusted input; authenticate and validate all fields server-side.
- **API to data store:** tenant boundary; every read/write scoped to authorized owner/project.
- **Orchestrator to model provider:** outbound data and cost boundary; minimize context, apply limits, require provider approval.
- **Agent to workspace:** generated code is untrusted; deny host secrets, unrestricted network, arbitrary paths, and unrestricted shell.
- **Artifacts to user:** validate content type and safe download handling.
- **Operator to production:** least privilege, audited access, approved release procedure.

## Preferred stack (not approved)
Next.js, TypeScript, and Tailwind CSS; Zoho Catalyst Functions with Node.js; Catalyst Authentication; Catalyst Data Store; Catalyst Stratus; Git and GitHub; provider-neutral AI adapter. Availability, service selection, region, account setup, pricing, and permissions remain unverified and unapproved. See TECHNOLOGY_REGISTRY.md.

## Reliability and failure behavior
Persist each state transition before dispatching the next stage. Use idempotency keys for retries. Bound retries, timeouts, concurrency, artifact size, and provider usage through configuration. Mark exhausted work failed with a safe reason and trace identifier. Cancellation must stop future stages and signal active work where supported. Exact limits are open decisions.

## Decisions still open
Identity and tenant model; data region; persistence and artifact retention; execution sandbox; model provider and terms; network policy; deployment topology; backup/recovery target; availability target; monitoring and incident ownership. All components are Planned or In Design.
