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
  scanObject(cleaned, [], out);
  return out;
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
    const line = raw.replace(/#.*$/, "");
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

export const PARSERS = {
  scss: parseScssVars,
  "css-vars": parseCssVars,
  js: parseJsObject,
  ts: parseJsObject,
  dtcg: parseDtcg,
  yaml: parseYaml,
  "style-dictionary": parseStyleDictionary
};
