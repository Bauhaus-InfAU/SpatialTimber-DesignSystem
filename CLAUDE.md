# SpatialTimber-Utils — Project Context

## What this is

The **shared utilities and assets** repository for the SpatialTimber project. It holds
cross-cutting resources that more than one SpatialTimber repo needs — **logos, design templates,
brand tokens, and reusable helper code** — so they live in one place instead of being copied
between repos and drifting out of sync.

This is a **resource/library repo**, not an application. There is no app to run, no build to
ship. When you add something here, the question to ask is: "do multiple repos need this?" If yes,
it belongs here; if it's specific to one repo, it belongs there.

## Where things live

```
assets/logos/      # project / partner / funder logos (svg + png)
assets/templates/  # slide, poster, and figure design templates
assets/brand/      # palette, type stacks, spacing tokens
src/               # reusable helper code shared across repos
```

Folders are created as content lands — don't expect them all to exist yet. Match the existing
structure when adding files; create a new top-level folder only when no existing one fits.

## The wider project (context for decisions)

SpatialTimber develops AI-based floor-plan generation for sustainable timber spatial structures
(Raumtragwerke) in vertical building extensions (Aufstockung). Led by **Bauhaus-Universität
Weimar** (Prof. König, Informatik in der Architektur und Urbanistik) and **TU Dresden** (Prof.
Beckh, Tragwerksplanung); funded by **Zukunft Bau** (BBSR). Duration Oct 2024 – Sep 2026.

Sibling repos under [Bauhaus-InfAU](https://github.com/Bauhaus-InfAU) consume assets from here:
`SpatialTimber-Layout_Generators`, `-FEM_Surrogate`, `-Furnisher`, `-Demonstrator`. The
**Demonstrator** in particular shares the **brand palette and type stacks** with this repo and
with the presentation deck — keep brand tokens here consistent with the deck's style guide.

Full project context: `SpatialTimber - Documents/README.md` and the
[Spatial Timber Notion workspace](https://www.notion.so/Spatial-Timber-12d02b874c6880c48b68ec84a287ea8b).

## Brand tokens (Anthropic palette, from the presentation deck)

When working on `assets/brand/`, the project's locked palette (also used by the Demonstrator):

- clay `#D97757`, peach `#EBC9B7`, olive `#788C5D`, sky `#6A9BCC`, ink `#141413`,
  oat paper `#E3DACC`, gray-350 `#C2C0B6`.
- Type stacks: **sans** `"Söhne","Inter",…` (body) / **mono** `"JetBrains Mono","IBM Plex Mono",…`
  (numerals, labels). Söhne is the licensed brand sans; self-hosted Inter + JetBrains Mono are the
  embeddable fallbacks the design targets.

## Conventions

- Language: **English** (project-wide).
- Dates: **ISO 8601** (`YYYY-MM-DD`).
- Prefer vector (`.svg`) for logos; keep raster exports alongside only when needed.
- Organize assets by type, not by consuming repo.
- **Never commit** secrets, API keys, `.env` files, or large binaries that don't belong in git
  (prefer source/vector formats; avoid committing generated/exported bundles).
