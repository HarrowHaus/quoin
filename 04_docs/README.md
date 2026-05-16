# Phase 4 — Quoin documentation site

The Quoin docs site. Vite multi-page build with the Quoin Vite plugin
on top, so the site is itself a working demonstration of the language —
every page (except generated spec content) is authored in Quoin and
compiled at build time.

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
├── playground/index.html    Live in-browser compiler
├── packs/index.html         Pack browser (45 packs)
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
│       ├── main.ts          Playground driver
│       └── packs.ts         In-memory pack registry
├── public/                  Static assets (tokens.css, impl.css, site.css)
├── generated/               (gitignored — built every run)
├── scripts/                 Pre-build scripts
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
| Token | `@quoin/tokens-baseline` |
| Vocabulary | `@quoin/vocab-editorial` |
| Vocabulary | `@quoin/vocab-dashboard` |
| Vocabulary | `@quoin/vocab-marketing` |
| Vocabulary | `@quoin/vocab-docs` |
| Implementation | `@quoin/impl-tailwind` |

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
- **2 vocabulary packs:** editorial, dashboard
- **2 implementation packs:** impl-tailwind, impl-raw-css

Adding more is a 4-line change in `src/playground/packs.ts`.

## Pack browser

Driven by `generated/packs.json`. Phase 5 will swap the data source to
the npm registry (`registry.npmjs.org/@quoin/*`) once the packs are
published. The consumed JSON shape stays stable so the page itself
doesn't change.

## Phase 4 exit criteria

Per [`../PHASE_GATES.md`](../PHASE_GATES.md):

- [x] Docs site builds and runs locally (`npm run dev`, `npm run build`).
- [x] Spec reference auto-generated from `00_spec/` (not duplicated).
- [x] Live playground exists — browser-side compile, real-time render.
- [x] Pack browser lists all 45 packs (5 reference + 40 harvested).
- [x] Getting-started + Tailwind / DaisyUI / shadcn migration guides
      exist with real side-by-side content.
- [x] Stylistic requirement: docs site is itself authored in Quoin.
- [ ] Operator review pending.

## Build output

```
$ npm run build
12 HTML pages, 2 JS bundles
playground bundle: 456 KB / 148 KB gzipped (includes the compiler)
pack browser bundle: 34 KB / 8 KB gzipped
zero Quoin tags survive in any compiled page
```

## Cross-references

- Spec: [`../00_spec/`](../00_spec/) — drives the auto-generated reference.
- Compiler: [`../01_compiler/`](../01_compiler/) — bundled for the playground via the new browser entry.
- Reference packs: [`../02_reference-packs/`](../02_reference-packs/) — pack stack the site uses.
- Harvested packs: [`../03_harvest/`](../03_harvest/) — 40 packs surfaced in the browser + playground.
