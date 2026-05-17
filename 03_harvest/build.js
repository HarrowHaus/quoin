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

/**
 * Defaults supplied by build.js for tokens that don't appear in
 * sources/<name>.json. A source can override any of these by adding
 * the key under `semantic` (atomic types) or `composites` (composite
 * types). Phase 3.5c uses these defaults to fill the ~100 new
 * canonical tokens that the Phase 0.5 namespace expansion added.
 */

const DEFAULT_TYPE = {
  "type-size-xs": "0.75rem",
  "type-size-sm": "0.875rem",
  "type-size-md": "1rem",
  "type-size-lg": "1.125rem",
  "type-size-xl": "1.25rem",
  "type-size-2xl": "1.5rem",
  "type-size-3xl": "1.875rem",
  "type-size-4xl": "2.25rem",
  "type-size-5xl": "3rem",
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
  "space-5": "1.25rem",
  "space-6": "1.5rem",
  "space-8": "2rem",
  "space-10": "2.5rem",
  "space-12": "3rem",
  "space-16": "4rem",
  "space-20": "5rem",
  "space-24": "6rem",
  "space-32": "8rem",
  "space-stack-compact": "0.5rem",
  "space-stack-normal": "1rem",
  "space-stack-loose": "2rem",
  "space-inline-tight": "0.25rem",
  "space-inline-normal": "0.5rem",
  "space-inline-loose": "1rem",
  "space-card": "1.5rem",
  "space-panel": "1.5rem",
  "space-frame": "1rem"
};

const DEFAULT_RADIUS = {
  "radius-none": "0",
  "radius-sm": "0.125rem",
  "radius-md": "0.375rem",
  "radius-lg": "0.5rem",
  "radius-xl": "1rem",
  "radius-pill": "9999px",
  "radius-card": "0.5rem",
  "radius-frame": "0.25rem",
  "radius-media": "0.25rem"
};

const DEFAULT_MOTION = {
  "motion-instant": "50ms",
  "motion-fast": "100ms",
  "motion-normal": "200ms",
  "motion-slow": "400ms",
  "motion-slower": "800ms",
  "ease-linear": "cubic-bezier(0, 0, 1, 1)",
  "ease-standard": "cubic-bezier(0.4, 0, 0.2, 1)",
  "ease-decelerate": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-accelerate": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-emphasized": "cubic-bezier(0.2, 0, 0, 1)",
  "ease-spring": "cubic-bezier(0.5, 1.5, 0.5, 1)"
};

const DEFAULT_FONTS = {
  "font-sans": "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  "font-serif": "ui-serif, Georgia, 'Times New Roman', serif",
  "font-mono": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  "font-display": "ui-serif, Georgia, 'Times New Roman', serif"
};

const DEFAULT_FONT_WEIGHTS = {
  "font-weight-light": "300",
  "font-weight-regular": "400",
  "font-weight-medium": "500",
  "font-weight-semibold": "600",
  "font-weight-bold": "700",
  "font-weight-black": "900"
};

const DEFAULT_BORDER_WIDTHS = {
  "border-width-hairline": "0.5px",
  "border-width-sm": "1px",
  "border-width-md": "2px",
  "border-width-lg": "4px"
};

const DEFAULT_FOCUS_RING = {
  "focus-ring-width": "2px",
  "focus-ring-offset": "2px"
};

const DEFAULT_ICON_SIZES = {
  "icon-size-xs": "0.75rem",
  "icon-size-sm": "1rem",
  "icon-size-md": "1.25rem",
  "icon-size-lg": "1.5rem",
  "icon-size-xl": "2rem"
};

const DEFAULT_CONTAINERS = {
  "container-narrow": "40rem",
  "container-default": "64rem",
  "container-wide": "80rem",
  "container-full": "100%"
};

const DEFAULT_BLUR = {
  "blur-sm": "4px",
  "blur-md": "12px",
  "blur-lg": "24px"
};

const DEFAULT_OPACITY = {
  "opacity-disabled": "0.38",
  "opacity-recede": "0.6",
  "opacity-hover-layer": "0.08",
  "opacity-active-layer": "0.12",
  "opacity-scrim": "0.5"
};

const DEFAULT_Z_INDEX = {
  "z-base": "0",
  "z-raised": "1",
  "z-sticky": "100",
  "z-dropdown": "1000",
  "z-modal": "2000",
  "z-popover": "3000",
  "z-tooltip": "4000",
  "z-toast": "5000"
};

const DEFAULT_ASPECT = {
  "aspect-square": "1.0",
  "aspect-video": "1.7778",
  "aspect-portrait": "0.75",
  "aspect-banner": "3.0"
};

const DEFAULT_STROKE = {
  "stroke-solid": "solid",
  "stroke-dotted": "dotted"
};

/**
 * Default focus/links/shadow-tint colors. Each entry is a string
 * containing either a literal color or a {ref} that resolves against
 * the active semantic block.
 */
const DEFAULT_NEW_COLORS = {
  "scrim": "oklch(0% 0 0 / 0.5)",
  "highlight": "oklch(88% 0.16 90)",
  "focus-ring": "{accent}",
  "link": "{accent}",
  "link-visited": "{text-recede}",
  "link-hover": "{text-emphasis}",
  "shadow-tint": "oklch(0% 0 0 / 0.1)"
};

/**
 * Default composite-token shapes. Each is a function taking the
 * source's semantic block and returning a DTCG-shaped composite
 * object. Sources can override via source.composites[<name>].
 */
const DEFAULT_COMPOSITES = {
  // §3.24 shadow
  "shadow-xs": () => ({
    color: "{shadow-tint}", offsetX: "0", offsetY: "1px",
    blur: "2px", spread: "0", inset: false
  }),
  "shadow-sm": () => ({
    color: "{shadow-tint}", offsetX: "0", offsetY: "1px",
    blur: "3px", spread: "0", inset: false
  }),
  "shadow-md": () => [
    { color: "{shadow-tint}", offsetX: "0", offsetY: "4px", blur: "6px", spread: "-1px", inset: false },
    { color: "{shadow-tint}", offsetX: "0", offsetY: "2px", blur: "4px", spread: "-1px", inset: false }
  ],
  "shadow-lg": () => [
    { color: "{shadow-tint}", offsetX: "0", offsetY: "10px", blur: "15px", spread: "-3px", inset: false },
    { color: "{shadow-tint}", offsetX: "0", offsetY: "4px",  blur: "6px",  spread: "-2px", inset: false }
  ],
  "shadow-xl": () => [
    { color: "{shadow-tint}", offsetX: "0", offsetY: "20px", blur: "25px", spread: "-5px", inset: false },
    { color: "{shadow-tint}", offsetX: "0", offsetY: "8px",  blur: "10px", spread: "-6px", inset: false }
  ],
  "shadow-2xl": () => ({
    color: "{shadow-tint}", offsetX: "0", offsetY: "25px",
    blur: "50px", spread: "-12px", inset: false
  }),
  "shadow-inner": () => ({
    color: "{shadow-tint}", offsetX: "0", offsetY: "2px",
    blur: "4px", spread: "0", inset: true
  }),
  // §3.25 border
  "border-default": () => ({ color: "{border}", width: "{border-width-sm}", style: "solid" }),
  "border-emphasis-stroke": () => ({ color: "{border-emphasis}", width: "{border-width-md}", style: "solid" }),
  "border-divider": () => ({ color: "{border-recede}", width: "{border-width-sm}", style: "solid" }),
  // §3.26 typography
  "text-display": () => ({
    fontFamily: "{font-display}", fontSize: "{type-size-display}",
    fontWeight: "{font-weight-bold}", lineHeight: "{leading-tight}", letterSpacing: "{tracking-tight}"
  }),
  "text-headline-lg": () => ({
    fontFamily: "{font-display}", fontSize: "{type-size-5xl}",
    fontWeight: "{font-weight-bold}", lineHeight: "{leading-tight}", letterSpacing: "{tracking-tight}"
  }),
  "text-headline-md": () => ({
    fontFamily: "{font-display}", fontSize: "{type-size-4xl}",
    fontWeight: "{font-weight-bold}", lineHeight: "{leading-tight}", letterSpacing: "{tracking-tight}"
  }),
  "text-headline-sm": () => ({
    fontFamily: "{font-display}", fontSize: "{type-size-3xl}",
    fontWeight: "{font-weight-semibold}", lineHeight: "{leading-tight}", letterSpacing: "{tracking-tight}"
  }),
  "text-title-lg": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-2xl}",
    fontWeight: "{font-weight-semibold}", lineHeight: "{leading-normal}", letterSpacing: "{tracking-normal}"
  }),
  "text-title-md": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-xl}",
    fontWeight: "{font-weight-semibold}", lineHeight: "{leading-normal}", letterSpacing: "{tracking-normal}"
  }),
  "text-title-sm": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-lg}",
    fontWeight: "{font-weight-medium}", lineHeight: "{leading-normal}", letterSpacing: "{tracking-normal}"
  }),
  "text-body-lg": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-lg}",
    fontWeight: "{font-weight-regular}", lineHeight: "{leading-prose}", letterSpacing: "{tracking-normal}"
  }),
  "text-body-md": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-md}",
    fontWeight: "{font-weight-regular}", lineHeight: "{leading-prose}", letterSpacing: "{tracking-normal}"
  }),
  "text-body-sm": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-sm}",
    fontWeight: "{font-weight-regular}", lineHeight: "{leading-prose}", letterSpacing: "{tracking-normal}"
  }),
  "text-label-lg": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-md}",
    fontWeight: "{font-weight-medium}", lineHeight: "{leading-normal}", letterSpacing: "{tracking-normal}"
  }),
  "text-label-md": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-sm}",
    fontWeight: "{font-weight-medium}", lineHeight: "{leading-normal}", letterSpacing: "{tracking-normal}"
  }),
  "text-label-sm": () => ({
    fontFamily: "{font-sans}", fontSize: "{type-size-xs}",
    fontWeight: "{font-weight-medium}", lineHeight: "{leading-normal}", letterSpacing: "{tracking-wide}"
  }),
  // §3.27 transition
  "transition-default": () => ({ duration: "{motion-normal}", delay: "0ms", timingFunction: "{ease-standard}" }),
  "transition-emphasis": () => ({ duration: "{motion-slow}", delay: "0ms", timingFunction: "{ease-emphasized}" }),
  "transition-fast": () => ({ duration: "{motion-fast}", delay: "0ms", timingFunction: "{ease-standard}" }),
  // §3.28 strokeStyle composite (object form for dashed)
  "stroke-dashed": () => ({ dashArray: ["4px", "2px"], lineCap: "butt" })
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
    out.color[group] = out.color[group] ?? {};
    for (const [name, value] of Object.entries(entries)) {
      // Expand dotted step keys (e.g. `foundationColors.primary`) into
      // nested DTCG structure so the compiler's path-based reference
      // resolver can walk to them via `{color.group.foundationColors.primary}`.
      const parts = name.split(".");
      let node = out.color[group];
      for (let i = 0; i < parts.length - 1; i++) {
        node[parts[i]] = node[parts[i]] ?? {};
        node = node[parts[i]];
      }
      node[parts[parts.length - 1]] = { $value: value, $type: inferType(value) };
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
  const apply = (map, type) => {
    for (const [k, v] of Object.entries(map)) {
      const value = sem[k] ?? v;
      out[k] = { $value: value, $type: type ?? inferTypeFromName(k) };
    }
  };
  // Atomic types from §3.6 onward.
  apply(DEFAULT_TYPE);
  apply(DEFAULT_SPACING);
  apply(DEFAULT_RADIUS);
  apply(DEFAULT_MOTION);
  apply(DEFAULT_BORDER_WIDTHS, "dimension");
  apply(DEFAULT_FOCUS_RING, "dimension");
  apply(DEFAULT_ICON_SIZES, "dimension");
  apply(DEFAULT_CONTAINERS, "dimension");
  apply(DEFAULT_BLUR, "dimension");
  apply(DEFAULT_OPACITY, "number");
  apply(DEFAULT_Z_INDEX, "number");
  apply(DEFAULT_ASPECT, "number");
  apply(DEFAULT_FONT_WEIGHTS, "fontWeight");
  apply(DEFAULT_STROKE, "strokeStyle");

  // Font families
  const fonts = { ...DEFAULT_FONTS, ...(source.fonts ?? {}) };
  for (const [k, v] of Object.entries(fonts)) {
    out[k] = { $value: v, $type: "fontFamily" };
  }

  // §3.1–3.4 — required color tokens (semantic block must define).
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

  // §3.1, §3.2, §3.5 — new color tokens with Phase 3.5c defaults.
  for (const [name, defaultValue] of Object.entries(DEFAULT_NEW_COLORS)) {
    const value = sem[name] ?? defaultValue;
    out[name] = { $value: normaliseRef(value), $type: "color" };
  }

  // §3.24–3.28 — composite tokens. Source may override via
  // source.composites[<name>]; otherwise the default shape applies.
  const composites = source.composites ?? {};
  for (const [name, shapeFn] of Object.entries(DEFAULT_COMPOSITES)) {
    const shape = composites[name] ?? shapeFn(sem);
    out[name] = { $value: normaliseComposite(shape), $type: compositeType(name) };
  }

  return out;
}

/**
 * Decide DTCG $type from canonical composite-token name.
 */
function compositeType(name) {
  if (name.startsWith("shadow-")) return "shadow";
  if (name.startsWith("border-default") || name.startsWith("border-emphasis-stroke") || name === "border-divider") return "border";
  if (name.startsWith("text-")) return "typography";
  if (name.startsWith("transition-")) return "transition";
  if (name === "stroke-dashed") return "strokeStyle";
  return "object";
}

/**
 * normaliseRef for composite shapes — recursively rewrites `{ref}`
 * strings inside nested objects/arrays so they resolve via the same
 * color-prefix machinery as atomic values.
 */
function normaliseComposite(value) {
  if (typeof value === "string") return normaliseCompositeRef(value);
  if (Array.isArray(value)) return value.map(normaliseComposite);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = normaliseComposite(v);
    }
    return out;
  }
  return value;
}

function normaliseCompositeRef(value) {
  // Match valid kebab-case identifier paths only; leave non-ref
  // strings (e.g. "solid", "0", "4px") intact.
  return value.replace(/\{([a-zA-Z][a-zA-Z0-9_.-]*)\}/g, (m, ref) => {
    // Color tokens get the `color.` prefix; other types resolve at
    // top-level (e.g. {shadow-tint} → top-level semantic token).
    return ref.startsWith("color.") ? m : `{${ref}}`;
  });
}

function normaliseRef(value) {
  return value.replace(/\{([^}]+)\}/g, (m, ref) => {
    if (ref.startsWith("color.")) return m;
    // Heuristic: refs containing a dot point at the base palette
    // (e.g. {stone.50}) and need the `color.` prefix. Dot-less refs
    // point at other top-level semantic names (e.g. {accent},
    // {text-recede}) and resolve at top level.
    if (ref.includes(".")) return `{color.${ref}}`;
    return m;
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
  // baseTokens is { color: { group: { ...nested DTCG... } } }.
  // Walk recursively, emitting `--color-{path-joined}` for each leaf
  // that has `$value`. This handles both flat (`{step: {$value}}`)
  // and nested (`{group: { sub: { step: {$value} } } }`) structures.
  const walk = (node, path) => {
    if (node && typeof node === "object" && "$value" in node) {
      lines.push(`  --color-${path.join("-")}: ${node.$value};`);
      return;
    }
    for (const [k, v] of Object.entries(node ?? {})) {
      if (k.startsWith("$")) continue;
      walk(v, [...path, k]);
    }
  };
  for (const [familyName, family] of Object.entries(baseTokens.color)) {
    walk(family, [familyName]);
  }
  lines.push(``, `  /* semantic */`);
  for (const [name, entry] of Object.entries(semanticTokens)) {
    const cssValue = renderCssValue(name, entry);
    if (cssValue === null) continue;
    lines.push(`  --${name}: ${cssValue};`);
  }
  lines.push(`}`, ``);
  return lines.join("\n");
}

/**
 * Convert a semantic-token DTCG entry into a CSS-ready value. Atomic
 * values get reference resolution (`{ref}` → `var(--…)`); composite
 * values are expanded into single CSS shorthand strings where
 * possible (shadow, border, transition, typography font: shorthand).
 * Returns null if the token has no useful single-value CSS form.
 */
function renderCssValue(name, entry) {
  const $type = entry.$type;
  const $value = entry.$value;

  // Atomic string — resolve refs and emit verbatim.
  if (typeof $value === "string") {
    return resolveCssRefs($value);
  }
  if (typeof $value === "number") {
    return String($value);
  }

  // Composite shapes per $type.
  if ($type === "shadow") {
    // shadow $value is either a single shadow object or an array of
    // shadow objects (layered). CSS box-shadow accepts comma-separated.
    const layers = Array.isArray($value) ? $value : [$value];
    const cssLayers = layers
      .map((layer) => {
        if (!layer || typeof layer !== "object") return null;
        const offsetX = resolveCssRefs(String(layer.offsetX ?? "0"));
        const offsetY = resolveCssRefs(String(layer.offsetY ?? "0"));
        const blur = resolveCssRefs(String(layer.blur ?? "0"));
        const spread = resolveCssRefs(String(layer.spread ?? "0"));
        const color = resolveCssRefs(String(layer.color ?? "currentColor"));
        const inset = layer.inset ? "inset " : "";
        return `${inset}${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
      })
      .filter(Boolean);
    return cssLayers.length > 0 ? cssLayers.join(", ") : null;
  }

  if ($type === "border") {
    // border $value: {color, width, style}
    const color = resolveCssRefs(String($value.color ?? "currentColor"));
    const width = resolveCssRefs(String($value.width ?? "1px"));
    const style = typeof $value.style === "string" ? $value.style : "solid";
    return `${width} ${style} ${color}`;
  }

  if ($type === "transition") {
    // transition $value: {duration, delay, timingFunction}
    const duration = resolveCssRefs(String($value.duration ?? "0ms"));
    const delay = resolveCssRefs(String($value.delay ?? "0ms"));
    const timing = resolveCssRefs(String($value.timingFunction ?? "linear"));
    const delayPart = delay && delay !== "0ms" ? ` ${delay}` : "";
    return `all ${duration} ${timing}${delayPart}`;
  }

  if ($type === "typography") {
    // typography $value: {fontFamily, fontSize, fontWeight, lineHeight, letterSpacing}
    // CSS `font:` shorthand: weight size/lineHeight family. Letter-spacing
    // not part of the shorthand; consumers needing it read the underlying
    // atomic tokens. We emit a usable `font:` shorthand value here.
    const weight = resolveCssRefs(String($value.fontWeight ?? "400"));
    const size = resolveCssRefs(String($value.fontSize ?? "1rem"));
    const lineHeight = resolveCssRefs(String($value.lineHeight ?? "1.4"));
    const family = resolveCssRefs(String($value.fontFamily ?? "system-ui"));
    return `${weight} ${size}/${lineHeight} ${family}`;
  }

  if ($type === "strokeStyle" && typeof $value === "object") {
    // The object form (dashed) doesn't have a direct CSS shorthand;
    // emit "dashed" so it's usable inline.
    return "dashed";
  }

  return null;
}

function resolveCssRefs(value) {
  return value.replace(/\{([a-zA-Z][a-zA-Z0-9_.-]*)\}/g, (_, ref) => {
    const parts = ref.startsWith("color.") ? ref.split(".") : ["color", ...ref.split(".")];
    // Composite refs reach top-level semantic names, not nested under
    // color.; the var() name in those cases is `--ref-name` directly.
    if (!ref.startsWith("color.") && !ref.includes(".")) {
      // Top-level semantic name (e.g. {shadow-tint}, {border-width-sm})
      return `var(--${ref})`;
    }
    return `var(--${parts.join("-")})`;
  });
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
