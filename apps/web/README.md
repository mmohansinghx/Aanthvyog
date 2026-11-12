# AANTVYOG local frontend preview

This folder contains the authorized local M1 frontend foundation. It is a UI preview, not the working authenticated product.

## Run locally on the verified side-by-side Node runtime

From the repository root in PowerShell:

```powershell
. .\apps\web\scripts\use-local-node.ps1
cd .\apps\web
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. The development server uses loopback by default; do not bind it to a public or shared network interface.

The helper temporarily prepends the already verified Node.js `24.22.3` directory to the current PowerShell process only. It does not edit the system Node installation or machine-wide PATH. That local runtime reports npm `11.19.1`. The package engine range permits patched Catalyst security-floor Node 22 and Node 24 releases; this app has only been tested under Node `24.22.3`, and Slate's Node 22 runtime remains unverified.

## Preview routes

- `/` — AANTVYOG landing page.
- `/dashboard` — sample project overview and activity.
- `/projects/new` — structured request form with browser-only validation and preview.
- `/projects/studio-operations` — example project workspace and status stages.
- `/projects/studio-operations/approval` — approval interface with actions disabled.
- `/projects/studio-operations/activity` — static example timeline.
- `/access` — explains that authentication is not connected.

The form does not submit to a server and its preview is held only in component state. The dashboard, workspace, approval, and activity content comes from `src/lib/demo-data.ts`; it is not database-backed. There is no authentication, API, persistence, Catalyst configuration, AI provider, agent execution, or generated-code execution. Do not enter sensitive or private data.

## Local checks

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

Vitest covers the browser-only request validation and preview labels. It does not test authentication, ownership, persistence, approvals, cancellation, audit storage, Catalyst integration, or the M1 backend acceptance criteria.
