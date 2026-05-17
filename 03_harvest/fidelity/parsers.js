/**
 * Format-specific token-value parsers used by the fidelity extractor.
 *
 * Each parser takes the raw text of an upstream source file and
 * returns a flat record of `{ name: rawValueString }`. The names use
 * whatever convention the source uses (SCSS variable name, CSS custom
 * property, JS property key, DTCG path). The mapping step in
 * extract.js translates those names onto the canonical Quoin base
 * palette structure.
 *
 * Each parser is intentionally narrow — handle the format the way
 * it's actually written upstream, don't try to be universal. Failures
 * return an empty record so the caller can fall back to Tier C.
 */

/**
 * SCSS variable declarations:  `$color-name: #hex;`
 * Also tolerates `$color-name: rgb(...);` and the like.
 */
export function parseScssVars(text) {
  const out = {};
  const re = /\$([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const name = m[1].trim();
    const value = stripScssSuffixes(stripComments(m[2])).trim();
    if (isColorish(value)) out[name] = value;
  }
  return out;
}

function stripScssSuffixes(s) {
  // Strip !default / !important and any trailing keyword fragments
  return s.replace(/!(default|important|global)\b/g, "").trim();
}

/**
 * CSS custom properties:  `--name: #hex;`  inside :root or anywhere.
 */
export function parseCssVars(text) {
  const out = {};
  const re = /--([a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const name = m[1].trim();
    const value = stripComments(m[2]).trim();
    if (isColorish(value)) out[name] = value;
  }
  return out;
}

/**
 * JS / TS object-literal exports. Handles:
 *   `name: '#hex'`
 *   `name: "#hex"`
 *   `name: \`#hex\``
 *   `name: ['#hex', '#hex', ...]` (array form; entries flatten as name.0, name.1, ...)
 *   nested `{ ... }` objects (path-joined as parentKey.subKey)
 *
 * Strategy: regex-driven scan for `key:` followed by either a quoted
 * string, an array literal of strings, or `{` to nest.
 */
export function parseJsObject(text) {
  const cleaned = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/[^\n]*/g, "$1");

  const out = {};
  // Top-level `export const X = { ... }` or `const X = { ... }` blocks
  // scope their inner contents under the constant name.
  const exportRe =
    /(?:export\s+)?const\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?::\s*[^=]+)?=\s*\{/g;
  let m;
  const consumed = [];
  while ((m = exportRe.exec(cleaned)) !== null) {
    const name = m[1];
    const startBody = m.index + m[0].length;
    const endBody = findMatchingBrace(cleaned, startBody);
    if (endBody === -1) continue;
    const body = cleaned.slice(startBody, endBody);
    scanObject(body, [name], out);
    consumed.push([m.index, endBody + 1]);
  }
  // Whatever was outside `export const X = { ... }` — scan with no
  // outer scope so loose pattern files (no top-level wrappers) still
  // pick up correctly.
  let scanned = cleaned;
  for (const [s, e] of consumed.slice().reverse()) {
    scanned = scanned.slice(0, s) + " ".repeat(e - s) + scanned.slice(e);
  }
  scanObject(scanned, [], out);
  return out;
}

function findMatchingBrace(text, start) {
  let depth = 1;
  let i = start;
  let inStr = null;
  while (i < text.length) {
    const ch = text[i];
    if (inStr) {
      if (ch === "\\") { i += 2; continue; }
      if (ch === inStr) inStr = null;
      i++;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === "`") {
      inStr = ch;
      i++;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

function scanObject(text, path, out) {
  // Find every `key:` followed by a value of interest. Doesn't try to
  // track brace depth perfectly — we use a key-and-array regex pass.
  const keyValueRe =
    /(?:^|[\s{,;])(['"`]?)([a-zA-Z0-9_$-]+)\1\s*:\s*(['"`])((?:\\.|(?!\3).)*)\3/g;
  let m;
  while ((m = keyValueRe.exec(text)) !== null) {
    const key = m[2];
    const value = m[4];
    if (isColorish(value)) {
      out[[...path, key].join(".")] = value.trim();
    }
  }

  // Array form:  `name: [ '#hex', '#hex', ... ]`
  const arrayRe = /(?:^|[\s{,;])(['"`]?)([a-zA-Z0-9_$-]+)\1\s*:\s*\[([^\]]*)\]/g;
  while ((m = arrayRe.exec(text)) !== null) {
    const key = m[2];
    const body = m[3];
    const items = body.match(/(['"`])((?:\\.|(?!\1).)*)\1/g);
    if (!items) continue;
    items.forEach((it, idx) => {
      const v = it.slice(1, -1);
      if (isColorish(v)) {
        out[[...path, key, String(idx)].join(".")] = v.trim();
      }
    });
  }
}

/**
 * DTCG JSON: `{ "color": { "name": { "$value": "#hex", "$type": "color" } } }`
 * Flattens to `color.name -> #hex`.
 */
export function parseDtcg(text) {
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    return {};
  }
  const out = {};
  const walk = (node, prefix) => {
    if (!node || typeof node !== "object") return;
    if ("$value" in node && typeof node.$value === "string") {
      if (isColorish(node.$value)) {
        out[prefix.slice(1)] = node.$value;
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith("$")) continue;
      walk(v, `${prefix}.${k}`);
    }
  };
  walk(json, "");
  return out;
}

/**
 * YAML token files used by Salesforce / Twilio Paste etc.
 * Naive parser: collects `name: value` lines where value is colorish.
 * Tracks indentation to produce path-prefixed names.
 */
export function parseYaml(text) {
  const out = {};
  const lines = text.split(/\r?\n/);
  const stack = []; // { indent, key }
  for (const raw of lines) {
    // Strip `# comment` but never inside a quoted string, and never
    // when the `#` is a hex-color value sigil (starts with `#` then
    // 3-8 hex chars).
    let line = raw;
    // Conservative: only strip comments when `#` is preceded by
    // whitespace and not immediately followed by hex digits.
    line = line.replace(/(^|\s)#(?![0-9a-fA-F]{3,8}\b)[^\n]*$/, "$1");
    if (!line.trim()) continue;
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    while (stack.length && stack[stack.length - 1].indent >= indent) stack.pop();
    const kv = line.trim().match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    const valueRaw = kv[2].replace(/^["']|["']$/g, "").trim();
    if (!valueRaw) {
      // group header
      stack.push({ indent, key });
      continue;
    }
    if (isColorish(valueRaw)) {
      const path = [...stack.map((s) => s.key), key].join(".");
      out[path] = valueRaw;
    }
  }
  return out;
}

/**
 * Style Dictionary configs are DTCG-ish but sometimes use `value`
 * (without $) and nested category/type/item structure.
 */
export function parseStyleDictionary(text) {
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    return {};
  }
  const out = {};
  const walk = (node, prefix) => {
    if (!node || typeof node !== "object") return;
    if ("value" in node && typeof node.value === "string") {
      if (isColorish(node.value)) out[prefix.slice(1)] = node.value;
      return;
    }
    if ("$value" in node && typeof node.$value === "string") {
      if (isColorish(node.$value)) out[prefix.slice(1)] = node.$value;
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (k.startsWith("$")) continue;
      walk(v, `${prefix}.${k}`);
    }
  };
  walk(json, "");
  return out;
}

function stripComments(s) {
  return s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/, "");
}

function isColorish(value) {
  if (typeof value !== "string") return false;
  const v = value.trim();
  return (
    /^#[0-9a-fA-F]{3,8}$/.test(v) ||
    /^rgba?\(/i.test(v) ||
    /^hsla?\(/i.test(v) ||
    /^oklch\(/i.test(v) ||
    /^oklab\(/i.test(v)
  );
}

/**
 * Primer json5 — nested `name: { $value: { hex: '#xxx' } }` shape.
 * Walks the token tree and emits `dotted.path: '#hex'`.
 * Tolerates the comment and `'string-key'` syntax of json5.
 */
export function parsePrimerJson5(text) {
  // Strip comments to make the file parseable.
  const cleaned = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/[^\n]*/g, "$1");
  const out = {};
  // The grammar we care about: `key: { $value: { hex: '#hex' } }` or
  // `key: { $value: '#hex' }`. Use a regex pass after cleaning.
  // First catch `hex: '#xxxxxx'` and walk backwards to find the
  // containing token name.
  const lines = cleaned.split(/\r?\n/);
  const pathStack = [];
  const indent = (s) => s.match(/^\s*/)[0].length;
  let lastIndent = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;
    const ind = indent(line);
    // Pop stack as indentation drops.
    while (pathStack.length && pathStack[pathStack.length - 1].indent >= ind) {
      pathStack.pop();
    }
    // `keyName: {`  → push
    const open = trimmed.match(/^['"]?([a-zA-Z0-9_$-]+)['"]?\s*:\s*\{/);
    if (open) {
      pathStack.push({ key: open[1], indent: ind });
      lastIndent = ind;
      continue;
    }
    // `hex: '#xxx',` — emit at current path (minus $extensions/etc internals)
    const hex = trimmed.match(/^hex\s*:\s*['"]?(#[0-9a-fA-F]{3,8})['"]?/);
    if (hex) {
      // Find the nearest containing token name. The path looks like
      //   [base, color, black, $value]
      // We want `base.color.black`. Drop any segments that start with $.
      const clean = pathStack
        .filter((p) => !p.key.startsWith("$"))
        .map((p) => p.key);
      if (clean.length >= 2) {
        out[clean.join(".")] = hex[1];
      }
      continue;
    }
    // `key: '#hex'` (direct hex assignment, without nested $value)
    const direct = trimmed.match(/^['"]?([a-zA-Z0-9_$-]+)['"]?\s*:\s*['"]?(#[0-9a-fA-F]{3,8})['"]?/);
    if (direct) {
      const clean = pathStack
        .filter((p) => !p.key.startsWith("$"))
        .map((p) => p.key);
      out[[...clean, direct[1]].join(".")] = direct[2];
    }
  }
  return out;
}

/**
 * Chakra v3 / Style Dictionary style `{ name: { value: '#hex' } }`.
 * Walks an indented JS/TS source emitting `path.to.name: '#hex'`
 * whenever it finds a `value: '#hex'` (or `value: "rgba..."`) entry.
 * Drops the literal `value` segment from the path.
 */
export function parseValueWrappedTs(text) {
  const cleaned = text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/[^\n]*/g, "$1");
  const out = {};
  // Strategy 1: single-line pattern `name: { value: '#hex' }`.
  const singleLineRe =
    /(['"]?)([a-zA-Z0-9_$-]+)\1\s*:\s*\{\s*value\s*:\s*(['"`])([^'"`]+)\3\s*\}/g;
  // Track parent key context by walking line-by-line, since the
  // single-line regex doesn't know nesting.
  const lines = cleaned.split(/\r?\n/);
  const indent = (s) => s.match(/^\s*/)[0].length;
  const pathStack = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const ind = indent(line);
    while (pathStack.length && pathStack[pathStack.length - 1].indent >= ind) {
      pathStack.pop();
    }
    // Single-line match wins if present
    let any = false;
    let m;
    singleLineRe.lastIndex = 0;
    while ((m = singleLineRe.exec(line)) !== null) {
      const key = m[2];
      const value = m[4];
      if (isColorish(value)) {
        const path = [...pathStack.map((p) => p.key), key];
        out[path.join(".")] = value;
        any = true;
      }
    }
    if (any) continue;
    // Otherwise multi-line: check for `key: {` opener
    const openMulti = trimmed.match(/^['"]?([a-zA-Z0-9_$-]+)['"]?\s*:\s*\{\s*$/);
    if (openMulti) {
      pathStack.push({ key: openMulti[1], indent: ind });
      continue;
    }
    // Multi-line `value: '#hex'` inside open block
    const v = trimmed.match(/^value\s*:\s*['"`]([^'"`]+)['"`]/);
    if (v && isColorish(v[1])) {
      const path = pathStack.map((p) => p.key).filter((k) => k !== "value");
      if (path.length) out[path.join(".")] = v[1];
    }
  }
  return out;
}

export const PARSERS = {
  scss: parseScssVars,
  "css-vars": parseCssVars,
  js: parseJsObject,
  ts: parseJsObject,
  dtcg: parseDtcg,
  yaml: parseYaml,
  "style-dictionary": parseStyleDictionary,
  "primer-json5": parsePrimerJson5,
  "value-wrapped-ts": parseValueWrappedTs
};
