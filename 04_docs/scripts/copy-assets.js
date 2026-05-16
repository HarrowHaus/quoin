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

const ACTIVE_TOKEN_PACK = "tokens-baseline"; // change here to re-skin the docs site
const tokensCssSrc = path.join(labRoot, "02_reference-packs", ACTIVE_TOKEN_PACK, "tokens.css");
const shimCssSrc = path.join(labRoot, "02_reference-packs", "demos", "shared", "tailwind-shim.css");

await fs.mkdir(publicDir, { recursive: true });
await fs.copyFile(tokensCssSrc, path.join(publicDir, "tokens.css"));
await fs.copyFile(shimCssSrc, path.join(publicDir, "impl.css"));
console.log(`copied tokens.css + impl.css from ${ACTIVE_TOKEN_PACK} -> 04_docs/public/`);
