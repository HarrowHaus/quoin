# Phase 1 — Reference Compiler

Status: pending phase 0 completion.

## Scope

Implement the Quoin reference compiler in TypeScript. The compiler reads source HTML containing Quoin semantic elements, resolves them against the active vocabulary, token, and implementation packs per the spec in `00_spec/`, and emits standard HTML and CSS.

## Inputs (build time)

- Source HTML or template files
- One implementation pack (Tailwind v4 emitter for v1)
- One token pack (baseline for v1)
- One or more vocabulary packs (editorial + dashboard for v1)

## Outputs

- Compiled HTML with all Quoin elements replaced by standard HTML.
- A single CSS stylesheet (or class string imports, depending on the active implementation pack).
- Zero runtime dependencies in the emitted output.

## Primary integration target

Vite plugin. Programmatic API also exported for use outside Vite.

## Deliverables

1. Compiler source in `src/`
2. Type definitions in `types/`
3. Vite plugin entry point
4. Test suite achieving 90%+ line coverage
5. Sample test project in `sample/` exercising at least 10 v1 primitives
6. This README updated with build instructions, public API, plugin architecture

## Exit criteria

See `../PHASE_GATES.md` (Phase 1 section).

## Prompt

See `../PHASE_PROMPTS.md` (Phase 1 section). Paste verbatim into Claude Code when phase 0 is approved.
