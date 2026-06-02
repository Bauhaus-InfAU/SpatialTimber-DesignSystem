/* InputsRail — the "set up" rail: generate action, site, 4 steps, storeys, mix */
const MIX_TARGET = [
  {type:'1-room', area:'30–45 m²', pct:20, color:'var(--peach)'},
  {type:'2-room', area:'45–65 m²', pct:35, color:'var(--clay)'},
  {type:'3-room', area:'65–85 m²', pct:25, color:'var(--olive)'},
  {type:'4-room', area:'85–100 m²', pct:20, color:'var(--sky)'},
];
const STEP_DEFS = [
  {n:1, title:'Set generation grid', hint:'1 point · 1 direction · 625 mm'},
  {n:2, title:'Set roof outline', hint:'draw the extension footprint'},
  {n:3, title:'Set circulation cores', hint:'stairs / lift shafts'},
  {n:4, title:'Set support points', hint:'grid-snapped load points'},
];

function InputsRail({collapsed, onToggle, onGenerate}){
  const [done, setDone] = React.useState([true,true,true,false]);
  const [storeys, setStoreys] = React.useState(3);
  const ready = done.every(Boolean);
  const toggle = i => setDone(d => d.map((v,j)=> j===i ? !v : v));

  return (
    <div className={"col reveal d2"} id="leftCol">
      <div className="rail-head">
        <button className="rail-toggle" title="Collapse inputs" onClick={onToggle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="rail-head-text">
          <span className="rail-eyebrow">Inputs</span>
          <span className="rail-sub">Define the extension, then generate.</span>
        </div>
      </div>
      <div className="rail-body">
        <div className="card gen-card">
          <button className="gen-btn" disabled={!ready} onClick={()=>ready && onGenerate()}>
            <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5L13 3Z"/></svg>
            Generate Layout
          </button>
          <p className="gen-note">{ready ? 'grid, outline, cores & supports set · ready to generate' : 'complete grid, outline, cores & supports to enable'}</p>
          <div className="affords">
            <button className="afford">Save</button>
            <button className="afford">Load</button>
            <button className="afford">Next variant</button>
          </div>
        </div>
        <div className="rail-scroll">
          <div className="card">
            <div className="sec-label">Site location</div>
            <div className="site-field">
              <svg className="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <input defaultValue="Berlin · 52.5732, 13.4181" spellCheck="false" />
              <button className="go-btn">Go</button>
            </div>
          </div>

          <div className="card">
            <div className="sec-label">Define the extension</div>
            <div className="steps">
              {STEP_DEFS.map((s,i)=>(
                <div className="step" key={s.n} onClick={()=>toggle(i)} title="Toggle complete">
                  <span className="n">{s.n}</span>
                  <div className="st-body">
                    <span className="st-title">{s.title}</span>
                    <span className="st-hint">{s.hint}</span>
                  </div>
                  <span className={"dot "+(done[i]?'done':'todo')}></span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="storeys">
              <span className="lbl">Nr. of storeys</span>
              <div className="stepper">
                <button aria-label="decrease" onClick={()=>setStoreys(n=>Math.max(1,n-1))}>−</button>
                <span className="val">{storeys}</span>
                <button aria-label="increase" onClick={()=>setStoreys(n=>Math.min(6,n+1))}>+</button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="sec-label">Apartment mix <span className="tag">Target</span></div>
            <div className="mix-rows">
              {MIX_TARGET.map(m=>(
                <div className="mix-row" key={m.type}>
                  <span className="swatch" style={{background:m.color}}></span>
                  <span className="type">{m.type}</span>
                  <span className="area">{m.area}</span>
                  <span className="pct">{m.pct}%</span>
                </div>
              ))}
            </div>
            <div className="stack-bar">
              {MIX_TARGET.map(m=>(<span key={m.type} style={{background:m.color, width:m.pct+'%'}}></span>))}
            </div>
          </div>
        </div>
      </div>
      <button className="rail-tab" title="Expand inputs" onClick={onToggle}>
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <span className="vlabel">Inputs</span>
      </button>
    </div>
  );
}
window.InputsRail = InputsRail;
