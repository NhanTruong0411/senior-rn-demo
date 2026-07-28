---
name: flutter-shape
description: >-
  Reviews Flutter code against Flutter idioms (build purity, watch/read, const,
  ListView.builder, state tier). Use when the user types /flutter-shape or
  before a Flutter PR after AI-generated UI.
disable-model-invocation: true
---

# /flutter-shape

## Instructions

Scan the Flutter file(s) in scope. **Report only** — do not edit unless the user explicitly asks to apply fixes.

Checklist:

1. No API / heavy side effects inside `build()`.
2. `context.watch` / `ref.watch` only in `build`; `read` only in callbacks (`onPressed`, etc.).
3. Prefer `const` constructors when widgets are immutable; correct `child` vs `children`.
4. Long lists use `ListView.builder` (lazy); do not dump long lists into a non-scrolling `Column`.
5. State tier: local → `setState`; shared → Provider / Riverpod / Cubit / Bloc per project context.
6. Output **3–5 bullets**: OK / needs fix / extract widget or Cubit suggestions.

## Report template

```markdown
## /flutter-shape report
- OK: ...
- Needs fix: ...
- Extract: ...
- Priority: (1)–(2) items to fix before PR
```
