import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = Number(globalThis.PRESONA_PORT ?? 3001);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderList(items, renderItem) {
  return items.map(renderItem).join("");
}

function baseStyles() {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&display=swap');
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: #080706; color: white; font-family: "Inter Tight", ui-sans-serif, system-ui, sans-serif; }
    a { color: inherit; text-decoration: none; }
    @keyframes ambientGradient { 0%,100% { background-position: 50% 0%, 20% 20%, 80% 8%; } 50% { background-position: 50% 0%, 24% 18%, 76% 12%; } }
    @keyframes chroma { 0%,100% { color: #fff7ed; } 33% { color: #fdba74; } 66% { color: #c4b5fd; } }
    @keyframes glowShift { 0%,100% { opacity: .85; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    .animated-word { animation: chroma 7s ease-in-out infinite; }
    .site-atmosphere { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: linear-gradient(180deg,#080706 0%,#120b09 36%,#160c0b 64%,#090706 100%), radial-gradient(circle at 22% 18%, rgba(255,86,38,.32), transparent 32%), radial-gradient(circle at 78% 12%, rgba(139,92,246,.18), transparent 34%); background-size: 100% 100%, 120% 120%, 120% 120%; animation: ambientGradient 18s ease-in-out infinite; }
    .site-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,.025) 1px, transparent 1px); background-size: 64px 64px; opacity: .2; }
    .brand-track { animation: marquee 26s linear infinite; }
    .brand-strip:hover .brand-track { animation-play-state: paused; }
    .reveal { opacity: 0; transform: translateY(34px); transition: opacity .75s ease, transform .75s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .hero { min-height: 100vh; position: relative; z-index: 1; overflow: hidden; border-bottom: 1px solid rgba(255,255,255,.1); }
    .hero:before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 70% 14%, rgba(255,86,38,.30), transparent 34%), linear-gradient(135deg, rgba(255,79,31,.52) 0%, rgba(169,37,22,.42) 33%, rgba(22,11,24,.18) 70%, rgba(5,5,5,.08) 100%); }
    .hero:after { content: ""; position: absolute; inset-inline: 0; bottom: 0; height: 240px; background: linear-gradient(to top, #080706, transparent); }
    .wrap { width: min(1180px, calc(100% - 40px)); margin: 0 auto; position: relative; z-index: 1; }
    .topbar { height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .brand { font-size: 14px; font-weight: 900; letter-spacing: -.03em; }
    .nav { display: flex; gap: 28px; color: rgba(255,255,255,.72); font-size: 12px; font-weight: 700; }
    .pill { border-radius: 999px; border: 1px solid rgba(255,255,255,.25); background: white; color: black; padding: 10px 16px; font-size: 12px; font-weight: 900; box-shadow: 0 12px 34px rgba(255,255,255,.2); }
    .hero-grid { min-height: calc(100vh - 76px); display: grid; grid-template-columns: .98fr 1.02fr; gap: 48px; align-items: center; padding: 32px 0 36px; }
    .intro { max-width: 720px; }
    .small { font-size: 15px; font-weight: 800; color: rgba(255,255,255,.86); }
    h1 { margin: 18px 0 0; max-width: 840px; font-size: clamp(76px, 13vw, 160px); line-height: .86; letter-spacing: -.02em; font-weight: 950; }
    .role-title { margin: 18px 0 0; font-size: clamp(38px, 5.2vw, 72px); line-height: 1; letter-spacing: -.015em; font-weight: 950; }
    .role-pill { display: inline-flex; margin-top: 18px; border: 1px solid rgba(255,255,255,.15); background: rgba(255,255,255,.1); color: #ffedd5; border-radius: 999px; padding: 9px 15px; font-size: 14px; font-weight: 850; backdrop-filter: blur(24px); }
    .tagline { margin-top: 28px; max-width: 620px; color: rgba(255,255,255,.82); font-size: clamp(19px, 2.2vw, 25px); line-height: 1.42; font-weight: 700; }
    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; }
    .button { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: 0 20px; font-size: 13px; font-weight: 950; transition: transform .25s ease, background .25s ease; }
    .button:hover { transform: translateY(-2px) scale(1.03); }
    .button.primary { background: #ff5a1f; color: white; box-shadow: 0 18px 45px rgba(255,90,31,.25); }
    .button.secondary { border: 1px solid rgba(255,255,255,.18); background: rgba(255,255,255,.09); backdrop-filter: blur(18px); color: white; }
    .portrait-shell { position: relative; width: min(100%, 540px); margin-inline: auto; }
    .portrait-shell:before { content: ""; position: absolute; inset: -22px; border-radius: 38px; background: rgba(255,255,255,.12); filter: blur(46px); animation: glowShift 6s ease-in-out infinite; }
    .portrait-card { position: relative; overflow: hidden; border-radius: 32px; border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.1); padding: 12px; box-shadow: 0 34px 90px rgba(0,0,0,.44); backdrop-filter: blur(28px); }
    .portrait { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: top; border-radius: 24px; filter: grayscale(.15) saturate(1.12); }
    .portrait-card:after { content: ""; position: absolute; inset: 12px; border-radius: 24px; background: linear-gradient(to top, rgba(0,0,0,.42), transparent 52%, rgba(255,90,31,.12)); pointer-events: none; }
    .stats-glass { margin-bottom: 32px; display: grid; gap: 12px; grid-template-columns: repeat(4, 1fr); border: 1px solid rgba(255,255,255,.12); background: rgba(0,0,0,.28); border-radius: 28px; padding: 16px; box-shadow: 0 24px 70px rgba(0,0,0,.3); backdrop-filter: blur(28px); }
    .brand-strip { overflow: hidden; border: 1px solid rgba(255,255,255,.1); background: rgba(0,0,0,.25); border-radius: 24px; padding: 20px 0; margin-bottom: 16px; box-shadow: 0 24px 70px rgba(0,0,0,.25); backdrop-filter: blur(28px); }
    .brand-title { margin: 0 0 18px; text-align: center; color: rgba(255,255,255,.3); font-size: 11px; font-weight: 950; letter-spacing: .5em; text-transform: uppercase; }
    .brand-track { display: flex; width: max-content; gap: 64px; padding-inline: 32px; }
    .brand-track span { color: rgba(255,255,255,.35); font-size: 14px; font-weight: 950; letter-spacing: .24em; transition: color .25s ease; white-space: nowrap; }
    .brand-track span:hover { color: #fed7aa; }
    .stat { border-radius: 20px; background: rgba(255,255,255,.07); padding: 18px; }
    .stat em { display: block; color: rgba(254,215,170,.88); font-size: 12px; font-weight: 950; font-style: normal; }
    .stat strong { display: block; margin-top: 12px; font-size: clamp(32px, 4vw, 48px); letter-spacing: -.06em; }
    .stat span { display: block; margin-top: 4px; color: rgba(255,255,255,.62); font-size: 13px; }
    .section { padding: 92px 0; }
    .split { display: grid; grid-template-columns: .92fr 1.08fr; gap: 48px; align-items: start; }
    .kicker { color: #f97316; font-size: 14px; font-weight: 950; }
    h2 { margin: 12px 0 0; font-size: clamp(44px, 7vw, 76px); line-height: .96; letter-spacing: -.03em; font-weight: 950; }
    .glass { border: 1px solid rgba(255,255,255,.11); background: rgba(255,255,255,.07); border-radius: 28px; padding: 28px; backdrop-filter: blur(28px); }
    .lead { font-size: clamp(24px, 3vw, 32px); line-height: 1.18; font-weight: 900; }
    .body { color: rgba(255,255,255,.62); font-size: 18px; line-height: 1.72; }
    .work-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 32px; }
    .work-card { min-height: 285px; border: 1px solid rgba(255,255,255,.11); background: rgba(255,255,255,.07); border-radius: 28px; padding: 22px; backdrop-filter: blur(28px); transition: transform .45s ease, border-color .45s ease, background .45s ease; }
    .work-card:hover { transform: translateY(-10px); border-color: rgba(253,186,116,.45); background: rgba(249,115,22,.11); }
    .work-card small { color: rgba(255,255,255,.35); font-weight: 950; }
    .work-card h3 { margin: 52px 0 0; font-size: 30px; line-height: .98; letter-spacing: -.02em; }
    .work-card p { color: rgba(255,255,255,.62); line-height: 1.6; }
    .media-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 32px; }
    .media-card { overflow: hidden; border: 1px solid rgba(255,255,255,.11); background: rgba(255,255,255,.07); border-radius: 28px; padding: 12px; box-shadow: 0 24px 70px rgba(0,0,0,.2); backdrop-filter: blur(28px); transition: transform .45s ease, border-color .45s ease, background .45s ease; }
    .media-card:hover { transform: translateY(-8px); border-color: rgba(253,186,116,.38); background: rgba(255,255,255,.1); }
    .media-card video { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 20px; background: rgba(0,0,0,.6); }
    .media-card div { padding: 18px 12px 12px; }
    .media-card h3 { margin: 0; font-size: 25px; letter-spacing: -.02em; }
    .media-card p { color: rgba(255,255,255,.6); line-height: 1.65; }
    .timeline { display: grid; gap: 16px; margin-top: 32px; }
    .timeline-card { display: grid; grid-template-columns: .34fr .66fr; gap: 28px; border: 1px solid rgba(255,255,255,.11); background: rgba(255,255,255,.06); border-radius: 24px; padding: 24px; backdrop-filter: blur(28px); transition: border-color .35s ease; }
    .timeline-card:hover { border-color: rgba(253,186,116,.4); }
    .timeline-card h3 { margin: 12px 0 0; font-size: 26px; line-height: 1.04; letter-spacing: -.015em; }
    .timeline-card p { color: rgba(255,255,255,.62); line-height: 1.7; }
    .muted { color: rgba(255,255,255,.42); font-size: 13px; font-weight: 800; }
    .band { position: relative; overflow: hidden; border-block: 1px solid rgba(255,255,255,.1); background: #0f0d0a; }
    .band:before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 18% 20%, rgba(255,86,38,.22), transparent 28%), radial-gradient(circle at 90% 10%, rgba(139,92,246,.18), transparent 30%); }
    .skills { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
    .skill { border: 1px solid rgba(255,255,255,.11); background: rgba(0,0,0,.25); border-radius: 999px; padding: 10px 15px; color: rgba(255,255,255,.72); font-size: 14px; font-weight: 800; transition: color .3s ease, border-color .3s ease; }
    .skill:hover { color: #fed7aa; border-color: rgba(253,186,116,.45); }
    footer { padding: 64px 0; }
    .footer-grid { display: grid; gap: 20px; grid-template-columns: repeat(4, 1fr); }
    .whatsapp { position: fixed; z-index: 50; right: 20px; bottom: 20px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,.15); background: #25d366; color: white; border-radius: 999px; padding: 13px 18px; font-size: 14px; font-weight: 950; box-shadow: 0 24px 60px rgba(0,0,0,.35); transition: transform .25s ease; }
    .whatsapp:hover { transform: translateY(-3px) scale(1.04); }
    .soft-section { position: relative; }
    .soft-section:before { content: ""; position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at 14% 0%, rgba(255,86,38,.18), transparent 34%), radial-gradient(circle at 80% 30%, rgba(139,92,246,.14), transparent 32%); }
    @media (max-width: 980px) { .hero-grid, .split, .timeline-card, .stats-glass, .work-grid, .media-grid, .footer-grid { grid-template-columns: 1fr; } .nav { display: none; } .hero-grid { min-height: auto; gap: 30px; padding: 18px 0 34px; } .topbar { height: 64px; } h1 { font-size: clamp(58px, 18vw, 86px); letter-spacing: -.025em; } .intro { order: 2; } .portrait-shell { order: 1; max-width: min(330px, 88vw); } .portrait { aspect-ratio: 4 / 4.7; object-position: 50% 8%; } .brand-track { gap: 38px; } .section { padding: 70px 0; } .whatsapp { right: 14px; bottom: 14px; padding: 12px 15px; } }
  `;
}

function motionScript() {
  return `
    <script>
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      }, { threshold: 0.16 });
      document.querySelectorAll('.reveal').forEach((el, index) => {
        el.style.transitionDelay = Math.min(index * 45, 280) + 'ms';
        observer.observe(el);
      });
    </script>
  `;
}

function renderProfile(profile, isPreview = false) {
  const trustedBrands = [
    "HONOR",
    "SOLVE.CARE",
    "DARAZ",
    "CAREEM",
    "PSO",
    "BYD",
    "BANK ALFALAH",
    "K-ELECTRIC",
    "UNILEVER",
    "HBL",
    "FAYSAL BANK",
  ];
  const featuredMedia = [
    {
      title: "Vibe Store",
      description: "Retail-first brand film with a sharper digital commerce energy.",
      src: "/clients/saad-ahmed/videos/vibe-store.mp4",
    },
    {
      title: "itel AI DVC",
      description: "AI-led product communication shaped for mobile-first audiences.",
      src: "/clients/saad-ahmed/videos/itel-ai-dvc.mp4",
    },
    {
      title: "itel S26 Ultra",
      description: "Launch creative focused on premium device storytelling.",
      src: "/clients/saad-ahmed/videos/itel-s26-ultra.mp4",
    },
  ];
  const brandSlider = renderList(
    [...trustedBrands, ...trustedBrands],
    (brand) => `<span>${escapeHtml(brand)}</span>`,
  );
  const whatsappHref = profile.phone
    ? `https://wa.me/${profile.phone.replace(/\D/g, "")}`
    : "";
  const stats = renderList(
    profile.stats,
    (stat, index) => `<div class="stat"><em>#${index + 1}</em><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`,
  );
  const experience = renderList(
    profile.experience,
    (item, index) => `
      <article class="timeline-card reveal">
        <div><em class="kicker">0${index + 1}</em><h3>${escapeHtml(item.company)}</h3><div class="muted">${escapeHtml(item.duration)}</div></div>
        <div><h3>${escapeHtml(item.role)}</h3><p>${escapeHtml(item.description)}</p></div>
      </article>
    `,
  );
  const portfolio = renderList(
    profile.portfolio,
    (item, index) => `<article class="work-card reveal"><small>0${index + 1}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`,
  );
  const media = renderList(
    featuredMedia,
    (item) => `<article class="media-card reveal"><video controls playsinline preload="metadata" aria-label="${escapeHtml(item.title)} video"><source src="${escapeHtml(item.src)}" type="video/mp4" /></video><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div></article>`,
  );
  const services = renderList(
    profile.services,
    (item) => `<div class="reveal" style="border-top:1px solid rgba(255,255,255,.1);padding-top:18px"><h3>${escapeHtml(item.title)}</h3><p class="body">${escapeHtml(item.description)}</p></div>`,
  );
  const skills = renderList(
    profile.skills,
    (skill) => `<span class="skill">${escapeHtml(skill)}</span>`,
  );

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${escapeHtml(profile.name)} | Presona</title>
      <style>${baseStyles()}</style>
    </head>
    <body>
      <div class="site-atmosphere"></div>
      <div class="site-grid"></div>
      <main>
        <section class="hero">
          <div class="wrap">
            <header class="topbar reveal visible">
              <a href="/dashboard" class="brand">Presona</a>
              <nav class="nav"><a href="#work">Projects</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav>
              <a class="pill" href="mailto:${escapeHtml(profile.email)}">Get in touch</a>
            </header>
            <div class="hero-grid">
              <div class="intro">
                <h1 class="reveal visible">${escapeHtml(profile.name)}</h1>
                <p class="role-title animated-word reveal visible">Growth Director</p>
                <p class="tagline reveal visible">${escapeHtml(profile.tagline)}</p>
                <p class="role-pill reveal visible">${escapeHtml(profile.title)}</p>
                <div class="actions reveal visible">
                  <a class="button primary" href="mailto:${escapeHtml(profile.email)}">Let's build</a>
                  ${profile.socialLinks?.linkedin ? `<a class="button secondary" href="${escapeHtml(profile.socialLinks.linkedin)}">LinkedIn -></a>` : ""}
                </div>
              </div>
              <div class="portrait-shell reveal visible">
                <div class="portrait-card"><img class="portrait" src="${escapeHtml(profile.profileImage)}" alt="${escapeHtml(profile.name)} portrait" /></div>
              </div>
            </div>
            <div class="brand-strip reveal visible">
              <p class="brand-title">Trusted brands I've helped shape</p>
              <div class="brand-track">${brandSlider}</div>
            </div>
            <div class="stats-glass reveal visible">${stats}</div>
          </div>
        </section>
        <section class="section soft-section"><div class="wrap split"><div class="reveal"><div class="kicker">Behind the Growth</div><h2>Shaping Experiences That Make Brands Grow</h2></div><div class="glass reveal"><p class="lead">I'm a product-minded growth leader focused on building clean, measurable, revenue-first digital ecosystems.</p><p class="body">${escapeHtml(profile.about)}</p></div></div></section>
        <section id="work" class="section soft-section"><div class="wrap"><div class="reveal"><div class="kicker">Selected Work</div><h2>Growth Plays</h2></div><div class="work-grid">${portfolio}</div></div></section>
        <section id="media" class="section soft-section"><div class="wrap"><div class="reveal"><div class="kicker">Featured Media</div><h2>Campaign Films</h2></div><div class="media-grid">${media}</div></div></section>
        <section id="experience" class="section soft-section"><div class="wrap"><div class="kicker reveal">Leadership Timeline</div><div class="timeline">${experience}</div></div></section>
        <section class="section band"><div class="wrap split"><div class="glass reveal"><div class="kicker">Services</div><div class="timeline">${services}</div></div><div class="glass reveal"><div class="kicker">Core Skills</div><div class="skills">${skills}</div></div></div></section>
        <footer id="contact"><div class="wrap footer-grid glass reveal"><div><small>Built by</small><h3>Presona</h3></div><div>${escapeHtml(profile.location)}</div><div>${escapeHtml(profile.phone ?? "")}</div><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a></div></footer>
        ${whatsappHref ? `<a class="whatsapp" href="${escapeHtml(whatsappHref)}" target="_blank" rel="noreferrer" aria-label="Message ${escapeHtml(profile.name)} on WhatsApp">WhatsApp</a>` : ""}
      </main>
      ${motionScript()}
    </body>
  </html>`;
}

function renderDashboard(profile) {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Presona Dashboard</title>
      <style>${baseStyles()} .dashboard{min-height:100vh;padding:60px 0}.dashboard-card{max-width:620px;margin:70px auto 0}.client-link{display:flex;justify-content:space-between;align-items:center;margin-top:28px}</style>
    </head>
    <body>
      <main class="dashboard">
        <header class="topbar wrap"><a href="/dashboard" class="brand">Presona</a><a class="pill" href="/site/saad">Open site</a></header>
        <section class="wrap dashboard-card glass">
          <div class="kicker">Operator Dashboard</div>
          <h2>Generate a Website</h2>
          <p class="body">Share the PDF in this Codex chat, and Presona will turn it into a cinematic personal site.</p>
          <a class="button primary" href="/site/saad">Open Saad's Website</a>
          <a class="client-link glass" href="/site/saad"><span><strong>${escapeHtml(profile.name)}</strong><br /><small>${escapeHtml(profile.title)}</small></span><span>Open -></span></a>
        </section>
      </main>
    </body>
  </html>`;
}

async function getSaadProfile() {
  const source = await readFile(join(root, "data", "clients", "saad.json"), "utf8");
  return JSON.parse(source);
}

async function sendFile(response, path) {
  const file = await readFile(path);
  const extension = extname(path);
  const contentType =
    extension === ".svg"
      ? "image/svg+xml"
      : extension === ".png"
        ? "image/png"
        : "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  response.end(file);
}

if (globalThis.presonaLocalPreviewServer?.listening) {
  await new Promise((resolve) => globalThis.presonaLocalPreviewServer.close(resolve));
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? "/", `http://localhost:${port}`);
    const profile = await getSaadProfile();

    if (url.pathname.startsWith("/clients/")) {
      await sendFile(response, join(root, "public", url.pathname));
      return;
    }

    if (url.pathname === "/" || url.pathname === "/dashboard") {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(renderDashboard(profile));
      return;
    }

    if (url.pathname === "/site/saad" || url.pathname === "/preview/saad") {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(renderProfile(profile, url.pathname.startsWith("/preview")));
      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error instanceof Error ? error.message : "Server error");
  }
});

globalThis.presonaLocalPreviewServer = server;

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(port, resolve);
});

console.log(`Presona preview server running at http://localhost:${port}`);
