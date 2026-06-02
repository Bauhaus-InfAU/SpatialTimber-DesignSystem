# SpatialTimber-Utils

Shared utilities and assets for the **SpatialTimber** research project — logos, design
templates, brand tokens, and reusable helper code used across the project's repositories.

## What lives here

This repository is the single source of truth for cross-cutting resources that several
SpatialTimber repos depend on, so they don't get copied (and drift) from one repo to the next.

| Area | Contents |
|------|----------|
| `assets/logos/` | Project, partner, and funder logos (SpatialTimber, Bauhaus-Universität Weimar, TU Dresden, Zukunft Bau / BMWSB) in vector and raster form |
| `assets/templates/` | Design and document templates (slide decks, posters, figure layouts) |
| `assets/brand/` | Brand tokens — color palette, type stacks, spacing — shared with the presentation deck and the Demonstrator app |
| `src/` | Reusable helper code shared across project repositories |

> Folders are created as content is added; see the layout below for the intended structure.

## Folder structure

```
SpatialTimber-Utils/
├── assets/
│   ├── logos/        # project / partner / funder logos (svg + png)
│   ├── templates/    # slide, poster, and figure templates
│   └── brand/        # palette, type, spacing tokens
├── src/              # shared helper code
├── CLAUDE.md         # AI-assistant context for this repo
└── README.md         # this file
```

## About SpatialTimber

**SpatialTimber** (*Optimierte Grundrisslösungen für nachhaltige Holz-Raumtragwerke zur
Nachverdichtung im Wohnungsbau*) is a research project developing AI-based methodology and
software for generating floor plans optimized for sustainable timber spatial structures
(Raumtragwerke) in vertical building extensions (Aufstockung).

The project is led by **Bauhaus-Universität Weimar** (Professur Informatik in der Architektur
und Urbanistik) and **TU Dresden** (Lehrstuhl Tragwerksplanung), and funded by **Zukunft Bau**
(BBSR). Duration: October 2024 – September 2026.

### Related repositories

The project software lives under the [Bauhaus-InfAU](https://github.com/Bauhaus-InfAU) GitHub
organization:

| Repository | Description |
|------------|-------------|
| [SpatialTimber-Layout_Generators](https://github.com/Bauhaus-InfAU/SpatialTimber-Layout_Generators) | Floor plan / layout generation algorithms |
| [SpatialTimber-FEM_Surrogate](https://github.com/Bauhaus-InfAU/SpatialTimber-FEM_Surrogate) | ML surrogate models approximating FEM structural analysis |
| [SpatialTimber-Furnisher](https://github.com/Bauhaus-InfAU/SpatialTimber-Furnisher) | Automated furnishing / furniture placement |
| [SpatialTimber-Demonstrator](https://github.com/Bauhaus-InfAU/SpatialTimber-Demonstrator) | Integrated demonstrator application |
| **SpatialTimber-Utils** | Shared utilities and assets (this repo) |

For the full project overview, see the project README in
`SpatialTimber - Documents/README.md` and the
[Spatial Timber Notion workspace](https://www.notion.so/Spatial-Timber-12d02b874c6880c48b68ec84a287ea8b).

## Conventions

- Language: **English** (project-wide).
- Dates: **ISO 8601** (`YYYY-MM-DD`).
- Keep assets organized by type; prefer vector (`.svg`) for logos where available.
- Never commit secrets, API keys, or `.env` files.

## License

Research project — contact the project coordinators for information about licensing and usage
of project outputs.
