import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { globalCss } from "../../styles.js";

const pageCss = `
.ar-hero{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:140px 48px 80px;position:relative;overflow:hidden}
.ar-orb1{position:absolute;top:-15%;right:-10%;width:60vw;height:60vw;border-radius:50%;background:radial-gradient(circle,rgba(240,237,232,.04) 0%,transparent 65%);pointer-events:none}
.ar-orb2{position:absolute;bottom:-20%;left:-10%;width:45vw;height:45vw;border-radius:50%;background:radial-gradient(circle,rgba(240,237,232,.02) 0%,transparent 65%);pointer-events:none}
.ar-glines{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,transparent 35%,black 100%);pointer-events:none}
.ar-ht{font-family:var(--syne);font-size:clamp(44px,7vw,96px);font-weight:800;line-height:1.0;letter-spacing:-.035em;margin-bottom:32px;color:var(--text)}
.ar-sub{font-size:17px;color:var(--muted2);max-width:560px;line-height:1.75;margin-bottom:40px}
.ar-badges{display:flex;flex-wrap:wrap;gap:8px}
.ar-badge{display:inline-flex;align-items:center;gap:7px;background:var(--s2);border:1px solid var(--border);border-radius:100px;padding:7px 14px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted2)}
.ar-bdot{width:5px;height:5px;border-radius:50%;background:var(--ac)}

.ar-mwrap{overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--s1)}
.ar-minner{display:flex;animation:mq 32s linear infinite;white-space:nowrap}
.ar-mi{display:inline-flex;align-items:center;flex-shrink:0}
.ar-mt{font-family:var(--syne);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:14px 18px}
.ar-ms{color:var(--muted);font-size:12px;padding:0 6px}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

.ar-sec{padding:100px 48px}
.ar-slab{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:20px}
.ar-slab::before{content:'';width:20px;height:1px;background:var(--muted);display:block}
.ar-sh{font-family:var(--syne);font-size:clamp(30px,4.5vw,56px);font-weight:800;line-height:1.0;letter-spacing:-.025em;margin-bottom:60px;color:var(--text)}
.ar-sh em{font-style:italic;color:var(--muted2)}

.ar-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.ar-step{background:var(--s1);border:1px solid var(--border);border-radius:10px;padding:40px;position:relative;overflow:hidden;transition:border-color .3s,transform .3s cubic-bezier(0.16,1,0.3,1)}
.ar-step:hover{border-color:rgba(240,237,232,.18);transform:translateY(-4px)}
.ar-stepnum{font-family:var(--syne);font-size:96px;font-weight:800;color:var(--s3);line-height:1;position:absolute;top:12px;right:20px;letter-spacing:-.04em;transition:color .3s}
.ar-step:hover .ar-stepnum{color:rgba(240,237,232,.05)}
.ar-stepidx{font-family:var(--syne);font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted2);margin-bottom:24px;display:block}
.ar-steptitle{font-family:var(--syne);font-size:22px;font-weight:700;margin-bottom:12px;color:var(--text);position:relative}
.ar-stepdesc{font-size:14px;color:var(--muted2);line-height:1.7;position:relative}

.ar-feats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.ar-feat{background:var(--s1);border:1px solid var(--border);border-radius:10px;padding:32px;transition:border-color .3s,transform .3s cubic-bezier(0.16,1,0.3,1)}
.ar-feat:hover{border-color:rgba(240,237,232,.18);transform:translateY(-3px)}
.ar-featicon{font-size:22px;margin-bottom:16px;display:block}
.ar-feattitle{font-family:var(--syne);font-size:16px;font-weight:700;color:var(--text);margin-bottom:8px}
.ar-featdesc{font-size:13px;color:var(--muted2);line-height:1.65}

.ar-pricing{background:var(--s1);border:1px solid var(--border);border-radius:10px;padding:64px;display:flex;gap:80px;align-items:flex-start;position:relative;overflow:hidden}
.ar-pricing::before{content:'';position:absolute;top:-80px;right:-80px;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(240,237,232,.04) 0%,transparent 65%);pointer-events:none}
.ar-pleft{flex:1}
.ar-pright{flex:1}
.ar-price{font-family:var(--syne);font-size:64px;font-weight:800;letter-spacing:-.04em;color:var(--text);line-height:1}
.ar-pricesub{font-size:13px;color:var(--muted2);margin-top:10px;margin-bottom:36px}
.ar-pbtn{display:inline-flex;align-items:center;gap:10px;background:var(--ac);color:#070709;font-family:var(--syne);font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:16px 36px;border-radius:100px;text-decoration:none;border:none;cursor:pointer;transition:all 0.25s cubic-bezier(0.16,1,0.3,1)}
.ar-pbtn:hover{background:#ffffff;transform:translateY(-3px) scale(1.02);box-shadow:0 20px 40px rgba(240,237,232,.12)}
.ar-checklist{list-style:none;display:flex;flex-direction:column;gap:0}
.ar-checklist li{font-size:14px;color:var(--muted2);padding:11px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px}
.ar-checklist li:last-child{border-bottom:none}
.ar-check{color:var(--ac);font-size:13px;flex-shrink:0}

.ar-form-wrap{background:var(--s1);border:1px solid var(--border);border-radius:10px;padding:64px;max-width:560px;margin:0 auto}
.ar-form-title{font-family:var(--syne);font-size:clamp(26px,3.5vw,40px);font-weight:800;letter-spacing:-.025em;color:var(--text);margin-bottom:8px;line-height:1.1}
.ar-form-sub{font-size:14px;color:var(--muted2);margin-bottom:40px;line-height:1.65}
.ar-form{display:flex;flex-direction:column;gap:10px}
.ar-fi{width:100%;font-family:var(--inter);font-size:14px;font-weight:300;color:var(--text);background:var(--s2);border:1px solid var(--border);padding:14px 18px;border-radius:10px;outline:none;transition:border-color .2s}
.ar-fi::placeholder{color:var(--muted)}
.ar-fi:focus{border-color:rgba(240,237,232,.3)}
.ar-submit{width:100%;font-family:var(--syne);font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;padding:16px;border-radius:10px;background:var(--ac);border:none;color:#070709;transition:all 0.2s ease;margin-top:4px;display:flex;align-items:center;justify-content:center;gap:8px}
.ar-submit:hover:not(:disabled){background:#ffffff;transform:translateY(-2px);box-shadow:0 12px 32px rgba(240,237,232,.1)}
.ar-submit:disabled{opacity:.6;cursor:not-allowed}
.ar-success{text-align:center;padding:24px 0}
.ar-success-icon{font-size:40px;margin-bottom:16px;display:block}
.ar-success-title{font-family:var(--syne);font-size:20px;font-weight:700;color:var(--text);margin-bottom:8px}
.ar-success-msg{font-size:14px;color:var(--muted2);line-height:1.65}
.ar-error{font-size:12px;color:#e05454;margin-top:4px;text-align:center}

@media(max-width:880px){
  .ar-hero{padding:120px 24px 64px}
  .ar-ht{font-size:46px}
  .ar-sec{padding:64px 24px}
  .ar-steps,.ar-feats{grid-template-columns:1fr}
  .ar-pricing{flex-direction:column;gap:48px;padding:36px 24px}
  .ar-form-wrap{padding:36px 24px}
}
`;

const marqueeItems = [
  "NO NO-SHOWS","AUTOMATIC","WHATSAPP","24H REMINDER","1H REMINDER","BILINGUAL"
];
const marqueeDouble = [...marqueeItems,...marqueeItems,...marqueeItems,...marqueeItems];

function FU({ children, delay = 0 }) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); o.disconnect(); }
    }, { threshold: 0.08 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={r} className={`fu${v ? " vis" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function AppointmentReminders() {
  const [sc, setSc] = useState(false);
  const [form, setForm] = useState({ name: "", businessName: "", phone: "", email: "", calendarEmail: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://n8n.srv937275.hstgr.cloud/webhook/appointment-reminder-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          businessName: form.businessName,
          phone: form.phone,
          email: form.email,
          calendarEmail: form.calendarEmail,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <style>{globalCss + pageCss}</style>

      <nav className={`nav${sc ? " sc" : ""}`}>
        <Link to="/" className="logo">futur<span>holic</span></Link>
        <div className="nr">
          <Link to="/work">Work</Link>
          <a href="/#services">Services</a>
          <a href="/#pricing">Pricing</a>
          <a href="#signup" className="ncta">Get Started →</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="ar-hero">
        <div className="ar-orb1" />
        <div className="ar-orb2" />
        <div className="ar-glines" />
        <div style={{ maxWidth: 860 }}>
          <div style={{ animation: "slideUp 0.6s ease both" }}>
            <span className="ar-slab" style={{ marginBottom: 32 }}>Automation</span>
          </div>
          <h1 className="ar-ht" style={{ animation: "slideUp 0.7s ease 0.05s both" }}>
            No more missed<br />appointments.
          </h1>
          <p className="ar-sub" style={{ animation: "slideUp 0.7s ease 0.15s both" }}>
            Your calendar automatically reminds your clients — 24h and 1h before every appointment via WhatsApp. Zero no-shows. Zero effort.
          </p>
          <div className="ar-badges" style={{ animation: "slideUp 0.7s ease 0.25s both" }}>
            {["Google Calendar", "WhatsApp", "n8n", "Twilio"].map((t) => (
              <span key={t} className="ar-badge">
                <span className="ar-bdot" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="ar-mwrap">
        <div className="ar-minner">
          {marqueeDouble.map((item, i) => (
            <span key={i} className="ar-mi">
              <span className="ar-mt">{item}</span>
              <span className="ar-ms">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="ar-sec">
        <FU>
          <span className="ar-slab">How it works</span>
          <h2 className="ar-sh">Set up once. <em>Works forever.</em></h2>
        </FU>
        <div className="ar-steps">
          {[
            {
              idx: "01",
              title: "Grant Access",
              desc: "Share your Google Calendar with us. One-time setup, takes 2 minutes.",
            },
            {
              idx: "02",
              title: "We Set It Up",
              desc: "We configure the automation and test it with a real appointment.",
            },
            {
              idx: "03",
              title: "Clients Get Reminded",
              desc: "Anyone with a phone number in the calendar event description gets a WhatsApp automatically.",
            },
          ].map((s, i) => (
            <FU key={s.idx} delay={i * 80}>
              <div className="ar-step">
                <span className="ar-stepnum">{s.idx}</span>
                <span className="ar-stepidx">{s.idx}</span>
                <div className="ar-steptitle">{s.title}</div>
                <p className="ar-stepdesc">{s.desc}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="ar-sec" style={{ paddingTop: 0 }}>
        <FU>
          <span className="ar-slab">Features</span>
          <h2 className="ar-sh">Everything included. <em>Nothing to configure.</em></h2>
        </FU>
        <div className="ar-feats">
          {[
            { icon: "🕐", title: "24h Reminder", desc: "A WhatsApp is sent automatically the day before every appointment." },
            { icon: "⏱", title: "1h Reminder", desc: "A second message goes out 1 hour before — so clients always show up on time." },
            { icon: "📍", title: "Location & Time", desc: "Address and time are pulled directly from your calendar event — no manual input." },
            { icon: "📊", title: "Logging", desc: "Every message is logged to a Google Sheet so you always know what was sent and when." },
            { icon: "🚫", title: "No Duplicate Sends", desc: "The system tracks sent reminders and never sends the same message twice." },
            { icon: "✅", title: "Setup Included", desc: "We handle the full configuration and live-test it before handing over." },
          ].map((f, i) => (
            <FU key={f.title} delay={i * 60}>
              <div className="ar-feat">
                <span className="ar-featicon">{f.icon}</span>
                <div className="ar-feattitle">{f.title}</div>
                <p className="ar-featdesc">{f.desc}</p>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="ar-sec" style={{ paddingTop: 0 }}>
        <FU>
          <span className="ar-slab">Pricing</span>
          <h2 className="ar-sh">Simple pricing. <em>No surprises.</em></h2>
        </FU>
        <FU delay={80}>
          <div className="ar-pricing">
            <div className="ar-pleft">
              <div className="ar-price">CHF 99<span style={{ fontSize: 28, color: "var(--muted2)" }}>/mo</span></div>
              <p className="ar-pricesub">One-time setup fee: CHF 199</p>
              <a href="#signup" className="ar-pbtn">Get Started →</a>
            </div>
            <div className="ar-pright">
              <ul className="ar-checklist">
                {[
                  "24h & 1h WhatsApp reminders",
                  "Auto-reads from Google Calendar",
                  "Location & time in every message",
                  "Google Sheets message log",
                  "Duplicate send protection",
                  "Full setup & testing included",
                  "Email support",
                ].map((item) => (
                  <li key={item}>
                    <span className="ar-check">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FU>
      </section>

      {/* SIGNUP FORM */}
      <section className="ar-sec" id="signup" style={{ paddingTop: 0 }}>
        <FU>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="ar-slab" style={{ justifyContent: "center" }}>Sign up</span>
            <h2 className="ar-sh" style={{ marginBottom: 0 }}>Ready to start? <em>Let's talk.</em></h2>
          </div>
        </FU>
        <FU delay={80}>
          <div className="ar-form-wrap">
            {status === "success" ? (
              <div className="ar-success">
                <span className="ar-success-icon">✅</span>
                <div className="ar-success-title">You're all set.</div>
                <p className="ar-success-msg">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="ar-form-title">Get started</div>
                <p className="ar-form-sub">Fill in your details and we'll get the automation running for your business.</p>
                <form className="ar-form" onSubmit={handleSubmit}>
                  <input
                    className="ar-fi"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={set("name")}
                    required
                  />
                  <input
                    className="ar-fi"
                    type="text"
                    placeholder="Business Name"
                    value={form.businessName}
                    onChange={set("businessName")}
                    required
                  />
                  <input
                    className="ar-fi"
                    type="tel"
                    placeholder="WhatsApp Number (e.g. +41 79 123 45 67)"
                    value={form.phone}
                    onChange={set("phone")}
                    required
                  />
                  <input
                    className="ar-fi"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={set("email")}
                    required
                  />
                  <input
                    className="ar-fi"
                    type="email"
                    placeholder="Google Calendar Email"
                    value={form.calendarEmail}
                    onChange={set("calendarEmail")}
                    required
                  />
                  <button className="ar-submit" type="submit" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(7,7,9,.3)", borderTopColor: "#070709", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        Sending…
                      </>
                    ) : "Send →"}
                  </button>
                  {status === "error" && (
                    <p className="ar-error">Something went wrong. Please try again or email us directly.</p>
                  )}
                </form>
              </>
            )}
          </div>
        </FU>
      </section>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* FOOTER */}
      <footer>
        <div className="fl">futur<span>holic</span></div>
        <span className="fc">© {new Date().getFullYear()} Futurholic GmbH · Zürich</span>
        <div className="flinks">
          <Link to="/">Home</Link>
          <Link to="/work">Work</Link>
          <a href="/#contact">Contact</a>
        </div>
      </footer>
    </>
  );
}
