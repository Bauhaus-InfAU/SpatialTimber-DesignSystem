/* Viewer — axonometric massing, floating control bar, processing overlay */
function buildMassing(svg){
  const NS='http://www.w3.org/2000/svg';
  const ang=Math.PI/6, cos=Math.cos(ang), sin=Math.sin(ang), s=10.4;
  const L=34, W=11, Hex=13, Ht=9, Htop=Hex+Ht;
  function p(x,y,z){return [(x-y)*cos, (x+y)*sin - z];}
  const pts=[];
  [[0,0,0],[L,0,0],[L,W,0],[0,W,0],[0,0,Htop],[L,0,Htop],[L,W,Htop],[0,W,Htop]]
    .forEach(c=>pts.push(p(c[0],c[1],c[2])));
  let minx=1e9,maxx=-1e9,miny=1e9,maxy=-1e9;
  pts.forEach(q=>{minx=Math.min(minx,q[0]);maxx=Math.max(maxx,q[0]);miny=Math.min(miny,q[1]);maxy=Math.max(maxy,q[1]);});
  const cw=(maxx-minx)*s, ch=(maxy-miny)*s;
  const ox=(820-cw)/2 - minx*s, oy=(600-ch)/2 - miny*s;
  function SC(x,y,z){const q=p(x,y,z);return [q[0]*s+ox, q[1]*s+oy];}
  function poly(coords,fill,stroke,sw){
    const el=document.createElementNS(NS,'polygon');
    el.setAttribute('points',coords.map(c=>{const q=SC(c[0],c[1],c[2]);return q[0].toFixed(1)+','+q[1].toFixed(1);}).join(' '));
    el.setAttribute('fill',fill);
    if(stroke){el.setAttribute('stroke',stroke);el.setAttribute('stroke-width',sw||1);el.setAttribute('stroke-linejoin','round');}
    svg.appendChild(el);return el;
  }
  function line(a,b,stroke,sw,dash){
    const q1=SC(a[0],a[1],a[2]),q2=SC(b[0],b[1],b[2]);
    const el=document.createElementNS(NS,'line');
    el.setAttribute('x1',q1[0].toFixed(1));el.setAttribute('y1',q1[1].toFixed(1));
    el.setAttribute('x2',q2[0].toFixed(1));el.setAttribute('y2',q2[1].toFixed(1));
    el.setAttribute('stroke',stroke);el.setAttribute('stroke-width',sw||1);
    if(dash)el.setAttribute('stroke-dasharray',dash);
    el.setAttribute('stroke-linecap','round');
    svg.appendChild(el);return el;
  }
  const gp=14;
  poly([[-gp,-gp,0],[L+gp,-gp,0],[L+gp,W+gp,0],[-gp,W+gp,0]],'rgba(221,206,185,0.50)',null,0);
  const gstep=2.5;
  for(let gx=-gp; gx<=L+gp+0.01; gx+=gstep) line([gx,-gp,0],[gx,W+gp,0],'rgba(111,108,99,0.13)',0.6);
  for(let gy=-gp; gy<=W+gp+0.01; gy+=gstep) line([-gp,gy,0],[L+gp,gy,0],'rgba(111,108,99,0.13)',0.6);
  (function(){
    const off=2.4;const el=document.createElementNS(NS,'polygon');
    el.setAttribute('points',[[off,off],[L+off,off],[L+off,W+off],[off,W+off]].map(c=>{const q=SC(c[0],c[1],0);return q[0].toFixed(1)+','+q[1].toFixed(1);}).join(' '));
    el.setAttribute('fill','rgba(20,20,19,0.13)');el.setAttribute('filter','blur(3px)');svg.appendChild(el);
  })();
  const exL='#c4bfb1', exR='#b1ac9e';
  poly([[0,0,0],[L,0,0],[L,0,Hex],[0,0,Hex]], exL,'#3d3b37',1.1);
  poly([[L,0,0],[L,W,0],[L,W,Hex],[L,0,Hex]], exR,'#3d3b37',1.1);
  for(let fz=2.4; fz<Hex-1.4; fz+=3){
    for(let fx=2; fx<L-1.4; fx+=3){
      const el=document.createElementNS(NS,'polygon');
      const a=SC(fx,0,fz),b=SC(fx+1.7,0,fz),c=SC(fx+1.7,0,fz+1.7),d=SC(fx,0,fz+1.7);
      el.setAttribute('points',[a,b,c,d].map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' '));
      el.setAttribute('fill','rgba(20,20,19,0.06)');svg.appendChild(el);
    }
  }
  const tL='#edcbb5', tR='#ddb295', tTop='#f3ddcd';
  poly([[0,0,Hex],[L,0,Hex],[L,0,Htop],[0,0,Htop]], tL,'#b5876a',1.2);
  poly([[L,0,Hex],[L,W,Hex],[L,W,Htop],[L,0,Htop]], tR,'#b5876a',1.2);
  poly([[0,0,Htop],[L,0,Htop],[L,W,Htop],[0,W,Htop]], tTop,'#b5876a',1.2);
  for(let gx=2.5; gx<L; gx+=2.5) line([gx,0,Htop],[gx,W,Htop],'rgba(181,135,106,0.42)',0.6);
  for(let gy=2.5; gy<W; gy+=2.5) line([0,gy,Htop],[L,gy,Htop],'rgba(181,135,106,0.42)',0.6);
  (function(){
    const o=SC(6,W/2,Htop);
    line([6,W/2,Htop],[12.5,W/2,Htop],'#D97757',1.8);
    const dot=document.createElementNS(NS,'circle');dot.setAttribute('cx',o[0]);dot.setAttribute('cy',o[1]);dot.setAttribute('r',3.4);dot.setAttribute('fill','#D97757');svg.appendChild(dot);
  })();
  for(let f=1;f<3;f++){
    line([0,0,Hex+f*3],[L,0,Hex+f*3],'rgba(181,135,106,0.8)',1);
    line([L,0,Hex+f*3],[L,W,Hex+f*3],'rgba(150,110,86,0.8)',1);
  }
  for(let mx=2.5; mx<L; mx+=2.5) line([mx,0,Hex],[mx,0,Htop],'rgba(181,135,106,0.38)',0.6);
  let floorHL=null;
  function drawFloorHL(fl){
    if(floorHL)floorHL.forEach(e=>e.remove());
    const z0=Hex+(fl-1)*3, z1=Hex+fl*3;
    const a=poly([[0,0,z0],[L,0,z0],[L,0,z1],[0,0,z1]],'rgba(217,119,87,0.32)','#D97757',1.5);
    const b=poly([[L,0,z0],[L,W,z0],[L,W,z1],[L,0,z1]],'rgba(217,119,87,0.24)','#D97757',1.5);
    floorHL=[a,b];
  }
  drawFloorHL(1);
  return drawFloorHL;
}

function Seg({options, value, onChange}){
  return (
    <div className="seg">
      {options.map(o=>(
        <button key={o.v} className={value===o.v?'active':''} onClick={()=>onChange(o.v)}>{o.label}</button>
      ))}
    </div>
  );
}

function Viewer({floor, onFloor, view, onView, display, onDisplay, proc}){
  const svgRef = React.useRef(null);
  const procRef = React.useRef(null);
  const setFloorRef = React.useRef(null);
  React.useEffect(()=>{
    if(svgRef.current){ svgRef.current.innerHTML=''; setFloorRef.current = buildMassing(svgRef.current); }
    if(procRef.current) procRef.current.innerHTML = window.procMarkSVG();
  },[]);
  React.useEffect(()=>{ if(setFloorRef.current) setFloorRef.current(floor); },[floor]);

  return (
    <div className="col reveal d3">
      <div className="viewer" id="viewer">
        <svg id="massing" ref={svgRef} viewBox="0 0 820 600" preserveAspectRatio="xMidYMid meet"></svg>
        <div className="viewer-meta">
          <span className="vm-eyebrow">Aufstockung · 3 timber floors</span>
          <span className="vm-title">Storkower Straße — existing volume + extension</span>
        </div>
        <div className="scale-chip"><span className="bar"></span> 10 m</div>
        <div className="gattr">© Google · Imagery 2026</div>
        <div className={"proc-overlay"+(proc.on?' on':'')} role="status" aria-live="polite">
          <div className="proc-mark" ref={procRef}></div>
          <div className="proc-label"><span>{proc.label}</span></div>
        </div>
        <div className="controls">
          <div className="ctrl-group">
            <span className="ctrl-lbl">View</span>
            <Seg value={view} onChange={onView} options={[{v:'top',label:'Top'},{v:'3d',label:'3D'}]} />
          </div>
          <div className="ctrl-sep"></div>
          <div className="ctrl-group">
            <span className="ctrl-lbl">Floor</span>
            <Seg value={floor} onChange={onFloor} options={[{v:1,label:'1'},{v:2,label:'2'},{v:3,label:'3'}]} />
          </div>
          <div className="ctrl-sep"></div>
          <div className="ctrl-group">
            <span className="ctrl-lbl">Display</span>
            <Seg value={display} onChange={onDisplay} options={[{v:'layout',label:'Layout'},{v:'perf',label:'Performance'}]} />
          </div>
        </div>
      </div>
    </div>
  );
}
window.Viewer = Viewer;
