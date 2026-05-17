/**
 * Kiwi.com Orbit — Method C (per-file palette JSON).
 *
 * Orbit ships each colour family as a JSON file under
 * packages/orbit-design-tokens/src/dictionary/definitions/foundation/
 * palette/. Each file has a `foundation.palette.{name}.{step}.value`
 * structure that the style-dictionary parser handles.
 */

const BASE =
  "https://raw.githubusercontent.com/kiwicom/orbit/master/packages/orbit-design-tokens/src/dictionary/definitions/foundation/palette/";

export default {
  fetch: { commit: "master" },
  harvestNotes:
    "Orbit foundation palette extracted per-file from kiwicom/orbit packages/orbit-design-tokens/src/dictionary/definitions/foundation/palette/. Each colour ships as a style-dictionary JSON with hex values.",
  files: [
    { name: "blue", namespace: "blue", url: `${BASE}blue.json`, format: "style-dictionary" },
    { name: "red", namespace: "red", url: `${BASE}red.json`, format: "style-dictionary" },
    { name: "green", namespace: "green", url: `${BASE}green.json`, format: "style-dictionary" },
    { name: "orange", namespace: "orange", url: `${BASE}orange.json`, format: "style-dictionary" },
    { name: "ink", namespace: "ink", url: `${BASE}ink.json`, format: "style-dictionary" },
    { name: "cloud", namespace: "cloud", url: `${BASE}cloud.json`, format: "style-dictionary" },
    { name: "white", namespace: "white", url: `${BASE}white.json`, format: "style-dictionary" }
  ],
  map(values) {
    const pick = (family) => {
      const out = {};
      for (const [k, v] of Object.entries(values)) {
        // Keys arrive as `blue.foundation.palette.blue.dark`, etc.
        const m = k.match(new RegExp(`^${family}\\.foundation\\.palette\\.${family}\\.(.+)$`));
        if (m) out[m[1]] = v;
      }
      return out;
    };
    return {
      base: {
        blue: pick("blue"),
        red: pick("red"),
        green: pick("green"),
        orange: pick("orange"),
        ink: pick("ink"),
        cloud: pick("cloud"),
        white: pick("white").normal ? pick("white") : { 0: "oklch(100% 0 0)" }
      },
      notes:
        "Orbit uses semantic step names (normal, dark, darker, hover, light, lighter, lightest, lightHover, lightActive, etc.) rather than numeric. Mapping: surface = cloud.light, surface-recessed = cloud.normal, text = ink.dark, accent = blue.normal (#0172cb), critical = red.normal, success = green.normal, warning = orange.normal."
    };
  }
};
