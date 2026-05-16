#!/usr/bin/env node
/**
 * Smoke gallery — renders the canonical Phase-2 showcase against every
 * harvested token pack, then emits a single index page that links to
 * each rendering for side-by-side visual review.
 *
 * Run:  node 03_harvest/smoke-gallery.js
 * Open: 03_harvest/smoke-gallery/dist/index.html
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAB_ROOT = path.resolve(__dirname, "..");
const COMPILER_DIST = path.resolve(LAB_ROOT, "01_compiler", "dist");
const REF_PACKS = path.resolve(LAB_ROOT, "02_reference-packs");
const HARVEST_PACKS = path.join(__dirname, "packs");
const OUT = path.join(__dirname, "smoke-gallery", "dist");
/**
 * The "signature" source is purpose-built to expose each token pack's
 * identity. It exercises every status colour (info/success/warning/
 * critical), every surface layer, every button intent, and the type
 * pairing — so each pack hits ~30% of the page in colour instead of
 * the ~3% the editorial showcase managed.
 */
const SHOWCASE_HTML = path.join(__dirname, "smoke-source.html");
const SHIM_CSS = path.join(REF_PACKS, "demos", "shared", "tailwind-shim.css");

const url = (p) => pathToFileURL(p).href;
const { compile } = await import(url(path.join(COMPILER_DIST, "compiler.js")));
const {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack
} = await import(url(path.join(COMPILER_DIST, "pack-loader.js")));

async function main() {
  const [vocabEd, vocabDb, implTw] = await Promise.all([
    loadVocabularyPack(path.join(REF_PACKS, "vocab-editorial")),
    loadVocabularyPack(path.join(REF_PACKS, "vocab-dashboard")),
    loadImplementationPack(path.join(REF_PACKS, "impl-tailwind"))
  ]);

  const showcase = await fs.readFile(SHOWCASE_HTML, "utf8");

  const tokenDirs = (await fs.readdir(HARVEST_PACKS))
    .filter((d) => d.startsWith("tokens-"))
    .sort();

  await fs.mkdir(OUT, { recursive: true });
  const entries = [];

  for (const dir of tokenDirs) {
    const packDir = path.join(HARVEST_PACKS, dir);
    const manifest = JSON.parse(
      await fs.readFile(path.join(packDir, "quoin.pack.json"), "utf8")
    );
    const tokenPack = await loadTokenPack(packDir);
    const result = compile({
      source: showcase,
      tokenPack,
      vocabularyPacks: [vocabEd, vocabDb],
      implementationPack: implTw,
      filename: `smoke/${dir}/showcase.html`
    });

    const outDir = path.join(OUT, dir);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), result.html);
    await fs.copyFile(path.join(packDir, "tokens.css"), path.join(outDir, "tokens.css"));
    await fs.copyFile(SHIM_CSS, path.join(outDir, "impl.css"));

    entries.push({
      dir,
      name: manifest.name,
      sourceSystem: manifest.attribution.sourceSystem,
      sourceLicense: manifest.attribution.sourceLicense,
      sourceUrl: manifest.attribution.sourceUrl
    });
    console.log(`rendered ${dir}`);
  }

  // Top-level gallery.
  const gallerySections = entries
    .map(
      (e) => `
    <section class="card">
      <header>
        <h2>${escapeHtml(e.name)}</h2>
        <div class="meta">
          <span>${escapeHtml(e.sourceSystem)}</span>
          <span>${escapeHtml(e.sourceLicense)}</span>
          ${e.sourceUrl ? `<a href="${escapeAttr(e.sourceUrl)}" target="_blank" rel="noopener">source</a>` : ""}
          <a href="./${escapeAttr(e.dir)}/index.html" target="_blank" rel="noopener">open standalone</a>
        </div>
      </header>
      <iframe src="./${escapeAttr(e.dir)}/index.html" loading="lazy" title="${escapeAttr(e.name)}"></iframe>
    </section>
    `
    )
    .join("\n");

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Quoin Phase 3 — smoke gallery</title>
    <style>
      :root {
        color-scheme: light;
        font-family: ui-sans-serif, system-ui, sans-serif;
        line-height: 1.4;
        background: #f6f6f6;
        color: #111;
      }
      *, *::before, *::after { box-sizing: border-box; }
      body { margin: 0; padding: 2rem; }
      h1 { font-size: 2rem; margin: 0 0 0.5rem; }
      .lede { color: #555; max-width: 70ch; margin: 0 0 2rem; }
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .card {
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .card > header {
        padding: 0.75rem 1rem;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: baseline;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .card h2 { margin: 0; font-size: 1rem; font-family: ui-monospace, monospace; }
      .meta { display: flex; gap: 0.75rem; font-size: 0.8rem; color: #666; align-items: baseline; flex-wrap: wrap; }
      .meta a { color: #0066cc; text-decoration: none; }
      .meta a:hover { text-decoration: underline; }
      iframe {
        display: block;
        width: 100%;
        height: 720px;
        border: 0;
        background: #fff;
      }
      .toc { margin: 0 0 2rem; padding: 0 0 0 1.5rem; font-size: 0.875rem; columns: 3; }
      .toc li { break-inside: avoid; margin-bottom: 0.25rem; }
      .toc a { color: #0066cc; text-decoration: none; font-family: ui-monospace, monospace; }
      .toc a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <h1>Quoin Phase 3 — smoke gallery</h1>
    <p class="lede">
      The canonical Phase-2 showcase (vocab-editorial + vocab-dashboard +
      impl-tailwind) rendered against each of the ${entries.length} harvested
      token packs. Scroll to scan; each pack should be recognisable as the
      source aesthetic. Click "open standalone" to view any rendering
      full-screen, or "source" to verify against the original system.
    </p>
    <ol class="toc">
      ${entries.map((e) => `<li><a href="#${escapeAttr(e.dir)}">${escapeHtml(e.name)}</a></li>`).join("\n      ")}
    </ol>
    <div class="grid">
      ${entries
        .map(
          (e) => `<a id="${escapeAttr(e.dir)}"></a>${gallerySectionFor(e)}`
        )
        .join("\n")}
    </div>
  </body>
</html>
`;
  // Replace the placeholder section block with the actual rendered blocks
  // (gallerySectionFor mirrors the earlier loop output so anchors line up).
  await fs.writeFile(path.join(OUT, "index.html"), indexHtml);

  console.log(`\nGallery: ${path.join(OUT, "index.html")}`);
  console.log(`${entries.length} pack renderings.`);
}

function gallerySectionFor(e) {
  return `<section class="card">
      <header>
        <h2>${escapeHtml(e.name)}</h2>
        <div class="meta">
          <span>${escapeHtml(e.sourceSystem)}</span>
          <span>${escapeHtml(e.sourceLicense)}</span>
          ${e.sourceUrl ? `<a href="${escapeAttr(e.sourceUrl)}" target="_blank" rel="noopener">source</a>` : ""}
          <a href="./${escapeAttr(e.dir)}/index.html" target="_blank" rel="noopener">open standalone</a>
        </div>
      </header>
      <iframe src="./${escapeAttr(e.dir)}/index.html" loading="lazy" title="${escapeAttr(e.name)}"></iframe>
    </section>`;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
function escapeAttr(s) {
  return String(s).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
