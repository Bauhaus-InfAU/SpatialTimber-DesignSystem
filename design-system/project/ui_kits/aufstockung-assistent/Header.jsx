/* Header — brand lockup + module descriptor + project links + funder logos */
function Header(){
  const markRef = React.useRef(null);
  const glyphRef = React.useRef(null);
  React.useEffect(()=>{
    if(markRef.current) markRef.current.innerHTML = window.markSVG();
    if(glyphRef.current) glyphRef.current.innerHTML = window.glyphSVG();
  },[]);
  return (
    <header className="reveal d1">
      <div className="brand">
        <div className="st-lockup">
          <span className="logo">
            <span className="st-mark" ref={markRef}></span>
            <span className="wm"><span className="s-spatial">Spatial</span><span className="s-timber">Timber</span></span>
          </span>
          <span className="lockup-div"></span>
          <span className="st-mod">
            <span className="glyph-tile" ref={glyphRef}></span>
            <span className="mod-text">
              <span className="mod-kicker">Layout · Generation</span>
              <span className="mod-name">Aufstockung Assistent</span>
            </span>
          </span>
        </div>
        <span className="st-byline"><b>Bauhaus-Universität Weimar</b> &nbsp;&amp;&nbsp; <b>TU Dresden</b></span>
      </div>
      <div className="header-right">
        <div className="links">
          <a className="link-pill" href="#" title="Open project information">Project info
            <svg className="ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>
          </a>
          <a className="link-pill" href="#" title="View source on GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub
          </a>
        </div>
        <div className="hr-divider"></div>
        <div className="funded">
          <span className="funded-lbl">Funded by</span>
          <div className="funded-logos">
            <a href="https://www.bmwsb.bund.de" target="_blank" rel="noopener noreferrer" title="Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen">
              <img className="logo-bmwsb" src="../../assets/bmwsb_logo.png" alt="BMWSB" />
            </a>
            <a href="https://www.zukunftbau.de" target="_blank" rel="noopener noreferrer" title="Zukunft Bau — Fördern, Forschen, Entwickeln">
              <img className="logo-zb" src="../../assets/zukunftbau_logo.png" alt="Zukunft Bau" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
window.Header = Header;
