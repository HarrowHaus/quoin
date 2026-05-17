#!/usr/bin/env node
/**
 * Phase 3.5 fidelity extractor.
 *
 * For each per-source extraction spec under fidelity/specs/<name>.js:
 *   1. Fetch the canonical upstream source file(s).
 *   2. Parse with the declared format-specific parser.
 *   3. Convert raw values to canonical OKLCH strings via culori.
 *   4. Apply the spec's mapping function to produce the `base` palette
 *      structure consumed by build.js.
 *   5. Rewrite sources/<name>.json with extracted values + updated
 *      attribution (sourceUrl, sourceCommit, harvestedAt,
 *      harvestNotes).
 *   6. Record per-pack outcome (tier, missing tokens, fetch status).
 *
 * After extraction, the existing 03_harvest/build.js regenerates each
 * pack's tokens.css and tokens/index.json from the updated source
 * config. Run `node 03_harvest/build.js` after this to materialise.
 *
 * Single-pack run:    node fidelity/extract.js material3
 * All packs:          node fidelity/extract.js
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PARSERS } from "./parsers.js";
import { convertRecord, toCanonicalOklch } from "./oklch.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HARVEST_ROOT = path.resolve(__dirname, "..");
const SOURCES_DIR = path.join(HARVEST_ROOT, "sources");
const SPECS_DIR = path.join(__dirname, "specs");
const CANONICAL_CACHE = path.join(__dirname, "canonical");
const TODAY = new Date().toISOString().slice(0, 10);

async function loadSpec(name) {
  const file = path.join(SPECS_DIR, `${name}.js`);
  const url = new URL(`file://${file.replace(/\\/g, "/")}`);
  const mod = await import(url.href);
  return mod.default ?? mod.spec;
}

async function loadSource(name) {
  const file = path.join(SOURCES_DIR, `${name}.json`);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

async function saveSource(name, data) {
  const file = path.join(SOURCES_DIR, `${name}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n");
}

async function fetchWithFallback(urls) {
  for (const url of urls) {
    try {
      const resp = await fetch(url, {
        headers: { "User-Agent": "quoin-fidelity-extract/0.1" }
      });
      if (!resp.ok) continue;
      const text = await resp.text();
      return { ok: true, url, text };
    } catch {
      // try next
    }
  }
  return { ok: false };
}

async function cacheCanonical(name, url, text) {
  await fs.mkdir(CANONICAL_CACHE, { recursive: true });
  const file = path.join(CANONICAL_CACHE, `${name}.txt`);
  await fs.writeFile(file, `<!-- fetched ${TODAY} from ${url} -->\n${text}`);
}

async function processSpec(name) {
  let spec;
  try {
    spec = await loadSpec(name);
  } catch (err) {
    return { name, tier: "C", reason: `no spec: ${err.message}` };
  }

  const fetch = await fetchWithFallback(spec.fetch.urls);
  if (!fetch.ok) {
    return { name, tier: "C", reason: "fetch-failed", urls: spec.fetch.urls };
  }
  await cacheCanonical(name, fetch.url, fetch.text);

  // Concatenate multiple fetches if the spec says so (e.g. a system
  // with separate light + base files we both need).
  let combinedText = fetch.text;
  const extraTexts = [];
  if (spec.fetch.additionalUrls && spec.fetch.additionalUrls.length) {
    for (const url of spec.fetch.additionalUrls) {
      const r = await fetchWithFallback([url]);
      if (r.ok) {
        extraTexts.push(r.text);
        await cacheCanonical(`${name}--${path.basename(url).slice(0, 30)}`, url, r.text);
      }
    }
    combinedText = [fetch.text, ...extraTexts].join("\n");
  }

  const parser = PARSERS[spec.fetch.format];
  if (!parser) {
    return { name, tier: "C", reason: `unknown format ${spec.fetch.format}` };
  }
  const rawValues = parser(combinedText);
  const count = Object.keys(rawValues).length;
  if (count === 0) {
    return { name, tier: "C", reason: "parse-yielded-no-values", url: fetch.url };
  }

  const oklch = {};
  const failedConvert = [];
  for (const [key, value] of Object.entries(rawValues)) {
    const ok = toCanonicalOklch(value);
    if (ok) oklch[key] = ok;
    else failedConvert.push({ key, value });
  }

  // Apply the spec's mapping function to translate fetched names into
  // the `base.{family}.{step}` palette structure consumed by build.js.
  let base;
  let mappingNotes;
  try {
    const mapped = spec.map(oklch, rawValues);
    base = mapped.base;
    mappingNotes = mapped.notes ?? null;
  } catch (err) {
    return { name, tier: "C", reason: `mapping-error: ${err.message}` };
  }

  // Walk the existing semantic refs to confirm they still resolve
  // against the new base. If not, that's the heart of a Tier B note.
  const source = await loadSource(name);
  const requiredFamilies = new Set();
  for (const value of Object.values(source.semantic ?? {})) {
    const m = /\{([^}]+)\}/.exec(value);
    if (m) {
      const ref = m[1];
      const parts = ref.split(".");
      // `{neutral.98}` or `{color.neutral.98}` style
      const family = parts[parts[0] === "color" ? 1 : 0];
      requiredFamilies.add(family);
    }
  }
  const missingFamilies = [];
  for (const fam of requiredFamilies) {
    if (!base[fam]) missingFamilies.push(fam);
  }

  const tier = missingFamilies.length === 0 && (mappingNotes ?? "").length === 0 ? "A" : "B";

  // Preserve untouched semantic mapping; only replace `base`.
  const updated = {
    ...source,
    base,
    attribution: {
      ...source.attribution,
      sourceUrl: fetch.url,
      sourceCommit: spec.fetch.commit ?? "main",
      harvestedAt: TODAY,
      fidelityTier: tier,
      harvestNotes:
        (spec.harvestNotes ?? source.attribution.harvestNotes ?? "") +
        (mappingNotes ? `\n\nExtraction notes: ${mappingNotes}` : "")
    }
  };

  await saveSource(name, updated);

  return {
    name,
    tier,
    url: fetch.url,
    valuesExtracted: count,
    valuesConverted: Object.keys(oklch).length,
    failedConvert: failedConvert.length,
    missingFamilies,
    notes: mappingNotes ?? null
  };
}

async function main() {
  const targets = process.argv.slice(2);
  let specs;
  if (targets.length > 0) {
    specs = targets;
  } else {
    const files = (await fs.readdir(SPECS_DIR)).filter((f) => f.endsWith(".js"));
    specs = files.map((f) => f.replace(/\.js$/, ""));
  }

  const results = [];
  for (const name of specs) {
    const result = await processSpec(name);
    results.push(result);
    const summary =
      result.tier === "A"
        ? `tier A — ${result.valuesExtracted} values`
        : result.tier === "B"
          ? `tier B — ${result.valuesExtracted} values, ${result.missingFamilies?.length ?? 0} families missing`
          : `tier C — ${result.reason}`;
    console.log(`${result.name.padEnd(20)} ${summary}`);
  }

  const reportPath = path.join(__dirname, "extract-report.json");
  await fs.writeFile(reportPath, JSON.stringify({ ranAt: TODAY, results }, null, 2) + "\n");
  console.log(`\n${results.length} packs processed. Report: ${reportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
