/**
 * IBM Carbon — Method B (algorithm/static via @carbon/colors).
 *
 * The npm package @carbon/colors ships the canonical Carbon palette
 * as named exports. Each colour family is a `{ '10': '#hex', '20':
 * '#hex', ... '100': '#hex' }` object. We read the static exports —
 * no algorithm execution, just per-family direct read. This is
 * Method C in spirit (per-family namespacing) but expressed via the
 * algorithm hook because we're reading the npm package.
 */

import {
  blue,
  cyan,
  gray,
  coolGray,
  warmGray,
  green,
  magenta,
  orange,
  purple,
  red,
  teal,
  yellow
} from "@carbon/colors";

const FAMILIES = { blue, cyan, gray, coolGray, warmGray, green, magenta, orange, purple, red, teal, yellow };

export default {
  harvestNotes:
    "Values read byte-faithfully from @carbon/colors. Each Carbon colour family ships as a `{10..100}` step object. The white-theme accent is Carbon's Blue 60 per IBM's documentation.",
  async algorithm() {
    const out = {};
    for (const [name, family] of Object.entries(FAMILIES)) {
      for (const [step, hex] of Object.entries(family)) {
        out[`${name}.${step}`] = hex;
      }
    }
    return {
      rawValues: out,
      library: "@carbon/colors",
      version: "11.51.0",
      inputs: "package default exports (Carbon canonical palette)"
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
        gray: pick("gray"),
        blue: pick("blue"),
        red: pick("red"),
        green: pick("green"),
        yellow: pick("yellow"),
        orange: pick("orange"),
        purple: pick("purple"),
        teal: pick("teal"),
        cyan: pick("cyan"),
        magenta: pick("magenta"),
        white: { 0: "oklch(100% 0 0)" },
        black: { 100: "oklch(0% 0 0)" }
      },
      notes:
        "Carbon white theme mapping: surface = white, surface-recessed = gray.10, surface-inverse = gray.100, text = gray.100, accent = blue.60, critical = red.60, success = green.50, warning = yellow.30, info = blue.60. Carbon's interactive state tokens (hover/active/visited) are not modelled — Quoin's impl pack handles interaction states."
    };
  }
};
