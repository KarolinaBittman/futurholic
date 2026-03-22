export const globalCss = `
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
.nr a{font-size:13px;color:var(--muted2);text-decoration:none;transition:color .2s;letter-spacing:.04em}
.nr a:hover{color:var(--text)}
.ncta{background:var(--ac)!important;color:#0a0a0c!important;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:10px 22px;border-radius:100px;text-decoration:none;transition:all .2s}
.ncta:hover{background:var(--ac2)!important;transform:scale(1.03)}

.fu{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}
.fu.vis{opacity:1;transform:translateY(0)}

.btag{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted2);background:var(--s2);border:1px solid var(--border);padding:4px 10px;border-radius:100px}
.bc{background:var(--s1);border:1px solid var(--border);border-radius:14px;transition:all .3s;position:relative;overflow:hidden;cursor:default}
.bc::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(240,237,232,.04) 0%,transparent 55%);opacity:0;transition:opacity .3s;pointer-events:none}
.bc:hover::before{opacity:1}
.bc:hover{border-color:rgba(240,237,232,.18);transform:translateY(-2px)}

footer{padding:28px 44px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.fl{font-family:var(--syne);font-size:17px;font-weight:700;color:var(--muted)}
.fl span{color:var(--muted2)}
.fc{font-size:12px;color:var(--muted)}
.flinks{display:flex;gap:24px}
.flinks a{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}
.flinks a:hover{color:var(--text)}

@media(max-width:880px){
  .nav{padding:16px 20px}.nr a:not(.ncta){display:none}
  footer{flex-direction:column;gap:14px;text-align:center;padding:24px 20px}
}
`;
