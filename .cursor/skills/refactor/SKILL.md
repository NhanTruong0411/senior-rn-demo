---
name: refactor
description: >-
  Shape-audits files for size and SRP violations and proposes a split plan
  without editing unless asked. Use when the user types /refactor or wants a
  pre-PR structure review of bloated components/hooks.
disable-model-invocation: true
---

# /refactor

## Instructions

Scan the file(s) the user points at (or the active/changed files). **Do not edit** unless the user explicitly asks to apply the plan.

1. Check whether any file exceeds ~**250 lines**.
2. Find components/functions doing too many jobs (SRP violations).
3. Propose how to extract: hooks / Cubit-Bloc / widgets / utils — keep names concrete.
4. Output a short **report only** (3+ bullets) for user approval.

## Report template

```markdown
## /refactor report
- Size: <file> is N lines (OK / over ~250)
- SRP issues: ...
- Split proposal:
  1. ...
  2. ...
  3. ...
- Risk if not split: ...
```

## Rules

- Prefer report-first; apply only after user says so.
- Do not invent drive-by refactors outside the scoped files.
- Keep public behavior unchanged in any follow-up apply step.
