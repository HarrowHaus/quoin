/**
 * Bootstrap 5 — _variables.scss in twbs/bootstrap.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/twbs/bootstrap/main/scss/_variables.scss"
    ],
    format: "scss",
    commit: "main"
  },
  harvestNotes:
    "Bootstrap 5 default palette extracted from scss/_variables.scss. Greyscale ($gray-100 … $gray-900) + theme colours ($primary, $danger, $success, $warning, $info). Hex source converted to OKLCH at extraction.",
  map(values) {
    const gray = pickByPrefix(values, "gray-");
    return {
      base: {
        gray,
        white: { 0: "oklch(100% 0 0)" },
        primary: {
          // 100 is the soft tint Quoin uses for accent-recede; Bootstrap
          // computes it at SCSS time as tint-color($blue, 80%). We
          // approximate it directly as a very light blue rather than
          // running the SCSS function — documented in mappingNotes.
          100: "oklch(96% 0.03 250)",
          500: values["blue"]
        },
        danger: { 500: values["red"] },
        success: { 500: values["green"] },
        warning: { 500: values["yellow"] },
        info: { 500: values["cyan"] }
      },
      notes:
        "Bootstrap's $primary/$danger/$success/$warning/$info aliases resolve at compile time to $blue/$red/$green/$yellow/$cyan; we read those directly. The tint-color($blue, 80%) pre-computation Bootstrap uses for soft accent variants is not evaluated by this pipeline — we substitute an OKLCH approximation of that lightness/chroma."
    };
  }
};

function pickByPrefix(values, prefix) {
  const out = {};
  for (const [k, v] of Object.entries(values)) {
    if (k.startsWith(prefix)) {
      const step = k.slice(prefix.length);
      if (/^\d+$/.test(step)) out[step] = v;
    }
  }
  return out;
}
