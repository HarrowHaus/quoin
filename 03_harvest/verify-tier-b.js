#!/usr/bin/env node
/**
 * Tier-B token verification.
 *
 * For each of the 17 Tier-B token packs, fetches the canonical
 * upstream source (a JSON / TS / SCSS / YAML / JS file in each
 * system's open-source repo), saves the raw payload to
 * verify-tier-b/canonical/, extracts the colour values it can find,
 * and writes a side-by-side report at verify-tier-b/REPORT.md
 * comparing the canonical values against what each pack currently
 * ships in its tokens.css.
 *
 * Realistic outcome: 17 sources × 17 different formats. The fetcher
 * is universal; the value extractor uses a heuristic regex that picks
 * up hex / hsl / rgb / oklch values regardless of file format. The
 * extraction is best-effort — the report links the canonical raw for
 * manual verification when the extraction is partial.
 *
 * Run:  node 03_harvest/verify-tier-b.js
 * Read: 03_harvest/verify-tier-b/REPORT.md
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "verify-tier-b");
const CANON_DIR = path.join(OUT_DIR, "canonical");
const PACKS_DIR = path.join(__dirname, "packs");

const SOURCES = [
  {
    name: "material3",
    label: "Material Design 3",
    urls: [
      "https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/palettes/core_palette.ts"
    ]
  },
  {
    name: "carbon",
    label: "IBM Carbon",
    urls: [
      "https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/themes/src/white.js",
      "https://raw.githubusercontent.com/carbon-design-system/carbon/main/packages/themes/src/g10.js"
    ]
  },
  {
    name: "polaris",
    label: "Shopify Polaris",
    urls: [
      "https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/light/color.ts"
    ]
  },
  {
    name: "fluent",
    label: "Microsoft Fluent 2",
    urls: [
      "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/colors.ts"
    ]
  },
  {
    name: "atlassian",
    label: "Atlassian Design System",
    urls: [
      "https://raw.githubusercontent.com/atlassian/design-system/main/design-system/tokens/src/artifacts/palettes/default-palette.tsx"
    ]
  },
  {
    name: "spectrum",
    label: "Adobe Spectrum",
    urls: [
      "https://raw.githubusercontent.com/adobe/spectrum-tokens/main/packages/tokens/src/color-palette.json"
    ]
  },
  {
    name: "lightning",
    label: "Salesforce Lightning",
    urls: [
      "https://raw.githubusercontent.com/salesforce-ux/design-system/master/design-tokens/aliases/color-text.yml"
    ]
  },
  {
    name: "paste",
    label: "Twilio Paste",
    urls: [
      "https://raw.githubusercontent.com/twilio-labs/paste/main/packages/paste-design-tokens/tokens/global/color.yml"
    ]
  },
  {
    name: "gestalt",
    label: "Pinterest Gestalt",
    urls: [
      "https://raw.githubusercontent.com/pinterest/gestalt/master/packages/gestalt-design-tokens/data/tokens/color-palette.json"
    ]
  },
  {
    name: "elastic",
    label: "Elastic EUI",
    urls: [
      "https://raw.githubusercontent.com/elastic/eui/main/packages/eui-theme-borealis/src/variables/colors/_colors_light.scss"
    ]
  },
  {
    name: "evergreen",
    label: "Segment Evergreen",
    urls: [
      "https://raw.githubusercontent.com/segmentio/evergreen/master/src/themes/default-theme/colors.js"
    ]
  },
  {
    name: "orbit",
    label: "Kiwi.com Orbit",
    urls: [
      "https://raw.githubusercontent.com/kiwicom/orbit/master/packages/orbit-design-tokens/src/foundation.ts"
    ]
  },
  {
    name: "clarity",
    label: "VMware Clarity",
    urls: [
      "https://raw.githubusercontent.com/vmware-clarity/core/main/projects/core/src/styles/tokens/_colors.scss"
    ]
  },
  {
    name: "base-web",
    label: "Uber Base Web",
    urls: [
      "https://raw.githubusercontent.com/uber/baseweb/main/src/themes/light-theme/color-tokens.js"
    ]
  },
  {
    name: "workday",
    label: "Workday Canvas Kit",
    urls: [
      "https://raw.githubusercontent.com/Workday/canvas-kit/master/modules/tokens/lib/colors.ts"
    ]
  },
  {
    name: "mui",
    label: "Material UI",
    urls: [
      "https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/styles/createPalette.js"
    ]
  },
  {
    name: "heroui",
    label: "HeroUI",
    urls: [
      "https://raw.githubusercontent.com/heroui-inc/heroui/main/packages/core/theme/src/colors/semantic.ts"
    ]
  }
];

async function main() {
  await fs.mkdir(CANON_DIR, { recursive: true });
  const results = [];

  for (const source of SOURCES) {
    let raw = null;
    let urlUsed = null;
    let status = "fetch-failed";
    for (const url of source.urls) {
      try {
        const resp = await fetch(url, {
          headers: { "User-Agent": "quoin-harvest-verifier/0.1" }
        });
        if (!resp.ok) continue;
        raw = await resp.text();
        urlUsed = url;
        status = "fetched";
        break;
      } catch {
        // try next URL
      }
    }
    if (raw) {
      await fs.writeFile(
        path.join(CANON_DIR, `${source.name}.txt`),
        `<!-- fetched from ${urlUsed} -->\n${raw}`
      );
    }
    const canonicalValues = raw ? extractColors(raw) : [];
    const shippedValues = await extractShipped(source.name);
    results.push({
      ...source,
      status,
      urlUsed,
      bytes: raw ? raw.length : 0,
      canonicalValues,
      shippedValues
    });
    console.log(`${status === "fetched" ? "ok  " : "fail"}  ${source.name}: ${raw ? raw.length + " bytes" : "no fetch"}`);
  }

  const report = renderReport(results);
  await fs.writeFile(path.join(OUT_DIR, "REPORT.md"), report);
  console.log(`\nReport: ${path.join(OUT_DIR, "REPORT.md")}`);
}

const COLOR_REGEX =
  /#[0-9a-fA-F]{3,8}\b|oklch\([^)]+\)|hsl[a]?\([^)]+\)|rgb[a]?\([^)]+\)/g;

function extractColors(text) {
  const matches = text.match(COLOR_REGEX) ?? [];
  // De-dupe but keep order.
  const seen = new Set();
  const out = [];
  for (const m of matches) {
    if (seen.has(m)) continue;
    seen.add(m);
    out.push(m);
    if (out.length >= 20) break;
  }
  return out;
}

async function extractShipped(packName) {
  const cssPath = path.join(PACKS_DIR, `tokens-${packName}`, "tokens.css");
  try {
    const css = await fs.readFile(cssPath, "utf8");
    return extractColors(css);
  } catch {
    return [];
  }
}

function renderReport(results) {
  const ok = results.filter((r) => r.status === "fetched").length;
  const fetchFailed = results.filter((r) => r.status !== "fetched").length;

  const sections = results
    .map((r) => {
      const rows = Math.max(r.canonicalValues.length, r.shippedValues.length);
      const rowsMd = [];
      for (let i = 0; i < rows; i++) {
        const c = r.canonicalValues[i] ?? "";
        const s = r.shippedValues[i] ?? "";
        rowsMd.push(`| ${i + 1} | \`${escapeCell(c)}\` | \`${escapeCell(s)}\` |`);
      }
      return `### ${r.label} — \`tokens-${r.name}\`

**Source:** ${r.urlUsed ? `[${r.urlUsed}](${r.urlUsed})` : "_(fetch failed)_"}
**Status:** ${r.status}${r.bytes ? ` (${r.bytes} bytes fetched)` : ""}

${
  r.status === "fetched"
    ? `Canonical raw saved to \`canonical/${r.name}.txt\`. First 20 colour-shaped tokens extracted from each side:

| # | Canonical | Shipped |
|--:|-----------|---------|
${rowsMd.length > 0 ? rowsMd.join("\n") : "| _no values extracted_ |"}

`
    : `**Cannot auto-verify.** The fetch failed — likely the canonical source has been restructured or moved since this verifier was written. The shipped pack remains valid; manual verification recommended before npm publication.

`
}`;
    })
    .join("\n");

  return `# Tier-B token verification

Generated by \`03_harvest/verify-tier-b.js\`. Fetches each Tier-B pack's
canonical upstream source and extracts colour values to compare
against what we ship. The extraction is **best-effort** — sources use
17 different file formats; the same regex pulls colour-shaped tokens
out of all of them.

## Summary

| Status | Count |
|--------|------:|
| Auto-fetch succeeded | ${ok} |
| Fetch failed (manual ask) | ${fetchFailed} |
| **Total Tier-B packs** | **${results.length}** |

## How to read this

For each pack:
- **Canonical** column shows the first 20 colour-shaped tokens found
  in the upstream source file.
- **Shipped** column shows the first 20 colour-shaped tokens found in
  our pack's \`tokens.css\`.

Order does **not** correspond 1:1 between columns — both lists are
just "colour values in source order." Look for:
- The same dominant accent / neutral hue in both columns.
- Approximate parity in lightness range (i.e. the lightest values in
  one column are close to the lightest in the other).
- No obvious palette swap (e.g. shipped is blue-accented but canonical
  is red — would indicate a wrong mapping).

If a pack looks off, open
\`canonical/<name>.txt\` (the saved raw upstream) alongside the
pack's \`tokens.css\` for a full side-by-side.

## Per-pack details

${sections}

## Cross-references

- Phase 3 charter: [\`README.md\`](../README.md).
- Harvest report: [\`REPORT.md\`](../REPORT.md) — Tier-A vs Tier-B
  classification table.
- Operator-side smoke gallery: [\`smoke-gallery/dist/index.html\`](../smoke-gallery/dist/index.html).
`;
}

function escapeCell(s) {
  return String(s).replaceAll("|", "\\|").replaceAll("`", "");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
