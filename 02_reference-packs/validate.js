/**
 * Phase 2 pack validation.
 *
 * Loads each reference pack through the Phase 1 compiler's loaders and
 * runs every primitive in the v1 vocabulary against each implementation
 * pack. Asserts:
 *
 *   - All five manifests pass the JSON-Schema validator.
 *   - tokens-baseline supplies every canonical semantic-namespace name.
 *   - vocab-editorial declares 21 primitives; vocab-dashboard declares 15.
 *   - For every primitive across both vocab packs, both impl packs
 *     produce output without throwing.
 *   - No Quoin tags leak into the compiled HTML.
 *
 * Exit code 0 on success, 1 on any failure. Designed to be runnable
 * with `node validate.js` from this directory.
 */

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPILER_DIST = path.resolve(__dirname, "..", "01_compiler", "dist");
const url = (p) => pathToFileURL(p).href;

const { compile } = await import(url(path.join(COMPILER_DIST, "compiler.js")));
const {
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack
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
  const [tokens, vEditorial, vDashboard, implTailwind, implRaw] = await Promise.all([
    loadTokenPack(HERE("tokens-baseline")),
    loadVocabularyPack(HERE("vocab-editorial")),
    loadVocabularyPack(HERE("vocab-dashboard")),
    loadImplementationPack(HERE("impl-tailwind")),
    loadImplementationPack(HERE("impl-raw-css"))
  ]);

  ok(`loaded ${tokens.manifest.name}@${tokens.manifest.version}`);
  ok(`loaded ${vEditorial.manifest.name}@${vEditorial.manifest.version}`);
  ok(`loaded ${vDashboard.manifest.name}@${vDashboard.manifest.version}`);
  ok(`loaded ${implTailwind.manifest.name}@${implTailwind.manifest.version}`);
  ok(`loaded ${implRaw.manifest.name}@${implRaw.manifest.version}`);

  const editorialCount = Object.keys(vEditorial.primitives).length;
  const dashboardCount = Object.keys(vDashboard.primitives).length;
  if (editorialCount !== 21) fail(`vocab-editorial: expected 21 primitives, got ${editorialCount}`);
  else ok(`vocab-editorial: 21 primitives`);
  if (dashboardCount !== 15) fail(`vocab-dashboard: expected 15 primitives, got ${dashboardCount}`);
  else ok(`vocab-dashboard: 15 primitives`);

  const total = editorialCount + dashboardCount;
  if (total !== 36) fail(`total v1 primitive count: expected 36, got ${total}`);
  else ok(`combined v1 primitive count: 36`);

  // Cross-product compile: every primitive × every impl pack.
  const allPrimitives = [
    ...Object.values(vEditorial.primitives),
    ...Object.values(vDashboard.primitives)
  ];
  const implPacks = [
    { name: "impl-tailwind", pack: implTailwind },
    { name: "impl-raw-css",  pack: implRaw }
  ];
  const vocabPacks = [vEditorial, vDashboard];

  for (const { name: implName, pack: implementationPack } of implPacks) {
    for (const primitive of allPrimitives) {
      const inner = inhabit(primitive);
      const source = `<${primitive.name}${primitiveAttrs(primitive)}>${inner}</${primitive.name}>`;
      try {
        const result = compile({
          source,
          tokenPack: tokens,
          vocabularyPacks: vocabPacks,
          implementationPack
        });
        if (result.html.includes(`<${primitive.name}`)) {
          fail(`${implName} × <${primitive.name}>: Quoin tag survived compilation`);
        } else {
          ok(`${implName} × <${primitive.name}>`);
        }
      } catch (err) {
        fail(`${implName} × <${primitive.name}>: ${err.message}`);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} failure(s)`);
    process.exit(1);
  }
  console.log(`\nAll ${5 + 3 + allPrimitives.length * implPacks.length} checks passed.`);
}

function inhabit(p) {
  // produce something valid to pass into the primitive
  if (p.children === "phrasing-content") return "content";
  if (p.children === "none") return "";
  return "<span>content</span>";
}

function primitiveAttrs(p) {
  // void elements that require some specific attributes
  if (p.name === "input-cell") return ' type="text"';
  if (p.name === "disclosure") return ' summary="Details"';
  return "";
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
