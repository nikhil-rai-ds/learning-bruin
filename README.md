# Learning Bruin

Project space for learning Bruin and keeping notes, examples, exercises, and outputs together.

## Goals

- Understand what Bruin is used for.
- Set up a local learning environment.
- Work through core concepts with small examples.
- Capture commands, patterns, and lessons learned.

## Structure

- `notes/` - learning notes and summaries.
- `exercises/` - hands-on practice files and examples.
- `references/` - useful links, snippets, and source material.
- `outputs/` - generated results, screenshots, reports, or exports.

## Current Focus

- `bruin/` - nested Bruin example project used for hands-on practice.
- `bruin/bruin-chess/` - chess data pipeline that loads data into DuckDB.
- `notes/project-map.md` - quick orientation for the files and commands used most often.

## Bruin MCP

This project configures the Bruin MCP server for Codex and VS Code:

- `.codex/config.toml` registers the `bruin` MCP server for Codex.
- `.vscode/mcp.json` registers the same server for VS Code MCP clients.
- `scripts/bruin-mcp-stdio.mjs` adapts Bruin CLI v0.11.635 MCP newline JSON to standard MCP stdio framing.

## Next Steps

1. Identify the Bruin docs, tutorial, or course to follow.
2. Add setup notes in `notes/setup.md`.
3. Create the first hands-on exercise in `exercises/`.
