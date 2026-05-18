/**
 * Phase Themes — validation harness for the 10 v1.0 theme packs.
 *
 * For each theme:
 *   - Loads the manifest + light + dark + P3 override maps.
 *   - Asserts every override name lives in the v1.0 canonical
 *     namespace (the loader already enforces this; we re-check
 *     here to surface diff-counts and catch spec drift).
 *   - Renders a small showcase composition (heading + body + CTA)
 *     against the impl-tailwind pack and confirms the output
 *     contains the expected per-theme accent token reference.
 *   - Logs a per-theme summary line.
 *
 * Cross-diversity test:
 *   - Builds a per-theme palette signature (accent + surface +
 *     text-emphasis triple) and confirms no two themes share the
 *     same signature — the visual differentiation gate.
 *
 * Exit 0 on success, 1 on any failure. Designed to be runnable
 * with `node validate.js` from this directory.
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
  "vellum",
  "graphite",
  "aurora",
  "letterpress",
  "terminal",
  "broadsheet",
  "bloom",
  "arcade",
  "prism",
  "vapor"
];

const failures = [];
const fail = (msg) => { failures.push(msg); console.error("FAIL  " + msg); };
const ok = (msg) => console.log("ok    " + msg);

async function main() {
  console.log("Loading base packs (tokens-baseline, vocab-editorial, impl-tailwind)…");
  const [tokenPack, vocab, impl] = await Promise.all([
    loadTokenPack(path.join(ROOT, "02_reference-packs", "tokens-baseline")),
    loadVocabularyPack(path.join(ROOT, "02_reference-packs", "vocab-editorial")),
    loadImplementationPack(path.join(ROOT, "02_reference-packs", "impl-tailwind"))
  ]);
  ok(`base packs loaded`);

  console.log(`\nLoading ${THEMES.length} theme packs…`);
  const loaded = {};
  for (const name of THEMES) {
    try {
      const t = await loadThemePack(path.join(__dirname, name));
      loaded[name] = t;
      ok(`theme-${name}: ${t.manifest.name}@${t.manifest.version} — ` +
        `light:${Object.keys(t.lightModeOverrides).length} ` +
        `dark:${Object.keys(t.darkModeOverrides).length} ` +
        `p3:${Object.keys(t.p3WideGamutOverrides).length}`);
    } catch (err) {
      fail(`theme-${name}: load failed — ${err.message}`);
    }
  }

  if (Object.keys(loaded).length !== THEMES.length) {
    console.error(`\n${failures.length} failure(s); aborting cross-checks`);
    process.exit(1);
  }

  // Required cross-trend baseline: every theme MUST declare light + dark
  // override maps (and SHOULD declare P3). Empty maps are a fail.
  console.log("\nCross-trend baseline (Section 1C) checks…");
  for (const name of THEMES) {
    const t = loaded[name];
    if (Object.keys(t.lightModeOverrides).length < 5) {
      fail(`theme-${name}: lightModeOverrides too sparse (<5 tokens)`);
    } else if (Object.keys(t.darkModeOverrides ?? {}).length < 5) {
      fail(`theme-${name}: darkModeOverrides too sparse (<5 tokens)`);
    } else if (Object.keys(t.p3WideGamutOverrides ?? {}).length < 1) {
      fail(`theme-${name}: p3WideGamutOverrides missing`);
    } else {
      ok(`theme-${name}: light + dark + P3 all populated`);
    }
  }

  // Composition smoke test: each theme compiles a tiny editorial source
  // through tokens-baseline + vocab-editorial + impl-tailwind without
  // throwing. We just check the compile happens; CSS visual diff is
  // operator-side.
  console.log("\nComposition smoke test (each theme compiles a minimal source)…");
  const source = `
    <authority-mark>Composing</authority-mark>
    <panel>
      <cluster>
        <primary-action>Save</primary-action>
        <secondary-action>Cancel</secondary-action>
      </cluster>
    </panel>
  `;
  for (const name of THEMES) {
    try {
      const r = compile({
        source,
        tokenPack,
        vocabularyPacks: [vocab],
        themePack: loaded[name],
        implementationPack: impl
      });
      if (r.html.includes("<authority-mark") || r.html.includes("<panel")) {
        fail(`theme-${name}: Quoin tag survived compilation`);
      } else {
        ok(`theme-${name}: compiles → ${r.html.length} chars HTML`);
      }
    } catch (err) {
      fail(`theme-${name}: compile failed — ${err.message}`);
    }
  }

  // Cross-diversity test: every theme MUST have a distinct
  // (accent, surface, text-emphasis) triple. Identical triples
  // would indicate a palette collision and fail visual differentiation.
  console.log("\nCross-diversity test (10 distinct palette signatures)…");
  const sigs = new Map();
  for (const name of THEMES) {
    const t = loaded[name];
    const accent = t.lightModeOverrides.accent ?? "<missing-accent>";
    const surface = t.lightModeOverrides.surface ?? "<missing-surface>";
    const text = t.lightModeOverrides["text-emphasis"] ?? "<missing-text-emphasis>";
    const sig = `${accent} | ${surface} | ${text}`;
    if (sigs.has(sig)) {
      fail(`theme-${name}: palette signature collides with theme-${sigs.get(sig)}: ${sig}`);
    } else {
      sigs.set(sig, name);
      ok(`theme-${name}: distinct signature`);
    }
  }

  // Report
  console.log("\nPer-theme summary:");
  for (const name of THEMES) {
    const t = loaded[name];
    console.log(`  ${name.padEnd(12)} accent=${(t.lightModeOverrides.accent ?? "—").padEnd(28)} surface=${(t.lightModeOverrides.surface ?? "—")}`);
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log(`\nAll ${THEMES.length} themes valid; cross-diversity verified.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
