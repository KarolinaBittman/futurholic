import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { globalCss } from "./styles.js";

const pageCss = `
.work-hero{padding:160px 44px 80px;position:relative;overflow:hidden}
.work-orb{position:absolute;top:-20%;right:-10%;width:55vw;height:55vw;border-radius:50%;background:radial-gradient(circle,rgba(240,237,232,.03) 0%,transparent 65%);pointer-events:none}
.work-glines{position:absolute;inset:0;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,transparent 35%,black 100%);pointer-events:none}
.slab{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:20px}
.slab::before{content:'';width:20px;height:1px;background:var(--muted);display:block}
.work-title{font-family:var(--syne);font-size:clamp(48px,8vw,110px);font-weight:800;line-height:.9;letter-spacing:-.035em;margin-bottom:24px}
.work-sub{font-size:16px;color:var(--muted2);max-width:440px;line-height:1.8}

.cs-section{padding:0 44px 120px}
.cs-block{margin-bottom:80px}
.cs-label{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted2);font-family:var(--syne);margin-bottom:32px;display:flex;align-items:center;gap:12px}
.cs-label::after{content:'';flex:1;height:1px;background:var(--border)}

/* Main bento grid per case study */
.cs-grid{display:grid;gap:10px}
.cs-grid-4{grid-template-columns:repeat(4,1fr)}
.cs-grid-3{grid-template-columns:repeat(3,1fr)}
.cs-grid-2{grid-template-columns:repeat(2,1fr)}

.cp{padding:32px}
.cp-sm{padding:24px}

/* stat cells */
.stat-val{font-family:var(--syne);font-size:52px;font-weight:800;line-height:1;letter-spacing:-.04em;color:var(--text)}
.stat-val.xl{font-size:72px}
.stat-val.md{font-size:36px}
.stat-unit{font-size:11px;color:var(--muted2);margin-top:4px;letter-spacing:.04em}
.stat-label{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);font-family:var(--syne);margin-bottom:14px}

/* hero card */
.cs-name{font-family:var(--syne);font-size:clamp(26px,4vw,44px);font-weight:800;line-height:1.05;letter-spacing:-.025em;margin-bottom:12px;color:var(--text)}
.cs-tagline{font-size:14px;color:var(--muted2);line-height:1.7;margin-bottom:20px}
.cs-tags{display:flex;flex-wrap:wrap;gap:6px}

/* text card */
.cs-block-title{font-family:var(--syne);font-size:16px;font-weight:700;color:var(--text);margin-bottom:10px;letter-spacing:-.01em}
.cs-body{font-size:13px;color:var(--muted2);line-height:1.75}

/* divider card */
.cs-quote{font-family:var(--syne);font-size:clamp(18px,2.5vw,28px);font-weight:700;line-height:1.25;letter-spacing:-.02em;color:var(--text)}
.cs-quote em{color:var(--muted2);font-style:italic}

/* flow / process card */
.flow-steps{display:flex;flex-direction:column;gap:0}
.flow-step{display:flex;align-items:flex-start;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)}
.flow-step:last-child{border-bottom:none}
.flow-n{font-family:var(--syne);font-size:11px;font-weight:700;color:var(--muted);min-width:22px}
.flow-txt{font-size:12px;color:var(--muted2);line-height:1.5}
.flow-txt strong{color:var(--text);font-weight:600}

/* pill bar */
.pill-bar{display:flex;flex-wrap:wrap;gap:6px}

/* year badge */
.year-badge{font-family:var(--syne);font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted2);background:var(--s3);border:1px solid var(--border);padding:5px 12px;border-radius:100px;width:fit-content;margin-bottom:16px}

/* live dot */
.live-dot{display:inline-flex;align-items:center;gap:7px;font-size:11px;color:var(--muted2);letter-spacing:.06em}
.ldot{width:6px;height:6px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px rgba(74,222,128,.5);animation:pulse 2.5s ease-in-out infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

/* back link */
.back{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted2);text-decoration:none;transition:color .2s;margin-bottom:32px}
.back:hover{color:var(--text)}
.back::before{content:'←'}

/* CTA strip */
.work-cta{margin:0 44px 100px;background:var(--s1);border:1px solid var(--border);border-radius:16px;padding:48px 52px;display:flex;align-items:center;justify-content:space-between;gap:40px}
.work-cta h3{font-family:var(--syne);font-size:clamp(22px,3vw,36px);font-weight:800;letter-spacing:-.025em;line-height:1.1}
.work-cta h3 em{font-style:italic;color:var(--muted2)}
.bmain{display:inline-flex;align-items:center;gap:10px;background:var(--ac);color:#0a0a0c;font-size:14px;font-weight:700;padding:16px 32px;border-radius:100px;text-decoration:none;border:none;cursor:pointer;transition:all .25s;letter-spacing:.01em;flex-shrink:0}
.bmain:hover{background:var(--ac2);transform:translateY(-2px);box-shadow:0 16px 48px rgba(240,237,232,.12)}

@media(max-width:880px){
  .work-hero{padding:120px 20px 60px}
  .cs-section{padding:0 20px 80px}
  .cs-grid-4,.cs-grid-3,.cs-grid-2{grid-template-columns:1fr}
  .work-cta{flex-direction:column;align-items:flex-start;margin:0 20px 60px;padding:32px 24px}
}
`;

function FU({ children, delay = 0 }) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.06 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return <div ref={r} className={`fu${v ? " vis" : ""}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav className={`nav${sc ? " sc" : ""}`}>
      <Link to="/" className="logo">futur<span>holic</span></Link>
      <div className="nr">
        <Link to="/work">Work</Link>
        <a href="/#services">Services</a>
        <a href="/#pricing">Pricing</a>
        <a href="/#contact" className="ncta">Start a project →</a>
      </div>
    </nav>
  );
}

const mm = (e) => {
  const c = e.currentTarget, r = c.getBoundingClientRect();
  c.style.setProperty("--mx", `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
  c.style.setProperty("--my", `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
};

/* ─── RIVALYSIS ─────────────────────────────────────────── */
function Rivalysis() {
  return (
    <div className="cs-block">
      <FU>
        <div className="cs-label">01 — Rivalysis</div>
        {/* Row 1: hero + stats */}
        <div className="cs-grid cs-grid-4" style={{ marginBottom: 10 }}>
          {/* Hero */}
          <div className="bc cp" style={{ gridColumn: "1/3", background: "var(--s2)" }} onMouseMove={mm}>
            <div className="year-badge">2026 · Live</div>
            <div className="live-dot" style={{ marginBottom: 20 }}><span className="ldot" />Live in production</div>
            <div className="cs-name">Rivalysis</div>
            <div className="cs-tagline">Competitive intelligence SaaS. Drop a competitor's URL and receive a full PDF analysis — positioning, pricing, messaging, weak spots — in under 60 seconds.</div>
            <div className="cs-tags" style={{ marginBottom: 20 }}>
              {["React","Claude API","Firecrawl","Stripe","Supabase","Vercel"].map(t => <span key={t} className="btag">{t}</span>)}
            </div>
            <a href="https://rivalysis.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, opacity: .7, transition: "opacity .2s" }} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.7}>Visit rivalysis.com ↗</a>
          </div>
          {/* Stat: 60s */}
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Analysis time</div>
            <div>
              <div className="stat-val xl">60</div>
              <div className="stat-unit">seconds avg</div>
            </div>
          </div>
          {/* Stat: pages */}
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Output</div>
            <div>
              <div className="stat-val xl">12</div>
              <div className="stat-unit">page PDF report</div>
            </div>
          </div>
        </div>
        {/* Row 2: how it works + quote + stack */}
        <div className="cs-grid cs-grid-3" style={{ marginBottom: 10 }}>
          <div className="bc cp" style={{ background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">How it works</div>
            <div className="flow-steps">
              {[
                ["01", <><strong>Firecrawl</strong> scrapes the target URL and extracts all public content</>],
                ["02", <><strong>Claude API</strong> structures the data into competitive signals</>],
                ["03", <><strong>PDF engine</strong> renders a branded, shareable report</>],
                ["04", <><strong>Stripe</strong> gates pay-per-report or monthly subscription</>],
              ].map(([n, t]) => (
                <div key={n} className="flow-step"><span className="flow-n">{n}</span><span className="flow-txt">{t}</span></div>
              ))}
            </div>
          </div>
          <div className="bc cp" style={{ background: "var(--s2)", display: "flex", alignItems: "center" }} onMouseMove={mm}>
            <div className="cs-quote">One URL. <em>Instant intel.</em> No analyst needed.</div>
          </div>
          <div className="bc cp" style={{ background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">Scope</div>
            <div className="cs-body" style={{ marginBottom: 20 }}>
              Built solo in 6 days. Full-stack: auth, billing, async job queue, email delivery of PDF, admin dashboard.
            </div>
            <div className="cs-block-title">Result</div>
            <div className="cs-body">
              Launched publicly. First paying customers within 48 hours of going live.
            </div>
          </div>
        </div>
      </FU>
    </div>
  );
}

/* ─── GHOSTCHECK ────────────────────────────────────────── */
function GhostCheck() {
  return (
    <div className="cs-block">
      <FU>
        <div className="cs-label">02 — GhostCheck</div>
        {/* Row 1 */}
        <div className="cs-grid cs-grid-4" style={{ marginBottom: 10 }}>
          <div className="bc cp" style={{ gridColumn: "1/3", background: "var(--s2)" }} onMouseMove={mm}>
            <div className="year-badge">2025 · Live</div>
            <div className="live-dot" style={{ marginBottom: 20 }}><span className="ldot" />Live in production</div>
            <div className="cs-name">GhostCheck</div>
            <div className="cs-tagline">AI-powered CRO audit tool. Paste your URL, get a scored breakdown of every conversion blocker: slow CTAs, weak copy, broken trust signals, accessibility gaps.</div>
            <div className="cs-tags" style={{ marginBottom: 20 }}>
              {["React","Claude API","Browserless","Tailwind","Vercel"].map(t => <span key={t} className="btag">{t}</span>)}
            </div>
            <a href="https://ghostcheck.eu" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, opacity: .7, transition: "opacity .2s" }} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.7}>Visit ghostcheck.eu ↗</a>
          </div>
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Audit score</div>
            <div>
              <div className="stat-val xl">/100</div>
              <div className="stat-unit">CRO score per page</div>
            </div>
          </div>
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Checks run</div>
            <div>
              <div className="stat-val xl">40+</div>
              <div className="stat-unit">conversion signals</div>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="cs-grid cs-grid-4" style={{ marginBottom: 10 }}>
          <div className="bc cp" style={{ gridColumn: "1/2", background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">The problem</div>
            <div className="cs-body">Most sites leak conversions silently. No error, no alert — just visitors leaving. GhostCheck surfaces the invisible.</div>
          </div>
          <div className="bc cp" style={{ gridColumn: "2/4", background: "var(--s2)", display: "flex", alignItems: "center" }} onMouseMove={mm}>
            <div className="cs-quote"><em>Your site looks fine.</em> It just doesn't convert.</div>
          </div>
          <div className="bc cp" style={{ gridColumn: "4/5", background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">Delivery</div>
            <div className="cs-body">Built in 5 days. Browserless renders the page, Claude interprets every element, scores are surfaced in a clean dashboard.</div>
          </div>
        </div>
      </FU>
    </div>
  );
}

/* ─── TAXMETER ──────────────────────────────────────────── */
function TaxMeter() {
  return (
    <div className="cs-block">
      <FU>
        <div className="cs-label">03 — TaxMeter</div>
        <div className="cs-grid cs-grid-4" style={{ marginBottom: 10 }}>
          <div className="bc cp" style={{ gridColumn: "1/3", background: "var(--s2)" }} onMouseMove={mm}>
            <div className="year-badge">2026 · Launching soon</div>
            <div className="cs-name">TaxMeter</div>
            <div className="cs-tagline">Tax tracking app for Swiss sole proprietors in Kanton Zürich. Real-time tax calculations, QR-bill invoicing, receipt scanning with OCR. Built in React Native, launching on the App Store.</div>
            <div className="cs-tags" style={{ marginBottom: 20 }}>
              {["React Native","iOS","Supabase","Swiss tax"].map(t => <span key={t} className="btag">{t}</span>)}
            </div>
            <a href="https://taxmeter.ch" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, opacity: .7, transition: "opacity .2s" }} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.7}>Visit taxmeter.ch ↗</a>
          </div>
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Target users</div>
            <div>
              <div className="stat-val xl">60K+</div>
              <div className="stat-unit">sole proprietors in ZH</div>
            </div>
          </div>
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Platform</div>
            <div>
              <div className="stat-val xl">iOS</div>
              <div className="stat-unit">App Store launch</div>
            </div>
          </div>
        </div>
        {/* Row 2: 3 equal */}
        <div className="cs-grid cs-grid-3" style={{ marginBottom: 10 }}>
          <div className="bc cp" style={{ background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">The problem</div>
            <div className="cs-body">Swiss sole proprietors handle tax manually — spreadsheets, paper receipts, last-minute panic. TaxMeter replaces that with a real-time dashboard that knows what you owe at any moment.</div>
          </div>
          <div className="bc cp" style={{ background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">Core features</div>
            <div className="flow-steps">
              {[
                ["→", <><strong>Real-time</strong> tax liability calculator</>],
                ["→", <><strong>QR-bill</strong> invoicing built in</>],
                ["→", <><strong>OCR receipt</strong> scanning via camera</>],
                ["→", <><strong>Kanton Zürich</strong> tax rules baked in</>],
              ].map(([n, t]) => (
                <div key={n} className="flow-step"><span className="flow-n">{n}</span><span className="flow-txt">{t}</span></div>
              ))}
            </div>
          </div>
          <div className="bc cp" style={{ background: "var(--s2)", display: "flex", alignItems: "center" }} onMouseMove={mm}>
            <div className="cs-quote">Always know <em>what you owe.</em> No surprises at year end.</div>
          </div>
        </div>
        {/* Meta row */}
        <div className="cs-grid cs-grid-2">
          <div className="bc cp" style={{ background: "var(--s1)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} onMouseMove={mm}>
            {[
              ["Status", "Launching soon"],
              ["Platform", "iOS / React Native"],
              ["Backend", "Supabase"],
              ["Market", "Kanton Zürich"],
            ].map(([l, v]) => (
              <div key={l} style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted2)", fontFamily: "var(--syne)", marginBottom: 4 }}>{l}</div>
                <div style={{ fontFamily: "var(--syne)", fontSize: 16, fontWeight: 800, color: "var(--text)" }}>{v}</div>
              </div>
            ))}
          </div>
          <div className="bc cp" style={{ background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">Why now</div>
            <div className="cs-body">Switzerland has ~600K sole proprietors with no dedicated mobile-first tax tool. Existing solutions are desktop-only, overcomplicated, and not built around Swiss cantonal logic. TaxMeter is.</div>
          </div>
        </div>
      </FU>
    </div>
  );
}

/* ─── ALPENVAULT ────────────────────────────────────────── */
function AlpenVault() {
  return (
    <div className="cs-block">
      <FU>
        <div className="cs-label">04 — AlpenVault</div>
        <div className="cs-grid cs-grid-4" style={{ marginBottom: 10 }}>
          <div className="bc cp" style={{ gridColumn: "1/3", background: "var(--s2)" }} onMouseMove={mm}>
            <div className="year-badge">2025 · Live</div>
            <div className="live-dot" style={{ marginBottom: 20 }}><span className="ldot" />Live in production</div>
            <div className="cs-name">AlpenVault</div>
            <div className="cs-tagline">Institutional Bitcoin custody platform designed for the Swiss market. Cold-storage focused, compliance-first design language — trust built into every pixel.</div>
            <div className="cs-tags" style={{ marginBottom: 20 }}>
              {["Figma","Framer","UI/UX","Motion","Swiss Design"].map(t => <span key={t} className="btag">{t}</span>)}
            </div>
            <a href="https://alpen-vault.framer.ai" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--text)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, opacity: .7, transition: "opacity .2s" }} onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.7}>Visit alpen-vault.framer.ai ↗</a>
          </div>
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Screens designed</div>
            <div>
              <div className="stat-val xl">34</div>
              <div className="stat-unit">desktop + mobile</div>
            </div>
          </div>
          <div className="bc cp-sm" style={{ background: "var(--s1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }} onMouseMove={mm}>
            <div className="stat-label">Design to live</div>
            <div>
              <div className="stat-val xl">9</div>
              <div className="stat-unit">days total</div>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="cs-grid cs-grid-3" style={{ marginBottom: 10 }}>
          <div className="bc cp" style={{ background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">Design brief</div>
            <div className="cs-body">Swiss institutional aesthetic. The client needed something that felt like a private bank, not a crypto startup. Monochrome palette, precise typography, deliberate whitespace.</div>
          </div>
          <div className="bc cp" style={{ background: "var(--s1)" }} onMouseMove={mm}>
            <div className="cs-block-title">Process</div>
            <div className="flow-steps">
              {[
                ["01", <><strong>Discovery:</strong> competitor audit, Swiss fintech visual language research</>],
                ["02", <><strong>Design system</strong> in Figma — tokens, components, motion rules</>],
                ["03", <><strong>Framer build</strong> with custom interactions and scroll animations</>],
              ].map(([n, t]) => (
                <div key={n} className="flow-step"><span className="flow-n">{n}</span><span className="flow-txt">{t}</span></div>
              ))}
            </div>
          </div>
          <div className="bc cp" style={{ background: "var(--s2)", display: "flex", alignItems: "center" }} onMouseMove={mm}>
            <div className="cs-quote">Designed to <em>feel like trust.</em> Cold storage, warm confidence.</div>
          </div>
        </div>
      </FU>
    </div>
  );
}

export default function Work() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{globalCss + pageCss}</style>
      <Nav />

      <div className="work-hero">
        <div className="work-orb" /><div className="work-glines" />
        <FU>
          <Link to="/" className="back">All pages</Link>
          <div className="slab">Selected work</div>
          <h1 className="work-title">
            Case<br />
            <span style={{display:'inline-block',background:'linear-gradient(90deg, #333333 0%, #F0EDE8 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',color:'transparent',paddingBottom:'0.2em',lineHeight:'1.15'}}>studies.</span>
          </h1>
          <p className="work-sub">Four projects. Different problems, same standard — shipped fast, built right, owned fully.</p>
        </FU>
      </div>

      <div className="cs-section">
        <Rivalysis />
        <GhostCheck />
        <TaxMeter />
        <AlpenVault />
      </div>

      <FU>
        <div className="work-cta">
          <h3>Your project could be<br /><em>next.</em></h3>
          <a href="/#contact" className="bmain">Start a conversation →</a>
        </div>
      </FU>

      <footer>
        <div className="fl">futur<span>holic</span></div>
        <div className="fc">© 2026 Futurholic · Zürich, Switzerland</div>
        <div className="flinks">
          <Link to="/work">Work</Link>
          <a href="/#services">Services</a>
          <a href="/#contact">Contact</a>
        </div>
      </footer>
    </>
  );
}
