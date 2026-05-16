"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Newspaper, ExternalLink } from "lucide-react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const newsItems = [
  {
    src: "/1.avif",
    alt: "USA News | International Schooling",
    outlet: "USA News",
    tag: "Featured Coverage",
  },
  {
    src: "/Yahoo.avif",
    alt: "Yahoo Finance | International Schooling",
    outlet: "Yahoo Finance",
    tag: "Press Release",
  },
  {
    src: "/ktla.avif",
    alt: "KTLA 5 News | International Schooling",
    outlet: "KTLA 5 News",
    tag: "Broadcast Media",
  },
];

export default function NEASCNewsSection() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [card0Ref, card0Visible] = useInView(0.12);
  const [card1Ref, card1Visible] = useInView(0.12);
  const [card2Ref, card2Visible] = useInView(0.12);

  const cardRefs = [card0Ref, card1Ref, card2Ref];
  const cardVisibles = [card0Visible, card1Visible, card2Visible];
  const cardDelays = ["0s", "0.14s", "0.28s"];

  return (
    <section
      id="neasc-news"
      aria-labelledby="neasc-news-title"
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-100 py-10"
      style={{ fontFamily: "var(--font-dm), sans-serif" }}
    >
      {/* Subtle dot texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Top / bottom soft lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* ── Header ── */}
        <header
          className="mx-auto max-w-2xl text-center mb-14 space-y-4"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          

          <h2
            id="neasc-news-title"
            style={{
              fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)",
              fontWeight: 800,
              color: "#5b5b5b",
              lineHeight: 1.15,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            NEASC Accreditation{" "}
            <span style={{ color: "#1e6afb", position: "relative", display: "inline-block" }}>
              in the News
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="6"
                viewBox="0 0 260 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5 Q65 0 130 4 Q195 8 260 3"
                  stroke="#1e6afb"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 280,
                    strokeDashoffset: sectionVisible ? 0 : 280,
                    transition: "stroke-dashoffset 1.1s ease 0.5s",
                  }}
                />
              </svg>
            </span>
          </h2>

          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Our NEASC accreditation has been recognized and covered by leading media outlets worldwide.
          </p>
        </header>

        {/* ── News cards ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.map(({ src, alt, outlet, tag }, i) => (
            <div
              key={outlet}
              ref={cardRefs[i]}
              className="group relative rounded-2xl overflow-hidden border border-white/20 bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              style={{
                opacity: cardVisibles[i] ? 1 : 0,
                transform: cardVisibles[i] ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.65s ease ${cardDelays[i]}, transform 0.65s ease ${cardDelays[i]}`,
              }}
            >
              {/* Accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              {/* Image */}
              <div className="relative overflow-hidden aspect-video bg-slate-100">
                <Image
                  src={src}
                  alt={alt}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-[1.04] transition-transform duration-500"
                />
                {/* Tag overlay on image */}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-blue-600 rounded-full px-2.5 py-1 shadow">
                  {tag}
                </span>
              </div>

              {/* Card body */}
              <div className="flex items-center justify-between px-5 py-4 bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 border border-blue-100">
                    <Newspaper size={14} className="text-blue-600" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-[0.95rem] font-extrabold text-blue-800">{outlet}</h3>
                </div>
                <ExternalLink
                  size={14}
                  className="text-slate-300 group-hover:text-blue-500 transition-colors duration-200"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}