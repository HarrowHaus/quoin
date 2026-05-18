/**
 * Side-by-side showcase composition renderer.
 *
 * Compiles ONE Quoin source against all 10 v1.0 theme packs (each in
 * light + dark mode) and writes a single HTML file with 20 framed cells
 * arranged in a 4×5 grid (10 themes × 2 modes). The output is what an
 * operator visually inspects to confirm cross-pack diversity.
 *
 * Output: 02_reference-packs/themes/showcase.html
 * Run:    node 02_reference-packs/themes/showcase.js
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const COMPILER_DIST = path.join(ROOT, "01_compiler", "dist");
const url = (p) => pathToFileURL(p).href;

const { compile } = await import(url(path.join(COMPILER_DIST, "compiler.js")));
const {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack,
  loadThemePack
} = await import(url(path.join(COMPILER_DIST, "pack-loader.js")));

const THEMES = [
  "vellum", "graphite", "aurora", "letterpress", "terminal",
  "broadsheet", "bloom", "arcade", "prism", "vapor"
];

const SHOWCASE_SRC = `
<panel>
  <authority-mark>Quoin Showcase</authority-mark>
  <emphasis-mark>A semantic design language</emphasis-mark>
  <prose>
    The same source, rendered through ten distinct theme packs.
    Each pack supplies its own palette, typography, motion, and depth
    strategy on top of the canonical token namespace.
  </prose>
  <cluster>
    <primary-action>Get started</primary-action>
    <secondary-action>Read the spec</secondary-action>
  </cluster>
</panel>
`;

function tokensToCssVars(tokens, scopeSelector) {
  const lines = [`${scopeSelector} {`];
  for (const [name, value] of Object.entries(tokens)) {
    // Composite values are JSON-stringified; we only emit atomic ones
    // (CSS custom properties don't accept object literals).
    if (value.startsWith("{") || value.startsWith("[")) continue;
    lines.push(`  --${name}: ${value};`);
  }
  lines.push("}");
  return lines.join("\n");
}

function buildOverrideCss(themePack, mode) {
  const overrides = mode === "light"
    ? themePack.lightModeOverrides
    : themePack.darkModeOverrides ?? {};
  const selector = `[data-theme="${themePack.manifest.name.replace(/^@quoin\//, "")}"][data-mode="${mode}"]`;
  return tokensToCssVars(overrides, selector);
}

async function main() {
  const [tokenPack, vocab, impl] = await Promise.all([
    loadTokenPack(path.join(ROOT, "02_reference-packs", "tokens-baseline")),
    loadVocabularyPack(path.join(ROOT, "02_reference-packs", "vocab-editorial")),
    loadImplementationPack(path.join(ROOT, "02_reference-packs", "impl-tailwind"))
  ]);

  const themes = {};
  for (const name of THEMES) {
    themes[name] = await loadThemePack(path.join(__dirname, name));
  }

  // Compile the showcase ONCE against each (theme × mode). All produce
  // the same HTML structure — the differentiation comes from the
  // per-(theme × mode) CSS variable scope.
  const compiled = compile({
    source: SHOWCASE_SRC,
    tokenPack,
    vocabularyPacks: [vocab],
    implementationPack: impl
  });

  // Build the page.
  const cells = [];
  for (const name of THEMES) {
    for (const mode of ["light", "dark"]) {
      cells.push(`
        <article class="cell" data-theme="theme-${name}" data-mode="${mode}">
          <header class="cell-meta">
            <span class="cell-name">@quoin/theme-${name}</span>
            <span class="cell-mode">${mode}</span>
          </header>
          <div class="cell-render">${compiled.html}</div>
        </article>
      `);
    }
  }

  const themeCss = THEMES.flatMap((name) => [
    buildOverrideCss(themes[name], "light"),
    buildOverrideCss(themes[name], "dark")
  ]).join("\n\n");

  // Base CSS variables (from tokens-baseline) — needed because the
  // theme overrides only supply a subset.
  const baseCss = tokensToCssVars(tokenPack.tokens, ":root");

  const out = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Quoin Theme Showcase — 10 v1.0 themes × light/dark</title>
  <style>
${baseCss}

${themeCss}

  body {
    margin: 0;
    padding: 24px;
    background: #f1ece4;
    color: #141413;
    font: 14px/1.5 system-ui, -apple-system, sans-serif;
  }
  h1 { font-size: 32px; margin: 0 0 8px; }
  .intro { max-width: 720px; margin-bottom: 24px; color: #555; }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(260px, 1fr));
    gap: 12px;
  }
  @media (max-width: 1280px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 960px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .grid { grid-template-columns: 1fr; }
  }
  .cell {
    border: 1px solid #d4cfc4;
    border-radius: 8px;
    overflow: hidden;
    background: var(--surface);
    color: var(--text);
    font-family: var(--font-sans);
  }
  .cell-meta {
    display: flex;
    justify-content: space-between;
    padding: 8px 12px;
    background: var(--surface-recessed);
    color: var(--text-recede);
    font: 11px/1 ui-monospace, monospace;
    border-bottom: 1px solid var(--border);
  }
  .cell-render {
    padding: 16px;
    min-height: 200px;
  }
  </style>
</head>
<body>
  <h1>Quoin theme showcase</h1>
  <p class="intro">
    Same source rendered through 10 v1.0 theme packs in light + dark
    mode. This is the cross-pack diversity check from the phase exit
    criteria: each cell should read as a distinct aesthetic.
  </p>
  <div class="grid">
    ${cells.join("\n")}
  </div>
</body>
</html>
`;

  const outPath = path.join(__dirname, "showcase.html");
  await fs.writeFile(outPath, out, "utf8");
  console.log(`Wrote ${outPath} — ${THEMES.length * 2} cells (${THEMES.length} themes × light/dark).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
