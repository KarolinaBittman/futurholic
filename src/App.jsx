import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#070709;--s1:#0e0e12;--s2:#141418;--s3:#1c1c22;
  --ac:#F0EDE8;--ac2:#ffffff;
  --text:#F0EDE8;--muted:#52515a;--muted2:#7a7885;--border:rgba(240,237,232,0.08);
  --syne:'Plus Jakarta Sans',sans-serif;--inter:'Plus Jakarta Sans',sans-serif;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--inter);font-weight:300;-webkit-font-smoothing:antialiased;overflow-x:hidden}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:22px 44px;transition:all .3s}
.nav.sc{background:rgba(7,7,9,.9);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);padding:14px 44px}
.logo{font-family:var(--syne);font-size:20px;font-weight:700;color:var(--text);text-decoration:none;letter-spacing:-.01em}
.logo span{color:var(--muted2)}
.nr{display:flex;align-items:center;gap:32px}
.nr a{font-size:13px;color:var(--muted2);text-decoration:none;transition:color .2s;letter-spacing:.04em;position:relative}
.nr a:not(.ncta)::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:var(--text);transition:width .3s ease}
.nr a:not(.ncta):hover::after{width:100%}
.nr a:hover{color:var(--text)}
.ncta{background:var(--ac)!important;color:#0a0a0c!important;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:10px 22px;border-radius:100px;text-decoration:none;transition:all .2s ease}
.ncta:hover{background:#ffffff!important;color:#0a0a0c!important;transform:scale(1.04)}

.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:140px 48px 72px;position:relative;overflow:hidden}
.orb1{position:absolute;top:-15%;right:-10%;width:60vw;height:60vw;border-radius:50%;background:radial-gradient(circle,rgba(240,237,232,.04) 0%,transparent 65%);pointer-events:none}
.orb2{position:absolute;bottom:-20%;left:-10%;width:45vw;height:45vw;border-radius:50%;background:radial-gradient(circle,rgba(240,237,232,.02) 0%,transparent 65%);pointer-events:none}
.glines{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,transparent 35%,black 100%);pointer-events:none}
.badge{display:inline-flex;align-items:center;gap:8px;background:var(--s2);border:1px solid var(--border);border-radius:100px;padding:8px 16px;font-size:12px;color:var(--muted2);margin-bottom:48px;width:fit-content}
.bdot{width:6px;height:6px;border-radius:50%;background:var(--ac);box-shadow:0 0 8px rgba(240,237,232,.5);animation:pulse 2.5s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes revealUp{from{transform:translateY(105%);opacity:0}to{transform:translateY(0%);opacity:1}}
@keyframes btnPulse{0%,100%{box-shadow:0 0 0 0 rgba(240,237,232,0)}50%{box-shadow:0 0 0 10px rgba(240,237,232,.06)}}
.ht{font-family:var(--syne);font-size:clamp(48px,7.5vw,100px);font-weight:800;line-height:1.05;letter-spacing:-.035em;margin-bottom:56px}
.ht .solid{display:block;color:var(--text)}
.hb{display:flex;align-items:flex-end;justify-content:space-between;gap:40px}
.hdesc{font-size:16px;color:var(--muted2);max-width:380px;line-height:1.8}
.hdesc strong{color:var(--text);font-weight:400}
.hbtns{display:flex;gap:12px;flex-shrink:0}
.bmain{display:inline-flex;align-items:center;gap:10px;background:var(--ac);color:#0a0a0c;font-size:14px;font-weight:700;padding:16px 32px;border-radius:100px;text-decoration:none;border:none;cursor:pointer;transition:all 0.25s cubic-bezier(0.16,1,0.3,1);letter-spacing:.01em}
.bmain:hover{background:var(--ac2);transform:translateY(-3px) scale(1.02);box-shadow:0 20px 40px rgba(240,237,232,.12)}
.hero .bmain{animation:btnPulse 3s ease-in-out infinite}
.bout{display:inline-flex;align-items:center;gap:10px;background:transparent;color:var(--muted2);font-size:14px;padding:16px 28px;border-radius:100px;text-decoration:none;border:1px solid var(--border);transition:all 0.25s ease;cursor:pointer}
.bout:hover{border-color:rgba(240,237,232,.35);color:var(--text);transform:translateY(-2px)}

.mwrap{overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--s1)}
.minner{display:flex;animation:mq 28s linear infinite;white-space:nowrap}
.mi{display:inline-flex;align-items:center;flex-shrink:0}
.mt{font-family:var(--syne);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:14px 18px}
.ms{color:var(--muted);font-size:12px}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

.sec{padding:100px 48px}
.slab{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:20px}
.slab::before{content:'';width:20px;height:1px;background:var(--muted);display:block}
.sh{font-family:var(--syne);font-size:clamp(32px,5vw,60px);font-weight:800;line-height:1.0;letter-spacing:-.025em;margin-bottom:60px}
.sh em{font-style:italic;color:var(--muted2)}

.bento{display:grid;grid-template-columns:repeat(12,1fr);gap:10px}
.bc{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:36px;transition:transform 0.3s cubic-bezier(0.16,1,0.3,1),border-color 0.3s ease,background 0.3s ease;position:relative;overflow:hidden;cursor:default}
.bc::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(240,237,232,.04) 0%,transparent 55%);opacity:0;transition:opacity .3s;pointer-events:none}
.bc:hover::before{opacity:1}
.bc:hover{border-color:rgba(240,237,232,.18);transform:translateY(-4px) scale(1.008)}
.s5{grid-column:span 5}.s4{grid-column:span 4}.s3{grid-column:span 3}
.bhi{background:var(--s2)!important;border-color:rgba(240,237,232,.14)!important}
.bhi:hover{border-color:rgba(240,237,232,.28)!important}
.bnum{font-family:var(--syne);font-size:11px;font-weight:700;color:var(--muted2);letter-spacing:.1em;text-transform:uppercase;margin-bottom:24px;display:block}
.btitle{font-family:var(--syne);font-size:21px;font-weight:700;line-height:1.15;margin-bottom:12px;color:var(--text)}
.bdesc{font-size:13px;color:var(--muted2);line-height:1.7;margin-bottom:18px}
.bprice{font-size:12px;font-weight:600;color:var(--text);letter-spacing:.04em;opacity:.7}
.btags{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.btag{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted2);background:var(--s2);border:1px solid var(--border);padding:4px 10px;border-radius:100px}
.bignum{font-family:var(--syne);font-size:72px;font-weight:800;color:var(--text);line-height:1;letter-spacing:-.04em;margin-bottom:6px}
.biglabel{font-size:12px;color:var(--muted2);letter-spacing:.04em}
.sgrid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.sgrid-item{border-top:1px solid var(--border);padding-top:14px}
.sn{font-family:var(--syne);font-size:26px;font-weight:800;color:var(--text);letter-spacing:-.02em}
.sl2{font-size:11px;color:var(--muted2);margin-top:3px;letter-spacing:.04em}

.wgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
.wcard{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:40px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.wcard::before{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--text);opacity:.3;transition:width .4s ease}
.wcard:hover::before{width:100%}
.wcard::after{content:'↗';position:absolute;top:28px;right:28px;font-size:20px;color:var(--text);transition:all 0.3s cubic-bezier(0.16,1,0.3,1);opacity:0;transform:translate(8px,-8px)}
.wcard:hover::after{opacity:1;transform:translate(0,0)}
.wcard:hover{border-color:rgba(240,237,232,.2);background:var(--s2)}
.wyr{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:14px}
.wtitle{font-family:var(--syne);font-size:30px;font-weight:800;letter-spacing:-.025em;margin-bottom:10px;line-height:1.1;color:var(--text)}
.wdesc{font-size:14px;color:var(--muted2);margin-bottom:22px;line-height:1.65}
.wtags{display:flex;flex-wrap:wrap;gap:6px}
.wtag{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted2);background:var(--s2);border:1px solid var(--border);padding:4px 10px;border-radius:100px}

.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.pcard{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:40px;position:relative;overflow:hidden}
.pnum{font-family:var(--syne);font-size:100px;font-weight:800;color:var(--s3);line-height:1;position:absolute;top:16px;right:20px;letter-spacing:-.04em;transition:color .3s}
.pcard:hover .pnum{color:rgba(240,237,232,.05)}
.ptitle{font-family:var(--syne);font-size:22px;font-weight:700;margin-bottom:14px;position:relative;color:var(--text)}
.pdesc{font-size:14px;color:var(--muted2);line-height:1.7;position:relative}

.pricegrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.prcard{background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:40px;transition:all .3s;position:relative;overflow:hidden}
.prcard::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(240,237,232,.04) 0%,transparent 55%);opacity:0;transition:opacity .3s;pointer-events:none}
.prcard:hover::before{opacity:1}
.prcard.hot{background:var(--s2);border-color:rgba(240,237,232,.2)}
.ptier{font-family:var(--syne);font-size:11px;font-weight:700;color:var(--muted2);letter-spacing:.1em;text-transform:uppercase;margin-bottom:24px;display:block}
.pprice{font-family:var(--syne);font-size:40px;font-weight:800;letter-spacing:-.025em;margin-bottom:8px;color:var(--text);white-space:nowrap}
.psub{font-size:12px;color:var(--muted2);margin-bottom:32px}
.pfeats{list-style:none;margin-bottom:32px}
.pfeats li{font-size:13px;color:var(--muted2);padding:9px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
.pfeats li::before{content:'—';color:var(--muted);font-size:12px}
.pbtn{width:100%;font-family:var(--syne);font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:14px;border-radius:10px;background:transparent;border:1px solid var(--border);color:var(--muted2);transition:all 0.2s ease}
.pbtn:hover{background:rgba(240,237,232,.08);border-color:rgba(240,237,232,.3);color:var(--text);transform:translateY(-2px)}
.prcard.hot .pbtn{background:var(--ac);border-color:var(--ac);color:#0a0a0c}
.prcard.hot .pbtn:hover{background:var(--ac2);border-color:var(--ac2)}

.ctasec{margin:0 48px 100px;background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:80px;display:flex;align-items:center;gap:80px;position:relative;overflow:hidden}
.ctaorb{position:absolute;right:-80px;top:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(240,237,232,.04) 0%,transparent 65%);pointer-events:none}
.ctal{flex:1}
.ctah{font-family:var(--syne);font-size:clamp(38px,5vw,64px);font-weight:800;line-height:.95;letter-spacing:-.03em;margin-bottom:20px;color:var(--text)}
.ctah em{font-style:italic;color:var(--muted2)}
.ctasub{font-size:15px;color:var(--muted2);max-width:380px;line-height:1.7}
.ctaemail{font-size:13px;color:var(--muted);margin-top:28px;letter-spacing:.04em}
.ctar{flex-shrink:0;width:380px}
.form{display:flex;flex-direction:column;gap:10px}
.fi{width:100%;font-family:var(--inter);font-size:14px;font-weight:300;color:var(--text);background:var(--s2);border:1px solid var(--border);padding:14px 18px;border-radius:10px;outline:none;transition:border-color .2s}
.fi::placeholder{color:var(--muted)}
.fi:focus{border-color:rgba(240,237,232,.3)}
.fsel{width:100%;font-family:var(--inter);font-size:14px;color:var(--muted2);background:var(--s2);border:1px solid var(--border);padding:14px 18px;border-radius:10px;outline:none;appearance:none;cursor:pointer}
.fsub{width:100%;font-family:var(--syne);font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:16px;border-radius:10px;background:var(--ac);border:none;color:#0a0a0c;transition:all 0.2s ease;margin-top:4px}
.fsub:hover{background:var(--ac2);transform:translateY(-2px);box-shadow:0 12px 32px rgba(240,237,232,.1)}

footer{padding:28px 48px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.fl{font-family:var(--syne);font-size:17px;font-weight:700;color:var(--muted)}
.fl span{color:var(--muted2)}
.fc{font-size:12px;color:var(--muted)}
.flinks{display:flex;gap:24px}
.flinks a{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.flinks a:hover{color:var(--text)}

.fu{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
.fu.vis{opacity:1;transform:translateY(0)}

@media(max-width:900px){
  .sbento{grid-template-columns:repeat(2,1fr)!important;grid-template-rows:auto!important}
  .sbento>div{grid-column:auto!important;grid-row:auto!important}
}
@media(max-width:880px){
  .nav{padding:16px 20px}.nr a:not(.ncta){display:none}
  .hero{padding:120px 20px 56px}.ht{font-size:52px}
  .hb{flex-direction:column;align-items:flex-start}
  .sec{padding:64px 20px}
  .bento{grid-template-columns:1fr}
  .s3,.s4,.s5{grid-column:span 1}
  .wgrid,.pgrid,.pricegrid{grid-template-columns:1fr}
  .ctasec{flex-direction:column;padding:36px 24px;margin:0 20px 60px}
  .ctar{width:100%}
  footer{flex-direction:column;gap:14px;text-align:center;padding:24px 20px}
}
`;

const mItems=["Websites","Web Apps","Shopify","AI Tools","n8n","React","Supabase","Zürich","Claude API","Vercel","Framer","WordPress"];
const doubled=[...mItems,...mItems,...mItems,...mItems];

function FU({children,delay=0}){
  const r=useRef(null);const[v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:.08});
    if(r.current)o.observe(r.current);return()=>o.disconnect();
  },[]);
  return <div ref={r} className={`fu${v?" vis":""}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>;
}

function CountUp({to,suffix="",prefix="",duration=1200}){
  const[val,setVal]=useState(0);
  const ref=useRef(null);
  const started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true;obs.disconnect();
        const t0=performance.now();
        const tick=(now)=>{
          const p=Math.min((now-t0)/duration,1);
          const ease=1-Math.pow(1-p,3);
          setVal(Math.round(ease*to));
          if(p<1)requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },{threshold:.3});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[to,duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

export default function App(){
  const[sc,setSc]=useState(false);
  const[sent,setSent]=useState(false);
  const[form,setForm]=useState({name:"",email:"",msg:"",budget:""});
  const spotlight=useRef(null);

  useEffect(()=>{
    const h=()=>setSc(window.scrollY>50);
    window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);
  },[]);

  useEffect(()=>{
    const el=spotlight.current;
    let mouseX=0,mouseY=0,currentX=0,currentY=0,raf;
    const move=(e)=>{mouseX=e.clientX;mouseY=e.clientY;};
    const animate=()=>{
      currentX+=(mouseX-currentX)*0.08;
      currentY+=(mouseY-currentY)*0.08;
      el.style.left=currentX+'px';
      el.style.top=currentY+'px';
      raf=requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove',move);
    raf=requestAnimationFrame(animate);
    return()=>{window.removeEventListener('mousemove',move);cancelAnimationFrame(raf);};
  },[]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await fetch('https://formspree.io/f/mnjgkjvy',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name:form.name,email:form.email,message:form.msg,budget:form.budget})
      });
      if(res.ok)setSent(true);
    }catch(err){console.error(err);}
  };

  const mm=(e)=>{
    const c=e.currentTarget,r=c.getBoundingClientRect();
    c.style.setProperty("--mx",`${((e.clientX-r.left)/r.width*100).toFixed(1)}%`);
    c.style.setProperty("--my",`${((e.clientY-r.top)/r.height*100).toFixed(1)}%`);
  };

  return(
    <>
      <div ref={spotlight} style={{position:'fixed',pointerEvents:'none',zIndex:9999,width:600,height:600,borderRadius:'50%',background:'radial-gradient(circle, rgba(120,180,255,0.12) 0%, rgba(100,160,255,0.06) 35%, transparent 70%)',transform:'translate(-50%,-50%)',top:0,left:0,transition:'opacity 0.3s ease'}}/>
      <style>{css}</style>

      <nav className={`nav${sc?" sc":""}`}>
        <Link to="/" className="logo">futur<span>holic</span></Link>
        <div className="nr">
          <Link to="/work">Work</Link>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact" className="ncta">Start a project →</a>
        </div>
      </nav>

      <section className="hero">
        <div className="orb1"/><div className="orb2"/><div className="glines"/>
        <div style={{animation:'slideUp 0.6s ease both',animationDelay:'0s'}}>
          <div className="badge"><div className="bdot"/>Available · Zürich, Switzerland</div>
        </div>
        <h1 className="ht">
          <div style={{overflow:'hidden',lineHeight:'1.1'}}>
            <span style={{display:'block',marginBottom:16,animation:'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both'}}>We build</span>
          </div>
          <div style={{overflow:'hidden',display:'block'}}>
            <span style={{display:'inline-block',background:'linear-gradient(90deg, #333333 0%, #F0EDE8 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',color:'transparent',paddingBottom:'0.25em',lineHeight:'1.2',animation:'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both'}}>digital products</span>
          </div>
          <div style={{overflow:'hidden',lineHeight:'1.1',marginTop:'0.2em'}}>
            <span className="solid" style={{display:'block',animation:'revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both'}}>that work.</span>
          </div>
        </h1>
        <div className="hb">
          <p className="hdesc" style={{animation:'slideUp 0.6s ease 0.5s both'}}>Websites, web apps, automations and AI tools — delivered in <strong>days, not months.</strong> Swiss quality. Transparent pricing.</p>
          <div className="hbtns" style={{animation:'slideUp 0.6s ease 0.65s both'}}>
            <a href="#work" className="bout">See our work</a>
            <a href="#contact" className="bmain">Start a project →</a>
          </div>
        </div>
      </section>

      <div className="mwrap" style={{maskImage:'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',WebkitMaskImage:'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)'}}>
        <div className="minner">
          {doubled.map((t,i)=>(
            <span key={i} className="mi">
              <span className="mt">{t}</span><span className="ms">·</span>
            </span>
          ))}
        </div>
      </div>

      <section className="sec" id="services">
        <FU><div className="slab">Services</div><h2 className="sh">Everything you need <em>online.</em></h2></FU>
        <FU delay={100}>
          <div className="sbento" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gridTemplateRows:"200px 200px 160px",gap:10}}>

            {/* COL1 ROW1-2: tall card */}
            <div className="bc" style={{gridColumn:"1",gridRow:"1/3",background:"var(--s2)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:28}} onMouseMove={mm}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)",marginBottom:16}}>01 — Website</div>
              <div style={{fontFamily:"var(--syne)",fontSize:26,fontWeight:800,lineHeight:1.1,marginBottom:10}}>Modern sites.<br/>Fast delivery.</div>
              <div style={{fontSize:12,color:"var(--muted2)",lineHeight:1.6,marginBottom:14}}>React, Framer or WordPress. Mobile-perfect, SEO-ready.</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                {["React","Framer","WP"].map(t=><span key={t} className="btag">{t}</span>)}
              </div>
              <div style={{fontSize:12,fontWeight:600,color:"var(--text)",opacity:.5}}>From CHF 1,500</div>
            </div>

            {/* COL2-3 ROW1: wide top middle — Web Apps */}
            <div className="bc" style={{gridColumn:"2/4",gridRow:"1",background:"var(--s1)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:28}} onMouseMove={mm}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)"}}>02 — Web Apps & AI Tools</div>
              <div>
                <div style={{fontFamily:"var(--syne)",fontSize:22,fontWeight:800,lineHeight:1.15,marginBottom:8}}>From idea to deployed product in a week.</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {["Claude API","Supabase","Vercel"].map(t=><span key={t} className="btag">{t}</span>)}
                </div>
              </div>
              <div style={{fontSize:12,fontWeight:600,color:"var(--text)",opacity:.5}}>From CHF 4,000</div>
            </div>

            {/* COL4 ROW1: small — 7 days */}
            <div className="bc" style={{gridColumn:"4",gridRow:"1",background:"var(--s1)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:24}} onMouseMove={mm}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)"}}>Avg delivery</div>
              <div>
                <div style={{fontFamily:"var(--syne)",fontSize:52,fontWeight:800,lineHeight:1,letterSpacing:"-.04em"}}><CountUp to={7}/></div>
                <div style={{fontSize:11,color:"var(--muted2)",marginTop:2}}>days</div>
              </div>
            </div>

            {/* COL2 ROW2: E-commerce + CHF 0 */}
            <div className="bc" style={{gridColumn:"2",gridRow:"2",background:"var(--s1)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:24}} onMouseMove={mm}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)"}}>03 — E-commerce</div>
              <div>
                <div style={{fontFamily:"var(--syne)",fontSize:16,fontWeight:800,lineHeight:1.2,marginBottom:10}}>Shopify stores built to convert.</div>
                <div style={{borderTop:"1px solid var(--border)",paddingTop:10}}>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)"}}>Hidden costs</div>
                  <div style={{fontFamily:"var(--syne)",fontSize:24,fontWeight:800,letterSpacing:"-.03em",marginTop:2}}><CountUp to={0} prefix="CHF "/></div>
                </div>
              </div>
            </div>

            {/* COL3-4 ROW2: wide right — 100% */}
            <div className="bc" style={{gridColumn:"3/5",gridRow:"2",background:"var(--s2)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:28}} onMouseMove={mm}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)"}}>Ownership</div>
              <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontFamily:"var(--syne)",fontSize:52,fontWeight:800,lineHeight:1,letterSpacing:"-.04em"}}><CountUp to={100} suffix="%"/></div>
                  <div style={{fontSize:12,color:"var(--muted2)",marginTop:4}}>code · domain · hosting</div>
                </div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)",textAlign:"right"}}>No<br/>lock-in</div>
              </div>
            </div>

            {/* COL1-2 ROW3: wide bottom left — Automations */}
            <div className="bc" style={{gridColumn:"1/3",gridRow:"3",background:"var(--s1)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:28}} onMouseMove={mm}>
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)",marginBottom:10}}>04 — Automations</div>
                <div style={{fontFamily:"var(--syne)",fontSize:20,fontWeight:800,lineHeight:1.15}}>n8n workflows.<br/>Save hours daily.</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)",marginBottom:4}}>Starting at</div>
                <div style={{fontFamily:"var(--syne)",fontSize:28,fontWeight:800,letterSpacing:"-.03em"}}><CountUp to={500} prefix="CHF "/></div>
                <div style={{fontSize:11,color:"var(--muted2)"}}>+ CHF 199/mo</div>
              </div>
            </div>

            {/* COL3 ROW3: small — Zürich */}
            <div className="bc" style={{gridColumn:"3",gridRow:"3",background:"var(--s2)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:24}} onMouseMove={mm}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)"}}>Based in</div>
              <div>
                <div style={{fontFamily:"var(--syne)",fontSize:24,fontWeight:800,letterSpacing:"-.02em"}}>Zürich</div>
                <div style={{fontSize:11,color:"var(--muted2)",marginTop:2}}>.ch · Switzerland</div>
              </div>
            </div>

            {/* COL4 ROW3: small — 24h */}
            <div className="bc" style={{gridColumn:"4",gridRow:"3",background:"var(--s1)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:24}} onMouseMove={mm}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--muted2)",fontFamily:"var(--syne)"}}>First reply</div>
              <div>
                <div style={{fontFamily:"var(--syne)",fontSize:36,fontWeight:800,lineHeight:1,letterSpacing:"-.04em"}}><CountUp to={24} suffix="h"/></div>
                <div style={{fontSize:11,color:"var(--muted2)",marginTop:2}}>usually faster</div>
              </div>
            </div>

          </div>
        </FU>
      </section>


      <section className="sec" id="work" style={{background:"var(--s1)"}}>
        <FU><div className="slab">Selected work</div><h2 className="sh">Recent <em>projects.</em></h2></FU>
        <FU delay={100}>
          <div className="wgrid">
            {[
              {yr:"2026 · Live",title:"Rivalysis",desc:"Competitive intelligence SaaS. One URL → full competitor analysis PDF in 60 seconds.",tags:["React","Claude API","Firecrawl","Stripe"]},
              {yr:"2025 · Live",title:"GhostCheck",desc:"AI-powered CRO audit tool. Detects conversion blockers and scores your site.",tags:["React","Claude API","Browserless"]},
              {yr:"2026 · Launching soon",title:"TaxMeter",desc:"Tax tracking app for Swiss sole proprietors. Real-time calculations, QR-bill invoicing, receipt scanning. Built for Kanton Zürich.",tags:["React Native","iOS","Supabase","Swiss tax"],href:"https://taxmeter.ch"},
              {yr:"2025 · Live",title:"AlpenVault",desc:"Institutional Bitcoin custody platform designed for the Swiss market.",tags:["Figma","Framer","UI/UX"]},
            ].map(w=>(
              w.href
                ? <a key={w.title} href={w.href} target="_blank" rel="noopener noreferrer" className="wcard" style={{textDecoration:"none"}}>
                    <div className="wyr">{w.yr}</div>
                    <div className="wtitle">{w.title}</div>
                    <div className="wdesc">{w.desc}</div>
                    <div className="wtags">{w.tags.map(t=><span key={t} className="wtag">{t}</span>)}</div>
                  </a>
                : <Link key={w.title} to="/work" className="wcard" style={{textDecoration:"none"}}>
                    <div className="wyr">{w.yr}</div>
                    <div className="wtitle">{w.title}</div>
                    <div className="wdesc">{w.desc}</div>
                    <div className="wtags">{w.tags.map(t=><span key={t} className="wtag">{t}</span>)}</div>
                  </Link>
            ))}
          </div>
        </FU>
      </section>

      <section className="sec">
        <FU><div className="slab">Process</div><h2 className="sh">Simple process. <em>Fast delivery.</em></h2></FU>
        <FU delay={100}>
          <div className="pgrid">
            {[
              {title:"Brief",desc:"Tell us what you need. A 30 min call or a message is enough. We ask the right questions and send a fixed price within 24 hours. No vague estimates."},
              {title:"Build",desc:"We design and build using the latest AI tools. You see real progress every day — no radio silence, no surprises. Daily updates included."},
              {title:"Launch",desc:"We deploy, hand over full credentials, and stay available after launch. Most projects go live within 7 days of starting."},
            ].map((s,i)=>(
              <div key={s.title} className="pcard">
                <div className="pnum">0{i+1}</div>
                <div className="ptitle">{s.title}</div>
                <div className="pdesc">{s.desc}</div>
              </div>
            ))}
          </div>
        </FU>
      </section>

      <section className="sec" id="pricing" style={{background:"var(--s1)"}}>
        <FU><div className="slab">Pricing</div><h2 className="sh">Transparent pricing. <em>No surprises.</em></h2></FU>
        <FU delay={100}>
          <div className="pricegrid">
            {[
              {tier:"Starter",price:"CHF 1,500",sub:"One-time · 5–7 days",feats:["Website redesign","Mobile optimised","SEO basics","Contact form","Full handover"],hot:false},
              {tier:"Growth",price:"CHF 3,000",sub:"+ CHF 299/mo optional",feats:["Website + automations","WhatsApp flows","Booking integration","Monthly report","Priority support"],hot:true},
              {tier:"Product",price:"CHF 5,000+",sub:"Fixed price per scope",feats:["Full web app or AI tool","React + Supabase","Stripe integration","Custom to spec","Maintenance available"],hot:false},
            ].map(p=>(
              <div key={p.tier} className={`prcard${p.hot?" hot":""}`} onMouseMove={mm}>
                <span className="ptier">{p.tier}</span>
                <div className="pprice">{p.price}</div>
                <div className="psub">{p.sub}</div>
                <ul className="pfeats">{p.feats.map(f=><li key={f}>{f}</li>)}</ul>
                <button className="pbtn">Get a quote →</button>
              </div>
            ))}
          </div>
        </FU>
      </section>

      <section id="contact">
        <FU>
          <div className="ctasec">
            <div className="ctaorb"/>
            <div className="ctal">
              <h2 className="ctah">Ready to build<br/><em>something?</em></h2>
              <p className="ctasub">Tell us about your project. We usually reply within a few hours. Based in Zürich, available for Swiss and remote projects.</p>
              <div className="ctaemail">hello@futurholic.com</div>
            </div>
            <div className="ctar">
              {sent?(
                <div style={{fontFamily:"var(--syne)",fontSize:28,fontWeight:800,lineHeight:1.3}}>
                  <span style={{color:"var(--text)"}}>Thank you.</span><br/>
                  <span style={{fontSize:16,color:"var(--muted2)",fontFamily:"var(--inter)",fontWeight:300}}>We'll be in touch soon.</span>
                </div>
              ):(
                <form className="form" onSubmit={handleSubmit}>
                  <input className="fi" placeholder="Your name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
                  <input className="fi" type="email" placeholder="Email address" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
                  <textarea className="fi" placeholder="What do you need?" rows={3} style={{resize:"none"}} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})}/>
                  <select className="fsel" value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}>
                    <option value="">Budget range</option>
                    <option>CHF 1,000 – 3,000</option>
                    <option>CHF 3,000 – 8,000</option>
                    <option>CHF 8,000+</option>
                    <option>Not sure yet</option>
                  </select>
                  <button type="submit" className="fsub">Send message →</button>
                </form>
              )}
            </div>
          </div>
        </FU>
      </section>

      <footer>
        <div className="fl">futur<span>holic</span></div>
        <div className="fc">© 2026 Futurholic · Zürich, Switzerland</div>
        <div className="flinks"><Link to="/work">Work</Link><a href="#services">Services</a><a href="#contact">Contact</a></div>
      </footer>
    </>
  );
}
