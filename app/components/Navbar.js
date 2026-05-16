"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Phone, Mail, MessageCircle, Clock, X, Menu } from "lucide-react";

const animationCSS = `
  .cta-btn {
    position: relative;
    overflow: hidden;
  }
  .cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.15);
    transform: translateX(-100%);
    transition: transform 0.28s ease;
  }
  .cta-btn:hover::before {
    transform: translateX(0);
  }
  .contact-chip {
    transition: background 0.18s ease;
  }
  .contact-chip:hover {
    background: rgba(255,255,255,0.15) !important;
  }
  @keyframes waPulse {
    0%,100% { transform: scale(1); opacity: 0.5; }
    50%      { transform: scale(1.6); opacity: 0; }
  }
  .wa-pulse::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 50%;
    background: rgba(37,211,102,0.45);
    animation: waPulse 2.2s ease-in-out infinite;
  }
  @keyframes mobileMenuIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mobile-menu-anim {
    animation: mobileMenuIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }
  .navbar-wrapper.navbar-hidden {
    transform: translateY(-100%);
  }
  .navbar-wrapper.navbar-visible {
    transform: translateY(0);
  }
`;

const ctaLinks = [
  { label: "Book Free Demo",    href: "https://internationalschooling.org/demo",        primary: false, external: true },
  { label: "Request Callback",  href: "https://internationalschooling.org/callback",    primary: false, external: true },
  // { label: "Log In",            href: "https://sms.internationalschooling.org/international-schooling/common/login", primary: false, external: true },
  { label: "Enroll Now",        href: "https://internationalschooling.org/enrollment",  primary: true , external: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY <= 0) {
            setNavVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            setNavVisible(false);
            setMenuOpen(false);
          } else if (currentScrollY < lastScrollY.current) {
            setNavVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{animationCSS}</style>

      <div className="h-[3.75rem] lg:h-[calc(3.75rem+2.5rem)]" aria-hidden="true" />

      <header className={`navbar-wrapper ${navVisible ? "navbar-visible" : "navbar-hidden"}`}>

        {/* ── ROW 1: CONTACT BAR (desktop only) ── */}
        <div className="hidden lg:block bg-[#0560cc]">
          <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-10">

            {/* Left — 24/7 WhatsApp */}
            <a href="https://api.whatsapp.com/send?phone=17273902419"
              target="_blank"
              rel="noreferrer"
              className="contact-chip flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 group">

              <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
                <span className="wa-pulse absolute inset-0 rounded-full" />
                <MessageCircle size={12} className="text-[#25d366] relative z-10" />
              </span>
              <span className="text-[11px] font-semibold text-white tracking-wide">
                24/7 WhatsApp
              </span>
              {/* ✅ was text-white/70 — now text-white */}
              <span className="text-[11px] font-semibold text-white tracking-wide">
                +1 (727) 390-2419
              </span>
            </a>

            

            {/* Right — Call + Email chips */}
            <div className="flex items-center gap-1">

              <a href="tel:+17273902419"
                className="contact-chip flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10"
              >
                {/* ✅ was text-white/80 — now text-white */}
                <Phone size={11} className="text-white shrink-0" />
                <span className="text-[11px] font-semibold text-white tracking-wide">
                  +1 (727) 390-2419
                </span>
              </a>

              {/* ✅ was text-white/25 (nearly invisible) — now text-white/60 */}
              <span className="text-white/60 text-xs mx-1">|</span>

            
              <a href="mailto:support@internationalschooling.org"
                className="contact-chip flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10"
              >
                <Mail size={11} className="text-white shrink-0" />
                <span className="text-[11px] font-semibold text-white tracking-wide">
                  support@internationalschooling.org
                </span>
              </a>

            </div>
          </div>
        </div>

        {/* ── ROW 2: MAIN NAV ── */}
        <div className="bg-white shadow-md border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto px-3 lg:px-6 flex items-center h-[3.75rem]">

            <a href="/" className="shrink-0 flex items-center">
              <Image
                src="/logo.avif"
                alt="International Schooling"
                width={200}
                height={44}
                className="h-6 lg:h-8 w-auto object-contain"
                priority
              />
            </a>

            <div className="hidden lg:flex items-center gap-2 ml-auto">
              {ctaLinks.map((cta) =>
                cta.primary ? (
                  <a key={cta.label}
                    href={cta.href}
                    target={cta.external ? "_blank" : undefined}
                    rel={cta.external ? "noreferrer" : undefined}
                    className="cta-btn px-5 py-2 text-[12.5px] font-bold tracking-widest uppercase bg-[#077ffb] text-white rounded-full hover:bg-[#077ffb] transition-colors"
                  >
                    {cta.label}
                  </a>
                ) : (
                  <a key={cta.label}
                    href={cta.href}
                    target={cta.external ? "_blank" : undefined}
                    rel={cta.external ? "noreferrer" : undefined}
                    className="px-4 py-2 text-[12.5px] font-semibold tracking-wide text-[#1a1a1a] border border-gray-200 rounded-full hover:border-[#077ffb] hover:text-[#077ffb] transition-colors"
                  >
                    {cta.label}
                  </a>
                )
              )}
            </div>

            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <a href="/enrollment"
                className="cta-btn px-3 py-1.5 text-[11px] font-bold tracking-wide bg-[#077ffb] text-white rounded-full"
              >
                ENROLL NOW
              </a>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors"
              >
                {menuOpen
                  ? <X size={18} className="text-[#077ffb]" />
                  : <Menu size={18} className="text-[#077ffb]" />
                }
              </button>
            </div>

          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {menuOpen && (
          <div className="mobile-menu-anim lg:hidden bg-white shadow-xl border-b border-gray-200">

            <div className="bg-[#0560cc] px-4 py-4 flex flex-col gap-3">

              <a href="https://api.whatsapp.com/send?phone=17273902419"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
              >
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#25d366]/20 shrink-0">
                  <span className="wa-pulse absolute inset-0 rounded-full" />
                  <MessageCircle size={15} className="text-[#25d366] relative z-10" />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">24/7 WhatsApp Support</p>
                  <p className="text-[13px] font-semibold text-white">+1 (727) 390-2419</p>
                </div>
              </a>

              <a href="tel:+17273902419"
                className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                  <Phone size={14} className="text-white" />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-widest">Available on Call</p>
                  <p className="text-[13px] font-semibold text-white">+1 (727) 390-2419</p>
                  {/* ✅ was text-white/60 — now text-white/80 */}
                  <p className="text-[10px] text-white mt-0.5">10:00 AM – 7:00 PM (UTC +08:00)</p>
                </div>
              </a>

              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold text-white uppercase tracking-widest px-1">Email Us</p>
                {["info@internationalschooling.org", "support@internationalschooling.org"].map((email) => (
                  <a key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2.5"
                  >
                    <Mail size={13} className="text-white shrink-0" />
                    {/* ✅ was text-white/90 — now text-white */}
                    <span className="text-[12px] text-white font-medium">{email}</span>
                  </a>
                ))}
              </div>

            </div>

            <div className="px-4 py-4 flex flex-col gap-2.5">
              {ctaLinks.map((cta) => (
                
                 <a key={cta.label}
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`cta-btn flex items-center justify-center py-3 text-[13px] font-semibold rounded-xl transition-colors ${
                    cta.primary
                      ? "bg-[#f97316] text-white hover:bg-[#ea6c0a]"
                      : "border border-gray-200 bg-white text-[#444] hover:border-[#077ffb] hover:text-[#077ffb]"
                  }`}
                >
                  {cta.label}
                </a>
              ))}
            </div>

          </div>
        )}

      </header>
    </>
  );
}