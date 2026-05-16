"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageCircle,
  BookOpen,
  ClipboardList,
  BarChart2,
  TrendingUp,
  Bell,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const interactions = [
  { label: "Live Discussions", Icon: MessageCircle, color: "#3b82f6" },
  { label: "Academic Support", Icon: BookOpen, color: "#6366f1" },
  { label: "Assignments", Icon: ClipboardList, color: "#0ea5e9" },
  { label: "Assessments", Icon: BarChart2, color: "#8b5cf6" },
  { label: "Continuous Progress Tracking", Icon: TrendingUp, color: "#10b981" },
];

export default function RealTeachersSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const subRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const pillRef = useRef(null);
  const tagRef = useRef(null);
  const itemsRef = useRef([]);
  const parentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG underline draw
      gsap.fromTo(
        lineRef.current,
        { strokeDashoffset: 360 },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      // Heading
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );

      // Subtitle
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15,
          scrollTrigger: { trigger: subRef.current, start: "top 88%" },
        }
      );

      // Left panel slide in
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 82%" },
        }
      );

      // Right panel slide in
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.85, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: rightRef.current, start: "top 82%" },
        }
      );

      // Interaction items stagger
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: i * 0.07,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // Parent card pop
      gsap.fromTo(
        pillRef.current,
        { opacity: 0, y: 24, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.5)",
          scrollTrigger: { trigger: pillRef.current, start: "top 88%" },
        }
      );

      // Tag badge
      gsap.fromTo(
        tagRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.8)",
          scrollTrigger: { trigger: tagRef.current, start: "top 88%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="real-teachers"
      aria-labelledby="real-teachers-title"
      className="relative overflow-hidden bg-white py-10"
      style={{ fontFamily: "var(--font-dm), sans-serif" , background: "linear-gradient(160deg, #f0f4f8 0%, #e8eef5 40%, #edf2f7 100%)"}}
    >
      {/* Top / bottom rule lines only — no gradients */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* ── Header ── */}
        <header className="mx-auto max-w-2xl text-center mb-16 space-y-4">
          <h2
            id="real-teachers-title"
            ref={headingRef}
            className="text-[1.85rem] sm:text-4xl font-extrabold leading-tight"
            style={{ opacity: 0 }}
          >
            <span style={{ color: "#5b5b5b" }}>Real Teachers.</span>{" "}
            <span style={{ color: "#5b5b5b" }}>Real Classes.</span>{" "}
            <span className="relative inline-block text-blue-600">
              Real Learning.
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="7"
                viewBox="0 0 360 7"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  ref={lineRef}
                  d="M0 6 Q90 1 180 5 Q270 9 360 3"
                  stroke="#1e52e1"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{ strokeDasharray: 360, strokeDashoffset: 360 }}
                />
              </svg>
            </span>
          </h2>

          <p
            ref={subRef}
            className="text-sm md:text-base text-slate-500 leading-relaxed"
            style={{ opacity: 0 }}
          >
            International Schooling provides live, teacher-led online classes with internationally
            trained and certified teachers.
          </p>
        </header>

        {/* ── Two-column layout ── */}
        <div className="grid gap-8 lg:grid-cols-2 items-start">

          {/* ── Left — Student interactions ── */}
          <div
            ref={leftRef}
            className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
            style={{ opacity: 0 }}
          >
            {/* Card header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
                <MessageCircle size={16} className="text-blue-600" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">Students interact directly with teachers through</p>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">Live · Certified · International</p>
              </div>
              <span
                ref={tagRef}
                className="ml-auto text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 whitespace-nowrap"
                style={{ opacity: 0 }}
              >
                ✓ Live
              </span>
            </div>

            {/* Interaction list */}
            <ul className="space-y-3">
              {interactions.map(({ label, Icon, color }, i) => (
                <li
                  key={label}
                  ref={(el) => (itemsRef.current[i] = el)}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_1px_4px_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-250 cursor-default"
                  style={{ opacity: 0 }}
                >
                  {/* Icon */}
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: color + "12", border: `1px solid ${color}22` }}
                  >
                    <Icon size={15} style={{ color }} strokeWidth={1.8} />
                  </div>

                  {/* Label */}
                  <span className="text-[0.85rem] font-semibold text-slate-700">{label}</span>

                  {/* Right dot */}
                  <span
                    className="ml-auto size-1.5 rounded-full shrink-0"
                    style={{ background: color }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* ── Right — Parent updates ── */}
          <div
            ref={rightRef}
            className="flex flex-col gap-6"
            style={{ opacity: 0 }}
          >
            {/* Main parent card */}
            <div
              ref={pillRef}
              className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                  <Bell size={16} className="text-emerald-600" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">Parents Stay Involved</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Regular updates & reports</p>
                </div>
                <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                  ✓ Active
                </span>
              </div>

              <p className="text-[0.85rem] text-slate-500 leading-relaxed">
                Parents also receive regular updates and performance reports to stay involved in their
                child&apos;s learning journey.
              </p>

              {/* Divider */}
              <div className="my-6 h-px bg-slate-100" />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "Live", sub: "Classes" },
                  { value: "1-on-1", sub: "Support" },
                  { value: "Real-time", sub: "Reports" },
                ].map(({ value, sub }) => (
                  <div key={sub} className="text-center">
                    <p className="text-[0.95rem] font-extrabold text-slate-800">{value}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 uppercase tracking-wider">{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom accent card — certified teachers */}
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm flex items-center gap-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
                <BookOpen size={18} className="text-blue-600" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-bold text-slate-800 leading-snug">Internationally Trained & Certified</p>
                <p className="text-[0.78rem] text-slate-400 mt-0.5 leading-relaxed">Every teacher is vetted, certified, and experienced in global curricula.</p>
              </div>
              <span className="shrink-0 text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 whitespace-nowrap">
                ✓ Verified
              </span>
            </div>
          </div>

        </div>

        {/* ── Bottom trust strip ── */}
        <div
          ref={parentRef}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Delivered through
          </p>
          {["Live Classes", "Certified Teachers", "Parent Reports"].map((item) => (
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
