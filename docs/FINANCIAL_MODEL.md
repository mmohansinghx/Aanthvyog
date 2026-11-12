# Financial model

**Status:** Planned
**Model state:** structure only; no prices or market estimates have been invented.

## Principles
- Founder approval is required before spending, paid APIs, hosting, subscriptions, or payment methods.
- Record source, date, billing unit, free-tier limits, taxes, currency, and uncertainty for every cost input.
- Separate fixed, variable, one-time, and support costs.
- Model ranges and sensitivities; do not present estimates as invoices or validated unit economics.

## Cost categories to populate
- Hosting, compute, network, build, and monitoring.
- Data storage, artifact storage, backups, retention, and transfer.
- Identity, email, and support tooling.
- Model usage, retries, QA/fix loops, and failed runs.
- Security, testing, legal review, and incident response.
- Payment processing, refunds, taxes, and chargebacks if approved.
- Customer support, onboarding, and acquisition.

## Suggested formulas
- **Variable cost per completed project** = compute + storage/transfer + model usage + retry/fix usage + payment fees + allocated support.
- **Monthly contribution** = collected revenue - variable costs - allocated fixed operating costs.
- **Monthly runway** = available approved cash / average monthly net burn.

Inputs and units need review before using outputs for pricing or budget decisions.

## Unknown inputs
Provider and hosting prices, project volume, tokens or compute per project, completion and retry rates, artifact size and retention, support time, target price, taxes, and acquisition cost are all unknown. Obtain current provider prices and founder budget limits before building scenarios.
