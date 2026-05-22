#!/usr/bin/env node
/**
 * Quoin MCP server — exposes the USML 2026.05 reference implementation's
 * catalog as MCP resources and tools for AI coding agents.
 *
 * Transport: stdio (the dominant MCP transport for local agent integration).
 *
 * Resources:
 *   quoin://patterns/<name>      → the pack manifest JSON for a pattern
 *   quoin://primitives/<name>    → the pack manifest JSON for a content primitive
 *   quoin://aesthetics/<name>    → the pack manifest JSON for an aesthetic pack
 *   quoin://templates/<name>     → the template manifest JSON
 *
 * Tools:
 *   find_pattern(query: string)  → fuzzy-match catalog items by name/description
 *
 * Read-only and stateless in v0.1.0. Future versions may add write operations
 * and embedding-based semantic search.
 *
 * Phase 24.1.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// ──────────────────────────────────────────────────────────────────────
// Catalog discovery.
// ──────────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
// The MCP server, when installed via npm, runs alongside the catalog. The
// catalog root is two levels up from /mcp/ when in the repo, but when
// installed via npm into a consumer's node_modules, the catalog ships in
// the parent @harrow-haus/quoin package. We resolve by environment override
// (QUOIN_CATALOG_ROOT) or by trying common relative paths.

function resolveCatalogRoot() {
  if (process.env.QUOIN_CATALOG_ROOT) {
    return resolve(process.env.QUOIN_CATALOG_ROOT);
  }
  // Try ../  (in-repo: mcp/ → quoin/)
  const repoRoot = resolve(__dirname, '..');
  if (existsSync(join(repoRoot, 'patterns')) && existsSync(join(repoRoot, 'aesthetics'))) {
    return repoRoot;
  }
  // Try ../@harrow-haus/quoin (installed alongside the main package)
  const sibling = resolve(__dirname, '..', '@harrow-haus', 'quoin');
  if (existsSync(join(sibling, 'patterns'))) return sibling;
  // Try parent's parent (./node_modules/@harrow-haus/quoin-mcp → up to root)
  const consumerRoot = resolve(__dirname, '..', '..');
  if (existsSync(join(consumerRoot, 'patterns'))) return consumerRoot;
  throw new Error('Cannot resolve Quoin catalog root. Set QUOIN_CATALOG_ROOT env var to the path containing /patterns/, /aesthetics/, /templates/.');
}

const CATALOG_ROOT = resolveCatalogRoot();

const SOURCES = [
  { kind: 'patterns',    dir: 'patterns',                        manifestFile: 'quoin.pack.json' },
  { kind: 'patterns',    dir: '02_reference-packs/patterns',     manifestFile: 'quoin.pack.json' },
  { kind: 'primitives',  dir: '02_reference-packs/primitives',   manifestFile: 'quoin.pack.json' },
  { kind: 'aesthetics',  dir: 'aesthetics',                      manifestFile: 'quoin.pack.json' },
  { kind: 'templates',   dir: 'templates',                       manifestFile: 'quoin.template.json' },
];

/** Scan the catalog and return [{ uri, name, kind, manifest, manifestPath }] */
function loadCatalog() {
  const items = [];
  for (const src of SOURCES) {
    const sourceDir = join(CATALOG_ROOT, src.dir);
    if (!existsSync(sourceDir)) continue;
    for (const entry of readdirSync(sourceDir)) {
      const packDir = join(sourceDir, entry);
      if (!statSync(packDir).isDirectory()) continue;
      const manifestPath = join(packDir, src.manifestFile);
      if (!existsSync(manifestPath)) continue;

      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      // Strip @quoin/(pattern|prim|aesthetic|template)- prefix for the URI segment.
      const shortName = manifest.name
        .replace(/^@quoin\//, '')
        .replace(/^(pattern|prim|aesthetic|template)-/, '');

      // Layout primitives (prim-*) sit in /patterns/ alongside patterns; they're
      // still in the 'primitives' MCP namespace for clarity.
      let kind = src.kind;
      if (manifest.type === 'primitive') kind = 'primitives';

      const uri = `quoin://${kind}/${shortName}`;
      items.push({ uri, name: shortName, kind, manifest, manifestPath });
    }
  }
  return items;
}

const catalog = loadCatalog();

// ──────────────────────────────────────────────────────────────────────
// MCP server.
// ──────────────────────────────────────────────────────────────────────

const server = new Server(
  { name: 'quoin-mcp', version: '0.1.0' },
  { capabilities: { resources: {}, tools: {} } }
);

// resources/list
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: catalog.map(item => ({
    uri: item.uri,
    name: item.name,
    description: item.manifest.description || '',
    mimeType: 'application/json',
  })),
}));

// resources/read
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const item = catalog.find(i => i.uri === uri);
  if (!item) {
    throw new Error(`Unknown resource: ${uri}. Use resources/list to discover available URIs.`);
  }
  return {
    contents: [
      {
        uri: item.uri,
        mimeType: 'application/json',
        text: JSON.stringify(item.manifest, null, 2),
      },
    ],
  };
});

// tools/list
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'find_pattern',
      description: 'Search the Quoin catalog. Returns patterns/aesthetics/templates whose name or description contains the query as a substring (case-insensitive). Future versions may add embedding-based semantic search.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'A search term (name, description keyword, anatomy concept, ARIA role, etc.)',
          },
          limit: {
            type: 'number',
            description: 'Maximum number of matches to return. Default 20.',
            default: 20,
          },
        },
        required: ['query'],
      },
    },
  ],
}));

// tools/call
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'find_pattern') {
    const { query = '', limit = 20 } = request.params.arguments || {};
    const q = String(query).toLowerCase().trim();
    if (!q) {
      return {
        content: [{ type: 'text', text: 'Empty query. Provide a search term.' }],
        isError: true,
      };
    }
    const matches = catalog
      .filter(item => {
        const name = (item.name || '').toLowerCase();
        const desc = (item.manifest.description || '').toLowerCase();
        const tags = ((item.manifest.metadata && item.manifest.metadata.tags) || []).join(' ').toLowerCase();
        return name.includes(q) || desc.includes(q) || tags.includes(q);
      })
      .slice(0, limit);

    if (matches.length === 0) {
      return {
        content: [{ type: 'text', text: `No matches for "${query}". The catalog has ${catalog.length} items; try a broader term.` }],
      };
    }

    const lines = [`Found ${matches.length} match${matches.length === 1 ? '' : 'es'} for "${query}":`, ''];
    for (const m of matches) {
      lines.push(`- **${m.name}** (${m.kind})`);
      lines.push(`  URI: ${m.uri}`);
      lines.push(`  ${(m.manifest.description || '').slice(0, 180)}`);
      lines.push('');
    }
    return {
      content: [{ type: 'text', text: lines.join('\n') }],
    };
  }
  return {
    content: [{ type: 'text', text: `Unknown tool: ${request.params.name}` }],
    isError: true,
  };
});

// ──────────────────────────────────────────────────────────────────────
// Boot.
// ──────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
// Server runs until stdio closes.
