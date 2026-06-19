# Quality Register

Use this register to track how legible and verifiable the repo is for future
Codex runs.

## Rubric

Score each area from 1 to 5:

- 1: tribal knowledge; Codex must infer or ask.
- 2: documented once, but incomplete or stale.
- 3: documented and mostly current.
- 4: documented with targeted checks.
- 5: mechanically enforced and easy to verify.

## Current scores

| Area | Score | Evidence | Next improvement |
| --- | ---: | --- | --- |
| Repo map | 3 | `AGENTS.md`, `README.md`, `docs/agent-harness/architecture.md` | Add package-boundary checks. |
| Build and checks | 3 | Root scripts, Turbo tasks, README check commands | Add a single verification matrix to CI or PR template. |
| UI system | 3 | Component package, stories, tests for utilities | Add visual or accessibility verification guidance per component class. |
| Environment handling | 3 | `apps/web/src/lib/env.ts`, `.env.example`, README | Add explicit production preview checklist. |
| Product rules | 2 | Product behavior is mostly in pages and components | Add product specs for agenda navigation, event detail, and submission flow. |
| Agent workflows | 3 | `docs/agent-harness/workflows.md`, repo skill | Add doc hygiene script and recurring review checklist. |

## Maintenance loop

Run this loop after meaningful feature work or repeated agent mistakes:

1. Identify the missing context or invariant.
2. Decide whether it belongs in docs, tests, linting, types, or scripts.
3. Update the smallest durable artifact.
4. Run the relevant verification command.
5. If this changes how agents should work, update `AGENTS.md` only with a short
   pointer.

## Debt log

| Date | Item | Owner | Status |
| --- | --- | --- | --- |
| 2026-06-19 | Add first harness documentation and repo skill. | Codex | Done |
| 2026-06-19 | Add mechanical doc hygiene checks. | Unassigned | Open |
| 2026-06-19 | Add product specs for core user journeys. | Unassigned | Open |
