#!/usr/bin/env node
/**
 * SpatialTimber — brand asset generator
 * ------------------------------------------------------------------
 * Zero-dependency generator for the SpatialTimber logomark, full
 * lockup, the three module glyphs, and favicon sets. Emits clean
 * inline SVG. Works as a library (import) or a CLI (node ...).
 *
 *   LIBRARY
 *     import { logoSVG, lockupSVG, glyphSVG, faviconSet } from './spatialtimber-assets.mjs';
 *     const svg = logoSVG({ variant: 'accent' });
 *
 *   CLI
 *     node spatialtimber-assets.mjs logo    --variant=accent   --out=logo.svg
 *     node spatialtimber-assets.mjs logo    --variant=reversed --animate --out=logo.svg
 *     node spatialtimber-assets.mjs lockup  --variant=mono     --out=lockup.svg
 *     node spatialtimber-assets.mjs glyph   --module=structural --out=glyph.svg
 *     node spatialtimber-assets.mjs favicon --out-dir=./favicons     (16/24/32/48)
 *     node spatialtimber-assets.mjs all     --out-dir=./brand        (everything)
 *
 *   PNG: append --png (and optional --size=512). Requires `sharp`
 *   (npm i sharp) to be installed; otherwise the SVG is written and
 *   a note is printed. SVG output never needs any dependency.
 *
 * Brand rules baked in: clay (#D97757) is an accent only — the mark
 * is legible in one ink colour. Sub-project glyphs are flat 2-D
 * line drawings (plan / side elevation), never axonometric (that
 * reading is reserved for the master mark).
 * ------------------------------------------------------------------
 */

export const TOKENS = {
  ink:       '#141413',
  clay:      '#D97757',
  clayDark:  '#9E4A30',
  paper:     '#FAF9F5',
  card:      '#F0EEE6',
  oat:       '#E3DACC',
  peach:     '#EBC9B7',
  olive:     '#788C5D',
  sky:       '#6A9BCC',
  gray:      '#6f6c63',
  // mark face shading (top / left / right)
  inkFaces:  { t:'#FBFAF6', l:'#D9D4C8', r:'#ECE8DD' },
  clayFaces: { t:'#D97757', l:'#B85A3C', r:'#CC6A49' },
};

/* ---------------------------------------------------------------- *
 * LOGOMARK — three snug axonometric timber slabs; top slab = the
 * added storey, carried in clay.
 * ---------------------------------------------------------------- */
function markBody(variant, { animate = false } = {}) {
  const outerW = 3.8, innerW = 1.0;
  let ink, clay, stroke;
  if (variant === 'mono') {
    ink = TOKENS.inkFaces;
    clay = { t:'#141413', l:'#3A3935', r:'#56544E' };
    stroke = '#141413';
  } else if (variant === 'reversed') {
    ink = { t:'#1A1A18', l:'#2B2924', r:'#201F1C' };
    clay = TOKENS.clayFaces;
    stroke = '#ECE8DD';
  } else { // accent (default)
    ink = TOKENS.inkFaces;
    clay = TOKENS.clayFaces;
    stroke = '#141413';
  }

  function slab(cy, f, cls) {
    const a = 25, b = 12, t = 6, cx = 50;
    const T=[cx,cy-b], R=[cx+a,cy], B=[cx,cy+b], L=[cx-a,cy];
    const R2=[cx+a,cy+t], B2=[cx,cy+b+t], L2=[cx-a,cy+t];
    const j = p => p[0] + ' ' + p[1];
    const pts = arr => arr.map(p => p[0] + ',' + p[1]).join(' ');
    const top = pts([T,R,B,L]), left = pts([L,B,B2,L2]), right = pts([B,R,R2,B2]);
    const innerY = `M ${j(L)} L ${j(B)} M ${j(R)} L ${j(B)} M ${j(B)} L ${j(B2)}`;
    const hex = `M ${j(T)} L ${j(R)} L ${j(R2)} L ${j(B2)} L ${j(L2)} L ${j(L)} Z`;
    const inner =
        `<polygon points="${top}" fill="${f.t}"/>`
      + `<polygon points="${left}" fill="${f.l}"/>`
      + `<polygon points="${right}" fill="${f.r}"/>`
      + `<path d="${innerY}" fill="none" stroke="${stroke}" stroke-width="${innerW}" stroke-linecap="round" stroke-linejoin="round"/>`
      + `<path d="${hex}" fill="none" stroke="${stroke}" stroke-width="${outerW}" stroke-linejoin="round" stroke-linecap="round"/>`;
    return cls ? `<g class="${cls}">${inner}</g>` : inner;
  }

  const cys = [61, 47, 33]; // bottom -> top
  let body = '';
  cys.forEach((cy, i) => body += slab(cy, i === 2 ? clay : ink, i === 2 ? 'st-topplate' : ''));

  if (animate) {
    body =
        `<style>`
      + `.st-topplate{transform-box:view-box;transform-origin:center;animation:st-float 2.6s ease-in-out infinite;}`
      + `@keyframes st-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`
      + `@media (prefers-reduced-motion:reduce){.st-topplate{animation:none}}`
      + `</style>` + body;
  }
  return body;
}

export function logoSVG({ variant = 'accent', size = null, animate = false } = {}) {
  const dim = size ? ` width="${size}" height="${size}"` : '';
  return `<svg viewBox="0 0 100 100"${dim} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SpatialTimber logomark">`
       + `<title>SpatialTimber</title>${markBody(variant, { animate })}</svg>`;
}

/* ---------------------------------------------------------------- *
 * FULL LOCKUP — mark + wordmark. Wordmark is Inter; weight leads on
 * "Spatial" (700) with "Timber" stepping back (500). Tracking
 * -0.022em. Single word, capital T the only case signal.
 * ---------------------------------------------------------------- */
export function lockupSVG({ variant = 'accent', animate = false } = {}) {
  const textColor = variant === 'reversed' ? '#ECE8DD' : TOKENS.ink;
  // mark scaled into a 92x92 box on the left, baseline-aligned text to its right
  const mark = `<g transform="translate(0,4) scale(0.92)">${markBody(variant, { animate })}</g>`;
  const tracking = (-0.022 * 46).toFixed(2); // em -> px at 46px size
  return (
`<svg viewBox="0 0 430 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SpatialTimber">
  <title>SpatialTimber</title>
  ${mark}
  <text x="108" y="64" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="46" letter-spacing="${tracking}" fill="${textColor}"><tspan font-weight="700">Spatial</tspan><tspan font-weight="500">Timber</tspan></text>
</svg>`);
}

/* ---------------------------------------------------------------- *
 * MODULE GLYPHS — flat 2-D line drawings, ink stroke + one clay
 * accent. Plan or side elevation. Never axonometric.
 *   assistant  → A3 plan door swing (layout generation)
 *   furnisher  → F5 floor lamp, side elevation (fit-out)
 *   structural → S2 column grid 2x2, beam line keyed (FEM)
 * ---------------------------------------------------------------- */
export function glyphSVG(moduleName) {
  const clay = TOKENS.clay, ink = TOKENS.ink;
  let inner = '', join = 'round', cap = 'round';
  switch (moduleName) {
    case 'assistant': // Aufstockung Assistent — building + clay storey growing up
      join = 'miter'; cap = 'square';
      inner = '<path d="M5 10.5H19V20H5Z"/><path d="M5 15.3H19"/>'
            + `<path d="M12 9V3.4" stroke="${clay}" stroke-linecap="round"/>`
            + `<path d="M9.4 5.8L12 3.2L14.6 5.8" stroke="${clay}" stroke-linecap="round" stroke-linejoin="round"/>`;
      break;
    case 'furnisher': // Furnisher
      join = 'miter'; cap = 'square';
      inner = '<path d="M9.5 19H14.5"/><path d="M12 19V8.4"/>'
            + `<path d="M8.5 8.4H15.5L13.8 4.5H10.2Z" fill="${clay}" stroke="none"/>`;
      break;
    case 'structural': // Structural Analysis
      inner = '<path d="M5 6H19"/><path d="M5 12H19"/><path d="M5 18H19"/><path d="M5 6V18"/><path d="M12 6V18"/><path d="M19 6V18"/>'
            + `<path d="M12 6V18" stroke="${clay}" stroke-width="2.8"/>`;
      break;
    default: // blank template (for a future sub-project)
      inner = '<rect x="4" y="4" width="16" height="16" rx="1.5" stroke-dasharray="2.4 2.4"/>'
            + '<line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>';
  }
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${moduleName} glyph" `
       + `fill="none" stroke="${ink}" stroke-width="1.7" stroke-linejoin="${join}" stroke-linecap="${cap}">`
       + `${inner}</svg>`;
}

/* ---------------------------------------------------------------- *
 * FAVICON SET — logomark at common favicon sizes.
 * ---------------------------------------------------------------- */
export function faviconSet({ variant = 'accent', sizes = [16, 24, 32, 48] } = {}) {
  return sizes.map(s => ({ size: s, svg: logoSVG({ variant, size: s }) }));
}

export const MODULES = ['assistant', 'furnisher', 'structural'];
export const VARIANTS = ['accent', 'mono', 'reversed'];

/* ================================================================ *
 * CLI
 * ================================================================ */
const isMain = (() => {
  try {
    return import.meta.url === `file://${process.argv[1]}`
        || import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/'));
  } catch { return false; }
})();

if (isMain) {
  const [, , cmd, ...rest] = process.argv;
  const opts = {};
  for (const a of rest) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) opts[m[1]] = m[2] === undefined ? true : m[2];
  }
  const fs = await import('node:fs');
  const path = await import('node:path');

  async function emit(svg, outPath) {
    const wantPng = !!opts.png || /\.png$/i.test(outPath || '');
    if (wantPng) {
      const size = parseInt(opts.size || '512', 10);
      try {
        const sharp = (await import('sharp')).default;
        const png = await sharp(Buffer.from(svg)).resize(size, size, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } }).png().toBuffer();
        const p = (outPath || 'asset.png').replace(/\.svg$/i, '.png');
        fs.mkdirSync(path.dirname(p), { recursive: true });
        fs.writeFileSync(p, png);
        console.log('wrote', p, `(${size}px)`);
        return;
      } catch {
        console.warn('! sharp not installed — writing SVG instead (run: npm i sharp for PNG)');
      }
    }
    if (outPath) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, svg);
      console.log('wrote', outPath);
    } else {
      process.stdout.write(svg + '\n');
    }
  }

  const variant = opts.variant || 'accent';
  const animate = !!opts.animate;

  switch (cmd) {
    case 'logo':
      await emit(logoSVG({ variant, animate, size: opts.size ? parseInt(opts.size,10) : null }), opts.out);
      break;
    case 'lockup':
      await emit(lockupSVG({ variant, animate }), opts.out);
      break;
    case 'glyph':
      await emit(glyphSVG(opts.module || 'assistant'), opts.out);
      break;
    case 'favicon': {
      const dir = opts['out-dir'] || './favicons';
      for (const { size, svg } of faviconSet({ variant })) {
        await emit(svg, path.join(dir, `favicon-${size}.svg`));
      }
      break;
    }
    case 'all': {
      const dir = opts['out-dir'] || './brand';
      for (const v of VARIANTS) {
        await emit(logoSVG({ variant: v }), path.join(dir, `logo-${v}.svg`));
        await emit(lockupSVG({ variant: v }), path.join(dir, `lockup-${v}.svg`));
      }
      await emit(logoSVG({ variant: 'accent', animate: true }), path.join(dir, 'logo-accent-animated.svg'));
      for (const m of MODULES) await emit(glyphSVG(m), path.join(dir, `glyph-${m}.svg`));
      for (const { size, svg } of faviconSet()) await emit(svg, path.join(dir, `favicon-${size}.svg`));
      break;
    }
    default:
      console.log(`SpatialTimber asset generator

Usage:
  node spatialtimber-assets.mjs logo    --variant=accent|mono|reversed [--animate] [--size=N] [--png] --out=logo.svg
  node spatialtimber-assets.mjs lockup  --variant=accent|mono|reversed [--animate] --out=lockup.svg
  node spatialtimber-assets.mjs glyph   --module=assistant|furnisher|structural --out=glyph.svg
  node spatialtimber-assets.mjs favicon --variant=accent --out-dir=./favicons
  node spatialtimber-assets.mjs all     --out-dir=./brand

PNG output needs:  npm i sharp`);
  }
}
