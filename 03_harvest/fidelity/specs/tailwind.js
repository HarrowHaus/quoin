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
      // Phase 3.5d: refine atomic geometric tokens to Tailwind v4's
      // canonical scale (from tailwindcss.com/docs/box-shadow,
      // border-width, font-size, transition-duration).
      semantic: {
        "border-width-hairline": "1px",
        "border-width-sm": "1px",
        "border-width-md": "2px",
        "border-width-lg": "4px",
        "motion-instant": "75ms",
        "motion-fast": "150ms",
        "motion-normal": "200ms",
        "motion-slow": "300ms",
        "motion-slower": "500ms"
      },
      // Phase 3.5d: refine composite shadow tokens to Tailwind v4's
      // canonical box-shadow scale. Source: tailwindcss.com/docs/box-shadow.
      composites: {
        "shadow-xs": {
          color: "rgb(0 0 0 / 0.05)",
          offsetX: "0", offsetY: "1px", blur: "2px", spread: "0", inset: false
        },
        "shadow-sm": [
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "1px", blur: "3px", spread: "0", inset: false },
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "1px", blur: "2px", spread: "-1px", inset: false }
        ],
        "shadow-md": [
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "4px", blur: "6px", spread: "-1px", inset: false },
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "2px", blur: "4px", spread: "-2px", inset: false }
        ],
        "shadow-lg": [
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "10px", blur: "15px", spread: "-3px", inset: false },
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "4px",  blur: "6px",  spread: "-4px", inset: false }
        ],
        "shadow-xl": [
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "20px", blur: "25px", spread: "-5px", inset: false },
          { color: "rgb(0 0 0 / 0.1)", offsetX: "0", offsetY: "8px",  blur: "10px", spread: "-6px", inset: false }
        ],
        "shadow-2xl": {
          color: "rgb(0 0 0 / 0.25)",
          offsetX: "0", offsetY: "25px", blur: "50px", spread: "-12px", inset: false
        },
        "shadow-inner": {
          color: "rgb(0 0 0 / 0.05)",
          offsetX: "0", offsetY: "2px", blur: "4px", spread: "0", inset: true
        }
      },
      notes:
        "Phase 3.5d composite refinement: shadow recipes match Tailwind v4's canonical box-shadow scale (sm/md/lg/xl/2xl) verbatim. Motion durations match Tailwind's transition-duration utilities (75/150/200/300/500ms)."
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
