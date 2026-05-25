# Web Implementation Plan

## Summary

The web app in `apps/web` will be an Astro static site with Vue islands only where interaction is needed. Shared UI will live in `@repo/components`, and Astro pages will compose those components with build-time data from Supabase.

The site will be hosted on Vercel. n8n will call a Vercel Deploy Hook after the daily scraping workflow finishes successfully, causing Astro to rebuild the static output with the latest events.

## Architecture

- Astro generates public pages statically at build time.
- Vue is used for interactive controls such as locality selection, list/calendar switching, pagination, and future form states.
- Reusable UI and feature components are implemented in `packages/components`.
- App-specific data loading, routing, SEO, and page composition live in `apps/web`.
- Supabase is accessed only from server/build code, never from Vue components.

## Data Source

The public events source is `public.events` in Supabase, typed by `apps/web/database.types.ts`.

The web description must use `neutral_description` only. Events without a
usable `neutral_description` are not published on the web because `description`
is Instagram-specific copy.

```ts
neutral_description
```

Event status mapping:

- `Publicado`: public upcoming/active event when its date is today or in the future.
- `Publicado` with a date before today: treated as historical and subject to the retention window.
- `Caducado`: public historical event only while inside the retention window.
- `Pendiente`, `Descartado`, `Revisión`: not public.

Event detail routes use stable slugs derived from the event name plus a short suffix from the Supabase `id` to avoid collisions.

## Expired Event Policy

Expired events are generated only for a limited time to keep the static build useful and bounded.

- Default retention: `60` days.
- Configurable with `EVENT_ARCHIVE_RETENTION_DAYS`.
- Expired events older than the retention window are excluded from `getStaticPaths`.
- Excluded event detail URLs return 404 because Astro never generates those routes.

## Newsletter

Newsletter subscriptions are managed with Kit.

The first web implementation does not need a working newsletter backend. A future form can use a plain HTML `form` with Kit's form action URL.

The future public variable is:

```txt
PUBLIC_KIT_FORM_ACTION_URL=
```

This value is public because it is rendered into HTML.

## Deployment and Regeneration

- Vercel builds the monorepo and outputs `apps/web/dist`.
- The app remains static in v1.
- n8n stores the Vercel Deploy Hook URL as a private credential or workflow secret.
- n8n calls that hook after a successful scraping run.
- The Deploy Hook URL must not be committed to git.

## Environment Variables

Real values must live in `apps/web/.env.local` for local development and in Vercel environment variables for deployed builds.

Do not commit real `.env` files.

Required:

```txt
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
PUBLIC_SITE_URL=
```

Optional:

```txt
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
EVENT_ARCHIVE_RETENTION_DAYS=60
PUBLIC_KIT_FORM_ACTION_URL=
```

Notes:

- `SUPABASE_PUBLISHABLE_KEY` is the preferred name for modern Supabase publishable keys such as `sb_publishable...`.
- `SUPABASE_ANON_KEY` is accepted as a legacy alias if the project still uses older anon key naming.
- `SUPABASE_SERVICE_ROLE_KEY` is only needed if RLS does not allow build-time reads with the publishable/anon key.
- Secret variables must not use the `PUBLIC_` prefix.
- `PUBLIC_SITE_URL` and `PUBLIC_KIT_FORM_ACTION_URL` are safe to expose because they are public browser values.

## Git Safety

- `.env`, `.env.local`, `.env.development.local`, `.env.test.local`, and `.env.production.local` are ignored at the repo root.
- Only `.env.example` files with empty or fake values may be committed.
- Server/build Supabase helpers must not be imported by Vue components.
- Before release, check generated client assets for accidental secret leakage.

## Phase 1

- Add a typed Supabase client for server/build code.
- Add event mapping and filtering helpers.
- Add static event detail route generation through `getStaticPaths`.
- Add `.env.example` with placeholder variable names only.

## Future UX Improvements

- Improve back navigation from event detail pages so returning to the agenda
  restores the previous scroll position instead of landing at the top of the
  page.
- Preserve agenda state across detail navigation. If the user opens an event
  from "Histórico reciente", the "Volver a la agenda" action should return to
  the recent history view rather than the default upcoming events view.

## Test Plan

- `pnpm --filter web check-types`
- `pnpm --filter web build`
- Verify non-public statuses are not generated.
- Verify expired events outside `EVENT_ARCHIVE_RETENTION_DAYS` are not generated.
- Verify `.env.local` remains ignored by git.
- Search `apps/web/dist` for server-only Supabase keys before production deployment.
