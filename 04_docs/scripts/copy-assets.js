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

// 2.5 Phase 0.5 transitional compatibility layer.
//     (Disabled after Phase 3.5c — tokens-geist now ships the full
//     v1.0 namespace. Keeping the block here as documentation of how
//     a project-local pack can re-declare canonical names if needed.)
const compatLayer = "";
void `
/* ---- Phase 0.5 transitional compat (until 3.5c fills tokens-geist) ---- */
:root {
  --type-size-md: var(--type-size-base, 1rem);
  --type-size-4xl: var(--type-size-3xl, 2.25rem);
  --type-size-5xl: 3rem;
  --space-5:  1.25rem;
  --space-10: 2.5rem;
  --space-20: 5rem;
  --space-inline-loose: 1rem;
  --radius-xl: 1rem;
  --border-width-hairline: 0.5px;
  --border-width-sm: 1px;
  --border-width-md: 2px;
  --border-width-lg: 4px;
  --focus-ring-width:  2px;
  --focus-ring-offset: 2px;
  --focus-ring: var(--accent);
  --link:         var(--accent);
  --link-visited: var(--text-recede);
  --link-hover:   var(--text-emphasis);
  --shadow-tint:  oklch(0% 0 0 / 0.1);
  --scrim:        oklch(0% 0 0 / 0.5);
  --highlight:    oklch(88% 0.16 90);
  --icon-size-xs: 0.75rem;
  --icon-size-sm: 1rem;
  --icon-size-md: 1.25rem;
  --icon-size-lg: 1.5rem;
  --icon-size-xl: 2rem;
  --container-narrow:  40rem;
  --container-default: 64rem;
  --container-wide:    80rem;
  --container-full:    100%;
  --blur-sm: 4px;
  --blur-md: 12px;
  --blur-lg: 24px;
  --opacity-disabled:     0.38;
  --opacity-recede:       0.6;
  --opacity-hover-layer:  0.08;
  --opacity-active-layer: 0.12;
  --opacity-scrim:        0.5;
  --z-base: 0; --z-raised: 1; --z-sticky: 100; --z-dropdown: 1000;
  --z-modal: 2000; --z-popover: 3000; --z-tooltip: 4000; --z-toast: 5000;
  --aspect-square: 1.0; --aspect-video: 1.7778;
  --aspect-portrait: 0.75; --aspect-banner: 3.0;
  --font-weight-light: 300; --font-weight-regular: 400;
  --font-weight-medium: 500; --font-weight-semibold: 600;
  --font-weight-bold: 700; --font-weight-black: 900;
  --motion-instant: 50ms; --motion-slower: 800ms;
  --ease-linear: cubic-bezier(0,0,1,1);
  --ease-emphasized: cubic-bezier(0.2,0,0,1);
  --ease-spring: cubic-bezier(0.5,1.5,0.5,1);
  --shadow-xs: 0 1px 2px var(--shadow-tint);
  --shadow-sm: 0 1px 3px var(--shadow-tint);
  --shadow-md: 0 4px 6px -1px var(--shadow-tint), 0 2px 4px -1px var(--shadow-tint);
  --shadow-lg: 0 10px 15px -3px var(--shadow-tint), 0 4px 6px -2px var(--shadow-tint);
  --shadow-xl: 0 20px 25px -5px var(--shadow-tint), 0 8px 10px -6px var(--shadow-tint);
  --shadow-2xl: 0 25px 50px -12px var(--shadow-tint);
  --shadow-inner: inset 0 2px 4px var(--shadow-tint);
  --border-default:          var(--border-width-sm) solid var(--border);
  --border-emphasis-stroke:  var(--border-width-md) solid var(--border-emphasis);
  --border-divider:          var(--border-width-sm) solid var(--border-recede);
  --text-display:      var(--font-weight-bold) var(--type-size-display)/var(--leading-tight) var(--font-display);
  --text-headline-lg:  var(--font-weight-bold) var(--type-size-5xl)/var(--leading-tight) var(--font-display);
  --text-headline-md:  var(--font-weight-bold) var(--type-size-4xl)/var(--leading-tight) var(--font-display);
  --text-headline-sm:  var(--font-weight-semibold) var(--type-size-3xl)/var(--leading-tight) var(--font-display);
  --text-title-lg:     var(--font-weight-semibold) var(--type-size-2xl)/var(--leading-normal) var(--font-sans);
  --text-title-md:     var(--font-weight-semibold) var(--type-size-xl)/var(--leading-normal) var(--font-sans);
  --text-title-sm:     var(--font-weight-medium)   var(--type-size-lg)/var(--leading-normal) var(--font-sans);
  --text-body-lg:      var(--font-weight-regular)  var(--type-size-lg)/var(--leading-prose) var(--font-sans);
  --text-body-md:      var(--font-weight-regular)  var(--type-size-md)/var(--leading-prose) var(--font-sans);
  --text-body-sm:      var(--font-weight-regular)  var(--type-size-sm)/var(--leading-prose) var(--font-sans);
  --text-label-lg:     var(--font-weight-medium)   var(--type-size-md)/var(--leading-normal) var(--font-sans);
  --text-label-md:     var(--font-weight-medium)   var(--type-size-sm)/var(--leading-normal) var(--font-sans);
  --text-label-sm:     var(--font-weight-medium)   var(--type-size-xs)/var(--leading-normal) var(--font-sans);
  --transition-default:  all var(--motion-normal) var(--ease-standard);
  --transition-emphasis: all var(--motion-slow)   var(--ease-emphasized);
  --transition-fast:     all var(--motion-fast)   var(--ease-standard);
  --stroke-solid:  solid;
  --stroke-dashed: dashed;
  --stroke-dotted: dotted;
}
`;
// end of disabled compat-layer documentation block

await fs.writeFile(
  path.join(publicDir, "tokens.css"),
  `${baseCss}\n/* ---- 04_docs project-local override (quoin.tokens.json) ---- */\n${overrideCss}${compatLayer}`
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
