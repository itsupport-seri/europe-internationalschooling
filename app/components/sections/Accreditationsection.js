"use client";
import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Award, Star } from "lucide-react";
import Image from "next/image";

function useInView(threshold = 0.2) {
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

const trustBadges = [
  { label: "Globally Trusted", icon: Star, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" },
  { label: "Quality Assured", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { label: "Internationally Recognized", icon: Award, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
];

export default function AccreditationSection() {
  const [sectionRef, sectionVisible] = useInView(0.15);
  const [strip1Ref, strip1Visible] = useInView(0.2);
  const [strip2Ref, strip2Visible] = useInView(0.2);

  return (
    <section
      id="accreditation"
      aria-labelledby="home-accreditation-title"
      ref={sectionRef}
      className="relative scroll-mt-28 overflow-hidden bg-white py-16 md:py-15"
    >
      {/* Top + bottom decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />

      {/* Subtle background wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #bfdbfe 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #a7f3d0 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* ── Header ── */}
        <header
          className="mx-auto max-w-3xl text-center space-y-4 mb-14"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >


          <h2
            id="home-accreditation-title"
            className="font-[family-name:var(--font-display)] text-[1.85rem] sm:text-4xl font-extrabold  leading-tight"
          >
            <span style={{ color: "#5b5b5b" }}>Fully Accredited</span>{" "}
            <i className="text-slate-400 not-italic">&</i>{" "}

            <span className="relative inline-block text-blue-600">
              Globally Recognized
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="6"
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5 Q50 0 100 4 Q150 8 200 3"
                  stroke="#1e52e1"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset: sectionVisible ? 0 : 220,
                    transition: "stroke-dashoffset 1.1s ease 0.5s",
                  }}
                />
              </svg>
            </span>
          </h2>

          <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Our programs are backed by leading international accreditation bodies and trusted by global
            institutions, ensuring quality, credibility, and worldwide recognition.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {trustBadges.map(({ label, icon: Icon, color, bg, border }, i) => (
              <div
                key={label}
                className={`inline-flex items-center gap-2 ${bg} border ${border} rounded-full px-4 py-2 hover:scale-105 transition-transform duration-200`}
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s, scale 0.2s`,
                }}
              >
                <Icon size={13} className={color} />
                <span className={`text-xs font-semibold ${color}`}>{label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* ── Logo Strips ── */}
        <div className="grid gap-6 lg:grid-cols-2 items-center">

          {/* Strip 1 — NEASC, WASC, Cognia */}
          <div
            ref={strip1Ref}
            className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            style={{
              opacity: strip1Visible ? 1 : 0,
              transform: strip1Visible ? "translateX(0)" : "translateX(-28px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            {/* Card accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Background hover wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl" />

            {/* Inner label */}
            <div className="relative flex items-center gap-2 mb-6">
              <div className="flex size-8 items-center justify-center rounded-xl bg-blue-100">
                <ShieldCheck size={15} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">Accreditation Bodies</p>
                <p className="text-[10px] text-slate-400 font-medium">USA-based certification</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
                ✓ Active
              </span>
            </div>

            {/* Image */}
            <div className="relative flex items-center justify-center h-16">
              <Image
                src="/new-strip.avif"
                alt="Accreditations including NEASC, WASC, and Cognia"
                width={720}
                height={60}
                loading="lazy"
                className="h-auto w-full max-w-[560px] object-contain group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(min-width: 1280px) 560px, (min-width: 768px) 560px, 92vw"
              />
            </div>

            {/* Bottom label */}
            <p className="relative text-center text-[10px] text-slate-400 font-medium mt-5 tracking-wide uppercase">
              NEASC · WASC · Cognia — Accredited
            </p>
          </div>

          {/* Strip 2 — NCAA, College Board, CID */}
          <div
            ref={strip2Ref}
            className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            style={{
              opacity: strip2Visible ? 1 : 0,
              transform: strip2Visible ? "translateX(0)" : "translateX(28px)",
              transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
            }}
          >
            {/* Card accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Background hover wash */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl" />

            {/* Inner label */}
            <div className="relative flex items-center gap-2 mb-6">
              <div className="flex size-8 items-center justify-center rounded-xl bg-blue-100">
                <Award size={15} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">Global Recognitions</p>
                <p className="text-[10px] text-slate-400 font-medium">Trusted by world institutions</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1">
                ✓ Verified
              </span>
            </div>

            {/* Image */}
            <div className="relative flex items-center justify-center h-16">
              <Image
                src="/second-strip.avif"
                alt="Recognitions including NCAA, College Board, and CID"
                width={960}
                height={139}
                loading="lazy"
                className="h-auto w-full max-w-[680px] object-contain group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(min-width: 1280px) 680px, (min-width: 768px) 680px, 92vw"
              />
            </div>

            {/* Bottom label */}
            <p className="relative text-center text-[10px] text-slate-400 font-medium mt-5 tracking-wide uppercase">
              NCAA · College Board · CID — Recognized
            </p>
          </div>
        </div>

        {/* ── Bottom trust strip ── */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.6s",
          }}
        >
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Recognized by
          </p>
          {["190+ Countries", "15,000+ Students", "Top Universities Worldwide"].map((item, i) => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-blue-300 inline-block" />
              <span className="text-xs font-semibold text-slate-600">{item}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}