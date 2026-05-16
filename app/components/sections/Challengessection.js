"use client";

import { useRef, useEffect } from "react";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const CHALLENGES = [
  {
    number: "01",
    delay: 0,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Long Daily Commutes",
    desc: "Early mornings, traffic, and exhausting travel routines affect both students and parents.",
  },
  {
    number: "02",
    delay: 120,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Academic Pressure & Anxiety",
    desc: "Many children struggle in rigid systems that focus only on memorization and grades.",
  },
  {
    number: "03",
    delay: 240,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Lack of Flexibility",
    desc: "Traditional schools often cannot support athletes, performers, travelers, or unique learning styles.",
  },
  {
    number: "04",
    delay: 360,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    title: "Bullying & Social Stress",
    desc: "Many families seek a safer and more positive learning environment for their children.",
  },
  {
    number: "05",
    delay: 480,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "High Private School Fees",
    desc: "Families want world-class education without excessive costs.",
  },
];

const PROGRESS_BARS = [
  { label: "Parent Dissatisfaction Rate", pct: 73 },
  { label: "Students Seeking Flexibility", pct: 68 },
  { label: "Families Reporting Burnout",  pct: 61 },
  { label: "Cost Concerns Among Parents", pct: 79 },
];

/* ─────────────────────────────────────────────────────────
   ANIMATION HELPERS  (pure vanilla JS, no GSAP)
───────────────────────────────────────────────────────── */

/** Ease-out cubic */
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

/** Animate a numeric counter with ease-out */
function animateCounter(el, from, to, duration, suffix = "") {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(from + (to - from) * easeOutCubic(progress)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/** Build & run the floating dots canvas — pauses when off-screen */
function initCanvas(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext("2d");
  let dots = [];
  let rafId = null;
  let isVisible = false;

  function resize() {
    const section = canvas.closest(".chs-section") || canvas.parentElement;
    canvas.width  = section ? section.offsetWidth  : window.innerWidth;
    canvas.height = section ? section.offsetHeight : window.innerHeight;
    buildDots();
  }

  function buildDots() {
    const W = canvas.width, H = canvas.height;
    const count = Math.max(20, Math.floor((W * H) / 16000));
    dots = Array.from({ length: count }, () => ({
      x:         Math.random() * W,
      y:         Math.random() * H,
      r:         1.2 + Math.random() * 2.2,
      vx:        (Math.random() - 0.5) * 0.3,
      vy:        (Math.random() - 0.5) * 0.3,
      baseAlpha: 0.06 + Math.random() * 0.14,
      phase:     Math.random() * Math.PI * 2,
      speed:     0.003 + Math.random() * 0.005,
    }));
  }

  function drawCrosses(W, H) {
    const markers = [
      [W * 0.96, H * 0.16], [W * 0.04, H * 0.82],
      [W * 0.50, H * 0.07], [W * 0.76, H * 0.55],
      [W * 0.23, H * 0.92], [W * 0.88, H * 0.70],
    ];
    ctx.strokeStyle = "rgba(37,99,235,0.12)";
    ctx.lineWidth   = 1.4;
    ctx.lineCap     = "round";
    markers.forEach(([cx, cy]) => {
      ctx.beginPath(); ctx.moveTo(cx, cy - 7); ctx.lineTo(cx, cy + 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 7, cy); ctx.lineTo(cx + 7, cy); ctx.stroke();
    });
  }

  function drawDiamonds(W, H) {
    const pts = [[W * 0.91, H * 0.22], [W * 0.07, H * 0.67], [W * 0.42, H * 0.93]];
    ctx.strokeStyle = "rgba(37,99,235,0.08)";
    ctx.lineWidth   = 1;
    pts.forEach(([cx, cy]) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      ctx.strokeRect(-7, -7, 14, 14);
      ctx.restore();
    });
  }

  function tick() {
    if (!isVisible) return;
    const W = canvas.width, H = canvas.height;
    const now = performance.now();
    ctx.clearRect(0, 0, W, H);

    dots.forEach(d => {
      d.x = ((d.x + d.vx) + W) % W;
      d.y = ((d.y + d.vy) + H) % H;
      const alpha = d.baseAlpha * (0.5 + 0.5 * Math.sin(now * d.speed + d.phase));
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37,99,235,${alpha.toFixed(3)})`;
      ctx.fill();
    });

    drawCrosses(W, H);
    drawDiamonds(W, H);

    rafId = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (!isVisible) return;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);

  // Only animate when visible in viewport
  const visObs = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible) startLoop();
    else cancelAnimationFrame(rafId);
  }, { threshold: 0 });
  visObs.observe(canvas);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    visObs.disconnect();
  };
}

/** Create a single IntersectionObserver, returns disconnect fn */
function observe(targets, callback, options = {}) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) callback(entry, obs); });
  }, { threshold: 0.2, rootMargin: "0px 0px -40px 0px", ...options });
  (Array.isArray(targets) ? targets : [targets]).forEach(el => el && obs.observe(el));
  return () => obs.disconnect();
}

/* ─────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────── */
export default function ChallengesSection() {
  /* Refs */
  const sectionRef  = useRef(null);
  const canvasRef   = useRef(null);
  const tagRef      = useRef(null);
  const head1Ref    = useRef(null);
  const head2Ref    = useRef(null);
  const lineRef     = useRef(null);
  const subRef      = useRef(null);
  const counterRef  = useRef(null);
  const accentRef   = useRef(null);
  const quoteRef    = useRef(null);
  const progressRef = useRef(null);
  const cardsRef    = useRef([]);
  const statBoxRefs = useRef([]);
  const fillRefs    = useRef([]);

  useEffect(() => {
    /* respect prefers-reduced-motion */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Canvas ── */
    const stopCanvas = initCanvas(canvasRef.current);

    const cleanups = [stopCanvas];

    if (reduced) {
      /* Reveal everything instantly */
      [tagRef, head1Ref, head2Ref, lineRef, subRef, accentRef, quoteRef, progressRef]
        .forEach(r => r.current?.classList.add("chs-show"));
      cardsRef.current.forEach(c => c?.classList.add("chs-show"));
      statBoxRefs.current.forEach(b => b?.classList.add("chs-show"));
      fillRefs.current.forEach((f, i) => {
        if (f) f.style.width = PROGRESS_BARS[i].pct + "%";
      });
      if (counterRef.current) counterRef.current.textContent = "73%";
      return () => cleanups.forEach(fn => fn?.());
    }

    /* ── Heading block (tag → h1 → h2 → line → sub) stagger ── */
    const headEls = [tagRef, head1Ref, head2Ref, lineRef, subRef].map(r => r.current);
    cleanups.push(
      observe(headEls[0], (_, obs) => {
        headEls.forEach((el, i) => {
          if (!el) return;
          setTimeout(() => el.classList.add("chs-show"), i * 110);
        });
        obs.unobserve(headEls[0]);
      }, { threshold: 0.3 })
    );

    /* ── Accent card ── */
    cleanups.push(
      observe(accentRef.current, (entry, obs) => {
        entry.target.classList.add("chs-show");
        /* Counter inside it */
        if (counterRef.current) animateCounter(counterRef.current, 0, 73, 1800, "%");
        obs.unobserve(entry.target);
      }, { threshold: 0.25 })
    );

    /* ── Challenge cards (staggered) ── */
    cardsRef.current.forEach((card) => {
      if (!card) return;
      cleanups.push(
        observe(card, (entry, obs) => {
          const delay = parseInt(card.dataset.delay ?? "0", 10);
          setTimeout(() => entry.target.classList.add("chs-show"), delay);
          obs.unobserve(entry.target);
        }, { threshold: 0.12, rootMargin: "0px 0px -20px 0px" })
      );
    });

    /* ── Stat boxes (staggered) ── */
    statBoxRefs.current.forEach((box, i) => {
      if (!box) return;
      cleanups.push(
        observe(box, (entry, obs) => {
          setTimeout(() => entry.target.classList.add("chs-show"), i * 130);
          obs.unobserve(entry.target);
        }, { threshold: 0.2 })
      );
    });

    /* ── Progress bars ── */
    cleanups.push(
      observe(progressRef.current, (entry, obs) => {
        entry.target.classList.add("chs-show");
        fillRefs.current.forEach((fill, i) => {
          if (!fill) return;
          setTimeout(() => { fill.style.width = PROGRESS_BARS[i].pct + "%"; }, 300 + i * 120);
        });
        obs.unobserve(entry.target);
      }, { threshold: 0.2 })
    );

    /* ── Quote card ── */
    cleanups.push(
      observe(quoteRef.current, (entry, obs) => {
        entry.target.classList.add("chs-show");
        obs.unobserve(entry.target);
      }, { threshold: 0.2 })
    );

    /* ── Card hover: icon spring ── */
    const hoverCleanups = [];
    cardsRef.current.forEach(card => {
      if (!card) return;
      const icon = card.querySelector(".chs-icon");

      const onEnter = () => {
        if (icon) {
          icon.style.transition = "transform .35s cubic-bezier(.34,1.56,.64,1)";
          icon.style.transform  = "scale(1.12) rotate(-6deg)";
        }
      };
      const onLeave = () => {
        if (icon) {
          icon.style.transition = "transform .45s ease";
          icon.style.transform  = "scale(1) rotate(0deg)";
        }
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      hoverCleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach(fn => fn?.());
      hoverCleanups.forEach(fn => fn());
    };
  }, []);

  return (
    <>
      <style>{`

        /* ── Section shell ── */
        .chs-section {
          width: 100%;
          background: #ffffff;
          padding: 40px 24px 96px;
          overflow: hidden;
          position: relative;
          font-family: var(--font-dm), sans-serif;
        }

        /* ── Canvas background ── */
        .chs-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .chs-inner {
          position: relative;
          z-index: 1;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* ── Shared reveal base ── */
        .chs-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity .65s ease, transform .65s ease;
        }
        .chs-reveal.chs-show {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Tag ── */
        .chs-tag-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 22px;
        }
        .chs-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,.08);
          border: 1px solid rgba(239,68,68,.2);
          border-radius: 99px;
          padding: 5px 15px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #dc2626;
          opacity: 0;
          transform: translateY(14px) scale(.88);
          transition: opacity .55s, transform .55s;
        }
        .chs-tag.chs-show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .chs-tag-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef4444;
          animation: chsPulse 2.2s ease-in-out infinite;
        }
        @keyframes chsPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .3; transform: scale(.6); }
        }

        /* ── Headings ── */
        .chs-text-center { text-align: center; }

        .chs-head1 {
          font-family: var(--font-dm), sans-serif;
          font-size: clamp(1.45rem, 3.2vw, 2.3rem);
          font-weight: 700;
          color: #0f172a;
          line-height: 1.18;
          margin: 0 0 6px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .chs-head1.chs-show { opacity: 1; transform: translateY(0); }

        .chs-head2 {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(1.9rem, 4.8vw, 3.75rem);
          font-weight: 700;
          line-height: 1.08;
          margin: 0 0 18px;
          color: #1d4ed8;
          opacity: 0;
          transform: translateY(32px) skewY(1.2deg);
          transition: opacity .75s ease, transform .75s ease;
        }
        .chs-head2.chs-show { opacity: 1; transform: translateY(0) skewY(0); }

        .chs-line-wrap {
          margin-bottom: 18px;
          display: flex;
          justify-content: center;
        }
        .chs-line {
          display: block;
          width: 64px;
          height: 3px;
          border-radius: 99px;
          background: #2563eb;
          transform: scaleX(0);
          transform-origin: left;
          opacity: 0;
          transition: transform .55s ease, opacity .55s ease;
        }
        .chs-line.chs-show { transform: scaleX(1); opacity: 1; }

        .chs-sub {
          font-size: clamp(.88rem, 1.5vw, 1rem);
          color: #64748b;
          line-height: 1.65;
          max-width: 540px;
          margin: 0 auto 60px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .chs-sub.chs-show { opacity: 1; transform: translateY(0); }

        /* ── Layout ── */
        .chs-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px 56px;
          align-items: start;
        }
        .chs-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
        }
        .chs-right {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Vertical track */
        .chs-track {
          position: absolute;
          left: 27px;
          top: 28px;
          bottom: 28px;
          width: 2px;
          background: rgba(37,99,235,.1);
          border-radius: 99px;
          z-index: 0;
        }

        /* ── Challenge cards ── */
        .chs-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: #ffffff;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 22px;
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 18px rgba(15,23,42,.06), 0 1px 4px rgba(37,99,235,.04);
          cursor: default;
          margin-bottom: 16px;
          opacity: 0;
          transform: translateX(-40px) scale(.96);
          transition:
            opacity .65s ease,
            transform .65s ease,
            border-color .25s,
            box-shadow .3s;
        }
        .chs-item:last-child { margin-bottom: 0; }
        .chs-item.chs-show   { opacity: 1; transform: translateX(0) scale(1); }
        .chs-item:hover       {
          border-color: rgba(37,99,235,.28);
          box-shadow: 0 20px 52px rgba(37,99,235,.14), 0 4px 16px rgba(37,99,235,.08);
          transform: translateY(-6px) !important;
        }
        .chs-item::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #2563eb;
          border-radius: 18px 0 0 18px;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform .35s ease;
        }
        .chs-item:hover::before { transform: scaleY(1); }

        .chs-icon {
          width: 52px; height: 52px;
          background: rgba(37,99,235,.08);
          border: 1px solid rgba(37,99,235,.14);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2563eb;
          flex-shrink: 0;
        }
        .chs-content { flex: 1; min-width: 0; }
        .chs-item-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 6px;
          line-height: 1.3;
        }
        .chs-item-desc {
          font-size: .875rem;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        .chs-num {
          position: absolute;
          top: 12px; right: 16px;
          font-family: var(--font-cormorant), serif;
          font-size: 3.2rem;
          font-weight: 700;
          color: rgba(37,99,235,.07);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: color .3s;
        }
        .chs-item:hover .chs-num { color: rgba(37,99,235,.18); }

        /* ── Accent card ── */
        .chs-accent-card {
          background: #1d4ed8;
          border-radius: 22px;
          padding: 36px 32px;
          color: #fff;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .chs-accent-card.chs-show { opacity: 1; transform: translateY(0); }

        /* Decorative circles */
        .chs-accent-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,.07);
        }
        .chs-accent-card::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -30px;
          width: 140px; height: 140px;
          border-radius: 50%;
          background: rgba(255,255,255,.05);
        }

        /* Animated rings */
        .chs-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.1);
          animation: chsRing 4s ease-in-out infinite;
          pointer-events: none;
        }
        .chs-ring-1 { width: 180px; height: 180px; top: 50%; right: -20px; transform: translateY(-50%); }
        .chs-ring-2 { width: 120px; height: 120px; top: 50%; right: 20px;  transform: translateY(-50%); animation-delay: .8s; }
        @keyframes chsRing {
          0%,100% { opacity: .5; }
          50%      { opacity: 1;  }
        }

        .chs-accent-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,255,255,.65);
          margin: 0 0 14px;
        }
        .chs-accent-stat {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(3rem, 5vw, 4.5rem);
          font-weight: 700;
          line-height: 1;
          color: #fff;
          margin: 0 0 8px;
          position: relative;
          z-index: 1;
        }
        .chs-accent-stat span {
          font-family: var(--font-dm), sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255,255,255,.7);
          display: block;
          margin-top: 6px;
        }
        .chs-accent-body {
          font-size: .9rem;
          color: rgba(255,255,255,.75);
          line-height: 1.6;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* ── Stat boxes ── */
        .chs-stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .chs-stat-box {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px 18px;
          text-align: center;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .6s ease, transform .6s ease, box-shadow .3s;
        }
        .chs-stat-box.chs-show { opacity: 1; transform: translateY(0); }
        .chs-stat-box:hover    { box-shadow: 0 8px 24px rgba(37,99,235,.1); transform: translateY(-4px) !important; }
        .chs-stat-val {
          font-family: var(--font-cormorant), serif;
          font-size: 2.4rem;
          font-weight: 700;
          color: #2563eb;
          line-height: 1;
          margin: 0 0 4px;
        }
        .chs-stat-lbl {
          font-size: .78rem;
          color: #64748b;
          font-weight: 500;
          line-height: 1.4;
          margin: 0;
        }

        /* ── Progress bar section ── */
        .chs-progress-section {
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 18px;
          padding: 24px 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .chs-progress-section.chs-show { opacity: 1; transform: translateY(0); }
        .chs-progress-section-title {
          font-size: .78rem;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #64748b;
          margin: 0 0 4px;
        }
        .chs-prog-row { display: flex; flex-direction: column; gap: 5px; }
        .chs-prog-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chs-prog-name { font-size: .8rem; font-weight: 600; color: #0f172a; }
        .chs-prog-pct  { font-size: .8rem; font-weight: 700; color: #2563eb; }
        .chs-prog-track {
          height: 6px;
          background: #dbeafe;
          border-radius: 99px;
          overflow: hidden;
        }
        .chs-prog-fill {
          height: 100%;
          background: #2563eb;
          border-radius: 99px;
          width: 0;
          transition: width 1.4s cubic-bezier(.16,1,.3,1);
        }

        /* ── Quote card ── */
        .chs-quote-card {
          background: #eff6ff;
          border: 1.5px solid rgba(37,99,235,.14);
          border-radius: 18px;
          padding: 24px 22px;
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .chs-quote-card.chs-show { opacity: 1; transform: translateY(0); }
        .chs-quote-mark {
          font-family: var(--font-cormorant), serif;
          font-size: 5rem;
          color: rgba(37,99,235,.15);
          line-height: .6;
          margin-bottom: 8px;
          display: block;
        }
        .chs-quote-text {
          font-family: var(--font-cormorant), serif;
          font-size: 1.18rem;
          font-style: italic;
          color: #1e3a8a;
          line-height: 1.55;
          margin: 0 0 14px;
        }
        .chs-quote-author {
          font-size: .8rem;
          font-weight: 600;
          color: #2563eb;
          letter-spacing: .04em;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .chs-body { grid-template-columns: 1fr; gap: 40px; }
          .chs-right {
            position: static;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
          }
          .chs-accent-card    { grid-column: 1 / -1; }
          .chs-quote-card     { grid-column: 1 / -1; }
          .chs-progress-section { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .chs-section        { padding: 56px 16px 68px; }
          .chs-sub            { margin-bottom: 40px; }
          .chs-right          { grid-template-columns: 1fr; }
          .chs-stats-row      { grid-template-columns: 1fr 1fr; }
          .chs-text-center    { text-align: left; }
          .chs-line           { margin: 0; }
          .chs-tag-wrap       { justify-content: flex-start; }
          .chs-line-wrap      { justify-content: flex-start; }
          .chs-sub            { margin-left: 0; text-align: left; }
          .chs-item           { padding: 18px 16px; }
          .chs-icon           { width: 44px; height: 44px; border-radius: 12px; }
        }
        @media (max-width: 400px) {
          .chs-stats-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <section ref={sectionRef} className="chs-section" aria-labelledby="chs-heading">

        {/* Animated canvas background */}
        <canvas ref={canvasRef} className="chs-canvas" aria-hidden="true" />

        <div className="chs-inner">

          {/* ── Heading block ── */}
          <div className="chs-text-center">
            <div className="chs-tag-wrap">
              <span ref={tagRef} className="chs-tag">
                <span className="chs-tag-dot" />
                Why Families Choose Us
              </span>
            </div>

            <h2 ref={head1Ref} className="chs-head1" id="chs-heading">
              Traditional School Challenges
            </h2>
            <h2 ref={head2Ref} className="chs-head2">
              European Parents Face
            </h2>

            <div className="chs-line-wrap">
              <span ref={lineRef} className="chs-line" />
            </div>

            <p ref={subRef} className="chs-sub">
              Thousands of families across Europe are discovering that the traditional schooling
              model no longer meets the needs of modern family life.
            </p>
          </div>

          {/* ── Body ── */}
          <div className="chs-body">

            {/* LEFT — stacked challenge cards */}
            <div className="chs-left">
              <div className="chs-track" aria-hidden="true" />

              {CHALLENGES.map((c, i) => (
                <div
                  key={c.title}
                  className="chs-item"
                  data-delay={c.delay}
                  ref={el => (cardsRef.current[i] = el)}
                >
                  <div className="chs-icon">{c.icon}</div>
                  <div className="chs-content">
                    <h3 className="chs-item-title">{c.title}</h3>
                    <p className="chs-item-desc">{c.desc}</p>
                  </div>
                  <span className="chs-num" aria-hidden="true">{c.number}</span>
                </div>
              ))}
            </div>

            {/* RIGHT — accent panel */}
            <div className="chs-right">

              {/* Big stat card */}
              <div ref={accentRef} className="chs-accent-card">
                <div className="chs-ring chs-ring-1" aria-hidden="true" />
                <div className="chs-ring chs-ring-2" aria-hidden="true" />
                <p className="chs-accent-label">European Families Affected</p>
                <p className="chs-accent-stat">
                  <span ref={counterRef} aria-live="polite">0%</span>
                  <span>of parents report dissatisfaction with traditional schooling</span>
                </p>
                <p className="chs-accent-body">
                  Rigid schedules, high costs, and a one-size-fits-all approach leave millions
                  of children behind every year.
                </p>
              </div>

              {/* Mini stat boxes */}
              <div className="chs-stats-row">
                {[
                  { val: "500+", lbl: "Courses available for KG–12" },
                  { val: "600+", lbl: "Certified international teachers" },
                ].map((s, i) => (
                  <div
                    key={s.val}
                    className="chs-stat-box"
                    ref={el => (statBoxRefs.current[i] = el)}
                  >
                    <p className="chs-stat-val">{s.val}</p>
                    <p className="chs-stat-lbl">{s.lbl}</p>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div ref={progressRef} className="chs-progress-section">
                <p className="chs-progress-section-title">Key Statistics</p>
                {PROGRESS_BARS.map((bar, i) => (
                  <div key={bar.label} className="chs-prog-row">
                    <div className="chs-prog-meta">
                      <span className="chs-prog-name">{bar.label}</span>
                      <span className="chs-prog-pct">{bar.pct}%</span>
                    </div>
                    <div className="chs-prog-track">
                      <div
                        className="chs-prog-fill"
                        ref={el => (fillRefs.current[i] = el)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              

            </div>
          </div>
        </div>
      </section>
    </>
  );
}