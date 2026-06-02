# PNG → SVG scheme workflow

> **Context & provenance.** The core of the **SVG-scheme authoring styleguide** (not a general
> project styleguide) — the calibration loop and style tokens for building editorial scheme SVGs.
> Copied into SpatialTimber-Utils on 2026-06-02 from the presentation repo
> (`…/03_ZukunftBau Projektetage 2026/styleguide/scheme/`).
>
> **Paths in this document refer to that source repo, not this one.** `monet/…` (the
> Gemini / Nano-Banana pipeline), `monet/results/…`, `monet/starters/…`, `_assets/_shared/…`, and
> every named worked-example asset and script (`scheme_lora_annotated.svg`, `pictogram_*.png`,
> `rebuild_scheme_assets.py`, `_gen_full.py`, `_make_gif.py`, …) live in the presentation repo and
> are **not present here**. They are kept verbatim because the *technique* (PIL measurement → SVG
> authoring → headless-Chrome render → re-measure; the § 4 style tokens; the § 5 animation patterns)
> transfers directly to authoring scheme SVGs in this repo, even though the specific files don't.

> **Read this first** if you've been asked to turn one of the Gemini-generated scheme PNGs (`../../monet/results/scheme_*.png`) into an editable, animatable SVG, or to author a new scheme as SVG from scratch in the Anthropic editorial register.

This file documents the calibration loop used in May 2026 to convert `scheme_lora_annotated_v7.png` into `_assets/_shared/scheme_lora_annotated.svg`. Use the same approach for any subsequent PNG → SVG conversion in this deck (`scheme_typology_annotated_v7.png` is the next target; the same loop applies).

---

## 1 · Why SVG, not GIF

The Gemini-generated scheme PNGs are excellent visual targets but locked: any text change requires a re-generation, and step-by-step reveal animations would need to be faked through Photoshop masks → GIF (fragile, slow to iterate).

SVG fixes both problems:

- **Editable** — text is plain XML, change `<text>` content with find-and-replace.
- **Animatable** — group reveals via CSS `animation-delay` on `.annotation` (or equivalent) class groups.
- **Vector** — scales cleanly to any export size; no resolution loss in the PPTX export.
- **Watercolor preserved** — the hand-drawn pictogram stays raster (embedded `<image>`), only the chrome (cards, arrows, text, dashed groups) becomes vector.

Claude Design's pipeline (HTML/CSS/JS → PPTX) is built to consume SVG/CSS, so this is the canonical path for animatable diagrams in this deck.

---

## 2 · Files produced per conversion

```
_assets/_shared/
├── scheme_<name>_annotated.svg                  ← source of truth, hand-edited
├── scheme_<name>_annotated_inline.svg           ← optional: self-contained variant
│                                                    (rasters inlined as base64, see § 6)
├── scheme_<name>_annotated.gif                  ← optional: looping GIF export (see § 6)
├── pictogram_<name>_*.png                       ← embedded raster(s), referenced by the SVG
├── scheme_<name>_annotated_svg_render.png       ← preview render (headless Chrome screenshot)
└── rebuild_scheme_assets.py                     ← optional: one-shot utility that
                                                     regenerates inline.svg + .gif from
                                                     the source .svg after any palette /
                                                     content edit (see § 6 for the template)
```

The SVG references `pictogram_<name>_*.png` via relative paths. Both files must live in the same folder — or use the inline variant for a single-file handoff (see § 6).

**Worked example currently in the repo:** `scheme_lora_annotated.svg` (~17 KB, **source of truth**) + 4 watercolor frames (`pictogram_lora_anim_01_head_v1.png` … `_04_all_v1.png`) + inline variant (`scheme_lora_annotated_inline.svg`, 6.6 MB self-contained, **generated**) + looping GIF (`scheme_lora_annotated.gif`, ~2 MB, 12 s loop, **generated**) + the regen utility (`rebuild_scheme_assets.py`).

**Worked example with multi-iteration animation:** `scheme_rl_feedback_annotated.svg` (~33 KB, source) + 3 building variants + papers raster + inline variant (~3.6 MB) + 24 s GIF (~5 MB) + `rebuild_scheme_rl_feedback.py`. This scheme runs **3 training iterations within a single 24 s loop**, swapping the building pictogram and the score text between iterations and using a "travelling-pulse" arrow pattern. See § 5d for the multi-iteration patterns and § 4 "Circular / radial layout" for its arc-based geometry.

> **Edit only the source `.svg`.** The `_inline.svg` and `.gif` are derived artifacts — `rebuild_scheme_assets.py` overwrites them from the source. Edits made directly to `_inline.svg` will be lost on the next rebuild. If you find yourself working on `_inline.svg` (because that's what was attached to a chat), port your edits back into the source `.svg` before re-running the rebuild.

---

## 3 · The calibration loop

The goal is to match the Gemini PNG's actual rendered proportions, not the prompt spec — Gemini often diverges from instructions (e.g. v7 LoRA renders the title visibly larger than the body even though the prompt said "same size"). Match the **rendered** output.

### Step 1 — measure the source PNG

Use PIL to extract:

- **Card outline bbox** by detecting card-stroke pixels (`#B3B1A8` ± tolerance) in the right half of the canvas
- **Arrow thickness** by counting vertical pixel runs of arrow color (`#6E6A5E` ± tolerance) along a column through the arrow
- **Text heights** for title and each body line, by finding the y-extent of dark pixels (`<60` per channel) within a known text box

Script template (adapt the colour tolerances if the PNG has different palette):

```python
from PIL import Image
import numpy as np

arr = np.array(Image.open('scheme_X_v7.png').convert('RGB'))
H, W = arr.shape[:2]

# Card outline detection
outline = ((arr[:,:,0] > 170) & (arr[:,:,0] < 195) &
           (arr[:,:,1] > 170) & (arr[:,:,1] < 195) &
           (arr[:,:,2] > 160) & (arr[:,:,2] < 185))
# Find horizontal scan rows with many outline pixels (= card top/bottom)
row_counts = outline[:, W//2:].sum(axis=1)
edge_rows = np.where(row_counts > 50)[0]

# Arrow thickness — scan a vertical column at known arrow x, count arrow pixels
arrow = ((arr[:,:,0] > 95) & (arr[:,:,0] < 130) &
         (arr[:,:,1] > 95) & (arr[:,:,1] < 125) &
         (arr[:,:,2] > 85) & (arr[:,:,2] < 115))
thickness_px = arrow[180:200, 520].sum()  # vertical extent of arrow stroke

# Text height in a known bbox
dark = (arr[:,:,0] < 60) & (arr[:,:,1] < 60) & (arr[:,:,2] < 60)
rows_with_text = dark[160:200, 700:1100].any(axis=1)
indices = np.where(rows_with_text)[0]
title_height = indices.max() - indices.min() + 1
```

Record these measurements as your **calibration targets**.

### Step 2 — make the pictogram background transparent

The Gemini PNG renders the pictogram blended into the cream page. The standalone watercolor pictogram (e.g. `monet/starters/pictogram_lora_3.png`) has a pure-white background that will show as a rectangle on the SVG cream page unless made transparent.

```python
from PIL import Image
import numpy as np

im = Image.open('pictogram_lora_3.png').convert('RGBA')
arr = np.array(im)
near_white = (arr[:,:,0] >= 245) & (arr[:,:,1] >= 245) & (arr[:,:,2] >= 245)
arr[near_white, 3] = 0
Image.fromarray(arr).save('pictogram_lora_transparent.png')
```

Save into `_assets/_shared/` next to the SVG.

### Step 3 — author the SVG with the style tokens from § 4

The SVG's viewBox should match the source PNG dimensions exactly (e.g. `viewBox="0 0 1200 896"`) so coordinates are 1:1 with the measurements from Step 1.

### Step 4 — render the SVG to PNG for comparison

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless --disable-gpu --no-sandbox --hide-scrollbars \
  --window-size=1200,896 \
  --screenshot="$(pwd -W)/scheme_X_svg_render.png" \
  "file:///$(pwd -W)/scheme_X.svg"
```

`pwd -W` outputs the Windows-style path that Chrome needs. Both `--screenshot` and the `file://` URL must use this form.

Note: headless Chrome won't have Söhne installed, so the rendered preview will show Inter (the fallback). That's fine — the SVG file itself prefers Söhne and will switch when opened in a Söhne-equipped environment.

### Step 5 — re-measure the SVG render with the same script

Run the Step 1 measurements on the SVG render, compare to the targets. Adjust the SVG until each metric is within ±1 px of the target.

Worked example — final metrics for the LoRA scheme:

| Metric | v7 PNG target | SVG render |
|---|---|---|
| Card outline stroke | 2 px | 2 px ✓ |
| Arrow stroke width | 4 px | 4 px ✓ |
| Title `ADAPTERS` height | 27 px | 28 px (+1) |
| Body line height | 29 px | 28 px (−1) |

---

## 4 · Style tokens (v7-LoRA calibrated, May 2026)

These are the values that worked. Lock them in unless you've explicitly decided to depart.

### Palette (May 2026 refresh — current)

```
page_background:           #FAF9F5   (warm off-white) — render as a solid <rect> filling
                                                        the canvas at the top of the SVG body
card_fill:                 #F0EEE6   (slightly darker than page bg)
card_outline:              #9C9A92   (neutral mid-grey, SHARED with arrows, stroke-width 6)
arrow:                     #9C9A92   (same colour AND same stroke-width as card outline)
text (title + body):       #5E5D59   (single neutral text grey;
                                       title differs from body by font-weight only — 600 vs 400)
dashed_container_stroke:   #9C9A92   (when used; same as solid chrome)
text_secondary:            #7A766A   (only for low-emphasis labels e.g. unit captions)
terracotta_accent_in_pictogram_only:  #CC785C
```

The May 2026 refresh consolidated the chrome palette:

- **One shared neutral grey `#9C9A92`** for both card outlines and arrows.
- **One shared stroke-width `6`** for both card outlines and arrows — a thick, deliberate line weight that reads at slide scale.
- **One shared text colour `#5E5D59`** for title and body. Title-vs-body contrast comes from `font-weight` alone (600 vs 400), never from colour or size.
- **Page background is an opaque `<rect>`** filling the canvas — the SVG no longer relies on the host page colour. This makes the SVG self-presentable (it looks right opened standalone in a browser, on a dark slide, or anywhere else).

The earlier palette (`#F1ECE2` page, `#E4DED2` card, `#B3B1A8` outline, `#6E6A5E` arrow, `#000000`/`#2A2A29` text, stroke-widths 3 / 4.5) is deprecated; do NOT use it for new schemes.

### Typography

Font stack (Söhne preferred; Inter is the bundled webfont fallback):

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

font-family: 'Söhne', 'Sohne', 'Inter', 'Helvetica Neue', Arial, sans-serif;
```

Söhne is commercial (Klim Type Foundry); not on Google Fonts. Install locally or add a Klim WebFont URL when available. Inter is the visible fallback.

Sizes (current, after the May 2026 palette + title refresh):

- **Title** — font-weight `600`, fill `#5E5D59`, font-size `40`, case = **normal** (Title Case, e.g. `Adapters` / `Base model`)
- **Body** — font-weight `400`, fill `#5E5D59`, font-size `30`

Title and body share **colour** (`#5E5D59`); title is larger (40 vs 30) AND heavier (600 vs 400) AND in normal Title Case (not ALL CAPS). The earlier same-size-different-weight-only treatment and the all-caps treatment are both deprecated.

### Vertical text rhythm inside a card

For a card with title + 3 body lines, the baseline spacing convention:

| Gap | Spacing |
|---|---|
| Title baseline → body-1 baseline | **55 px** (40-px title + 15-px breathing room) |
| Body-N baseline → body-(N+1) baseline | **40 px** (one body line height) |
| Card top → title baseline | ~80 px (matches the card's top padding) |
| Last body baseline → card bottom | ~50 px (the descender + a comfortable bottom padding) |

The title-to-body-1 gap is intentionally **larger than the body-to-body gap** (55 vs 40) so the title reads as a separate semantic block, not just the first line of a 4-line list. A title-to-body gap of only 40 (matching the body rhythm) feels cramped because the title font is also 33% larger — its descenders end up closer to the body ascenders than they would for matched-size lines.

Concrete example for an ADAPTERS card placed at `y=122, h=257`:

```
y=200  title baseline   "Adapters"           ← 78 px below card top
y=255  body-1 baseline  "SpatialTimber project"   ← 55 px below title
y=295  body-2 baseline  "specific Adapters"       ← 40 px below body-1
y=335  body-3 baseline  "small Neural Networks"   ← 40 px below body-2
                        — 44 px above card bottom (y=379)
```

When the card height changes, scale all four gaps proportionally; never let the title-to-body-1 gap drop below the body-to-body gap.

### Card geometry

```
rect.card {
  fill: #F0EEE6;
  stroke: #9C9A92;     /* same colour as arrows — shared chrome grey */
  stroke-width: 6;     /* same width as arrows — chunky/visible at slide scale */
  rx: 32;              /* corner radius — generous */
  ry: 32;
}
```

Recommended card width / height for a single callout card in a 1200-wide canvas: **440–500 px wide × 250 px tall**. Narrow the card width to fit the longest body line with ~30 px margin per side at font-size 30. If text overflows, prefer to wrap the line over shrinking the font.

### Arrow geometry

```
.arrow-shaft, .arrow-head {
  stroke: #9C9A92;     /* same colour as card outline */
  stroke-width: 6;     /* same width as card outline — shared chrome line weight */
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

**Stroke-width and stroke-colour are intentionally shared between cards and arrows** in the May 2026 palette refresh — one chrome grey at one line weight makes the whole composition feel like a single editorial register. Earlier values (card 3, arrow 4.5; card `#B3B1A8`, arrow `#6E6A5E`) are deprecated.

Arrowhead is a **simple stroked V** — two short strokes meeting at the tip. Never a filled triangle, never a chevron.

For **static schemes**, `<line>` + `<polyline>` is fine:

```xml
<g class="arrow">
  <line x1="470" y1="190" x2="638" y2="190"/>
  <polyline points="620,175 638,190 620,205"/>
</g>
```

For **animated schemes** (anything in § 5 below), use TWO separate `<path>` elements so the shaft and head can be animated independently — see § 5 for why a combined path doesn't give the "line first, then arrowhead" effect:

```xml
<path class="arrow-shaft" d="M 470 190 L 638 190"/>
<path class="arrow-head"  d="M 620 175 L 638 190 L 620 205"/>
```

The V's depth is ~18 px and width ~30 px when paired with stroke-width 4.5. Leave ≥ 20 px breathing room between the V's tip and the target (card edge or pictogram region).

### Dashed wrapper around a card cluster

When two or more cards form a semantic unit (e.g. "Layout generator" = `Adapters` + `Base model`), wrap them in a dashed `<rect>` with a heading above. Same token as in `scheme_typology_annotated_inline.svg` and `scheme_rl_feedback_annotated.svg`:

```css
.dashed-frame {
  fill: #F0EEE6;              /* cream — same as card fill */
  stroke: #9C9A92;            /* shared chrome grey */
  stroke-width: 4;            /* lighter than card stroke (6) — frame is secondary chrome */
  stroke-dasharray: 12 8;     /* 12 px dash + 8 px gap */
  stroke-linecap: butt;
  stroke-linejoin: round;
}
```

Geometry conventions (worked out empirically and consistent across the three schemes):

- **24 px uniform offset** from the card bounding box on all four sides.
- **`rx="32"`** corner radius — matches the cards inside.
- **Heading text** sits **25 px above** the dashed top edge (text baseline), `text-anchor="middle"` horizontally centered over the cluster, font-weight 600, font-size 32. Same family/colour as `.label-title` (Söhne 600, `#5E5D59`).

Earlier versions used `fill: none`, but **filling the wrapper with the cream `#F0EEE6` reads better at slide scale** — the unit becomes a panel, not just an outline, and the negative space between cards no longer competes with the page background. When you fill the wrapper, **render it BEFORE the cards** in DOM order so the cards (and any connector "+" or arrows that sit in the panel) paint on top:

```xml
<!-- Order matters when the wrapper has fill: -->
<rect ... fill="#FAF9F5"/>                    <!-- 1. page bg -->
<g id="pictogram-stack">…</g>                 <!-- 2. raster -->
<g id="dashed-wrapper">…</g>                  <!-- 3. wrapper (cream fill behind cards) -->
<g id="annotation-adapters">…</g>             <!-- 4. card on top of wrapper -->
<g id="annotation-base-model">…</g>           <!-- 5. card on top of wrapper -->
<g id="plus-sign-group">…</g>                 <!-- 6. connector on top of wrapper -->
```

If you leave the wrapper at the end of the DOM with a fill, it will paint over the cards and any connectors — symptom: cards "disappear" inside a cream rectangle when the dashed frame fades in.

### Frozen-component card (`.card-frozen`)

For schemes that distinguish trained vs. untrained model components (LoRA, RL fine-tuning), use a **muted grey fill `#C2C0B7`** on the frozen card to signal "this is not updated." Same stroke and stroke-width as a regular card:

```css
.card-frozen { fill: #C2C0B7; stroke: #9C9A92; stroke-width: 6; }
```

Pair with the standard `.card` (cream `#F0EEE6`) on the trained / updated component for an immediate visual contrast. Originated in `scheme_rl_feedback_annotated.svg` (Base Model frozen vs. Adapters trained); reused in the LoRA scheme. Don't apply to standalone single-card schemes — the grey only carries meaning when there's a cream card next to it to contrast against.

### Inline "+" connector between cards

For schemes that express addition / composition between two stacked cards (e.g. `Base Model + Adapters`), drop a "+" sign in the gap between them — same colour and stroke as the arrows, so it reads as connecting chrome, not as text:

```css
.plus-sign { stroke: #9C9A92; stroke-width: 6; fill: none;
             stroke-linecap: round; stroke-linejoin: round; }
```

```xml
<g id="plus-sign-group">
  <path class="plus-sign" d="M 853 447.5 L 903 447.5"/>   <!-- horizontal arm -->
  <path class="plus-sign" d="M 878 422.5 L 878 472.5"/>   <!-- vertical arm -->
</g>
```

Sizing: ~50 × 50 px glyph (each arm extends 25 px from the centre). Position at the vertical midpoint of the gap, horizontally centred on the cards. With round line caps and stroke-width 6, the "+" matches the arrowhead arms visually — it should look like part of the same drawing-language family.

In an animated scheme, fade the "+" in **just before the second card's arrow starts drawing**, so the order reads: card 1 in → "+" appears (anticipates the next card) → arrow draws → card 2 in.

### Circular / radial layout

When a scheme depicts a closed FEEDBACK LOOP (RL training, evaluation
loop, regenerative cycle), arrange the elements around an invisible
circle and trace the arrows as **arc segments** of that circle. This
gives a single readable rotational gesture instead of four ad-hoc Bezier
arrows.

Geometry recipe (worked example: `scheme_rl_feedback_annotated.svg`):

1. **Choose a circle** — `cx, cy, R` (e.g. centre `(670, 600)`, R = 280).
   Don't draw it; it's a guide only.
2. **Place four elements on the cardinal directions** so each touches
   the circle at the corresponding cardinal point:
   - W cardinal at `(cx-R, cy)` — element's right-edge midpoint
   - N cardinal at `(cx, cy-R)` — element's bottom-edge midpoint
   - E cardinal at `(cx+R, cy)` — element's left-edge midpoint
   - S cardinal at `(cx, cy+R)` — element's top-edge midpoint
3. **Elements may overshoot the cardinal inward** (e.g. card right
   edge pulled 40 px W of the cardinal). The circle then passes
   *through* the element rather than tangent to it. The arrows still
   trace the original R-circle; trim them in the next step.
4. **Trim each quarter-arc** so the shaft starts/ends with a visible
   gap to the source/target element. For each element rectangle, find
   where the circle crosses its edges; the arc inside that range is
   hidden, the arc outside is the visible shaft. Add ~3-4° padding
   (= ~15-20 px arc length at R=280) on each end for breathing room.

```python
import math
cx, cy, R = 670, 600, 280

def edge_intersections(x1, x2, y1, y2):
    """Where does the R-circle cross the axis-aligned rect's edges?"""
    pts = []
    for x in [x1, x2]:
        d2 = R*R - (x-cx)**2
        if d2 >= 0:
            for y in (cy - math.sqrt(d2), cy + math.sqrt(d2)):
                if y1 <= y <= y2:
                    pts.append((x, y, math.degrees(math.atan2(y-cy, x-cx)) % 360))
    for y in [y1, y2]:
        d2 = R*R - (y-cy)**2
        if d2 >= 0:
            for x in (cx - math.sqrt(d2), cx + math.sqrt(d2)):
                if x1 <= x <= x2:
                    pts.append((x, y, math.degrees(math.atan2(y-cy, x-cx)) % 360))
    return pts  # each pt = (x, y, angle_deg in 0..360 CW)
```

Use SVG arc syntax for the shaft: `M sx sy A R R 0 0 1 ex ey`. The
`sweep-flag = 1` traces the short arc in CW direction (which matches
clock direction: `12 → 3 → 6 → 9 → 12`, i.e. angle increasing in the
standard SVG convention).

For the **arrowhead V**, compute the tangent direction at the arc end
(`(-sin θ, cos θ)` for CW motion at angle θ in degrees) and rotate the
two V arms ±45° from the back direction. Arm length 22, stroke-width 6
matches the typology / LoRA chrome family — see § 4 "Arrow geometry".

Pitfalls specific to circular layouts:

- **Putting headings inside the wrapper group** prevents you from
  centring them over the wrapper (headings live OUTSIDE the dashed
  rect in the SVG, but visually above it). Compute the wrapper's
  horizontal centre and use `text-anchor="middle"`.
- **Pulling elements inward too far** hides the arrowheads inside the
  element. The arrows still need to land in the visible chrome zone;
  if the elements crowd the loop too much, the arc-trim window
  becomes < 10° and the shafts disappear. Aim for visible arc spans of
  20-40°.
- **Asymmetric pulls break circle visibility** — e.g. pulling W and E
  in by 60 px each but leaving N and S at the cardinal makes the
  loop read as a horizontal ellipse, not a circle. Keep the four
  pull distances close (within ~20 px of each other).

### Pictogram embedding

```xml
<image id="pictogram"
       href="pictogram_<name>_transparent.png"
       xlink:href="pictogram_<name>_transparent.png"
       x="60" y="30"
       width="500" height="820"
       preserveAspectRatio="xMidYMid meet"/>
```

Both `href` and `xlink:href` for maximum renderer compatibility (older renderers want `xlink:`, modern ones want plain `href`).

---

## 5 · Animation

Four patterns are documented here, in increasing complexity:

- **5a** — simple staggered fade-in on slide-enter (the original hook pattern)
- **5b** — looping reveal cycle, GIF-like, **CSS-only no JS** (the May 2026 LoRA scheme runs this)
- **5c** — click-to-advance, PowerPoint-style, requires a few lines of JS
- **5d** — **multi-iteration loop** with asset swaps and travelling-pulse arrows (the May 2026 RL feedback scheme)

All three share two **structural conventions** in the SVG:

1. Wrap each annotation's card + text in a `<g class="card-content">…</g>` so the whole block fades together.
2. Split each arrow into TWO separate paths so the shaft and the head can be animated independently:
   ```xml
   <path class="arrow-shaft" d="M 470 190 L 638 190"/>
   <path class="arrow-head"  d="M 620 175 L 638 190 L 620 205"/>
   ```
   This is critical for the "line first, then arrowhead" effect. A single combined path (with an `M` move between shaft and head) draws them in continuous succession with no clear pause — the user perception is "drawn at the same time."

### 5a · Simple staggered fade-in (slide-enter, runs once)

```xml
<defs>
  <style type="text/css">
    .annotation { opacity: 0; transform: translateX(-12px);
                  transition: opacity .45s ease, transform .45s ease; }
    svg.reveal .annotation              { opacity: 1; transform: none; }
    svg.reveal #annotation-adapters     { transition-delay: .20s; }
    svg.reveal #annotation-base-model   { transition-delay: .60s; }
  </style>
</defs>
```

Activate by adding `class="reveal"` to the root `<svg>` on slide-enter (e.g. via a single JS line in the slide deck) or just have it on the SVG tag for an immediate page-load reveal.

### 5b · Looping CSS-only animation (GIF-like)

Used in `_assets/_shared/scheme_lora_annotated.svg` (May 2026, updated). Sequence: BASE MODEL shaft draws → arrowhead draws → card fades in → plate stack crossfades in 3 steps → "+" between cards fades in → ADAPTERS shaft draws → head draws → card fades in → dashed wrapper + "Layout generator" label fade in → **final frame held fixed for 3 seconds** → everything fades out → loop. Total cycle 12 s, infinite.

#### Cycle length, build-up, and the final-frame hold

For long sequences with several reveal steps, a longer cycle reads better — viewers need time to take in the assembled final composition before the loop restarts.

- The LoRA scheme uses a **12 s cycle = 7.5 s build-up + 3 s hold + ~1.5 s fade-out / reset**.
- Hold the final frame for **2–3 s minimum** if the composition has 4+ elements. Without a hold, viewers see the last element appear and then immediately watch it fade out — the assembled state never "lands."
- Compute keyframe percentages from wall-clock times: `% = seconds × 100 / cycle_seconds`. For a 12 s cycle, 1 s = 8.33 %. Document the second-to-percent mapping in a CSS comment at the top of the keyframes block so future edits can re-derive without doing arithmetic in their head.
- When you extend the cycle, **rescale every existing keyframe percentage** by `old_cycle / new_cycle` so wall-clock build-up timing stays the same. Only the fade-out and reset percentages shift to make room for the longer hold. Forgetting this will compress the build-up into a faster, frantic-feeling reveal.
- `rebuild_scheme_assets.py` has a `CYCLE_MS` constant — keep it in sync with the SVG's `animation: … Ns linear infinite;` duration, or the GIF will only capture a fraction (or loop) of the cycle.

Key technique — **draw-in via `stroke-dashoffset`**:

```css
.arrow-shaft  { stroke-dasharray: 170; stroke-dashoffset: 170; }
/* dasharray = path length → one dash covers entire stroke
   dashoffset = path length → dash shifted off-stage, line invisible
   Animate dashoffset to 0 → line draws from start point to end point. */
```

Set `stroke-dasharray` to the **actual computed path length** (or slightly above). For the LoRA scheme: shaft ≈ 168 units, head ≈ 47 units, so dasharray 170 and 50 respectively. **Do NOT use the `pathLength="100"` normalization attribute** — Chrome's headless screenshot tool doesn't always honor it, and there's no benefit over using actual lengths.

Compute path length quickly:
- Straight line `M x1 y1 L x2 y2` → `sqrt((x2-x1)² + (y2-y1)²)`
- V-shape (head) `M x1 y1 L x2 y2 L x3 y3` → sum of the two leg lengths

For looping animation, each element gets one keyframe block running on the SAME cycle duration (e.g. 5 s) so they stay in phase. The keyframe percentages encode absolute moments as fractions of the cycle (`0.3 s / 5 s = 6%`).

**End-of-loop pattern** — fade everything out via `opacity`, then snap `stroke-dashoffset` back to its hidden value *while still invisible* so the next iteration draws fresh. NEVER reverse-draw the line — animating `stroke-dashoffset` back to its hidden value while visible looks weird (like the line is being erased from start to end).

```css
@keyframes drawBaseShaft {
  0%, 6%    { stroke-dashoffset: 170; opacity: 1; animation-timing-function: ease-out; }
  14%       { stroke-dashoffset: 0;   opacity: 1; animation-timing-function: linear;   }  /* drawn */
  90%       { stroke-dashoffset: 0;   opacity: 1; animation-timing-function: ease-in;  }  /* hold */
  98%       { stroke-dashoffset: 0;   opacity: 0; }                                        /* fade out */
  100%      { stroke-dashoffset: 170; opacity: 0; }                                        /* reset while invisible */
}
```

The `opacity: 0` at 98%–100% hides the element completely, so the dashoffset reset from 0 → 170 between 98% and 100% is invisible to the viewer.

**Per-keyframe easing** is set with `animation-timing-function` inside the keyframe block — it shapes the curve from THAT keyframe to the NEXT. Use `ease-out` for drawing-in (fast start, slow end), `linear` during hold (no change anyway), `ease-in` for fade-out (slow start, fast end).

**Stagger** the start times by giving each element's keyframe its own "wait" range. E.g. shaft starts drawing at 6%, head starts at 14% (when shaft finishes), card at 18% (when head finishes):

```css
@keyframes drawBaseHead {
  0%, 14%   { stroke-dashoffset: 50; opacity: 1; animation-timing-function: ease-out; }  /* waits until 14% */
  18%       { stroke-dashoffset: 0;  opacity: 1; ... }                                    /* drawn */
  ...
}
```

Apply all animations with the same cycle duration:

```css
#annotation-base-model .arrow-shaft  { animation: drawBaseShaft  5s linear infinite; }
#annotation-base-model .arrow-head   { animation: drawBaseHead   5s linear infinite; }
#annotation-base-model .card-content { animation: fadeBaseCard   5s linear infinite; }
#annotation-adapters   .arrow-shaft  { animation: drawAdaptShaft 5s linear infinite; }
#annotation-adapters   .arrow-head   { animation: drawAdaptHead  5s linear infinite; }
#annotation-adapters   .card-content { animation: fadeAdaptCard  5s linear infinite; }
```

The outer `animation-timing-function: linear` is correct here — the per-keyframe-step easing in the keyframes overrides it for each transition.

### 5d · Multi-iteration loop with asset swaps (RL feedback scheme)

When the scheme is itself a process that REPEATS (RL training rounds,
search iterations, optimisation steps), the cycle should TELL THAT
STORY — not just re-draw the same sequence. The RL feedback scheme
runs **three training iterations within a single 24 s loop**, each
producing a different building and a different score, with the
adapter weights "updating" between iterations.

**Cycle structure (24 s):**

```
ITERATION 1 (0-8 s)   — full reveal: chrome -> first arrow -> first
                          building -> ... -> first score -> first
                          adapter blink
ITERATION 2 (8-14 s)  — UPDATE only: arrows redraw, building swaps,
                          score swaps, adapter blinks
ITERATION 3 (14-19.4) — UPDATE again with the final assets
HOLD       (19.4-21.5)— assembled final state
FADE OUT   (21.5-23)  — every visible element fades to 0
RESET      (23-24)    — stroke-dashoffsets restored while invisible
```

#### Travelling-pulse arrows

Instead of leaving all four arrows on screen after iter 1, **only one
arrow is visible at a time**. As each new arrow draws in, the previous
one fades out. The viewer's eye follows a single pulse around the loop
and each "tick" reads as one step of the cycle.

Each arrow's keyframe has THREE draw-then-fade phases (one per
iteration), with `stroke-dashoffset` resets while invisible between
phases. Sketch for Arrow 1 on a 24 s cycle:

```css
@keyframes drawShaft1 {
  /* === Iter 1 === */
  0%, 6.24%       { stroke-dashoffset: 168; opacity: 0; }
  6.25%           { stroke-dashoffset: 168; opacity: 1; animation-timing-function: ease-out; }
  7.92%           { stroke-dashoffset:   0; opacity: 1; animation-timing-function: linear; }
  13.33%          { stroke-dashoffset:   0; opacity: 1; animation-timing-function: ease-in; }
  15%             { stroke-dashoffset:   0; opacity: 0; }
  /* === Reset (invisible) === */
  15.01%, 33.32%  { stroke-dashoffset: 168; opacity: 0; }
  /* === Iter 2 (redraw) === */
  33.33%          { stroke-dashoffset: 168; opacity: 1; animation-timing-function: ease-out; }
  35%             { stroke-dashoffset:   0; opacity: 1; animation-timing-function: linear; }
  ...
  /* === Iter 3 (redraw) === */
  ...
}
```

The fade-out window of arrow N **overlaps with the draw-in of arrow
N+1** (e.g. arrow 1 fades at 13.33%-15%, arrow 2 draws at 13.33%-15%) —
the previous pulse hands off to the next as it leaves. With the same
duration on both, the visual sum stays at ~one-arrow-worth of ink at
all times.

#### Asset swaps via stacked variants

For each asset that swaps between iterations (e.g. 3 building images,
3 score texts), place **all variants at the same coordinates** in the
SVG and give each its own opacity keyframe. The variants overlap
geometrically but only one is non-zero opacity at a time.

```xml
<!-- All three buildings at the same x,y,w,h. -->
<image id="building-1" href="pictogram_typology_building_2.png" x="540" y="91" width="320" height="349"/>
<image id="building-2" href="pictogram_typology_building_3.png" x="540" y="91" width="320" height="349"/>
<image id="building-3" href="pictogram_typology_building.png"   x="540" y="91" width="320" height="349"/>
```

```css
#building-1 { animation: fadeBuilding1 24s linear infinite; }
#building-2 { animation: fadeBuilding2 24s linear infinite; }
#building-3 { animation: fadeBuilding3 24s linear infinite; }
```

**Crossfade with LINEAR easing** so total visibility stays at 100 %
during the swap (no flicker dip in the middle). When one variant goes
1→0 and the next goes 0→1 over the SAME window with linear easing,
their sum is constant:

```css
@keyframes fadeBuilding1 {
  0%, 8.33%    { opacity: 0; animation-timing-function: ease-out; }
  13.33%       { opacity: 1; animation-timing-function: linear; }
  34.58%       { opacity: 1; animation-timing-function: linear; }  /* LINEAR for crossfade */
  38.75%, 100% { opacity: 0; }                                      /* fade-out window 34.58-38.75% */
}
@keyframes fadeBuilding2 {
  0%, 34.58%   { opacity: 0; animation-timing-function: linear; }  /* LINEAR for crossfade */
  38.75%       { opacity: 1; animation-timing-function: linear; }  /* fade-in window 34.58-38.75% */
  ...
}
```

Using `ease-in` / `ease-out` on the two halves of a crossfade gives
non-constant total — the visual dips below 100 % at the midpoint
(briefly looking like *something* fading out *to nothing* before the
next thing arrives). Linear keeps it clean.

#### Color blink (fill animation only) for "update" signals

In iter 2 / iter 3 we want to show that something CHANGED (e.g.
"adapter weights updated", "evaluators received a new generation")
without re-drawing the whole element. Solution: animate just the
`fill` colour briefly — light → dark → light, ~1 s total.

```css
@keyframes blinkAdapter {
  0%, 30%      { fill: #F0EEE6; }
  31.67%       { fill: #C2C0B7; }   /* dark */
  32.5%        { fill: #C2C0B7; }   /* hold dark briefly */
  33.33%       { fill: #F0EEE6; }   /* back */
  /* repeat for iter 2 at 51.67-55.83%, iter 3 at 76.67-80.83% */
  ...
  100%         { fill: #F0EEE6; }
}
```

The blink animation can run INDEPENDENTLY of the parent group's
opacity animation — the two target different properties (`fill` vs
`opacity`) and do not conflict. Apply both via comma-separated
`animation-name` if needed, or put one on a child rect and the other
on the parent group.

The frozen `#C2C0B7` colour is the same one used by `.card-frozen`
(see § 4) — this makes the blinking adapter momentarily "look like
the Base Model", a visual rhyme that reads as "the trained weights
were updated".

#### Sequential sub-reveal of a cluster

When a cluster has multiple parts (dashed wrapper, heading, two inner
cards, "+" connector), reveal them sequentially in iter 1 rather than
all at once. Split the cluster into sub-groups, each with its own
fade-in keyframe staggered by ~0.3-0.5 s:

```css
@keyframes fadeGenChrome    { 0%       { opacity: 0; } 1.67%  { opacity: 1; } ... }  /* dashed + heading first */
@keyframes fadeGenBaseModel { 0%, 1.67%  { opacity: 0; } 3.75%  { opacity: 1; } ... }
@keyframes fadeGenAdapters  { 0%, 3.75%  { opacity: 0; } 5.83%  { opacity: 1; } ... }
```

Tie the "+" connector's animation to the SECOND card's fade-in so the
order reads: chrome → card 1 → card 2 + connector.

```css
#gen-plus { animation: fadeGenAdapters 24s linear infinite; }  /* same as card 2 */
```

This gives a more "constructed" feel than a single group fade —
viewers see the unit being assembled, not just appearing.

#### Wall-clock timeline reference comment

Multi-iteration cycles have a LOT of keyframe percentages. Document
the second-to-percent mapping at the top of the keyframes block so
edits are sane:

```css
/* === Timeline (24 s cycle, 1 % = 0.24 s)
       0.0=0%  1.0=4.17%  2.0=8.33%  3.0=12.5%   4.0=16.67%
       5.0=20.83%  6.0=25%  7.0=29.17%  8.0=33.33%  ...
       Final fade: 89.58% → 95.83% (21.5-23 s)
       Reset: 95.83% → 100% (23-24 s, invisible) */
```

#### When to use 5d (vs 5b)

- The scheme is conceptually a REPEATING process (training, search,
  iteration) → 5d. The repetition is the message.
- The scheme is a one-shot pipeline (input → transform → output) → 5b.
  Re-drawing the same arrows twice would be redundant.
- The scheme has multiple variants of the same asset to show
  (different generations, different scores, A/B comparison) → 5d.

The worked example is `scheme_rl_feedback_annotated.svg`. Cycle is 24 s
(~7 s reveal + 2× 5.5 s update + 1.5 s hold + 1.5 s fade + 1 s reset).

### 5c · Click-to-advance (PowerPoint-style)

When you want to control the build as you speak, drop the looping keyframes and use simple CSS transitions gated by a class on the root SVG. A few lines of JS increment a step counter on click / keypress.

```css
.step { opacity: 0; transition: opacity .5s; }
.reveal-1 .step-1 { opacity: 1; }
.reveal-2 .step-1, .reveal-2 .step-2 { opacity: 1; }
.reveal-3 .step-1, .reveal-3 .step-2, .reveal-3 .step-3 { opacity: 1; }
.reveal-4 .step-1, .reveal-4 .step-2, .reveal-4 .step-3, .reveal-4 .step-4 { opacity: 1; }
```

```xml
<script><![CDATA[
  let step = 0;
  document.documentElement.addEventListener('click', () => {
    step = Math.min(step + 1, 4);
    document.documentElement.setAttribute('class', 'reveal-' + step);
  });
]]></script>
```

Spacebar / arrow keys are nicer than click for live presentation — replace the event with `keydown` and check `e.code === 'Space'` or `'ArrowRight'`. For step-back, also handle `ArrowLeft` decrementing the counter.

### 5e · Multi-cell "training build-up" — the generator pipeline

When a scheme is a ROW/CHAIN of cells that activate one-by-one (e.g. the
SpatialTimber adapter chain: Base Model + N adapters, each "trained" in turn),
the animation has ~25 independently-timed elements (per-cell fills, outlines,
arrows, veils, headline quotes) on one shared loop. Hand-authoring the
`@keyframes` is intractable and typo-prone past ~6 elements. **Generate the CSS
with a small Python script and assemble the SVG from a static body template.**

Worked example: `_assets/_shared/scheme_adapters_training_v6_anim.svg` (35 s
loop). Build pipeline (kept next to the asset):

- `_gen_full.py` — defines the timeline in SECONDS, converts to keyframe `%`
  (`P(t) = t/CYCLE*100`), emits every `@keyframes` block, the
  `#id { animation: … }` assignments, and the static class defs → writes
  `_style.txt`.
- `_assemble.py` — holds the SVG body (geometry) as a string, splices in
  `_style.txt`, writes the final `.svg`.

To retime or change counts, edit the seconds/constants in `_gen_full.py` and
re-run both scripts — same "edit source, regenerate derivatives" discipline as
`rebuild_scheme_assets.py` (§ 2), scaled up. Author these scripts with a
file-write tool, NOT a shell heredoc (embedded SVG quotes break `cat <<'EOF'`).

#### Pulse + latch — the reusable activation primitive

Each activation is a PULSE: arrow draws → cell turns active → both revert.
Parametrise one helper `pulse(T_start, N_reps, latch)`:

- `latch=True` → the last rep stays on (cell trained & settled). Typology
  adapters use 2 reps.
- `latch=False` → every rep reverts, nothing stays. Used for the never-trained
  cell (6 reps) AND for transient overlays (the warm flash below).

Make each pulse keyframe return to its 0 % value at 100 % so the loop is
seamless; have the helper emit the reset stops automatically.

#### De-activated vs active appearance (dashed ↔ solid, via veils)

- **De-activated cell** = DASHED light outline (`#D1CFC5`) over a muted fill.
  Mute fill+pictogram+label with a **veil**: a page-bg-coloured (`#FAF9F5`) copy
  of the cell polygon at ~0.6 opacity, drawn AFTER the cell content. Draw the
  dashed outline AFTER the veil so the outline stays crisp (not muted).
- **Active cell** = SOLID dark outline (`#9C9A92`) + full fill. Per-cell solid
  outline overlay on top of the dashed layer, faded in on activation; clear the
  veil (→ 0) at the same moment.
- **Full enclosure**: each cell's solid overlay must include BOTH its left and
  right dividers (+ top + bottom) so an active cell is fully boxed. If a shared
  divider is assigned to only one neighbour, the active cell's far edge stays
  dashed — the user will notice. The leftmost cell must include its right
  divider so it reads enclosed from the first frame.

#### Drawn arrows (not faded)

Arrows should DRAW (line grows from the box). Per arrow:
- shaft `<path class="… draw">` with `stroke-dasharray: D` (D ≥ path length) and
  an animated `stroke-dashoffset` (D → 0 to draw; reset to D while invisible
  between pulses). **D may exceed the path length** — at `offset = D` the gap
  covers the whole path (invisible), at `0` it's fully drawn, so one round value
  (e.g. 130) works for several 100–125 px shafts.
- head + badge sub-group animated by OPACITY, appearing just AFTER the shaft
  finishes drawing.

#### Warm "training flash" overlays

To flash a cell while it trains (fill `#EBC9B7`, outline `#D97757`): add a peach
fill copy of the cell polygon UNDER the pictogram/label, and a terracotta copy of
the solid outline OVER everything. Drive both with a **`latch=False`** pulse so
the flash is transient — present during training, gone once the cell settles to
its normal trained look (the normal solid outline keeps its own `latch=True`
keyframe).

#### Cumulative headline layer

A large stage caption ("Learning to generate a good floor layout") lives OUTSIDE
the scaled content group, in display coordinates, so its size is set directly
(biggest type in the scheme). Each caption is a group whose opacity cross-fades
in over its stage window and out as the next begins; the last holds to loop end.
Bold the newly-introduced concept and let the bold words accumulate across stages
to show "carry-forward".

#### "Scale the geometry but keep text/asset size"

To enlarge the layout without enlarging type/pictograms: wrap everything in
`transform="scale(s)"`, enlarge the canvas by `s`, then **counter-scale** type
and rasters by `1/s` — divide every `font-size` by `s`; for `<image>` set
`width/height` to `/s` and re-centre; for a transform-group pictogram set its
inner scale to `k/s` and shift its translate so its display centre still lands at
`s × old_centre`. Net: chrome grows, glyphs/icons stay put.

### Embedding & presentation context

| Mode | JS runs? | CSS runs? | Use for |
|---|:---:|:---:|---|
| **Inline `<svg>` in HTML** | ✅ | ✅ | Claude Design slides, live web presentation |
| **`<object data="x.svg">`** | ✅ | ✅ | Standalone SVG embedded in a webpage |
| **`<img src="x.svg">`** | ❌ | ❌ (only inline `<style>`) | Static thumbnails; no animation |
| **PowerPoint import** | ❌ | ❌ | Re-apply via PPT's native Animation Pane after ungrouping |

For the deck (Claude Design → PPTX export): authoring as inline SVG in the slide HTML is the canonical path. For PPTX, animations don't survive the import — ungroup the SVG once imported and re-apply animations natively in PowerPoint's Animation Pane (each shape becomes a target, choose Fade or Wipe with On Click / After Previous triggers).

### XML comment pitfall

XML doesn't allow `--` inside `<!-- … -->` comments. So no `--- HEADER ---` style separators inside SVG-level comments. Use `===` instead. CSS comments (`/* */`) inside `<style>` are exempt from the `--` rule — but NOT from the `<` / `&` rules: the whole `<style>` body is still XML-parsed, so a `<` inside a CSS comment (e.g. `40%<->100%`) or a bare `&` (e.g. in the `@import` URL) is a hard parse error. Write "to" instead of "<->", and `&amp;` instead of `&`. Validate with `python -c "import xml.dom.minidom as m; m.parse('x.svg')"` after any hand-edit.

---

## 6 · Exporting an animated SVG to GIF

When the user asks for a GIF (for a quick preview, a chat share, or an export to a platform that can't render SVG), the cleanest pipeline is **Playwright + Web Animations API + PIL**. The Playwright browser opens the SVG, pauses every CSS animation, then steps `currentTime` through the cycle to capture each frame deterministically. PIL composites the frames onto a backdrop and saves the GIF.

### Why this approach (not headless Chrome screenshot loops)

- Chrome's `--virtual-time-budget` flag doesn't reliably advance CSS animation frames — screenshots can capture intermediate or initial states regardless of the budget. This was reproducibly broken in May 2026.
- Playwright exposes the **Web Animations API** (`document.getAnimations()`) which gives precise control: `a.pause()` then `a.currentTime = t_ms` jumps the animation to exactly time `t`. The next screenshot reflects that state.

### GIF format limits to plan around

- **GIF supports only 1-bit alpha** — each pixel is either fully opaque or fully transparent. There's no partial alpha.
- Animations with crossfades or fade-ins have *partial* alpha during transitions. With a transparent GIF, those intermediate frames get rounded to binary alpha → jagged, dithered fades. **For smooth animation in the GIF, composite each frame onto an opaque backdrop** (the scheme's intended page colour, cream `#F1ECE2`).
- Keep the SVG transparent (for slide flexibility) and bake the backdrop into the GIF only. The two assets serve different purposes.

### Script template

Save as `_make_gif.py` next to the SVG, run with `python _make_gif.py`.

```python
"""Render an animated SVG to GIF via Playwright + PIL."""
from playwright.sync_api import sync_playwright
from PIL import Image
import os, shutil

SHARED   = os.path.dirname(os.path.abspath(__file__))
SVG_FILE = os.path.join(SHARED, "scheme_<name>_annotated.svg")
OUT_GIF  = os.path.join(SHARED, "scheme_<name>_annotated.gif")
TMP_DIR  = os.path.join(SHARED, "_gif_frames")

CYCLE_MS = 10_000          # match the SVG's animation-duration
FPS      = 15              # 15 fps × 10 s = 150 frames, smooth without bloating size
W, H     = 1200, 896
BACKDROP = (250, 249, 245) # #FAF9F5 warm off-white — matches the scheme page colour
OUTPUT_W = 600             # downscale (full-res GIF would be ~4× larger)

os.makedirs(TMP_DIR, exist_ok=True)
n_frames = int(CYCLE_MS / 1000 * FPS)

with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(viewport={"width": W, "height": H}, device_scale_factor=1)
    page = context.new_page()
    page.goto("file:///" + SVG_FILE.replace("\\", "/"))
    page.wait_for_timeout(400)                                # let SVG render + animations register
    page.evaluate("document.getAnimations().forEach(a => a.pause());")

    for i in range(n_frames):
        t_ms = (i / n_frames) * CYCLE_MS
        page.evaluate(f"document.getAnimations().forEach(a => {{ a.currentTime = {t_ms}; }});")
        page.screenshot(path=os.path.join(TMP_DIR, f"f_{i:03d}.png"),
                        omit_background=True,
                        clip={"x": 0, "y": 0, "width": W, "height": H})

    browser.close()

frames = []
out_h = int(H * OUTPUT_W / W)
for i in range(n_frames):
    rgba = Image.open(os.path.join(TMP_DIR, f"f_{i:03d}.png")).convert("RGBA")
    bg   = Image.new("RGB", rgba.size, BACKDROP)
    bg.paste(rgba, mask=rgba.split()[3])                       # alpha → blend on backdrop
    bg   = bg.resize((OUTPUT_W, out_h), Image.LANCZOS)
    frames.append(bg.convert("P", palette=Image.ADAPTIVE, colors=128))

frames[0].save(OUT_GIF, save_all=True, append_images=frames[1:],
               duration=int(1000 / FPS), loop=0, optimize=True)

try: shutil.rmtree(TMP_DIR)
except PermissionError: pass    # Windows sometimes locks the dir; harmless leftover
```

### Tuning knobs

| Parameter | Recommendation | Trade-off |
|---|---|---|
| `FPS` | 12–15 for smooth web; 10 if file size is tight | Higher = smoother + bigger file |
| `OUTPUT_W` | 600 for ~1.5 MB output at 1200-canvas SVG | Lower = smaller file + softer detail |
| `colors=128` in palette conversion | 128 is plenty for the cream-warm palette; 256 only if you see banding | Fewer colours = smaller file |
| `BACKDROP` | `(241, 236, 226)` — the cream `#F1ECE2` page colour | Match the scheme's intended page bg; or `(255, 255, 255)` for slides with a white background |

### Also exporting MP4 (from the same frames)

Capture the PNG frames ONCE, then build both GIF and MP4 from them — don't
re-run Playwright per format. For MP4 (preferred for slides that loop video:
~10–20× smaller than GIF, no 1-bit-alpha banding):

```bash
ffmpeg -y -framerate 12 -i _frames/f_%04d.png \
  -c:v libx264 -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
  -crf 18 -movflags +faststart out.mp4
```

- `-pix_fmt yuv420p` + the `scale=trunc(iw/2)*2:…` (force even W×H) are both
  REQUIRED — H.264 rejects odd dimensions and many players need yuv420p.
- Name frames `f_%04d.png` (4 digits): a long cycle (e.g. 48 s × 12 fps = 576,
  or more) exceeds 999 and 3-digit names overwrite each other silently.
- MP4 has no transparency — composite onto the page-bg backdrop (the scheme's
  own `<rect>` page bg already does this, so capture without `omit_background`).
- For export, `device_scale_factor=0.5` halves the captured resolution (e.g.
  1920→960 wide) — plenty for slides and keeps the GIF/MP4 small.

### Building a self-contained SVG for handoff

When handing the SVG to another tool (Claude Design, a designer, a slide author), there are two delivery options:

| Option | What you ship | Pros | Cons |
|---|---|---|---|
| **A · External references (default)** | The `.svg` + every `<image>` PNG it references, all in the same folder (typically `_assets/_shared/`) | Tiny SVG (~13 KB for the LoRA scheme); raster files can be regenerated / swapped without touching the SVG | Recipient must preserve the folder structure; one missing PNG = broken image |
| **B · Inline base64 (self-contained)** | A single `.svg` file with each PNG inlined as a `data:image/png;base64,…` URI | Single file, zero risk of missing assets, drops into any tool that accepts SVG | ~4× larger after base64 expansion (33 % overhead); LoRA scheme grows from ~13 KB to ~6.6 MB |

Use **A** when the recipient can preserve the folder (zip and hand over). Use **B** when they need a single artifact (chat upload, drag-and-drop into a tool that flattens paths, archival).

#### Script — inline every PNG reference as base64

Save as `_inline_svg.py` next to the SVG, run with `python _inline_svg.py`. Produces `scheme_<name>_annotated_inline.svg` (a sibling file; the original is preserved).

```python
"""Build a self-contained variant of an SVG by inlining every <image> PNG."""
import base64, os, re

SHARED = os.path.dirname(os.path.abspath(__file__))
SRC    = os.path.join(SHARED, "scheme_<name>_annotated.svg")
DST    = os.path.join(SHARED, "scheme_<name>_annotated_inline.svg")

with open(SRC, encoding="utf-8") as f:
    svg = f.read()

# Find every PNG href and inline as base64.
for png_rel in sorted(set(re.findall(r'(?:xlink:)?href="([^"]+\.png)"', svg))):
    with open(os.path.join(SHARED, png_rel), "rb") as f:
        b64 = base64.b64encode(f.read()).decode("ascii")
    svg = svg.replace(f'"{png_rel}"', f'"data:image/png;base64,{b64}"')

with open(DST, "w", encoding="utf-8") as f:
    f.write(svg)
```

The script does a literal string replace of every `"<path>.png"` occurrence in the SVG, so it catches both `href` and `xlink:href` attributes in one pass.

#### Trimming the inline SVG's size

If 6+ MB is too heavy for the target consumer:

- **Downscale the source PNGs** — `pictogram_lora_anim_*_v1.png` is 848 × 1264 px. Halve to ~424 × 632 and the inline SVG drops to ~1.7 MB. The watercolor rasters are still readable at slide scale.
- **Re-encode with `oxipng` or `pngquant`** before base64 — lossless / near-lossless PNG compression typically saves 30–50 % on a watercolor image.
- **Consider WebP-as-data-URI** — many SVG renderers also accept `data:image/webp;base64,…`. Same base64 overhead, but the source raster compresses much smaller. Test in the target environment first.

### When transparent GIF is required anyway

If the user explicitly wants a transparent GIF (despite the jaggy-fade trade-off):

- Skip the cream composite step; save each frame in palette mode with one palette index marked transparent
- Use PIL's `disposal=2` (restore to background) on the save call so frames don't leave ghost pixels
- Expect the fades to look stippled — there's no way around the 1-bit alpha limit

For partial-alpha support in a looping animated image, **WebP or APNG** are the right formats (both support full RGBA). ffmpeg can output animated WebP from the same frame set: `ffmpeg -i f_%03d.png -loop 0 out.webp`.

---

## 7 · Pitfalls observed in May 2026

| Pitfall | Symptom | Fix |
|---|---|---|
| Source pictogram has white BG | White rectangle around watercolor on cream SVG page | Pre-process to alpha-zero pure-white pixels (Step 2) |
| Filled-triangle arrowhead | Looks like the wrong arrow family | Use `polyline` of three points (stroked V), never `polygon` |
| Card outline too thin | Looks washed out vs Gemini PNG | `stroke-width: 3` minimum at 1200-wide canvas; renders ~2 px |
| Title too small relative to body | Title doesn't read as title | Either bump title font-size, or rely on weight contrast (600 vs 400) — don't rely on font-size 1-2 px above body |
| Text overflows card | Long lines extend past card outline | Wrap the line first; only shrink the font as last resort |
| Font fallback in PPT | Renders as Calibri instead of Inter / Söhne | Install Söhne (or at minimum Inter) locally; webfont `@import` only works in browsers |
| Pictogram and cards misaligned | Arrow doesn't actually hit its target region | Re-measure the target region in the source pictogram (not the Gemini-blended scheme PNG), compute the SVG y from the pictogram's transparent bbox |
| `xlink:href` missing | Image broken in some renderers | Always include both `href` and `xlink:href` |
| `--` inside an `<!-- -->` comment | XML parse error: "Comment must not contain '--' (double-hyphen)" | Use `===` instead of `---` for visual separators inside XML comments. CSS comments (`/* */`) inside `<style>` blocks are unaffected. |
| `pathLength="100"` not respected | Animated arrow has visible partial dashes when expected to be hidden | Don't rely on `pathLength` normalisation. Compute the actual path length (≈ 168 for shaft, ≈ 47 for V) and set `stroke-dasharray` to that exact value. |
| Animated shaft and head appear at the same time | Visual "everything draws at once" instead of "line, then arrowhead" | Split into two `<path>` elements with separate animations — a single combined path with an `M` move between shaft and V draws them in continuous sweep, no perceived pause |
| Reverse-drawing arrow at loop end looks weird | Line erases from start to end at end of cycle | Fade out via `opacity` instead, then snap `stroke-dashoffset` back to hidden value at 100% while still `opacity: 0` — the dashoffset reset is invisible to the viewer |
| Headless Chrome screenshot doesn't capture mid-animation | `--virtual-time-budget=N` advances the page clock but CSS animation frames may not be rendered at that virtual time | For animated SVGs, **don't rely on the headless screenshot for animation QA**. Verify the static keyframe at 0% (initial state) only. To see the animation, open the SVG in a real browser, or use Playwright + Web Animations API for frame-accurate capture (see § 6). |
| Jaggy / stippled fades in exported GIF | GIF format supports only 1-bit alpha (binary transparent) — partial-alpha pixels get rounded | Bake an opaque backdrop (`#F1ECE2` cream) into each frame before GIF encoding (see § 6). Use APNG or animated WebP if true RGBA in the loop is required. |
| Playwright frame loop leaves an empty `_gif_frames/` directory on Windows | `shutil.rmtree` fails with `PermissionError` because Chrome held a handle | Wrap the cleanup in `try / except PermissionError: pass`. The directory is empty and harmless; rmdir it manually next pass. |
| Edited `_inline.svg` directly, then rebuild overwrote the changes | A subsequent `python rebuild_scheme_assets.py` re-derives `_inline.svg` from the source `.svg` and silently loses any edits made only to the inline variant | Always edit the source `.svg`. If you've already edited the inline file, port the changes back into the source before running the rebuild — see § 2 callout. |
| Filled dashed wrapper paints over the cards | Cards "disappear" inside a cream rectangle the moment the dashed frame fades in, because the wrapper has fill and renders LAST in DOM order | Move the dashed wrapper group BEFORE the card groups in the SVG body so the cards paint on top. See § 4 "Dashed wrapper around a card cluster" for the canonical render order. |
| Cycle extended but build-up feels too fast | Extending the cycle without rescaling existing keyframe percentages stretches everything proportionally — including the wall-clock build-up timing (the opposite of what you want; you typically want the existing build-up to stay put and the HOLD to extend) | Rescale every existing keyframe percentage by `old_cycle / new_cycle` so wall-clock times for build-up steps are preserved. Then move ONLY the fade-out and reset percentages later to make room for the longer hold. |
| GIF only shows part of the cycle (or loops mid-build) after extending the SVG cycle | `rebuild_scheme_assets.py` captures `CYCLE_MS` worth of frames; if the SVG is now 12 s but `CYCLE_MS = 10_000`, the script captures the first 10 s and clips off the final hold / fade-out | Update `CYCLE_MS` in `rebuild_scheme_assets.py` to match the SVG's `animation: … Ns linear infinite` duration. Treat the two as the same source of truth and edit them together. |
| Crossfade between two asset variants has a brief flicker / dip | Using `ease-out` / `ease-in` on the two halves of a crossfade makes the SUM dip below 100 % at the midpoint — looks like the previous variant fades out *to nothing* before the next appears | Use LINEAR easing on both fading halves over the SAME window. Then `(1-t) + t = 1` for any t, so total visibility is constant. See § 5d "Asset swaps via stacked variants". |
| Re-drawing an arrow in iter 2 / 3 leaves a partial-dash artefact at the start | The `stroke-dashoffset` wasn't reset to full while the arrow was invisible between iterations — when the next draw-in starts, dashoffset begins at 0 (drawn) and the line appears instantly instead of drawing | Add a "reset" keyframe pair (`offset_full, opacity: 0`) at a percentage just AFTER the fade-out completes and before the next draw-in starts. See the keyframe sketch in § 5d. |
| Headings on circular-layout clusters end up off-centre | The heading was hand-placed at a literal x-coordinate that matched the cluster's left edge instead of its centre, or was placed relative to the cardinal point (which is the cluster's INSIDE edge, not its centre) | Compute the cluster's geometric centre `(x + w/2)`, place the heading there with `text-anchor="middle"`, baseline ~25 px above the dashed top. See § 4 "Circular / radial layout". |
| Arc-trim windows shrink to nothing when pulling elements inward | Elements pulled too far inward eat most of the circle — the visible arc between two adjacent elements drops below 10° (~50 px), the arrowhead overhangs the source element, and the shaft is barely visible | Keep all four element pulls within ~20 px of each other. If you must pull deep on one side, pull the opposite side similarly. Aim for visible arc spans of 20-40°. See § 4 "Circular / radial layout" pitfalls. |
| `<` inside a CSS `/* … */` comment | XML parse error: "not well-formed (invalid token)". The whole `<style>` body is XML-parsed, so a `<` (e.g. in `40%<->100%` or `0.4<->1.0`) is read as a tag start even inside a CSS comment | Never put `<`, `>`, or a bare `&` in CSS comments. Write "to" instead of "<->". (The §7 note that `--` is fine in CSS comments still holds; `<` is the new gotcha.) |
| `&` in `@import url(...&display=swap)` | XML parse error in `<style>` | Escape as `&amp;`: `...700&amp;display=swap`. |
| Generator/assembler script breaks in a shell heredoc | `cat <<'PY' … PY` chokes on the embedded SVG's quotes / `'''` blocks → "unexpected EOF" | Author the Python build scripts with a file-write tool, not a shell heredoc. |
| Hand-authored keyframes drift once many elements animate | Mistimed reveals, off-by-one percentages, broken loop reset | Generate the keyframes from a seconds-based timeline in Python (§ 5e). Past ~6 animated elements, hand-editing `@keyframes` is not worth it. |
| Exported MP4 won't encode / won't play | Odd pixel dimensions, or no `yuv420p` | `-vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -pix_fmt yuv420p` (see § 6 "Also exporting MP4"). |
| Frames silently overwrite past frame 999 | 3-digit `f_%03d.png` naming on a long cycle (≥ ~1000 frames) | Use `f_%04d.png`. |
| Active cell's far edge stays dashed after activation | The solid-outline overlay only carried one of the cell's two dividers (shared divider assigned to the neighbour) | Give each activated cell's overlay BOTH dividers + top + bottom (full enclosure). See § 5e. |
| De-activated cell's dashed outline looks muted/grey, not crisp | The page-bg veil was drawn AFTER the outline, so it dims the outline too | Draw the dashed (and solid) outline AFTER the veils. Veils mute fill+picto+label only. See § 5e. |
| Warm "flash" overlay stays on after a latching cell settles | The flash overlay was driven by the cell's `latch=True` activation keyframe | Drive flash overlays with a separate `latch=False` pulse so they're transient; the normal solid outline keeps its own `latch=True` keyframe. See § 5e. |

---

## 8 · Quick-start checklist for a new conversion

When asked "convert `scheme_<name>_v<N>.png` to SVG":

1. ☐ Read this file (`styleguide/scheme/svg-from-png-workflow.md`).
2. ☐ Read the source PNG (`monet/results/scheme_<name>_v<N>.png`) and the pictogram starter (`monet/starters/pictogram_<name>.png`).
3. ☐ Run measurement script (§ 3 Step 1) — capture card bbox, arrow thickness, text heights.
4. ☐ Create transparent pictogram (§ 3 Step 2) at `_assets/_shared/pictogram_<name>_transparent.png`.
5. ☐ Author `_assets/_shared/scheme_<name>_annotated.svg` using the § 4 style tokens. Split arrows into shaft + head paths even if not animating yet — keeps the SVG animation-ready.
6. ☐ Render with headless Chrome (§ 3 Step 4) → `_assets/_shared/scheme_<name>_annotated_svg_render.png`.
7. ☐ Re-measure SVG render, compare to targets (§ 3 Step 5). Iterate until within ±1 px.
8. ☐ Show the user the preview PNG inline; ask for content / wording adjustments.
9. ☐ If animation is requested, pick the right pattern:
    - § 5a — slide-enter staggered reveal (runs once)
    - § 5b — looping CSS-only reveal (one-shot pipeline schemes)
    - § 5c — click-to-advance (live presentation control)
    - § 5d — **multi-iteration loop** with asset swaps + travelling-pulse arrows (schemes that depict a repeating process)
    - § 5e — **multi-cell training build-up** (a row/chain of cells activating one-by-one); build it from a Python **generator pipeline**, not by hand. Validate the XML after every assemble.
   Verify by opening the SVG in a real browser, NOT by headless screenshot — or step frames with Playwright (§ 6).
10. ☐ If a GIF/MP4 is requested, capture frames ONCE with Playwright and build both from the same frames (§ 6).
11. ☐ Update `Presentation_Design_Brief.md → Slide <N>` to reference the new SVG asset.

---

## 9 · Cross-references

- **Style sources** — `styleguide/scheme/managed-agents-fig*.png`, `claude-code-auto-mode-fig*.png` (Anthropic editorial register reference)
- **Scheme archetype catalogue** — `styleguide/scheme/README.md` (8 archetypes A–H)
- **Monet PNG sources** — `monet/results/scheme_*.png` (the targets of the conversion)
- **Pictogram starters** — `monet/starters/pictogram_*.png` (the raster embeds)
- **Deck slide spec** — `Presentation_Design_Brief.md → Slide 14 / 15 / 16 / …` (which schemes belong to which slide)
- **Deck handoff overview** — `README.md` (top-level deck workflow)
- **Multi-cell animation worked example** — `_assets/_shared/scheme_adapters_training_v6_anim.svg` + its build pipeline (`_gen_full.py` → `_style.txt` → `_assemble.py`); static source `scheme_adapters_training_v2.svg`. See § 5e.
