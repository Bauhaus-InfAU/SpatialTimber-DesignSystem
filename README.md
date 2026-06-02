# SpatialTimber-Utils

Shared utilities and assets for the **SpatialTimber** research project — the design system,
funder logos, presentation media, and reusable helper code used across the project's repositories.

## See the design system

New here? The visual design system lives in **[`design-system/`](design-system/)**. The quickest way
to understand it is to *look at it* — serve the folder and open these pages in a browser:

```bash
cd design-system/project && python -m http.server 8000
```

- **★ [Brand identity](design-system/project/ui_kits/brand-identity/index.html)** — the whole brand on one page (logo, wordmark, sub-project lockups, glyphs, colour, type). **Start here.**
- **[Aufstockung Assistent](design-system/project/ui_kits/aufstockung-assistent/index.html)** — the product UI (inputs rail → 3D viewer → performance rail).
- **[Component library](design-system/project/ui_kits/component-library/index.html)** — reusable component patterns.
- **[Sample slides](design-system/project/slides/index.html)** — the deck style.

See **[design-system/README.md](design-system/README.md)** for what each page shows and how to open
them (the brand page also opens directly; the React kits need the local server + internet).

## What lives here

This repository is the single source of truth for cross-cutting resources that several
SpatialTimber repos depend on, so they don't get copied (and drift) from one repo to the next.

| Area | Contents |
|------|----------|
| **`design-system/`** | **★ The SpatialTimber design system — start here.** The canonical, consolidated brand spec: content + visual foundations, colour/type tokens, a runnable asset generator, the *Aufstockung Assistent* UI kit, and sample deck slides. The go-to reference for any style or design question. |
| `assets/presentation/` | Reusable Zukunft Bau 2026 deck **media library** — axonometric renders, scheme SVGs/GIFs, pictograms, video |
| `assets/scheme-styleguide/` | **Illustration-register reference** — how the `presentation/` artwork is made (axonometric / contour pictogram / scheme), plus palette and the PNG→SVG scheme workflow |
| `assets/logos/` | Third-party **funder logos** (Zukunft Bau, BMWSB) in vector and raster form |
| `src/` | Reusable helper code shared across project repositories |

> Folders are created as content is added; see the layout below for the intended structure.

## Folder structure

```
SpatialTimber-Utils/
├── design-system/     # ★ THE design system (start here) — brand spec, tokens, asset
│   └── project/       #   generator, the Aufstockung Assistent UI kit, sample slides
├── assets/                # secondary: project media (brand/web/slides → design-system/)
│   ├── presentation/      #   reusable Zukunft Bau 2026 deck media (renders, schemes, video)
│   ├── scheme-styleguide/ #   illustration-register reference (axo / pictogram / scheme)
│   └── logos/             #   third-party funder logos (Zukunft Bau, BMWSB)
├── src/                   # shared helper code
├── CLAUDE.md              # AI-assistant context for this repo
└── README.md              # this file
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
