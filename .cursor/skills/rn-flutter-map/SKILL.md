---
name: rn-flutter-map
description: >-
  Maps React Native concepts to Flutter equivalents before writing Flutter
  code. Use when the user types /rn-flutter-map, converts RN features to
  Flutter, or when RN APIs appear in a Flutter task.
disable-model-invocation: true
---

# /rn-flutter-map

## Instructions

When invoked with a feature description or RN snippet: **DO NOT write Flutter code yet.**

1. Produce a mapping table (**at least 4 rows**): RN concept → Flutter equivalent.
2. Call out **1–2 paradigm traps** relevant to this task (e.g. API in `build()`, forget `.toList()` after `map`, `watch` vs `read`).
3. Wait for user confirmation of the map.
4. Only then propose Flutter code following team conventions (Bloc/Cubit/Riverpod, dio, go_router, etc.).
5. Stay honest: do not claim the user has shipped Flutter production unless they said so.

## Core mappings (use when relevant)

| React Native | Flutter |
| --- | --- |
| FlatList | `ListView.builder` |
| axios interceptor | dio `InterceptorsWrapper` |
| Redux action / reducer | Bloc `Event` / `emit` (or Cubit method) |
| Native Module | `MethodChannel` / Pigeon |
| StyleSheet / padding prop | wrapping widgets (`Padding`, `SizedBox`) |
| useState | `setState` / `StatefulWidget` |
| React Navigation | `Navigator` / go_router |
| Promise | `Future` |

## Output format

```markdown
## RN → Flutter map
| RN | Flutter |
| --- | --- |
| ... | ... |

## Paradigm traps
- ...

## Waiting for confirm
Reply "ok" to proceed to Flutter code.
```
