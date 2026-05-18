/**
 * Side-by-side showcase composition renderer.
 *
 * Writes a single static HTML file with one shared composition rendered
 * through every (theme × mode) pair (10 themes × light/dark = 20 cells).
 * The output is what an operator visually inspects to confirm cross-pack
 * diversity per Phase Themes exit criteria.
 *
 * Design notes — read before changing this file:
 *
 *   1. This is NOT a compiled-Quoin artifact. The first pass of this
 *      script compiled the source through impl-tailwind, which emitted
 *      Tailwind arbitrary-value classes like `text-[var(--type-size-display)]`.
 *      A static HTML page without a Tailwind bundle treats those as inert
 *      strings — every cell rendered identically except for colour.
 *      The current implementation writes the composition as plain HTML
 *      with semantic class names backed by real CSS that reads from CSS
 *      custom properties. The per-theme overrides scope onto each cell.
 *
 *   2. Fonts load via:
 *        - Google Fonts CSS link  (Source Serif 4, Inter, DM Serif Display,
 *                                  JetBrains Mono, Manrope, Unbounded,
 *                                  IBM Plex Sans / Condensed / Mono)
 *        - Fontshare CSS link     (Ranade Variable)
 *        - @font-face declarations pointing at jsDelivr (Junicode 2 Beta VF,
 *          Junicode VF, Monaspace family ×5, Geist Variable, Geist Mono
 *          Variable)
 *        - Vendored ./_fonts/DepartureMono-Regular.woff2 (OFL by Helena
 *          Zhang, helenazhang.com — extracted from the v1.500 release zip;
 *          repo doesn't expose a direct CDN path).
 *      All external CDN paths were HEAD-verified before commit.
 *
 *   3. Every theme font stack uses ONLY OFL / free faces or Apple system
 *      fonts (-apple-system, SF Pro, SF Mono — these resolve natively on
 *      macOS/iOS with zero load weight; theme-prism is the documented
 *      exception). Commercial faces (Söhne, PP Editorial New, GT Alpina,
 *      Synonym, Plein, General Sans, Untitled Sans, Styrene, Anthropic
 *      stack, Tiempos, Clash Display, Helvetica Neue) were removed in
 *      the cleanup commit prior to Phase Templates — they wouldn't load
 *      for self-hosting consumers and created license risk.
 *
 *   4. CSS variable names with dots (e.g. `--color.stone.50`) are invalid
 *      CSS identifiers and are SKIPPED at emit time. Only the canonical
 *      kebab-case names land in `:root`.
 *
 *   5. Composite shadow tokens are rendered to CSS box-shadow shorthand
 *      via `renderShadow()` rather than emitted as raw JSON. This makes
 *      per-theme depth strategy visible in the cells.
 *
 *   6. Headline sizing uses container queries (`cqi`) clamped against
 *      each theme's `--type-size-display`. Broadsheet's full 11rem only
 *      renders at very wide cells; smaller cells scale down honestly.
 *
 * Output: 02_reference-packs/themes/showcase.html
 * Run:    node 02_reference-packs/themes/showcase.js
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const COMPILER_DIST = path.join(ROOT, "01_compiler", "dist");
const url = (p) => pathToFileURL(p).href;

const {
  loadTokenPack,
  loadThemePack
} = await import(url(path.join(COMPILER_DIST, "pack-loader.js")));

const THEMES = [
  "vellum", "graphite", "aurora", "letterpress", "terminal",
  "broadsheet", "bloom", "arcade", "prism", "vapor"
];

/* ─────────────────── CSS variable emission ─────────────────── */

/**
 * Emit `name: value` lines for a token map, skipping:
 *   - Names that aren't valid CSS custom-property identifiers (e.g.
 *     dot-pathed `color.stone.50` from the base palette tree).
 *   - Composite typography / border / transition values (we read the
 *     constituent atomic tokens directly in the composition CSS).
 *
 * Composite shadow values ARE rendered to CSS shorthand via
 * renderShadow() — they're central to the per-theme depth signal.
 */
function tokensToCssVars(tokens, scopeSelector) {
  const lines = [`${scopeSelector} {`];
  for (const [name, value] of Object.entries(tokens)) {
    if (!isValidCssIdentifier(name)) continue;
    let emitted = value;
    if (typeof value === "string" && value.startsWith("[")) {
      // Layered shadow composite (DTCG $type: "shadow" with array $value).
      if (name.startsWith("shadow-")) {
        emitted = renderShadow(value);
      } else {
        continue; // unknown array-valued composite; skip
      }
    } else if (typeof value === "string" && value.startsWith("{")) {
      // Single-object composite (typography, border, transition). Skip;
      // the composition reads atomic tokens (font-sans, type-size-md, …)
      // directly.
      continue;
    }
    lines.push(`  --${name}: ${emitted};`);
  }
  lines.push("}");
  return lines.join("\n");
}

function isValidCssIdentifier(name) {
  // CSS custom-property names are <ident-token>s — the dot character
  // is NOT permitted. Reject anything containing dots, whitespace, or
  // characters outside [-A-Za-z0-9_].
  return /^[A-Za-z_][A-Za-z0-9_-]*$/.test(name);
}

/**
 * Render a DTCG shadow composite (JSON-stringified array of layers)
 * into a CSS box-shadow value. Token references in the layers'
 * `color` field stay as `var(--<ref>)` so themes can override
 * shadow-tint per-mode without touching the recipe.
 */
function renderShadow(jsonValue) {
  let layers;
  try {
    layers = JSON.parse(jsonValue);
  } catch {
    return "none";
  }
  if (!Array.isArray(layers)) layers = [layers];
  const parts = layers.map((layer) => {
    const color = resolveColorRef(layer.color);
    const inset = layer.inset ? "inset " : "";
    return `${inset}${layer.offsetX ?? 0} ${layer.offsetY ?? 0} ${layer.blur ?? 0} ${layer.spread ?? 0} ${color}`
      .replace(/\s+/g, " ")
      .trim();
  });
  return parts.join(", ") || "none";
}

function resolveColorRef(value) {
  if (typeof value !== "string") return "currentColor";
  const match = value.match(/^\{([A-Za-z_][A-Za-z0-9_.-]*)\}$/);
  if (match) {
    const ref = match[1];
    // Strip a leading `color.` so `{color.shadow-tint}` collapses to
    // `--shadow-tint` (the canonical semantic name).
    const stripped = ref.replace(/^color\./, "");
    return `var(--${stripped})`;
  }
  return value;
}

/* ─────────────────── font loading ─────────────────── */

/**
 * Stylesheet links + @font-face declarations.
 *
 * Verified May 17 2026 via curl HEAD against each URL:
 *   - https://fonts.googleapis.com/css2?…  → 200
 *   - https://api.fontshare.com/v2/css?f[]=ranade@400,500,700 → 200
 *   - https://cdn.jsdelivr.net/gh/psb1558/Junicode-font@2.223/webfiles/…
 *     → 200 (JunicodeVF-Roman.woff2, JunicodeTwoBetaVF-Roman.woff2)
 *   - https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/
 *     webfonts/Monaspace{Neon,Argon,Xenon,Radon,Krypton}-Regular.woff2
 *     → 200
 *   - https://cdn.jsdelivr.net/npm/geist@latest/dist/fonts/geist-sans/
 *     Geist-Variable.woff2 → 200
 *   - https://cdn.jsdelivr.net/npm/geist@latest/dist/fonts/geist-mono/
 *     GeistMono-Variable.woff2 → 200
 *
 * Departure Mono: no CDN-direct WOFF2 (release ships .zip only). We
 * declare the family name in `font-family` stacks for diagnostic value
 * but fall back to Pixelify Sans visually.
 *
 * Geist Pixel: npm:geist@1.7.0 does NOT yet ship the Pixel variant
 * (released Feb 2026). graphite's `font-mono-pixel` stack therefore
 * lists Geist Pixel first but Departure Mono / Pixelify Sans / system
 * monospace will resolve in practice.
 */
const FONT_HEAD = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://api.fontshare.com">
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>

  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,200..900&family=Inter:opsz,wght@14..32,100..900&family=DM+Serif+Display&family=JetBrains+Mono:wght@100..800&family=Manrope:wght@200..800&family=Unbounded:wght@200..900&family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&display=swap">

  <link
    rel="stylesheet"
    href="https://api.fontshare.com/v2/css?f[]=ranade@400,500,700&display=swap">

  <style>
    /* ─── Departure Mono — vendored locally (OFL by Helena Zhang) ───
       Source: github.com/rektdeckard/departure-mono v1.500 release zip.
       File: ./_fonts/DepartureMono-Regular.woff2 (22 KB).
       License: ./_fonts/DepartureMono-LICENSE (SIL Open Font License 1.1).
       No public CDN-direct WOFF2 path exists; the repo ships only a
       .zip release asset. The font is OFL-licensed and bundled inline. */
    @font-face {
      font-family: 'Departure Mono';
      font-style: normal; font-weight: 400; font-display: swap;
      src: url('./_fonts/DepartureMono-Regular.woff2') format('woff2');
    }

    /* ─── Junicode 2 (Beta VF) + Junicode (VF) — psb1558/Junicode-font@2.223 ─── */
    @font-face {
      font-family: 'Junicode 2';
      font-style: normal;
      font-weight: 400 700;
      font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/psb1558/Junicode-font@2.223/webfiles/JunicodeTwoBetaVF-Roman.woff2') format('woff2-variations');
    }
    @font-face {
      font-family: 'Junicode';
      font-style: normal;
      font-weight: 400 700;
      font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/psb1558/Junicode-font@2.223/webfiles/JunicodeVF-Roman.woff2') format('woff2-variations');
    }
    @font-face {
      font-family: 'Junicode';
      font-style: italic;
      font-weight: 400 700;
      font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/psb1558/Junicode-font@2.223/webfiles/JunicodeVF-Italic.woff2') format('woff2-variations');
    }

    /* ─── Monaspace family — githubnext/monaspace@v1.101 ─── */
    @font-face {
      font-family: 'Monaspace Neon';
      font-style: normal; font-weight: 400; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceNeon-Regular.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Monaspace Neon';
      font-style: normal; font-weight: 500; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceNeon-Medium.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Monaspace Neon';
      font-style: normal; font-weight: 700; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceNeon-Bold.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Monaspace Argon';
      font-style: normal; font-weight: 400; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceArgon-Regular.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Monaspace Xenon';
      font-style: normal; font-weight: 400; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceXenon-Regular.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Monaspace Radon';
      font-style: normal; font-weight: 400; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceRadon-Regular.woff2') format('woff2');
    }
    @font-face {
      font-family: 'Monaspace Krypton';
      font-style: normal; font-weight: 400; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceKrypton-Regular.woff2') format('woff2');
    }

    /* ─── Geist (Sans + Mono) Variable — npm:geist@1.7.0 ─── */
    /* Declared under both canonical + "Variable" aliases so theme stacks
       that lead with 'Geist Variable' / 'Geist Mono Variable' / 'Monaspace
       Neon Variable' resolve to the same binary as the canonical name. */
    @font-face {
      font-family: 'Geist';
      font-style: normal; font-weight: 100 900; font-display: swap;
      src: url('https://cdn.jsdelivr.net/npm/geist@latest/dist/fonts/geist-sans/Geist-Variable.woff2') format('woff2-variations');
    }
    @font-face {
      font-family: 'Geist Variable';
      font-style: normal; font-weight: 100 900; font-display: swap;
      src: url('https://cdn.jsdelivr.net/npm/geist@latest/dist/fonts/geist-sans/Geist-Variable.woff2') format('woff2-variations');
    }
    @font-face {
      font-family: 'Geist Mono';
      font-style: normal; font-weight: 100 900; font-display: swap;
      src: url('https://cdn.jsdelivr.net/npm/geist@latest/dist/fonts/geist-mono/GeistMono-Variable.woff2') format('woff2-variations');
    }
    @font-face {
      font-family: 'Geist Mono Variable';
      font-style: normal; font-weight: 100 900; font-display: swap;
      src: url('https://cdn.jsdelivr.net/npm/geist@latest/dist/fonts/geist-mono/GeistMono-Variable.woff2') format('woff2-variations');
    }
    @font-face {
      font-family: 'Monaspace Neon Variable';
      font-style: normal; font-weight: 400; font-display: swap;
      src: url('https://cdn.jsdelivr.net/gh/githubnext/monaspace@v1.101/fonts/webfonts/MonaspaceNeon-Regular.woff2') format('woff2');
    }
  </style>
`.trim();

/* ─────────────────── composition CSS ─────────────────── */

/**
 * Real CSS for the cell composition. Reads from CSS custom properties
 * supplied by the active theme. The composition renders as plain HTML
 * with semantic class names (.composition, .composition-headline, …).
 *
 * Sizing uses container queries: the `.cell-render` element is a
 * `container-type: inline-size` container so headline sizing scales
 * against cell width, not viewport width.
 */
const COMPOSITION_CSS = `
  .cell-render { container-type: inline-size; }

  .composition {
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-normal, 12px);
    background: var(--surface-elevated, var(--surface, #fff));
    color: var(--text, currentColor);
    padding: var(--space-panel, 24px);
    border: 1px solid var(--border, transparent);
    border-radius: var(--radius-card, var(--radius-md, 0));
    box-shadow: var(--shadow-md, none);
    font-family: var(--font-sans, system-ui, sans-serif);
    /* tabular numerics per cross-trend baseline */
    font-variant-numeric: tabular-nums;
  }

  .composition-mark {
    margin: 0;
    font-family: var(--font-sans, system-ui, sans-serif);
    font-size: var(--type-size-xs, 0.75rem);
    font-weight: var(--font-weight-medium, 500);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-recede, currentColor);
  }

  .composition-headline {
    margin: 0;
    font-family: var(--font-display, var(--font-serif, var(--font-sans, system-ui, serif)));
    font-size: clamp(1.75rem, 18cqi, var(--type-size-display, 3rem));
    font-weight: var(--font-weight-medium, 500);
    line-height: var(--leading-tight, 1.05);
    letter-spacing: var(--tracking-tight, -0.02em);
    color: var(--text-emphasis, var(--text, currentColor));
    text-wrap: balance;
  }

  .composition-prose {
    margin: 0;
    max-width: 38ch;
    /* Prose uses the theme's font-sans rather than font-serif. Themes
       that don't override font-serif inherit the baseline Junicode 2
       stack, which collides with sans-identity themes (graphite, aurora,
       arcade, prism, vapor). Sans is the universal-correct choice; each
       theme's font-sans is already tuned to its identity register. */
    font-family: var(--font-sans, system-ui, sans-serif);
    font-size: var(--type-size-sm, 0.875rem);
    line-height: var(--leading-prose, 1.55);
    color: var(--text, currentColor);
  }

  /* Mono-pixel caption — exercises the canonical --font-mono-pixel slot
     so the vendored Departure Mono renders visibly in every cell. Themes
     that override font-mono-pixel (terminal, letterpress, graphite) show
     their override; others inherit baseline Departure Mono. */
  .composition-caption {
    margin: 0;
    font-family: var(--font-mono-pixel, var(--font-mono, ui-monospace, monospace));
    font-size: var(--type-size-xs, 0.75rem);
    color: var(--text-recede, currentColor);
    letter-spacing: 0.04em;
  }

  .composition-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3, 8px);
    margin-top: var(--space-4, 12px);
  }

  .composition-action-primary,
  .composition-action-secondary {
    font: inherit;
    cursor: pointer;
    padding: var(--space-2, 6px) var(--space-4, 12px);
    font-family: var(--font-sans, system-ui, sans-serif);
    font-size: var(--type-size-sm, 0.875rem);
    font-weight: var(--font-weight-medium, 500);
    border-radius: var(--radius-md, 4px);
    transition: opacity var(--motion-fast, 180ms) var(--ease-standard, ease-out);
    min-height: 36px;
  }
  .composition-action-primary {
    background: var(--accent, currentColor);
    color: var(--text-on-accent, white);
    border: 1px solid var(--accent, currentColor);
  }
  .composition-action-secondary {
    background: transparent;
    color: var(--text-emphasis, currentColor);
    border: 1px solid var(--border-emphasis, var(--border, currentColor));
  }
  .composition-action-primary:hover,
  .composition-action-secondary:hover {
    opacity: 0.85;
  }
`.trim();

/* ─────────────────── shell + grid CSS ─────────────────── */

const SHELL_CSS = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 24px;
    background: oklch(94% 0.005 80);
    color: oklch(18% 0.005 80);
    font: 14px/1.5 system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  }
  h1 { font-size: 28px; margin: 0 0 8px; letter-spacing: -0.02em; }
  .intro { max-width: 760px; margin: 0 0 24px; color: oklch(40% 0.005 80); }
  .legend { margin-bottom: 16px; font-size: 12px; color: oklch(40% 0.005 80); }
  .legend code { background: oklch(96% 0.005 80); padding: 1px 4px; border-radius: 2px; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
    gap: 16px;
  }

  .cell {
    border: 1px solid oklch(85% 0.008 80);
    border-radius: 8px;
    overflow: hidden;
    background: var(--surface, white);
  }
  .cell-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: oklch(96% 0.005 80);
    color: oklch(28% 0.005 80);
    font: 600 11px/1 ui-monospace, 'Geist Mono', 'JetBrains Mono', SFMono-Regular, monospace;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    border-bottom: 1px solid oklch(88% 0.008 80);
  }
  .cell-mode {
    padding: 2px 6px;
    background: var(--mode-badge, oklch(20% 0.005 80));
    color: oklch(96% 0.005 80);
    border-radius: 3px;
    font-size: 10px;
  }
  .cell[data-mode="dark"] .cell-mode { --mode-badge: oklch(50% 0 0); }
  .cell[data-mode="light"] .cell-mode { --mode-badge: oklch(18% 0.005 80); }

  .cell-render {
    padding: 24px;
    background: var(--surface, white);
    min-height: 280px;
  }
`.trim();

/* ─────────────────── page build ─────────────────── */

async function main() {
  const tokenPack = await loadTokenPack(
    path.join(ROOT, "02_reference-packs", "tokens-baseline")
  );

  const themes = {};
  for (const name of THEMES) {
    themes[name] = await loadThemePack(path.join(__dirname, name));
  }

  // Per-theme CSS scope. Dark mode in real apps swaps colours but keeps
  // typography / spacing / motion / radii consistent — so the light
  // override map (which declares all the non-color tokens) applies to
  // BOTH light and dark; the dark map then layers colour overrides on
  // top for dark mode only.
  //
  // This is the same composition order an impl pack would emit:
  //   [data-theme="vellum"]            { …light tokens… }
  //   [data-theme="vellum"][data-mode="dark"] { …dark colour overrides… }
  //
  // Specificity: `[data-theme]` = (0,1,0); `[data-theme][data-mode]` =
  // (0,2,0). The dark selector reliably wins inside its mode.
  const themeCss = THEMES.flatMap((name) => {
    const t = themes[name];
    return [
      tokensToCssVars(
        t.lightModeOverrides,
        `.cell[data-theme="theme-${name}"] .cell-render`
      ),
      tokensToCssVars(
        t.darkModeOverrides ?? {},
        `.cell[data-theme="theme-${name}"][data-mode="dark"] .cell-render`
      )
    ];
  }).join("\n\n");

  // Base canonical token map at .cell-render (so the theme overrides only
  // need to declare what they differentiate). Also a `:root` copy so the
  // outer chrome can read tokens too.
  const baseCss = tokensToCssVars(tokenPack.tokens, ".cell-render");
  const rootCss = tokensToCssVars(tokenPack.tokens, ":root");

  const cells = [];
  for (const name of THEMES) {
    for (const mode of ["light", "dark"]) {
      cells.push(`
        <article class="cell" data-theme="theme-${name}" data-mode="${mode}">
          <header class="cell-meta">
            <span class="cell-name">@quoin/theme-${name}</span>
            <span class="cell-mode">${mode}</span>
          </header>
          <div class="cell-render">
            <section class="composition">
              <p class="composition-mark">A semantic design language</p>
              <h1 class="composition-headline">Quoin Showcase</h1>
              <p class="composition-prose">
                The same source rendered through ten distinct theme packs.
                Each pack supplies its own palette, typography, motion, and
                depth strategy on top of the canonical token namespace.
              </p>
              <p class="composition-caption">v1.0 · 175 tokens · 11 DTCG types</p>
              <div class="composition-actions">
                <button class="composition-action-primary">Get started</button>
                <button class="composition-action-secondary">Read the spec</button>
              </div>
            </section>
          </div>
        </article>
      `);
    }
  }

  const out = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quoin Theme Showcase — 10 v1.0 themes × light/dark</title>

${FONT_HEAD}

  <style>
${rootCss}

${baseCss}

${themeCss}

${COMPOSITION_CSS}

${SHELL_CSS}
  </style>
</head>
<body>
  <h1>Quoin theme showcase</h1>
  <p class="intro">
    Same source rendered through ${THEMES.length} v1.0 theme packs in
    light + dark mode. Cross-pack diversity check from the Phase Themes
    exit criteria: each cell should read as a distinct aesthetic.
  </p>
  <p class="legend">
    Headline uses <code>clamp(1.75rem, 18cqi, var(--type-size-display))</code>;
    the full display tier (e.g. broadsheet's 11rem) only renders at very
    wide cells. Fonts load from Google Fonts (Source Serif 4 Variable,
    Inter Variable, DM Serif Display, JetBrains Mono Variable, Manrope,
    Unbounded, IBM Plex Sans / Condensed / Mono), Fontshare (Ranade
    Variable), jsDelivr (Junicode 2, Monaspace ×5, Geist Variable + Mono),
    and a vendored <code>_fonts/DepartureMono-Regular.woff2</code> (OFL
    by Helena Zhang). Every face is OFL or an Apple system font — no
    commercial faces in any theme stack.
  </p>
  <div class="grid">
    ${cells.join("\n")}
  </div>
</body>
</html>
`;

  const outPath = path.join(__dirname, "showcase.html");
  await fs.writeFile(outPath, out, "utf8");
  console.log(`Wrote ${outPath}`);
  console.log(`  ${THEMES.length * 2} cells (${THEMES.length} themes × light/dark)`);
  console.log(`  ${out.length} bytes`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
