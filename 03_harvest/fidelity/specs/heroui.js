/**
 * HeroUI (NextUI successor) — Method A (TS).
 */
export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/heroui-inc/heroui/main/packages/core/theme/src/colors/semantic.ts"
    ],
    format: "ts",
    commit: "main"
  },
  harvestNotes:
    "HeroUI semantic colour tokens from packages/core/theme/src/colors/semantic.ts.",
  map(values) {
    return {
      base: {
        heroui: values,
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "HeroUI's semantic palette flattened onto base.heroui.{name}. Default light theme: background = white, foreground = neutral-900 (zinc-style), primary = purple-ish #7828c8 per HeroUI's brand."
    };
  }
};
