# Quoin sample

Demonstrates the Phase-1 reference compiler end-to-end. The page exercises
14 of the 36 v1 primitives across all six categories.

## Run

```bash
# from 01_compiler/
npm install
npm run build              # builds the compiler -> dist/
npm run sample             # compiles sample/source.html -> sample/dist/index.html
```

Open `sample/dist/index.html` in a browser. The page renders with the
bundled `styles.css` shim — a thin hand-written stand-in for the real
Tailwind v4 stylesheet, so the lab doesn't need a full Tailwind toolchain.

## Primitives exercised

`<wayfinder>`, `<canvas-block>`, `<stack>`, `<breadcrumb-trail>`,
`<authority-mark>`, `<lead-graf>`, `<reading-flow>`, `<pull-quote>`,
`<emphasis-card>`, `<recede-block>`, `<cluster>`, `<primary-action>`,
`<secondary-action>`, `<aside-note>`, `<colophon>`.
