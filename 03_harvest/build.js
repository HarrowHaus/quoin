#!/usr/bin/env node
/**
 * Harvest pack builder.
 *
 * Reads per-system source configs from 03_harvest/sources/*.json and
 * generates complete Quoin packs in 03_harvest/packs/<name>/.
 *
 * Each generated pack contains:
 *   - quoin.pack.json (manifest with attribution)
 *   - package.json
 *   - README.md (attribution + mapping notes)
 *   - LICENSE (matching the source license)
 *   - tokens/index.json (DTCG, fully fills the canonical namespace)
 *   - tokens.css (the same tokens emitted as CSS custom properties)
 *
 * Run from anywhere:  node 03_harvest/build.js
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = path.join(__dirname, "sources");
const PACK_DIR = path.join(__dirname, "packs");
const LICENSES_DIR = path.join(__dirname, "licenses");

const REQUIRED_SEMANTIC_TOKENS = [
  // surface
  "surface", "surface-elevated", "surface-recessed", "surface-inverse",
  // text
  "text", "text-emphasis", "text-recede", "text-disabled",
  "text-on-accent", "text-on-critical", "text-on-success", "text-on-warning", "text-on-info",
  // border
  "border", "border-emphasis", "border-recede",
  // accent + status
  "accent", "accent-recede", "critical", "success", "warning", "info",
  // typography
  "font-sans", "font-serif", "font-mono", "font-display",
  "type-size-xs", "type-size-sm", "type-size-base", "type-size-lg",
  "type-size-xl", "type-size-2xl", "type-size-3xl", "type-size-display",
  "leading-tight", "leading-normal", "leading-prose", "leading-loose",
  "tracking-tight", "tracking-normal", "tracking-wide",
  "measure-prose",
  // spacing
  "space-0", "space-1", "space-2", "space-3", "space-4", "space-6",
  "space-8", "space-12", "space-16", "space-24", "space-32",
  "space-stack-compact", "space-stack-normal", "space-stack-loose",
  "space-inline-tight", "space-inline-normal",
  "space-card", "space-panel", "space-frame",
  // radius
  "radius-none", "radius-sm", "radius-md", "radius-lg",
  "radius-pill", "radius-card", "radius-frame", "radius-media",
  // motion
  "motion-fast", "motion-normal", "motion-slow",
  "ease-standard", "ease-decelerate", "ease-accelerate"
];

const DEFAULT_TYPE = {
  "type-size-xs": "0.75rem",
  "type-size-sm": "0.875rem",
  "type-size-base": "1rem",
  "type-size-lg": "1.125rem",
  "type-size-xl": "1.25rem",
  "type-size-2xl": "1.5rem",
  "type-size-3xl": "1.875rem",
  "type-size-display": "4.5rem",
  "leading-tight": "1.15",
  "leading-normal": "1.4",
  "leading-prose": "1.6",
  "leading-loose": "1.9",
  "tracking-tight": "-0.02em",
  "tracking-normal": "0em",
  "tracking-wide": "0.05em",
  "measure-prose": "65ch"
};

const DEFAULT_SPACING = {
  "space-0": "0",
  "space-1": "0.25rem",
  "space-2": "0.5rem",
  "space-3": "0.75rem",
  "space-4": "1rem",
  "space-6": "1.5rem",
  "space-8": "2rem",
  "space-12": "3rem",
  "space-16": "4rem",
  "space-24": "6rem",
  "space-32": "8rem",
  "space-stack-compact": "0.5rem",
  "space-stack-normal": "1rem",
  "space-stack-loose": "2rem",
  "space-inline-tight": "0.25rem",
  "space-inline-normal": "0.5rem",
  "space-card": "1.5rem",
  "space-panel": "1.5rem",
  "space-frame": "1rem"
};

const DEFAULT_RADIUS = {
  "radius-none": "0",
  "radius-sm": "0.125rem",
  "radius-md": "0.375rem",
  "radius-lg": "0.5rem",
  "radius-pill": "9999px",
  "radius-card": "0.5rem",
  "radius-frame": "0.25rem",
  "radius-media": "0.25rem"
};

const DEFAULT_MOTION = {
  "motion-fast": "120ms",
  "motion-normal": "200ms",
  "motion-slow": "320ms",
  "ease-standard": "cubic-bezier(0.4, 0, 0.2, 1)",
  "ease-decelerate": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-accelerate": "cubic-bezier(0.4, 0, 1, 1)"
};

const DEFAULT_FONTS = {
  "font-sans": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  "font-serif": "ui-serif, Georgia, 'Times New Roman', serif",
  "font-mono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  "font-display": "ui-serif, Georgia, 'Times New Roman', serif"
};

async function buildPack(source) {
  const dir = path.join(PACK_DIR, `tokens-${source.name}`);
  await fs.mkdir(path.join(dir, "tokens"), { recursive: true });

  const baseTokens = buildBaseTokens(source.base ?? {});
  const semanticTokens = buildSemanticTokens(source);
  const dtcg = mergeDtcg(baseTokens, semanticTokens);

  await fs.writeFile(
    path.join(dir, "tokens", "index.json"),
    JSON.stringify(dtcg, null, 2) + "\n"
  );
  await fs.writeFile(path.join(dir, "tokens.css"), buildCss(source, baseTokens, semanticTokens));
  await fs.writeFile(path.join(dir, "quoin.pack.json"), buildManifest(source));
  await fs.writeFile(path.join(dir, "package.json"), buildPackageJson(source));
  await fs.writeFile(path.join(dir, "README.md"), buildReadme(source));
  await fs.writeFile(path.join(dir, "LICENSE"), await loadLicense(source.license));
}

/**
 * Base palette is always nested under a top-level `color` group. This
 * prevents collision with semantic token names (semantic `warning`
 * would otherwise overwrite a base group also called `warning`).
 */
function buildBaseTokens(base) {
  const out = { color: {} };
  for (const [group, entries] of Object.entries(base)) {
    out.color[group] = {};
    for (const [name, value] of Object.entries(entries)) {
      out.color[group][name] = { $value: value, $type: inferType(value) };
    }
  }
  return out;
}

function inferType(value) {
  if (/^(oklch|rgb|hsl|#)/.test(value)) return "color";
  if (/^cubic-bezier\(/.test(value)) return "cubicBezier";
  if (/ms$|s$/.test(value)) return "duration";
  return "dimension";
}

/**
 * Build the semantic-token block. References in source configs of the
 * form `{family.step}` are auto-prefixed to `{color.family.step}` so
 * they resolve against the namespaced base palette.
 */
function buildSemanticTokens(source) {
  const out = {};
  const sem = source.semantic ?? {};
  const apply = (map) => {
    for (const [k, v] of Object.entries(map)) {
      const value = sem[k] ?? v;
      out[k] = { $value: value, $type: inferTypeFromName(k) };
    }
  };
  apply(DEFAULT_TYPE);
  apply(DEFAULT_SPACING);
  apply(DEFAULT_RADIUS);
  apply(DEFAULT_MOTION);
  const fonts = { ...DEFAULT_FONTS, ...(source.fonts ?? {}) };
  for (const [k, v] of Object.entries(fonts)) {
    out[k] = { $value: v, $type: "fontFamily" };
  }
  for (const name of [
    "surface", "surface-elevated", "surface-recessed", "surface-inverse",
    "text", "text-emphasis", "text-recede", "text-disabled",
    "text-on-accent", "text-on-critical", "text-on-success", "text-on-warning", "text-on-info",
    "border", "border-emphasis", "border-recede",
    "accent", "accent-recede", "critical", "success", "warning", "info"
  ]) {
    if (sem[name] === undefined) {
      throw new Error(`${source.name}: missing semantic token "${name}"`);
    }
    out[name] = { $value: normaliseRef(sem[name]), $type: "color" };
  }
  return out;
}

function normaliseRef(value) {
  return value.replace(/\{([^}]+)\}/g, (m, ref) => {
    return ref.startsWith("color.") ? m : `{color.${ref}}`;
  });
}

function inferTypeFromName(name) {
  if (name.startsWith("type-size") || name === "measure-prose" || name.startsWith("tracking")) return "dimension";
  if (name.startsWith("leading")) return "number";
  if (name.startsWith("space") || name.startsWith("radius")) return "dimension";
  if (name.startsWith("motion")) return "duration";
  if (name.startsWith("ease")) return "cubicBezier";
  return "dimension";
}

function mergeDtcg(base, semantic) {
  return {
    $schema: "https://design-tokens.github.io/community-group/format/",
    ...base,
    ...semantic
  };
}

function buildCss(source, baseTokens, semanticTokens) {
  const lines = [
    `/**`,
    ` * @quoin/tokens-${source.name} — CSS custom property export.`,
    ` *`,
    ` * Generated from tokens/index.json. Harvested from ${source.attribution.sourceSystem}.`,
    ` * See README.md for attribution and mapping notes.`,
    ` */`,
    ``,
    `:root {`,
    `  /* base palette */`
  ];
  // baseTokens is { color: { group: { step: { $value } } } }
  for (const [familyName, family] of Object.entries(baseTokens.color)) {
    for (const [step, entry] of Object.entries(family)) {
      lines.push(`  --color-${familyName}-${step}: ${entry.$value};`);
    }
  }
  lines.push(``, `  /* semantic */`);
  for (const [name, entry] of Object.entries(semanticTokens)) {
    let value = entry.$value;
    value = value.replace(/\{([^}]+)\}/g, (_, ref) => {
      // Accept both legacy short form ({family.step}) and namespaced
      // ({color.family.step}); always emit the namespaced CSS var.
      const parts = ref.startsWith("color.") ? ref.split(".") : ["color", ...ref.split(".")];
      return `var(--${parts.join("-")})`;
    });
    lines.push(`  --${name}: ${value};`);
  }
  lines.push(`}`, ``);
  return lines.join("\n");
}

function buildManifest(source) {
  const manifest = {
    $schema: "https://harrow.haus/quoin/schema/pack.json",
    name: `@quoin/tokens-${source.name}`,
    version: "0.1.0",
    type: "token",
    quoinVersion: "^0.1.0",
    description: source.description,
    exports: { tokens: "./tokens/index.json", css: "./tokens.css" },
    metadata: {
      author: "Quoin",
      license: source.license,
      homepage: `https://harrow.haus/quoin/packs/tokens-${source.name}`,
      tags: source.tags ?? []
    },
    attribution: source.attribution
  };
  return JSON.stringify(manifest, null, 2) + "\n";
}

function buildPackageJson(source) {
  const pkg = {
    name: `@quoin/tokens-${source.name}`,
    version: "0.1.0",
    description: source.description,
    license: source.license,
    main: "./tokens/index.json",
    files: ["quoin.pack.json", "tokens/", "tokens.css", "README.md", "LICENSE"],
    keywords: ["quoin", "design-tokens", "dtcg", ...(source.tags ?? [])],
    repository: {
      type: "git",
      url: "https://github.com/harrowhaus/quoin.git",
      directory: `03_harvest/packs/tokens-${source.name}`
    }
  };
  return JSON.stringify(pkg, null, 2) + "\n";
}

function buildReadme(source) {
  const { attribution } = source;
  return [
    `# @quoin/tokens-${source.name}`,
    ``,
    `${source.description}`,
    ``,
    `## Attribution`,
    ``,
    `- **Source system:** ${attribution.sourceSystem}`,
    attribution.sourceOrganization
      ? `- **Source organisation:** ${attribution.sourceOrganization}`
      : null,
    attribution.sourceUrl ? `- **Source URL:** ${attribution.sourceUrl}` : null,
    `- **Source license:** ${attribution.sourceLicense}`,
    `- **Harvested:** ${attribution.harvestedAt}`,
    attribution.harvestNotes ? `- **Notes:** ${attribution.harvestNotes}` : null,
    ``,
    `## Mapping`,
    ``,
    source.mappingNotes ?? "Standard mapping onto the Quoin canonical semantic-token namespace; see `00_spec/tokens.md` §2.",
    ``,
    `## License`,
    ``,
    `This pack is published under **${source.license}**, compatible with the source license. See [LICENSE](./LICENSE).`,
    ``,
    `Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.`,
    ``,
    `## Cross-references`,
    ``,
    `- Spec: [\`00_spec/tokens.md\`](../../../00_spec/tokens.md) — canonical namespace.`,
    `- Pack format: [\`00_spec/pack-format.md\`](../../../00_spec/pack-format.md) — manifest schema.`,
    `- Harvest report: [\`03_harvest/REPORT.md\`](../../REPORT.md) — per-system decisions.`,
    ``
  ]
    .filter((l) => l !== null)
    .join("\n");
}

async function loadLicense(spdx) {
  const safe = spdx.replace(/[^A-Za-z0-9.-]/g, "_");
  const candidate = path.join(LICENSES_DIR, `${safe}.txt`);
  try {
    return await fs.readFile(candidate, "utf8");
  } catch {
    return `Licensed under ${spdx}. See https://spdx.org/licenses/${spdx}.html for the canonical license text.\n\nCopyright (c) 2026 Quoin\n`;
  }
}

async function buildVocabPack(source) {
  const dir = path.join(PACK_DIR, `vocab-${source.name}`);
  await fs.mkdir(path.join(dir, "primitives"), { recursive: true });
  await fs.writeFile(
    path.join(dir, "primitives", "index.json"),
    JSON.stringify(source.primitives, null, 2) + "\n"
  );
  const manifest = {
    $schema: "https://harrow.haus/quoin/schema/pack.json",
    name: `@quoin/vocab-${source.name}`,
    version: "0.1.0",
    type: "vocabulary",
    quoinVersion: "^0.1.0",
    description: source.description,
    exports: { primitives: "./primitives/index.json" },
    metadata: {
      author: "Quoin",
      license: source.license,
      homepage: `https://harrow.haus/quoin/packs/vocab-${source.name}`,
      tags: source.tags ?? []
    },
    attribution: source.attribution
  };
  await fs.writeFile(path.join(dir, "quoin.pack.json"), JSON.stringify(manifest, null, 2) + "\n");
  const pkg = {
    name: `@quoin/vocab-${source.name}`,
    version: "0.1.0",
    description: source.description,
    license: source.license,
    main: "./primitives/index.json",
    files: ["quoin.pack.json", "primitives/", "README.md", "LICENSE"],
    keywords: ["quoin", "vocabulary", ...(source.tags ?? [])],
    repository: {
      type: "git",
      url: "https://github.com/harrowhaus/quoin.git",
      directory: `03_harvest/packs/vocab-${source.name}`
    }
  };
  await fs.writeFile(path.join(dir, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
  await fs.writeFile(path.join(dir, "LICENSE"), await loadLicense(source.license));
  await fs.writeFile(path.join(dir, "README.md"), buildVocabReadme(source));
}

function buildVocabReadme(source) {
  const { attribution } = source;
  const rows = source.primitives
    .map((p) => `| \`<${p.name}>\` | ${p.role} |`)
    .join("\n");
  return [
    `# @quoin/vocab-${source.name}`,
    ``,
    source.description,
    ``,
    `## Primitives`,
    ``,
    `| Primitive | Role |`,
    `|-----------|------|`,
    rows,
    ``,
    `## Attribution`,
    ``,
    `- **Source:** ${attribution.sourceSystem}`,
    attribution.sourceOrganization ? `- **Organisation:** ${attribution.sourceOrganization}` : null,
    attribution.sourceUrl ? `- **URL:** ${attribution.sourceUrl}` : null,
    `- **License:** ${attribution.sourceLicense}`,
    `- **Harvested:** ${attribution.harvestedAt}`,
    attribution.harvestNotes ? `- **Notes:** ${attribution.harvestNotes}` : null,
    ``,
    `## Cross-references`,
    ``,
    `- Pack format: [\`00_spec/pack-format.md\`](../../../00_spec/pack-format.md) §5.`,
    `- Canonical primitives: [\`00_spec/primitives.md\`](../../../00_spec/primitives.md).`,
    ``
  ]
    .filter((l) => l !== null)
    .join("\n");
}

async function main() {
  await fs.mkdir(PACK_DIR, { recursive: true });
  const tokenConfigs = (await fs.readdir(SOURCE_DIR))
    .filter((e) => e.endsWith(".json"))
    .sort();
  let builtTokens = 0;
  for (const file of tokenConfigs) {
    const raw = await fs.readFile(path.join(SOURCE_DIR, file), "utf8");
    const source = JSON.parse(raw);
    try {
      await buildPack(source);
      builtTokens++;
      console.log(`built  tokens-${source.name}`);
    } catch (err) {
      console.error(`FAIL   tokens-${source.name}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  const vocabDir = path.join(SOURCE_DIR, "vocab");
  let builtVocab = 0;
  try {
    const vocabConfigs = (await fs.readdir(vocabDir))
      .filter((e) => e.endsWith(".json"))
      .sort();
    for (const file of vocabConfigs) {
      const raw = await fs.readFile(path.join(vocabDir, file), "utf8");
      const source = JSON.parse(raw);
      try {
        await buildVocabPack(source);
        builtVocab++;
        console.log(`built  vocab-${source.name}`);
      } catch (err) {
        console.error(`FAIL   vocab-${source.name}: ${err.message}`);
        process.exitCode = 1;
      }
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }

  console.log(`\n${builtTokens} token packs, ${builtVocab} vocab packs.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
