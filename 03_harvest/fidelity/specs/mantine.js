/**
 * Mantine v7 — packages/@mantine/core/src/core/MantineProvider/default-colors.ts.
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/mantinedev/mantine/master/packages/%40mantine/core/src/core/MantineProvider/default-colors.ts"
    ],
    format: "ts",
    commit: "master"
  },
  harvestNotes:
    "Mantine v7 default palette (blue accent at step 6). Each colour ramp is a 10-entry hex array.",
  map(values) {
    // Mantine's TS array form gives us paths like
    // `DEFAULT_COLORS.gray.0`, `DEFAULT_COLORS.blue.6`. Lift to bare
    // `gray.0`, `blue.6` so existing semantic refs resolve.
    const lift = (name) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        // Match the family at any depth — handles both bare `gray.0`
        // and scoped `DEFAULT_COLORS.gray.0` after the parser update.
        const re = new RegExp(`(?:^|\\.)${name}\\.(\\d+)$`);
        const m = k.match(re);
        if (m) out[m[1]] = v;
      }
      return out;
    };
    return {
      base: {
        gray: lift("gray"),
        blue: lift("blue"),
        red: lift("red"),
        green: lift("green"),
        yellow: lift("yellow"),
        orange: lift("orange"),
        cyan: lift("cyan"),
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "Mantine 10-step ramps (indices 0-9) extracted verbatim from default-colors.ts. The 'primaryShade' default is 6 (light theme); accent = blue.6 per Mantine's own convention."
    };
  }
};
