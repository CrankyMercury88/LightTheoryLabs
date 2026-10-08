/* Light Theory Labs — motion. Progressive: all content is in the HTML; this only animates it. */
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');
  const onReady = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();

  /* ---- Reveal on scroll ---- */
  function reveals() {
    const sel = '.sechead, .intro > *, .card, .step, .stat, .faq details, .rows > div, .table, .panel, .article-body > *, .pagehead .wrap > *';
    const els = Array.from(document.querySelectorAll(sel));
    els.forEach(el => {
      el.classList.add('reveal');
      const sibs = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
      const i = sibs.indexOf(el);
      el.style.transitionDelay = Math.min(i, 8) * 90 + 'ms';
    });
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-in')); return; }
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < vh * 1.1 && r.bottom > 0) el.classList.add('is-in'); });
    setTimeout(() => els.forEach(el => el.classList.add('is-in')), 1800);
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(el => io.observe(el));
  }

  /* ---- Count up: <b data-count> with text like "26.8%" or "1,069" ---- */
  function counters() {
    const els = document.querySelectorAll('.stat b');
    if (!els.length) return;
    const run = el => {
      const raw = el.textContent.trim();
      const m = raw.match(/^([^0-9]*)([0-9][0-9.,]*)(.*)$/);
      if (!m) return;
      const [, pre, numStr, post] = m;
      const target = parseFloat(numStr.replace(/,/g, ''));
      const decimals = (numStr.split('.')[1] || '').length;
      const useComma = numStr.includes(',');
      const dur = 1800, t0 = performance.now();
      const fmt = v => { let s = v.toFixed(decimals); if (useComma) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); return pre + s + post; };
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * e);
        if (p < 1) requestAnimationFrame(tick); else el.textContent = raw;
      };
      el.textContent = fmt(0);
      requestAnimationFrame(tick);
    };
    if (reduce) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }), { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  }

  /* ---- Hero: slow vertical curtains of light with pointer lensing (smoothed by CSS blur) ---- */
  function water() {
    const heroEl = document.querySelector('.hero');
    const canvas = heroEl && heroEl.querySelector('canvas.hero-water');
    if (!canvas || reduce) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const SCALE = 6;
    let W = 0, H = 0, img, p, running = false, raf = 0, mx = .5, my = .5, tx = .5, ty = .5;
    function resize() {
      const r = heroEl.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return;
      W = Math.ceil(r.width / SCALE); H = Math.ceil(r.height / SCALE);
      canvas.width = W; canvas.height = H; img = ctx.createImageData(W, H); p = img.data;
    }
    const t0 = performance.now();
    function frame(now) {
      if (!img) { resize(); if (!img) { if (running) raf = requestAnimationFrame(frame); return; } }
      const T = (now - t0) / 1000;
      mx += (tx - mx) * .04; my += (ty - my) * .04;
      for (let j = 0; j < H; j++) {
        const v = j / H, env = 1 - v * .5;
        for (let i = 0; i < W; i++) {
          const u = i / W, dx = u - mx, dy = v - my, d2 = dx * dx + dy * dy;
          const lens = Math.exp(-d2 / (2 * .09 * .09)) * .06;
          const uu = u + (dx > 0 ? lens : -lens) + Math.sin(v * 4 + T * .25) * .01;
          const c1 = .5 + .5 * Math.sin(uu * 9.5 + T * .18), c2 = .5 + .5 * Math.sin(uu * 21 - T * .11 + 1.7), c3 = .5 + .5 * Math.sin(uu * 4.3 + T * .06 + 4.1);
          const L = Math.pow(c1 * .55 + c2 * .3 + c3 * .15, 3) * env * 165 + Math.exp(-d2 / (2 * .16 * .16)) * 22;
          const o = (j * W + i) * 4;
          p[o] = Math.min(255, 11 + L); p[o + 1] = Math.min(255, 11 + L * .62); p[o + 2] = Math.min(255, 10 + L * .3); p[o + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
      if (running) raf = requestAnimationFrame(frame);
    }
    heroEl.addEventListener('pointermove', ev => { const r = heroEl.getBoundingClientRect(); tx = (ev.clientX - r.left) / r.width; ty = (ev.clientY - r.top) / r.height; });
    heroEl.addEventListener('pointerleave', () => { tx = .5; ty = .5; });
    const startLoop = () => { if (!running) { running = true; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    new IntersectionObserver(es => es.forEach(x => x.isIntersecting ? startLoop() : stop())).observe(heroEl);
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : startLoop());
    if ('ResizeObserver' in window) new ResizeObserver(() => resize()).observe(heroEl);
    window.addEventListener('resize', resize);
    resize();
  }

  /* ---- Interactivity: playhead progress, pointer highlight on cards, hover-open nav, step focus ---- */
  function interactions() {
    const bar = document.createElement('div'); bar.className = 'playhead'; document.body.appendChild(bar);
    const onScroll = () => { const d = document.documentElement; const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight); bar.style.transform = 'scaleX(' + p + ')'; };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    document.querySelectorAll('.nav-links > details').forEach(d => {
      let t; d.addEventListener('pointerenter', () => { clearTimeout(t); d.open = true; });
      d.addEventListener('pointerleave', () => { t = setTimeout(() => d.open = false, 180); });
    });
    document.addEventListener('click', e => { document.querySelectorAll('.nav details[open]').forEach(d => { if (!d.contains(e.target)) d.open = false; }); });
  }

  /* ---- Solution visuals: sticky step graphic, worked judgment, dimension tabs ---- */
  function scrolly() {
    document.querySelectorAll('.scrolly').forEach(root => {
      const steps = Array.from(root.querySelectorAll('.scrolly-step'));
      const frames = Array.from(root.querySelectorAll('.scrolly-fig .scrolly-frame'));
      const fig = root.querySelector('.scrolly-fig'), cap = root.querySelector('.scrolly-cap'), count = root.querySelector('.scrolly-count');
      const prev = root.querySelector('.scrolly-prev'), next = root.querySelector('.scrolly-next');
      if (!frames.length) return;
      let cur = null, lock = 0;
      const set = i => {
        if (i === cur) return;
        cur = i;
        steps.forEach((s, k) => s.classList.toggle('on', k === i));
        frames.forEach((f, k) => f.classList.toggle('on', k === i));
        if (prev) prev.disabled = i <= 0;
        if (next) next.disabled = i >= steps.length - 1;
        if (i < 0) return;
        if (cap) cap.textContent = frames[i].dataset.cap || '';
        if (count) count.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(frames.length).padStart(2, '0');
      };
      const line = () => window.innerHeight * 0.45;
      const pick = () => {
        if (Date.now() < lock) return;
        if (root.getBoundingClientRect().top > window.innerHeight * 0.85) { set(-1); return; }
        let i = 0;
        steps.forEach((s, k) => { if (s.getBoundingClientRect().top <= line()) i = k; });
        set(i);
      };
      let raf = 0;
      const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; pick(); }); };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      ['wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, e => { if (ev !== 'keydown' || /^(Arrow|Page|Home|End| )/.test(e.key)) { if (!e.target.closest || !e.target.closest('.scrolly')) lock = 0; } }, { passive: true }));
      const go = i => {
        i = Math.max(0, Math.min(steps.length - 1, i));
        set(i);
        if (getComputedStyle(fig).display === 'none') return;
        const y = steps[i].getBoundingClientRect().top + window.scrollY - line() + 2;
        lock = Date.now() + 1000;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      };
      steps.forEach((s, k) => {
        s.tabIndex = 0;
        s.setAttribute('role', 'button');
        s.setAttribute('aria-label', 'Show step ' + (k + 1));
        s.addEventListener('click', () => go(k));
        s.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(k); }
          else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const j = Math.max(0, Math.min(steps.length - 1, k + (e.key === 'ArrowDown' ? 1 : -1))); go(j); steps[j].focus({ preventScroll: true }); }
        });
      });
      if (prev) prev.addEventListener('click', () => go((cur < 0 ? 0 : cur) - 1));
      if (next) next.addEventListener('click', () => go((cur < 0 ? 0 : cur) + 1));
      pick();
    });
  }
  function judgments() {
    const els = document.querySelectorAll('.judgment');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-on')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-on'); io.unobserve(e.target); } }), { threshold: .35 });
    els.forEach(el => io.observe(el));
  }
  function dimtabs() {
    document.querySelectorAll('.dimtabs').forEach(root => {
      const inputs = Array.from(root.querySelectorAll(':scope > input'));
      const panels = Array.from(root.querySelectorAll('.dimtabs-panel'));
      const sync = () => { const i = inputs.findIndex(x => x.checked); panels.forEach((p, k) => p.classList.toggle('on', k === i)); };
      let auto = !reduce, t = 0, visible = false;
      const stopAuto = () => { auto = false; clearInterval(t); root.classList.remove('is-auto'); };
      inputs.forEach(x => x.addEventListener('change', () => { stopAuto(); sync(); }));
      const tick = () => { const i = inputs.findIndex(x => x.checked); inputs[(i + 1) % inputs.length].checked = true; sync(); };
      if (!('IntersectionObserver' in window)) return;
      panels.forEach(p => p.classList.remove('on'));
      new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && !visible) { visible = true; sync(); if (auto) { root.classList.add('is-auto'); t = setInterval(tick, 5000); } }
        else if (!e.isIntersecting && visible) { visible = false; clearInterval(t); root.classList.remove('is-auto'); panels.forEach(p => p.classList.remove('on')); }
      }), { threshold: .35 }).observe(root);
    });
  }

  /* ---- Hero: rotating accent word ---- */
  function rotor() {
    document.querySelectorAll('.rotor[data-words]').forEach(el => {
      const words = el.dataset.words.split('|');
      if (words.length < 2 || reduce) return;
      el.textContent = '';
      const ws = words.map((w, k) => { const s = document.createElement('span'); s.className = 'rotor-w' + (k ? '' : ' on'); s.textContent = w; if (k) s.setAttribute('aria-hidden', 'true'); el.appendChild(s); return s; });
      let i = 0;
      const fit = () => { el.style.width = ws[i].offsetWidth + 'px'; };
      fit(); if (document.fonts) document.fonts.ready.then(fit);
      window.addEventListener('resize', fit);
      const next = () => {
        if (document.hidden) return;
        const prev = ws[i]; i = (i + 1) % ws.length;
        prev.classList.replace('on', 'out');
        ws[i].classList.add('on');
        fit();
        setTimeout(() => { prev.classList.add('reset'); prev.classList.remove('out'); void prev.offsetWidth; prev.classList.remove('reset'); }, 800);
      };
      setTimeout(() => setInterval(next, 2600), 1800);
    });
  }

  function requestForms() {
    document.querySelectorAll('form[data-request]').forEach(f => {
      if (!/^https?:/.test(f.action)) return;
      const status = f.querySelector('.form-status');
      f.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = f.querySelector('button[type=submit]');
        btn.disabled = true; btn.textContent = 'Sending…';
        try {
          const r = await fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
          if (!r.ok) throw 0;
          status.textContent = 'Thanks. We\'ll reply within one business day to confirm a time.';
          status.hidden = false; f.classList.add('is-sent');
        } catch (_) {
          btn.disabled = false; btn.textContent = 'Send request';
          status.textContent = 'That didn\'t send. Email us instead.'; status.hidden = false;
        }
      });
    });
  }

  function fxOnView() {
    const els = document.querySelectorAll('[data-fx]');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('on')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { threshold: .3 });
    els.forEach(el => io.observe(el));
  }

  onReady(() => { requestForms(); fxOnView(); reveals(); counters(); water(); interactions(); scrolly(); judgments(); dimtabs(); rotor(); });
})();
