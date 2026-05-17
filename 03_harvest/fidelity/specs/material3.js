/**
 * Material Design 3 — Method B (algorithm execution).
 *
 * M3 doesn't ship a static "default palette" file. Instead it ships
 * the tonal-palette generation algorithm in
 * @material/material-color-utilities. We execute that algorithm at
 * extract time with M3's documented default seed (#6750A4, the M3
 * baseline primary) and harvest all 13 tones (0/10/20/30/40/50/60/
 * 70/80/90/95/99/100) for each role palette.
 *
 * The npm dependency is a dev-time tool of the harvest pipeline; the
 * published pack ships only the static OKLCH values that the algorithm
 * generated.
 */

import {
  themeFromSourceColor,
  argbFromHex,
  hexFromArgb
} from "@material/material-color-utilities";

const SEED = "#6750A4";
// M3's only canonical status palette is error. Quoin's namespace also
// needs success/warning/info; we generate each from a documented
// Material seed and harvest tone 40 (the canonical "solid" step) plus
// a few neighbours.
const STATUS_SEEDS = {
  success: "#43A047", // Material Green 600
  warning: "#FFA000", // Material Amber 700
  info: "#1976D2" // Material Blue 700
};
const TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

function paletteToTones(palette) {
  const out = {};
  for (const t of TONES) {
    out[t] = hexFromArgb(palette.tone(t));
  }
  return out;
}

export default {
  harvestNotes:
    "Values computed by running @material/material-color-utilities with M3's documented baseline seed (#6750A4). 13 tones × 6 role palettes (primary, secondary, tertiary, neutral, neutral variant, error). To regenerate with a different seed: install the library, change SEED in fidelity/specs/material3.js, and re-run.",
  async algorithm() {
    const theme = themeFromSourceColor(argbFromHex(SEED));
    const palettes = theme.palettes;
    const out = {};
    const families = {
      primary: palettes.primary,
      secondary: palettes.secondary,
      tertiary: palettes.tertiary,
      neutral: palettes.neutral,
      "neutral-variant": palettes.neutralVariant,
      error: palettes.error
    };
    for (const [name, pal] of Object.entries(families)) {
      for (const [tone, hex] of Object.entries(paletteToTones(pal))) {
        out[`${name}.${tone}`] = hex;
      }
    }
    // Generate auxiliary status palettes for success/warning/info via
    // the same tonal-palette generation with documented Material seeds.
    for (const [statusName, statusSeed] of Object.entries(STATUS_SEEDS)) {
      const statusTheme = themeFromSourceColor(argbFromHex(statusSeed));
      const pal = statusTheme.palettes.primary;
      for (const [tone, hex] of Object.entries(paletteToTones(pal))) {
        out[`${statusName}.${tone}`] = hex;
      }
    }
    return {
      rawValues: out,
      library: "@material/material-color-utilities",
      version: "0.2.7",
      inputs: { seed: SEED, status: STATUS_SEEDS, tones: TONES }
    };
  },
  map(values) {
    const pick = (family) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        if (k.startsWith(`${family}.`)) {
          out[k.slice(family.length + 1)] = v;
        }
      }
      return out;
    };
    return {
      base: {
        neutral: pick("neutral"),
        primary: pick("primary"),
        secondary: pick("secondary"),
        tertiary: pick("tertiary"),
        error: pick("error"),
        success: pick("success"),
        warning: pick("warning"),
        info: pick("info"),
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "M3 13-tone scale per role palette. Light-theme mapping: surface = neutral.98, surface-elevated = neutral.99, surface-recessed = neutral.95, surface-inverse = neutral.20, text = neutral.20, text-emphasis = neutral.10, accent = primary.40, accent-recede = primary.90, critical = error.40."
    };
  }
};
