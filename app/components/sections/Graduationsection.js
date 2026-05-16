"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    ChevronLeft, ChevronRight, GraduationCap,
    Globe, Check, Clock, CalendarDays,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";

/* ── useInView ── */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* ── Slide images from inspect ── */
const slides = [
    { src: "/cere/1.avif", alt: "Graduation ceremony 1" },
    { src: "/cere/2.avif", alt: "Graduation ceremony 2" },
    { src: "/cere/3.avif", alt: "Graduation ceremony 3" },
    { src: "/cere/4.avif", alt: "Graduation ceremony 4" },
    { src: "/cere/5.avif", alt: "Graduation ceremony 5" },
    { src: "/cere/6.avif", alt: "Graduation ceremony 6" },
];

/* ── Benefits from inspect ── */
const benefits = [
    "School Accreditations & Recognition",
    "Right Learning Program",
    "Benefits of the international curriculum",
    "Transcript & High School Diploma",
    "Easy School Fee Options",
    "College & University Support",
];

/* ── Calendar helpers ── */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startOffset = (firstDay + 6) % 7;
    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
}

function isAvailable(year, month, day) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = new Date(year, month, day);
    if (d <= today) return false;
    const dow = d.getDay();
    return dow !== 0 && dow !== 6;
}

const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

export default function GraduationSection() {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const [headerRef, headerVisible] = useInView(0.2);
    const [bodyRef, bodyVisible] = useInView(0.06);

    const cells = getCalendarDays(year, month);

    const prevMonth = () => {
        if (month === 0) { setYear(y => y - 1); setMonth(11); }
        else setMonth(m => m - 1);
        setSelectedDay(null); setSelectedTime(null);
    };
    const nextMonth = () => {
        if (month === 11) { setYear(y => y + 1); setMonth(0); }
        else setMonth(m => m + 1);
        setSelectedDay(null); setSelectedTime(null);
    };

    return (
        <section
            id="graduation"
            style={{
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(160deg,#faf8ff 0%,#f3eeff 40%,#eef3ff 100%)",
                borderTop: "1px solid #ede9fe",
                borderBottom: "1px solid #ddd6fe",
            }}
        >

            {/* BG blobs + dots */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 70%)" }} />
                <div style={{ position: "absolute", bottom: "-60px", left: "-40px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)" }} />
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}>
                    <defs>
                        <pattern id="gDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                            <circle cx="1.5" cy="1.5" r="1.3" fill="#c4b5fd" fillOpacity="0.22" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#gDots)" />
                </svg>
            </div>

            <div style={{ position: "relative", zIndex: 1, padding: "50px 20px 72px" }}>

                {/* ══ HEADER ══ */}
                <header
                    ref={headerRef}
                    style={{
                        textAlign: "center", marginBottom: "48px",
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? "translateY(0)" : "translateY(26px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    <h2 style={{
                        fontSize: "clamp(1.8rem,4vw,2.7rem)", fontWeight: 800,
                        color: "#5b5b5b", lineHeight: 1.18, letterSpacing: "-0.022em",
                    }}>
                        Graduation Ceremony 2025 –{" "}
                        {/* CHANGED: removed gradient, now plain blue */}
                        <span style={{
                            color: "#1d4ed8",
                            position: "relative", display: "inline-block",
                        }}>
                            Atlantis, Dubai
                            <svg aria-hidden="true" style={{ position: "absolute", bottom: "-7px", left: 0, width: "100%", overflow: "visible" }}
                                height="7" viewBox="0 0 120 7" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 6 Q30 0 60 5 Q90 10 120 3"
                                    stroke="#1d4ed8" strokeWidth="2.8" fill="none" strokeLinecap="round"
                                    style={{ strokeDasharray: 140, strokeDashoffset: headerVisible ? 0 : 140, transition: "stroke-dashoffset 1.1s ease 0.5s" }}
                                />
                            </svg>
                        </span>
                    </h2>
                </header>

                {/* ══ TWO-COLUMN BODY: Slider left | Calendar right ══ */}
                <div
                    ref={bodyRef}
                    style={{
                        maxWidth: "1200px", margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                        gap: "36px",
                        alignItems: "start",
                        opacity: bodyVisible ? 1 : 0,
                        transform: bodyVisible ? "translateY(0)" : "translateY(32px)",
                        transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
                    }}
                >

                    {/* ── LEFT: Swiper Slider ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                        {/* Slider card */}
                        <div style={{
                            borderRadius: "28px", overflow: "hidden",
                            boxShadow: "0 28px 72px rgba(109,40,217,0.18)",
                            position: "relative",
                        }}>
                            <Swiper
                                onSwiper={s => (swiperRef.current = s)}
                                onSlideChange={s => setActiveIndex(s.realIndex)}
                                modules={[EffectCreative, Autoplay]}
                                effect="creative"
                                creativeEffect={{
                                    prev: { shadow: true, translate: ["-120%", 0, -500], rotate: [0, 0, -15] },
                                    next: { shadow: true, translate: ["120%", 0, -500], rotate: [0, 0, 15] },
                                }}
                                autoplay={{ delay: 4000, disableOnInteraction: false }}
                                loop
                                speed={800}
                            >
                                {slides.map((slide, i) => (
                                    <SwiperSlide key={i}>
                                        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                                            <Image
                                                src={slide.src} alt={slide.alt} fill loading="lazy"
                                                sizes="(min-width:1024px) 46vw, (min-width:768px) 88vw, 90vw"
                                                style={{ objectFit: "cover", objectPosition: "center" }}
                                                quality={75}
                                            />
                                            {/* Dark overlay */}
                                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(15,23,42,0.55) 0%,transparent 55%)" }} />
                                            {/* Badge — CHANGED: moved to center */}
                                            <div style={{
                                                position: "absolute", bottom: "16px",
                                                left: "50%", transform: "translateX(-50%)",
                                                display: "flex", alignItems: "center", gap: "6px",
                                                background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
                                                borderRadius: "999px", padding: "5px 12px",
                                                border: "1px solid rgba(255,255,255,0.3)",
                                                whiteSpace: "nowrap",
                                            }}>
                                                <GraduationCap size={12} color="#fff" />
                                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
                                                    Ceremony Moments
                                                </span>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* ── Controls row — CHANGED: centered label + dots + prev/next inline like SuccessStories ── */}
                        <div style={{
                            textAlign: "center",
                            marginTop: "20px",
                            marginBottom: "4px",
                        }}>
                            {/* CHANGED: removed left-aligned label; now centered above pagination row */}
                            <p style={{
                                fontSize: "11px", fontWeight: 700,
                                textTransform: "uppercase", letterSpacing: "0.18em",
                                color: "#1d4ed8", marginBottom: "4px",
                            }}>
                                Ceremony Moments
                            </p>
                            <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
                                Slide {activeIndex + 1} of {slides.length}
                            </p>

                            {/* CHANGED: prev button + dots + next button all in one centered row */}
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "16px",
                            }}>
                                {/* Prev */}
                                <button
                                    onClick={() => swiperRef.current?.slidePrev()}
                                    aria-label="Previous slide"
                                    style={{
                                        width: "42px", height: "42px", borderRadius: "50%",
                                        border: "1.5px solid #bfdbfe", background: "#eff6ff",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        cursor: "pointer", transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#dbeafe"; e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.transform = "scale(1.08)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.transform = "scale(1)"; }}
                                >
                                    <ChevronLeft size={20} color="#1e40af" />
                                </button>

                                {/* Dots */}
                                <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                                    {slides.map((_, i) => (
                                        <button key={i} onClick={() => swiperRef.current?.slideTo(i)}
                                            aria-label={`Go to slide ${i + 1}`}
                                            style={{
                                                height: "9px",
                                                width: i === activeIndex ? "30px" : "9px",
                                                borderRadius: "999px", border: "none", cursor: "pointer", padding: 0,
                                                background: i === activeIndex ? "#1d4ed8" : "#bfdbfe",
                                                transition: "width 0.35s ease, background 0.3s ease",
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Next */}
                                <button
                                    onClick={() => swiperRef.current?.slideNext()}
                                    aria-label="Next slide"
                                    style={{
                                        width: "42px", height: "42px", borderRadius: "50%",
                                        border: "1.5px solid #bfdbfe", background: "#eff6ff",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        cursor: "pointer", transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#dbeafe"; e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.transform = "scale(1.08)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.transform = "scale(1)"; }}
                                >
                                    <ChevronRight size={20} color="#1e40af" />
                                </button>
                            </div>
                        </div>

                        {/* Caption */}
                        <p style={{ marginTop: "18px", fontSize: "13.5px", color: "#64748b", lineHeight: 1.75, textAlign: "center" }}>
                            Seeing students and families together in Dubai makes the online journey real and meaningful.
                            These moments reflect their growth, confidence, and success with International Schooling.
                        </p>
                    </div>

                    {/* ── RIGHT: "Talk to Our Academic Experts" + Calendar ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        {/* Section heading */}
                        <h3 style={{
                            fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 800,
                            color: "#5b5b5b", textAlign: "center", lineHeight: 1.25,
                        }}>
                            Next ceremonies 2026


                        </h3>
                        <span className="text-center text-blue-600">Dubai | Spain | Colombia</span>
                        {/* Booking card */}
                        <div style={{
                            background: "#fff", borderRadius: "28px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 24px 70px -45px rgba(15,23,42,0.55)",
                            overflow: "hidden",
                        }}>
                            {/* Top info bar */}
                            <div style={{
                                padding: "22px 24px 20px",
                                background: "linear-gradient(160deg,#f8faff,#eef3ff)",
                                borderBottom: "1px solid #e2e8f0",
                            }}>
                                <p style={{ fontSize: "12.5px", fontWeight: 600, color: "#334155", marginBottom: "16px" }}>
                                    In Just 30 Mins Live Meeting, you will get:
                                </p>
                                <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: "18px" }}>
                                    {benefits.map(b => (
                                        <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "7px", fontSize: "12px", color: "#334155" }}>
                                            <span style={{
                                                width: "18px", height: "18px", borderRadius: "50%",
                                                background: "#dcfce7", border: "1px solid #bbf7d0",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0, marginTop: "1px",
                                            }}>
                                                <Check size={9} color="#16a34a" strokeWidth={2.8} />
                                            </span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                {/* Timezone */}
                                <div style={{ borderRadius: "12px", border: "1px solid #bfdbfe", background: "#eff6ff", padding: "10px 14px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                    <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#60a5fa" }}>Time Zone:</p>
                                    <Globe size={13} color="#64748b" />
                                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#1e293b" }}>Asia/Kolkata</span>
                                </div>
                            </div>

                            {/* Calendar body */}
                            <div style={{ padding: "22px 24px" }}>
                                <h5 style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", marginBottom: "18px", textAlign: "center" }}>
                                    Select date
                                </h5>

                                <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "20px" }} className="sm:grid-cols-[minmax(0,1fr)_160px]">

                                    {/* Calendar grid */}
                                    <div>
                                        {/* Month nav */}
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                                            <button onClick={prevMonth} aria-label="Previous month"
                                                style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                                                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                                                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                                            ><ChevronLeft size={14} color="#475569" /></button>
                                            <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{MONTHS[month]} {year}</span>
                                            <button onClick={nextMonth} aria-label="Next month"
                                                style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #e2e8f0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                                                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                                                onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                                            ><ChevronRight size={14} color="#475569" /></button>
                                        </div>

                                        {/* Day headers */}
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "1px", marginBottom: "2px" }}>
                                            {DAYS.map(d => (
                                                <div key={d} style={{ textAlign: "center", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8", padding: "4px 0" }}>{d}</div>
                                            ))}
                                        </div>

                                        {/* Day cells */}
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "1px" }}>
                                            {cells.map((day, i) => {
                                                if (!day) return <div key={`e-${i}`} style={{ height: "38px" }} aria-hidden="true" />;
                                                const avail = isAvailable(year, month, day);
                                                const sel = selectedDay === day;
                                                return (
                                                    <button key={day} type="button" disabled={!avail}
                                                        onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                                                        style={{
                                                            height: "38px", width: "38px", borderRadius: "100%", border: "none",
                                                            fontSize: "12px", fontWeight: 600,
                                                            cursor: avail ? "pointer" : "not-allowed",
                                                            background: sel ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "transparent",
                                                            color: sel ? "#fff" : avail ? "#0f172a" : "#cbd5e1",
                                                            boxShadow: sel ? "0 3px 10px rgba(37,99,235,0.3)" : "none",
                                                            transition: "background 0.2s, color 0.2s",
                                                        }}
                                                        onMouseEnter={e => { if (avail && !sel) e.currentTarget.style.background = "#eff6ff"; }}
                                                        onMouseLeave={e => { if (avail && !sel) e.currentTarget.style.background = "transparent"; }}
                                                    >{day}</button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time slots */}
                                    <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px" }} className="sm:pt-0 sm:pl-4">
                                        {selectedDay ? (
                                            <>
                                                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                                                    <Clock size={12} color="#64748b" />
                                                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#64748b" }}>{MONTHS[month].slice(0, 3)} {selectedDay}</span>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "280px", overflowY: "auto", paddingRight: "2px" }}>
                                                    {timeSlots.map(t => {
                                                        const picked = selectedTime === t;
                                                        return (
                                                            <button key={t} type="button" onClick={() => setSelectedTime(t)}
                                                                style={{
                                                                    padding: "8px 12px", borderRadius: "10px",
                                                                    border: picked ? "1.5px solid #2563eb" : "1.5px solid #e2e8f0",
                                                                    background: picked ? "linear-gradient(135deg,#eff6ff,#dbeafe)" : "#fff",
                                                                    color: picked ? "#1d4ed8" : "#334155",
                                                                    fontSize: "12px", fontWeight: picked ? 700 : 500,
                                                                    cursor: "pointer", textAlign: "left",
                                                                    display: "flex", alignItems: "center", gap: "6px",
                                                                    transition: "all 0.18s",
                                                                }}
                                                                onMouseEnter={e => { if (!picked) { e.currentTarget.style.borderColor = "#93c5fd"; e.currentTarget.style.background = "#f8faff"; } }}
                                                                onMouseLeave={e => { if (!picked) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff"; } }}
                                                            >
                                                                <Clock size={11} color={picked ? "#2563eb" : "#94a3b8"} />
                                                                {t}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {selectedTime && (
                                                    <button type="button"
                                                        style={{
                                                            marginTop: "12px", width: "100%", padding: "11px",
                                                            borderRadius: "12px", border: "none",
                                                            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
                                                            color: "#fff", fontSize: "12.5px", fontWeight: 700,
                                                            cursor: "pointer", boxShadow: "0 5px 16px rgba(37,99,235,0.3)",
                                                            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                                                            transition: "box-shadow 0.2s, transform 0.2s",
                                                        }}
                                                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.42)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                                                        onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 5px 16px rgba(37,99,235,0.3)"; e.currentTarget.style.transform = "translateY(0)"; }}
                                                    >
                                                        <CalendarDays size={13} />
                                                        Confirm · {MONTHS[month].slice(0, 3)} {selectedDay} · {selectedTime}
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <div >
                                                {/* <CalendarDays size={22} color="#cbd5e1" style={{ margin:"0 auto 8px" }} />
                        Pick a date to see times. */}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .swiper-slide { border-radius:28px; overflow:hidden; }
        .swiper { border-radius:28px; }
      `}</style>
        </section>
    );
}