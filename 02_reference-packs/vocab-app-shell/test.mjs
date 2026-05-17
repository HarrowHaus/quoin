#!/usr/bin/env node
/**
 * Smoke test for vocab-app-shell. Compiles a canonical app-shell page
 * against the Phase 1 compiler + impl-tailwind and asserts:
 *   - zero Quoin tags survive
 *   - all 5 new primitives emit something
 *   - the grid-template-areas inline style appears on the shell
 *
 * Run:  node 02_reference-packs/vocab-app-shell/test.mjs
 */

import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LAB_ROOT = path.resolve(__dirname, "..", "..");
const COMPILER = path.resolve(LAB_ROOT, "01_compiler", "dist");
const REF = path.resolve(LAB_ROOT, "02_reference-packs");

const url = (p) => pathToFileURL(p).href;
const { compile } = await import(url(path.join(COMPILER, "compiler.js")));
const { loadTokenPack, loadVocabularyPack, loadImplementationPack } =
  await import(url(path.join(COMPILER, "pack-loader.js")));

const [tokenPack, vEd, vDb, vEss, vShell, impl] = await Promise.all([
  loadTokenPack(path.join(REF, "tokens-baseline")),
  loadVocabularyPack(path.join(REF, "vocab-editorial")),
  loadVocabularyPack(path.join(REF, "vocab-dashboard")),
  loadVocabularyPack(path.join(REF, "vocab-essentials")),
  loadVocabularyPack(path.join(REF, "vocab-app-shell")),
  loadImplementationPack(path.join(REF, "impl-tailwind"))
]);

const SOURCE = `
<app-shell nav-position="left" command-bar="true">
  <command-bar>
    <a href="/">Acme</a>
    <input-cell type="search" placeholder="Search…"></input-cell>
    <cluster>
      <secondary-action>Invite</secondary-action>
      <primary-action>New project</primary-action>
    </cluster>
  </command-bar>

  <sidebar-nav width="comfortable">
    <stack>
      <recede-block>Workspace</recede-block>
      <a href="/dashboard">Dashboard</a>
      <a href="/projects">Projects</a>
      <a href="/team">Team</a>
    </stack>
    <stack>
      <recede-block>Settings</recede-block>
      <a href="/billing">Billing</a>
      <a href="/account">Account</a>
    </stack>
  </sidebar-nav>

  <content-region>
    <page-header>
      <breadcrumb-trail>
        <a href="/">Acme</a><span>/</span><span>Projects</span>
      </breadcrumb-trail>
      <authority-mark>Projects</authority-mark>
      <lead-graf>Eight active. Two awaiting review.</lead-graf>
    </page-header>

    <columns ratio="1:1:1">
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display)">12</div>
        <recede-block>active jobs</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display)">3</div>
        <recede-block>queue depth</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display)">1</div>
        <recede-block>open alert</recede-block>
      </stat-display>
    </columns>

    <alert-band intent="warning">Build cache reduced. Next build may be slow.</alert-band>
  </content-region>
</app-shell>
`;

const result = compile({
  source: SOURCE,
  tokenPack,
  vocabularyPacks: [vEd, vDb, vEss, vShell],
  implementationPack: impl,
  filename: "vocab-app-shell/test.mjs"
});

const fails = [];
const ok = (msg) => console.log("ok    " + msg);
const fail = (msg) => { fails.push(msg); console.error("FAIL  " + msg); };

const tags = ["app-shell", "command-bar", "sidebar-nav", "content-region", "page-header"];
for (const t of tags) {
  if (result.html.includes(`<${t}`)) fail(`<${t}> survived compilation`);
  else ok(`<${t}> compiled away`);
}

if (!result.html.includes('grid-template-areas')) {
  fail("expected grid-template-areas inline style on <app-shell>");
} else {
  ok("grid-template-areas inline style present");
}
if (!result.html.includes('grid-area: cmd')) fail("expected grid-area: cmd on <command-bar>");
else ok("grid-area: cmd present");
if (!result.html.includes('grid-area: side')) fail("expected grid-area: side on <sidebar-nav>");
else ok("grid-area: side present");
if (!result.html.includes('grid-area: main')) fail("expected grid-area: main on <content-region>");
else ok("grid-area: main present");

console.log(`\n${result.html.length} bytes emitted, ${result.warnings.length} warnings`);

if (fails.length > 0) {
  console.error(`\n${fails.length} failure(s)`);
  process.exit(1);
}
console.log("vocab-app-shell smoke test passed.");
