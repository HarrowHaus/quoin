# Phase 5e — Launch

Status: **staged, not executed.** Phases 0–4 plus 5a–5d are complete; this
folder covers the remaining launch deliverables.

## Phase 5 sub-phases

Phase 5 was split during execution. Sub-phases 5a–5d shipped to the
existing source folders (no separate phase folder); 5e is the actual
public launch and lives here.

| Sub-phase | Where it lives | What it added |
|-----------|----------------|---------------|
| 5a polish | `02_reference-packs/impl-tailwind/companion.css` | Hover, focus, active, motion microinteractions for every primitive. Pure CSS, honors `prefers-reduced-motion`. |
| 5b variants | Per-primitive (e.g. `emphasis-card variant="featured"`, `alert-band variant="compact"`, `pricing-tier variant="featured"`) | Specific-attribute variants on key primitives. |
| 5c interactive JS | `02_reference-packs/impl-tailwind/companion.js` | Tab-panels keyboard nav, disclosure animation, modal trigger, Cmd-K command menu. Single ES module, no dependencies. |
| 5d vocabulary expansion | `02_reference-packs/vocab-essentials/`, `02_reference-packs/vocab-app-shell/` | 15 new primitives (10 essentials + 5 app-shell) closing v1 gaps. |
| **5e launch** | `05_launch/` | npm publication, landing page, launch essay, demo video, HN/X drafts, release tag. |

## Scope

Stage the public launch of Quoin. All deliverables assembled and approved before any public action.

## Hard constraint

Nothing is published publicly without explicit operator approval. Every deliverable in this phase is staged for execution; the operator executes.

## Deliverables

### 1. npm publication

All packs prepared for npm publication under `@quoin/*` scope. Publication is staged, not executed:
- Each pack's `package.json` finalized for publication
- npm scope reserved by the operator
- Publication command sequence documented (operator executes)
- Two-factor auth and credentials handled by the operator

Inventory to publish: 7 reference packs (`tokens-baseline`,
`vocab-editorial`, `vocab-dashboard`, `vocab-essentials`,
`vocab-app-shell`, `impl-tailwind`, `impl-raw-css`), plus the 40
harvested packs from `03_harvest/packs/`. The `@quoin/compiler` and
`@quoin/compiler/vite` plugin from Phase 1 also publish.

### 2. Landing page

Domain: `harrow.haus/quoin` (or operator-chosen alternative)
- Single page, Quoin-built (eats own dog food)
- Communicates the thesis in under 30 seconds of reading
- Demonstrates pack-swapping visually (same content, three different aesthetics)
- Links to docs, GitHub, and npm

### 3. Launch essay

1,500-2,500 words. Sections:
- The problem (AI generation is wasteful at the CSS layer)
- The thesis (semantic compression cuts that waste)
- The lineage (Alexander, Swiss/Brutalist, DaisyUI, Tailwind v4)
- The architecture (four layers, three pack types)
- How to start
- What's next

### 4. Demo video

Three minutes maximum. Storyboard + script.

Shows:
- A page of semantic Quoin markup
- The same markup compiled against three different token packs in sequence
- The visual transformation
- The token cost comparison (Quoin tag count vs equivalent Tailwind class count)

### 5. HN submission

- Title: high signal, no hype words
- First-comment context post (200-400 words) explaining what Quoin is and what feedback would be useful

### 6. X / social thread

8-12 posts. First post hooks; middle posts demonstrate; last post links.

### 7. Outreach list

Suggested targets for direct outreach (not mass send):
- Tailwind Labs (Adam Wathan, others)
- Vercel (Lee Robinson, others)
- Anthropic (developer relations)
- Chrome team (Adam Argyle, Una Kravets)
- Key design-tooling Twitter accounts

Each entry: name, why they'd care, suggested message angle.

### 8. GitHub

The canonical repo is `github.com/harrowhaus/quoin` (created during initialization). At launch:

- Verify repo is public, README renders correctly, all phase work is pushed to `main`.
- Add a release tag (`v0.1.0` or appropriate semver) marking the launch commit.
- Configure repo settings: description, topics (`design-system`, `css`, `web-components`, `tailwind`), social preview image.
- Add `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and an `RFC.md` template under `.github/`.
- Each pack published to npm should also exist as a directory in the monorepo with its own README, or as a separate repo under `harrowhaus/` if monorepo scope becomes unwieldy.
- Operator decides between monorepo (`harrowhaus/quoin`) versus multi-repo (`harrowhaus/quoin`, `harrowhaus/quoin-tokens-baseline`, etc.) before publication.

## Exit criteria

See `../PHASE_GATES.md` (Phase 5 section).

## Prompt

See `../PHASE_PROMPTS.md` (Phase 5 section).
