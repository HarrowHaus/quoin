#!/usr/bin/env node
/**
 * Harvested-pack validator.
 *
 * Loads every pack in 03_harvest/packs/ via the Phase 1 compiler's
 * loaders, asserts:
 *   - Manifest validates against the JSON Schema (loader does this).
 *   - Attribution block is present with all required fields.
 *   - License is a recognised SPDX identifier.
 *   - Token pack: every canonical semantic-namespace name is supplied
 *     (loader's finalizeTokenPack does this).
 *   - Compile-test: each pack composes with @quoin/vocab-editorial
 *     + @quoin/vocab-dashboard + @quoin/impl-raw-css on a small sample.
 *
 * Exit code 0 on success, 1 on failure.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAB_ROOT = path.resolve(__dirname, "..");
const COMPILER_DIST = path.resolve(LAB_ROOT, "01_compiler", "dist");
const PACK_DIR = path.join(__dirname, "packs");
const REF_PACKS = path.resolve(LAB_ROOT, "02_reference-packs");

const url = (p) => pathToFileURL(p).href;
const { compile } = await import(url(path.join(COMPILER_DIST, "compiler.js")));
const {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack
} = await import(url(path.join(COMPILER_DIST, "pack-loader.js")));

const ALLOWED_LICENSES = new Set([
  "MIT", "Apache-2.0", "BSD-3-Clause", "BSD-2-Clause", "CC0-1.0",
  "MPL-2.0", "ISC", "Unlicense"
]);

const failures = [];
const ok = (msg) => console.log("ok    " + msg);
const fail = (msg) => { failures.push(msg); console.error("FAIL  " + msg); };

async function main() {
  // Reference vocab + impl packs are reused for compile-testing.
  const [vocabEd, vocabDb, implRaw] = await Promise.all([
    loadVocabularyPack(path.join(REF_PACKS, "vocab-editorial")),
    loadVocabularyPack(path.join(REF_PACKS, "vocab-dashboard")),
    loadImplementationPack(path.join(REF_PACKS, "impl-raw-css"))
  ]);

  // Token packs
  const packs = (await fs.readdir(PACK_DIR))
    .filter((p) => !p.startsWith("."))
    .sort();

  for (const packName of packs) {
    const packDir = path.join(PACK_DIR, packName);
    let manifest;
    try {
      manifest = JSON.parse(
        await fs.readFile(path.join(packDir, "quoin.pack.json"), "utf8")
      );
    } catch (err) {
      fail(`${packName}: cannot read manifest — ${err.message}`);
      continue;
    }

    // Attribution
    const attr = manifest.attribution;
    if (!attr) {
      fail(`${packName}: missing attribution block`);
      continue;
    }
    for (const k of ["sourceSystem", "sourceLicense", "harvestedAt"]) {
      if (!attr[k]) {
        fail(`${packName}: attribution.${k} missing`);
      }
    }

    // License coherence
    const declared = manifest.metadata?.license;
    if (declared && !ALLOWED_LICENSES.has(declared)) {
      fail(`${packName}: metadata.license "${declared}" is not in the allowed SPDX set`);
    }
    if (attr.sourceLicense && !ALLOWED_LICENSES.has(attr.sourceLicense)) {
      fail(`${packName}: attribution.sourceLicense "${attr.sourceLicense}" is not in the allowed SPDX set`);
    }

    // Load + compile test (token packs only — vocab packs come later)
    if (manifest.type === "token") {
      try {
        const tokenPack = await loadTokenPack(packDir);
        compile({
          source: `
            <wayfinder><a href="/">x</a></wayfinder>
            <canvas-block>
              <authority-mark>Heading</authority-mark>
              <reading-flow><p>Body</p></reading-flow>
              <primary-action>Go</primary-action>
            </canvas-block>
          `,
          tokenPack,
          vocabularyPacks: [vocabEd, vocabDb],
          implementationPack: implRaw
        });
        if (manifest.status === "pending-3.5c-fill") {
          console.log(`warn  ${packName}: pending-3.5c-fill (expected; namespace expanded in Phase 0.5)`);
        } else {
          ok(`${packName}: validated + compile-tested`);
        }
      } catch (err) {
        fail(`${packName}: ${err.message}`);
      }
    } else if (manifest.type === "vocabulary") {
      try {
        const vocab = await loadVocabularyPack(packDir);
        const baseline = await loadTokenPack(path.join(REF_PACKS, "tokens-baseline"));
        // Verify the pack loads correctly by counting primitives and
        // checking each declares the required fields. Skip the actual
        // compile pass for the harvested primitives — the Phase 2 impl
        // packs only support the canonical v1 set, by design. A pack
        // shipping new primitives is expected to ship alongside an
        // updated impl pack or arbitrary-value generic emitters.
        const primCount = Object.keys(vocab.primitives).length;
        if (primCount === 0) {
          throw new Error("no primitives declared");
        }
        for (const [name, p] of Object.entries(vocab.primitives)) {
          if (!p.category || !p.role || !p.structure?.element) {
            throw new Error(`primitive ${name} missing required field`);
          }
        }
        // Confirm canonical-namespace compatibility by compiling a
        // canonical primitive (authority-mark) with the vocab pack
        // loaded alongside the reference packs.
        compile({
          source: `<authority-mark>x</authority-mark>`,
          tokenPack: baseline,
          vocabularyPacks: [vocab, vocabEd, vocabDb],
          implementationPack: implRaw
        });
        ok(`${packName}: ${primCount} primitives, canonical-namespace-compatible`);
      } catch (err) {
        fail(`${packName}: ${err.message}`);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log(`\nAll ${packs.length} packs passed validation.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
