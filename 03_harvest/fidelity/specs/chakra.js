/**
 * Chakra UI v3 — packages/theme/src/foundations/colors.ts.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/packages/react/src/theme/tokens/colors.ts"
    ],
    format: "value-wrapped-ts",
    commit: "main"
  },
  harvestNotes:
    "Chakra UI v3 colour tokens extracted from packages/react/src/theme/tokens/colors.ts. Chakra wraps every value in `{ value: '#hex' }` per the Panda-CSS / @chakra-ui/styled-system convention. The value-wrapped-ts parser handles this shape.",
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
        gray: pick("gray"),
        red: pick("red"),
        orange: pick("orange"),
        yellow: pick("yellow"),
        green: pick("green"),
        teal: pick("teal"),
        blue: pick("blue"),
        cyan: pick("cyan"),
        purple: pick("purple"),
        pink: pick("pink"),
        black: { 0: values["black"] ?? "oklch(0% 0 0)" },
        white: { 0: values["white"] ?? "oklch(100% 0 0)" }
      },
      notes:
        "Chakra v3 50-950 ramps for gray/red/orange/yellow/green/teal/blue/cyan/purple/pink. Default accent = teal.500 per Chakra convention. whiteAlpha/blackAlpha (semi-transparent overlays) are not modelled in the base palette — Quoin's primitives handle overlay tints via the impl pack."
    };
  }
};
