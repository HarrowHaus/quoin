/**
 * Radix Colors — slate.css + blue.css from radix-ui/colors.
 * Light-theme P3-fallback variant; we use the sRGB hex declarations.
 */

export default {
  fetch: {
    urls: ["https://raw.githubusercontent.com/radix-ui/colors/main/src/light.ts"],
    format: "ts",
    commit: "main"
  },
  harvestNotes:
    "Radix Colors light theme: slate + blue + red + green + amber, extracted from the canonical sRGB hex declarations in radix-ui/colors. Each ramp has 12 perceptual steps; we keep steps 1-12 verbatim.",
  map(values) {
    // Radix's light.ts exports per-colour objects with keys like
    // `gray1`, `blue1`, etc. The TS parser flattens to bare keys.
    const pickScale = (prefix) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        const m = k.match(new RegExp(`^${prefix}(\\d+)$`));
        if (m) out[m[1]] = v;
      }
      return out;
    };
    return {
      base: {
        slate: pickScale("slate"),
        gray: pickScale("gray"),
        blue: pickScale("blue"),
        red: pickScale("red"),
        green: pickScale("green"),
        amber: pickScale("amber"),
        sky: pickScale("sky"),
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "Radix's 12-step scale (gray, slate, blue, red, green, amber, sky) extracted byte-faithful from src/light.ts. Flattened onto Quoin's 4-surface model: step-1 → surface-elevated, step-2 → surface, step-3 → surface-recessed, step-12 → surface-inverse. Accent = slate.12."
    };
  }
};
