/* UltraEdit project page.
 * Data comes from data/*.js (each sets one key on window.UE), so the page also works from file://.
 * Every section degrades gracefully when its data file is missing. */
(function () {
  "use strict";
  const UE = window.UE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "style" && typeof v === "object") {
        for (const [sk, sv] of Object.entries(v)) if (sk.startsWith("--")) n.style.setProperty(sk, sv); else n.style[sk] = sv;
      }
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else if (k === "html") n.innerHTML = v;
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const c of kids.flat()) if (c != null) n.append(c.nodeType ? c : document.createTextNode(c));
    return n;
  }
  const ICON = {
    play: '<svg class="i-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg class="i-pause" viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    lr: '<svg viewBox="0 0 24 24"><path d="M9 6 3 12l6 6V6zm6 0v12l6-6-6-6z"/></svg>',
  };

  /* ───────────── Edit types ───────────── */
  const TASKS = {
    pose: ["#feb394", "Change how a subject holds its body: sit, stand, lie down."],
    shape: ["#c9bcfe", "Change an object's outline: a new letter, a heart, a fanned tail."],
    action: ["#feb0ae", "Make the subject do something new."],
    gesture: ["#ffa9d3", "Move hands and arms into a new gesture."],
    expression: ["#e0b2ff", "Change a facial expression."],
    move: ["#98cdfe", "Move a subject to a marked point."],
    add: ["#73e1a9", "Add an object that fits into the scene."],
    delete: ["#acc7ff", "Remove an object and fill in what was behind it."],
    swap: ["#7fdce0", "Replace one object with another in the same place."],
    color: ["#f3bd5d", "Recolor an object and keep its shape."],
    material: ["#feb392", "Change what an object is made of."],
    count: ["#feadbe", "Change how many there are."],
    timing: ["#b0c6ff", "Change tempo or rhythm."],
    motion: ["#f9a8d4", "Change how a subject moves over time."],
    state: ["#fde68a", "Change an object's physical state."],
    text: ["#99f6e4", "Rewrite text or symbols in the scene."],
    age: ["#7fe3d2", "Make a subject older or younger."],
    style: ["#d9f99d", "Change the rendering style."],
    interaction: ["#a5f3fc", "Make a subject interact with an object."],
  };
  const taskColor = (t) => (TASKS[t] || ["#dfe3ee"])[0];
  const taskDesc = (t) => (TASKS[t] || ["", ""])[1];

  /* ───────────── Prompt diff (word LCS) ───────────── */
  function diffWords(a, b) {
    const A = (a || "").split(/\s+/).filter(Boolean), B = (b || "").split(/\s+/).filter(Boolean);
    const norm = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}♥'-]/gu, "");
    const n = A.length, m = B.length, L = Array.from({ length: n + 1 }, () => new Int16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
      L[i][j] = norm(A[i]) === norm(B[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const ka = new Array(n).fill(false), kb = new Array(m).fill(false);
    for (let i = 0, j = 0; i < n && j < m;) {
      if (norm(A[i]) === norm(B[j])) { ka[i] = kb[j] = true; i++; j++; }
      else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
    }
    return { a: A.map((w, i) => [w, ka[i]]), b: B.map((w, j) => [w, kb[j]]) };
  }
  function promptNode(words, cls) {
    const p = el("p", { class: "io-text" });
    let run = [];
    const flush = () => { if (run.length) { p.append(el("span", { class: cls }, run.join(" "))); p.append(" "); run = []; } };
    for (const [w, keep] of words) { if (keep) { flush(); p.append(w + " "); } else run.push(w); }
    flush();
    return p;
  }
  function promptCards(src, tar, extra) {
    const d = diffWords(src, tar);
    const out = [];
    if (src) out.push(el("div", { class: "io-card", style: { "--d": 0 } },
      el("p", { class: "io-k" }, el("span", { class: "tag s" }, "SOURCE"), "prompt"), promptNode(d.a, "w-del")));
    if (tar) out.push(el("div", { class: "io-card", style: { "--d": 1 } },
      el("p", { class: "io-k" }, el("span", { class: "tag t" }, "TARGET"), "prompt"), promptNode(d.b, "w-ins")));
    if (extra) out.push(extra);
    return out;
  }

  /* ───────────── Reveal, counters, glow ───────────── */
  const countUp = (n) => {
    const to = parseFloat(n.dataset.count), dec = +(n.dataset.dec || 0);
    if (reduced) { n.textContent = to.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1300;
    const step = (now) => { const k = clamp((now - t0) / dur); n.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(dec); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const revealIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$("[data-count]", e.target).forEach(countUp);
    revealIO.unobserve(e.target);
  }), { rootMargin: "0px 0px -8% 0px" });
  const observeReveals = (root = document) => $$(".reveal:not(.in)", root).forEach((n) => revealIO.observe(n));
  $$(".features .feature").forEach((f, i) => {
    f.style.setProperty("--i", i);
    f.addEventListener("pointermove", (e) => { const r = f.getBoundingClientRect(); f.style.setProperty("--mx", `${e.clientX - r.left}px`); f.style.setProperty("--my", `${e.clientY - r.top}px`); });
  });

  /* ───────────── Media helpers ───────────── */
  function imgEl(src, alt = "", cls, eager) { return el("img", { src, alt, class: cls, loading: eager ? "eager" : "lazy", decoding: "async", draggable: "false" }); }
  function vidEl(src, poster, cls) {
    const v = el("video", { class: cls, muted: true, loop: true, playsinline: true, preload: "metadata", poster, src });
    v.muted = true; v.playsInline = true;
    return v;
  }
  const isVid = (p) => /\.(mp4|webm|mov)$/i.test(p || "");
  // Keep a follower video on its leader's clock by nudging its playback rate; seek only on a large jump.
  // Seeking every few frames makes looping turntables stutter.
  function follow(lead, v) {
    if (v.readyState < 2 || !lead.duration) return;
    let d = v.currentTime - lead.currentTime;
    if (Math.abs(d) > lead.duration / 2) d -= Math.sign(d) * lead.duration;   // across the loop seam
    if (Math.abs(d) > 0.5) { v.currentTime = lead.currentTime; v.playbackRate = 1; }
    else if (Math.abs(d) > 0.03) v.playbackRate = clamp(1 - d * 0.8, 0.85, 1.15);
    else if (v.playbackRate !== 1) v.playbackRate = 1;
  }
  // An item's input: the group source, or the output of the item it was chained from.
  function baseOf(g, it) {
    const prev = it.from && g.items.find((x) => x.id === it.from);
    if (prev) return { src: prev.out, poster: prev.poster, prompt: it.source_prompt || prev.target_prompt, label: prev.label };
    const own = it.source || g.source;   // merged groups: an item may bring its own source clip
    return { src: own.src, poster: own.poster, prompt: it.source_prompt || g.source_prompt, label: null };
  }

  // A group of videos that play in lockstep; the first is the clock.
  const groups = new Set();
  function syncGroup(vids, root) {
    const master = vids[0];
    let raf = 0, userPaused = false, visible = false;
    const tick = () => {
      for (const v of vids.slice(1)) follow(master, v);
      const bar = root && $(".vprog i", root);
      if (bar && master.duration) bar.style.width = `${(master.currentTime / master.duration) * 100}%`;
      raf = requestAnimationFrame(tick);
    };
    const api = {
      play() { vids.forEach((v) => v.play().catch(() => {})); root && root.classList.remove("paused"); cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); },
      pause() { vids.forEach((v) => v.pause()); root && root.classList.add("paused"); cancelAnimationFrame(raf); },
      toggle() { if (master.paused) { userPaused = false; api.play(); } else { userPaused = true; api.pause(); } },
      destroy() { cancelAnimationFrame(raf); io.disconnect(); vids.forEach((v) => { v.pause(); v.removeAttribute("src"); v.load(); }); groups.delete(api); },
    };
    master.addEventListener("seeked", () => vids.slice(1).forEach((v) => { v.currentTime = master.currentTime; }));
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !userPaused && !reduced) api.play(); else api.pause();
    }, { threshold: 0.25 });
    io.observe(root || master);
    if (reduced) root && root.classList.add("paused");
    groups.add(api);
    return api;
  }
  function videoCtl(api) {
    return el("div", { class: "vctl" },
      el("button", { class: "vbtn", "aria-label": "Play or pause", html: ICON.pause + ICON.play, onclick: (e) => { e.stopPropagation(); api.toggle(); } }),
      el("div", { class: "vprog" }, el("i")));
  }

  /* ───────────── Before/after slider (images or videos) ───────────── */
  function makeCompare({ a, b, posterA, posterB, la = "Source", lb = "UltraEdit", ar = 1, marks, hint = true }) {
    const vid = isVid(a) || isVid(b);
    const root = el("div", { class: "cmp", tabindex: 0, role: "slider", "aria-label": `Compare ${la} and ${lb}`, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": 50, style: { "--ar": ar } });
    const A = vid ? vidEl(a, posterA, "a") : imgEl(a, la, "a");
    const B = vid ? vidEl(b, posterB, "b") : imgEl(b, lb, "b");
    root.append(A, B, el("div", { class: "bar" }), el("div", { class: "knob", html: ICON.lr }), el("span", { class: "ctag l" }, la), el("span", { class: "ctag r" }, lb));
    (marks || []).forEach((m) => root.append(el("span", { class: "mark", style: { left: `${m.x * 100}%`, top: `${m.y * 100}%` } }, m.text || "")));
    if (hint) root.append(el("span", { class: "drag-hint" }, "← drag to compare →"));
    let pos = 50, drag = false, anim = 0;
    const set = (p) => { pos = clamp(p, 0, 100); root.style.setProperty("--pos", `${pos}%`); root.setAttribute("aria-valuenow", Math.round(pos));
      $(".ctag.l", root).style.opacity = pos < 12 ? 0 : 1; $(".ctag.r", root).style.opacity = pos > 88 ? 0 : 1; };
    const fromEvent = (e) => { const r = root.getBoundingClientRect(); set(((e.clientX - r.left) / r.width) * 100); };
    const touched = () => { root.classList.add("touched"); cancelAnimationFrame(anim); };
    root.addEventListener("pointerdown", (e) => { if (e.target.closest(".vctl")) return; drag = true; root.setPointerCapture(e.pointerId); touched(); fromEvent(e); });
    root.addEventListener("pointermove", (e) => { if (drag) fromEvent(e); });
    root.addEventListener("pointerup", () => { drag = false; });
    root.addEventListener("pointercancel", () => { drag = false; });
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); touched(); set(pos + (e.key === "ArrowLeft" ? -4 : 4)); }
      if (e.key === " " && api.sync) { e.preventDefault(); api.sync.toggle(); }
    });
    set(50);
    const api = { root, sync: null };
    if (vid) { root.classList.add("is-vid"); api.sync = syncGroup([A, B], root); root.append(videoCtl(api.sync)); }
    // A short sweep the first time it is seen, so visitors know it moves.
    if (!reduced) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting || !root.isConnected) { if (!root.isConnected) io.disconnect(); return; } io.disconnect();
        const t0 = performance.now();
        const step = (now) => { const k = (now - t0) / 1600; if (k >= 1 || root.classList.contains("touched")) { if (k >= 1) set(50); return; }
          set(50 + 26 * Math.sin(k * Math.PI * 2) * (1 - k)); anim = requestAnimationFrame(step); };
        anim = requestAnimationFrame(step);
      }, { threshold: 0.5 });
      io.observe(root);
    }
    return api;
  }

  /* ───────────── Nav ───────────── */
  const nav = $("#nav");
  const navLinks = $$(".nav-links a");
  const sections = navLinks.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  function updateNav(heroDone) {
    nav.classList.toggle("show", heroDone);
    let cur = null;
    for (const s of sections) if (s.getBoundingClientRect().top < 140) cur = s.id;
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${cur}`));
  }

  /* ───────────── Intro ───────────── */
  function initHero() {
    const track = $("#hero-track"), hero = $("#top"), wall = $("#wall");
    const fR = $("#front-region"), fE = $("#front-edit"), shade = $("#shade"), mask = $("#mask"), word = $("#mask-word");
    const intro = $("#hero-intro"), hud = $("#hud"), hudT = $("#hud-t"), cue = $("#cue"), skip = $("#skip"), content = $("#hero-content"), lens = $("#lens-ring");
    const imgs = (UE.hero || []).slice(), avs = (UE.heroAV || []).slice();
    if (!imgs.length) {
      for (const g of UE.galleryImg || []) for (const it of g.items || []) imgs.push({ src: baseOf(g, it).src, out: it.out, task: it.task, label: it.label });
    }
    const byKind = { img: imgs, vid: avs.filter((d) => d.kind === "video"), "3d": avs.filter((d) => d.kind === "3d") };
    let tiles = [], cols = 5, rows = 3, W = innerWidth, pairs = [], heroOn = false;
    imgs.forEach((d) => { const a = new Image(); a.src = d.out; });
    function build() {
      // Columns by kind: three image columns, then one video column and one 3D column (fewer image columns when narrow).
      const portrait = innerHeight > innerWidth * 1.1;
      const nImg = portrait ? 1 : innerWidth < 1100 ? 2 : 3;
      const kinds = [...Array(nImg).fill("img"), "vid", "3d"].map((k) => (byKind[k].length ? k : "img"));
      cols = kinds.length; rows = portrait ? 5 : 3;
      wall.style.setProperty("--cols", cols); wall.style.setProperty("--rows", rows);
      pairs.forEach(([a, b]) => { a.pause(); b.pause(); });
      wall.innerHTML = ""; tiles = []; pairs = [];
      if (!imgs.length) return;
      const next = { img: 0, vid: 0, "3d": 0 };
      for (let i = 0; i < cols * rows; i++) {
        const k = kinds[i % cols], list = byKind[k];
        const d = list[next[k]++ % list.length];
        const mov = isVid(d.src);
        const A = mov ? vidEl(d.src, d.poster_src, "src") : imgEl(d.src, "", "src", true);
        const B = mov ? vidEl(d.out, d.poster_out, "out") : imgEl(d.out, "", "out", true);
        if (mov) { A.preload = B.preload = "auto"; pairs.push([A, B]); }
        const tag = d.kind === "3d" ? "3D · " : d.kind === "video" ? "video · " : "";
        const t = el("div", { class: `tile${mov ? " mov" : ""}`, style: { "--task": taskColor(d.task) } },
          A,
          d.mask ? el("div", { class: "tok", style: { "--mask": `url("${d.mask}")` } }) : null,
          el("div", { class: "grid" }),
          B,
          d.label ? el("span", { class: "tlabel" }, `${tag}${d.task || ""}${d.task ? " · " : ""}${d.label}`) : null);
        wall.append(t);
        tiles.push({ n: t, r: -1, w: -1 });
      }
      measure();
      if (heroOn) pairs.forEach(([a, b]) => { a.play().catch(() => {}); b.play().catch(() => {}); });
    }
    function measure() {
      W = hero.clientWidth;
      for (const t of tiles) { t.x = t.n.offsetLeft; t.wd = t.n.offsetWidth; t.n.style.setProperty("--cell", `${t.wd / 32}px`); }
    }
    let p = 0, mx = 0.5, my = 0.5, hasMouse = false;
    function progress() {
      const r = track.getBoundingClientRect(), travel = track.offsetHeight - innerHeight;
      return travel > 0 ? clamp(-r.top / travel) : 1;
    }
    function paint() {
      p = reduced ? 1 : progress();
      const a = smooth(0.03, 0.12, p);
      intro.style.opacity = 1 - a; intro.style.transform = `translateY(${-a * 30}px)`;
      const er = smooth(0.10, 0.48, p), ee = smooth(0.18, 0.60, p);
      const xr = lerp(-0.04, 1.06, er) * W, xe = lerp(-0.04, 1.06, ee) * W;
      fR.style.transform = `translateX(${xr}px)`; fE.style.transform = `translateX(${xe}px)`;
      fR.style.opacity = xr > 0 && xr < W ? 1 : 0; fE.style.opacity = xe > 0 && xe < W ? 1 : 0;
      fR.classList.toggle("flip", xr > W - 240); fE.classList.toggle("flip", xe > W - 240);
      for (const t of tiles) {
        const r = clamp((xr - t.x) / t.wd), w = clamp((xe - t.x) / t.wd);
        if (Math.abs(r - t.r) > 0.001) { t.n.style.setProperty("--r", r.toFixed(4)); t.r = r; }
        if (Math.abs(w - t.w) > 0.001) { t.n.style.setProperty("--w", w.toFixed(4)); t.w = w; }
        t.n.classList.toggle("done", w >= 1 && p < 0.62);
      }
      hudT.textContent = `t = ${(1 - ee).toFixed(2)}`;
      hud.style.opacity = 1 - smooth(0.58, 0.64, p);
      cue.style.opacity = 1 - smooth(0.0, 0.05, p);
      skip.style.opacity = 1 - smooth(0.7, 0.8, p); skip.style.pointerEvents = p > 0.78 ? "none" : "";
      const sh = 0.5 * (1 - smooth(0.04, 0.12, p)) + 0.92 * smooth(0.60, 0.70, p);
      shade.style.opacity = sh;
      const mIn = smooth(0.60, 0.70, p), mOut = smooth(0.80, 0.87, p);
      const mv = mIn > 0 && mOut < 1;
      mask.style.visibility = mv ? "visible" : "hidden";
      mask.style.opacity = 1 - mOut;
      word.style.transform = `scale(${lerp(1.5, 1, mIn) * lerp(1, 0.9, mOut)})`;
      const lr = mv && hasMouse ? 130 : 0;
      mask.style.setProperty("--lr", `${lr}px`); mask.style.setProperty("--mx", `${mx * 100}%`); mask.style.setProperty("--my", `${my * 100}%`);
      lens.style.opacity = lr ? 1 : 0; lens.style.width = lens.style.height = `${lr * 2}px`;
      lens.style.left = `${mx * 100}%`; lens.style.top = `${my * 100}%`;
      content.classList.toggle("show", p > 0.84);
      updateNav(p >= 0.985 || track.getBoundingClientRect().bottom < 80);
    }
    let queued = false;
    const queue = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; paint(); }); } };
    hero.addEventListener("pointermove", (e) => { if (e.pointerType !== "mouse") return; const r = hero.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; hasMouse = true; queue(); });
    hero.addEventListener("pointerleave", () => { hasMouse = false; queue(); });
    skip.addEventListener("click", (e) => {
      e.preventDefault();
      const top = track.getBoundingClientRect().top + scrollY, travel = track.offsetHeight - innerHeight;
      scrollTo({ top: top + travel * 0.9, behavior: "smooth" });
    });
    addEventListener("scroll", queue, { passive: true });
    let rt = 0;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); queue(); }, 150); });
    build(); paint();
    // Hero videos play while the intro is on screen; each output follows its source's clock.
    new IntersectionObserver(([e]) => {
      heroOn = e.isIntersecting && !reduced;
      pairs.forEach(([a, b]) => { if (heroOn) { a.play().catch(() => {}); b.play().catch(() => {}); } else { a.pause(); b.pause(); } });
    }, { threshold: 0.05 }).observe(hero);
    setInterval(() => { if (heroOn) pairs.forEach(([a, b]) => follow(a, b)); }, 200);
  }

  /* ───────────── 02 Results ───────────── */
  // The paper's comparison figures become one-edit groups whose item carries the baselines.
  function fromComparisons(list, modality) {
    return (list || []).map((c) => {
      const ours = c.methods.find((m) => m.ours) || c.methods[c.methods.length - 1];
      return { id: `cmp_${c.id}`, modality, title: c.title, source_prompt: c.source_prompt,
        source: { src: c.src, poster: c.poster, w: c.w, h: c.h },
        items: [{ id: c.id, task: c.task, label: (c.label || c.title || "").toLowerCase(), target_prompt: c.target_prompt, out: ours.out, poster: ours.poster, w: c.w, h: c.h,
          baselines: c.methods.filter((m) => m !== ours).map(({ name, out, poster }) => ({ name, out, poster })) }] };
    });
  }
  const MOD_INFO = {
    image: ["Image", "FLUX.1-dev", "#c9bcfe", '<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4V5zm2 2v8.6l3.5-3.6 2.5 2.6 3.5-4.1L18 14V7H6zm3 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>'],
    video: ["Video", "Wan2.1", "#feb394", '<svg viewBox="0 0 24 24"><path d="M3 6h13v12H3V6zm14 4 4-2.5v9L17 14v-4zM5 8v8h9V8H5z"/></svg>'],
    audio: ["Audio", "TangoFlux · F5-TTS", "#ffa9d3", '<svg viewBox="0 0 24 24"><path d="M3 10h2v4H3v-4zm4-3h2v10H7V7zm4-4h2v18h-2V3zm4 5h2v8h-2V8zm4 2h2v4h-2v-4z"/></svg>'],
    "3d": ["3D", "TRELLIS", "#98cdfe", '<svg viewBox="0 0 24 24"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 2.3L18.6 8 12 11.7 5.4 8 12 4.3zM5 9.7l6 3.4v6.6l-6-3.4V9.7zm8 10v-6.6l6-3.4v6.6l-6 3.4z"/></svg>'],
  };
  const MOD_NOTE = {
    audio: "The same update runs unchanged on TangoFlux (sound) and F5-TTS (speech), without retraining. Play the source and the edit below.",
    "3d": "The same update runs unchanged on TRELLIS, without retraining. Drag across the turntable to compare.",
  };
  function initGallery() {
    const all = [...(UE.galleryImg || []), ...(UE.galleryAV || []),
      ...fromComparisons(UE.compareImg, "image"), ...fromComparisons(UE.compareVid, "video")];
    const tabOf = (g) => (g.modality === "speech" ? "audio" : g.modality);   // sound and speech share the Audio tab
    const view = $("#g-view"), vs = $("#g-vs"), io = $("#g-io"), thumbs = $("#g-thumbs"), srcBox = $("#g-sources"), modBox = $("#g-mod"), taskBox = $("#g-tasks");
    const code = $("#g-code"), desc = $("#g-desc"), thumbsH = thumbs.previousElementSibling;
    if (!all.length) { view.append(el("div", { class: "empty" }, "Results are being prepared.")); return; }
    const MODS = ["image", "video", "audio", "3d"].filter((m) => all.some((g) => tabOf(g) === m));
    const modNote = el("p", { class: "modnote" });
    modBox.after(modNote);
    const st = { mod: MODS[0], task: "all", g: null, it: null, cmp: null, left: null };
    const groupsOf = (m) => all.filter((g) => tabOf(g) === m);
    const hasTask = (g, t) => t === "all" || g.items.some((i) => i.task === t);

    function renderMods() {
      modBox.innerHTML = "";
      for (const m of MODS) {
        const [name, model, color, icon] = MOD_INFO[m];
        modBox.append(el("button", { class: "modtab", role: "tab", "aria-selected": String(st.mod === m), style: { "--mc": color },
          onclick: () => { if (st.mod === m) return; st.mod = m; st.task = "all"; st.g = groupsOf(m)[0]; st.it = st.g.items[0]; renderAll(); } },
          el("span", { class: "mi", html: icon }),
          el("span", { class: "mt" }, el("b", {}, name), el("small", {}, model))));
      }
      modNote.textContent = MOD_NOTE[st.mod] || "";
      modNote.style.display = MOD_NOTE[st.mod] ? "" : "none";
    }
    function renderTasks() {
      taskBox.innerHTML = "";
      const counts = {};
      for (const g of groupsOf(st.mod)) for (const i of g.items) counts[i.task] = (counts[i.task] || 0) + 1;
      const order = Object.keys(TASKS).filter((t) => counts[t]).concat(Object.keys(counts).filter((t) => !TASKS[t]));
      const mk = (t, label, n) => el("button", { class: "chip", "aria-pressed": String(st.task === t), style: { "--task": t === "all" ? "#dfe3ee" : taskColor(t) },
        onclick: () => {
          st.task = t;
          if (!hasTask(st.g, t)) st.g = groupsOf(st.mod).find((g) => hasTask(g, t));
          st.it = t === "all" ? (st.it && st.g.items.includes(st.it) ? st.it : st.g.items[0]) : st.g.items.find((i) => i.task === t);
          renderAll();
        } }, el("i", { class: "dot" }), label, el("small", {}, n));
      taskBox.append(mk("all", "All", Object.values(counts).reduce((a, b) => a + b, 0)));
      for (const t of order) taskBox.append(mk(t, t, counts[t]));
    }
    function renderSources() {
      srcBox.innerHTML = "";
      // The Audio tab lists sound and speech sources under their own headings.
      const parts = st.mod === "audio" ? [["Sound · TangoFlux", "audio"], ["Speech · F5-TTS", "speech"]] : [[null, null]];
      for (const [head, sub] of parts) {
      const gs = groupsOf(st.mod).filter((g) => !sub || g.modality === sub);
      if (!gs.length) continue;
      if (head) srcBox.append(el("p", { class: "src-sub" }, head));
      for (const g of gs) {
        const thumb = tabOf(g) === "audio" ? g.source.spec : g.source.poster || g.source.src;
        const withB = g.items.some((i) => i.baselines && i.baselines.length);
        srcBox.append(el("button", { class: `srcbtn${hasTask(g, st.task) ? "" : " dimmed"}`, "aria-pressed": String(g === st.g), title: g.title,
          onclick: () => { st.g = g; st.it = g.items.find((i) => st.task === "all" || i.task === st.task) || g.items[0]; renderAll(); } },
          imgEl(isVid(thumb) ? "" : thumb, g.title), el("span", {}, g.title), el("em", {}, g.items.length), withB ? el("i", { class: "vsdot", title: "Compared with other editors" }) : null));
      }
      }
    }
    let lastCode = "";
    function renderCode() {
      const t = st.it.task, word = (t || "edit").toUpperCase();
      code.style.setProperty("--task", taskColor(t));
      if (word !== lastCode) {
        code.innerHTML = "";
        [...word].forEach((ch, i) => code.append(el("span", { class: reduced ? "" : "flip", style: { "--d": i } }, ch)));
        lastCode = word;
      }
      desc.textContent = `${st.it.label ? st.it.label.charAt(0).toUpperCase() + st.it.label.slice(1) + ". " : ""}${taskDesc(t)}`;
    }
    function renderSlider() {
      if (st.cmp && st.cmp.sync) st.cmp.sync.destroy();
      if (curAudio) curAudio();
      view.innerHTML = "";
      const g = st.g, it = st.it, base = baseOf(g, it), L = st.left;
      if (st.mod === "audio") {
        // Audio has no slider: the source and the edit as two playable spectrograms.
        st.cmp = null;
        const src = audioTrack(g.source.src, g.source.spec, g.source.peaks, "Source", null, null, "124,140,255");
        src.classList.add("is-src");
        view.append(el("div", { class: "aview" }, src, el("p", { class: "edits-h" }, "Edited by UltraEdit"),
          audioTrack(it.out, it.spec, it.peaks, it.label || "UltraEdit", it.task, it.note || null, "255,111,174")));
        return;
      }
      const w = it.w || g.source.w || 1, h = it.h || g.source.h || 1;
      st.cmp = makeCompare({ a: L ? L.out : base.src, b: it.out, posterA: L ? L.poster : base.poster, posterB: it.poster,
        la: L ? L.name : base.label ? "Input" : "Source", ar: w / h, marks: L ? null : it.marks });
      view.append(st.cmp.root);
      $$(".vcell", vs).forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.name === (L ? L.name : "Source"))));
    }
    function renderStrip() {
      vs.innerHTML = "";
      const g = st.g, it = st.it, base = baseOf(g, it), bl = it.baselines || [];
      if (!bl.length) return;
      const cell = (name, src, poster, cls, onclick) => el("button", { class: `vcell ${cls || ""}`, "data-name": name, onclick },
        el("span", { class: "vi" }, isVid(src) ? (poster ? imgEl(poster, name) : vidEl(src)) : imgEl(src, name)), el("span", { class: "vn" }, name));
      vs.append(el("p", { class: "vs-h" }, "Same edit by other editors", el("small", {}, " · released settings · click one to compare")));
      const row = el("div", { class: "vs-row", style: { "--n": bl.length + 2, "--ar": (it.w || g.source.w || 1) / (it.h || g.source.h || 1) } });
      row.append(cell(base.label ? "Input" : "Source", base.src, base.poster, "src", () => { st.left = null; renderSlider(); }));
      for (const b of bl) row.append(cell(b.name, b.out, b.poster, "", () => { st.left = b; renderSlider(); }));
      row.append(cell("UltraEdit", it.out, it.poster, "ours", () => { st.left = null; renderSlider(); }));
      vs.append(row);
    }
    function renderStage() {
      io.innerHTML = ""; st.left = null;
      const g = st.g, it = st.it, base = baseOf(g, it);
      renderStrip(); renderSlider();
      const editCard = el("div", { class: "io-card", style: { "--d": 2 } },
        el("p", { class: "io-k" }, "Edit"),
        el("p", { class: "io-text" }, el("b", { style: { color: taskColor(it.task) } }, it.task), " · ", it.label || ""),
        base.label ? el("p", { class: "io-hint", style: { marginTop: "8px" } }, `Edited from the result “${base.label}”.`) : null,
        it.marks && it.marks.length ? el("p", { class: "io-hint", style: { marginTop: "8px" } }, "Numbered marks show where the subject is moved to.") : null,
        it.note ? el("p", { class: "io-hint", style: { marginTop: "8px" } }, it.note.charAt(0).toUpperCase() + it.note.slice(1) + ".") : null);
      io.append(...promptCards(base.prompt, it.target_prompt, editCard));
    }
    function renderThumbs() {
      thumbs.innerHTML = "";
      const many = st.g.items.length > 1;
      thumbs.style.display = thumbsH.style.display = many ? "" : "none";
      if (!many) return;
      for (const it of st.g.items) {
        const wide = st.mod === "audio", im = wide ? it.spec : it.poster || it.out;
        const on = st.task === "all" || it.task === st.task;
        thumbs.append(el("button", { class: `thumb${wide ? " wide" : ""}`, "aria-pressed": String(it === st.it), style: { "--task": taskColor(it.task), opacity: on ? 1 : 0.45 },
          onclick: () => { st.it = it; renderCode(); renderStage(); $$(".thumb", thumbs).forEach((b, i) => b.setAttribute("aria-pressed", String(st.g.items[i] === it))); } },
          el("span", { class: "ti" }, imgEl(im, it.label)), el("span", { class: "tt" }, it.task), el("span", { class: "tl" }, it.label || "")));
      }
    }
    function renderAll() { renderMods(); renderTasks(); renderSources(); renderCode(); renderStage(); renderThumbs(); }
    st.g = groupsOf(st.mod)[0]; st.it = st.g.items[0];
    renderAll();
  }

  let lb = null, lbIn = null;   // lightbox (set up near the end)
  /* ───────────── 03 Trajectory ───────────── */
  const PHASE = {
    layout: ["Layout · the region expands", "Tokens in μ started from pure noise, and the target's clean estimate already shows the new layout. Tokens the target attends to join μ and start editing at the next step."],
    expand: ["Layout · the region expands", "Tokens in μ started from pure noise, and the target's clean estimate already shows the new layout. Tokens the target attends to join μ and start editing at the next step."],
    anchor: ["Scaling back the edit where the copies agree", "μ is now fixed. Where the source and target clean estimates agree, the accumulated edit is scaled most of the way back toward the source."],
    detail: ["Detail", "The rest of the image has joined at its later start time. The remaining steps refine texture while the shared keys and values keep the source's appearance."],
  };
  const PH_COLOR = { layout: "#b56cff", expand: "#b56cff", anchor: "#7c8cff", detail: "#ff6fae" };
  function initTraj() {
    const box = $("#traj");
    // The eagle shows the region growing best (35% → 66%), so it opens first.
    const list = (UE.traj || []).slice().sort((a, b) => (b.id === "eagle") - (a.id === "eagle"));
    if (!list.length) { box.append(el("div", { class: "empty" }, "Trajectory frames are being prepared.")); return; }
    if (list.every((e) => e.strip && e.strip.length)) { trajStrip(box, list); return; }
    let cur = null, k = 0, playing = false, timer = 0, showMu = true;
    const viewImg = imgEl("", "Target clean estimate"), muImg = imgEl("", "", "mu");
    const badge = el("span", { class: "tbadge" });
    const view = el("div", { class: "traj-view show-mu" }, viewImg, muImg, badge);
    const pick = el("div", { class: "traj-pick" });
    const range = el("input", { type: "range", min: 0, max: 1, value: 0, step: 1, "aria-label": "Sampling step" });
    const playBtn = el("button", { class: "vbtn", "aria-label": "Play", html: ICON.pause + ICON.play, style: { background: "rgba(255,255,255,.1)" } });
    const phaseBar = el("div", { class: "phase-bar" });
    const phase = el("div", { class: "traj-phase" }, el("h4"), el("p"));
    const muT = el("label", { class: "toggle" }, el("input", { type: "checkbox", checked: true, onchange: (e) => { showMu = e.target.checked; view.classList.toggle("show-mu", showMu); } }), "Show region μ");
    const endpoints = el("div", { class: "three" });
    box.append(view, el("div", { class: "traj-side" }, pick, el("div", { class: "traj-ctl paused" }, playBtn, range), phaseBar, muT, phase, endpoints));
    const ctlWrap = playBtn.parentElement;
    function show(i) {
      k = clamp(i, 0, cur.steps.length - 1); range.value = k;
      const s = cur.steps[k];
      viewImg.src = s.x0; if (s.mu) muImg.src = s.mu; muImg.style.display = s.mu ? "" : "none";
      badge.textContent = `step ${k + 1} / ${cur.steps.length} · t = ${(+s.t).toFixed(2)}`;
      const [h, p] = PHASE[s.phase] || [s.phase || "", ""];
      $("h4", phase).textContent = h; $("h4", phase).style.color = PH_COLOR[s.phase] || ""; $("p", phase).textContent = p;
    }
    function load(entry) {
      cur = entry; stop();
      $$("button", pick).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === entry.id)));
      range.max = entry.steps.length - 1;
      entry.steps.forEach((s) => { const a = new Image(); a.src = s.x0; if (s.mu) { const b = new Image(); b.src = s.mu; } });
      view.style.setProperty("--ar", entry.w && entry.h ? entry.w / entry.h : 1);
      phaseBar.innerHTML = "";
      const n = entry.steps.length;
      const grp = (ph) => (ph === "expand" ? "layout" : ph);
      const SHORT = { layout: "layout", anchor: "scale back", detail: "detail" };
      let start = 0;
      for (let i = 1; i <= n; i++) {
        if (i === n || grp(entry.steps[i].phase) !== grp(entry.steps[start].phase)) {
          const ph = grp(entry.steps[start].phase), wd = (i - start) / n;
          phaseBar.append(el("span", { style: { left: `${(start / n) * 100}%`, width: `calc(${wd * 100}% - 3px)`, background: PH_COLOR[ph] || "#4a5164" } }));
          if (wd >= 0.12) phaseBar.append(el("em", { style: { left: `${(start / n) * 100}%` } }, SHORT[ph] || ph));
          start = i;
        }
      }
      endpoints.innerHTML = "";
      endpoints.append(
        el("div", { class: "tc" }, el("div", { class: "tv" }, imgEl(entry.src, "Source")), el("p", { class: "tl" }, el("span", { class: "tt", style: { "--task": "#b9c2ff" } }, "source"))),
        el("div", { class: "tc" }, el("div", { class: "tv" }, imgEl(entry.out, "Output")), el("p", { class: "tl" }, el("span", { class: "tt", style: { "--task": "#ffb3d3" } }, "output"))));
      show(0);
      const pc = promptCards(entry.source_prompt, entry.target_prompt);
      $$(".io-card", box).forEach((n) => n.remove());
      endpoints.after(...pc);
    }
    function stop() { playing = false; clearInterval(timer); ctlWrap.classList.add("paused"); }
    function play() {
      if (k >= cur.steps.length - 1) show(0);
      playing = true; ctlWrap.classList.remove("paused");
      timer = setInterval(() => { if (k >= cur.steps.length - 1) { stop(); return; } show(k + 1); }, 520);
    }
    playBtn.addEventListener("click", () => (playing ? stop() : play()));
    range.addEventListener("input", () => { stop(); show(+range.value); });
    for (const e of list) pick.append(el("button", { class: "chip", "data-id": e.id, style: { "--task": "#c9bcfe" }, onclick: () => load(e) }, el("i", { class: "dot" }), e.title || e.id));
    if (list.length < 2) pick.style.display = "none";
    load(list[0]);
    // Play once when it first scrolls into view; stop when it leaves.
    let autoplayed = reduced;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !autoplayed) { autoplayed = true; setTimeout(play, 400); }
      else if (!e.isIntersecting && playing) stop();
    }, { threshold: 0.6 }).observe(view);
  }

  // fig:attn layout: probes, a few steps (t_r marked), output; each step = big |D| tile + small x̂ / |D| tiles.
  function trajStrip(box, list) {
    box.classList.add("is-strip");
    const pick = el("div", { class: "traj-pick" });
    const prompts = el("div", { class: "cmp-prompt", style: { marginTop: "0" } });
    const strip = el("div", { class: "tstrip" });
    const legend = el("div", { class: "tlegend" });
    const play = el("button", { class: "chip", "aria-label": "Play the steps" }, el("i", { class: "dot" }), "Play the steps");
    box.append(el("div", { class: "tstrip-head" }, pick, play), prompts, el("div", { class: "tstrip-scroll" }, strip), legend);
    let timer = 0;
    function open(panel) {
      lbIn.innerHTML = ""; lbIn.style.width = "min(980px, 100%)";
      lbIn.append(panel.key === "out"
        ? el("div", { class: "lb-panel two" }, imgEl(panel.big, "output", null, true), imgEl(panel.bot, "change", null, true))
        : el("div", { class: "lb-panel" }, imgEl(panel.big, panel.label, null, true),
            el("div", { class: "lb-small" }, panel.top ? imgEl(panel.top, "x̂ tar", null, true) : null, panel.bot ? imgEl(panel.bot, "|D|", null, true) : null)),
        el("p", { class: "lb-cap" }, panel.key === "out" ? "output · change" : panel.label));
      lb.classList.add("open"); $("#lb-close").focus();
    }
    function load(entry) {
      clearInterval(timer); play.classList.remove("on");
      $$("button", pick).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.id === entry.id)));
      prompts.innerHTML = ""; prompts.append(...promptCards(entry.source_prompt, entry.target_prompt));
      strip.innerHTML = "";
      strip.style.setProperty("--n", entry.strip.length + (entry.strip.some((p) => p.key === "out") ? 1 : 0));
      entry.strip.forEach((pnl, i) => {
        const out = pnl.key === "out";
        // The output column is two large tiles, output and change, as in the paper.
        const body = out
          ? el("span", { class: "tp-body two" }, el("span", { class: "tp-big" }, imgEl(pnl.big, "output")), el("span", { class: "tp-big" }, imgEl(pnl.bot, "change")))
          : el("span", { class: "tp-body" }, el("span", { class: "tp-big" }, imgEl(pnl.big, pnl.label)),
              pnl.top || pnl.bot ? el("span", { class: "tp-small" }, el("span", {}, pnl.top ? imgEl(pnl.top, "") : null), el("span", {}, pnl.bot ? imgEl(pnl.bot, "") : null)) : null);
        const fig = el("button", { class: `tp${pnl.tr ? " tr" : ""}${out ? " out" : ""}`, style: { "--i": i }, "aria-label": `${pnl.label}: enlarge`, onclick: () => open(pnl) },
          el("span", { class: "tp-l" }, pnl.tr ? el("b", {}, "t", el("sub", {}, "r"), " · ") : null, pnl.label,
            out && pnl.label2 ? el("span", { class: "tp-l2" }, pnl.label2) : null),
          body);
        strip.append(fig);
      });
      legend.innerHTML = "";
      const lgd = entry.legend && entry.legend.png;
      if (lgd) legend.append(imgEl(lgd, "Legend: attention 0 to 0.22, |D| and change 0 to max, μ₀ (probes) dashed, μ after the step solid, scaled back at t_r hatched; small tiles: target estimate (top), |D| (bottom)"));
      else legend.append(el("span", {}, el("i", { class: "lg dash" }), "μ₀ (probes)"), el("span", {}, el("i", { class: "lg solid" }), "μ after the step"),
        el("span", {}, el("i", { class: "lg hatch" }), "scaled back at t", el("sub", {}, "r")), el("span", {}, "small tiles: x̂", el("sup", {}, "tar"), " (top), |D| (bottom)"));
      strip.classList.remove("shown"); void strip.offsetWidth; strip.classList.add("shown");
    }
    play.addEventListener("click", () => {
      const tps = $$(".tp", strip);
      if (play.classList.toggle("on")) {
        let k = 0;
        const step = () => { tps.forEach((t, i) => t.classList.toggle("now", i === k)); k = (k + 1) % (tps.length + 1); if (k === 0) { clearInterval(timer); play.classList.remove("on"); setTimeout(() => tps.forEach((t) => t.classList.remove("now")), 700); } };
        step(); timer = setInterval(step, 800);
      } else { clearInterval(timer); tps.forEach((t) => t.classList.remove("now")); }
    });
    for (const e of list) pick.append(el("button", { class: "chip", "data-id": e.id, style: { "--task": "#c9bcfe" }, onclick: () => load(e) }, el("i", { class: "dot" }), e.title || e.id));
    if (list.length < 2) pick.style.visibility = "hidden";
    load(list[0]);
  }

  function initMethod3d() {
    const f = $("#method3d");
    if (!f) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { f.src = f.dataset.src; io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(f);
  }

  function initEquations() {
    const go = () => {
      if (!window.katex) return;
      const tex1 = String.raw`Z_t^{\mathrm{src}}=\textcolor{#b56cff}{\mu}\odot Z_t^{\mathrm{src,fw}}+(1-\textcolor{#b56cff}{\mu})\odot\big[(1-t)\,X^{\mathrm{src}}+t\,\varepsilon_t\big],\qquad Z_t^{\mathrm{tar}}=Z_t^{\mathrm{src}}+D_t`;
      const tex2 = String.raw`D_{t'}=\mathbf{1}[t\le\textcolor{#ff6fae}{\tau}]\odot\Big\{\textcolor{#b56cff}{\mu}\odot\big(a_tD_t+b_t\,\textcolor{#7c8cff}{\Delta\hat x_t}\big)+(1-\textcolor{#b56cff}{\mu})\odot\Big[\tfrac{t'}{t}D_t+\big(1-\tfrac{t'}{t}\big)\textcolor{#7c8cff}{\Delta\hat x_t}\Big]\Big\}`;
      for (const [id, tex] of [["eq-1", tex1], ["eq-2", tex2]]) {
        const n = $(`#${id}`);
        try { katex.render(tex, n, { displayMode: true, throwOnError: true }); n.classList.remove("fallback"); } catch (e) { /* keep the plain-text fallback */ }
      }
      $$(".tex").forEach((n) => { try { katex.render(n.dataset.tex, n, { throwOnError: true }); } catch (e) { /* keep text */ } });
    };
    if (window.katex) go(); else addEventListener("load", go);
  }

  /* ───────────── Results charts (numbers from the paper's tables) ───────────── */
  const IMG_METHODS = [["RF-Solver-Edit", 60], ["FireFlow", 18], ["FlowEdit", 48], ["Sync-SDE", 48], ["SAM-Flow", 852], ["UltraEdit", 38]];
  const IMG_DATA = {
    SPRITE: {
      "Edit · Qwen": [["48.7", "43.8", "50.1", "40.5", "38.9", "78.0"], "%"],
      "Edit · GPT-5.5": [["44.0", "38.1", "44.2", "31.2", "30.3", "69.0"], "%"],
      "Edit · Opus 5": [["43.8", "38.7", "45.0", "33.6", "33.4", "73.7"], "%"],
      "Comp.": [["37.1", "32.5", "41.2", "21.3", "27.8", "52.7"], "%"],
      "Id.": [["39.9", "35.8", "42.2", "32.7", "32.7", "61.8"], "%"],
      "BG": [["11.59", "10.45", "11.13", "11.23", "12.69", "18.19"], "dB"],
    },
    "PIE-Bench": {
      "VQA": [["64.1", "63.4", "59.4", "52.7", "44.5", "70.0"], "%"],
      "Edit · GPT-5.5": [["54.9", "52.0", "46.6", "38.4", "21.0", "65.6"], "%"],
      "Edit · Opus 5": [["61.3", "58.6", "52.0", "45.9", "26.6", "72.9"], "%"],
      "BG": [["12.65", "12.18", "11.09", "10.81", "8.86", "14.72"], "dB"],
    },
  };
  const IMG_NOTE = {
    "Edit · Qwen": "Edit success judged by Qwen2.5-VL.", "Edit · GPT-5.5": "Edit success judged by GPT-5.5.", "Edit · Opus 5": "Edit success judged by Opus 5.",
    "Comp.": "Successful edits that keep the identity without artifacts.", "Id.": "Identity preservation.", "BG": "Background preservation (PSNR, dB).",
    "VQA": "Edit success judged by VQA.",
  };
  const VID_DATA = {
    "FiVE-Bench": { n: 419, rows: [["FiVE-Acc", "46.97", "53.05", "%", 100], ["GPT-5.5", "42.00", "56.32", "%", 100], ["Opus 5", "54.65", "67.78", "%", 100], ["CLIP (edited region)", "21.23", "21.60", "×100", 30], ["BG", "10.77", "14.43", "dB", 20]] },
    "NRVBench": { n: 180, rows: [["NRVE-Acc", "34.55", "34.63", "%", 100], ["GPT-5.5", "11.67", "41.11", "%", 100], ["Opus 5", "21.67", "48.89", "%", 100], ["Instruction score", "65.18", "73.43", "/100", 100], ["BG", "3.77", "10.62", "dB", 20]] },
    "IVEBench motion": { n: 59, rows: [["Action success", "4.5", "34.5", "%", 100], ["GPT-5.5", "7.9", "35.6", "%", 100], ["Opus 5", "9.0", "54.8", "%", 100], ["Instruction following", "1.61", "2.31", "/4", 4], ["BG", "2.33", "7.87", "dB", 20]] },
  };
  const tip = $("#tip");
  function showTip(e, html) { tip.innerHTML = html; tip.classList.add("show"); moveTip(e); }
  function moveTip(e) { const x = Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 8); tip.style.left = `${x}px`; tip.style.top = `${e.clientY + 14}px`; }
  function hideTip() { tip.classList.remove("show"); }
  function bar(label, txt, unit, max, ours, tipHtml) {
    const v = parseFloat(txt);
    const f = el("span", { class: "bf" });
    const row = el("div", { class: `brow${ours ? " ours" : ""}`, tabindex: 0, "aria-label": `${label}: ${v}${unit === "%" ? "%" : " " + unit}` },
      el("span", { class: "bl" }, label), el("span", { class: "bt" }, f), el("span", { class: "bv" }, txt));
    row.addEventListener("pointerenter", (e) => showTip(e, tipHtml)); row.addEventListener("pointermove", moveTip); row.addEventListener("pointerleave", hideTip);
    row.addEventListener("focus", () => { const r = row.getBoundingClientRect(); showTip({ clientX: r.left + 120, clientY: r.bottom - 6 }, tipHtml); });
    row.addEventListener("blur", hideTip);
    requestAnimationFrame(() => requestAnimationFrame(() => { f.style.width = `${clamp(v / max) * 100}%`; }));
    return row;
  }
  function initCharts() {
    const segB = $("#chart-img-m"), bars = $("#chart-img-bars"), note = $("#chart-img-note");
    let bench = "SPRITE", metric = "Edit · Qwen";
    const benchSeg = el("div", { class: "seg", role: "group", "aria-label": "Benchmark" }), metricSeg = el("div", { class: "seg", role: "group", "aria-label": "Metric" });
    segB.replaceWith(el("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" } }, benchSeg, metricSeg));
    function draw() {
      benchSeg.innerHTML = ""; metricSeg.innerHTML = "";
      for (const b of Object.keys(IMG_DATA)) benchSeg.append(el("button", { "aria-pressed": String(b === bench), onclick: () => { bench = b; if (!IMG_DATA[b][metric]) metric = Object.keys(IMG_DATA[b])[0]; draw(); } }, b));
      for (const m of Object.keys(IMG_DATA[bench])) metricSeg.append(el("button", { "aria-pressed": String(m === metric), onclick: () => { metric = m; draw(); } }, m));
      const [vals, unit] = IMG_DATA[bench][metric];
      const max = unit === "%" ? 100 : 20;
      bars.innerHTML = "";
      IMG_METHODS.forEach(([name, nfe], i) => bars.append(bar(name, vals[i], unit, max, name === "UltraEdit",
        `<b>${name}</b> · ${vals[i]}${unit === "%" ? "%" : " dB"}<small>${bench} · ${metric} · ${nfe} NFE</small>`)));
      const n = bench === "SPRITE" ? (metric === "Comp." || metric === "Id." ? "461 edits that keep their subject" : "491 edits")
        : (metric === "BG" ? "404 local edits" : "700 edits");
      note.textContent = `${IMG_NOTE[metric] || ""} Over ${n}.`;
    }
    draw();
    const vSeg = $("#chart-vid-m"), vBars = $("#chart-vid-bars"), vNote = $("#chart-vid-note");
    let vb = "FiVE-Bench";
    function drawV() {
      vSeg.innerHTML = "";
      for (const b of Object.keys(VID_DATA)) vSeg.append(el("button", { "aria-pressed": String(b === vb), onclick: () => { vb = b; drawV(); } }, b));
      vBars.innerHTML = "";
      for (const [name, a, b, unit, max] of VID_DATA[vb].rows) {
        vBars.append(el("p", { class: "ctl-label", style: { margin: "10px 0 2px", textTransform: "none", letterSpacing: ".06em" } }, `${name} (${unit === "/100" ? "0–100" : unit === "/4" ? "1–4" : unit})`));
        vBars.append(bar("Wan-Edit", a, unit, max, false, `<b>Wan-Edit</b> · ${a}<small>${vb} · ${name} · 140 NFE</small>`));
        vBars.append(bar("UltraEdit", b, unit, max, true, `<b>UltraEdit</b> · ${b}<small>${vb} · ${name} · 76 NFE</small>`));
      }
      vNote.textContent = `${VID_DATA[vb].n} edits.`;
    }
    drawV();
  }

  /* ───────────── 05 SPRITE ───────────── */
  const SPRITE = [
    ["S", "Shape", "shape", "Outlines and forms: a fanned tail, a bent stem, a new letter.", [["shape", 71, 63.4, 15.5]]],
    ["P", "Pose", "pose", "Human and animal bodies: stand up, lie down, hands on hips.", [["human pose", 89, 89.9, 68.5], ["animal pose", 78, 80.8, 61.5]]],
    ["R", "Rigid control", "move", "Add, remove, swap or move rigid objects.", [["rigid", 92, 89.1, 65.2]]],
    ["I", "Interaction", "interaction", "A subject acting on an object: hold, carry, catch.", [["interaction", 77, 74.0, 48.1]]],
    ["T", "sTate", "state", "Physical state: emptied, spilled, cracked, melted.", [["state", 54, 63.0, 16.7]]],
    ["E", "Expression", "expression", "Faces: smile, yawn, surprise.", [["expression", 30, 73.3, 66.7]]],
  ];
  const SPRITE_TASKS = { S: ["shape"], P: ["pose", "gesture"], R: ["move", "add", "delete", "swap"], I: ["interaction", "action"], T: ["state"], E: ["expression"] };
  function initSprite() {
    const box = $("#sprite-grid");
    const items = [];
    for (const g of [...(UE.galleryImg || [])]) for (const it of g.items) items.push({ g, it });
    const picks = Object.fromEntries((UE.sprite || []).map((x) => [x.letter, x]));
    for (const [L, name, task, desc, rows] of SPRITE) {
      let pair = picks[L] ? { src: picks[L].src, out: picks[L].out } : null;
      if (!pair) { const ex = items.find(({ it }) => SPRITE_TASKS[L].includes(it.task)); if (ex) pair = { src: baseOf(ex.g, ex.it).src, out: ex.it.out }; }
      const card = el("article", { class: "sp reveal", style: { "--task": taskColor(task) } },
        pair ? imgEl(pair.src, "", "s") : null, pair ? imgEl(pair.out, "", "o") : null,
        el("p", { class: "L" }, L), el("h4", {}, name), el("p", {}, desc));
      for (const [lab, n, ours, fe] of rows) {
        card.append(el("div", { style: { marginTop: "10px" } },
          el("p", { style: { margin: "0 0 4px", font: "500 10.5px var(--mono)", color: "#aab0c0", letterSpacing: ".06em" } }, `${lab} · ${n} edits`),
          miniBar("UltraEdit", ours, true), miniBar("FlowEdit", fe, false)));
      }
      box.append(card);
    }
  }
  function miniBar(name, v, ours) {
    return el("div", { style: { display: "grid", gridTemplateColumns: "62px 1fr 34px", gap: "6px", alignItems: "center", marginTop: "3px", fontSize: "11px", color: ours ? "#eef1f8" : "#959db2", fontWeight: ours ? 700 : 500 } },
      el("span", {}, name),
      el("span", { style: { height: "6px", borderRadius: "0 3px 3px 0", width: `${v}%`, background: ours ? "var(--grad)" : "#4a5164" } }),
      el("span", { style: { fontFamily: "var(--mono)", textAlign: "right" } }, v.toFixed(1)));
  }

  /* ───────────── Audio tracks (Results › Audio) ───────────── */
  let curAudio = null;
  function audioTrack(src, spec, peaks, label, task, text, accent) {
    const a = new Audio(); a.preload = "none"; a.src = src;
    const ph = el("span", { class: "ph" });
    const sp = el("div", { class: "spec", style: spec ? { backgroundImage: `url("${spec}")` } : {} }, ph);
    if (!spec && peaks && peaks.length) {
      const c = el("canvas", { width: 400, height: 54 }); sp.prepend(c);
      const x = c.getContext("2d"); x.fillStyle = `rgb(${accent})`;
      peaks.forEach((v, i) => { const h = Math.max(1, v * 50); x.fillRect((i / peaks.length) * 400, 27 - h / 2, Math.max(1, 400 / peaks.length - 1), h); });
    }
    const tr = el("div", { class: "atrack", style: { "--accent": accent, "--task": taskColor(task) } },
      el("button", { class: "play", "aria-label": `Play ${label}`, html: ICON.play + ICON.pause }),
      el("div", { class: "aw" }, el("p", { class: "al" }, el("b", {}, label), task ? el("span", { class: "tt" }, task) : null), sp, text ? el("p", { class: "atext" }, text) : null));
    let raf = 0;
    const loop = () => { if (a.duration) ph.style.left = `${(a.currentTime / a.duration) * 100}%`; raf = requestAnimationFrame(loop); };
    const stop = () => { a.pause(); tr.classList.remove("playing"); cancelAnimationFrame(raf); };
    a.addEventListener("ended", stop);
    $(".play", tr).addEventListener("click", () => {
      if (!a.paused) { stop(); return; }
      if (curAudio && curAudio !== stop) curAudio();
      curAudio = stop; a.play().catch(() => {}); tr.classList.add("playing"); raf = requestAnimationFrame(loop);
    });
    sp.addEventListener("click", (e) => {
      const r = sp.getBoundingClientRect(), f = (e.clientX - r.left) / r.width;
      const seek = () => { a.currentTime = f * a.duration; };
      if (a.duration) seek(); else a.addEventListener("loadedmetadata", seek, { once: true });
      if (a.paused) $(".play", tr).click();
    });
    return tr;
  }
  /* ───────────── BibTeX, lightbox ───────────── */
  $("#bib-copy").addEventListener("click", async (e) => {
    const t = $("#bib-text").textContent;
    try { await navigator.clipboard.writeText(t); } catch (_) {
      const r = document.createRange(); r.selectNodeContents($("#bib-text")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand("copy");
    }
    e.target.textContent = "Copied"; setTimeout(() => { e.target.textContent = "Copy"; }, 1600);
  });
  lb = $("#lb"); lbIn = $("#lb-in");
  const closeLb = () => { lb.classList.remove("open"); lbIn.innerHTML = ""; };
  $("#lb-close").addEventListener("click", closeLb);
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeLb();
  });
  const fig = $("#fig-coupling");
  if (fig) { fig.style.cursor = "zoom-in"; fig.addEventListener("click", () => { lbIn.innerHTML = ""; lbIn.style.width = "min(1400px, 100%)"; lbIn.append(el("div", { style: { background: "#fff", borderRadius: "14px", padding: "16px" } }, imgEl($("img", fig).src, "Adaptive coupling"))); lb.classList.add("open"); $("#lb-close").focus(); }); }
  $("#fig-coupling img").addEventListener("error", () => { fig.style.display = "none"; fig.nextElementSibling.style.display = "none"; });

  /* ───────────── Boot ───────────── */
  const safe = (f) => { try { f(); } catch (err) { console.error(err); } };
  safe(initHero); safe(initGallery); safe(initTraj); safe(initMethod3d); safe(initEquations);
  safe(initCharts); safe(initSprite);
  observeReveals();
})();
