# SpatialTimber — assets (secondary to `design-system/`)

> **⭐ The canonical design system is [`../design-system/`](../design-system/) — start there.**
> It holds the consolidated brand spec, colour/type tokens, the asset generator, the *Aufstockung
> Assistent* UI kit, and sample slides. **If anything here disagrees with `design-system/`, that
> folder wins.**

This `assets/` tree is **secondary**: project-specific **media** that doesn't live in the design
system. Everything about identity, tokens, web, and slides now lives in
[`../design-system/`](../design-system/) — go there for brand/web/deck work. (The earlier `brand/`
and `templates/` explorations that used to live here were removed once `design-system/` became the
source of truth.)

> **Working in Claude Code?** Just ask — the `spatialtimber-design` skill routes you to
> `design-system/` for design/brand work and here for media / illustration / funder logos.

## Pick the right sub-system for the job

| I want to… | Go to | What's there |
|---|---|---|
| **Logo, glyphs, brand colours/type, web app, slides** | [`../design-system/`](../design-system/) | The canonical design system (start at `project/README.md`) |
| Find **presentation media** (axo renders, schemes, pictograms, videos) | [`presentation/`](presentation/) | Reusable Zukunft Bau 2026 deck assets — the deck's media library |
| Produce or restyle **illustrations** (axonometric / pictogram / scheme) | [`scheme-styleguide/`](scheme-styleguide/) | The visual-language reference — the three illustration registers + palette |
| Use **funder logos** (Zukunft Bau, BMWSB) | [`logos/`](logos/) | Third-party institutional marks, all formats |

## How the pieces relate

```
assets/
├── presentation/        ← the deck's MEDIA library (axo renders, schemes, pictograms, video)
├── scheme-styleguide/   ← ILLUSTRATION rules (how the artwork in presentation/ is made)
└── logos/               ← FUNDER marks (third-party; not the SpatialTimber logo)
```

- **The scheme styleguide explains the artwork.** [`scheme-styleguide/`](scheme-styleguide/)
  documents *how* the axonometric renders, schemes, and pictograms in
  [`presentation/`](presentation/) are produced — read it before making new artwork.
- **Media lives once.** [`presentation/`](presentation/) is the single home for the deck's heavy
  media; the deck template in `design-system/project/slides/` sources from here rather than
  duplicating it.

## Conventions (project-wide)

English · ISO-8601 dates · vector (`.svg`) preferred for logos · organise by **type**, not by
consuming repo · **never commit** secrets or large binaries that don't belong in git. See the
repo root [`CLAUDE.md`](../CLAUDE.md) for the locked brand tokens and full project context.
