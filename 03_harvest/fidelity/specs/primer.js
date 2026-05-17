/**
 * GitHub Primer — Method A (static fetch + primer-json5 parser).
 *
 * Primer's base palette ships as json5 with the shape
 *   name: { $value: { hex: '#hex' } }
 * The custom primer-json5 parser walks the indented tree and emits
 * dotted paths.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/primer/primitives/main/src/tokens/base/color/light/light.json5"
    ],
    format: "primer-json5",
    commit: "main"
  },
  harvestNotes:
    "Primer base/color/light/light.json5 extracted byte-faithfully. The json5 source nests hex inside `$value.hex`; the primer-json5 parser walks the indented tree and emits `base.color.{family}.{step}: '#hex'`.",
  map(values) {
    // Primer paths look like `base.color.gray.0`, `base.color.blue.5`, etc.
    const pick = (family) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        const prefix = `base.color.${family}.`;
        if (k.startsWith(prefix)) {
          out[k.slice(prefix.length)] = v;
        }
      }
      return out;
    };
    return {
      base: {
        gray: pick("gray"),
        blue: pick("blue"),
        green: pick("green"),
        red: pick("red"),
        orange: pick("orange"),
        yellow: pick("yellow"),
        purple: pick("purple"),
        pink: pick("pink"),
        coral: pick("coral"),
        neutral: pick("neutral"),
        black: { 0: values["base.color.black"] ?? "oklch(0% 0 0)" },
        white: { 0: values["base.color.white"] ?? "oklch(100% 0 0)" }
      },
      notes:
        "Primer 10-step scales for gray/blue/green/red/orange/yellow/purple/pink/coral. Functional mapping: surface = white, text = gray.9, accent = blue.5 (Primer's --color-accent-emphasis), critical = red.5, success = green.5, warning = yellow.5, info = blue.5."
    };
  }
};
