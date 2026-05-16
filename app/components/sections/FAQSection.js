"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Is your diploma accepted in the UAE and internationally?",
    answer:
      "Yes. Our accreditation supports recognition of transcripts and diploma for admissions and transfers in the UAE and globally.",
  },
  {
    question: "Is International Schooling an accredited school?",
    answer:
      "Yes. International Schooling is fully accredited and recognized by NEASC, WASC, and Cognia, with additional approvals including College Board and NCAA.",
  },
  {
    question: "Are class timings suitable for UAE time zones?",
    answer:
      "Yes. Group schedules are UAE-friendly and built to support families living in the region, with flexible options across multiple time slots.",
  },
  {
    question: "How are exams conducted?",
    answer:
      "All tests and quizzes are provided online. Students progress through them in sequence as part of their academic milestones, with real-time monitoring.",
  },
  {
    question: "Will my child receive a certificate or diploma?",
    answer:
      "Yes. Students receive the applicable certificate or diploma upon successful completion of their coursework or level, recognized internationally.",
  },
  {
    question: "Can students from UAE apply to universities after online schooling?",
    answer:
      "Yes, students from accredited online schools can apply to universities worldwide, including top institutions in the US, UK, Canada, and Australia.",
  },
  {
    question: "What is the best online school in UAE?",
    answer:
      "The best online school offers an accredited curriculum, expert teachers, and flexible learning with strong student support — which is exactly what we provide.",
  },


  {
    question: "Can my child get into a college/university after getting a certificate/diploma from International Schooling?",
    answer:
      "Upon successful completion of their course or level with International Schooling, they will be issued an American certificate or high school diploma. You may provide this certificate or diploma to their academic counselor or guide at the college or university to which you are applying.",
  },
  {
    question: "What is the fee structure?",
    answer:
      "Each course has a different fee based on the grade, level, and subjects. Once you register with us, you will be guided through our fee structure before making the final payment applicable to you.",
  },
  {
    question: "What are the enrollment dates and deadlines?",
    answer:
      "There is a fixed deadline to complete enrollment for group learning. However, for one-to-one learning, enrollments at International Schooling are open throughout the year.",
  },
  {
    question: "Is your diploma accepted in the UAE and internationally?",
    answer:
      "Yes. Our accreditation supports recognition of transcripts and diploma for admissions and transfers in the UAE and globally.",
  },
  {
    question: "Is International Schooling an accredited school?",
    answer:
      "Yes. International Schooling is fully accredited and recognized by NEASC, WASC, and Cognia, with additional approvals including College Board and NCAA.",
  },
  {
    question: "Are class timings suitable for UAE time zones?",
    answer:
      "Yes. Group schedules are UAE-friendly and built to support families living in the region, with flexible options across multiple time slots.",
  },
  {
    question: "How are exams conducted?",
    answer:
      "All tests and quizzes are provided online. Students progress through them in sequence as part of their academic milestones, with real-time monitoring.",
  },
  {
    question: "Will my child receive a certificate or diploma?",
    answer:
      "Yes. Students receive the applicable certificate or diploma upon successful completion of their coursework or level, recognized internationally.",
  },
  {
    question: "Can students from UAE apply to universities after online schooling?",
    answer:
      "Yes, students from accredited online schools can apply to universities worldwide, including top institutions in the US, UK, Canada, and Australia.",
  },
  {
    question: "What is the best online school in UAE?",
    answer:
      "The best online school offers an accredited curriculum, expert teachers, and flexible learning with strong student support — which is exactly what we provide.",
  },

  {
    question: "Will my child receive a certificate or diploma?",
    answer:
      "Yes. Students receive the applicable certificate or diploma upon successful completion of their coursework or level, recognized internationally.",
  },
  {
    question: "Can students from UAE apply to universities after online schooling?",
    answer:
      "Yes, students from accredited online schools can apply to universities worldwide, including top institutions in the US, UK, Canada, and Australia.",
  },
  {
    question: "What is the best online school in UAE?",
    answer:
      "The best online school offers an accredited curriculum, expert teachers, and flexible learning with strong student support — which is exactly what we provide.",
  },

];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const answerRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i) => setActiveIndex((prev) => (prev === i ? null : i));

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        padding: "72px 20px 80px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-dm), sans-serif",
      }}
    >
      {/* Subtle top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "120px",
          height: "3px",
          borderRadius: "0 0 4px 4px",
          background: "linear-gradient(90deg, #1e6afb, #06b6d4)",
        }}
      />

      {/* Decorative faint circles */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 340,
          height: 340,
          borderRadius: "50%",
          border: "1px solid rgba(30,106,251,0.07)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: "1px solid rgba(6,182,212,0.08)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
        {/* ── Header ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 52,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          


          <h2
            style={{
              fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)",
              fontWeight: 800,
              color: "#5b5b5b",
              lineHeight: 1.15,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Frequently
            <span style={{ color: "#1e6afb", position: "relative", display: "inline-block" }}>
               Ask Questions
              <svg
                style={{ position: "absolute", bottom: -4, left: 0, width: "100%" }}
                height="6"
                viewBox="0 0 200 6"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5 Q50 0 100 4 Q150 8 200 3"
                  stroke="#1e6afb"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 220,
                    strokeDashoffset: visible ? 0 : 220,
                    transition: "stroke-dashoffset 1.1s ease 0.5s",
                  }}
                />
              </svg>
              
            </span>
          </h2>

          <p
            style={{
              fontSize: "0.9rem",
              color: "#64748b",
              maxWidth: 460,
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Clear answers to help you understand our online schooling
            experience, accreditation, and student journey.
          </p>
        </div>

        {/* ── FAQ Items ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            const delay = 0.1 + i * 0.055;

            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid",
                  borderColor: isOpen ? "rgba(30,106,251,0.25)" : "#e8edf5",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: isOpen
                    ? "0 4px 20px rgba(30,106,251,0.08)"
                    : "0 1px 3px rgba(0,0,0,0.04)",
                  transition:
                    "border-color 0.25s ease, box-shadow 0.25s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${delay}s`,
                  transitionProperty:
                    "opacity, transform, border-color, box-shadow",
                  transitionDuration: "0.5s, 0.5s, 0.25s, 0.25s",
                  transitionTimingFunction: "ease, ease, ease, ease",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "18px 22px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {/* Number + question */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      flex: 1,
                    }}
                  >
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: isOpen ? "#1e6afb" : "#f0f4ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        color: isOpen ? "#fff" : "#1e6afb",
                        flexShrink: 0,
                        transition: "background 0.25s, color 0.25s",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: isOpen ? "#0a0f1e" : "#1e293b",
                        lineHeight: 1.45,
                        transition: "color 0.2s",
                      }}
                    >
                      {faq.question}
                    </span>
                  </div>

                  {/* Chevron */}
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: isOpen ? "#1e6afb" : "#f0f4ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.25s",
                    }}
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={2.2}
                      color={isOpen ? "#fff" : "#1e6afb"}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition:
                          "transform 0.35s cubic-bezier(.34,1.56,.64,1)",
                      }}
                    />
                  </div>
                </button>

                {/* Answer — animated */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.35s cubic-bezier(.4,0,.2,1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <div
                      style={{
                        padding: "0 22px 20px 62px",
                        fontSize: "0.83rem",
                        color: "#64748b",
                        lineHeight: 1.7,
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                        transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </div>
                </div>

                {/* Bottom accent line when open */}
                <div
                  style={{
                    height: 2,
                    background: "linear-gradient(90deg, #1e6afb, #06b6d4)",
                    opacity: isOpen ? 0.6 : 0,
                    transition: "opacity 0.3s ease",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 44,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.55s ease 0.55s, transform 0.55s ease 0.55s",
          }}
        >
          <a
            href="https://internationalschooling.org/demo"
            target="_blank"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#1e6afb",
              color: "#fff",
              fontSize: "0.82rem",
              fontWeight: 700,
              padding: "13px 28px",
              borderRadius: 100,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(30,106,251,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 22px rgba(30,106,251,0.38)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(30,106,251,0.3)";
            }}
          >
            Book Free Demo
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </section>
  );
}