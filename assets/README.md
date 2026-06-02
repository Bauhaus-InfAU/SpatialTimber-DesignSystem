# SpatialTimber — Design System

This `assets/` tree is the project's **overarching design system**. It is not one thing but
a small federation of sub-systems, each owning a different *purpose*. Use this page to find
the right one, then read that sub-system's own README.

> **Working in Claude Code?** Just ask — the `spatialtimber-design` skill knows this map and
> will route you (e.g. *"export the logo"*, *"build a project web page"*, *"make a slide"*).

## Pick the right sub-system for the job

| I want to… | Go to | What's there |
|---|---|---|
| Use the **logo / wordmark / glyphs**, get **brand colours & type**, or export marks | [`brand/`](brand/) | Identity + design tokens + a runnable asset generator |
| Build a **website or web app** in the project style | [`templates/website/`](templates/website/) | The *Aufstockung Assistent* / Solver UI — self-contained HTML template |
| Build a **slide deck / presentation** | [`templates/deck/`](templates/deck/) | The Zukunft Bau 2026 deck template (layout + components) |
| Find **presentation media** (axo renders, schemes, pictograms, videos) | [`presentation/`](presentation/) | Reusable Zukunft Bau 2026 deck assets (the deck template's media source) |
| Produce or restyle **illustrations** (axonometric / pictogram / scheme) | [`styleguide/`](styleguide/) | The visual-language reference — the three illustration registers + palette |
| Use **funder logos** (Zukunft Bau, BMWSB) | [`logos/`](logos/) | Third-party institutional marks, all formats |

## How the pieces relate

```
assets/
├── brand/            ← single source of truth for IDENTITY (marks, tokens, glyphs)
│                       every other sub-system draws colour + type from here
├── templates/
│   ├── website/      ← WEB pillar  — uses brand tokens; logos from ../../logos
│   └── deck/         ← SLIDES pillar — uses brand tokens; media from ../../presentation
├── presentation/     ← the deck's MEDIA library (large; lives here, not in templates/deck)
├── styleguide/       ← ILLUSTRATION rules (how the artwork in presentation/ is made)
└── logos/            ← FUNDER marks (third-party; not the SpatialTimber logo)
```

- **Brand is the root.** Colours, type stacks, and the logo come from [`brand/`](brand/).
  Templates and the deck reference those tokens rather than hard-coding hex values, so the
  whole system stays in sync.
- **Templates are lean; media lives once.** The deck template
  ([`templates/deck/`](templates/deck/)) is layout + CSS only; its heavy media is sourced
  from [`presentation/`](presentation/) (kept in one place, never duplicated). The website
  template is self-contained except the funder logos.
- **Styleguide explains the artwork.** [`styleguide/`](styleguide/) documents *how* the
  axonometric renders, schemes, and pictograms in [`presentation/`](presentation/) are
  produced — read it before making new artwork.

## Conventions (project-wide)

English · ISO-8601 dates · vector (`.svg`) preferred for logos · organise by **type**, not by
consuming repo · **never commit** secrets or large binaries that don't belong in git. See the
repo root [`CLAUDE.md`](../CLAUDE.md) for the locked brand tokens and full project context.
