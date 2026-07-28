---
name: observe
description: >-
  Designs observability for a flow across reliability, product analytics, and
  business KPIs without building new features first. Use when the user types
  /observe, prepares to ship, or investigates crash/metric drops.
disable-model-invocation: true
---

# /observe

## Instructions

When invoked as `/observe [flow-or-feature]`: **DO NOT implement a new product feature.** Design/review instrumentation only.

Return a **4-part checklist**:

### 1. Reliability
- Where to catch crash / error / ANR
- RN: Error Boundary + Sentry/Crashlytics; Flutter: `FlutterError.onError` + `runZonedGuarded` + `sentry_flutter` / `firebase_crashlytics`
- Breadcrumbs: screen → API → action before failure
- Release + source map / dSYM

### 2. Product analytics
- Event names (`screen_view`, `*_tap`, funnel steps)
- Properties (`id`, `source_screen`, …)
- **No PII** (raw phone/email)

### 3. Business metrics
- KPIs derived from analytics + backend: conversion, AOV, cancel/fail rate, crash-free users %

### 4. Action plan
- Abnormal metric → hypothesis → code / API / native SDK to inspect

Only after the user confirms events + KPIs, propose minimal SDK wiring if they ask.

## Output template

```markdown
## /observe — <flow>
### Reliability
- ...
### Product analytics
- Events: ...
- Properties: ...
### Business metrics
- ...
### Action plan
- If X drops → check Y
```

## Example

`/observe checkout` → events `checkout_start`, `pay_tap`, `pay_success`/`pay_fail`; Crashlytics keys for `orderId` + payment provider; KPI `pay_success / checkout_start`.
