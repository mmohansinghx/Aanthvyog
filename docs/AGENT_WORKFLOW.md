# Agent workflow

**Status:** In Design
**Operational status:** none of the agents or orchestration infrastructure is implemented or connected to a model provider.

**M1 boundary:** The planned agent-activity interface reports persisted request/task lifecycle facts only. M1 does not run Architect, Engineer, or QA agents, call a model, execute generated code, or claim simulated activity as successful execution. Any preview fixture must be visibly labelled demo data.

## Roles
### Agent 1 - Architect
Clarifies requirements; produces functional requirements, technology proposal, architecture, database schema, API contract, access controls, implementation plan, and technical risks. It may ask questions and return a specification; it cannot approve its implementation or choose an unapproved paid provider.

### Agent 2 - Engineer
Implements only an approved specification in an isolated workspace. It may create files, frontend, backend, APIs, data access, authentication, authorization, and tests within scope. It cannot expand permissions, execute unrestricted host commands, access arbitrary files, deploy, or claim QA success.

### Agent 3 - QA & Delivery
Independently checks requirement traceability, code, tests, APIs, data operations, authorization, security, defects, documentation, and handover. It returns actionable findings to Engineer and re-reviews fixes. It does not accept Engineer self-reported success as evidence.

## Proposed lifecycle
~~~text
REQUEST_RECEIVED
  -> REQUEST_VALIDATED
  -> ARCHITECT_RUNNING
  -> SPECIFICATION_READY
  -> AWAITING_HUMAN_APPROVAL
  -> ENGINEER_RUNNING
  -> QA_RUNNING
  -> FIX_REQUIRED -> ENGINEER_RUNNING (bounded loop)
  -> DELIVERY_READY
  -> FINAL_HUMAN_APPROVAL
  -> COMPLETED
~~~
Terminal or pause states include REJECTED, CANCELLED, FAILED, TIMED_OUT, and NEEDS_INPUT. State transitions are validated and persisted server-side. Approval is tied to a specification version/hash; material changes require renewed approval.

## Structured handoff envelope
~~~json
{
  "schemaVersion": "1",
  "taskId": "server-assigned-id",
  "projectId": "server-assigned-id",
  "runId": "server-assigned-id",
  "agentRole": "architect",
  "state": "completed",
  "inputRef": "authorized-artifact-reference",
  "output": {
    "kind": "project_specification",
    "version": 1,
    "contentRef": "authorized-artifact-reference"
  },
  "createdAt": "ISO-8601 timestamp",
  "correlationId": "server-assigned-id",
  "error": null
}
~~~
Contracts must be versioned and schema-validated. They carry scoped artifact references, not arbitrary filesystem paths or credentials. Large content belongs in authorized artifacts, not unbounded inline fields.

## Human gates and authority
1. Validate the request and policy limits before agent work.
2. Show the Architect specification, risks, proposed stack, data handling, and expected usage.
3. Require explicit approval before Engineer execution.
4. Stop for founder approval where a company gate applies.
5. Require QA review before delivery readiness.
6. Require final human approval before external action or release.
7. Keep founder authority over product, budget, providers, architecture, production, and company decisions.

## Execution controls
- Persist task records, inputs, outputs, state transitions, approvals, and safe execution logs.
- Configure maximum attempts, timeouts, concurrency, context size, artifact size, and usage ceilings before implementation. Values remain open decisions.
- Retry only classified transient failures with idempotency keys. Do not automatically retry validation, authorization, or policy failures.
- Cancellation prevents new stages and signals running work; record whether active work stopped.
- On exhausted retries, timeout, invalid output, or provider failure, move to a safe terminal state and expose a correlation ID.
- Never allow an agent to grant itself tools, increase limits, approve a gate, or modify audit history.
- No real model calls until provider evaluation, data terms, configuration, cost, and founder approval are complete.

## Independent QA evidence
QA uses criteria prepared independently from implementation, records exact checks and outcomes, and rechecks all fixes. Only QA can recommend technical acceptance; founder controls release. A feature status of Tested requires recorded test evidence.
