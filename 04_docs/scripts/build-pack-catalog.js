#!/usr/bin/env node
/**
 * Pack catalog generator.
 *
 * Scans 02_reference-packs/ and 03_harvest/packs/, reads each pack's
 * quoin.pack.json, and emits a single JSON catalog at
 * 04_docs/generated/packs.json consumed by the pack browser page and
 * the live playground.
 *
 * Phase 5 plan: switch this script to query the npm registry API for
 * @quoin/* packs once published. The shape of the emitted JSON stays
 * stable so the consumers don't change.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const labRoot = path.resolve(here, "..", "..");
const refDir = path.join(labRoot, "02_reference-packs");
const harvestDir = path.join(labRoot, "03_harvest", "packs");
const outDir = path.resolve(here, "..", "generated");

async function readManifest(dir) {
  try {
    const raw = await fs.readFile(path.join(dir, "quoin.pack.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function scanDir(rootDir, kind) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(rootDir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith(".") || entry.name === "demos") continue;
    const dir = path.join(rootDir, entry.name);
    const manifest = await readManifest(dir);
    if (!manifest) continue;
    out.push({
      name: manifest.name,
      version: manifest.version,
      type: manifest.type,
      description: manifest.description,
      license: manifest.metadata?.license ?? manifest.attribution?.sourceLicense ?? "MIT",
      tags: manifest.metadata?.tags ?? [],
      source: kind,
      attribution: manifest.attribution ?? null,
      dir: path.relative(labRoot, dir).split(path.sep).join("/")
    });
  }
  return out;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const reference = await scanDir(refDir, "reference");
  const harvest = await scanDir(harvestDir, "harvest");
  const all = [...reference, ...harvest].sort((a, b) => a.name.localeCompare(b.name));

  const catalog = {
    generatedAt: new Date().toISOString().slice(0, 10),
    source: "local-filesystem",
    note: "Catalog is populated from local 02_reference-packs/ + 03_harvest/packs/ until Phase 5 publishes packs to npm. After publication, build-pack-catalog.js queries the npm registry for @quoin/* and emits the same shape.",
    counts: {
      total: all.length,
      reference: reference.length,
      harvest: harvest.length,
      byType: {
        token: all.filter((p) => p.type === "token").length,
        vocabulary: all.filter((p) => p.type === "vocabulary").length,
        implementation: all.filter((p) => p.type === "implementation").length
      }
    },
    packs: all
  };

  await fs.writeFile(
    path.join(outDir, "packs.json"),
    JSON.stringify(catalog, null, 2)
  );
  console.log(`catalog: ${catalog.counts.total} packs (${catalog.counts.reference} reference + ${catalog.counts.harvest} harvest)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
