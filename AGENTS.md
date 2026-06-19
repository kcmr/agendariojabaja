# AGENTS.md

## Repository map

- Product app: `apps/web` (Astro, Vue, Tailwind CSS, Supabase, Vercel adapter).
- Shared UI system: `packages/components` (Vue components, Storybook, Vitest).
- Agent harness docs: `docs/agent-harness/`.
- Execution plans: `docs/exec-plans/`.
- Quality register: `docs/quality/`.

## Working agreements

- Treat this file as an index, not a full manual. Read the linked docs before broad or risky changes.
- Prefer `pnpm` and Turbo package tasks. Keep root scripts as Turbo delegators.
- Before changing Astro pages, routes, adapters, or environment handling, use the repo `astro` skill and read `docs/agent-harness/architecture.md`.
- Before changing Turbo tasks, package boundaries, or monorepo scripts, use the repo `turborepo` skill.
- For broad tasks, create or update an execution plan in `docs/exec-plans/active/` using `docs/agent-harness/exec-plan-template.md`.
- Use Conventional Commits. Prefer `components` or `web` as scopes; see `docs/agent-harness/conventions.md`.
- When a review comment, bug, or repeated agent mistake reveals a durable rule, update docs or encode the rule in tooling instead of relying on memory.
- Do not store secrets in committed docs, examples, or prompts. Reference credential names and env var names only.

## Verification

- Root checks: `pnpm lint`, `pnpm check-types`, `pnpm build`.
- Web-only checks: `pnpm --filter web check-types`, `pnpm --filter web build`.
- Component checks: `pnpm --filter @repo/components lint`, `pnpm --filter @repo/components check-types`, `pnpm --filter @repo/components test`.
- Use the narrowest check that proves the change, then broaden when touching shared components, routing, build config, or data contracts.

## Agent-harness expectations

- Start from `docs/agent-harness/index.md` for harness conventions.
- Keep agent-readable context local to the repo. If product or engineering knowledge lives only in chat, issues, or memory, promote the useful part into `docs/`.
- Add mechanical enforcement for recurring rules when possible: tests, linters, type checks, schema validation, or small scripts with clear failure messages.
