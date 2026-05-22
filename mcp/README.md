# `@harrow-haus/quoin-mcp`

MCP (Model Context Protocol) server exposing the USML 2026.05 reference
implementation (Quoin) as resources and tools for AI coding agents.

**Status:** Phase 24.1 scaffold (v0.1.0). Functional read-only server with
catalog discovery + substring search. Future versions may add write
operations and embedding-based semantic search.

## What this server does

- Exposes each Quoin pattern, content primitive, layout primitive,
  aesthetic pack, and template as an MCP resource with URI scheme
  `quoin://<kind>/<name>`.
- Returns the pack manifest JSON when a resource is read.
- Provides a `find_pattern` tool for substring search across names,
  descriptions, and tags.

The catalog as of v0.1.0 has 38 items:

- 22 production patterns
- 4 content primitives
- 6 layout primitives
- 3 aesthetic packs
- 3 page templates

## Installation

```bash
npm install -g @harrow-haus/quoin-mcp
```

Or run on-demand via `npx`:

```bash
npx @harrow-haus/quoin-mcp
```

## Integration

### Claude Code

Add to `~/.config/claude-code/mcp_servers.json` (Linux/macOS) or the
equivalent on your platform:

```json
{
  "mcpServers": {
    "quoin": {
      "command": "npx",
      "args": ["-y", "@harrow-haus/quoin-mcp"]
    }
  }
}
```

### Claude Desktop

Open the app's settings, find the MCP servers section, add:

```json
{
  "quoin": {
    "command": "npx",
    "args": ["-y", "@harrow-haus/quoin-mcp"]
  }
}
```

### Cursor

In Cursor's MCP settings (Cursor Settings → MCP Servers → Add), enter:

- **Name:** `quoin`
- **Command:** `npx`
- **Arguments:** `-y @harrow-haus/quoin-mcp`

### Generic MCP clients

The server uses the stdio transport. Any MCP client that supports stdio
can connect by spawning `quoin-mcp` (or `npx -y @harrow-haus/quoin-mcp`)
and communicating over the resulting process's stdin/stdout.

## Custom catalog root

If running the server outside the published npm package (e.g., from a
local clone or against a forked catalog), set the `QUOIN_CATALOG_ROOT`
environment variable to the directory containing `patterns/`,
`aesthetics/`, and `templates/`:

```bash
QUOIN_CATALOG_ROOT=/path/to/quoin npx @harrow-haus/quoin-mcp
```

## Hello-world example

With the server configured in your agent:

> **User:** List all available Quoin patterns.
>
> **Agent:** *(calls `resources/list`)*
> *(returns all 38 catalog items with their `quoin://` URIs)*

Or:

> **User:** Find Quoin patterns related to forms.
>
> **Agent:** *(calls `find_pattern` tool with query "form")*
> *(returns `form-fields`, `form-validation`, plus any other pattern with
> "form" in its name/description/tags)*

Or:

> **User:** Show me the anatomy of the hero pattern.
>
> **Agent:** *(calls `resources/read` with URI `quoin://patterns/hero`)*
> *(returns the hero pack manifest JSON; agent renders the anatomy)*

## Protocol details

| Endpoint | Behavior |
|---|---|
| `resources/list` | Returns all 38 catalog items as resources. Each has `uri`, `name`, `description`, `mimeType: application/json`. |
| `resources/read` | Reads the pack manifest JSON for the given URI. URIs follow `quoin://<kind>/<name>` where `<kind>` is `patterns`, `primitives`, `aesthetics`, or `templates`. |
| `tools/list` | Returns the single available tool: `find_pattern`. |
| `tools/call` (find_pattern) | Substring search across catalog item names, descriptions, and tags. Returns matches with URIs. Accepts `query: string` (required) and `limit: number` (default 20). |

Future versions may add:

- `complete` capability for autocompletion of pattern names.
- A `validate_anatomy` tool that validates operator-supplied USML JSON
  against the canonical schema.
- An `emit_specimen` tool that returns a working HTML example for a
  given pattern + variant + aesthetic combination.

## License

MIT. Published under `@harrow-haus` npm scope. The Quoin reference
implementation (separately published as `@harrow-haus/quoin`) is the
underlying catalog.
