# Migration guide

**Status:** Planned
**Migration state:** there is no application database, production environment, or provider integration to migrate.

## Future migration rules

1. Assign every schema/provider migration an owner, scope, risk, data classification, approval record, and rollback plan.
2. Prefer additive, backward-compatible changes; use expand, backfill, verify, and contract phases for breaking changes.
3. Test migrations against representative, sanitized data and record exact commands/results.
4. Back up and verify restore before material production changes, subject to documented provider backup behavior and founder approval.
5. Preserve ownership, authorization, auditability, export, and deletion behavior across migrations.
6. Never run destructive migration without explicit founder approval.
7. Use idempotent scripts, checksums, row counts, and post-migration invariants where applicable.
8. Do not log secrets or copy production data into development.
9. For provider changes, document export formats, identity mapping, storage keys, webhooks, rate limits, data location, and shutdown dependencies.
10. Update API, architecture, security, database, technology, and decision-register documents.

## Future path from individual ownership to workspace collaboration

M1 uses one `owner_user_id` per project. Workspace collaboration is deferred; do not add workspace tables or membership authorization until separately approved. If collaboration is later required:

1. Define workspace roles, access rules, audit behavior, billing ownership, and workspace deletion/export requirements before changing the schema.
2. Add `Workspace` and `Membership` tables, using an expand migration. Preserve each existing `owner_user_id`; create/map a personal workspace for each owner and backfill `workspace_id` without changing ownership.
3. Verify every project and child record maps to exactly one workspace and retains its prior owner. Compare counts, checksums, and orphan queries before enabling workspace routes.
4. Update authorization from owner-only to explicit owner-or-membership checks on the server. Keep direct owner validation during rollout; do not infer membership from a client-provided workspace ID.
5. Add indexes and role constraints, test cross-workspace isolation, invite/revoke behavior, exports, and deletion before enabling collaborators.
6. Only after verification and explicit approval, make the workspace scope required and remove any transitional field or code in a separate contract phase.
7. Preserve prior audit events and record the migration actor/time; do not rewrite approval history or specification hashes.

## Future runbook template

- Source and target versions/providers:
- Approved change record:
- Data and users affected:
- Pre-migration export/backup and restore evidence:
- Dry-run environment and results:
- Migration steps and expected duration:
- Validation queries and acceptance criteria:
- Rollback trigger and exact rollback procedure:
- Provider region and billing impact:
- Communications and support plan:
- Post-migration review and owner:

## Current state

No migration or database exists. This guide is a control template, not evidence of schema deployment or tested migration behavior. Do not claim provider backups are deleted on any particular schedule without confirmation.
