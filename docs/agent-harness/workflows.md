# Agent Workflows

These workflows are optimized for Codex in the VS Code extension, while staying
usable from CLI or cloud tasks.

## VS Code local task

Use local mode for most edits that need repository context and fast feedback.

1. Open the repo root in VS Code.
2. Start Codex from the sidebar or panel.
3. Use `/local` if the thread is not already local.
4. Mention files with `@file` when the task depends on a specific page,
   component, or config.
5. For broad tasks, ask Codex to create an execution plan using
   `docs/agent-harness/exec-plan-template.md`.
6. Ask Codex to run the narrowest relevant checks before finishing.

Good prompt shape:

```text
Use @docs/agent-harness/architecture.md and @apps/web/src/pages/index.astro.
Implement [change]. Acceptance criteria: [criteria]. Run the narrowest checks
that prove it.
```

## VS Code review task

Use `/review` before merging or when there are uncommitted changes that need a
second pass.

Review priorities:

- behavioral bugs
- missing or weak verification
- broken package boundaries
- environment or deployment risk
- UI regressions on small screens
- docs that no longer match code

## Cloud task

Use cloud mode for isolated, longer-running work when local machine state is not
needed.

Cloud tasks should receive:

- target branch or starting point
- specific acceptance criteria
- relevant files or docs
- required checks
- whether to open a PR or return a patch summary

Avoid cloud mode when the task depends on local-only env values, browser state,
or credentials not configured in the cloud environment.

## Execution plans

Create an execution plan when a task has multiple steps, unclear blast radius, or
requires coordination across app and component packages.

Plan location:

- active: `docs/exec-plans/active/`
- completed: `docs/exec-plans/completed/`

Plans should be updated as work progresses. If a plan becomes stale, either
archive it with a note or replace it with a smaller current plan.

## Feedback loop

When a task exposes missing context:

1. Finish or stabilize the immediate change.
2. Record the missing rule or map in `docs/agent-harness/`,
   `docs/quality/`, or a package README.
3. Add a test, lint, type check, or script when prose is not enough.
4. Keep `AGENTS.md` short by linking to the durable artifact instead of copying
   long guidance into it.
