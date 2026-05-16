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
```

`npm run sample` is the chained script (`npm run build && cd sample && vite build`);
running `vite build` directly inside `sample/` works the same way provided
`01_compiler/dist/` has been built at least once.

Open `sample/dist/index.html` in a browser. The page renders with the
bundled `styles.css` shim (in `sample/public/`) — a thin hand-written
stand-in for the real Tailwind v4 stylesheet, kept so the lab doesn't
need a full Tailwind toolchain to view the sample.

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
