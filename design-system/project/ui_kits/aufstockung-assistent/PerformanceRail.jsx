/* PerformanceRail — achieved mix + selectable metric rows + detail panel */
const METRICS = {
  layout:[
    {name:'Daylight', scope:'Rooms', val:0.70, min:0.41, max:0.95, dist:[0.70,0.62,0.88,0.55,0.74,0.91,0.49,0.66,0.81,0.58,0.41,0.95]},
    {name:'Accessibility', scope:'Rooms', val:0.86, min:0.60, max:0.99, dist:[0.86,0.91,0.78,0.95,0.83,0.99,0.72,0.88,0.81,0.93,0.60,0.76]},
    {name:'Furnishability', scope:'Rooms', val:0.81, min:0.44, max:0.97, dist:[0.81,0.76,0.92,0.68,0.85,0.59,0.97,0.73,0.88,0.44,0.79,0.64]},
    {name:'Efficiency', scope:'Apartments', val:0.78, min:0.52, max:0.94, dist:[0.78,0.83,0.71,0.66,0.88,0.94,0.59,0.81,0.74,0.52,0.69,0.85]},
  ],
  structural:[
    {name:'Utilization', scope:'Structural', val:0.71, min:0.27, max:0.91, dist:[0.91,0.88,0.64,0.52,0.83,0.80,0.31,0.48,0.69,0.66,0.27,0.41]},
  ],
  staticRows:[
    {name:'Material', scope:'Building', val:'600 t'},
    {name:'CO₂', scope:'Building', val:'184 t'},
  ],
};
const MIX_ACHIEVED = [
  {type:'1-room', tg:20, ac:17, d:-3, color:'var(--peach)'},
  {type:'2-room', tg:35, ac:33, d:-2, color:'var(--clay)'},
  {type:'3-room', tg:25, ac:17, d:-8, color:'var(--olive)'},
  {type:'4-room', tg:20, ac:33, d:13, color:'var(--sky)'},
];
const SCOPE_LONG = {Rooms:'per room', Apartments:'per apartment', Structural:'per element', Building:'building total', Programme:'achieved vs target'};

function Histogram({metric}){
  const ref = React.useRef(null);
  React.useEffect(()=>{
    const svg = ref.current; if(!svg) return; svg.innerHTML='';
    const NS='http://www.w3.org/2000/svg';
    const W=336,H=62,padX=3,top=6,base=H-6;
    const {min,max,val:sel,dist}=metric;
    const span=(max-min)||1;
    const sorted=[...dist].sort((a,b)=>a-b);
    const n=sorted.length, gap=4;
    const bw=(W-padX*2-gap*(n-1))/n;
    let nd=1e9, ni=0;
    sorted.forEach((v,i)=>{const d=Math.abs(v-sel);if(d<nd){nd=d;ni=i;}});
    sorted.forEach((v,i)=>{
      const x=padX+i*(bw+gap);
      const h=Math.max(3,(v-min)/span*(base-top));
      const r=document.createElementNS(NS,'rect');
      r.setAttribute('x',x.toFixed(1)); r.setAttribute('y',(base-h).toFixed(1));
      r.setAttribute('width',bw.toFixed(1)); r.setAttribute('height',h.toFixed(1)); r.setAttribute('rx','3');
      r.setAttribute('fill', i===ni?'#D97757':'rgba(217,119,87,0.26)');
      r.style.transformBox='fill-box'; r.style.transformOrigin='bottom';
      r.style.animation='barGrow .45s cubic-bezier(.2,0,0,1) '+(i*0.04)+'s both';
      svg.appendChild(r);
    });
    const sy=base-(Math.min(Math.max(sel,min),max)-min)/span*(base-top);
    const th=document.createElementNS(NS,'line');
    th.setAttribute('x1',padX-1); th.setAttribute('x2',W-padX+1);
    th.setAttribute('y1',sy.toFixed(1)); th.setAttribute('y2',sy.toFixed(1));
    th.setAttribute('stroke','#D97757'); th.setAttribute('stroke-width','1.2'); th.setAttribute('stroke-dasharray','3 4');
    svg.appendChild(th);
  },[metric]);
  return <svg id="histo" ref={ref} viewBox="0 0 336 62" preserveAspectRatio="none"></svg>;
}

function MetricRow({m, active, onClick}){
  return (
    <div className={"metric"+(active?' active':'')} onClick={onClick}>
      <div className="m-left"><span className="m-name">{m.name}</span><span className="m-scope">{m.scope}</span></div>
      <span className="m-val">{typeof m.val==='number'?m.val.toFixed(2):m.val}</span>
    </div>
  );
}

function PerformanceRail({collapsed, onToggle, selected, onSelect}){
  const isMix = selected==='mix';
  const all = [...METRICS.layout, ...METRICS.structural];
  const cur = all.find(m=>m.name===selected);

  return (
    <div className="col reveal d4" id="rightCol">
      <div className="rail-head">
        <div className="rail-head-text">
          <span className="rail-eyebrow">Performance</span>
          <span className="rail-sub">How the generated layout scores.</span>
        </div>
        <button className="rail-toggle" title="Collapse performance" onClick={onToggle}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div className="rail-body">
        <div className="card" style={{flex:1, minHeight:0, display:'flex', flexDirection:'column'}}>
          <div className="sec-label">Apartment mix</div>
          <div className="metrics">
            <div className={"metric"+(isMix?' active':'')} onClick={()=>onSelect('mix')}>
              <div className="m-left"><span className="m-name">Apartment mix</span><span className="m-scope">Achieved</span></div>
              <span className="m-val mix-mini">
                {MIX_ACHIEVED.map(m=>(<span key={m.type} style={{background:m.color, flex:m.ac}}></span>))}
              </span>
            </div>
          </div>

          <div className="divider-row"></div>
          <div className="sec-label" style={{marginTop:8}}>Layout qualities</div>
          <div className="metrics">
            {METRICS.layout.map(m=>(<MetricRow key={m.name} m={m} active={selected===m.name} onClick={()=>onSelect(m.name)} />))}
          </div>

          <div className="divider-row"></div>
          <div className="sec-label" style={{marginTop:8}}>Structural efficiency</div>
          <div className="metrics">
            {METRICS.structural.map(m=>(<MetricRow key={m.name} m={m} active={selected===m.name} onClick={()=>onSelect(m.name)} />))}
            {METRICS.staticRows.map(m=>(
              <div className="metric" key={m.name} style={{cursor:'default'}}>
                <div className="m-left"><span className="m-name">{m.name}</span><span className="m-scope">{m.scope}</span></div>
                <span className="m-val">{m.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail">
          {isMix ? (
            <React.Fragment>
              <div className="detail-head">
                <span className="dh-name">Apartment mix</span>
                <span className="dh-scope">Programme · achieved vs target</span>
              </div>
              <div className="mix-detail">
                <div className="mix-dhead"><span className="h-room">Room type</span><span>Target</span><span>Achieved</span><span>Δ</span></div>
                {MIX_ACHIEVED.map(m=>(
                  <div className="mix-drow" key={m.type}>
                    <span className="sw" style={{background:m.color}}></span>
                    <span className="type">{m.type}</span>
                    <span className="tg">{m.tg}%</span>
                    <span className="ac">{m.ac}%</span>
                    <span className={"dl "+(m.d<0?'under':'over')}>{m.d<0?'−':'+'}{Math.abs(m.d)}</span>
                  </div>
                ))}
              </div>
              <div className="stack-bar">
                {MIX_ACHIEVED.map(m=>(<span key={m.type} style={{background:m.color, width:m.ac+'%'}}></span>))}
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="detail-head">
                <span className="dh-name">{cur.name}</span>
                <span className="dh-scope">{cur.scope} · {SCOPE_LONG[cur.scope]}</span>
              </div>
              <div className="minmax">
                <div className="mm"><span className="k">Min</span><span className="v">{cur.min.toFixed(2)}</span></div>
                <div className="mm cur"><span className="k">Selected</span><span className="v">{cur.val.toFixed(2)}</span></div>
                <div className="mm"><span className="k">Max</span><span className="v">{cur.max.toFixed(2)}</span></div>
              </div>
              <Histogram metric={cur} />
              <div className="histo-axis"><span>{cur.min.toFixed(2)}</span><span>distribution</span><span>{cur.max.toFixed(2)}</span></div>
            </React.Fragment>
          )}
        </div>
      </div>
      <button className="rail-tab" title="Expand performance" onClick={onToggle}>
        <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        <span className="vlabel">Performance</span>
      </button>
    </div>
  );
}
window.PerformanceRail = PerformanceRail;
