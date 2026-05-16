# Quoin sample

Demonstrates the Phase-1 reference compiler end-to-end through a real
Vite build. The plugin's `transformIndexHtml` hook compiles every Quoin
element in `index.html` against the four Phase-1 fixture packs
(`tokens-baseline` + `vocab-editorial` + `vocab-dashboard` +
`impl-tailwind`) and Vite writes the result to `dist/`.

The page exercises 14 of the 36 v1 primitives across all six categories.

## Run

```bash
# from 01_compiler/
npm install
npm run sample             # builds the compiler, then runs vite build on sample/
npm run sample:preview     # serves sample/dist/ at http://localhost:4173
```

`npm run sample` is the chained script (`npm run build && cd sample && vite build`);
running `vite build` directly inside `sample/` works the same way provided
`01_compiler/dist/` has been built at least once.

### Viewing the result

Two equivalent ways to look at `sample/dist/index.html` once it's built:

- **Recommended — serve over HTTP:** `npm run sample:preview` (Vite's
  built-in preview server). This matches what a deployed page would do.
- **Open the file directly:** double-click `sample/dist/index.html`.
  The link uses `href="./styles.css"` so the stylesheet resolves under
  both `file://` and HTTP.

The page renders with `styles.css` (in `sample/public/`, copied to
`dist/` by Vite) — a thin hand-written stand-in for the real Tailwind
v4 stylesheet, kept so the lab doesn't need a full Tailwind toolchain
to view the sample.

## Primitives exercised

`<wayfinder>`, `<canvas-block>`, `<stack>`, `<breadcrumb-trail>`,
`<authority-mark>`, `<lead-graf>`, `<reading-flow>`, `<pull-quote>`,
`<emphasis-card>`, `<recede-block>`, `<cluster>`, `<primary-action>`,
`<secondary-action>`, `<aside-note>`, `<colophon>`.

## File layout

```
sample/
├── index.html          Quoin source — Vite's build entry
├── vite.config.ts      Wires @quoin/compiler/vite into the build
├── public/
│   └── styles.css      Copied verbatim to dist/ by Vite
├── package.json
└── README.md
```
