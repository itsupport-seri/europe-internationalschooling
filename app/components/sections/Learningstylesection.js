"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";

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

const plans = [
  {
    tag: "1 TEACHER | 1 STUDENT",
    title: "One-to-One Learning",
    desc: "100% flexible schedule with personalized teacher support.",
    features: [
      "Your schedule, your timezone",
      "6 parent-teacher meetings",
      "Move ahead when ready",
      "Enroll any time, year-round",
    ],
  },
  {
    tag: "10-15 STUDENTS PER CLASS",
    title: "Group Learning",
    desc: "Structured live classes with peer interaction.",
    features: [
      "Live 60-minute classes",
      "Monday-Thursday schedule",
      "3 parent-teacher meetings",
      "Career counselling",
    ],
  },
  {
    tag: "BEST OF BOTH WORLDS",
    title: "Self-Learning Plus",
    desc: "Self-paced learning with dedicated teacher guidance and doubt-clearing sessions.",
    features: [
      "500+ self-paced courses",
      "1 live class per week",
      "Monday-Friday support",
      "No assignment deadlines",
    ],
  },
];

const ACCENT = "#0e7490";

export default function LearningStyleSection() {
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [col0Ref, col0Visible] = useInView(0.1);
  const [col1Ref, col1Visible] = useInView(0.1);
  const [col2Ref, col2Visible] = useInView(0.1);
  const [bottomRef, bottomVisible] = useInView(0.15);

  const colRefs = [col0Ref, col1Ref, col2Ref];
  const colVisibles = [col0Visible, col1Visible, col2Visible];
  const colDelays = ["0s", "0.13s", "0.26s"];

  return (
    <section
      id="learning-style"
      aria-labelledby="learning-style-title"
      ref={sectionRef}
      className="relative scroll-mt-28 overflow-hidden bg-white py-16 md:py-24"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Top + bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* ── Heading ── */}
        <header
          className="text-center mb-14"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <h2
            id="learning-style-title"
            className="text-[2rem] sm:text-[2.6rem] md:text-[2.9rem] font-extrabold leading-tight text-slate-900"
          >
            Choose the Learning Style{" "}
            <span className="relative inline-block text-[#1e52e1]">
              That Fits Your Child
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="6"
                viewBox="0 0 480 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5 Q120 0 240 4 Q360 8 480 3"
                  stroke="#1e52e1"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 500,
                    strokeDashoffset: sectionVisible ? 0 : 500,
                    transition: "stroke-dashoffset 1.2s ease 0.4s",
                  }}
                />
              </svg>
            </span>
          </h2>
        </header>

        {/* ── Comparison columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-slate-200 px-6 md:px-0">
          {plans.map(({ tag, title, desc, features }, i) => (
            <div
              key={title}
              ref={colRefs[i]}
              className="px-0 md:px-10 py-10 md:py-0 border-b md:border-b-0 border-slate-200 last:border-b-0 first:md:pl-0 last:md:pr-0"
              style={{
                opacity: colVisibles[i] ? 1 : 0,
                transform: colVisibles[i] ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${colDelays[i]}, transform 0.65s ease ${colDelays[i]}`,
              }}
            >
              {/* Tag */}
              <p
                className="text-[11px] font-bold tracking-[0.13em] uppercase mb-3"
                style={{ color: ACCENT }}
              >
                {tag}
              </p>

              {/* Title */}
              <h3
                className="text-[1.6rem] sm:text-[1.85rem] font-extrabold leading-tight mb-4"
                style={{ color: ACCENT }}
              >
                {title}
              </h3>

              {/* Description */}
              <p className="text-[0.92rem] text-slate-700 font-medium leading-relaxed mb-8">
                {desc}
              </p>

              {/* Features */}
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={2.8}
                    />
                    <span className="text-[0.88rem] text-slate-700 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom meta + CTA ── */}
        <div
          ref={bottomRef}
          className="mt-16 flex flex-col items-center gap-5 text-center"
          style={{
            opacity: bottomVisible ? 1 : 0,
            transform: bottomVisible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <p className="text-[0.9rem] text-slate-500 font-medium">
            Grades KG-12&nbsp;&nbsp;|&nbsp;&nbsp;Ages 5–18&nbsp;&nbsp;|&nbsp;&nbsp;Enrol any time, year-round
          </p>

          <a
            href="https://europe.internationalschooling.org/europe#book-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-[0.88rem] font-bold text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200"
          >
            Book Free Demo
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}