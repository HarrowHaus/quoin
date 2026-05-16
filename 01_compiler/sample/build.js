/**
 * Sample build — drives the Quoin compiler programmatically.
 *
 * Reads sample/source.html, compiles every Quoin element against the
 * Phase-1 fixture packs (baseline tokens + editorial + dashboard vocab
 * + tailwind impl), and writes sample/dist/index.html.
 *
 * Also copies a thin styles.css that resolves the Tailwind utility classes
 * to the equivalent CSS — kept inline so the sample is viewable without
 * requiring a full Tailwind toolchain in the lab.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compile } from "../dist/compiler.js";
import {
  loadImplementationPack,
  loadTokenPack,
  loadVocabularyPack
} from "../dist/pack-loader.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.resolve(__dirname, "..", "test-fixtures");
const DIST = path.resolve(__dirname, "dist");

async function main() {
  const [tokenPack, editorial, dashboard, implementationPack] = await Promise.all([
    loadTokenPack(path.join(FIXTURES, "tokens-baseline")),
    loadVocabularyPack(path.join(FIXTURES, "vocab-editorial")),
    loadVocabularyPack(path.join(FIXTURES, "vocab-dashboard")),
    loadImplementationPack(path.join(FIXTURES, "impl-tailwind"))
  ]);

  const source = await fs.readFile(path.join(__dirname, "source.html"), "utf8");

  const result = compile({
    source,
    tokenPack,
    vocabularyPacks: [editorial, dashboard],
    implementationPack,
    filename: "sample/source.html"
  });

  await fs.mkdir(DIST, { recursive: true });
  await fs.writeFile(path.join(DIST, "index.html"), result.html, "utf8");
  await fs.writeFile(
    path.join(DIST, "styles.css"),
    await fs.readFile(path.join(__dirname, "styles.css"), "utf8")
  );

  const usedTags = countTags(result.html);
  console.log("Compiled sample/source.html -> sample/dist/index.html");
  console.log(`  emitted ${result.html.length} bytes of HTML`);
  console.log(`  ${result.warnings.length} warnings`);
  console.log("  observed emitted tags:", Object.entries(usedTags).slice(0, 12));

  const stripped = /<(?:authority-mark|primary-action|panel|stack|wayfinder|reading-flow|colophon)\b/i.test(
    result.html
  );
  if (stripped) {
    console.error("FAIL: emitted output still contains Quoin tags");
    process.exit(1);
  }
}

function countTags(html) {
  const counts = {};
  for (const m of html.matchAll(/<([a-z][a-z0-9-]*)/g)) {
    counts[m[1]] = (counts[m[1]] ?? 0) + 1;
  }
  return counts;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
