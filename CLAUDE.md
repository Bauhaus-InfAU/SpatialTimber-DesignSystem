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
design-system/        # ★ THE design system — START HERE. Canonical, consolidated brand spec:
                      #   content + visual foundations, colour/type tokens (colors_and_type.css),
                      #   a runnable asset generator, the Aufstockung Assistent UI kit, sample
                      #   slides, and the design-conversation transcripts. (Claude Design handoff.)
assets/               # SECONDARY — example applications of the system + project media.
                      #   Not the source of truth; design-system/ is. See assets/README.md.
assets/presentation/  # reusable Zukunft Bau 2026 deck media library (axo renders, schemes, video)
assets/styleguide/    # illustration-register reference (how the presentation/ artwork is made)
assets/logos/         # third-party funder logos (Zukunft Bau, BMWSB) — svg + png
src/                  # reusable helper code shared across repos
```

**[`design-system/`](design-system/) is the centerpiece — the go-to for any style or design
question.** Start at [`design-system/project/README.md`](design-system/project/README.md): it holds
the brand context, content fundamentals, visual foundations, and iconography rules. The canonical
token set is `design-system/project/colors_and_type.css`; the single source of truth for
marks/glyphs is the generator `design-system/project/assets/spatialtimber-assets.mjs`; the product
UI kit is `design-system/project/ui_kits/aufstockung-assistent/`. It ships as the
`spatialtimber-design` Claude Code skill, which is wired to this folder.

The **`assets/`** tree is **secondary**: example applications of the system (the earlier `brand/`
and `templates/` explorations) plus project-specific media that doesn't live in the design system.
**If the two ever disagree, `design-system/` is authoritative.** Its genuinely unique, still-current
parts are:

- `assets/presentation/` — the Zukunft Bau 2026 deck's reusable **media library** (axonometric
  renders, scheme SVGs/GIFs, pictograms, video). Large binaries live here on purpose.
- `assets/styleguide/` — the **illustration-register** reference (axonometric / flat-contour
  pictogram / scheme), each with a monet style block, plus `palette.html`, pictogram sets, Anthropic
  engineering-header references, and the PNG→SVG scheme workflow. Read its
  [`README.md`](assets/styleguide/README.md) before producing or restyling project artwork; note its
  internal `../monet/`, `../_assets/` links point at the **source** presentation repo, not here.
- `assets/logos/` — third-party **funder logos** (Zukunft Bau, BMWSB).

**Locked decisions (2026-06-02):** typeface is **Inter** (Söhne optional future swap if licensed);
the **wider palette stays** (supporting peach/olive/sky for data colour-coding). The Aufstockung
Assistent **UI kit now ships** in `design-system/project/ui_kits/` (no longer a future to-do).

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

When working on visual assets, the project's locked palette (canonical token set:
`design-system/project/colors_and_type.css`; also used by the Demonstrator):

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
