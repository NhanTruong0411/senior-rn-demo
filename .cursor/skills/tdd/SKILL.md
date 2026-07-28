---
name: tdd
description: >-
  Runs a strict red-green TDD loop: write failing test first, then implement
  until green. Use when the user types /tdd or asks to implement business logic
  with tests first (pricing, auth, validation, mappers).
disable-model-invocation: true
---

# /tdd

## Instructions

When invoked as `/tdd [feature]`, follow this order strictly:

1. **Write a failing test** that describes the behavior (`.test.ts` / `.test.tsx` for RN/JS; `*_test.dart` for Flutter).
2. **Run the test suite** for that file/package:
   - JS/RN: `npm test` (or project’s documented test command) — must **FAIL**.
   - Flutter: `flutter test` (path to the new test) — must **FAIL**.
3. **Implement** the minimum code to satisfy the test.
4. **Re-run tests**. If still failing, fix implementation (not by weakening the test unless the assertion was wrong).
5. **Stop and report** only when tests are **PASS**. Summarize: test file, impl file, what is covered.

Do not start with production code. Do not skip the failing-red step.

## Scope

Prefer TDD for: pure logic, validators, mappers, token refresh queue, price/coupon rules.  
Skip or keep light for: pure layout/UI chrome.

## Report template

```markdown
## TDD result
- Test: <path> — RED then GREEN
- Impl: <path>
- Covered: <behaviors>
- Command: <exact test command used>
```
