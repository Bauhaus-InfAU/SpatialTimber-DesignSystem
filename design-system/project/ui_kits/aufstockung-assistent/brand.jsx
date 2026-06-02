/* SpatialTimber logomark + Aufstockung glyph — SVG string builders.
   Ported from the production app; the single source of truth is
   assets/spatialtimber-assets.mjs at the design-system root. */

function markSVG(){
  const outerW=3.8, innerW=1.0, stroke='#141413';
  const ink={t:'#FBFAF6',l:'#D9D4C8',r:'#ECE8DD'};
  const clay={t:'#D97757',l:'#B85A3C',r:'#CC6A49'};
  function slab(cy,f,cls){
    const a=25,b=12,t=6,cx=50;
    const T=[cx,cy-b],R=[cx+a,cy],B=[cx,cy+b],L=[cx-a,cy];
    const R2=[cx+a,cy+t],B2=[cx,cy+b+t],L2=[cx-a,cy+t];
    const j=p=>p[0]+' '+p[1];
    const pts=arr=>arr.map(p=>p[0]+','+p[1]).join(' ');
    const top=pts([T,R,B,L]),left=pts([L,B,B2,L2]),right=pts([B,R,R2,B2]);
    const innerY=`M ${j(L)} L ${j(B)} M ${j(R)} L ${j(B)} M ${j(B)} L ${j(B2)}`;
    const hex=`M ${j(T)} L ${j(R)} L ${j(R2)} L ${j(B2)} L ${j(L2)} L ${j(L)} Z`;
    const inner=`<polygon points="${top}" fill="${f.t}"/><polygon points="${left}" fill="${f.l}"/><polygon points="${right}" fill="${f.r}"/>`
      +`<path d="${innerY}" fill="none" stroke="${stroke}" stroke-width="${innerW}" stroke-linecap="round" stroke-linejoin="round"/>`
      +`<path d="${hex}" fill="none" stroke="${stroke}" stroke-width="${outerW}" stroke-linejoin="round" stroke-linecap="round"/>`;
    return cls?`<g class="${cls}">${inner}</g>`:inner;
  }
  const cys=[61,47,33];let body='';
  cys.forEach((cy,i)=>body+=slab(cy,i===2?clay:ink,i===2?'st-topplate':''));
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="SpatialTimber logomark"><title>SpatialTimber</title>${body}</svg>`;
}

/* Aufstockung Assistent glyph — plan door swing (clay arc) */
function glyphSVG(){
  const ink='#141413',clay='#D97757';
  const inner='<path d="M18.5 6H5.5V18H11"/><path d="M17.5 18H18.8"/>'
    +'<path d="M11 18V11" stroke="'+clay+'"/>'
    +'<path d="M11 11A7 7 0 0 1 18 18" stroke="'+clay+'"/>';
  return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="'+ink+'" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">'+inner+'</svg>';
}

/* Processing-overlay mark — three rising slabs, ink + clay top */
function procMarkSVG(){
  const stroke='#141413';
  const ink={t:'#FBFAF6',l:'#D9D4C8',r:'#ECE8DD'};
  const clay={t:'#D97757',l:'#B85A3C',r:'#CC6A49'};
  function slab(cy,f,cls){
    const a=25,b=12,t=6,cx=50;
    const T=[cx,cy-b],R=[cx+a,cy],B=[cx,cy+b],L=[cx-a,cy];
    const R2=[cx+a,cy+t],B2=[cx,cy+b+t],L2=[cx-a,cy+t];
    const j=p=>p[0]+' '+p[1];
    const pts=arr=>arr.map(p=>p[0]+','+p[1]).join(' ');
    const hex=`M ${j(T)} L ${j(R)} L ${j(R2)} L ${j(B2)} L ${j(L2)} L ${j(L)} Z`;
    return `<g class="ld-slab ${cls}"><polygon points="${pts([T,R,B,L])}" fill="${f.t}"/>`
      +`<polygon points="${pts([L,B,B2,L2])}" fill="${f.l}"/><polygon points="${pts([B,R,R2,B2])}" fill="${f.r}"/>`
      +`<path d="${hex}" fill="none" stroke="${stroke}" stroke-width="3.8" stroke-linejoin="round" stroke-linecap="round"/></g>`;
  }
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" overflow="visible">`
    +slab(61,ink,'ld-s0')+slab(47,ink,'ld-s1')+slab(33,clay,'ld-s2')+`</svg>`;
}

Object.assign(window,{ markSVG, glyphSVG, procMarkSVG });
