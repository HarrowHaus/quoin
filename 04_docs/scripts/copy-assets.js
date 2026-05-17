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

// 1. Base token pack -> tokens.css (the pack's :root variables).
const baseCss = await fs.readFile(tokensCssSrc, "utf8");

// 2. Append the project override layer from quoin.tokens.json so the
//    CSS layer matches what the Quoin compiler resolved at build time.
const overridesRaw = JSON.parse(
  await fs.readFile(path.resolve(here, "..", "quoin.tokens.json"), "utf8")
);
const overrideLines = [":root {"];
for (const [k, v] of Object.entries(overridesRaw)) {
  if (k.startsWith("$")) continue;
  if (v && typeof v === "object" && typeof v.$value === "string") {
    overrideLines.push(`  --${k}: ${v.$value};`);
  }
}
overrideLines.push("}", "");
const overrideCss = overrideLines.join("\n");

await fs.writeFile(
  path.join(publicDir, "tokens.css"),
  `${baseCss}\n/* ---- 04_docs project-local override (quoin.tokens.json) ---- */\n${overrideCss}`
);
// 3. Concatenate the lab Tailwind shim + the impl-tailwind companion
//    (Phase 5a polish: hover/focus/motion/microinteractions). In a real
//    project with Tailwind installed, the user just links companion.css
//    after their Tailwind build. The shim is the lab stand-in.
const companionCssSrc = path.join(
  labRoot,
  "02_reference-packs",
  "impl-tailwind",
  "companion.css"
);
const shimCss = await fs.readFile(shimCssSrc, "utf8");
const companionCss = await fs.readFile(companionCssSrc, "utf8");
await fs.writeFile(
  path.join(publicDir, "impl.css"),
  `${shimCss}\n/* ---- @quoin/impl-tailwind companion (Phase 5a polish) ---- */\n${companionCss}`
);
// 4. Copy companion.js as a side-effect ESM module loaded by every
//    docs page. Hosts the Phase 5c interactive behaviors — tab-panels
//    keyboard nav, disclosure animations, modal triggers, command-menu
//    Cmd-K. Pure DOM, no dependencies.
const companionJsSrc = path.join(
  labRoot,
  "02_reference-packs",
  "impl-tailwind",
  "companion.js"
);
await fs.copyFile(companionJsSrc, path.join(publicDir, "impl.js"));

console.log(
  `copied tokens.css (${ACTIVE_TOKEN_PACK} + project overrides) + impl.css (shim + companion css) + impl.js (companion js) -> 04_docs/public/`
);
