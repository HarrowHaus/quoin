#!/usr/bin/env node
/**
 * For every token source that hasn't received a fidelity extraction
 * (no fidelityTier set in attribution), stamp it with `fidelityTier:
 * "C"` and a note explaining that values are designed approximations
 * pending byte-faithful extraction in a Phase 3.5b follow-up.
 *
 * Idempotent: never overwrites an existing fidelityTier.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCES_DIR = path.resolve(__dirname, "..", "sources");

async function main() {
  const files = (await fs.readdir(SOURCES_DIR))
    .filter((f) => f.endsWith(".json"));
  let touched = 0;
  for (const file of files) {
    const filepath = path.join(SOURCES_DIR, file);
    const raw = await fs.readFile(filepath, "utf8");
    const source = JSON.parse(raw);
    if (source.attribution?.fidelityTier) continue;
    source.attribution = source.attribution ?? {};
    source.attribution.fidelityTier = "C";
    source.attribution.harvestNotes =
      (source.attribution.harvestNotes ?? "") +
      (source.attribution.harvestNotes ? "\n\n" : "") +
      "Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.";
    await fs.writeFile(filepath, JSON.stringify(source, null, 2) + "\n");
    touched++;
    console.log(`tier C  ${source.name}`);
  }
  console.log(`\n${touched} sources annotated as Tier C.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
