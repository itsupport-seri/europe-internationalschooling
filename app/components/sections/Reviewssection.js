"use client";
import { useEffect, useRef, useState } from "react";
import { Play, Star, Globe, Quote } from "lucide-react";

function useInView(threshold = 0.15) {
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

const reviews = [
  { id: "JMPA-oRvFgI", label: "Parent From Sri Lanka", sublabel: "Living in UAE",   flag: "🇱🇰", accent: "blue"    },
  { id: "gR1GaeTsVDk", label: "Parent From Oman",      sublabel: "Middle East",     flag: "🇴🇲", accent: "emerald" },
  { id: "G-gDr_KKqwc", label: "Parent From UAE",       sublabel: "United Arab Emirates", flag: "🇦🇪", accent: "violet"  },
  { id: "tAUXNgjJua8", label: "Parent From Colombia",  sublabel: "Living in UAE",   flag: "🇨🇴", accent: "amber"   },
  { id: "96eMmRQKeZc", label: "Parent From Malaysia",  sublabel: "Living in UAE",   flag: "🇲🇾", accent: "rose"    },
  { id: "KA6KxiqjmUc", label: "Parent From UAE",       sublabel: "United Arab Emirates", flag: "🇦🇪", accent: "teal"   },
];

const accentMap = {
  blue:    { ring: "ring-blue-200",    bg: "bg-blue-50",    label: "text-blue-700",    dot: "bg-blue-500",    badge: "bg-blue-100 text-blue-700 border-blue-200"    },
  emerald: { ring: "ring-emerald-200", bg: "bg-emerald-50", label: "text-emerald-700", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  violet:  { ring: "ring-violet-200",  bg: "bg-violet-50",  label: "text-violet-700",  dot: "bg-violet-500",  badge: "bg-violet-100 text-violet-700 border-violet-200"  },
  amber:   { ring: "ring-amber-200",   bg: "bg-amber-50",   label: "text-amber-700",   dot: "bg-amber-500",   badge: "bg-amber-100 text-amber-700 border-amber-200"   },
  rose:    { ring: "ring-rose-200",    bg: "bg-rose-50",    label: "text-rose-700",    dot: "bg-rose-500",    badge: "bg-rose-100 text-rose-700 border-rose-200"    },
  teal:    { ring: "ring-teal-200",    bg: "bg-teal-50",    label: "text-teal-700",    dot: "bg-teal-500",    badge: "bg-teal-100 text-teal-700 border-teal-200"    },
};

function VideoCard({ review, index, visible }) {
  const [playing, setPlaying] = useState(false);
  const a = accentMap[review.accent];
  const thumb = `https://i.ytimg.com/vi/${review.id}/hqdefault.jpg`;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)",
        transition: `opacity 0.6s ease ${0.1 + index * 0.08}s, transform 0.6s ease ${0.1 + index * 0.08}s, box-shadow 0.4s, translate 0.4s`,
      }}
    >
      {/* Colored top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${a.dot.replace("bg-", "bg-")} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
        style={{ background: review.accent === "blue" ? "#3b82f6" : review.accent === "emerald" ? "#10b981" : review.accent === "violet" ? "#8b5cf6" : review.accent === "amber" ? "#f59e0b" : review.accent === "rose" ? "#f43f5e" : "#14b8a6" }}
      />

      {/* Video area */}
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${review.id}?autoplay=1&rel=0`}
            title={`Review from ${review.label}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play review from ${review.label}, ${review.sublabel}`}
            className="group/btn relative block h-full w-full cursor-pointer"
          >
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/btn:scale-110"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

            {/* Quote icon watermark */}
            <div className="absolute top-3 left-3 opacity-40">
              <Quote size={20} className="text-white fill-white" />
            </div>

            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex size-16 items-center justify-center rounded-full bg-white shadow-2xl ring-4 ring-white/30 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:ring-white/60">
                <Play size={22} className="fill-red-600 text-red-600 ml-1" />
                {/* Ping ring */}
                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-60" />
              </span>
            </span>

            {/* Duration badge */}
            <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
              ▶ Watch
            </span>
          </button>
        )}
      </div>

      {/* Card footer */}
      <div className={`flex items-center gap-3 px-4 py-3.5 ${a.bg} border-t border-slate-100`}>
        {/* Flag + info */}
        <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-xl">
          {review.flag}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold leading-tight ${a.label} truncate`}>
            {review.label}
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{review.sublabel}</p>
        </div>
        {/* Stars */}
        <div className="flex gap-0.5 shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ReviewsSection() {
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.08);

  const trustStats = [
    { value: "4.9/5", label: "Average Rating" },
    { value: "15K+", label: "Happy Families" },
    { value: "190+", label: "Countries" },
  ];

  return (
    <section
      id="reviews"

      className="relative scroll-mt-28 overflow-hidden border-y border-blue-100 py-16 md:py-15"

      style={{ background: "linear-gradient(160deg, #f8faff 0%, #eff6ff 50%, #f0f9ff 100%)" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* CHANGED: #bbf7d0 (green) → #bfdbfe (blue) */}
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 -left-20 w-[350px] h-[350px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }} />
        {/* Subtle dot grid — CHANGED: #86efac (green) → #93c5fd (blue) */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rdots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.2" fill="#93c5fd" fillOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rdots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 space-y-14">

        {/* ── Header ── */}
        <header
          ref={headerRef}
          className="text-center space-y-5"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-[1.85rem] sm:text-4xl md:text-5xl font-extrabold  leading-tight" style={{ color: "#5b5b5b" }}>
            33% of our students come from
            {/* CHANGED: text-emerald-700 → text-blue-700 */}
            <span className="relative inline-block text-blue-700 ps-2">
               Parent Referrals
              {/* CHANGED: stroke #10b981 (green) → #1d4ed8 (blue) */}
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5 Q50 0 100 4 Q150 8 200 3" stroke="#1d4ed8" strokeWidth="3" fill="none" strokeLinecap="round"
                  style={{ strokeDasharray: 220, strokeDashoffset: headerVisible ? 0 : 220, transition: "stroke-dashoffset 1.1s ease 0.5s" }}
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-500 leading-relaxed">
            Reviews & Recommendations from Parents — real voices from families across the globe
            who chose International Schooling for their children.
          </p>

          {/* Trust stats row */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {trustStats.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-2xl px-5 py-2.5 shadow-sm"
                style={{
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}
              >
                <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-slate-900">{value}</span>
                <span className="text-xs font-semibold text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ── Video Grid ── */}
        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <VideoCard key={review.id} review={review} index={i} visible={gridVisible} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
       
          className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-3xl border border-blue-200 bg-white px-7 py-6 shadow-sm"
          style={{
            opacity: gridVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.7s",
          }}
        >
          <div className="flex items-center gap-3">
            {/* CHANGED: bg-emerald-100 → bg-blue-100 */}
            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-100">
              {/* CHANGED: text-emerald-600 → text-blue-600 */}
              <Globe size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Join Families From 190+ Countries</p>
              <p className="text-xs text-slate-500 mt-0.5">Experience world-class education from home</p>
            </div>
          </div>
          <a
            href="https://internationalschooling.org/demo"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 shrink-0"
          >
            Book Free Demo →
          </a>
        </div>

      </div>
    </section>
  );
}