# Agent Harness

This directory is the repository system of record for agent-assisted engineering.
It turns recurring product, architecture, quality, and workflow knowledge into
local context that Codex can inspect from VS Code, CLI, or cloud tasks.

## Why this exists

The harness follows two current OpenAI recommendations:

- The Harness Engineering article argues that humans should design the
  environment, intent, and feedback loops that let Codex do reliable work.
- The Codex manual recommends a short `AGENTS.md` entry point plus repository
  skills, durable instructions, and verifiable workflows instead of one large
  prompt.

Sources:

- https://openai.com/es-ES/index/harness-engineering/
- https://developers.openai.com/codex/codex-manual.md

## Operating model

Humans decide direction, acceptance criteria, and tradeoffs. Codex implements,
checks, reviews, and improves the repo-local context that made the task possible.

When Codex gets stuck or repeats a mistake, do not only fix the local symptom.
Ask what the repo failed to expose:

- missing architecture map
- missing command or verification path
- missing invariant
- missing product rule
- missing test fixture or browser workflow
- missing example of the preferred pattern

Then add the smallest durable artifact that closes that gap.

## Files

- `architecture.md`: package map, boundaries, and change guidance.
- `conventions.md`: commit and repository conventions.
- `workflows.md`: how to use Codex from VS Code and when to use local, cloud,
  review, or planning workflows.
- `quality.md`: quality rubric and recurring maintenance loop.
- `exec-plan-template.md`: template for complex work.

## Current harness level

This is level 1 of the harness:

- short `AGENTS.md` repo map
- documented architecture and verification commands
- first execution-plan structure
- first quality register
- repo skill for explicit `$harness-engineering` invocation

Next useful steps are mechanical checks: doc link validation, package-boundary
checks, and PR templates that point to the verification matrix.
