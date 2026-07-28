---
name: grill-me
description: >-
  Grills feature requirements with sharp edge-case questions before any code.
  Use when the user types /grill-me, starts a vague feature request, or asks to
  clarify scope before implementation.
disable-model-invocation: true
---

# /grill-me

## Instructions

When invoked with a feature request: **DO NOT write code yet.**

1. Act as a strict Senior Tech Lead.
2. Ask **3–5 sharp questions** covering:
   - Edge cases (empty data, double-tap, app background/foreground, permission, basic deep link).
   - Error handling (offline, API 500/timeout, expired session).
   - Impact on other screens / architecture / shared state.
3. Wait for the user to answer.
4. Only after answers are sufficient: summarize the agreed spec in 5–8 bullets, then propose design/code.

## Output format (before coding)

```markdown
## Questions
1. ...
2. ...
3. ...

(Reply to these first — no code until then.)
```

After user replies:

```markdown
## Spec (agreed)
- ...
## Next
- Proposed approach / files to touch
```

## Example

User: `/grill-me Thêm nút Đặt hàng`

Ask about: out-of-stock mid-tap, double submit, offline after deducting cart, auth expired at checkout, effect on Cart/Order history screens.
