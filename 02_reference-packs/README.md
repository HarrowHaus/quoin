# Phase 2 — Reference Packs

Status: pending phase 1 completion.

## Scope

Build the five canonical reference packs that demonstrate Quoin end to end and serve as the v1 floor of usable packs.

## Packs to produce

| Pack | Type | Purpose |
|------|------|---------|
| `@quoin/tokens-baseline` | Token | Neutral default. The "Helvetica" of Quoin token packs. |
| `@quoin/vocab-editorial` | Vocabulary | Long-form reading and documentation. Implements editorial primitives + supporting layout and content primitives. |
| `@quoin/vocab-dashboard` | Vocabulary | Data-dense interfaces. Tighter spacing, denser type, all state and content primitives. |
| `@quoin/impl-tailwind` | Implementation | Tailwind v4 emitter. Already partially built in phase 1; harden here. |
| `@quoin/impl-raw-css` | Implementation | Raw CSS emitter. Demonstrates that Quoin is not Tailwind-bound. |

## Deliverables per pack

Each pack contains:
- `quoin.pack.json` conforming to `00_spec/pack-format.md`
- `package.json` for npm publication
- `README.md` describing scope, target use cases, design decisions
- `LICENSE` (MIT)
- Type-specific contents per pack format spec

## Validation

Every pack must pass `@quoin/validate-pack` and build successfully through the phase 1 compiler.

## Composition demos

At least three end-to-end builds demonstrating pack composition:
- Editorial vocab + baseline tokens + Tailwind impl
- Dashboard vocab + baseline tokens + raw CSS impl
- Editorial + dashboard vocab merged + baseline tokens + Tailwind impl

## Exit criteria

See `../PHASE_GATES.md` (Phase 2 section).

## Prompt

See `../PHASE_PROMPTS.md` (Phase 2 section).
