/**
 * Tailwind CSS v4 defaults.
 *
 * theme.css ships the canonical OKLCH palette as CSS custom
 * properties. We pull the zinc neutral ramp + accent/status 500 steps.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/tailwindlabs/tailwindcss/main/packages/tailwindcss/theme.css"
    ],
    format: "css-vars",
    commit: "main"
  },
  harvestNotes:
    "Default v4 palette extracted byte-faithfully from packages/tailwindcss/theme.css. Tailwind v4 ships native OKLCH; values preserved verbatim. Neutral ramp = zinc.",
  map(values) {
    const zinc = pickRamp(values, "color-zinc-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]);
    const pick = (key) => values[`color-${key}`];
    return {
      base: {
        zinc,
        red: { 500: pick("red-500") },
        emerald: { 500: pick("emerald-500") },
        amber: { 500: pick("amber-500") },
        sky: { 500: pick("sky-500") },
        white: { 0: "oklch(100% 0 0)" }
      },
      notes: null
    };
  }
};

function pickRamp(values, prefix, steps) {
  const out = {};
  for (const step of steps) {
    const v = values[`${prefix}${step}`];
    if (v) out[step] = v;
  }
  return out;
}
