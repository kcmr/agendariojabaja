---
name: harness-engineering
description: Use when improving this repository for Codex or agent-assisted engineering: AGENTS.md, repo docs, execution plans, quality registers, verification loops, durable agent instructions, or turning repeated review feedback into tests, lint rules, scripts, or docs.
---

# Harness Engineering

Use this skill to make the repository easier for Codex to understand, verify,
and improve from VS Code, CLI, app, or cloud tasks.

## Workflow

1. Read `AGENTS.md`.
2. Read `docs/agent-harness/index.md`.
3. Read the specific harness file for the task:
   - architecture or package boundaries: `docs/agent-harness/architecture.md`
   - commit or repository conventions: `docs/agent-harness/conventions.md`
   - VS Code, review, cloud, or planning flows: `docs/agent-harness/workflows.md`
   - quality scoring or recurring maintenance: `docs/agent-harness/quality.md`
   - plans: `docs/agent-harness/exec-plan-template.md`
4. Inspect the code or docs that the request touches.
5. Prefer the smallest durable improvement:
   - docs for missing context
   - tests for behavior
   - type checks for contracts
   - lint or scripts for recurring style and structure rules
   - execution plans for broad work
6. Keep `AGENTS.md` short. Add links there only when the rule should load for
   every Codex run.
7. Run the narrowest command that verifies the change. Broaden checks when
   shared packages, routes, build config, or environment handling are touched.

## Output expectations

- State what durable harness artifact changed.
- State what verification ran.
- If a rule is still prose-only but should become mechanical later, add it to
  the quality register or an execution plan follow-up.
