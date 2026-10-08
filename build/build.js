// Build: CONTENT -> static HTML files. Used by the generator; also runnable in Node (see README).
function build(C) {
  const out = {};
  const cfg = C.config;
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const S = id => C.sources[id];
  const cite = id => { const s = S(id); return `<a class="cite" href="${s.url}" target="_blank" rel="noopener">${esc(s.short)}</a>`; };

  const motif = `<svg class="hero-motif" aria-hidden="true" viewBox="0 0 480 320"><circle cx="480" cy="0" r="192" fill="#ff7a1a"/><circle cx="480" cy="0" r="256" fill="none" stroke="#6b675f"/><circle cx="480" cy="0" r="320" fill="none" stroke="#6b675f"/><circle cx="480" cy="0" r="384" fill="none" stroke="#6b675f"/><circle cx="480" cy="0" r="448" fill="none" stroke="#6b675f"/><circle cx="244.4" cy="216.6" r="8" fill="#f2f0eb"/></svg>`;

  const wordmark = r => `<a class="wordmark" href="${r}"><b>Light Theory</b><i>Labs</i></a>`;
  const navLinks = [["research/", "Research"], ["insights/", "Insights"], ["experts/", "For experts"], ["partners/", "Partners"]];
  const nav = (r, cur) => `
<nav class="nav" aria-label="Primary"><div class="wrap">
  ${wordmark(r)}
  <div class="nav-links">
    <details><summary>Solutions</summary><div>${C.solutions.map(s => `<a href="${r}solutions/${s.slug}/"><span>${s.index}</span>${esc(s.nav)}</a>`).join('')}</div></details>
    ${navLinks.map(([p, l]) => `<a href="${r}${p}"${cur === p ? ' aria-current="page"' : ''}>${l}</a>`).join('')}
    <a class="btn btn-sm btn-primary" href="${r}contact/">Request a demo</a>
  </div>
  <details class="nav-menu"><summary>Menu</summary><div>
    <span class="label">Solutions</span>
    ${C.solutions.map(s => `<a href="${r}solutions/${s.slug}/">${esc(s.nav)}</a>`).join('')}
    <span class="label">Company</span>
    ${navLinks.map(([p, l]) => `<a href="${r}${p}">${l}</a>`).join('')}
    <a class="btn btn-primary" href="${r}contact/">Request a demo</a>
  </div></details>
</div></nav>`;

  const footer = r => `
<footer class="footer"><div class="wrap cols">
  <div class="col" style="gap:16px">${wordmark(r)}<p class="small" style="max-width:34ch">${esc(cfg.entity)}</p><a class="textlink" href="https://lighttheory.com" style="font-size:13px">Part of Light Theory →</a></div>
  <div class="col"><span class="label">Solutions</span>${C.solutions.map(s => `<a href="${r}solutions/${s.slug}/">${esc(s.nav)}</a>`).join('')}</div>
  <div class="col"><span class="label">Company</span><a href="${r}research/">Research</a><a href="${r}insights/">Insights</a><a href="${r}experts/">For experts</a><a href="${r}partners/">Partners</a><a href="${r}contact/">Request a demo</a></div>
  <div class="col"><span class="label">Elsewhere</span><a href="${cfg.social.linkedin}" rel="me">LinkedIn</a><a href="${cfg.social.youtube}" rel="me">YouTube</a><a href="${cfg.social.github}" rel="me">GitHub</a><a href="${cfg.social.huggingface}" rel="me">Hugging Face</a></div>
</div>
<div class="wrap legal"><span>© 2026 ${esc(cfg.name)} · Updated ${cfg.updated}</span><div><a href="${r}privacy/">Privacy</a><a href="${r}terms/">Terms</a><a href="mailto:${cfg.email}">${cfg.email}</a></div></div></footer>`;

  const orgLd = { "@context": "https://schema.org", "@type": "Organization", name: cfg.name, url: cfg.baseUrl + '/', description: cfg.entity, email: cfg.email, parentOrganization: { "@type": "Organization", name: "Light Theory", url: "https://lighttheory.com" }, sameAs: Object.values(cfg.social) };
  const faqLd = items => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) });

  const page = ({ path, title, description, body, cur, ld = [], type = 'website' }) => {
    const depth = path.split('/').length - 1;
    const r = depth ? '../'.repeat(depth) : './';
    const url = cfg.baseUrl + '/' + path.replace(/index\.html$/, '');
    const lds = [orgLd, ...ld].map(o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
    out[path] = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:site_name" content="${esc(cfg.name)}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="${r}assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${r}assets/site.css">
<script src="${r}assets/site.js" defer></script>
${lds}
</head>
<body>
${nav(r, cur)}
<main>
${body.replace(/\{\{r\}\}/g, r).replace(/\{\{cal\}\}/g, cfg.calendarUrl).replace(/\{\{mail\}\}/g, cfg.email)}
</main>
${footer(r)}
</body>
</html>`;
  };

  // ---- fragments
  const sechead = (label, right = '') => `<div class="sechead"><span class="label">${esc(label)}</span>${right}</div>`;
  const faq = items => `<div class="faq">${items.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;
  const cards = (items, cls = 'grid grid-3') => `<div class="${cls}">${items.map(i => `<div class="card"><span class="h4">${esc(i.name)}</span><span class="small">${esc(i.note)}</span>${i.cite ? `<a class="meta" style="font-family:var(--font-mono);font-size:12px;margin-top:4px;color:var(--tungsten)" href="${S(i.cite).url}" target="_blank" rel="noopener">${esc(S(i.cite).label)} →</a>` : ''}</div>`).join('')}</div>`;
  const steps = items => `<div class="steps">${items.map((s, i) => `<div class="step"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="h4">${esc(s.name)}</span><span class="small">${esc(s.note)}</span></div>`).join('')}</div>`;
  const stats = items => `<div class="stats">${items.map(s => `<div class="stat"><b>${esc(s.n)}</b>${s.k ? `<span class="stat-k">${esc(s.k)}</span>` : ''}<p class="small">${esc(s.t)}</p></div>`).join('')}</div>`;
  const ctaBlock = (h2, body) => `<section class="wrap section section-last"><div style="border-top:1px solid var(--line);padding-top:48px" class="intro intro-top"><h2 class="h2">${esc(h2)}</h2><div class="stack-lg"><p class="body">${esc(body)}</p><div class="actions"><a class="btn btn-primary" href="{{r}}contact/">Request a demo</a><a class="btn btn-secondary" href="{{r}}research/">Read the research</a></div></div></div></section>`;

  // ---- placeholder instrument graphics (deterministic, in-theme). Swap for real frames later.
  const svgTimeline = () => {
    const tracks = ['V2', 'V1', 'A1', 'A2', 'A3'];
    const clips = { V2: [[120, 60], [430, 90]], V1: [[0, 150], [150, 110], [260, 180], [440, 70], [510, 130], [640, 160]], A1: [[0, 150], [150, 110], [260, 180], [440, 70], [510, 130], [640, 160]], A2: [[40, 300], [380, 220]], A3: [[0, 800]] };
    const rows = tracks.map((t, i) => {
      const y = 70 + i * 62;
      const cs = (clips[t] || []).map(([x, w], k) => {
        const sel = t === 'V1' && k === 2;
        return `<rect x="${100 + x}" y="${y + 8}" width="${w - 4}" height="44" rx="2" fill="${sel ? '#2b1707' : '#141413'}" stroke="${sel ? '#ff7a1a' : '#2a2926'}"/>` + (t.startsWith('A') ? `<path d="${Array.from({ length: Math.floor((w - 12) / 6) }, (_, n) => { const h = 4 + ((n * 37 + x) % 13); return `M${106 + x + n * 6} ${y + 30 - h}v${h * 2}`; }).join('')}" stroke="#6b675f" stroke-width="1"/>` : '');
      }).join('');
      return `<line x1="100" y1="${y + 60}" x2="960" y2="${y + 60}" stroke="#2a2926"/><text x="24" y="${y + 36}" font-family="var(--font-mono)" font-size="12" fill="#8c8881">${t}</text>${cs}`;
    }).join('');
    const ruler = Array.from({ length: 18 }, (_, n) => `<line x1="${100 + n * 50}" y1="${n % 4 ? 48 : 40}" x2="${100 + n * 50}" y2="56" stroke="#6b675f"/>` + (n % 4 || n > 12 ? '' : `<text x="${104 + n * 50}" y="36" font-family="var(--font-mono)" font-size="11" fill="#8c8881">00:0${n / 4}:${n % 2 ? '30' : '00'}:00</text>`)).join('');
    return `<svg viewBox="0 0 960 400" role="img" aria-label="Edit timeline with five tracks and a playhead"><rect width="960" height="400" fill="#1c1b19"/><line x1="100" y1="56" x2="960" y2="56" stroke="#2a2926"/>${ruler}${rows}<line x1="612" y1="30" x2="612" y2="380" stroke="#ff7a1a" stroke-width="1.5"/><rect x="600" y="22" width="24" height="12" rx="2" fill="#ff7a1a"/><text x="948" y="36" text-anchor="end" font-family="var(--font-mono)" font-size="12" fill="#f2f0eb">01:02:17:08</text></svg>`;
  };
  const svgWaveform = () => {
    const pts = []; let seed = 7;
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let x = 0; x <= 960; x += 3) {
      const base = 220 + Math.sin(x / 90) * 40 + Math.sin(x / 23) * 12;
      for (let k = 0; k < 6; k++) pts.push([x, base + (rnd() - .5) * (60 + Math.sin(x / 40) * 30)]);
    }
    const dots = pts.map(([x, y]) => `<circle cx="${x}" cy="${y.toFixed(1)}" r="1" fill="#a6a29a" opacity="${(0.25 + rnd() * .5).toFixed(2)}"/>`).join('');
    const grid = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(ire => { const y = 360 - ire * 3.2; return `<line x1="60" y1="${y}" x2="960" y2="${y}" stroke="${ire % 50 ? '#2a2926' : '#6b675f'}"/><text x="20" y="${y + 4}" font-family="var(--font-mono)" font-size="11" fill="#8c8881">${ire}</text>`; }).join('');
    return `<svg viewBox="0 0 960 400" role="img" aria-label="Luma waveform scope"><rect width="960" height="400" fill="#1c1b19"/>${grid}${dots}<line x1="60" y1="${360 - 70 * 3.2}" x2="960" y2="${360 - 70 * 3.2}" stroke="#ff7a1a" stroke-dasharray="4 6"/><text x="880" y="${360 - 70 * 3.2 - 8}" font-family="var(--font-mono)" font-size="11" fill="#ff7a1a">skin · 70 IRE</text></svg>`;
  };

  const svgMulticam = () => {
    const cams = [['CAM A', '01:05:12:04', 'wide · 24mm'], ['CAM B', '01:05:12:04', 'tight · 50mm'], ['CAM C', '01:05:12:04', 'ceiling · 2.8mm'], ['POV', '01:05:12:04', 'head · 16mm']];
    return `<svg viewBox="0 0 960 400" role="img" aria-label="Four synchronised camera feeds on one timecode"><rect width="960" height="400" fill="#1c1b19"/>${cams.map(([n, tc, lens], i) => { const x = 24 + (i % 2) * 464, y = 24 + Math.floor(i / 2) * 180; return `<rect x="${x}" y="${y}" width="448" height="164" rx="4" fill="#141413" stroke="#2a2926"/><path d="M${x + 30} ${y + 130} L${x + 418} ${y + 130} M${x + 60} ${y + 130} L${x + 150} ${y + 60} L${x + 300} ${y + 60} L${x + 390} ${y + 130}" stroke="#2a2926" fill="none"/><rect x="${x + 200 + i * 9}" y="${y + 78}" width="26" height="52" rx="2" fill="none" stroke="#6b675f"/><text x="${x + 14}" y="${y + 24}" font-family="var(--font-mono)" font-size="12" fill="#f2f0eb">${n}</text><text x="${x + 14}" y="${y + 150}" font-family="var(--font-mono)" font-size="11" fill="#8c8881">${lens}</text><text x="${x + 338}" y="${y + 24}" font-family="var(--font-mono)" font-size="12" fill="#ff7a1a">${tc}</text><circle cx="${x + 326}" cy="${y + 20}" r="3" fill="#ff7a1a"/>`; }).join('')}</svg>`;
  };
  const svgAgreement = () => {
    const rows = [['Cinematography', .86], ['Colour', .91], ['Sound', .83], ['Edit', .79], ['Structure', .74]];
    return `<svg viewBox="0 0 960 400" role="img" aria-label="Inter-rater agreement by rubric dimension"><rect width="960" height="400" fill="#1c1b19"/><text x="40" y="44" font-family="var(--font-mono)" font-size="11" fill="#8c8881">AGREEMENT · KRIPPENDORFF α · ROUND 3</text>${[.5, .6, .7, .8, .9, 1].map(v => `<line x1="${260 + (v - .5) * 1320}" y1="64" x2="${260 + (v - .5) * 1320}" y2="360" stroke="${v === .8 ? '#6b675f' : '#2a2926'}" stroke-dasharray="${v === .8 ? '4 6' : '0'}"/><text x="${252 + (v - .5) * 1320}" y="380" font-family="var(--font-mono)" font-size="11" fill="#8c8881">${v.toFixed(1)}</text>`).join('')}${rows.map(([n, v], i) => { const y = 84 + i * 54; return `<text x="40" y="${y + 22}" font-family="var(--font-sans)" font-size="14" fill="#a6a29a">${n}</text><rect x="260" y="${y + 8}" width="${(v - .5) * 1320}" height="22" rx="2" fill="${v >= .8 ? '#ff7a1a' : '#6b675f'}"/><text x="${268 + (v - .5) * 1320}" y="${y + 24}" font-family="var(--font-mono)" font-size="12" fill="#f2f0eb">${v.toFixed(2)}</text>`; }).join('')}<text x="700" y="44" font-family="var(--font-mono)" font-size="11" fill="#ff7a1a">THRESHOLD 0.80</text></svg>`;
  };
  // ---- solution-page visuals: scroll-synced step frames, worked judgment, dimension tabs (placeholders; swap for real frames)
  let uidN = 0;
  const uid = p => `${p}${++uidN}`;
  const pad = n => String(n).padStart(2, '0');
  const rng = seed => () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const tx = (x, y, t, { s = 11, f = '#8c8881', a = '', fam = 'var(--font-mono)' } = {}) => `<text x="${x}" y="${y}" font-family="${fam}" font-size="${s}" fill="${f}"${a ? ` text-anchor="${a}"` : ''}>${t}</text>`;
  const sv = (body, vb, label) => `<svg viewBox="${vb}" role="img" aria-label="${label}"><rect width="100%" height="100%" fill="#1c1b19"/>${body}</svg>`;
  const frame = (x, y, w, h, warm, op = .1) => { const id = uid('g'); return `<defs><radialGradient id="${id}" cx="78%" cy="16%" r="95%"><stop offset="0" stop-color="${warm ? '#8a4a16' : '#5c4a36'}"/><stop offset=".5" stop-color="${warm ? '#2b1707' : '#1f1a15'}"/><stop offset="1" stop-color="#0b0b0a"/></radialGradient></defs><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#${id})"/><path d="M${x + w / 3} ${y}v${h}M${x + 2 * w / 3} ${y}v${h}M${x} ${y + h / 3}h${w}M${x} ${y + 2 * h / 3}h${w}" stroke="#f2f0eb" stroke-opacity="${op}"/>`; };

  const stepSvg = {
    rubric: () => {
      const dims = [['Cinematography', 'Framing · lens · camera motion · exposure'], ['Colour', 'Skin tones · white balance · shot continuity'], ['Sound', 'Sync · room tone · Foley · loudness'], ['Edit', 'Cut points · pacing · continuity']];
      return sv(`${tx(32, 44, 'RUBRIC · PAIR SET 0412 · v1.0')}<g class="fx-row" style="--d:900ms"><rect x="508" y="28" width="100" height="24" rx="2" fill="#2b1707" stroke="#ff7a1a"/>${tx(558, 44, 'LOCKED', { f: '#ff7a1a', a: 'middle' })}</g>${dims.map(([n, c], i) => { const y = 108 + i * 78; return `<g class="fx-row" style="--d:${150 + i * 140}ms"><line x1="32" y1="${y - 30}" x2="608" y2="${y - 30}" stroke="#2a2926"/>${tx(32, y, n, { s: 16, f: '#f2f0eb', fam: 'var(--font-sans)' })}${tx(32, y + 22, c)}${[0, 1, 2, 3, 4, 5].map(k => `<rect x="${430 + k * 30}" y="${y - 14}" width="24" height="24" rx="2" fill="none" stroke="#2a2926"/>${tx(442 + k * 30, y + 2, k, { a: 'middle' })}`).join('')}</g>`; }).join('')}<line x1="32" y1="390" x2="608" y2="390" stroke="#2a2926"/>${tx(32, 440, 'Criteria frozen before judging · scale 0–5')}`, '0 0 640 480', 'Rubric with four dimensions, locked before judging');
    },
    calibrate: () => {
      const X = r => 112 + (r - 1) * 160, Y = a => 392 - (a - .5) * 560;
      const line = (vals, d, st, w) => `<path class="fx-draw" pathLength="1" style="--d:${d}ms" d="M${vals.map((v, i) => `${X(i + 1)} ${Y(v).toFixed(1)}`).join('L')}" fill="none" stroke="${st}" stroke-width="${w}"/>`;
      const main = [.58, .69, .77, .86];
      return sv(`${tx(32, 44, 'CALIBRATION · KRIPPENDORFF α BY ROUND')}${[.5, .6, .7, .8, .9, 1].map(a => `<line x1="80" y1="${Y(a)}" x2="608" y2="${Y(a)}" stroke="#2a2926"/>${tx(40, Y(a) + 4, a.toFixed(1))}`).join('')}<line x1="80" y1="${Y(.8)}" x2="608" y2="${Y(.8)}" stroke="#ff7a1a" stroke-dasharray="4 6"/>${tx(88, Y(.8) - 10, 'THRESHOLD 0.80', { f: '#ff7a1a' })}${[1, 2, 3, 4].map(r => tx(X(r), 428, 'ROUND ' + r, { a: 'middle' })).join('')}${line([.52, .66, .79, .88], 100, '#6b675f', 1)}${line([.61, .72, .74, .83], 200, '#6b675f', 1)}${line([.55, .63, .75, .81], 300, '#6b675f', 1)}${line(main, 400, '#ff7a1a', 2)}${main.map((v, i) => `<circle class="fx-row" style="--d:${600 + i * 250}ms" cx="${X(i + 1)}" cy="${Y(v).toFixed(1)}" r="4" fill="#ff7a1a"/>`).join('')}<g class="fx-row" style="--d:1700ms">${tx(X(4) + 8, Y(.86) - 16, 'α 0.86 · CLEARED', { f: '#f2f0eb', a: 'end' })}</g>`, '0 0 640 480', 'Inter-rater agreement rising across calibration rounds past the 0.80 threshold');
    },
    blind: ex => {
      const pos = 80 + (ex.pref.pos / 6) * 480;
      return sv(`${tx(32, 44, 'BLIND PAIR · ' + esc(ex.pair.replace(/^Pair /, '')))}${tx(608, 44, 'MODEL IDENTITY HIDDEN', { a: 'end' })}${['A', 'B'].map((k, i) => { const x = 32 + i * 296; return `${frame(x, 72, 280, 158, k === 'A')}${tx(x + 12, 94, 'CLIP ' + k, { f: '#f2f0eb' })}${tx(x + 12, 216, 'MODEL ••••••', { f: '#a6a29a' })}${k === ex.pref.winner ? `<rect class="fx-row" style="--d:1400ms" x="${x - 2}" y="70" width="284" height="162" rx="4" fill="none" stroke="#ff7a1a" stroke-width="2"/>` : ''}`; }).join('')}<line x1="80" y1="320" x2="560" y2="320" stroke="#6b675f"/>${[0, 1, 2, 3, 4, 5, 6].map(k => `<line x1="${80 + k * 80}" y1="${k === 3 ? 310 : 314}" x2="${80 + k * 80}" y2="${k === 3 ? 330 : 326}" stroke="#6b675f"/>`).join('')}${tx(80, 354, 'A MUCH BETTER', { a: 'middle' })}${tx(320, 354, 'EQUAL', { a: 'middle' })}${tx(560, 354, 'B MUCH BETTER', { a: 'middle' })}<g class="fx-slide" style="--from:${320 - pos}px"><circle cx="${pos}" cy="320" r="8" fill="#ff7a1a"/></g>${tx(32, 430, 'PREFERENCE')}${tx(608, 430, esc(ex.pref.label.toUpperCase()), { f: '#ff7a1a', a: 'end' })}`, '0 0 640 480', 'Two clips judged side by side with a preference marker');
    },
    critique: ex => {
      const X = t => 32 + (t / 8) * 576;
      const ts = ex.critiques.map(c => { const p = c[0].split(':').map(Number); return p[2] + p[3] / 24; });
      return sv(`${tx(32, 44, 'CRITIQUE · CLIP A')}${tx(608, 44, ex.critiques.length + ' NOTES · CITED TO TIMECODE', { a: 'end' })}${Array.from({ length: 8 }, (_, i) => frame(32 + i * 72, 72, 68, 48, 1, .06)).join('')}<line x1="32" y1="140" x2="608" y2="140" stroke="#2a2926"/>${[0, 2, 4, 6, 8].map(s => `<line x1="${X(s)}" y1="136" x2="${X(s)}" y2="144" stroke="#6b675f"/>${tx(X(s), 160, '00:0' + s, { a: s === 8 ? 'end' : s ? 'middle' : 'start' })}`).join('')}${ts.map((t, i) => `<g class="fx-row" style="--d:${300 + i * 300}ms"><line x1="${X(t)}" y1="64" x2="${X(t)}" y2="144" stroke="#ff7a1a" stroke-width="1.5"/><rect x="${X(t) - 9}" y="50" width="18" height="16" rx="2" fill="#ff7a1a"/>${tx(X(t), 62, i + 1, { f: '#0b0b0a', a: 'middle' })}</g>`).join('')}${ex.critiques.map(([tc, dim, note], i) => { const y = 214 + i * 76; return `<g class="fx-row" style="--d:${450 + i * 300}ms"><line x1="32" y1="${y - 26}" x2="608" y2="${y - 26}" stroke="#2a2926"/>${tx(32, y, pad(i + 1), { f: '#ff7a1a' })}${tx(72, y, tc, { f: '#ff7a1a' })}${tx(608, y, esc(dim.toUpperCase()), { a: 'end' })}${tx(72, y + 26, esc(note), { s: 15, f: '#f2f0eb', fam: 'var(--font-sans)' })}</g>`; }).join('')}`, '0 0 640 480', 'Timecoded critique notes pinned to a clip');
    },
    report: ex => {
      const raters = [7, 3, 11, 7, 5, 3, 9, 11];
      const rows = raters.map((rt, i) => { const r = rng(i + 3); const j = v => i ? Math.max(1, Math.min(5, v + Math.round(r() * 2 - 1))) : v; return { id: String(412 + i).padStart(4, '0'), rater: 'R-' + pad(rt), w: i ? (r() > .4 ? 'B' : 'A') : ex.pref.winner, st: i ? 1 + Math.floor(r() * 3) : 2, a: ex.scores.map(s => j(s[1])), b: ex.scores.map(s => j(s[2])) }; });
      const by = rows.length * 30;
      return sv(`${tx(32, 44, 'EXPORT · judgments.jsonl')}${tx(608, 44, '500 ROWS', { a: 'end' })}<rect x="24" y="64" width="592" height="${by + 20}" rx="4" fill="#141413" stroke="#2a2926"/>${rows.map((o, i) => `<text class="fx-row" style="--d:${150 + i * 110}ms" x="40" y="${92 + i * 30}" font-family="var(--font-mono)" font-size="10.5" fill="#8c8881"><tspan fill="#6b675f">${pad(i + 1)}&#160;&#160;</tspan>{"pair":<tspan fill="#ff7a1a">"${o.id}"</tspan>,"rater":<tspan fill="#f2f0eb">"${o.rater}"</tspan>,"pref":<tspan fill="#f2f0eb">"${o.w}"</tspan>,"strength":<tspan fill="#f2f0eb">${o.st}</tspan>,"A":<tspan fill="#f2f0eb">[${o.a}]</tspan>,"B":<tspan fill="#f2f0eb">[${o.b}]</tspan>}</text>`).join('')}${['report.html · table', 'judgments.jsonl', 'agreement · per dimension'].map((c, i) => `<g class="fx-row" style="--d:${1200 + i * 120}ms"><rect x="${32 + i * 196}" y="${by + 112}" width="184" height="32" rx="2" fill="none" stroke="${i === 1 ? '#ff7a1a' : '#2a2926'}"/>${tx(44 + i * 196, by + 132, c, { f: i === 1 ? '#ff7a1a' : '#a6a29a' })}</g>`).join('')}`, '0 0 640 480', 'JSONL export of judgments');
    }
  };
  const stepCaps = { rubric: 'Rubric · frozen before judging', calibrate: 'Calibration · agreement by round', blind: 'Blind pair · model identity hidden', critique: 'Critique · cited to timecode', report: 'Export · table and JSONL' };

  const dimSvg = {
    cine: () => sv(`${frame(0, 0, 960, 540, 0, .16)}<rect x="96" y="54" width="768" height="432" fill="none" stroke="#6b675f" stroke-dasharray="6 6"/>${tx(104, 74, 'TITLE SAFE')}<rect class="fx-row" style="--d:300ms" x="612" y="150" width="140" height="230" fill="none" stroke="#f2f0eb" stroke-opacity=".7"/>${tx(612, 140, 'SUBJECT · RIGHT THIRD', { f: '#f2f0eb' })}<path class="fx-draw" pathLength="1" style="--d:500ms" d="M0 352L960 312" stroke="#ff7a1a" stroke-width="2"/>${tx(940, 300, 'HORIZON −2.4°', { s: 13, f: '#ff7a1a', a: 'end' })}<path class="fx-draw" pathLength="1" style="--d:900ms" d="M140 470C260 452 330 486 420 462S560 440 610 470 720 452 800 462" fill="none" stroke="#a6a29a" stroke-width="1.5"/>${tx(140, 508, 'CAMERA PATH · JITTER AT 00:00:02:18', { s: 12, f: '#a6a29a' })}`, '0 0 960 540', 'Framing guides with a tilted horizon and camera path'),
    colour: () => {
      const cx = 480, cy = 282, R = 210, P = (deg, r) => [cx + Math.cos(deg * Math.PI / 180) * r, cy - Math.sin(deg * Math.PI / 180) * r];
      const r = rng(11);
      const cluster = (deg, rad, n, fill) => Array.from({ length: n }, () => { const [x, y] = P(deg + (r() - .5) * 14, rad + (r() - .5) * 46); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.8" fill="${fill}" opacity="${(.35 + r() * .5).toFixed(2)}"/>`; }).join('');
      const targets = [['R', 103], ['MG', 61], ['B', 347], ['CY', 283], ['G', 241], ['YL', 167]];
      const [sx, sy] = P(123, R + 10), [l1x, l1y] = P(123, 92), [l2x, l2y] = P(137, 128);
      return sv(`${tx(40, 44, 'VECTORSCOPE · CUT 03 → 04')}${tx(920, 44, 'SKIN TONE DRIFT', { f: '#ff7a1a', a: 'end' })}<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#2a2926"/><circle cx="${cx}" cy="${cy}" r="${R / 2}" fill="none" stroke="#2a2926"/><path d="M${cx - R} ${cy}H${cx + R}M${cx} ${cy - R}V${cy + R}" stroke="#2a2926"/>${targets.map(([n, d]) => { const [x, y] = P(d, R * .75), [lx, ly] = P(d, R * .75 + 24); return `<rect x="${(x - 7).toFixed(1)}" y="${(y - 7).toFixed(1)}" width="14" height="14" fill="none" stroke="#6b675f"/>${tx(lx.toFixed(1), (ly + 4).toFixed(1), n, { a: 'middle' })}`; }).join('')}<line x1="${cx}" y1="${cy}" x2="${sx.toFixed(1)}" y2="${sy.toFixed(1)}" stroke="#a6a29a" stroke-dasharray="3 5"/>${tx((sx - 8).toFixed(1), (sy - 6).toFixed(1), 'SKIN LINE', { f: '#a6a29a', a: 'end' })}<g>${cluster(123, 92, 140, '#a6a29a')}</g>${tx((l1x + 34).toFixed(1), (l1y + 34).toFixed(1), 'SHOT 03', { f: '#a6a29a' })}<g class="fx-row" style="--d:500ms">${cluster(137, 128, 140, '#ff7a1a')}${tx((l2x - 40).toFixed(1), (l2y - 30).toFixed(1), 'SHOT 04 · ≈400K WARMER', { f: '#ff7a1a', a: 'end' })}</g>`, '0 0 960 540', 'Vectorscope showing a second shot drifting warm off the skin-tone line');
    },
    sound: () => {
      const r = rng(5), Y = l => 290 + (-14 - l) * 10;
      const amp = x => (x > 560 && x < 650 ? .06 : .35 + .5 * Math.abs(Math.sin(x / 37)) * (.6 + r() * .4));
      const lane = y0 => { let d = ''; for (let x = 60; x < 920; x += 4) { const h = amp(x) * 30; d += `M${x} ${(y0 - h).toFixed(1)}v${(h * 2).toFixed(1)}`; } return `<path d="${d}" stroke="#6b675f" stroke-width="2"/>`; };
      let lp = ''; for (let x = 60; x <= 920; x += 10) { const l = x > 560 && x < 650 ? -31 : -23 + Math.sin(x / 50) * 3 + (r() - .5) * 2; lp += `${x === 60 ? 'M' : 'L'}${x} ${Y(l).toFixed(1)}`; }
      return sv(`${tx(40, 44, 'AUDIO · L/R · SHORT-TERM LOUDNESS')}${tx(920, 44, 'A/V SYNC +3 FR', { f: '#ff7a1a', a: 'end' })}${tx(40, 104, 'L')}${tx(40, 184, 'R')}${lane(100)}${lane(180)}<rect class="fx-row" style="--d:400ms" x="556" y="60" width="98" height="420" fill="#ff7a1a" fill-opacity=".08" stroke="#ff7a1a" stroke-opacity=".5"/>${tx(605, 238, 'ROOM TONE DROPOUT', { f: '#ff7a1a', a: 'middle' })}${tx(605, 254, '00:00:05:20', { f: '#ff7a1a', a: 'middle' })}${[-14, -23, -32].map(l => `<line x1="60" y1="${Y(l)}" x2="920" y2="${Y(l)}" stroke="${l === -23 ? '#ff7a1a' : '#2a2926'}"${l === -23 ? ' stroke-dasharray="4 6"' : ''}/>${tx(52, Y(l) + 4, l, { a: 'end' })}`).join('')}${tx(920, 280, 'TARGET −23 LUFS', { f: '#ff7a1a', a: 'end' })}<path class="fx-draw" pathLength="1" style="--d:200ms" d="${lp}" fill="none" stroke="#f2f0eb" stroke-width="1.5"/><g class="fx-row" style="--d:900ms"><line x1="240" y1="64" x2="240" y2="216" stroke="#f2f0eb"/><line x1="252" y1="64" x2="252" y2="216" stroke="#ff7a1a"/>${tx(258, 76, 'PICTURE / SOUND', { f: '#a6a29a' })}</g>`, '0 0 960 540', 'Stereo waveform and loudness graph with a dropout and sync offset');
    },
    edit: () => {
      const lens = [140, 90, 210, 40, 60, 170, 150], flag = 4, r = rng(9); let x = 60;
      const clips = lens.map(w => { const c = [x, w]; x += w; return c; });
      let wave = ''; for (let i = 64; i < 916; i += 5) { const h = 4 + r() * 16; wave += `M${i} ${(232 - h).toFixed(1)}v${(h * 2).toFixed(1)}`; }
      return sv(`${tx(40, 44, 'TIMELINE · CUT POINTS · SHOT LENGTH')}${tx(920, 44, 'JUMP CUT · 00:00:06:03', { f: '#ff7a1a', a: 'end' })}${tx(24, 140, 'V1')}${tx(24, 236, 'A1')}${clips.map(([cx, w], i) => frame(cx + 2, 104, w - 4, 64, i % 2, .05)).join('')}<path d="${wave}" stroke="#6b675f"/>${clips.slice(1).map(([cx], i) => { const f = i + 1 === flag; return `<path class="fx-row" style="--d:${200 + i * 100}ms" d="M${cx - 6} 84h12l-6 10z" fill="${f ? '#ff7a1a' : '#6b675f'}"/>${f ? `<line x1="${cx}" y1="94" x2="${cx}" y2="262" stroke="#ff7a1a" stroke-width="1.5"/>` : ''}`; }).join('')}${tx(60, 304, 'SHOT LENGTH')}<line x1="60" y1="470" x2="920" y2="470" stroke="#2a2926"/>${clips.map(([cx, w], i) => { const h = w / 210 * 140, bw = Math.min(w - 12, 40); return `<rect class="fx-grow" style="--d:${300 + i * 90}ms" x="${cx + w / 2 - bw / 2}" y="${(470 - h).toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" rx="1" fill="${i === flag - 1 || i === flag ? '#ff7a1a' : '#6b675f'}"/>${tx(cx + w / 2, 492, (w / 860 * 12).toFixed(1) + 's', { a: 'middle' })}`; }).join('')}`, '0 0 960 540', 'Timeline with cut markers and shot-length bars');
    }
  };

  const ok = (x, y, pass) => tx(x, y, pass ? '\u2713' : '\u2717', { s: 13, f: pass ? '#5cb8ff' : '#ff5c6e', a: 'end' });
  Object.assign(stepSvg, {
    rlBrief: t => {
      const rows = [['DELIVERABLE', 'Soundbite script, speaker-attributed, timecoded'], ['CONSTRAINTS', 'Every quote verbatim · runtime 01:30 \u00b13 s'], ['AUDIENCE', 'Investors, first meeting']];
      const ints = [['INT-01', 'Founder', 18], ['INT-02', 'Co-founder', 14], ['INT-03', 'First customer', 10]];
      return sv(`${tx(32, 44, 'BRIEF \u00b7 ' + t.id.toUpperCase())}${tx(608, 44, 'v1.0 \u00b7 SIGNED OFF', { a: 'end' })}<g class="fx-row" style="--d:100ms">${tx(32, 98, 'Founder-story piece, 90 seconds.', { s: 24, f: '#f2f0eb', fam: 'var(--font-sans)' })}</g>${rows.map(([k, v], i) => `<g class="fx-row" style="--d:${250 + i * 120}ms"><line x1="32" y1="${128 + i * 40}" x2="608" y2="${128 + i * 40}" stroke="#2a2926"/>${tx(32, 152 + i * 40, k)}${tx(170, 152 + i * 40, v, { s: 14, f: '#f2f0eb', fam: 'var(--font-sans)' })}</g>`).join('')}<line x1="32" y1="248" x2="608" y2="248" stroke="#2a2926"/>${tx(32, 300, 'SOURCE \u00b7 3 INTERVIEWS \u00b7 42 MIN TRANSCRIPT')}${ints.map(([id, who, m], i) => { const y = 340 + i * 44; return `<g class="fx-row" style="--d:${700 + i * 150}ms">${tx(32, y, id, { f: '#ff7a1a' })}${tx(104, y, who, { s: 14, f: '#f2f0eb', fam: 'var(--font-sans)' })}<rect x="260" y="${y - 10}" width="${m * 16}" height="12" rx="1" fill="#6b675f"/>${tx(608, y, m + ' MIN', { a: 'end' })}</g>`; }).join('')}`, '0 0 640 480', 'Task brief and source interviews');
    },
    rlStart: () => {
      const tree = [['paper-edit-03/', 0, '#f2f0eb'], ['source/', 1, '#a6a29a'], ['INT-01.mov  INT-02.mov  INT-03.mov', 2, '#8c8881'], ['transcript.json', 2, '#8c8881'], ['start.drp', 1, '#ff7a1a'], ['start.otio', 1, '#ff7a1a']];
      return sv(`${tx(32, 44, 'STARTING STATE')}${tx(608, 44, 'RESET BEFORE EVERY ATTEMPT', { a: 'end' })}${tree.map(([n, d, f], i) => `<g class="fx-row" style="--d:${100 + i * 90}ms">${tx(32 + d * 22, 92 + i * 26, (d ? '\u2514 ' : '') + n, { s: 12, f })}</g>`).join('')}<line x1="32" y1="262" x2="608" y2="262" stroke="#2a2926"/>${tx(32, 290, 'TIMELINE \u00b7 EMPTY \u00b7 01:00:00:00')}${['V1', 'A1', 'A2'].map((k, i) => { const y = 312 + i * 40; return `${tx(32, y + 20, k)}<rect class="fx-row" style="--d:${700 + i * 100}ms" x="72" y="${y}" width="536" height="28" rx="2" fill="none" stroke="#6b675f" stroke-dasharray="4 5"/>`; }).join('')}<line x1="72" y1="304" x2="72" y2="428" stroke="#ff7a1a" stroke-width="1.5"/>${tx(32, 456, 'Resolve 19 \u00b7 1920\u00d71080 \u00b7 25 fps')}${tx(608, 456, 'sha256 3f9c\u2026e21', { a: 'end' })}`, '0 0 640 480', 'Task folder and empty starting timeline');
    },
    rlReference: () => {
      const cols = ['#ff7a1a', '#a6a29a', '#6b675f'], clips = [[0, 9], [1, 6], [0, 12], [2, 8], [0, 7], [1, 11], [0, 10], [2, 13], [0, 14]];
      const X = s => 32 + s / 90 * 576; let t = 0;
      return sv(`${tx(32, 44, 'REFERENCE CUT \u00b7 SENIOR EDITOR')}${tx(608, 44, '9 SOUNDBITES \u00b7 01:30', { a: 'end' })}${[0, 30, 60, 90].map(s => `<line x1="${X(s)}" y1="72" x2="${X(s)}" y2="80" stroke="#6b675f"/>${tx(X(s), 96, '00:' + String(s).padStart(2, '0'), { a: s === 90 ? 'end' : s ? 'middle' : 'start' })}`).join('')}${clips.map(([sp, d], i) => { const x = X(t); t += d; return `<rect class="fx-row" style="--d:${150 + i * 90}ms" x="${(x + 1).toFixed(1)}" y="110" width="${(d / 90 * 576 - 2).toFixed(1)}" height="40" rx="2" fill="${cols[sp]}"/>`; }).join('')}${[['INT-01 Founder', 0], ['INT-02 Co-founder', 1], ['INT-03 Customer', 2]].map(([n, k], i) => `<rect x="${32 + i * 196}" y="172" width="10" height="10" fill="${cols[k]}"/>${tx(48 + i * 196, 181, n.toUpperCase())}`).join('')}<g class="fx-row" style="--d:1100ms"><rect x="32" y="232" width="576" height="196" rx="4" fill="#141413" stroke="#2a2926"/>${tx(56, 266, 'NARRATION \u00b7 03:12', { f: '#ff7a1a' })}${tx(56, 312, 'Open on the failure, not the founding story.', { s: 18, f: '#f2f0eb', fam: 'var(--font-sans)' })}${tx(56, 342, 'The investor line lands harder once we have', { s: 18, f: '#f2f0eb', fam: 'var(--font-sans)' })}${tx(56, 372, 'seen what it cost them.', { s: 18, f: '#f2f0eb', fam: 'var(--font-sans)' })}${tx(56, 408, 'One of 11 narrated decisions')}</g>`, '0 0 640 480', 'Reference cut timeline with narrated decision');
    },
    rlChecks: () => {
      const rows = [['quotes_verbatim', '12 / 14', 0], ['speaker_attribution', '14 / 14', 1], ['timecode_valid', '14 / 14', 1], ['quote_order', 'monotonic', 1], ['runtime', '01:47 / 01:30 \u00b13 s', 0], ['delivery_spec', 'srt + pdf', 1]];
      return sv(`${tx(32, 44, 'AUTOMATIC CHECKS \u00b7 AGENT ATTEMPT 3 OF 5')}${tx(608, 44, 'RUN 0412', { a: 'end' })}${rows.map(([n, v, p], i) => { const y = 100 + i * 46; return `<g class="fx-row" style="--d:${150 + i * 130}ms"><line x1="32" y1="${y - 26}" x2="608" y2="${y - 26}" stroke="#2a2926"/>${tx(32, y, n, { s: 13, f: '#f2f0eb' })}${tx(540, y, v, { s: 13, f: p ? '#a6a29a' : '#ff5c6e', a: 'end' })}${ok(608, y, p)}</g>`; }).join('')}<line x1="32" y1="350" x2="608" y2="350" stroke="#2a2926"/><g class="fx-row" style="--d:1100ms">${tx(32, 398, 'AUTOMATIC SCORE')}${tx(608, 404, '0.31 \u00b7 FAIL', { s: 22, f: '#ff5c6e', a: 'end' })}${tx(32, 440, '2 misquotes \u00b7 17 s over runtime')}</g>`, '0 0 640 480', 'Automatic check results for one agent attempt');
    },
    rlRubric: () => {
      const dims = [['Structure', 2, 2], ['Pace', 3, 2], ['Continuity', 4, 4]];
      const blocks = (x, y, v, d) => [1, 2, 3, 4, 5].map(k => `<rect class="fx-row" style="--d:${d + k * 60}ms" x="${x + (k - 1) * 22}" y="${y}" width="18" height="10" rx="2" fill="${k <= v ? '#ff7a1a' : 'none'}" stroke="${k <= v ? 'none' : '#6b675f'}"/>`).join('');
      return sv(`${tx(32, 44, 'CRAFT RUBRIC \u00b7 BLIND \u00b7 CLIP A')}${tx(608, 44, 'SCALE 0\u20135', { a: 'end' })}${tx(300, 96, 'R-03')}${tx(460, 96, 'R-07')}${dims.map(([n, a, b2], i) => { const y = 140 + i * 64; return `<line x1="32" y1="${y - 32}" x2="608" y2="${y - 32}" stroke="#2a2926"/>${tx(32, y + 9, n, { s: 16, f: '#f2f0eb', fam: 'var(--font-sans)' })}${blocks(300, y, a, 150 + i * 200)}${blocks(460, y, b2, 250 + i * 200)}`; }).join('')}<line x1="32" y1="300" x2="608" y2="300" stroke="#2a2926"/><g class="fx-row" style="--d:1100ms">${tx(32, 348, 'MODEL IDENTITY HIDDEN \u00b7 REFERENCE SHOWN AS CLIP B')}${tx(32, 400, 'AGREEMENT')}${tx(608, 406, '\u03b1 0.84 \u00b7 ABOVE 0.80', { s: 20, f: '#f2f0eb', a: 'end' })}</g>`, '0 0 640 480', 'Blind rubric scores from two raters');
    },
    rlAdversarial: () => {
      const rows = [['Trim to runtime mid-sentence', 'CAUGHT \u00b7 sentence_boundary', 1], ['Correct quotes, shuffled order', 'SCORED 0.82 \u2192 PATCHED', 2], ['Render the untouched timeline', 'CAUGHT \u00b7 diff_vs_start', 1], ['Repeat one strong quote three times', 'CAUGHT \u00b7 unique_quotes', 1]];
      return sv(`${tx(32, 44, 'ADVERSARIAL PASS')}${tx(608, 44, 'GRADER v1.1 \u2192 v1.2', { a: 'end' })}${rows.map(([n, r, k], i) => { const y = 104 + i * 70; return `<g class="fx-row" style="--d:${150 + i * 220}ms"><line x1="32" y1="${y - 34}" x2="608" y2="${y - 34}" stroke="#2a2926"/>${tx(32, y, 'ATTACK ' + pad(i + 1))}${tx(32, y + 24, n, { s: 15, f: '#f2f0eb', fam: 'var(--font-sans)' })}${tx(608, y, r, { f: k === 2 ? '#ff7a1a' : '#5cb8ff', a: 'end' })}</g>`; }).join('')}<line x1="32" y1="350" x2="608" y2="350" stroke="#2a2926"/><g class="fx-row" style="--d:1200ms">${tx(32, 398, '4 ATTACKS \u00b7 1 PATCHED')}${tx(608, 404, 'RE-RUN CLEAN', { s: 20, f: '#f2f0eb', a: 'end' })}${tx(32, 440, 'added check: quote_order')}</g>`, '0 0 640 480', 'Log of attempts to game the grader');
    },
    rlGate: () => {
      const agents = [['FRONTIER AGENT A', [0, 0, 0, 0, 0]], ['FRONTIER AGENT B', [0, 1, 0, 0, 0]], ['FRONTIER AGENT C', [0, 0, 0, 1, 0]]];
      return sv(`${tx(32, 44, 'DIFFICULTY GATE')}${tx(608, 44, 'MODEL NAMES HIDDEN', { a: 'end' })}${agents.map(([n, r], i) => { const y = 100 + i * 50; return `<line x1="32" y1="${y - 28}" x2="608" y2="${y - 28}" stroke="#2a2926"/>${tx(32, y, n, { f: '#a6a29a' })}${r.map((p, k) => `<circle class="fx-row" style="--d:${150 + i * 200 + k * 60}ms" cx="${360 + k * 26}" cy="${y - 4}" r="7" fill="${p ? '#5cb8ff' : 'none'}" stroke="${p ? 'none' : '#ff5c6e'}" stroke-width="1.5"/>`).join('')}${tx(608, y, r.filter(Boolean).length + ' / 5', { s: 13, f: '#f2f0eb', a: 'end' })}`; }).join('')}<line x1="32" y1="222" x2="608" y2="222" stroke="#2a2926"/><g class="fx-row" style="--d:900ms">${tx(32, 254, 'AGENTS PASSED 2 / 15 \u00b7 13%')}${tx(580, 254, 'NEEDS \u2264 30%', { a: 'end' })}${ok(608, 254, 1)}</g><g class="fx-row" style="--d:1100ms">${tx(32, 300, 'WORKING EDITOR \u00b7 R-11')}${tx(580, 300, 'PASS \u00b7 41 MIN \u00b7 ROUTINE', { a: 'end' })}${ok(608, 300, 1)}</g><g class="fx-row" style="--d:1400ms"><rect x="32" y="352" width="576" height="76" rx="4" fill="#2b1707" stroke="#ff7a1a"/>${tx(56, 398, 'SHIP', { s: 24, f: '#ff7a1a' })}${tx(584, 396, 'paper-edit-03 \u00b7 v1.2', { s: 13, f: '#f2f0eb', a: 'end' })}</g>`, '0 0 640 480', 'Difficulty gate: agent pass rate and editor check');
    }
  });
  Object.assign(stepCaps, { rlBrief: 'Brief \u00b7 paper-edit-03', rlStart: 'Starting state \u00b7 versioned', rlReference: 'Reference cut \u00b7 with narration', rlChecks: 'Automatic checks \u00b7 one agent attempt', rlRubric: 'Craft rubric \u00b7 blind, two raters', rlAdversarial: 'Adversarial pass \u00b7 grader hardening', rlGate: 'Difficulty gate \u00b7 ship decision' });

  const pipeline = items => { const id = uid('pipe'); const sel = Math.max(0, items.findIndex(i => i.default)); return `<div class="pipe">${items.map((_, i) => `<input type="radio" name="${id}" id="${id}-${i}"${i === sel ? ' checked' : ''}>`).join('')}<div class="pipe-track">${items.map((it, i) => `<label for="${id}-${i}" class="pipe-stage pipe-${it.status.toLowerCase().replace(/\s+/g, '')}"><span class="pipe-dot"></span><span class="num">${pad(i + 1)}</span><span class="h4">${esc(it.name)}</span><span class="pipe-status">${esc(it.status)}</span><span class="meta">${esc(it.grader)} grader</span></label>`).join('')}</div><div class="pipe-panels">${items.map(it => `<div class="panel pipe-panel"><div class="panel-head"><span class="label">Sample brief</span><span class="data small">${esc(it.id)}</span></div><div class="panel-body pipe-body"><p class="h3">${esc(it.brief)}</p><p class="small">${esc(it.note)}</p></div></div>`).join('')}</div></div>`; };
  const ships = sec => `<div class="panel ships"><div class="panel-head"><span class="label">${esc(sec.root)}</span><span class="data small">${esc(sec.meta)}</span></div><div class="ships-list">${sec.files.map(([f, d, depth]) => `<div class="ships-row"><span class="ships-file${depth ? ' sub' : ''}">${depth ? '\u2514 ' : ''}${esc(f)}</span><span class="small">${esc(d)}</span></div>`).join('')}</div><div class="ships-foot">${sec.foot.map(([k, v]) => `<div><span class="label">${esc(k)}</span><span class="small">${esc(v)}</span></div>`).join('')}</div></div>`;

  Object.assign(stepSvg, {
    epScope: () => {
      const crafts = [['Senior video editor', 4], ['Colorist', 2], ['Sound designer', 1]];
      const rows = [['TOOLS', 'Resolve 19 · your harness'], ['VOLUME', '600 judgments a week'], ['THRESHOLD', 'Krippendorff \u03b1 \u2265 0.80'], ['START', 'Calibration in week 1']];
      return sv(`${tx(32, 44, 'SCOPE \u00b7 PANEL P-09')}${tx(608, 44, 'AGREED IN WRITING', { a: 'end' })}${tx(32, 92, 'CRAFTS \u00b7 7 PANELISTS + 1 LEAD')}${crafts.map(([n, k], i) => { const y = 132 + i * 40; return `<g class="fx-row" style="--d:${150 + i * 140}ms">${tx(32, y, n, { s: 15, f: '#f2f0eb', fam: 'var(--font-sans)' })}${Array.from({ length: k }, (_, j) => `<rect x="${420 + j * 24}" y="${y - 13}" width="16" height="16" rx="8" fill="#ff7a1a"/>`).join('')}${tx(608, y, '\u00d7' + k, { a: 'end' })}</g>`; }).join('')}${rows.map(([k, v], i) => { const y = 298 + i * 40; return `<g class="fx-row" style="--d:${650 + i * 120}ms"><line x1="32" y1="${y - 26}" x2="608" y2="${y - 26}" stroke="#2a2926"/>${tx(32, y, k)}${tx(608, y, v, { s: 14, f: '#f2f0eb', fam: 'var(--font-sans)', a: 'end' })}</g>`; }).join('')}`, '0 0 640 480', 'Panel scope sheet');
    },
    epSelect: () => {
      const f = [['Applied', 214], ['Portfolio review', 61], ['Paid test task', 24], ['Calibrated', 12], ['On panel', 7]];
      return sv(`${tx(32, 44, 'SELECTION \u00b7 PANEL P-09')}${tx(608, 44, 'REVIEWED BY WORKING EDITORS', { a: 'end' })}${f.map(([n, v], i) => { const y = 100 + i * 66, w = Math.max(6, v / 214 * 400); return `${tx(32, y, n.toUpperCase())}<rect class="fx-grow-x" style="--d:${150 + i * 160}ms" x="32" y="${y + 12}" width="${w.toFixed(1)}" height="18" rx="2" fill="${i === f.length - 1 ? '#ff7a1a' : '#6b675f'}"/>${tx(608, y + 26, v, { s: 18, f: '#f2f0eb', a: 'end' })}`; }).join('')}<g class="fx-row" style="--d:1100ms">${tx(32, 456, 'About one in thirty applicants joins a panel')}</g>`, '0 0 640 480', 'Candidate selection funnel');
    },
    epDeliver: () => {
      const b2 = [['B-14', 'Delivered', '#5cb8ff', 1], ['B-15', 'In QA', '#ff7a1a', .7], ['B-16', 'In progress', '#a6a29a', .35]];
      return sv(`${tx(32, 44, 'DELIVERY \u00b7 LEAD L-02')}${tx(608, 44, 'ONE CONTACT', { a: 'end' })}${b2.map(([id, st, col, p], i) => { const y = 104 + i * 60; return `<g class="fx-row" style="--d:${150 + i * 160}ms"><line x1="32" y1="${y - 30}" x2="608" y2="${y - 30}" stroke="#2a2926"/>${tx(32, y, 'BATCH ' + id, { s: 13, f: '#f2f0eb' })}<rect x="200" y="${y - 10}" width="280" height="8" rx="1" fill="#2a2926"/><rect x="200" y="${y - 10}" width="${280 * p}" height="8" rx="1" fill="${col}"/>${tx(608, y, st.toUpperCase(), { f: col, a: 'end' })}</g>`; }).join('')}<line x1="32" y1="254" x2="608" y2="254" stroke="#2a2926"/>${[['QUESTIONS ANSWERED', '23'], ['MEDIAN RESPONSE', '2 h'], ['REJECTED IN QA', '1.8%']].map(([k, v], i) => `<g class="fx-row" style="--d:${700 + i * 140}ms">${tx(32 + i * 196, 300, k)}${tx(32 + i * 196, 340, v, { s: 28, f: '#f2f0eb', fam: 'var(--font-sans)' })}</g>`).join('')}<g class="fx-row" style="--d:1200ms"><rect x="32" y="380" width="576" height="56" rx="4" fill="#141413" stroke="#2a2926"/>${tx(52, 413, 'L-02 \u00b7 "Clarified rule 4b on music edits for all raters."', { s: 13, f: '#a6a29a' })}</g>`, '0 0 640 480', 'Lead dashboard with batch status');
    },
    epMonitor: () => {
      const v = [.86, .85, .87, .84, .76, .85, .86, .87], X = i => 72 + i * 76, Y = a => 380 - (a - .6) * 900;
      return sv(`${tx(32, 44, 'WEEKLY AGREEMENT \u00b7 PANEL P-09')}${tx(608, 44, 'WEEKS 1\u20138', { a: 'end' })}${[.7, .8, .9].map(a => `<line x1="64" y1="${Y(a)}" x2="608" y2="${Y(a)}" stroke="${a === .8 ? '#ff7a1a' : '#2a2926'}"${a === .8 ? ' stroke-dasharray="4 6"' : ''}/>${tx(56, Y(a) + 4, a.toFixed(1), { a: 'end' })}`).join('')}${tx(608, Y(.8) - 8, 'THRESHOLD', { f: '#ff7a1a', a: 'end' })}<path class="fx-draw" pathLength="1" d="M${v.map((a, i) => X(i) + ' ' + Y(a).toFixed(1)).join('L')}" fill="none" stroke="#f2f0eb" stroke-width="2"/>${v.map((a, i) => `<circle class="fx-row" style="--d:${300 + i * 120}ms" cx="${X(i)}" cy="${Y(a).toFixed(1)}" r="${i === 4 ? 6 : 4}" fill="${i === 4 ? '#ff5c6e' : '#f2f0eb'}"/>${tx(X(i), 428, 'W' + (i + 1), { a: 'middle' })}`).join('')}<g class="fx-row" style="--d:1300ms"><line x1="${X(4)}" y1="${Y(.76) + 10}" x2="${X(4)}" y2="${Y(.76) + 40}" stroke="#ff5c6e"/>${tx(X(4), Y(.76) + 58, 'DRIFT ON SOUND \u00b7 RECALIBRATED', { f: '#ff5c6e', a: 'middle' })}</g>`, '0 0 640 480', 'Weekly agreement with one recalibrated dip');
    }
  });
  Object.assign(stepCaps, { epScope: 'Scope \u00b7 crafts, volume, threshold', epSelect: 'Selection \u00b7 review and paid test', epDeliver: 'Delivery \u00b7 one lead per panel', epMonitor: 'Monitoring \u00b7 weekly agreement' });

  const roster = items => { const id = uid('ros'); return `<div class="roster">${items.map((_, i) => `<input type="radio" name="${id}" id="${id}-${i}"${i ? '' : ' checked'}>`).join('')}<div class="roster-list">${items.map((it, i) => `<label for="${id}-${i}"><span class="num">${pad(i + 1)}</span><span class="h4">${esc(it.name)}</span><span class="meta">${esc(it.years)}</span></label>`).join('')}</div><div class="roster-cards">${items.map(it => `<div class="panel roster-card"><div class="panel-head"><span class="label">${esc(it.name)}</span><span class="data small">${esc(it.years)}</span></div><dl class="roster-spec">${[['Bar', it.bar], ['Paid test task', it.test], ['Grades', it.grades], ['Tools', it.tools]].map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>`).join('')}</div></div>`; };

  const calib = sec => { const L = sec.log; const sc = arr => `<div class="calib-scores">${arr.map(([r, v]) => `<span><b>${v}</b><i>${esc(r)}</i></span>`).join('')}</div>`; return `<div class="calib" data-fx><ol class="calib-loop">${sec.items.map((it, i) => `<li class="fx-in" style="--d:${i * 150}ms"><span class="num">${pad(i + 1)}</span><span class="h4">${esc(it.name)}</span><span class="small">${esc(it.note)}</span></li>`).join('')}<li class="calib-repeat fx-in" style="--d:650ms"><span class="num">\u21ba</span><span class="small">Repeat until agreement clears the threshold</span></li></ol><div class="panel calib-log"><div class="panel-head"><span class="label">Disagreement log \u00b7 ${esc(L.ref)}</span><span class="data small">${esc(L.round)}</span></div><div class="calib-body"><div class="calib-row fx-in" style="--d:200ms"><span class="label">Before</span>${sc(L.before)}<span class="calib-spread">Spread 2</span></div><div class="calib-row fx-in" style="--d:450ms"><span class="label">Discussion</span><p class="small">${esc(L.reason)}</p></div><div class="calib-row fx-in" style="--d:700ms"><span class="label">Rubric change</span><p class="calib-change">${esc(L.change)}</p></div><div class="calib-row fx-in" style="--d:950ms"><span class="label">After</span>${sc(L.after)}<span class="calib-spread ok">${esc(L.alpha)}</span></div></div></div></div>`; };

  Object.assign(stepSvg, {
    cvSpec: () => {
      const rows = [['SCENARIO', 'Unattended bag, retail entrance, night'], ['CAMERAS', '4 angles · 2.6 m and 3.2 m mounts'], ['VIDEO', '1920\u00d71080 · 30 fps · 90\u00b0 FOV'], ['EVENTS', 'enter · set down bag · exit · staff response'], ['LABELS', 'events, actors, objects, camera IDs'], ['TAKES', '6 day · 6 night']];
      return sv(`${tx(32, 44, 'SPECIFICATION \u00b7 SCENARIO-07')}${tx(608, 44, 'AGREED IN WRITING', { a: 'end' })}${rows.map(([k, v], i) => { const y = 104 + i * 54; return `<g class="fx-row" style="--d:${120 + i * 120}ms"><line x1="32" y1="${y - 30}" x2="608" y2="${y - 30}" stroke="#2a2926"/>${tx(32, y, k)}${tx(160, y, v, { s: 15, f: '#f2f0eb', fam: 'var(--font-sans)' })}</g>`; }).join('')}<line x1="32" y1="398" x2="608" y2="398" stroke="#2a2926"/>${tx(32, 440, 'Signed off by the client before casting')}`, '0 0 640 480', 'Shoot specification sheet');
    },
    cvClear: () => {
      const scopes = ['AI training', 'Transfer to client', 'Retention 5 years', 'Deletion on request'];
      return sv(`${tx(32, 44, 'CLEARANCE \u00b7 SCENARIO-07')}${tx(608, 44, 'BEFORE THE SHOOT', { a: 'end' })}${tx(32, 92, 'PERFORMER RELEASES')}${Array.from({ length: 6 }, (_, i) => { const x = 32 + i * 96; return `<g class="fx-row" style="--d:${120 + i * 90}ms"><rect x="${x}" y="108" width="84" height="64" rx="3" fill="#141413" stroke="#2a2926"/>${tx(x + 12, 132, 'P-0' + (i + 1), { s: 12, f: '#f2f0eb' })}${tx(x + 12, 158, '\u2713 SIGNED', { f: '#5cb8ff' })}</g>`; }).join('')}${tx(32, 222, 'EACH RELEASE COVERS')}${scopes.map((s, i) => { const y = 260 + i * 34; return `<g class="fx-row" style="--d:${700 + i * 120}ms">${tx(32, y, s, { s: 15, f: '#f2f0eb', fam: 'var(--font-sans)' })}${ok(608, y, 1)}</g>`; }).join('')}<g class="fx-row" style="--d:1250ms"><line x1="32" y1="410" x2="608" y2="410" stroke="#2a2926"/>${tx(32, 444, 'SITE PERMISSION')}${tx(608, 444, 'SIGNED \u00b7 STORE 12', { f: '#5cb8ff', a: 'end' })}</g>`, '0 0 640 480', 'Release and site permission checklist');
    },
    cvShoot: () => sv(`${tx(32, 44, 'SHOOT \u00b7 4 CAMERAS \u00b7 ONE CLOCK')}${tx(608, 44, 'LTC LOCKED', { f: '#5cb8ff', a: 'end' })}${['A', 'B', 'C', 'D'].map((k, i) => { const x = 32 + (i % 2) * 292, y = 68 + Math.floor(i / 2) * 176; return `<g class="fx-row" style="--d:${120 + i * 150}ms">${frame(x, y, 284, 160, i % 2, .06)}${tx(x + 12, y + 22, 'CAM ' + k, { f: '#f2f0eb' })}${tx(x + 272, y + 148, '21:14:07:12', { f: '#ff7a1a', a: 'end' })}</g>`; }).join('')}<g class="fx-row" style="--d:900ms">${tx(32, 448, 'SYNC OFFSET A\u2013D')}${tx(608, 448, '0 FRAMES', { s: 14, f: '#f2f0eb', a: 'end' })}</g>`, '0 0 640 480', 'Four synchronised camera views on one timecode'),
    cvLabel: () => {
      const X = s => 96 + s / 180 * 512;
      const lanes = [['A', [[0, 22, 'ENTER'], [22, 30, 'SET DOWN'], [30, 46, 'EXIT']]], ['B', [[4, 22, 'ENTER'], [22, 30, 'SET DOWN']]], ['C', [[118, 160, 'STAFF']]], ['D', [[22, 30, 'SET DOWN'], [30, 160, 'UNATTENDED'], [160, 176, 'PICKUP']]]];
      return sv(`${tx(32, 44, 'LABELS \u00b7 EVENTS BY CAMERA')}${tx(608, 44, '00:00 \u2192 03:00', { a: 'end' })}${[0, 60, 120, 180].map(s => `<line x1="${X(s)}" y1="72" x2="${X(s)}" y2="80" stroke="#6b675f"/>${tx(X(s), 96, '0' + (s / 60) + ':00', { a: s === 180 ? 'end' : s ? 'middle' : 'start' })}`).join('')}${lanes.map(([k, ev], i) => { const y = 116 + i * 58; return `${tx(32, y + 24, 'CAM ' + k)}<line x1="96" y1="${y + 40}" x2="608" y2="${y + 40}" stroke="#2a2926"/>${ev.map(([s0, s1, n], j) => `<g class="fx-row" style="--d:${150 + i * 160 + j * 90}ms"><rect x="${X(s0) + 1}" y="${y + 6}" width="${Math.max(4, X(s1) - X(s0) - 2)}" height="28" rx="2" fill="${n === 'UNATTENDED' ? '#2b1707' : '#2a2926'}" stroke="${n === 'UNATTENDED' ? '#ff7a1a' : '#6b675f'}"/>${X(s1) - X(s0) > 44 ? tx(X(s0) + 8, y + 24, n, { s: 10, f: n === 'UNATTENDED' ? '#ff7a1a' : '#f2f0eb' }) : ''}</g>`).join('')}`; }).join('')}<g class="fx-row" style="--d:1200ms"><line x1="32" y1="368" x2="608" y2="368" stroke="#2a2926"/>${tx(32, 404, 'PASS 1 \u00b7 L-04')}${tx(240, 404, 'PASS 2 \u00b7 L-09')}${tx(608, 404, '0 OPEN DISAGREEMENTS', { f: '#5cb8ff', a: 'end' })}${tx(32, 444, 'Boundaries to the frame, on the shared clock')}</g>`, '0 0 640 480', 'Event labels per camera on a shared timeline');
    },
    cvDeliver: () => {
      const tree = [['scenario-07/', 0, '#f2f0eb', ''], ['footage/', 1, '#a6a29a', '4 cameras \u00d7 12 takes'], ['labels/events.json', 1, '#ff7a1a', '212 events'], ['calibration/', 1, '#a6a29a', 'intrinsics per camera'], ['rights/', 1, '#a6a29a', '6 releases \u00b7 site permission'], ['provenance.log', 1, '#a6a29a', 'who, where, when'], ['README.md', 1, '#a6a29a', 'spec and changes']];
      return sv(`${tx(32, 44, 'DELIVERY')}${tx(608, 44, 'ONE FOLDER PER SCENARIO', { a: 'end' })}${tree.map(([n, d, f, note], i) => { const y = 100 + i * 46; return `<g class="fx-row" style="--d:${120 + i * 120}ms"><line x1="32" y1="${y - 28}" x2="608" y2="${y - 28}" stroke="#2a2926"/>${tx(32 + d * 22, y, (d ? '\u2514 ' : '') + n, { s: 13, f })}${note ? tx(608, y, note, { a: 'end' }) : ''}</g>`; }).join('')}<g class="fx-row" style="--d:1100ms"><rect x="32" y="420" width="576" height="40" rx="3" fill="#2b1707" stroke="#ff7a1a"/>${tx(48, 445, 'SHA-256 MANIFEST \u00b7 VERIFIED ON RECEIPT', { f: '#ff7a1a' })}</g>`, '0 0 640 480', 'Delivery folder structure');
    }
  });
  Object.assign(stepCaps, { cvSpec: 'Specification \u00b7 agreed in writing', cvClear: 'Clearance \u00b7 releases and site', cvShoot: 'Shoot \u00b7 one timecode clock', cvLabel: 'Labels \u00b7 two-pass review', cvDeliver: 'Delivery \u00b7 one folder per scenario' });

  Object.assign(dimSvg, {
    cvStaged: () => sv(`${frame(0, 0, 960, 540, 1, .05)}${tx(28, 40, 'CAM 02 \u00b7 2026-09-14 21:14:07', { s: 14, f: '#f2f0eb' })}<circle cx="920" cy="34" r="6" fill="#ff5c6e"/>${tx(906, 40, 'REC', { s: 13, f: '#ff5c6e', a: 'end' })}<path d="M0 420L380 300L960 330" stroke="#f2f0eb" stroke-opacity=".12" fill="none"/><g class="fx-row" style="--d:300ms"><rect x="470" y="150" width="110" height="250" fill="none" stroke="#f2f0eb" stroke-width="1.5"/>${tx(470, 140, 'P-03 \u00b7 EXIT', { s: 13, f: '#f2f0eb' })}</g><g class="fx-row" style="--d:700ms"><rect x="360" y="352" width="70" height="56" fill="#ff7a1a" fill-opacity=".1" stroke="#ff7a1a" stroke-width="2"/>${tx(360, 432, 'BAG-1 \u00b7 UNATTENDED 00:02:40', { s: 13, f: '#ff7a1a' })}</g>${tx(28, 512, 'EVENT bag_left_unattended \u00b7 CAMERAS A, B, D', { s: 12, f: '#a6a29a' })}`, '0 0 960 540', 'High-angle camera view with labelled person and unattended bag'),
    cvInstalled: () => { const id = uid('fe'); return sv(`<defs><clipPath id="${id}"><circle cx="480" cy="270" r="240"/></clipPath></defs><g clip-path="url(#${id})">${frame(240, 30, 480, 480, 0, .04)}${[-2, -1, 0, 1, 2].map(k => `<path d="M${480 + k * 70} 30Q${480 + k * 120} 270 ${480 + k * 70} 510" stroke="#f2f0eb" stroke-opacity=".14" fill="none"/>`).join('')}</g><circle cx="480" cy="270" r="240" fill="none" stroke="#6b675f"/>${tx(28, 40, 'STORE 12 \u00b7 CAM 03 \u00b7 INSTALLED SYSTEM', { s: 14, f: '#f2f0eb' })}${tx(932, 40, 'AFTER HOURS \u00b7 23:40', { s: 13, f: '#a6a29a', a: 'end' })}<g class="fx-row" style="--d:500ms"><rect x="510" y="250" width="44" height="64" fill="none" stroke="#ff7a1a" stroke-width="2"/>${tx(562, 262, 'P-01 \u00b7 CONCEAL', { s: 13, f: '#ff7a1a' })}</g>${tx(28, 512, 'Recorded on the partner\'s own camera, at its real height and lens', { s: 12, f: '#a6a29a' })}`, '0 0 960 540', 'Fisheye view from an installed ceiling camera'); },
    cvFirstPerson: () => sv(`${frame(24, 64, 600, 400, 1, .05)}${frame(648, 64, 288, 200, 0, .05)}${tx(40, 92, 'HEAD CAM', { s: 13, f: '#f2f0eb' })}${tx(664, 92, 'WRIST CAM \u00b7 R', { s: 13, f: '#f2f0eb' })}${tx(608, 452, '10:42:18:06', { s: 13, f: '#ff7a1a', a: 'end' })}${tx(920, 252, '10:42:18:06', { s: 13, f: '#ff7a1a', a: 'end' })}<g class="fx-row" style="--d:400ms"><rect x="250" y="250" width="120" height="110" fill="none" stroke="#f2f0eb" stroke-width="1.5"/>${tx(250, 240, 'HAND \u00b7 R \u00b7 GRASP', { s: 12, f: '#f2f0eb' })}<rect x="350" y="200" width="150" height="120" fill="#ff7a1a" fill-opacity=".08" stroke="#ff7a1a" stroke-width="2"/>${tx(350, 190, 'BOX-14 \u00b7 PICK', { s: 12, f: '#ff7a1a' })}</g><g class="fx-row" style="--d:800ms"><rect x="648" y="290" width="288" height="174" rx="3" fill="#141413" stroke="#2a2926"/>${tx(664, 318, 'NARRATION', { s: 12, f: '#ff7a1a' })}${tx(664, 350, 'Lifting from the second shelf,', { s: 15, f: '#f2f0eb', fam: 'var(--font-sans)' })}${tx(664, 374, 'checking the label first.', { s: 15, f: '#f2f0eb', fam: 'var(--font-sans)' })}${tx(664, 440, 'WAREHOUSE 3 \u00b7 SHIFT B', { s: 12, f: '#a6a29a' })}</g>${tx(24, 512, 'Both streams on one clock, with hands and objects labelled', { s: 12, f: '#a6a29a' })}`, '0 0 960 540', 'Head and wrist camera views with labels and narration'),
    cvMade: () => { const cx = 480, cy = 290, cams = [[180, 290, 0], [480, 80, 90], [780, 290, 180], [310, 430, -45]]; return sv(`${tx(28, 40, 'CAMERA PLAN \u00b7 TOP-DOWN', { s: 14, f: '#f2f0eb' })}${tx(932, 40, 'TAKE 03 \u00b7 4 ANGLES', { s: 13, f: '#a6a29a', a: 'end' })}${[60, 120, 180].map(r => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2a2926"/>`).join('')}${cams.map(([x, y], i) => { const ang = Math.atan2(cy - y, cx - x), w = .38, L = 150; const p1 = [x + Math.cos(ang - w) * L, y + Math.sin(ang - w) * L], p2 = [x + Math.cos(ang + w) * L, y + Math.sin(ang + w) * L]; return `<g class="fx-row" style="--d:${150 + i * 140}ms"><path d="M${x} ${y}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}Z" fill="#f2f0eb" fill-opacity=".05" stroke="#6b675f"/><rect x="${x - 10}" y="${y - 8}" width="20" height="16" rx="2" fill="#f2f0eb"/>${tx(x + (i === 3 ? -20 : 0), y + (i === 3 ? 4 : y > cy ? 34 : -18), 'CAM ' + 'ABCD'[i], { s: 12, f: '#f2f0eb', a: i === 3 ? 'end' : 'middle' })}</g>`; }).join('')}<circle cx="${cx}" cy="${cy}" r="14" fill="#ff7a1a"/>${tx(cx, cy + 40, 'SUBJECT', { s: 12, f: '#ff7a1a', a: 'middle' })}<path class="fx-draw" pathLength="1" style="--d:800ms" d="M640 470Q760 420 800 330" fill="none" stroke="#ff7a1a" stroke-width="2" stroke-dasharray="1"/><g class="fx-row" style="--d:1300ms">${tx(812, 470, 'DOLLY \u00b7 2 m \u00b7 4 s', { s: 13, f: '#ff7a1a' })}</g>${tx(28, 512, 'Positions, lenses and moves agreed before the shoot', { s: 12, f: '#a6a29a' })}`, '0 0 960 540', 'Top-down camera plan with four angles and a dolly move'); }
  });

  const manifest = sec => `<div class="manifest" data-fx><div class="panel"><div class="panel-head"><span class="label">Delivery manifest</span><span class="data small">${esc(sec.scenario)}</span></div><div class="manifest-rows">${sec.items.map((it, i) => `<div class="manifest-row fx-in" style="--d:${i * 140}ms"><span class="manifest-check">\u2713</span><div class="stack" style="gap:4px"><span class="h4">${esc(it.name)}</span><span class="small">${esc(it.note)}</span></div><span class="manifest-val">${esc(it.value)}</span></div>`).join('')}</div></div><div class="panel manifest-code fx-in" style="--d:500ms"><div class="panel-head"><span class="label">Sample label</span><span class="data small">labels/events.json</span></div><pre>${sec.sample.map(esc).join('\n')}</pre></div></div>`;

  const scrolly = (items, vis, ex) => `<div class="scrolly"><ol class="scrolly-steps">${items.map((s, i) => `<li class="scrolly-step${i ? '' : ' on'}"><span class="num">${pad(i + 1)}</span><span class="h4">${esc(s.name)}</span><span class="small">${esc(s.note)}</span>${stepSvg[vis[i]] ? `<figure class="media scrolly-inline"><div class="scrolly-frame on">${stepSvg[vis[i]](ex)}</div></figure>` : ''}</li>`).join('')}</ol><figure class="media scrolly-fig"><div class="scrolly-frames">${vis.map((v, i) => `<div class="scrolly-frame${i ? '' : ' on'}" data-cap="${esc(stepCaps[v])}">${stepSvg[v](ex)}</div>`).join('')}</div><figcaption class="frame-cap"><span class="scrolly-cap">${esc(stepCaps[vis[0]])}</span><span class="scrolly-nav"><button type="button" class="scrolly-prev" aria-label="Previous step">←</button><span class="scrolly-count">01 / ${pad(vis.length)}</span><button type="button" class="scrolly-next" aria-label="Next step">→</button></span></figcaption></figure></div>`;

  const judgment = (items, ex) => {
    const head = (n, it) => `<div class="jout-head"><span class="num">${pad(n)}</span><span class="h4">${esc(it.name)}</span></div><p class="small">${esc(it.note)}</p>`;
    const clip = k => `<figure class="jclip${ex.pref.winner === k ? ' win' : ''}">${sv(`${frame(0, 0, 640, 360, k === 'A', .1)}${tx(20, 36, 'CLIP ' + k, { s: 14, f: '#f2f0eb' })}${tx(620, 340, '00:00:04:12', { s: 13, f: '#a6a29a', a: 'end' })}`, '0 0 640 360', `Generated clip ${k}, placeholder frame`)}<figcaption class="frame-cap"><span>Clip ${k} · model hidden</span><span>${ex.pref.winner === k ? 'Preferred' : ''}</span></figcaption></figure>`;
    return `<div class="panel judgment"><div class="panel-head"><span class="label">Sample judgment</span><span class="data small">${esc(ex.pair)} · ${esc(ex.rater)}</span></div>
<div class="jclips">${clip('A')}${clip('B')}</div>
<div class="jouts">
<div class="jout">${head(1, items[0])}<div class="pref" style="--to:${(ex.pref.pos / 6 * 100).toFixed(2)}%"><div class="pref-track">${'<i></i>'.repeat(7)}</div><b class="pref-dot"></b><div class="pref-labels"><span>A</span><span>Equal</span><span>B</span></div><span class="pref-out">${esc(ex.pref.label)}</span></div></div>
<div class="jout">${head(2, items[1])}<div class="scores"><span></span><span class="hd">A</span><span class="hd">B</span>${ex.scores.map(([n, a, b]) => `<span>${esc(n)}</span><span class="bar"><span class="trk"><i style="--v:${a / 5}"></i></span><b>${a}</b></span><span class="bar bar-b"><span class="trk"><i style="--v:${b / 5}"></i></span><b>${b}</b></span>`).join('')}</div></div>
<div class="jout">${head(3, items[2])}<ol class="crit">${ex.critiques.map(([tc, dim, note]) => `<li><span class="tc">${esc(tc)} · ${esc(dim)}</span><span class="small">${esc(note)}</span></li>`).join('')}</ol></div>
</div></div>`;
  };

  const dimTabs = items => { const id = uid('dim'); return `<div class="dimtabs">${items.map((_, i) => `<input type="radio" name="${id}" id="${id}-${i}"${i ? '' : ' checked'}>`).join('')}<div class="dimtabs-list">${items.map((it, i) => `<label for="${id}-${i}"><span class="num">${pad(i + 1)}</span><span class="h4">${esc(it.name)}</span><span class="small">${esc(it.note)}</span></label>`).join('')}</div><div class="media dimtabs-stage">${items.map((it, i) => `<div class="dimtabs-panel${i ? '' : ' on'}">${dimSvg[it.vis]()}<div class="frame-cap"><span>${esc(it.cap)}</span><span>${pad(i + 1)} / ${pad(items.length)}</span></div></div>`).join('')}</div></div>`; };

  const media = (kind, cap1, cap2) => `<figure class="media">${({ timeline: svgTimeline, waveform: svgWaveform, multicam: svgMulticam, agreement: svgAgreement })[kind]()}<figcaption class="frame-cap"><span>${esc(cap1)}</span><span>${esc(cap2)}</span></figcaption></figure>`;

  // ---- logo marquee. Add src (e.g. "assets/logos/google.svg") to swap a wordmark for a real logo.
  const logo = l => l.src ? `<img src="${/^https?:/.test(l.src) ? l.src : '{{r}}' + l.src}" alt="${esc(l.name)}">` : l.name ? `<span class="logo-word">${esc(l.name)}</span>` : '<span class="logo-slot">Logo</span>';
  const proofRow = logos => { if (!logos.length) return ''; let set = []; while (set.length < 8) set = set.concat(logos); const items = set.map(logo).join(''); return `<div class="hero-foot proof"><span class="proof-label">Creatives from</span><div class="marquee"><div class="marquee-track"><div class="marquee-set">${items}</div><div class="marquee-set" aria-hidden="true">${items}</div></div></div></div>`; };

  // ---- HOME
  const H = C.home, lead = C.solutions[0], rest = C.solutions.slice(1);
  page({
    path: 'index.html', title: H.title, description: H.description, cur: '',
    ld: [{ "@context": "https://schema.org", "@type": "WebSite", name: cfg.name, url: cfg.baseUrl + '/' }, faqLd(H.faq)],
    body: `
<header class="hero"><canvas class="hero-water" aria-hidden="true"></canvas><div class="wrap"><div class="hero-copy">
  <span class="label">${esc(cfg.name)}</span>
  <h1 class="display"><span class="line"><span>${esc(H.h1lineA)}</span></span> <span class="line"><span>${esc(H.h1lineB)}<span class="accent rotor"${H.h1rotate ? ` data-words="${esc([H.h1accent, ...H.h1rotate].join('|'))}"` : ''}>${esc(H.h1accent)}</span>${esc(H.h1b)}</span></span></h1>
  <p class="lede">${esc(H.lede)}</p>
  <div class="actions" style="margin-top:8px"><a class="btn btn-primary" href="{{r}}contact/">Request a demo</a><a class="btn btn-secondary" href="{{r}}research/">Read the research</a><a class="textlink" href="{{r}}experts/" style="margin-left:8px">Editor or colorist? Join the panel →</a></div>
</div></div>${proofRow(H.logos || [])}</header>

<section class="wrap section">
  ${sechead(H.problem.label, `<a href="{{r}}research/">Full analysis →</a>`)}
  <div class="intro" style="align-items:start"><h2 class="h2">${esc(H.problem.h2)}</h2><div class="stack">${H.problem.body.map(p => `<p class="body">${esc(p)}</p>`).join('')}</div></div>
  ${stats(H.problem.stats)}
</section>

<section class="wrap section">
  ${sechead('Solutions')}
  <div class="grid grid-3">
    <a class="card card-lg span-all" href="{{r}}solutions/${lead.slug}/">
      <div class="stack-lg"><div style="display:flex;gap:12px;align-items:center"><span class="num num-on">${lead.index}</span><span class="label">Reinforcement learning</span></div><h3 class="h2" style="font-size:clamp(28px,3.5vw,36px)">${esc(lead.title)}</h3></div>
      <div class="stack-lg" style="justify-content:space-between"><p class="body">${esc(lead.summary)}</p><span class="textlink" style="color:var(--tungsten)">Learn more <span class="arrow">→</span></span></div>
    </a>
    ${rest.map(s => `<a class="card" href="{{r}}solutions/${s.slug}/" style="gap:16px;padding:24px"><span class="num">${s.index}</span><h3 class="h3">${esc(s.nav)}</h3><p class="small" style="flex:1">${esc(s.summary)}</p></a>`).join('')}
  </div>
</section>

<section class="wrap section">
  ${sechead(H.anatomy.label, `<a href="{{r}}solutions/${lead.slug}/">How tasks are built →</a>`)}
  <div class="intro"><h2 class="h2">${esc(H.anatomy.h2)}</h2><p class="body">${esc(H.anatomy.body)}</p></div>
  <div class="split"><div>${steps(H.anatomy.steps)}</div><figure class="media">${svgTimeline()}<figcaption class="frame-cap"><span>Starting state · paper-edit-03 · Resolve</span><span>01:30:00 → reference 01:31:04</span></figcaption></figure></div>
</section>

<section class="wrap section">
  ${sechead(H.panel.label, `<a href="{{r}}experts/">Join the panel →</a>`)}
  <div class="split" style="margin-bottom:64px"><div class="stack-lg"><h2 class="h2">${esc(H.panel.h2)}</h2><p class="body">${esc(H.panel.body)}</p></div><figure class="media">${svgWaveform()}<figcaption class="frame-cap"><span>Luma waveform · camera B · colour match</span><span>00:01:05:12</span></figcaption></figure></div>
  ${cards(H.panel.cards)}
</section>

<section class="wrap section">
  ${sechead(H.trust.label)}
  ${cards(H.trust.cards, 'grid grid-4')}
</section>

<section class="wrap section">
  <a class="card card-lg" href="{{r}}partners/" style="align-items:center;gap:24px">
    <div class="stack"><span class="label">Partners</span><h3 class="h3">Data vendor? We plug into your lab contracts.</h3></div>
    <p class="body">Creative-domain tasks, evaluation and calibrated panels under your agreement, white-label or co-delivered. NDA and non-circumvention signed first. <span style="color:var(--tungsten)">Partner with us <span class="arrow">→</span></span></p>
  </a>
</section>

<section class="wrap section">
  ${sechead('Questions', `<span class="label">${H.faq.length}</span>`)}
  ${faq(H.faq)}
</section>

${ctaBlock('See it on a live task.', 'A 30-minute call or demo with the people who build the tasks: a real task, its grader and a baseline run. A written proposal follows within 48 hours.')}`
  });

  // ---- SOLUTIONS
  for (const s of C.solutions) {
    page({
      path: `solutions/${s.slug}/index.html`, title: `${s.nav} — ${cfg.name}`, description: s.description, cur: 'solutions', ld: [faqLd(s.faq)],
      body: `
<header class="pagehead"><div class="wrap">
  <div class="stack-lg"><span class="label">Solutions · ${s.index}</span><h1 class="h1">${esc(s.title)}</h1></div>
  <div class="stack-lg"><p class="lede">${esc(s.summary)}</p><div class="actions"><a class="btn btn-primary" href="{{r}}contact/">Request a demo</a><a class="btn btn-secondary" href="{{r}}research/">Read the research</a></div></div>
</div></header>

<section class="wrap section">${sechead("Who it's for")}${cards(s.buyers, s.buyers.length === 4 ? 'grid grid-4' : undefined)}</section>

${s.media ? `<section class="wrap section">${media(s.media.kind, s.media.cap1, s.media.cap2)}</section>` : ''}

<section class="wrap section">${sechead('How it works')}${s.stepVisuals ? scrolly(s.steps, s.stepVisuals, s.example || s.task) : steps(s.steps)}</section>

${s.sections.map(sec => `
<section class="wrap section">
  ${sechead(sec.label)}
  <div class="intro${sec.kind === 'calib' ? ' intro-top' : ''}"><h2 class="h2">${esc(sec.heading)}</h2>${sec.body ? `<p class="body">${esc(sec.body)}</p>` : '<span></span>'}</div>
  ${sec.kind === 'manifest' ? manifest(sec) : sec.kind === 'roster' ? roster(sec.items) : sec.kind === 'calib' ? calib(sec) : sec.kind === 'pipeline' ? pipeline(sec.items) : sec.kind === 'ships' ? ships(sec) : sec.items.length ? (sec.kind === 'example' && s.example ? judgment(sec.items, s.example) : sec.kind === 'tabs' && sec.items.every(i => dimSvg[i.vis]) ? dimTabs(sec.items) : cards(sec.items)) : ''}
</section>`).join('')}

<section class="wrap section">
  <div class="grid grid-2">
    <div class="panel"><div class="panel-head"><span class="label">Evidence</span><span class="meta" style="font-family:var(--font-mono);font-size:12px">Timeline-Bench · Sep 2026</span></div>
      <div class="panel-body stack"><span class="stat"><b>26.8%</b></span><p class="small">of 56 real editing tasks resolved by the best of 16 frontier agents. 73% of failed runs failed only the human-calibrated quality test. Our own baseline on 20 tasks publishes in November.</p><a class="textlink" href="{{r}}research/">Read the analysis →</a></div></div>
    <div class="panel"><div class="panel-head"><span class="label">Sample grade · paper-edit-03</span><span class="tag tag-pass">✓ graded</span></div>
      <div>${[['Quotes match transcript', 'Automatic · 14 of 14', 5], ['Runtime within brief', 'Automatic · 01:31 of 01:30', 4], ['Story structure', 'Panel · R-03, R-07 · blind', 2]].map(([n, m, v], i, a) => `<div style="display:grid;grid-template-columns:1fr auto 44px;align-items:center;gap:16px;padding:12px 16px;${i < a.length - 1 ? 'border-bottom:1px solid var(--line)' : ''}"><div class="stack" style="gap:0"><span style="font-size:14px;line-height:20px">${n}</span><span class="meta">${m}</span></div><div style="display:flex;gap:3px">${[1, 2, 3, 4, 5].map(k => `<span style="width:18px;height:8px;border-radius:2px;${k <= v ? 'background:var(--tungsten)' : 'background:var(--surface-sunken);box-shadow:inset 0 0 0 1px var(--line-strong)'}"></span>`).join('')}</div><span class="data" style="text-align:right">${v}/5</span></div>`).join('')}</div></div>
  </div>
</section>

<section class="wrap section">${sechead('Questions')}${faq(s.faq)}</section>
${ctaBlock('Request a demo.', 'Thirty minutes with the people who build the tasks. A written proposal within 48 hours.')}`
    });
  }

  // ---- RESEARCH
  const R = C.research;
  page({
    path: 'research/index.html', title: `${R.title} — ${cfg.name}`, description: R.description, cur: 'research/',
    body: `
<header class="pagehead pagehead-single"><div class="wrap">
  <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="label">Research · updated ${cfg.updated}</span><span class="tag tag-running">● ${esc(R.status)}</span></div>
  <h1 class="h1" style="max-width:24ch">${esc(R.h1)}</h1>
  <p class="lede" style="max-width:62ch">${esc(R.lede)}</p>
</div></header>

<section class="wrap section">
  ${sechead('What the benchmarks show', `<span class="label">${R.benchmarks.length} published studies</span>`)}
  <div class="table"><table><thead><tr><th>Benchmark</th><th>What it measures</th><th>Scale</th><th>Headline result</th></tr></thead><tbody>
  ${R.benchmarks.map(b => `<tr><td><div class="stack" style="gap:4px"><span>${esc(b.name)}</span><span class="meta">${esc(b.who)}</span><a class="meta" style="font-family:var(--font-mono);font-size:12px;color:var(--tungsten)" href="${S(b.cite).url}" target="_blank" rel="noopener">${S(b.cite).url.replace('https://','')}</a></div></td><td>${esc(b.measures)}</td><td class="data" style="white-space:normal;color:var(--ink-muted)">${esc(b.scale)}</td><td style="color:var(--ink)">${esc(b.result)}</td></tr>`).join('')}
  </tbody></table></div>
</section>

<section class="wrap section">
  ${sechead(R.failures.label)}
  <div class="intro"><h2 class="h2">${esc(R.failures.h2)}</h2><p class="body">${esc(R.failures.body)}</p></div>
  ${cards(R.failures.cards, 'grid grid-4')}
</section>

<section class="wrap section">
  ${sechead(R.market.label)}
  <div class="intro" style="align-items:start"><h2 class="h2">${esc(R.market.h2)}</h2><div class="stack">${R.market.body.map(p => `<p class="body">${esc(p)}</p>`).join('')}<p class="meta" style="font-family:var(--font-mono);font-size:12px">${R.market.cites.map(cite).join(' · ')}</p></div></div>
</section>

<section class="wrap section">
  ${sechead(R.program.label)}
  <div class="intro"><h2 class="h2">${esc(R.program.h2)}</h2><p class="body">Agreement data is published with every evaluation. The chart shows the format: inter-rater agreement per rubric dimension against the threshold agreed with the buyer.</p></div>
  <div style="margin-bottom:64px">${media('agreement', 'Agreement report · format sample', 'per dimension · α')}</div>
  <div class="rows">${R.program.items.map(i => `<div><div class="stack" style="gap:8px"><span class="h4" style="font-size:20px">${esc(i.name)}</span><span class="tag tag-${i.status}" style="align-self:flex-start">${i.status === 'running' ? '●' : '○'} ${esc(i.statusLabel)}</span></div><span class="small">${esc(i.note)}</span><span class="data" style="color:var(--ink-muted)">${esc(i.when)}</span></div>`).join('')}</div>
</section>

<section class="wrap section">
  <div class="panel"><div class="panel-head"><span class="label">Report</span><span class="meta" style="font-family:var(--font-mono);font-size:12px">PDF · results table · failure clips · sample tasks</span></div>
  <div class="panel-body intro" style="margin:0;align-items:center"><div class="stack"><h3 class="h3">Request the report when it publishes.</h3><p class="body">The full baseline with per-task results, the failure taxonomy and three sample tasks with a working grader. Headline numbers and the results table will stay open on this page.</p></div><div class="actions"><a class="btn btn-primary" href="mailto:{{mail}}?subject=Request%20the%20baseline%20report">Request the report</a><a class="btn btn-secondary" href="{{r}}contact/">Request a demo</a></div></div></div>
</section>

<section class="wrap section section-last">
  ${sechead('Sources')}
  <ol class="sources">${Object.values(C.sources).map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a> · ${esc(s.short)}</li>`).join('')}</ol>
</section>`
  });

  // ---- INSIGHTS INDEX
  page({
    path: 'insights/index.html', title: `Insights — ${cfg.name}`, description: 'Short, answer-first notes on how creative RL environments are built, graded and priced.', cur: 'insights/',
    body: `
<header class="pagehead pagehead-single"><div class="wrap"><span class="label">Insights</span><h1 class="h1">Notes from the edit bay.</h1><p class="lede">Short, answer-first notes on how creative RL environments are built, graded and priced, with sources.</p></div></header>
<section class="wrap" style="padding-top:64px;padding-bottom:96px"><div class="rows">
${C.articles.map(a => `<a href="{{r}}insights/${a.slug}/" style="display:grid;grid-template-columns:minmax(120px,1fr) minmax(0,3fr);gap:24px;padding:28px 0;border-bottom:1px solid var(--line);color:var(--ink)"><span class="data" style="color:var(--ink-faint);font-size:12px">${a.updated} · ${a.readTime}</span><div class="stack" style="gap:8px"><span class="h3">${esc(a.title)}</span><span class="body">${esc(a.summary)}</span></div></a>`).join('')}
</div></section>`
  });

  // ---- ARTICLES
  for (const a of C.articles) {
    page({
      path: `insights/${a.slug}/index.html`, title: `${a.title} — ${cfg.name}`, description: a.description, cur: 'insights/', type: 'article',
      ld: [{ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, dateModified: a.updated, datePublished: a.updated, author: { "@type": "Organization", name: cfg.name }, publisher: { "@type": "Organization", name: cfg.name }, mainEntityOfPage: `${cfg.baseUrl}/insights/${a.slug}/` }, faqLd(a.faq)],
      body: `
<article class="wrap article">
  <aside>
    <a class="label" href="{{r}}insights/" style="color:var(--tungsten)">← Insights</a>
    <div><span class="label">Last updated</span><span class="data">${a.updated}</span></div>
    <div><span class="label">Author</span><span style="font-size:14px">${esc(a.author)}</span></div>
    <div><span class="label">Read</span><span class="data">${a.readTime}</span></div>
  </aside>
  <div class="article-body">
    <div class="stack-lg"><h1 class="h1" style="font-size:clamp(32px,4.5vw,48px)">${esc(a.title)}</h1><p class="lede" style="color:var(--ink);max-width:64ch">${esc(a.summary)}</p></div>
    ${a.sections.map(s => `<div class="stack"><h2>${esc(s.h2)}</h2>${s.paras.map(p => `<p>${esc(p)}</p>`).join('')}</div>`).join('')}
    <div class="stack" style="padding-top:24px;border-top:1px solid var(--line)"><span class="label">Questions</span>${faq(a.faq)}</div>
    <div class="stack"><span class="label">Sources</span><ol class="sources">${a.cites.map(id => { const s = S(id); return `<li><a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)}</a> · ${esc(s.short)}</li>`; }).join('')}</ol></div>
    <a class="card" href="{{r}}research/" style="flex-direction:row;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;padding:24px"><div class="stack" style="gap:4px"><span class="label">Research</span><span class="h4">Can AI edit video? What the evidence shows so far.</span></div><span class="btn btn-secondary">Read the research</span></a>
  </div>
</article>`
    });
  }

  // ---- EXPERTS
  const E = C.experts;
  page({
    path: 'experts/index.html', title: `${E.title} — ${cfg.name}`, description: E.description, cur: 'experts/', ld: [faqLd(E.faq)],
    body: `
<header class="pagehead"><div class="wrap">
  <div class="stack-lg"><span class="label">For experts</span><h1 class="h1">${esc(E.h1a)}<span class="accent">${esc(E.h1accent)}</span>${esc(E.h1b)}</h1><span class="data">${esc(E.pay)}</span></div>
  <div class="stack-lg"><p class="lede">${esc(E.lede)}</p><div class="actions"><a class="btn btn-primary" href="mailto:{{mail}}?subject=Panel%20application">Apply to the panel</a><a class="textlink" href="#roles">See the roles →</a></div></div>
</div></header>

<section class="wrap section" id="roles">
  ${sechead('Roles', `<span class="label">${E.roles.length} open</span>`)}
  <div class="rows">${E.roles.map(r => `<div><span class="h4">${esc(r.name)}</span><div class="stack" style="gap:4px"><span class="label">The bar</span><span class="small">${esc(r.bar)}</span></div><div class="stack" style="gap:4px"><span class="label">The work</span><span class="small">${esc(r.work)}</span></div></div>`).join('')}</div>
</section>

<section class="wrap section">
  <div class="grid grid-2" style="gap:32px;align-items:start">
    <div class="stack-lg"><span class="label">What the work is</span><h2 class="h2">${esc(E.work.h2)}</h2><p class="body" style="max-width:56ch">${esc(E.work.body)}</p></div>
    <div class="panel"><div class="panel-head"><span class="label">Example task · ${E.work.example.id}</span><span class="meta" style="font-family:var(--font-mono);font-size:12px">${esc(E.work.example.hours)}</span></div>
      <div class="panel-body stack" style="gap:16px;padding:20px">
        <div class="stack" style="gap:4px"><span class="label">Brief</span><span class="small">${esc(E.work.example.brief)}</span></div>
        <div class="stack" style="gap:4px"><span class="label">You deliver</span><span class="small">${esc(E.work.example.deliver)}</span></div>
        <div class="stack" style="gap:4px"><span class="label">Grader checks</span><span class="data">${esc(E.work.example.checks)}</span></div>
      </div></div>
  </div>
</section>

<section class="wrap section">${media('timeline', 'Starting state · paper-edit-03 · Resolve', 'your reference cut lands at 01:31:04')}</section>
<section class="wrap section">${sechead('Process')}${steps(E.process)}</section>
<section class="wrap section">${sechead('Terms, in plain English')}${cards(E.terms, 'grid grid-4')}</section>
<section class="wrap section">${sechead('Questions')}${faq(E.faq)}</section>

<section class="wrap section section-last">
  <div class="panel"><div class="panel-head"><span class="label">Apply to the panel</span><span class="meta" style="font-family:var(--font-mono);font-size:12px">Reply within 1 business day</span></div>
  <div class="panel-body intro" style="margin:0;align-items:center"><div class="stack"><h3 class="h3">Send a link to your work.</h3><p class="body">Email a reel or portfolio, the role you are applying for, your tools and years. A working editor reviews every application. Remote, contractor, US and Latin America first.</p></div><div class="actions"><a class="btn btn-primary" href="mailto:{{mail}}?subject=Panel%20application">Apply by email</a></div></div></div>
</section>`
  });

  // ---- PARTNERS
  const P = C.partners;
  page({
    path: 'partners/index.html', title: `${P.title} — ${cfg.name}`, description: P.description, cur: 'partners/',
    body: `
<header class="pagehead pagehead-single"><div class="wrap"><span class="label">Partners</span><h1 class="h1">${esc(P.h1)}</h1><p class="lede">${esc(P.lede)}</p></div></header>

<section class="wrap" style="padding-top:64px"><div class="grid grid-3">
${P.types.map(t => `<a class="card" href="#${t.id}" style="gap:12px"><span class="label">${t.id}</span><span class="h4">${esc(t.name)}</span><span class="small">${esc(t.model)}</span></a>`).join('')}
</div></section>

${P.types.filter(t => t.full).map(t => `
<section class="wrap section" id="${t.id}">
  ${sechead(t.id)}
  <div class="grid grid-2" style="gap:48px;align-items:start">
    <div class="stack-lg"><h2 class="h2">${esc(t.name)}</h2><p class="body">${esc(t.body)}</p><a class="btn btn-secondary" href="{{r}}contact/" style="align-self:flex-start">Start a conversation</a></div>
    <div class="panel">
      <div style="padding:16px 20px;border-bottom:1px solid var(--line)" class="stack"><span class="label">What we do together</span><span class="small ink">${esc(t.short)}</span></div>
      <div style="padding:16px 20px;border-bottom:1px solid var(--line)" class="stack"><span class="label">Engagement model</span><span class="small ink">${esc(t.model)}</span></div>
      <div style="padding:16px 20px" class="stack"><span class="label">Proof point</span><span class="small ink">${esc(t.proof)}</span></div>
    </div>
  </div>
</section>`).join('')}

<section class="wrap section">
  ${sechead('Also open')}
  <div class="rows">${P.types.filter(t => !t.full).map(t => `<div id="${t.id}"><span class="h4">${esc(t.name)}</span><span class="small">${esc(t.short)}</span><span class="small">${esc(t.model)}</span></div>`).join('')}</div>
</section>

<section class="wrap section">${sechead('Standard on every engagement')}${cards(P.standards)}</section>

<section class="wrap section section-last">
  <div class="panel"><div class="panel-head"><span class="label">How it starts</span><span class="meta" style="font-family:var(--font-mono);font-size:12px">A call or demo</span></div>
  <div class="panel-body intro" style="margin:0;align-items:center"><div class="stack"><h3 class="h3">Tell us which kind of partner you are.</h3><p class="body">Labs and vendors hear back within one business day with next steps. Everyone else hears back within the week.</p></div><div class="actions"><a class="btn btn-primary" href="{{cal}}" target="_blank" rel="noopener">Book an intro call</a><a class="btn btn-secondary" href="mailto:{{mail}}?subject=Partnership">Email us</a></div></div></div>
</section>`
  });

  // ---- CONTACT
  const K = C.contact;
  page({
    path: 'contact/index.html', title: K.title, description: K.description, cur: 'contact/',
    body: `
<section class="wrap" style="padding-top:80px;padding-bottom:96px"><div class="grid grid-2" style="gap:64px;align-items:start">
  <div class="stack-lg" style="gap:24px">
    <span class="label">Request a demo</span><h1 class="h1">${esc(K.h1)}</h1><p class="lede" style="max-width:52ch">${esc(K.lede)}</p>
    <div class="rows">${K.steps.map((s, i) => `<div style="grid-template-columns:40px 1fr;padding:16px 0"><span class="num">${String(i + 1).padStart(2, '0')}</span><span class="body">${esc(s)}</span></div>`).join('')}</div>
    <p class="small">Prefer email? <a href="mailto:{{mail}}">${cfg.email}</a>. We reply within one business day.</p>
  </div>
  <form class="panel form" data-request action="${cfg.formAction || 'mailto:' + cfg.email}" method="post"${cfg.formAction ? '' : ' enctype="text/plain"'}>
    <div class="panel-head"><span class="label">Request</span><span class="meta" style="font-family:var(--font-mono);font-size:12px">Reply within one business day</span></div>
    <div class="panel-body form-body">
      <input type="hidden" name="_subject" value="Demo request — ${esc(cfg.name)}">
      <fieldset class="field"><legend class="label">I'd like</legend><div class="seg"><label><input type="radio" name="request" value="Live demo" checked><span>A live demo</span></label><label><input type="radio" name="request" value="Intro call"><span>An intro call</span></label></div></fieldset>
      <div class="field-row"><label class="field"><span class="label">Name</span><input name="name" autocomplete="name" required></label><label class="field"><span class="label">Work email</span><input type="email" name="email" autocomplete="email" required></label></div>
      <div class="field-row"><label class="field"><span class="label">Company</span><input name="company" autocomplete="organization" required></label><label class="field"><span class="label">I'm with</span><select name="role" required><option value="" disabled selected>Choose one</option>${K.roles.map(r => `<option>${esc(r)}</option>`).join('')}</select></label></div>
      <fieldset class="field"><legend class="label">Interested in</legend><div class="chips">${K.interests.map(i => `<label><input type="checkbox" name="interest" value="${esc(i)}"><span>${esc(i)}</span></label>`).join('')}</div></fieldset>
      <label class="field"><span class="label">What are you training or evaluating? <i>Optional</i></span><textarea name="message" rows="4"></textarea></label>
      <div class="form-foot"><button class="btn btn-primary" type="submit">Send request</button><a class="textlink" href="{{cal}}" target="_blank" rel="noopener">Or pick a time directly <span class="arrow">→</span></a></div>
      <p class="form-status small" role="status" hidden></p>
    </div>
  </form>
</div></section>`
  });

  // ---- 404, legal stubs
  page({ path: '404.html', title: `Not found — ${cfg.name}`, description: 'Page not found.', cur: '', body: `<section class="wrap" style="padding-top:120px;padding-bottom:120px"><div class="stack-lg"><span class="label">404</span><h1 class="h1">Nothing on this timeline.</h1><p class="lede">The page you asked for is not here. <a href="{{r}}">Return to the start</a>.</p></div></section>` });
  for (const [p, t] of [['privacy', 'Privacy'], ['terms', 'Terms']]) page({ path: `${p}/index.html`, title: `${t} — ${cfg.name}`, description: `${t} for ${cfg.name}.`, cur: '', body: `<section class="wrap" style="padding-top:80px;padding-bottom:120px"><div class="stack-lg"><span class="label">${t}</span><h1 class="h1">${t}</h1><p class="lede">This page is being prepared with counsel and will publish before the first pilot order. Questions: <a href="mailto:{{mail}}">${cfg.email}</a>.</p></div></section>` });

  // ---- explicit index.html on internal folder links (works in local previews and on GitHub Pages)
  for (const k of Object.keys(out)) if (k.endsWith('.html')) out[k] = out[k].replace(/href="([^"#:]*\/)(#[^"]*)?"/g, (m, p, h) => `href="${p}index.html${h || ''}"`);

  // ---- machine-readable
  const urls = Object.keys(out).filter(p => p.endsWith('index.html') && !/^(privacy|terms)\//.test(p)).map(p => cfg.baseUrl + '/' + p.replace(/index\.html$/, ''));
  out['sitemap.xml'] = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u}</loc><lastmod>${cfg.updated}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  out['robots.txt'] = `User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\nUser-agent: ChatGPT-User\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: Claude-User\nAllow: /\nUser-agent: Claude-SearchBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n\nSitemap: ${cfg.baseUrl}/sitemap.xml\n`;
  out['llms.txt'] = `# ${cfg.name}\n\n> ${cfg.entity}\n\n## Solutions\n${C.solutions.map(s => `- [${s.nav}](${cfg.baseUrl}/solutions/${s.slug}/): ${s.description}`).join('\n')}\n\n## Research\n- [Research](${cfg.baseUrl}/research/): ${R.description}\n\n## Insights\n${C.articles.map(a => `- [${a.title}](${cfg.baseUrl}/insights/${a.slug}/): ${a.description}`).join('\n')}\n\n## Company\n- [For experts](${cfg.baseUrl}/experts/): ${E.description}\n- [Partners](${cfg.baseUrl}/partners/): ${P.description}\n- [Request a demo](${cfg.baseUrl}/contact/)\n`;
  out['.nojekyll'] = '';
  out['assets/favicon.svg'] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#0b0b0a"/><circle cx="32" cy="0" r="18" fill="#ff7a1a"/><circle cx="32" cy="0" r="26" fill="none" stroke="#6b675f"/><circle cx="10" cy="22" r="2.5" fill="#f2f0eb"/></svg>`;
  return out;
}
if (typeof module !== 'undefined') module.exports = { build };
