/**
 * Phase 2 composition demos.
 *
 * Builds three demo pages, each demonstrating a different pack
 * composition against the same Phase 1 compiler:
 *
 *   1. article-tailwind/ — vocab-editorial + tokens-baseline + impl-tailwind
 *   2. dashboard-rawcss/ — vocab-dashboard + tokens-baseline + impl-raw-css
 *   3. showcase-tailwind/ — vocab-editorial + vocab-dashboard merged
 *                           + tokens-baseline + impl-tailwind
 *
 * Each demo's source.html is compiled to dist/index.html in its own
 * directory. The token pack's tokens.css is copied alongside.
 *
 * Run from anywhere: `node demos/build.js`. Requires that the Phase 1
 * compiler has been built (`cd 01_compiler && npm run build`).
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACK_ROOT = path.resolve(__dirname, "..");
const COMPILER_DIST = path.resolve(PACK_ROOT, "..", "01_compiler", "dist");
const url = (p) => pathToFileURL(p).href;

const { compile } = await import(url(path.join(COMPILER_DIST, "compiler.js")));
const {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack
} = await import(url(path.join(COMPILER_DIST, "pack-loader.js")));

const DEMOS = [
  {
    name: "article-tailwind",
    vocabs: ["vocab-editorial"],
    impl: "impl-tailwind",
    stylesheets: ["./tokens.css", "./impl.css"]
  },
  {
    name: "dashboard-rawcss",
    vocabs: ["vocab-dashboard"],
    impl: "impl-raw-css",
    stylesheets: ["./tokens.css"]
  },
  {
    name: "showcase-tailwind",
    vocabs: ["vocab-editorial", "vocab-dashboard"],
    impl: "impl-tailwind",
    stylesheets: ["./tokens.css", "./impl.css"]
  }
];

const TOKEN_PACK_DIR = path.join(PACK_ROOT, "tokens-baseline");
const tokenPack = await loadTokenPack(TOKEN_PACK_DIR);

async function buildDemo(demo) {
  const dir = path.join(__dirname, demo.name);
  const distDir = path.join(dir, "dist");
  await fs.mkdir(distDir, { recursive: true });

  const vocabularyPacks = await Promise.all(
    demo.vocabs.map((v) => loadVocabularyPack(path.join(PACK_ROOT, v)))
  );
  const implementationPack = await loadImplementationPack(
    path.join(PACK_ROOT, demo.impl)
  );

  const source = await fs.readFile(path.join(dir, "source.html"), "utf8");
  const result = compile({
    source,
    tokenPack,
    vocabularyPacks,
    implementationPack,
    filename: `${demo.name}/source.html`
  });

  // Copy the token pack's CSS in alongside.
  await fs.copyFile(
    path.join(TOKEN_PACK_DIR, "tokens.css"),
    path.join(distDir, "tokens.css")
  );

  // For the tailwind demos, ship a small companion CSS that resolves
  // the arbitrary-value classes the impl emits. Real projects use the
  // full Tailwind v4 build; this file is the lab-only shim.
  if (demo.impl === "impl-tailwind") {
    await fs.copyFile(
      path.join(__dirname, "shared", "tailwind-shim.css"),
      path.join(distDir, "impl.css")
    );
  }

  await fs.writeFile(path.join(distDir, "index.html"), result.html, "utf8");
  const warnings = result.warnings.length;
  console.log(
    `built ${demo.name}: ${result.html.length} bytes, ${warnings} warnings`
  );

  // Quoin-tag elimination check
  const allTags = [...vocabularyPacks.flatMap((p) => Object.keys(p.primitives))];
  for (const tag of allTags) {
    if (result.html.includes(`<${tag}`)) {
      throw new Error(`${demo.name}: <${tag}> survived compilation`);
    }
  }
  return { name: demo.name, html: result.html.length, warnings };
}

const results = [];
for (const demo of DEMOS) {
  results.push(await buildDemo(demo));
}
console.log("\nSummary:");
for (const r of results) {
  console.log(`  ${r.name}: ${r.html} bytes, ${r.warnings} warnings`);
}
