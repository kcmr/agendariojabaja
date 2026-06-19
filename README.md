# Agenda Rioja Baja

Repository for the packages that power the Agenda Rioja Baja website, organized
as a Turbo monorepo. The web application is built with Astro, Vue and Tailwind
CSS, with shared UI components developed in the workspace.

## Requirements

- Node.js 20 or newer.
- pnpm. The expected package manager version is declared in `package.json`.
- Turbo CLI available on your shell path.

Install dependencies from the repository root:

```sh
pnpm install
```

## Environment

The reference environment file for the web app is `apps/web/.env.example`.
Create a local environment file from it:

```sh
cp apps/web/.env.example apps/web/.env.local
```

Fill the values needed for the feature you are working on. At minimum, local
development needs the public site data source and newsletter form variables.
Analytics variables are optional; when they are empty, the analytics script is
not rendered.

If Astro reports missing environment variables after editing `.env.local`,
restart the dev server. Env schema changes are not always picked up by a
running process.

## Development

Run all persistent development tasks through Turbo:

```sh
turbo dev
```

Run only the web app:

```sh
turbo dev --filter=web
```

Run only the component workspace:

```sh
turbo dev --filter=@repo/components
```

## Checks

Run type checks across the workspace:

```sh
turbo check-types
```

Run type checks for one target:

```sh
turbo check-types --filter=web
turbo check-types --filter=@repo/components
```

Run linting:

```sh
turbo lint
```

Run a production build through Turbo:

```sh
turbo build
```

## Production Preview

For a local production-like preview of the web app, use:

```sh
turbo preview:local --filter=web
```

This command exists because the default production adapter targets Vercel, and
that output is not convenient for local previewing with Astro's preview server.
The `preview:local` task builds with the Node adapter instead, then serves the
resulting output locally.

Use this when you need to verify behavior that can differ from `turbo dev`, such
as production environment handling, static output, generated metadata, routes, or
client-side scripts loaded by the final build.

## Turbo Tips

Turbo caches task outputs when a task is cacheable. If a result looks stale,
force a fresh run:

```sh
turbo build --force
turbo check-types --force
```

To bypass cache for a filtered target:

```sh
turbo build --filter=web --force
```

To inspect what Turbo is going to run:

```sh
turbo build --dry-run
```

## Agent Harness

This repository includes a Codex-oriented engineering harness:

- `AGENTS.md` is the short instruction index Codex loads for repo work.
- `docs/agent-harness/` stores architecture, workflow, quality, and planning
  guidance.
- `.agents/skills/harness-engineering/` provides a repo skill that can be
  invoked from Codex with `$harness-engineering`.

Use the harness when a change depends on repository conventions, requires an
execution plan, or should turn repeated feedback into durable docs, tests, or
tooling.
