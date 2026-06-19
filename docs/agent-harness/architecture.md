# Architecture

Agenda Rioja Baja is a pnpm and Turbo monorepo.

## Packages

### `apps/web`

Astro site for the public Agenda Rioja Baja web experience.

Responsibilities:

- route definitions in `src/pages`
- layouts in `src/layouts`
- app-specific data loading and environment handling in `src/lib`
- client scripts in `src/scripts`
- public assets and metadata in `public`

Important dependencies:

- `astro`
- `@astrojs/vue`
- `@astrojs/vercel`
- `@astrojs/node` for local production-like preview
- `@supabase/supabase-js`
- `@repo/components`

### `packages/components`

Shared Vue component library and design system.

Responsibilities:

- reusable UI components in `src/components/ui`
- feature components in `src/components/features`
- layout primitives in `src/components/layout`
- shared utility components in `src/components/utils`
- stories in `src/stories`
- component tests in `*.test.ts`
- exported theme CSS in `src/theme.css`

## Dependency direction

- `apps/web` may depend on `@repo/components`.
- `packages/components` must not depend on `apps/web`.
- Shared UI behavior belongs in `packages/components` when it can be reused or
  tested without app-specific Astro context.
- Route-specific data loading, SEO, environment variables, and integration
  behavior belong in `apps/web`.

## Environment and data

- `apps/web/src/lib/env.ts` owns runtime environment parsing.
- `apps/web/.env.example` is the reference for local environment setup.
- Do not commit secrets. Docs and examples may name env vars but must not include
  real values.
- Changes that affect production runtime should be checked with `preview:local`
  when feasible because the default production adapter targets Vercel.

## UI changes

Prefer changing shared components when a pattern appears in multiple pages or
stories. For one-off page composition, keep the logic in the Astro page or a
nearby app-specific component.

Verification choices:

- Shared component behavior: `pnpm --filter @repo/components test`.
- Shared component type or export changes:
  `pnpm --filter @repo/components check-types`.
- Web integration changes: `pnpm --filter web check-types` and
  `pnpm --filter web build`.
- Visual or interaction changes: run Storybook or the web dev server and inspect
  the affected route.

## When to promote a rule

Promote a convention from prose into enforcement when it recurs or protects a
boundary:

- type checks for data contracts
- tests for calendar/date utilities and component behavior
- ESLint rules for component conventions
- Turbo task definitions for repeatable checks
- small scripts with explicit failure messages for repo hygiene
