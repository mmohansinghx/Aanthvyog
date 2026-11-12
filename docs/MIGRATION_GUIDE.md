# Migration guide

**Status:** Planned
**Migration state:** no application database, production environment, or provider integration exists to migrate.

## Future migration rules
1. Assign every schema or provider migration an owner, scope, risk, data classification, and rollback plan.
2. Prefer additive, backward-compatible changes; use expand, backfill, verify, and contract phases for breaking schema changes.
3. Test migrations against representative, sanitized data and record exact results.
4. Back up data and verify restore before material production changes.
5. Preserve ownership constraints, auditability, export, and deletion behavior across migrations.
6. Never run a destructive migration without explicit founder approval.
7. Use idempotent scripts, checksums, row counts, and post-migration invariants where applicable.
8. Do not log secrets or copy production data into development environments.
9. For provider changes, document data export formats, identity mapping, storage keys, webhook behavior, rate limits, and shutdown dependencies.
10. Update API, architecture, security, and technology registry docs.

## Future runbook template
- Source and target versions/providers:
- Approved change record:
- Data and users affected:
- Pre-migration backup and restore evidence:
- Dry-run environment and results:
- Migration steps and expected duration:
- Validation queries and acceptance criteria:
- Rollback trigger and exact rollback procedure:
- Communications and support plan:
- Post-migration review and owner:

## Current state
No migration is pending. This guide is a control template only.
