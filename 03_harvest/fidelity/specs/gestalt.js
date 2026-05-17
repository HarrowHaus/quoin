/**
 * Pinterest Gestalt — Method A (DTCG-like JSON).
 */
export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/pinterest/gestalt/master/packages/gestalt-design-tokens/tokens/classic/base-color.json"
    ],
    format: "style-dictionary",
    commit: "master"
  },
  harvestNotes:
    "Pinterest Gestalt classic base-color tokens extracted from packages/gestalt-design-tokens/tokens/classic/base-color.json. Style Dictionary–shaped JSON with named colour scales (red pushpin, pink flaminglow, etc.).",
  map(values) {
    return {
      base: {
        gestalt: values,
        white: { 0: "oklch(100% 0 0)" }
      },
      notes:
        "Gestalt names Pinterest-specific (pushpin red, flaminglow pink, ai blue, masala beige, etc.). Mapping: surface = white, text = darkGray, accent = pushpin.450 (Pinterest red), critical = pushpin.500."
    };
  }
};
