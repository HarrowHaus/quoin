# Phase 4 — Quoin documentation site

The Quoin docs site. Vite multi-page build with the Quoin Vite plugin
on top, so the site is itself a working demonstration of the language —
every page (except generated spec content) is authored in Quoin and
compiled at build time.

Phase 4 originally shipped the site, playground, pack browser, and
migration guides. Phase 5 added the **Components** page (catalog of
every primitive with side-by-side authored / rendered output), a global
**Cmd-K command menu** via `companion.js`, four playground **preset
seeds** with a multi-select vocab-pack picker, and a visible **error
state** on the playground iframe when compilation fails.

Phase 4.5 brought the site to a modern-REPL standard:

- **New [/showcase/](showcase/) page** — one Quoin source rendered
  live against four token packs (Tailwind v4, Radix, Geist,
  Material 3) side-by-side, with license + fidelity-tier badges.
- **Three-pane playground** — source / compiled HTML / preview, with
  all 30 token packs available via dropdown (fidelity-tier badge
  next to each).
- **10 example presets** — article, hero, pricing, dashboard,
  app-shell, navigation, form, empty-state, alert, blank.
- **Shareable URL state** — source + active packs encoded in the
  URL hash; refresh or share reconstructs.
- **Token-efficiency badge** — counts Quoin tags in the source vs
  Tailwind classes in compiled output, prints the compression ratio.
- **Pack browser filters** — fidelity-tier chips (A/B/C), license
  chips (MIT/Apache/BSD/CC0), per-card tier badges, and a "Try in
  playground" deep-link button.
- **Theme toggle** — Default / Tailwind / Radix skins in the
  wayfinder, persisted to localStorage. Demonstrates pack-swap claim
  on the docs site itself.

## Run

```bash
cd 04_docs
npm install
npm run dev        # local dev server with HMR
npm run build      # produces dist/ for deploy
npm run preview    # serves dist/ locally
```

The `prebuild` / `predev` / `prepreview` hooks run three small scripts:

1. `scripts/build-spec.js` — reads `00_spec/*.md` and emits HTML pages
   under `spec/{name}/index.html`. Generated files are gitignored;
   regenerated on every build so docs stay in sync with the spec.
2. `scripts/build-pack-catalog.js` — scans `02_reference-packs/` and
   `03_harvest/packs/`, writes `generated/packs.json` consumed by both
   the pack browser and the playground.
3. `scripts/copy-assets.js` — copies the active token pack's
   `tokens.css` and the Tailwind shim into `public/` so they're served
   at `/tokens.css` and `/impl.css`.

## Layout

```
04_docs/
├── index.html               Home
├── start/index.html         Getting started guide
├── components/index.html    Phase 5 — every primitive, authored + rendered
├── playground/index.html    Live in-browser compiler (4 presets, vocab multi-select)
├── packs/index.html         Pack browser (47 packs)
├── migrate/
│   ├── tailwind/index.html
│   ├── daisyui/index.html
│   └── shadcn/index.html
├── spec/                    (generated)
│   ├── index.html           Spec landing
│   ├── spec/index.html      <- 00_spec/spec.md
│   ├── pack-format/index.html
│   ├── primitives/index.html
│   └── tokens/index.html
├── src/
│   ├── packs/main.ts        Pack browser driver
│   └── playground/
│       ├── main.ts          Playground driver (preset + vocab toggles + error frame)
│       ├── packs.ts         In-memory pack registry
│       └── presets.ts       Four preset seed sources
├── public/                  Static assets (tokens.css, impl.css, impl.js, cmd-k.js, site.css)
├── generated/               (gitignored — built every run)
├── scripts/                 Pre-build scripts
├── quoin.tokens.json        Project-local token overrides (Junicode + Public Sans + brand accent)
└── vite.config.ts
```

## Site is built in Quoin

Every hand-authored page (`index.html`, `start/index.html`,
`migrate/*/index.html`, `playground/index.html`, `packs/index.html`)
contains Quoin semantic tags — `<authority-mark>`, `<reading-flow>`,
`<feature-grid>`, etc. The Quoin Vite plugin (`@quoin/compiler/vite`)
transforms them at build time to standard HTML.

The generated spec pages embed the converted markdown inside
`<reading-flow>` for consistent measure + leading.

## Active pack stack

| Slot | Pack |
|------|------|
| Token | `@quoin/tokens-geist` + project overrides in `quoin.tokens.json` (Junicode display, Public Sans body, brand accent) |
| Vocabulary | `@quoin/vocab-editorial` |
| Vocabulary | `@quoin/vocab-dashboard` |
| Vocabulary | `@quoin/vocab-essentials` *(Phase 5d)* |
| Vocabulary | `@quoin/vocab-app-shell` *(Phase 5d)* |
| Vocabulary | `@quoin/vocab-marketing` |
| Vocabulary | `@quoin/vocab-docs` |
| Vocabulary | `@quoin/vocab-dashboard-extended` |
| Implementation | `@quoin/impl-tailwind` + `companion.css` (Phase 5a polish) + `companion.js` (Phase 5c interactive behaviors) |

To re-skin the entire site, edit `scripts/copy-assets.js` (one constant
— `ACTIVE_TOKEN_PACK`) and update the pack stack in `vite.config.ts`.
Run `npm run build`. The same content compiles against a different
aesthetic without touching any page.

## Live playground

The playground bundles the Quoin compiler for the browser via a
narrower entry point (`01_compiler/dist/browser.js`) that excludes the
disk-loading pack-loader. Pack data is pre-bundled as JSON imports.

The compiler runs entirely client-side once the page loads. The result
of typing in the textarea is recompiled, written into the compiled-HTML
pane, and written into the render iframe alongside the active token
pack's CSS.

Currently preloads:

- **5 token packs:** baseline, geist, material3, radix, primer
- **8 vocabulary packs:** editorial, dashboard, essentials, app-shell, dashboard-extended, marketing, docs, forms
- **2 implementation packs:** impl-tailwind (with companion css/js), impl-raw-css

The vocabulary picker is multi-select via checkboxes — load any
combination at once. A **Preset** dropdown seeds the source textarea
with one of four canonical examples (article, marketing, dashboard,
app-shell) and auto-toggles the vocab packs each example needs. When a
compile fails — typically because a toggle removed a vocab the source
still uses — the iframe dims and gets a red outline so the failure is
visible at a glance, with the specific error in the status bar.

Adding more packs is a 4-line change in `src/playground/packs.ts`.

## Pack browser

Driven by `generated/packs.json`. Phase 5e will swap the data source to
the npm registry (`registry.npmjs.org/@quoin/*`) once the packs are
published. The consumed JSON shape stays stable so the page itself
doesn't change.

## Phase 4 exit criteria

Per [`../PHASE_GATES.md`](../PHASE_GATES.md):

- [x] Docs site builds and runs locally (`npm run dev`, `npm run build`).
- [x] Spec reference auto-generated from `00_spec/` (not duplicated).
- [x] Live playground exists — browser-side compile, real-time render.
- [x] Pack browser lists all 47 packs (7 reference + 40 harvested).
- [x] Getting-started + Tailwind / DaisyUI / shadcn migration guides
      exist with real side-by-side content.
- [x] Stylistic requirement: docs site is itself authored in Quoin.

## Phase 5 additions (5a–5d) shipped to this site

- **Components page** with every primitive shown source + rendered.
- **Cmd-K command menu** wired site-wide via `cmd-k.js` + `companion.js`.
- **Playground presets** — article / marketing / dashboard / app-shell.
- **Vocab multi-select** in the playground with 8 preloaded packs.
- **Visible compile-error state** — dimmed iframe + red outline.
- **Project token overrides** via `quoin.tokens.json` (Junicode +
  Public Sans + brand accent) compiled into both the build pipeline and
  the served `tokens.css`.
- **Companion CSS + JS** loaded on every page for hover/focus polish
  and interactive behaviors.

## Build output

```
$ npm run build
13 HTML pages, 2 JS bundles
playground bundle: ~511 KB / 159 KB gzipped (includes the compiler)
pack browser bundle: ~34 KB / 8 KB gzipped
zero Quoin tags survive in any compiled page
```

## Cross-references

- Spec: [`../00_spec/`](../00_spec/) — drives the auto-generated reference.
- Compiler: [`../01_compiler/`](../01_compiler/) — bundled for the playground via the new browser entry.
- Reference packs: [`../02_reference-packs/`](../02_reference-packs/) — pack stack the site uses.
- Harvested packs: [`../03_harvest/`](../03_harvest/) — 40 packs surfaced in the browser + playground.
