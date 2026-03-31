# senior-rn-demo

Production-shaped **Expo + TypeScript** app for the **Senior Mobile (React Native)** track: one repo from day 1 through the 45-day roadmap (`checklist.md` / `prompt.md` in the parent `Dev` folder).

## Goals

- **Architecture:** feature modules with clear boundaries (`src/features/*`), shared layer (`src/shared`), app shell (`src/app`).
- **Learning style:** project-first, just-in-time docs — not course-then-forget.
- **Bar:** senior-oriented structure, tests, observability, and interview-ready stories — not tutorial completionism.

## Stack

- Expo SDK 54
- React 19 / React Native 0.81
- TypeScript (`strict: true`)

## Run

```bash
npm install
npm start
```

Then open in Expo Go or press `i` / `a` for simulator.

## Layout

| Path | Role |
|------|------|
| `src/app/` | Root shell (providers, navigation entry later). |
| `src/features/` | Vertical slices; each feature may expose a public `index.ts`. |
| `src/shared/` | Design tokens, shared components, cross-cutting UI. |

## Roadmap note

This repo stays **domain-neutral** (e.g. catalog, feed, inbox — name entities as you prefer). FinTech-only vocabulary is not required.
