"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Phone, Mail, ChevronRight,
  Send, Globe, BookOpen, Users, Award, FileText,
  MessageSquare, GraduationCap, Heart,
} from "lucide-react";
import {
  FaFacebook, FaInstagram, FaTwitter,
  FaLinkedin, FaYoutube, FaWhatsapp,
} from "react-icons/fa";

/* ─── CSS ──────────────────────────────────────────────────────── */
const CSS = `
  .footer-root * { box-sizing: border-box; }
  .footer-root { font-family: var(--font-body), sans-serif; }

  /* ── WhatsApp ripple ── */
  @keyframes wa-pulse {
    0%   { transform: scale(1);   opacity: 0.55; }
    100% { transform: scale(2.5); opacity: 0;    }
  }
  .wa-r1 { animation: wa-pulse 2.2s ease-out infinite 0s;    }
  .wa-r2 { animation: wa-pulse 2.2s ease-out infinite 0.73s; }
  .wa-r3 { animation: wa-pulse 2.2s ease-out infinite 1.46s; }
  .wa-fab {
    transition: transform 0.28s cubic-bezier(.22,.68,0,1.4), box-shadow 0.25s ease;
  }
  .wa-fab:hover {
    transform: scale(1.12) !important;
    box-shadow: 0 16px 40px rgba(37,211,102,0.60) !important;
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.from-left { transform: translateX(-32px); }
  .reveal.visible {
    opacity: 1 !important;
    transform: translateY(0) translateX(0) !important;
  }

  /* ── Footer links — white & crisp ── */
  .f-link {
    display: inline-flex; align-items: center; gap: 7px;
    color: rgba(255,255,255,0.78);
    text-decoration: none; font-size: 13px; line-height: 1.55; font-weight: 400;
    transition: color 0.18s ease, gap 0.18s ease;
  }
  .f-link:hover { color: #fff; gap: 10px; }
  .f-link .chev { color: #4da3ff; flex-shrink: 0; }

  /* ── Social icon ── */
  .soc-icon {
    width: 36px; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; flex-shrink: 0;
    transition: transform 0.22s cubic-bezier(.22,.68,0,1.4), opacity 0.2s;
  }
  .soc-icon:hover { transform: translateY(-4px) scale(1.1); opacity: 1; }

  /* ── Country card ── */
  .country-card {
    display: flex; align-items: center; gap: 7px;
    padding: 6px 12px; border-radius: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    text-decoration: none;
    transition: background 0.18s, border-color 0.18s, transform 0.18s;
    white-space: nowrap; font-family: inherit;
  }
  .country-card:hover {
    background: rgba(77,163,255,0.18);
    border-color: rgba(77,163,255,0.40);
    transform: translateY(-2px);
  }
  .country-card .flag-img {
    width: 22px; height: 15px; border-radius: 2px; object-fit: cover; flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.35);
  }
  .country-card .c-name {
    font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.88);
  }

  /* ── Accred badge — smaller on all screens ── */
  .accred-badge {
    display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
    padding: 8px 10px; border-radius: 10px;
    background: #fff;
    border: 1px solid rgba(255,255,255,0.18);
    transition: transform 0.22s cubic-bezier(.22,.68,0,1.4), box-shadow 0.2s ease;
    cursor: default;
    min-width: 72px;
  }
  .accred-badge:hover { transform: translateY(-3px); box-shadow: 0 8px 22px rgba(0,0,0,0.28); }
  .accred-badge img { width: auto; height: 30px; object-fit: contain; display: block; }

  /* ── Newsletter ── */
  .nl-inp {
    flex: 1; padding: 11px 15px;
    background: rgba(255,255,255,0.09);
    border: 1.5px solid rgba(255,255,255,0.16); border-right: none;
    color: #fff; font-size: 13px; font-weight: 400;
    border-radius: 9px 0 0 9px;
    outline: none; transition: border-color 0.2s, background 0.2s; font-family: inherit;
  }
  .nl-inp::placeholder { color: rgba(255,255,255,0.35); }
  .nl-inp:focus { border-color: rgba(77,163,255,0.60); background: rgba(255,255,255,0.12); }
  .nl-btn {
    padding: 11px 20px; background: #1a6edb;
    color: #fff; font-size: 13px; font-weight: 700;
    border: none; cursor: pointer;
    border-radius: 0 9px 9px 0;
    display: flex; align-items: center; gap: 6px;
    font-family: inherit; transition: background 0.18s; white-space: nowrap; letter-spacing: 0.02em;
  }
  .nl-btn:hover { background: #1559b8; }

  /* ── Section heading — centered with side borders ── */
  .col-head-center {
    display: flex; align-items: center; justify-content: center; gap: 12px;
    margin-bottom: 20px;
  }
  .col-head-center .chb-bar {
    flex: 1; height: 1px; background: rgba(255,255,255,0.14);
  }
  .col-head-center .chb-text {
    display: flex; align-items: center; gap: 7px;
    font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em; color: #fff;
    white-space: nowrap;
  }
  .col-head-center .chb-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #4da3ff; flex-shrink: 0;
  }

  /* ── Left-aligned section heading (brand col) ── */
  .col-head {
    font-size: 10.5px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.16em;
    color: #fff; margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .col-head-bar { flex: 1; height: 1px; background: rgba(255,255,255,0.14); }
  .col-head-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #4da3ff; flex-shrink: 0;
  }

  /* ── Divider ── */
  .f-divider { height: 1px; background: rgba(255,255,255,0.10); margin: 36px 0; }

  /* ── Contact row ── */
  .contact-link {
    color: rgba(255,255,255,0.78); text-decoration: none;
    font-size: 13px; line-height: 1.6; transition: color 0.18s; font-weight: 400;
  }
  .contact-link:hover { color: #fff; }

  /* ── Mobile accordion ── */
  .mob-content {
    overflow: hidden;
    transition: max-height 0.32s ease, opacity 0.26s ease;
  }

  /* ── Stats strip ── */
  .stat-chip {
    display: flex; flex-direction: column; align-items: center;
    padding: 10px 20px; border-radius: 10px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.11);
    min-width: 100px;
  }

  /* ── View More button ── */
  .view-more-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 8px;
    background: rgba(77,163,255,0.14);
    border: 1px solid rgba(77,163,255,0.35);
    color: #60a5fa; font-size: 12px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: background 0.18s, border-color 0.18s, transform 0.18s;
    white-space: nowrap;
  }
  .view-more-btn:hover {
    background: rgba(77,163,255,0.26);
    border-color: rgba(77,163,255,0.60);
    transform: translateY(-1px);
  }

  /* ── Responsive ── */
  @media (max-width: 767px) {
    .desktop-grid { display: none !important; }
    .mobile-acc   { display: block !important; }
    .nl-wrap      { flex-direction: column; }
    .nl-form      { width: 100% !important; }
    .stats-row    { gap: 8px !important; }
    .stat-chip    { min-width: 80px; padding: 8px 12px; }
    .accred-badges { justify-content: center !important; }
    .accred-badge img { height: 24px !important; }
    .accred-badge { min-width: 60px !important; padding: 6px 8px !important; }
    .bottom-bar   { flex-direction: column; align-items: center !important; text-align: center; }
  }
  @media (min-width: 768px) {
    .desktop-grid { display: grid !important; }
    .mobile-acc   { display: none !important; }
  }
  @media (max-width: 1080px) {
    .desktop-grid {
      grid-template-columns: 200px repeat(5,1fr) !important;
      gap: 32px 18px !important;
    }
  }
  @media (max-width: 900px) {
    .desktop-grid {
      grid-template-columns: 1fr 1fr 1fr !important;
    }
    .brand-block { grid-column: 1 / -1 !important; }
  }
`;

/* ─── useReveal hook ─────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── DATA ─────────────────────────────────────────────────────── */
const BG = "#001e40";

const socialLinks = [
  { icon: <FaFacebook size={15} />, href: "#", label: "Facebook",  color: "#fff", bg: "#1877f2" },
  { icon: <FaInstagram size={15} />,href: "#", label: "Instagram", color: "#fff", bg: "#e1306c" },
  { icon: <FaTwitter size={15} />,  href: "#", label: "Twitter",   color: "#fff", bg: "#1da1f2" },
  { icon: <FaLinkedin size={15} />, href: "#", label: "LinkedIn",  color: "#fff", bg: "#0a66c2" },
  { icon: <FaYoutube size={15} />,  href: "#", label: "YouTube",   color: "#fff", bg: "#ff0000" },
];

const columns = [
  {
    title: "Programs",
    icon: <BookOpen size={11} color="#4da3ff" />,
    links: [
      { label: "One-To-One Learning",    href: "/one-to-one-learning" },
      { label: "Group Learning",          href: "/group-learning" },
      { label: "Self Study Learning",     href: "/self-study-learning" },
      { label: "AP Courses",              href: "/ap-courses" },
      { label: "Dual Diploma Program",    href: "/dual-diploma" },
      { label: "Online High School",      href: "/online-high-school" },
      { label: "Online Middle School",    href: "/online-middle-school" },
      { label: "Online Elementary",       href: "/online-elementary-school" },
      { label: "Special Education",       href: "/special-education" },
      { label: "University Program",      href: "/university-program" },
    ],
  },
  {
    title: "Accreditation",
    icon: <Award size={11} color="#4da3ff" />,
    links: [
      { label: "NEASC Accreditation",  href: "/neasc" },
      { label: "WASC Accreditation",   href: "/wasc" },
      { label: "Cognia Accreditation", href: "/cognia" },
      { label: "College Board",        href: "/college-board" },
      { label: "NCAA, USA",            href: "/ncaa" },
      { label: "UNESCO, CID",          href: "/unesco-cid" },
    ],
  },
  {
    title: "Community",
    icon: <Users size={11} color="#4da3ff" />,
    links: [
      { label: "Parent Reviews",     href: "/#reviews" },
      { label: "Student Gallery",    href: "/gallery" },
      { label: "Student Community",  href: "/student-community" },
      { label: "IS Alumni",          href: "/alumni" },
      { label: "Meet Our Counselor", href: "/meet-our-counselor" },
      { label: "Clubs & Events",     href: "/clubs" },
      { label: "Webinars",           href: "/webinars" },
      { label: "Blog",               href: "/blog" },
    ],
  },
  {
    title: "Quick Links",
    icon: <Globe size={11} color="#4da3ff" />,
    links: [
      { label: "Book Free Demo",     href: "/demo" },
      { label: "Enrollment Process", href: "/enrollment-process" },
      { label: "Fee Structure",      href: "/fee-structure" },
      { label: "Financial Aid",      href: "/financial" },
      { label: "Course Catalog",     href: "/course-catalog" },
      { label: "Careers",            href: "/career" },
      { label: "Press Release",      href: "/press-release" },
      { label: "FAQ's",              href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    icon: <FileText size={11} color="#4da3ff" />,
    links: [
      { label: "Privacy Policy",    href: "/privacy-policy" },
      { label: "Terms of Use",      href: "/terms-of-use" },
      { label: "Guardian Policy",   href: "/guardian-policy" },
      { label: "Fee Refund Policy", href: "/fee-refund-policy" },
      { label: "Contact Us",        href: "/contact-us" },
    ],
  },
];

/* ── All 190+ countries with flag codes ── */
const countries = [
  { name: "Afghanistan", code: "af" },
  { name: "Albania", code: "al" },
  { name: "Algeria", code: "dz" },
  { name: "Andorra", code: "ad" },
  { name: "Angola", code: "ao" },
  { name: "Antigua & Barbuda", code: "ag" },
  { name: "Argentina", code: "ar" },
  { name: "Armenia", code: "am" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Azerbaijan", code: "az" },
  { name: "Bahamas", code: "bs" },
  { name: "Bahrain", code: "bh" },
  { name: "Bangladesh", code: "bd" },
  { name: "Barbados", code: "bb" },
  { name: "Belarus", code: "by" },
  { name: "Belgium", code: "be" },
  { name: "Belize", code: "bz" },
  { name: "Benin", code: "bj" },
  { name: "Bhutan", code: "bt" },
  { name: "Bolivia", code: "bo" },
  { name: "Bosnia & Herzegovina", code: "ba" },
  { name: "Botswana", code: "bw" },
  { name: "Brazil", code: "br" },
  { name: "Brunei", code: "bn" },
  { name: "Bulgaria", code: "bg" },
  { name: "Burkina Faso", code: "bf" },
  { name: "Burundi", code: "bi" },
  { name: "Cambodia", code: "kh" },
  { name: "Cameroon", code: "cm" },
  { name: "Canada", code: "ca" },
  { name: "Cape Verde", code: "cv" },
  { name: "Central African Rep.", code: "cf" },
  { name: "Chad", code: "td" },
  { name: "Chile", code: "cl" },
  { name: "China", code: "cn" },
  { name: "Colombia", code: "co" },
  { name: "Comoros", code: "km" },
  { name: "Congo", code: "cg" },
  { name: "Costa Rica", code: "cr" },
  { name: "Croatia", code: "hr" },
  { name: "Cuba", code: "cu" },
  { name: "Cyprus", code: "cy" },
  { name: "Czech Republic", code: "cz" },
  { name: "Denmark", code: "dk" },
  { name: "Djibouti", code: "dj" },
  { name: "Dominica", code: "dm" },
  { name: "Dominican Republic", code: "do" },
  { name: "DR Congo", code: "cd" },
  { name: "Ecuador", code: "ec" },
  { name: "Egypt", code: "eg" },
  { name: "El Salvador", code: "sv" },
  { name: "Equatorial Guinea", code: "gq" },
  { name: "Eritrea", code: "er" },
  { name: "Estonia", code: "ee" },
  { name: "Eswatini", code: "sz" },
  { name: "Ethiopia", code: "et" },
  { name: "Fiji", code: "fj" },
  { name: "Finland", code: "fi" },
  { name: "France", code: "fr" },
  { name: "Gabon", code: "ga" },
  { name: "Gambia", code: "gm" },
  { name: "Georgia", code: "ge" },
  { name: "Germany", code: "de" },
  { name: "Ghana", code: "gh" },
  { name: "Greece", code: "gr" },
  { name: "Grenada", code: "gd" },
  { name: "Guatemala", code: "gt" },
  { name: "Guinea", code: "gn" },
  { name: "Guinea-Bissau", code: "gw" },
  { name: "Guyana", code: "gy" },
  { name: "Haiti", code: "ht" },
  { name: "Honduras", code: "hn" },
  { name: "Hungary", code: "hu" },
  { name: "Iceland", code: "is" },
  { name: "India", code: "in" },
  { name: "Indonesia", code: "id" },
  { name: "Iran", code: "ir" },
  { name: "Iraq", code: "iq" },
  { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" },
  { name: "Italy", code: "it" },
  { name: "Ivory Coast", code: "ci" },
  { name: "Jamaica", code: "jm" },
  { name: "Japan", code: "jp" },
  { name: "Jordan", code: "jo" },
  { name: "Kazakhstan", code: "kz" },
  { name: "Kenya", code: "ke" },
  { name: "Kiribati", code: "ki" },
  { name: "Kuwait", code: "kw" },
  { name: "Kyrgyzstan", code: "kg" },
  { name: "Laos", code: "la" },
  { name: "Latvia", code: "lv" },
  { name: "Lebanon", code: "lb" },
  { name: "Lesotho", code: "ls" },
  { name: "Liberia", code: "lr" },
  { name: "Libya", code: "ly" },
  { name: "Liechtenstein", code: "li" },
  { name: "Lithuania", code: "lt" },
  { name: "Luxembourg", code: "lu" },
  { name: "Madagascar", code: "mg" },
  { name: "Malawi", code: "mw" },
  { name: "Malaysia", code: "my" },
  { name: "Maldives", code: "mv" },
  { name: "Mali", code: "ml" },
  { name: "Malta", code: "mt" },
  { name: "Marshall Islands", code: "mh" },
  { name: "Mauritania", code: "mr" },
  { name: "Mauritius", code: "mu" },
  { name: "Mexico", code: "mx" },
  { name: "Micronesia", code: "fm" },
  { name: "Moldova", code: "md" },
  { name: "Monaco", code: "mc" },
  { name: "Mongolia", code: "mn" },
  { name: "Montenegro", code: "me" },
  { name: "Morocco", code: "ma" },
  { name: "Mozambique", code: "mz" },
  { name: "Myanmar", code: "mm" },
  { name: "Namibia", code: "na" },
  { name: "Nauru", code: "nr" },
  { name: "Nepal", code: "np" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Nicaragua", code: "ni" },
  { name: "Niger", code: "ne" },
  { name: "Nigeria", code: "ng" },
  { name: "North Korea", code: "kp" },
  { name: "North Macedonia", code: "mk" },
  { name: "Norway", code: "no" },
  { name: "Oman", code: "om" },
  { name: "Pakistan", code: "pk" },
  { name: "Palau", code: "pw" },
  { name: "Palestine", code: "ps" },
  { name: "Panama", code: "pa" },
  { name: "Papua New Guinea", code: "pg" },
  { name: "Paraguay", code: "py" },
  { name: "Peru", code: "pe" },
  { name: "Philippines", code: "ph" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Russia", code: "ru" },
  { name: "Rwanda", code: "rw" },
  { name: "Saint Kitts & Nevis", code: "kn" },
  { name: "Saint Lucia", code: "lc" },
  { name: "Saint Vincent", code: "vc" },
  { name: "Samoa", code: "ws" },
  { name: "San Marino", code: "sm" },
  { name: "São Tomé & Príncipe", code: "st" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "Senegal", code: "sn" },
  { name: "Serbia", code: "rs" },
  { name: "Seychelles", code: "sc" },
  { name: "Sierra Leone", code: "sl" },
  { name: "Singapore", code: "sg" },
  { name: "Slovakia", code: "sk" },
  { name: "Slovenia", code: "si" },
  { name: "Solomon Islands", code: "sb" },
  { name: "Somalia", code: "so" },
  { name: "South Africa", code: "za" },
  { name: "South Korea", code: "kr" },
  { name: "South Sudan", code: "ss" },
  { name: "Spain", code: "es" },
  { name: "Sri Lanka", code: "lk" },
  { name: "Sudan", code: "sd" },
  { name: "Suriname", code: "sr" },
  { name: "Sweden", code: "se" },
  { name: "Switzerland", code: "ch" },
  { name: "Syria", code: "sy" },
  { name: "Taiwan", code: "tw" },
  { name: "Tajikistan", code: "tj" },
  { name: "Tanzania", code: "tz" },
  { name: "Thailand", code: "th" },
  { name: "Timor-Leste", code: "tl" },
  { name: "Togo", code: "tg" },
  { name: "Tonga", code: "to" },
  { name: "Trinidad & Tobago", code: "tt" },
  { name: "Tunisia", code: "tn" },
  { name: "Turkey", code: "tr" },
  { name: "Turkmenistan", code: "tm" },
  { name: "Tuvalu", code: "tv" },
  { name: "UAE", code: "ae" },
  { name: "Uganda", code: "ug" },
  { name: "UK", code: "gb" },
  { name: "Ukraine", code: "ua" },
  { name: "Uruguay", code: "uy" },
  { name: "USA", code: "us" },
  { name: "Uzbekistan", code: "uz" },
  { name: "Vanuatu", code: "vu" },
  { name: "Vatican City", code: "va" },
  { name: "Venezuela", code: "ve" },
  { name: "Vietnam", code: "vn" },
  { name: "Yemen", code: "ye" },
  { name: "Zambia", code: "zm" },
  { name: "Zimbabwe", code: "zw" },
];

const COUNTRIES_DEFAULT_COUNT = 44;

/* ── Accreditations with image paths ── */
const accreditations = [
  { label: "NEASC",        img: "/footer/neasc-flat.webp" },
  { label: "WASC",         img: "/footer/wasc.webp" },
  { label: "Cognia",       img: "/footer/cognia-flat.webp" },
  { label: "NCAA",         img: "/footer/ncaa-flat.png" },
  
  { label: "College Board",img: "/footer/college-board-flat.webp" },
  { label: "UNESCO",       img: "/footer/unesco-cid.webp" },
];

/* ─── MOBILE ACCORDION ─────────────────────────────────────────── */
function MobileAcc({ col }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "13px 0",
          background: "transparent", border: "none", cursor: "pointer",
          color: "#fff", fontFamily: "inherit",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em" }}>
          {col.icon}{col.title}
        </span>
        <ChevronRight
          size={14} color="rgba(255,255,255,0.45)"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.25s ease", flexShrink: 0 }}
        />
      </button>
      <div className="mob-content" style={{ maxHeight: open ? "520px" : 0, opacity: open ? 1 : 0 }}>
        <ul style={{ listStyle: "none", paddingBottom: "14px", display: "flex", flexDirection: "column", gap: "9px" }}>
          {col.links.map(l => (
            <li key={l.label}>
              <a href={l.href} className="f-link">
                <ChevronRight size={10} className="chev" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── FOOTER ───────────────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail]                   = useState("");
  const [subscribed, setSubscribed]         = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);

  const nlRef        = useReveal(0.1);
  const brandRef     = useReveal(0.1);
  const countriesRef = useReveal(0.08);
  const accredRef    = useReveal(0.1);
  const bottomRef    = useReveal(0.05);

  const handleSub = (e) => {
    e.preventDefault();
    if (email.trim()) { setSubscribed(true); setEmail(""); }
  };

  const visibleCountries = showAllCountries ? countries : countries.slice(0, COUNTRIES_DEFAULT_COUNT);
  const remainingCount   = countries.length - COUNTRIES_DEFAULT_COUNT;

  return (
    <>
      <style>{CSS}</style>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href="https://api.whatsapp.com/send?phone=17273902419"
        target="_blank" rel="noreferrer"
        aria-label="Chat on WhatsApp"
        style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span className="wa-r1" style={{ position:"absolute", width:"58px", height:"58px", borderRadius:"50%", background:"rgba(37,211,102,0.28)", pointerEvents:"none" }} />
        <span className="wa-r2" style={{ position:"absolute", width:"58px", height:"58px", borderRadius:"50%", background:"rgba(37,211,102,0.20)", pointerEvents:"none" }} />
        <span className="wa-r3" style={{ position:"absolute", width:"58px", height:"58px", borderRadius:"50%", background:"rgba(37,211,102,0.13)", pointerEvents:"none" }} />
        <span className="wa-fab" style={{ position:"relative", width:"58px", height:"58px", borderRadius:"50%", background:"#25d366", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 26px rgba(37,211,102,0.40)" }}>
          <FaWhatsapp size={27} color="#fff" />
        </span>
      </a>

      {/* ── FOOTER ── */}
      <footer className="footer-root" style={{ background: BG, color: "#fff", position: "relative", overflow: "hidden" }}>

        {/* Subtle top accent line */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, #1a6edb 0%, #38bdf8 40%, #818cf8 70%, #1a6edb 100%)" }} />

        {/* ── NEWSLETTER BAND ── */}
        <div
          ref={nlRef}
          className="reveal"
          style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "24px 24px" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "18px" }} className="nl-wrap">
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: "rgba(26,110,219,0.25)", border: "1px solid rgba(77,163,255,0.30)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageSquare size={18} color="#60a5fa" />
              </div>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#60a5fa", marginBottom: "3px" }}>Newsletter</p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>Free resources, updates &amp; scholarship news</p>
              </div>
            </div>

            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#34d399", fontWeight: 600, fontSize: "14px" }}>
                <Heart size={16} fill="#34d399" color="#34d399" /> You&apos;re subscribed — thank you!
              </div>
            ) : (
              <form onSubmit={handleSub} style={{ display: "flex", width: "clamp(260px,36vw,420px)" }} className="nl-form">
                <input className="nl-inp" type="email" required
                  placeholder="Your email address"
                  value={email} onChange={e => setEmail(e.target.value)} />
                <button className="nl-btn" type="submit">
                  <Send size={13} /> Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── MAIN BODY ── */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 40px" }} >

          {/* ── DESKTOP GRID ── */}
          <div
            className="desktop-grid"
            style={{ gridTemplateColumns: "250px repeat(5,1fr)", gap: "40px 28px", alignItems: "start" }}
          >
            {/* Brand */}
            <div ref={brandRef} className="reveal from-left brand-block">
              <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "11px", padding: "8px 14px", display: "inline-block", marginBottom: "20px" }}>
                <Image src="/logo.avif" alt="International Schooling" width={160} height={36}
                  style={{ height: "31px", width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginBottom: "20px", maxWidth: "225px" }}>
                Empowering students worldwide with accredited online education — flexible, personalised, and globally recognised.
              </p>

              {/* Stats */}
              <div className="stats-row" style={{ display: "flex", gap: "10px", marginBottom: "22px", flexWrap: "wrap" }}>
                {[["15K+", "Students"], ["190+", "Countries"], ["600+", "Teachers"]].map(([n, l]) => (
                  <div key={l} className="stat-chip">
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{n}</span>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.50)", textTransform: "uppercase", letterSpacing: "0.10em", marginTop: "2px" }}>{l}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "22px" }}>
                {[
                  { icon: <Phone size={13} color="#4da3ff" />, text: "+1 (727) 390-2419",               href: "tel:+17273902419" },
                  { icon: <Mail size={13} color="#4da3ff" />,  text: "info@internationalschooling.org", href: "mailto:info@internationalschooling.org" },
                ].map(({ icon, text, href }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                    <span style={{ marginTop: "2px", flexShrink: 0 }}>{icon}</span>
                    <a href={href} className="contact-link">{text}</a>
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label} className="soc-icon"
                    style={{ background: s.bg, color: s.color, opacity: 0.88 }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map((col, i) => (
              <div key={col.title}
                style={{ opacity: 0, transform: "translateY(26px)", transition: `opacity 0.60s ease ${0.1 + i * 0.09}s, transform 0.60s ease ${0.1 + i * 0.09}s` }}
                ref={el => {
                  if (!el) return;
                  const obs = new IntersectionObserver(([entry]) => {
                    if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
                  }, { threshold: 0.06 });
                  obs.observe(el);
                }}
              >
                <div className="col-head">
                  <span className="col-head-dot" />
                  {col.icon}
                  {col.title}
                  <span className="col-head-bar" />
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                  {col.links.map(l => (
                    <li key={l.label}>
                      <a href={l.href} className="f-link">
                        <ChevronRight size={10} className="chev" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ── MOBILE ACCORDIONS ── */}
          <div className="mobile-acc" style={{ display: "none" }}>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: "11px", padding: "8px 14px", display: "inline-block", marginBottom: "14px" }}>
                <Image src="/logo.avif" alt="International Schooling" width={148} height={34}
                  style={{ height: "29px", width: "auto", objectFit: "contain", display: "block" }} />
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "14px" }}>
                Empowering students worldwide with accredited online education.
              </p>
              <div className="stats-row" style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                {[["15K+", "Students"], ["190+", "Countries"], ["600+", "Teachers"]].map(([n, l]) => (
                  <div key={l} className="stat-chip">
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{n}</span>
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.50)", textTransform: "uppercase", letterSpacing: "0.09em", marginTop: "1px" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    aria-label={s.label} className="soc-icon"
                    style={{ background: s.bg, color: s.color, opacity: 0.88 }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>
            {columns.map(col => <MobileAcc key={col.title} col={col} />)}
          </div>

          <div className="f-divider" />

          {/* ── COUNTRIES WITH FLAGS — centered heading ── */}
          <div ref={countriesRef} className="reveal">
            <div className="col-head-center">
              <span className="chb-bar" />
              <span className="chb-text">
                <span className="chb-dot" />
                <Globe size={11} color="#4da3ff" />
                Countries We Serve
              </span>
              <span className="chb-bar" />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {visibleCountries.map(c => (
                <a key={c.name} href={`/${c.name.toLowerCase().replace(/\s+/g, "-")}`} className="country-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/w40/${c.code}.png`}
                    alt={c.name}
                    className="flag-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="c-name">{c.name}</span>
                </a>
              ))}

              {/* View More / View Less button */}
              <button
                className="view-more-btn"
                onClick={() => setShowAllCountries(v => !v)}
              >
                {showAllCountries ? (
                  <>
                    <ChevronRight size={13} style={{ transform: "rotate(-90deg)" }} />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronRight size={13} style={{ transform: "rotate(90deg)" }} />
                    +{remainingCount} More Countries
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="f-divider" />

          {/* ── ACCREDITATIONS — centered heading + image badges ── */}
          <div ref={accredRef} className="reveal">
            <div className="col-head-center">
              <span className="chb-bar" />
              <span className="chb-text">
                <span className="chb-dot" />
                <GraduationCap size={11} color="#4da3ff" />
                Accreditations &amp; Recognition
              </span>
              <span className="chb-bar" />
            </div>
            <div
              className="accred-badges"
              style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
            >
              {accreditations.map((a, i) => (
                <div
                  key={a.label}
                  className="accred-badge"
                  style={{
                    opacity: 0, transform: "translateY(14px)",
                    transition: `opacity 0.45s ease ${i * 0.07}s, transform 0.45s ease ${i * 0.07}s`,
                  }}
                  ref={el => {
                    if (!el) return;
                    const obs = new IntersectionObserver(([entry]) => {
                      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; obs.disconnect(); }
                    }, { threshold: 0.1 });
                    obs.observe(el);
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.img} alt={a.label} loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>

          <div className="f-divider" />

          {/* ── BOTTOM BAR — single line ── */}
          <div ref={bottomRef} className="reveal">
            <div className="bottom-bar" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.42)", lineHeight: 1.6, textAlign: "center", margin: 0 }}>
                © {new Date().getFullYear()} International Schooling. All rights reserved. &nbsp;·&nbsp; Accredited Online Education &nbsp;·&nbsp; Serving 190+ Countries Globally
              </p>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}
