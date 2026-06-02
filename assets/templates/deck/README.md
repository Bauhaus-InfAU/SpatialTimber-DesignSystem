# Slide-deck template — SpatialTimber · Zukunft Bau Projekttage 2026

The reference **presentation deck** for the SpatialTimber project (Zukunft Bau Projekttage
2026). Designed in [Claude Design](https://claude.ai/design) and exported here on
**2026-06-02** as the canonical slide-deck template — the layout, slide grid, type system,
and component patterns to reuse for project presentations.

This is the **slides** pillar of the SpatialTimber design system. Identity →
[`../../brand/`](../../brand/); web UI → [`../website/`](../website/); routing index →
[`../../README.md`](../../README.md).

> **The deck template is [`spatialtimber-deck.html`](spatialtimber-deck.html)** (lean,
> ~141 KB). It uses the brand tokens (`--sans` = Söhne→Inter, `--mono` = JetBrains Mono;
> ink + paper + clay) and is the structure/CSS/layout to build on.

## ⚠️ Media is not committed here — by design

The deck references **25 media files** (`assets/03_hero_axo.mp4`, `assets/06_status_quo_axo.png`,
schemes, gifs, …) totalling **hundreds of MB**. Per this repo's rule (*never commit large
binaries / generated bundles*), they are **not** stored in this folder, and the fully
inlined "standalone" exports (30 MB / 26 MB single-file HTMLs) are excluded too.

**As shipped, `spatialtimber-deck.html` will show broken media until you supply the assets.**
That's intentional — this is the *template*, not the finished deck.

### To render the deck

1. Create `assets/templates/deck/assets/`.
2. Drop in the 25 referenced files, named exactly as the HTML expects (see the list below).
   Most already exist in this repo under [`../../presentation/`](../../presentation/) — they
   are the same Zukunft Bau 2026 deck media, just under descriptive (un-numbered) names.
   The rest come from the **source deck repo** (the Zukunft Bau 2026 presentation project).
3. Open `spatialtimber-deck.html`.

The numbered names map onto `../../presentation/` files by content, e.g.
`06_status_quo_axo.png` ↔ `status_quo_axo_anthropic_v4.png`,
`07_state1_wallbeam_x.png` ↔ `state1_wallbeam_anthropic_v3.png`,
`adapter_balance_limitation.png` ↔ `adapter_balance_limitation.png` (same name),
`11_neufert_4_0.gif` ↔ `neufert 4_0.gif`. A handful (hero axo, Munich aerials, HOWOGE /
Furnisher clips) live only in the source deck repo.

### Referenced media (the 25 files the template expects)

```
03_hero_axo.mp4            03_hero_axo.png            06_loadpath_distribution.png
06_status_quo_axo.png      07_loadpath_stage1.png     07_loadpath_stage2.png
07_state1_wallbeam_x.png   07_state2_coordinated.png  08_we_cant_design_it.png
11_imitation_pictogram.png 11_neufert_4_0.gif         14_feedback_pictogram.png
14_scheme_lora_annotated.gif   15_scheme_adapters_training.mp4   15_scheme_typology_annotated.gif
16_scheme_rl_feedback_annotated.mp4   18_howoge_animation.mp4    19_furnisher_rhino_plugin.mp4
19_furnisher_standalone.mp4    25_platform_adapters_anim.mp4     29_munich_aerial.gif
adapter_balance_limitation.png  adapter_universal_limitation.png
bmwsb_logo.svg             zukunftbau_logo.png
```

## Contents

| Path | What it is |
|---|---|
| [`spatialtimber-deck.html`](spatialtimber-deck.html) | **The template** — lean deck (v6); supply media to render |
| [`handoff/chat1.md`](handoff/chat1.md) | Claude Design chat transcript — the *why* / how it was built |

## Notes

- Use the brand tokens from [`../../brand/colors_and_type.css`](../../brand/colors_and_type.css);
  the deck's own `--sans` / `--mono` variables mirror them.
- Funder logos: `bmwsb_logo.svg` / `zukunftbau_logo.png` are the canonical marks in
  [`../../logos/`](../../logos/).
- The visual register (axonometric hero, scheme illustrations, pictograms) is documented in
  [`../../styleguide/`](../../styleguide/) — read that before restyling deck artwork.
