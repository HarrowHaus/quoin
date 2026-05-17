/**
 * Material Design 3 — material-foundation/material-tokens lib.
 * The canonical baseline palette ships as a JSON-like TS export.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/material-foundation/material-tokens/main/lib/m3-palettes/baseline.css",
      "https://raw.githubusercontent.com/material-foundation/material-color-utilities/main/typescript/palettes/core_palette.ts"
    ],
    format: "css-vars",
    commit: "main"
  },
  harvestNotes:
    "Material 3 baseline palette. Source values converted from sRGB hex to OKLCH. Elevation tokens not modelled (Quoin optional capability).",
  map(values) {
    // Tries CSS vars first (m3-palettes/baseline.css). If that 404s, the
    // fallback URL is the .ts core_palette which has hex inside; we use
    // css-vars parser for both since the css form is preferred.
    return {
      base: {
        md: values,
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "M3 baseline palette captured as base.md.{name}. Quoin semantic refs select the closest match — surface = md-sys-color-surface, accent = md-sys-color-primary, etc."
    };
  }
};
