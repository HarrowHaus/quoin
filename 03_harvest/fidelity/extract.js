#!/usr/bin/env node
/**
 * Phase 3.5/3.5b fidelity extractor.
 *
 * Dispatches across three extraction methods based on spec shape:
 *
 *   Method A — `spec.fetch.urls`     → static fetch + parser
 *   Method B — `spec.algorithm()`    → algorithm execution at extract time
 *   Method C — `spec.files[]`        → per-file structured extraction
 *
 * A spec can declare any one or any combination. The orchestrator
 * runs each method that's declared and merges the resulting flat
 * `{name → rawColor}` maps before handing them to spec.map().
 *
 * Single-pack run:    node fidelity/extract.js material3
 * All packs:          node fidelity/extract.js
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { toCanonicalOklch } from "./oklch.js";
import { runMethodA, runMethodB, runMethodC } from "./runner.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HARVEST_ROOT = path.resolve(__dirname, "..");
const SOURCES_DIR = path.join(HARVEST_ROOT, "sources");
const SPECS_DIR = path.join(__dirname, "specs");
const TODAY = new Date().toISOString().slice(0, 10);

async function loadSpec(name) {
  const file = path.join(SPECS_DIR, `${name}.js`);
  const url = new URL(`file://${file.replace(/\\/g, "/")}`);
  const mod = await import(url.href + `?t=${Date.now()}`);
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

async function processSpec(name) {
  let spec;
  try {
    spec = await loadSpec(name);
  } catch (err) {
    return { name, tier: "C", reason: `no-spec: ${err.message}` };
  }

  const rawValues = {};
  let fetchedUrl = spec.fetch?.urls?.[0] ?? null;
  let methodMeta = null;
  const methodsUsed = [];

  if (spec.fetch && Array.isArray(spec.fetch.urls)) {
    const r = await runMethodA(spec, name);
    if (r.error) {
      // continue — other methods may yield values
    } else {
      Object.assign(rawValues, r.rawValues);
      fetchedUrl = r.fetchedUrl ?? fetchedUrl;
      methodsUsed.push("A");
    }
  }
  if (Array.isArray(spec.files) && spec.files.length > 0) {
    const r = await runMethodC(spec, name);
    if (!r.error) {
      Object.assign(rawValues, r.rawValues);
      fetchedUrl = fetchedUrl ?? r.fetchedUrl;
      methodsUsed.push("C");
    }
  }
  if (typeof spec.algorithm === "function") {
    const r = await runMethodB(spec);
    if (!r.error) {
      Object.assign(rawValues, r.rawValues);
      methodMeta = r.methodMeta;
      methodsUsed.push("B");
    }
  }

  if (Object.keys(rawValues).length === 0) {
    return { name, tier: "C", reason: "no-values-from-any-method", spec: methodsUsed };
  }

  const oklch = {};
  for (const [key, value] of Object.entries(rawValues)) {
    const ok = toCanonicalOklch(value);
    if (ok) oklch[key] = ok;
  }

  let base;
  let mappingNotes;
  try {
    const mapped = spec.map(oklch, rawValues);
    base = mapped.base;
    mappingNotes = mapped.notes ?? null;
  } catch (err) {
    return { name, tier: "C", reason: `mapping-error: ${err.message}` };
  }

  // Verify semantic refs still resolve against new base
  const source = await loadSource(name);
  const requiredFamilies = new Set();
  for (const value of Object.values(source.semantic ?? {})) {
    const m = /\{([^}]+)\}/.exec(value);
    if (m) {
      const ref = m[1];
      const parts = ref.split(".");
      const family = parts[parts[0] === "color" ? 1 : 0];
      requiredFamilies.add(family);
    }
  }
  const missingFamilies = [];
  for (const fam of requiredFamilies) {
    if (!base[fam]) missingFamilies.push(fam);
  }

  const tier =
    missingFamilies.length === 0 && (mappingNotes ?? "").length === 0 ? "A" : "B";

  // Build harvest-notes including method meta
  const baseNotes = spec.harvestNotes ?? source.attribution.harvestNotes ?? "";
  const methodNote = methodsUsed.length
    ? `Extraction method: ${methodsUsed.join("+")}.`
    : "";
  const algoNote = methodMeta
    ? `Algorithm: ${methodMeta.library}@${methodMeta.version}, inputs ${JSON.stringify(methodMeta.inputs)}.`
    : "";
  const mappingPart = mappingNotes ? `Mapping: ${mappingNotes}` : "";
  const notes = [baseNotes, methodNote, algoNote, mappingPart].filter(Boolean).join(" ");

  const updated = {
    ...source,
    base,
    attribution: {
      ...source.attribution,
      sourceUrl: fetchedUrl ?? source.attribution.sourceUrl,
      sourceCommit: spec.fetch?.commit ?? methodMeta?.version ?? "main",
      harvestedAt: TODAY,
      fidelityTier: tier,
      harvestNotes: notes
    }
  };

  await saveSource(name, updated);

  return {
    name,
    tier,
    url: fetchedUrl,
    methods: methodsUsed,
    valuesExtracted: Object.keys(rawValues).length,
    valuesConverted: Object.keys(oklch).length,
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
        ? `tier A — ${result.valuesExtracted} values (method ${result.methods.join("+")})`
        : result.tier === "B"
          ? `tier B — ${result.valuesExtracted} values, ${result.missingFamilies?.length ?? 0} missing families (method ${result.methods.join("+")})`
          : `tier C — ${result.reason}`;
    console.log(`${result.name.padEnd(20)} ${summary}`);
  }

  const reportPath = path.join(__dirname, "extract-report.json");
  await fs.writeFile(
    reportPath,
    JSON.stringify({ ranAt: TODAY, results }, null, 2) + "\n"
  );
  console.log(`\n${results.length} packs processed. Report: ${reportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
