"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Live Group Classes",
    desc:  "Real instruction, real-time feedback, and continuous support.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    title: "International Teachers",
    desc:  "600+ trained teachers support multilingual learners with confidence.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
    title: "International Curriculum",
    desc:  "KG–12 curriculum offering 500+ courses.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: "Personalized Learning",
    desc:  "Choose what works best for your child.",
  },
];

export default function WhyChooseSection() {
  const sectionRef = useRef(null);
  const head1Ref   = useRef(null);
  const head2Ref   = useRef(null);
  const subRef     = useRef(null);
  const lineRef    = useRef(null);
  const cardsRef   = useRef([]);
  const ctaRef     = useRef(null);
  const bgSvgRef   = useRef(null);
  const orb1Ref    = useRef(null);
  const orb2Ref    = useRef(null);
  const orb3Ref    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      if (bgSvgRef.current) {
        const bgEls = bgSvgRef.current.querySelectorAll("circle, polygon, path, rect, line");
        gsap.fromTo(bgEls,
          { opacity: 0 },
          { opacity: 1, duration: 1.8, stagger: 0.04, ease: "power1.inOut", delay: 0.3 }
        );

        const dashedPaths = bgSvgRef.current.querySelectorAll("path[stroke-dasharray]");
        gsap.to(dashedPaths, {
          strokeDashoffset: -30,
          duration: 8,
          ease: "none",
          repeat: -1,
          stagger: 0.5,
        });

   
        const smallDots = bgSvgRef.current.querySelectorAll('circle[r="1.5"]');
        gsap.to(smallDots, {
          opacity: 0.15,
          scale: 0.7,
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { amount: 1.5, from: "random" },
          transformOrigin: "center center",
        });
      }


      gsap.to(orb1Ref.current, { y: -30, x: 20, duration: 7,  ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(orb2Ref.current, { y:  25, x: -15, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5 });
      gsap.to(orb3Ref.current, { y: -20,          duration: 11,ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3 });

      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      headTl
        .fromTo(head1Ref.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0,  duration: 0.75 })
        .fromTo(head2Ref.current,
          { opacity: 0, y: 40, skewY: 1.5 },
          { opacity: 1, y: 0,  skewY: 0, duration: 0.8 }, "-=0.5")
        .fromTo(lineRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, ease: "power2.inOut" }, "-=0.25")
        .fromTo(subRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0,  duration: 0.65 }, "-=0.35");

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 56, scale: 0.93, rotateX: 6 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 0.7, stagger: 0.14, ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 84%",
            once: true,
          },
        }
      );

      cardsRef.current.forEach((card) => {
        if (!card) return;

        const icon = card.querySelector(".wcs-card-icon");

        const onMove = (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
          const y = ((e.clientY - r.top)  / r.height - 0.5) * -16;
          gsap.to(card, {
            rotateX: y, rotateY: x, scale: 1.038,
            boxShadow: "0 24px 56px rgba(37,99,235,.16), 0 4px 16px rgba(37,99,235,.08)",
            duration: 0.3, ease: "power2.out", transformPerspective: 900,
          });
          if (icon) gsap.to(icon, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: "power2.out" });
        };

        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0, rotateY: 0, scale: 1,
            boxShadow: "0 4px 24px rgba(15,23,42,.07), 0 1px 4px rgba(37,99,235,.06)",
            duration: 0.55, ease: "power3.out",
          });
          if (icon) gsap.to(icon, { x: 0, y: 0, duration: 0.55, ease: "power3.out" });
        };

        card.addEventListener("mousemove",  onMove);
        card.addEventListener("mouseleave", onLeave);
        card._cleanup = () => {
          card.removeEventListener("mousemove",  onMove);
          card.removeEventListener("mouseleave", onLeave);
        };
      });

   
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 28, scale: 0.88 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%", once: true },
        }
      );


      const btn = ctaRef.current?.querySelector("a");
      if (btn) {
        gsap.to(btn, {
          boxShadow: "0 0 0 12px rgba(37,99,235,0)",
          repeat: -1, duration: 1.8, ease: "power1.inOut", yoyo: true, delay: 1.2,
        });
      }

    }, sectionRef);

    return () => {
      cardsRef.current.forEach(c => c?._cleanup?.());
      ctx.revert();
    };
  }, []);

  return (
    <>
      <style>{`

        .wcs-section {
          width: 100%;
          background: linear-gradient(160deg, #f0f4f8 0%, #e8eef5 40%, #edf2f7 100%);
          padding: 88px 24px 96px;
          overflow: hidden;
          position: relative;
          font-family: var(--font-dm), sans-serif;
        }

        /* ── SVG bg layer ── */
        .wcs-bg-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* ── Floating orbs ── */
        .wcs-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .wcs-orb-1 { width: 420px; height: 420px; background: rgba(37,99,235,.07);  top: -120px;  right: -100px; }
        .wcs-orb-2 { width: 320px; height: 320px; background: rgba(99,102,241,.06); bottom: -80px; left: -80px; }
        .wcs-orb-3 { width: 200px; height: 200px; background: rgba(59,130,246,.05); top: 40%;     left: 50%; transform: translateX(-50%); }

        .wcs-inner {
          position: relative;
          z-index: 1;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* ── Tag ── */
        .wcs-tag-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }
        .wcs-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(37,99,235,.1);
          border: 1px solid rgba(37,99,235,.22);
          border-radius: 99px;
          padding: 6px 16px;
          font-family: var(--font-dm), sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #1d4ed8;
          opacity: 0;
        }
        .wcs-tag-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #2563eb;
          animation: tagPulse 2s ease-in-out infinite;
        }
        @keyframes tagPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: .35; transform: scale(.65); }
        }

        /* ── Headings ── */
        .wcs-text-center { text-align: center; }
        .wcs-head1 {
          font-family: var(--font-dm), sans-serif;
          font-size: clamp(1.5rem, 3.5vw, 2.4rem);
          font-weight: 700;
          color: #0f172a;
          line-height: 1.18;
          margin: 0 0 6px;
          opacity: 0;
        }
        .wcs-head2 {
          font-family: var(--font-cormorant), Georgia, serif;
          font-size: clamp(2rem, 5vw, 3.9rem);
          font-weight: 700;
          line-height: 1.08;
          margin: 0 0 18px;
          background: linear-gradient(120deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
        }

        /* Decorative underline */
        .wcs-line-wrap {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }
        .wcs-line {
          display: block;
          width: 72px;
          height: 3px;
          border-radius: 99px;
          background: linear-gradient(90deg, #2563eb, #60a5fa);
          transform-origin: left;
          opacity: 0;
        }

        /* ── Sub text ── */
        .wcs-sub {
          font-family: var(--font-dm), sans-serif;
          font-size: clamp(.88rem, 1.5vw, 1.02rem);
          color: #475569;
          line-height: 1.65;
          max-width: 560px;
          margin: 0 auto 56px;
          opacity: 0;
        }

        /* ── Cards grid ── */
        .wcs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          margin-bottom: 52px;
        }
        @media(max-width: 900px) { .wcs-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width: 500px) { .wcs-grid { grid-template-columns: 1fr; } }

        .wcs-card {
          background: rgba(255,255,255,.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(203,213,225,.7);
          border-radius: 20px;
          padding: 30px 24px 26px;
          text-align: left;
          cursor: default;
          transform-style: preserve-3d;
          box-shadow: 0 4px 24px rgba(15,23,42,.07), 0 1px 4px rgba(37,99,235,.06);
          transition: border-color .25s;
          opacity: 0;
          position: relative;
          overflow: hidden;
        }

        /* Gradient overlay on hover */
        .wcs-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(37,99,235,.05) 0%, transparent 55%);
          opacity: 0;
          transition: opacity .3s;
          border-radius: inherit;
        }
        .wcs-card:hover::before { opacity: 1; }
        .wcs-card:hover { border-color: rgba(37,99,235,.32); }

        /* Top shimmer line */
        .wcs-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(37,99,235,.4), transparent);
          border-radius: 20px 20px 0 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .45s ease;
        }
        .wcs-card:hover::after { transform: scaleX(1); }

        .wcs-card-icon {
          width: 54px; height: 54px;
          background: linear-gradient(135deg, rgba(37,99,235,.12), rgba(99,102,241,.07));
          border: 1px solid rgba(37,99,235,.16);
          border-radius: 15px;
          display: flex; align-items: center; justify-content: center;
          color: #2563eb;
          margin-bottom: 18px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .wcs-card-title {
          font-family: var(--font-dm), sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #2563eb;
          margin: 0 0 10px;
          letter-spacing: -.01em;
          position: relative;
          z-index: 1;
        }
        .wcs-card-desc {
          font-family: var(--font-dm), sans-serif;
          font-size: .875rem;
          color: #64748b;
          line-height: 1.65;
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Number watermark */
        .wcs-card-num {
          position: absolute;
          bottom: 10px;
          right: 14px;
          font-family: var(--font-cormorant), serif;
          font-size: 4rem;
          font-weight: 700;
          color: rgba(37,99,235,.055);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        /* ── CTA ── */
        .wcs-cta-wrap {
          display: flex;
          justify-content: center;
          opacity: 0;
        }
        .wcs-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 15px 36px;
          border-radius: 99px;
          background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%);
          color: #fff;
          font-family: var(--font-dm), sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(37,99,235,.38), inset 0 1px 0 rgba(255,255,255,.2);
          transition: transform .18s, box-shadow .18s;
          position: relative;
          overflow: hidden;
        }
        /* Shimmer sweep */
        .wcs-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,.18) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform .55s ease;
        }
        .wcs-btn:hover::before { transform: translateX(100%); }
        .wcs-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 44px rgba(37,99,235,.48), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .wcs-btn:active { transform: translateY(0); }
        .wcs-btn svg { flex-shrink: 0; }

        /* ── Responsive ── */
        @media(max-width: 640px) {
          .wcs-section    { padding: 56px 18px 68px; }
          .wcs-sub        { margin-bottom: 36px; }
          .wcs-grid       { gap: 14px; margin-bottom: 40px; }
          .wcs-card       { padding: 22px 18px; }
          .wcs-text-center{ text-align: left; }
          .wcs-line       { margin: 0; }
          .wcs-tag-wrap   { justify-content: flex-start; }
        }
      `}</style>

      <section ref={sectionRef} className="wcs-section" aria-labelledby="wcs-heading">

        {/* ── Floating orbs ── */}
        <div ref={orb1Ref} className="wcs-orb wcs-orb-1" />
        <div ref={orb2Ref} className="wcs-orb wcs-orb-2" />
        <div ref={orb3Ref} className="wcs-orb wcs-orb-3" />

        <svg
          ref={bgSvgRef}
          className="wcs-bg-svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Concentric rings — top right */}
          <circle cx="1320" cy="100" r="180" fill="none" stroke="rgba(37,99,235,.08)" strokeWidth="1.5"/>
          <circle cx="1320" cy="100" r="120" fill="none" stroke="rgba(37,99,235,.06)" strokeWidth="1"/>
          <circle cx="1320" cy="100" r="60"  fill="none" stroke="rgba(37,99,235,.1)"  strokeWidth="1"/>

          {/* Arc rings — bottom left */}
          <path d="M -60 780 A 240 240 0 0 1 180 540" fill="none" stroke="rgba(37,99,235,.08)" strokeWidth="1.5" strokeDasharray="8 6"/>
          <path d="M -30 820 A 300 300 0 0 1 270 520" fill="none" stroke="rgba(37,99,235,.05)" strokeWidth="1"   strokeDasharray="4 8"/>

          {/* Cross / plus markers */}
          <g opacity=".28" stroke="rgba(37,99,235,.55)" strokeWidth="1.5" strokeLinecap="round">
            <line x1="80"   y1="160" x2="80"   y2="176"/><line x1="72"   y1="168" x2="88"   y2="168"/>
            <line x1="1360" y1="480" x2="1360" y2="496"/><line x1="1352" y1="488" x2="1368" y2="488"/>
            <line x1="720"  y1="820" x2="720"  y2="836"/><line x1="712"  y1="828" x2="728"  y2="828"/>
            <line x1="200"  y1="680" x2="200"  y2="692"/><line x1="194"  y1="686" x2="206"  y2="686"/>
            <line x1="1100" y1="200" x2="1100" y2="214"/><line x1="1093" y1="207" x2="1107" y2="207"/>
          </g>

          {/* Diamond / rotated squares */}
          <g opacity=".15" fill="none" stroke="rgba(37,99,235,.6)" strokeWidth="1">
            <rect x="50"   y="400" width="18" height="18" rx="2" transform="rotate(45 59 409)"/>
            <rect x="1370" y="650" width="14" height="14" rx="2" transform="rotate(45 1377 657)"/>
            <rect x="680"  y="50"  width="12" height="12" rx="2" transform="rotate(45 686 56)"/>
          </g>

          {/* Dotted connector paths */}
          <path d="M 140 200 Q 400 120 660 200 Q 920 280 1200 180" fill="none" stroke="rgba(37,99,235,.06)" strokeWidth="1" strokeDasharray="5 9"/>
          <path d="M 0 650 Q 360 580 720 640 Q 1080 700 1440 620"  fill="none" stroke="rgba(37,99,235,.05)" strokeWidth="1" strokeDasharray="3 10"/>

          {/* Triangle outlines */}
          <polygon points="1240,700 1270,650 1300,700" fill="none" stroke="rgba(37,99,235,.1)"    strokeWidth="1.2"/>
          <polygon points="160,80 185,40 210,80"        fill="none" stroke="rgba(99,102,241,.1)"   strokeWidth="1.2"/>

          {/* Scattered circles */}
          <circle cx="420"  cy="780" r="5" fill="none"             stroke="rgba(37,99,235,.15)"  strokeWidth="1.2"/>
          <circle cx="1050" cy="840" r="7" fill="none"             stroke="rgba(37,99,235,.1)"   strokeWidth="1"/>
          <circle cx="1380" cy="300" r="4" fill="rgba(37,99,235,.12)"/>
          <circle cx="60"   cy="550" r="5" fill="rgba(99,102,241,.1)"/>
          <circle cx="900"  cy="60"  r="6" fill="none"             stroke="rgba(37,99,235,.12)"  strokeWidth="1"/>

          {/* Wave line */}
          <path d="M0 450 C180 410 360 490 540 450 C720 410 900 490 1080 450 C1260 410 1380 450 1440 450" fill="none" stroke="rgba(37,99,235,.04)" strokeWidth="1.5"/>

          {/* Hexagons */}
          <polygon points="340,80 368,63 396,80 396,114 368,131 340,114"       fill="none" stroke="rgba(37,99,235,.08)"   strokeWidth="1.2"/>
          <polygon points="1060,780 1082,767 1104,780 1104,806 1082,819 1060,806" fill="none" stroke="rgba(99,102,241,.08)" strokeWidth="1"/>

          {/* Dot cluster — top left */}
          <g opacity=".35" fill="rgba(37,99,235,.3)">
            <circle cx="240" cy="280" r="1.5"/><circle cx="256" cy="280" r="1.5"/><circle cx="272" cy="280" r="1.5"/>
            <circle cx="240" cy="296" r="1.5"/><circle cx="256" cy="296" r="1.5"/><circle cx="272" cy="296" r="1.5"/>
            <circle cx="240" cy="312" r="1.5"/><circle cx="256" cy="312" r="1.5"/><circle cx="272" cy="312" r="1.5"/>
          </g>

          {/* Dot cluster — bottom right */}
          <g opacity=".3" fill="rgba(99,102,241,.3)">
            <circle cx="1150" cy="720" r="1.5"/><circle cx="1166" cy="720" r="1.5"/><circle cx="1182" cy="720" r="1.5"/>
            <circle cx="1150" cy="736" r="1.5"/><circle cx="1166" cy="736" r="1.5"/><circle cx="1182" cy="736" r="1.5"/>
            <circle cx="1150" cy="752" r="1.5"/><circle cx="1166" cy="752" r="1.5"/><circle cx="1182" cy="752" r="1.5"/>
          </g>

          {/* Spiral arc — mid right */}
          <path d="M 1380 480 Q 1340 440 1360 400 Q 1380 360 1420 380" fill="none" stroke="rgba(37,99,235,.08)" strokeWidth="1.2" strokeDasharray="4 5"/>
        </svg>

        <div className="wcs-inner">
          
          <div className="wcs-text-center">
            <h2 ref={head1Ref} className="wcs-head1" id="wcs-heading">
              Why Thousands of Families Across Europe Are
            </h2>
            <h2 ref={head2Ref} className="wcs-head2">
              Choosing International Schooling
            </h2>

            <div className="wcs-line-wrap">
              <span ref={lineRef} className="wcs-line" />
            </div>

            <p ref={subRef} className="wcs-sub">
              100% International Curriculum, Certified Teachers and flexible Schooling—All in one place.
            </p>
          </div>

          {/* Cards */}
          <div className="wcs-grid">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="wcs-card"
                ref={(el) => (cardsRef.current[i] = el)}
              >
                {/* <div className="wcs-card-icon">{f.icon}</div> */}
                <h3 className="wcs-card-title">{f.title}</h3>
                <p className="wcs-card-desc">{f.desc}</p>
                <span className="wcs-card-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="wcs-cta-wrap">
            <a
              href="https://europe.internationalschooling.org/#book-demo"
              className="wcs-btn"
            >
              Book Free Demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
