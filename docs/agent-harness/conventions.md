# Conventions

This file records repo conventions that should be visible to Codex before it
creates branches, commit messages, PR descriptions, or review responses.

## Commits

Use Conventional Commits:

```text
type(scope): summary
```

Preferred scopes:

- `web`: changes under `apps/web`, web routes, Astro config, web runtime, web
  environment handling, public assets, or app-specific data flow.
- `components`: changes under `packages/components`, shared UI components,
  stories, theme CSS, component utilities, or component tests.

Use no scope only when the change is truly repository-wide and neither preferred
scope communicates the affected area clearly.

Common examples:

```text
feat(web): add event submission validation
fix(components): keep event card dates aligned
docs(web): document local preview environment
test(components): cover calendar range formatting
chore: add agent harness documentation
```

When a commit touches both `apps/web` and `packages/components`, choose the scope
that represents the primary behavior change. If neither package is primary,
omit the scope and explain the affected areas in the commit body or PR summary.

When publishing completed work, commit the scoped change before opening the PR so
the branch history mirrors the repository convention instead of relying on a
single unstructured squash title later.
