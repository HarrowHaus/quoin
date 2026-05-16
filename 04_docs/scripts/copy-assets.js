#!/usr/bin/env node
/**
 * Copy the active token-pack stylesheet and the Tailwind shim into
 * 04_docs/public/ so they're served at /tokens.css and /impl.css.
 *
 * The active pack for the docs site is hard-coded here; changing it
 * later is a one-line edit. Phase 5 might switch to a build-time arg
 * or a config file.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const labRoot = path.resolve(here, "..", "..");
const publicDir = path.resolve(here, "..", "public");

// Active pack for the docs site. "baseline" lives at
// 02_reference-packs/tokens-baseline; any harvested pack lives at
// 03_harvest/packs/tokens-{name}. The path resolver below handles both.
const ACTIVE_TOKEN_PACK = "tokens-geist";
const tokensCssSrc = (await resolveActivePack(ACTIVE_TOKEN_PACK));
const shimCssSrc = path.join(labRoot, "02_reference-packs", "demos", "shared", "tailwind-shim.css");

async function resolveActivePack(name) {
  const candidates = [
    path.join(labRoot, "02_reference-packs", name, "tokens.css"),
    path.join(labRoot, "03_harvest", "packs", name, "tokens.css")
  ];
  for (const c of candidates) {
    try {
      await fs.access(c);
      return c;
    } catch {}
  }
  throw new Error(`tokens.css not found for active pack "${name}"`);
}

await fs.mkdir(publicDir, { recursive: true });
await fs.copyFile(tokensCssSrc, path.join(publicDir, "tokens.css"));
await fs.copyFile(shimCssSrc, path.join(publicDir, "impl.css"));
console.log(`copied tokens.css + impl.css from ${ACTIVE_TOKEN_PACK} -> 04_docs/public/`);
