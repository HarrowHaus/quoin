/**
 * Phase 0.5-extension validation.
 *
 * Loads the four new reference packs (theme / template / pattern / icon)
 * through the compiler's loaders and asserts:
 *
 *   - All four manifests pass the JSON-Schema validator.
 *   - theme-baseline-reference exposes light + dark + p3 override maps.
 *   - pattern-button-reference declares the required state +
 *     microState matrix and primitive.
 *   - icons-reference loads 5 SVG glyphs and exposes them by name.
 *   - template-blank-reference declares dependencies + pages and a
 *     valid quoin.config.json.
 *   - Cross-composition: token + vocab + pattern + theme + icons all
 *     compose through compile() without throwing on a representative
 *     source string.
 *
 * Exit code 0 on success, 1 on any failure. Designed to be runnable
 * with `node validate-extension.js` from this directory.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPILER_DIST = path.resolve(__dirname, "..", "01_compiler", "dist");
const url = (p) => pathToFileURL(p).href;

const { compile } = await import(url(path.join(COMPILER_DIST, "compiler.js")));
const {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack,
  loadThemePack,
  loadPatternPack,
  loadIconPack
} = await import(url(path.join(COMPILER_DIST, "pack-loader.js")));

const HERE = (p) => path.resolve(__dirname, p);

const failures = [];
function fail(msg) {
  failures.push(msg);
  console.error("FAIL  " + msg);
}
function ok(msg) {
  console.log("ok    " + msg);
}

async function main() {
  // Load all packs in parallel.
  const [tokens, vEssentials, implTailwind, theme, pattern, icons] =
    await Promise.all([
      loadTokenPack(HERE("tokens-baseline")),
      loadVocabularyPack(HERE("vocab-essentials")),
      loadImplementationPack(HERE("impl-tailwind")),
      loadThemePack(HERE("theme-baseline-reference")),
      loadPatternPack(HERE("pattern-button-reference")),
      loadIconPack(HERE("icons-reference"))
    ]);

  ok(`loaded ${theme.manifest.name}@${theme.manifest.version}`);
  ok(`loaded ${pattern.manifest.name}@${pattern.manifest.version}`);
  ok(`loaded ${icons.manifest.name}@${icons.manifest.version}`);

  // Theme assertions.
  if (Object.keys(theme.lightModeOverrides).length === 0) {
    fail("theme: lightModeOverrides is empty");
  } else {
    ok(`theme: ${Object.keys(theme.lightModeOverrides).length} light override(s)`);
  }
  if (!theme.darkModeOverrides) fail("theme: missing darkModeOverrides");
  else ok(`theme: ${Object.keys(theme.darkModeOverrides).length} dark override(s)`);
  if (!theme.p3WideGamutOverrides) fail("theme: missing p3WideGamutOverrides");
  else ok(`theme: ${Object.keys(theme.p3WideGamutOverrides).length} p3 override(s)`);

  // Pattern assertions.
  if (!pattern.states.includes("default")) fail("pattern: states missing 'default'");
  else ok(`pattern: states includes 'default' (${pattern.states.length} states)`);
  if (!pattern.microStates.includes("default") || !pattern.microStates.includes("focus")) {
    fail("pattern: microStates must include 'default' and 'focus'");
  } else {
    ok(`pattern: microStates includes default + focus (${pattern.microStates.length} total)`);
  }
  if (!pattern.primitives["action-button"]) {
    fail("pattern: missing primitive 'action-button'");
  } else {
    ok("pattern: <action-button> primitive registered");
  }

  // Icon assertions.
  const expectedIcons = ["home", "search", "chevron-down", "x", "check"];
  for (const name of expectedIcons) {
    if (!icons.icons[name]) fail(`icons: missing '${name}'`);
    else if (!icons.icons[name].includes("<svg")) {
      fail(`icons: '${name}' is not a valid SVG`);
    } else {
      ok(`icons: '${name}' loaded (${icons.icons[name].length} chars)`);
    }
  }
  // Alias check.
  if (!icons.icons["house"]) fail("icons: alias 'house' for 'home' not resolved");
  else ok("icons: alias 'house' → 'home' resolves");
  if (icons.semanticTag !== "icon") fail(`icons: semanticTag = ${icons.semanticTag}, expected 'icon'`);
  else ok(`icons: semanticTag = 'icon'`);
  if (icons.shortName !== "reference") fail(`icons: shortName = ${icons.shortName}, expected 'reference'`);
  else ok(`icons: shortName = 'reference'`);

  // Template assertions (no runtime loader — verify by reading manifest + config).
  const templateRoot = HERE("template-blank-reference");
  const templateManifest = JSON.parse(
    await fs.readFile(path.join(templateRoot, "quoin.pack.json"), "utf8")
  );
  if (templateManifest.type !== "template") fail("template: type !== 'template'");
  else ok("template: manifest type = 'template'");
  if (!Array.isArray(templateManifest.pages) || templateManifest.pages.length === 0) {
    fail("template: pages must be a non-empty array");
  } else {
    ok(`template: ${templateManifest.pages.length} page(s) declared`);
  }
  for (const page of templateManifest.pages) {
    const pagePath = path.join(templateRoot, "pages", `${page}.qm.html`);
    try {
      await fs.access(pagePath);
      ok(`template: pages/${page}.qm.html exists`);
    } catch {
      fail(`template: pages/${page}.qm.html missing`);
    }
  }
  if (
    !templateManifest.dependencies ||
    !templateManifest.dependencies.tokenPack ||
    !templateManifest.dependencies.implementationPack ||
    !Array.isArray(templateManifest.dependencies.vocabularyPacks)
  ) {
    fail("template: dependencies must declare tokenPack + implementationPack + vocabularyPacks");
  } else {
    ok("template: required dependencies declared");
  }
  const templateConfig = JSON.parse(
    await fs.readFile(path.join(templateRoot, "quoin.config.json"), "utf8")
  );
  if (templateConfig.tokenPack !== templateManifest.dependencies.tokenPack) {
    fail("template: quoin.config.json tokenPack does not match manifest");
  } else {
    ok("template: quoin.config.json aligned with manifest dependencies");
  }

  // Composition smoke test: render a representative source.
  const source = `
    <icon name="home" size="md" />
    <action-button intent="primary">Save</action-button>
  `;
  try {
    const result = compile({
      source,
      tokenPack: tokens,
      vocabularyPacks: [vEssentials],
      patternPacks: [pattern],
      iconPacks: [icons],
      themePack: theme,
      implementationPack: implTailwind
    });
    if (result.html.includes("<action-button")) {
      fail("composition: <action-button> tag survived compilation");
    } else if (!result.html.includes("<svg")) {
      fail("composition: <icon> did not resolve to inlined <svg>");
    } else {
      ok("composition: token + vocab + pattern + theme + icons compile cleanly");
    }
  } catch (err) {
    fail(`composition: ${err.message}`);
  }

  // Negative test: icon name that doesn't exist must throw MISSING_ICON.
  try {
    compile({
      source: '<icon name="does-not-exist" />',
      tokenPack: tokens,
      vocabularyPacks: [vEssentials],
      iconPacks: [icons],
      implementationPack: implTailwind
    });
    fail("icons: missing icon name did not throw");
  } catch (err) {
    if (err.code === "MISSING_ICON") {
      ok("icons: missing icon name throws MISSING_ICON");
    } else {
      fail(`icons: expected MISSING_ICON, got ${err.code ?? err.message}`);
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log("\nAll Phase 0.5-extension checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
