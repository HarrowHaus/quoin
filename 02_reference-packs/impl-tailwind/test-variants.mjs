#!/usr/bin/env node
/**
 * Smoke test for Phase 5b variants.
 *
 * Compiles 8 variant invocations against the Phase 1 compiler +
 * impl-tailwind. Asserts each variant produces visibly distinct output
 * from the default and that no Quoin tag survives compilation.
 *
 * Run:  node 02_reference-packs/impl-tailwind/test-variants.mjs
 */

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAB_ROOT = path.resolve(__dirname, "..", "..");
const COMPILER = path.resolve(LAB_ROOT, "01_compiler", "dist");
const REF = path.resolve(LAB_ROOT, "02_reference-packs");
const HARVEST = path.resolve(LAB_ROOT, "03_harvest", "packs");

const url = (p) => pathToFileURL(p).href;
const { compile } = await import(url(path.join(COMPILER, "compiler.js")));
const { loadTokenPack, loadVocabularyPack, loadImplementationPack } =
  await import(url(path.join(COMPILER, "pack-loader.js")));

const [tokenPack, vEd, vDb, vEss, vShell, vMarket, impl] = await Promise.all([
  loadTokenPack(path.join(REF, "tokens-baseline")),
  loadVocabularyPack(path.join(REF, "vocab-editorial")),
  loadVocabularyPack(path.join(REF, "vocab-dashboard")),
  loadVocabularyPack(path.join(REF, "vocab-essentials")),
  loadVocabularyPack(path.join(REF, "vocab-app-shell")),
  loadVocabularyPack(path.join(HARVEST, "vocab-marketing")),
  loadImplementationPack(path.join(REF, "impl-tailwind"))
]);

const VOCABS = [vEd, vDb, vEss, vShell, vMarket];

function compileSource(source) {
  return compile({
    source,
    tokenPack,
    vocabularyPacks: VOCABS,
    implementationPack: impl,
    filename: "test-variants.mjs"
  });
}

const fails = [];
const ok = (msg) => console.log("ok    " + msg);
const fail = (msg) => { fails.push(msg); console.error("FAIL  " + msg); };

const CASES = [
  {
    name: "emphasis-card variant=default",
    source: `<emphasis-card>x</emphasis-card>`,
    expect: ["border", "bg-[var(--surface-elevated)]", "p-[var(--space-card)]"],
    forbid: ["border-t-4"]
  },
  {
    name: "emphasis-card variant=featured",
    source: `<emphasis-card variant="featured">x</emphasis-card>`,
    expect: ["border-t-4", "border-t-[var(--accent)]", "p-[var(--space-panel)]"],
    forbid: ["p-[var(--space-card)]"]
  },
  {
    name: "emphasis-card variant=quiet",
    source: `<emphasis-card variant="quiet">x</emphasis-card>`,
    expect: ["bg-[var(--surface-recessed)]", "p-[var(--space-card)]"],
    forbid: ["border-[var(--border)]", "shadow-sm"]
  },
  {
    name: "alert-band variant=compact",
    source: `<alert-band intent="info" variant="compact">x</alert-band>`,
    expect: ["inline-flex", "rounded-[var(--radius-pill)]", "px-3"],
    forbid: ["border-l-4"]
  },
  {
    name: "hero-banner variant=split",
    source: `<hero-banner variant="split">x</hero-banner>`,
    expect: ["grid", "md:[grid-template-columns:1fr_1fr]"],
    forbid: []
  },
  {
    name: "hero-banner variant=centered",
    source: `<hero-banner variant="centered">x</hero-banner>`,
    expect: ["mx-auto", "max-w-3xl", "text-center"],
    forbid: ["grid-template-columns"]
  },
  {
    name: "pricing-tier variant=featured",
    source: `<pricing-tier variant="featured">x</pricing-tier>`,
    expect: ["ring-2", "ring-[var(--accent)]", "scale-[1.02]"],
    forbid: ["border-[var(--border)]"]
  },
  {
    name: "feature-grid variant=bento",
    source: `<feature-grid variant="bento" min-cell-width="240px">x</feature-grid>`,
    expect: ["grid-auto-flow: dense", "minmax(240px"],
    forbid: ["grid-cols-[repeat(auto-fill"]
  },
  {
    name: "cta-band variant=split",
    source: `<cta-band variant="split">x</cta-band>`,
    expect: ["md:flex-row", "md:items-center", "md:justify-between"],
    forbid: []
  }
];

for (const c of CASES) {
  try {
    const r = compileSource(c.source);
    let pass = true;
    for (const e of c.expect) {
      if (!r.html.includes(e)) {
        fail(`${c.name}: missing "${e}"`);
        pass = false;
      }
    }
    for (const fb of c.forbid) {
      if (r.html.includes(fb)) {
        fail(`${c.name}: unexpectedly contains "${fb}"`);
        pass = false;
      }
    }
    // Confirm zero Quoin tag survives
    const tag = c.source.match(/^<([a-z-]+)/)[1];
    if (r.html.includes(`<${tag}`)) {
      fail(`${c.name}: <${tag}> survived compilation`);
      pass = false;
    }
    if (pass) ok(c.name);
  } catch (err) {
    fail(`${c.name}: threw ${err.message}`);
  }
}

if (fails.length > 0) {
  console.error(`\n${fails.length} failure(s)`);
  process.exit(1);
}
console.log(`\nAll ${CASES.length} variant cases pass.`);
