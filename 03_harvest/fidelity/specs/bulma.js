/**
 * Bulma — _initial-variables.sass / _initial-variables.scss
 */

export default {
  fetch: {
    urls: [
      "https://raw.githubusercontent.com/jgthms/bulma/main/sass/utilities/initial-variables.scss",
      "https://raw.githubusercontent.com/jgthms/bulma/master/sass/utilities/initial-variables.sass"
    ],
    format: "scss",
    commit: "main"
  },
  harvestNotes:
    "Bulma initial-variables.scss extracted byte-faithfully. Turquoise primary + greyscale ramp. Hex source converted to OKLCH via culori.",
  map(values) {
    return {
      base: {
        white: { 0: values["white"] ?? "oklch(100% 0 0)" },
        black: { 0: values["black"] ?? "oklch(0% 0 0)" },
        grey: {
          lighter: values["grey-lighter"],
          light: values["grey-light"],
          base: values["grey"],
          dark: values["grey-dark"],
          darker: values["grey-darker"]
        },
        turquoise: { base: values["turquoise"] },
        cyan: { base: values["cyan"] },
        green: { base: values["green"] },
        yellow: { base: values["yellow"] },
        orange: { base: values["orange"] },
        red: { base: values["red"] },
        blue: { base: values["blue"] }
      },
      notes:
        "Bulma's neutral ramp uses semantic stops (lighter/light/grey/dark/darker) rather than numeric. Status colours map: critical = red, success = green, warning = yellow, info = cyan; accent = turquoise."
    };
  }
};
