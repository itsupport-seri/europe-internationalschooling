"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";

const SLIDES = [
  { id: 1, src: "/slider/1.webp", alt: "Students learning online",    kb: "zoom-in"   },
  { id: 2, src: "/slider/2.webp", alt: "Global classroom",            kb: "pan-left"  },
  { id: 3, src: "/slider/3.webp", alt: "Teachers and students",       kb: "zoom-out"  },
  { id: 4, src: "/slider/4.webp", alt: "Online learning environment", kb: "pan-right" },
];
const DURATION = 6000;

const STATS = [
  { value: "15,000+", label: "Students"  },
  { value: "190+",    label: "Countries" },
  { value: "600+",    label: "Teachers"  },
];

const ACCREDS = ["NEASC", "WASC", "Cognia", "College Board"];

export default function HeroSection() {
  const [cur,       setCur]       = useState(0);
  const [prev,      setPrev]      = useState(null);
  const [animating, setAnimating] = useState(false);
  const [progress,  setProgress]  = useState(0);

  const rafRef     = useRef(null);
  const startRef   = useRef(null);
  const timerRef   = useRef(null);
  const heroRef    = useRef(null);
  const badgeRef   = useRef(null);
  const eyebrowRef = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const pillsRef   = useRef(null);
  const ctaRef     = useRef(null);
  const statsRef   = useRef(null);
  const total      = SLIDES.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(badgeRef.current,
          { opacity: 0, y: 18, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 }, 0.25)
        .fromTo(eyebrowRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .fromTo(line1Ref.current,
          { opacity: 0, y: 36, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8 }, 0.5)
        .fromTo(line2Ref.current,
          { opacity: 0, y: 36, skewY: 1.5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8 }, 0.62)
        .fromTo(pillsRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55 }, 0.78)
        .fromTo(ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 }, 0.88)
        .fromTo(statsRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55 }, 1.05);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!badgeRef.current) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.8 });
    tl.to(badgeRef.current, {
      boxShadow: "0 0 0 8px rgba(251,146,60,0)",
      duration: 1.2, ease: "power1.inOut",
    });
    return () => tl.kill();
  }, []);

  const runProgress = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();
    const tick = (now) => {
      const p = Math.min(((now - startRef.current) / DURATION) * 100, 100);
      setProgress(p);
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const goTo = useCallback((idx) => {
    if (animating || idx === cur) return;
    setAnimating(true);
    setPrev(cur);
    setCur(idx);
    setProgress(0);
    cancelAnimationFrame(rafRef.current);
    setTimeout(() => { setPrev(null); setAnimating(false); runProgress(); }, 900);
  }, [animating, cur, runProgress]);

  const goNext = useCallback(() => goTo((cur + 1) % total), [cur, total, goTo]);
  const goPrev = useCallback(() => goTo((cur - 1 + total) % total), [cur, total, goTo]);

  useEffect(() => {
    clearTimeout(timerRef.current);
    runProgress();
    timerRef.current = window.setTimeout(goNext, DURATION);
    return () => { clearTimeout(timerRef.current); cancelAnimationFrame(rafRef.current); };
  }, [cur, goNext, runProgress]);

  const kbMs = DURATION + 1000;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        @keyframes kb-zi { from{transform:scale(1) translate(0,0)} to{transform:scale(1.1) translate(-1%,-.4%)} }
        @keyframes kb-zo { from{transform:scale(1.1) translate(0,0)} to{transform:scale(1) translate(1%,.4%)} }
        @keyframes kb-pl { from{transform:scale(1.08) translateX(2.5%)} to{transform:scale(1.08) translateX(-2.5%)} }
        @keyframes kb-pr { from{transform:scale(1.08) translateX(-2.5%)} to{transform:scale(1.08) translateX(2.5%)} }
        @media(min-width:640px){
          .kb-zi{animation:kb-zi ${kbMs}ms ease-in-out both}
          .kb-zo{animation:kb-zo ${kbMs}ms ease-in-out both}
          .kb-pl{animation:kb-pl ${kbMs}ms ease-in-out both}
          .kb-pr{animation:kb-pr ${kbMs}ms ease-in-out both}
        }

        .hs-slide{position:absolute;inset:0;z-index:1;opacity:0;pointer-events:none}
        .hs-slide.active{z-index:3;animation:sIn .85s cubic-bezier(.25,.46,.45,.94) forwards}
        .hs-slide.leaving{z-index:2;animation:sOut .85s cubic-bezier(.55,0,1,.45) forwards}
        @keyframes sIn{from{opacity:0}to{opacity:1}}
        @keyframes sOut{from{opacity:1}to{opacity:0}}

        .hero-outer.grain::before{
          content:'';
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E");
          opacity:.03;
          pointer-events:none;
          z-index:0;
          animation:grainShift 8s steps(10) infinite;
        }
        @media(max-width:639px){
          .hero-outer.grain::before{
            height:auto;
            bottom:unset;
            height:62vw;
            min-height:220px;
            max-height:320px;
          }
        }
        @keyframes grainShift{
          0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)}
          30%{transform:translate(3%,2%)} 50%{transform:translate(-1%,3%)}
          70%{transform:translate(2%,-1%)} 90%{transform:translate(-3%,1%)}
        }

        @keyframes shimmer{
          0%{background-position:-200% center}100%{background-position:200% center}
        }
        .btn-shimmer{background-size:200% auto;animation:shimmer 3s linear infinite}

        .seg{
          height:2px;border-radius:99px;flex:1;overflow:hidden;
          background:rgba(255,255,255,.18);cursor:pointer;border:none;
          position:relative;transition:flex .45s cubic-bezier(.34,1.56,.64,1);
        }
        .seg.active{flex:2.8;background:rgba(255,255,255,.28)}
        .seg-fill{
          position:absolute;inset-y:0;left:0;
          background:linear-gradient(90deg,#60a5fa,#fff);border-radius:99px;
        }

        .arr-btn{
          border-radius:50%;
          border:1.5px solid rgba(255,255,255,.22);
          background:rgba(15,30,74,.42);
          backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
          display:flex;align-items:center;justify-content:center;
          color:#fff;cursor:pointer;
          transition:background .2s,border-color .2s,transform .15s;
          flex-shrink:0;padding:0;
        }
        .arr-btn:hover{background:rgba(7,127,251,.55);border-color:#4f9eff;transform:scale(1.08)}
        .arr-btn:active{transform:scale(.92)}

        .mdot{
          width:6px;height:6px;border-radius:50%;
          background:rgba(255,255,255,.35);cursor:pointer;border:none;padding:0;
          transition:background .28s,transform .28s;
        }
        .mdot.active{background:#fff;transform:scale(1.5)}

        .accred-pill{
          font-family:'DM Sans',sans-serif;
          font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;
          color:rgba(255,255,255,.65);
          border:1px solid rgba(255,255,255,.16);
          border-radius:99px;padding:3px 10px;
          background:rgba(255,255,255,.07);
          backdrop-filter:blur(4px);white-space:nowrap;
        }

        .headline{font-family:'Cormorant Garamond',Georgia,serif}
        .body-font{font-family:'DM Sans',sans-serif}
        .gsap-init{opacity:0}

        .accent-line{
          position:absolute;top:0;right:0;bottom:0;width:3px;z-index:25;
          background:linear-gradient(to bottom,#3b82f6 0%,rgba(59,130,246,.12) 60%,transparent 100%);
          pointer-events:none;
        }
        .vert-text{
          writing-mode:vertical-rl;text-orientation:mixed;
          letter-spacing:.2em;font-size:9px;text-transform:uppercase;
          color:rgba(255,255,255,.2);user-select:none;
          position:absolute;right:18px;top:50%;transform:translateY(-50%);
          z-index:22;pointer-events:none;
        }

        @media(min-width:640px){
          .hero-outer{
            position:relative;width:100%;overflow:hidden;background:#07111f;
            height:90dvh;min-height:580px;max-height:980px;
          }
          .slider-box{
            position:absolute;inset:0;width:100%;height:100%;overflow:hidden;
          }
          .copy-desktop{display:flex !important}
          .copy-mobile{display:none !important}
          .stats-desktop{display:flex !important}
          .stats-mobile{display:none !important}
          .ctrl-desktop{display:flex !important}
          .ctrl-mobile{display:none !important}
          .mobile-dots{display:none !important}
          .accent-line{display:block}
          .vert-text{display:block}
        }

        @media(max-width:639px){
          .hero-outer{
            height:auto !important;
            min-height:unset !important;
            max-height:unset !important;
            position:relative;
            display:flex;
            flex-direction:column;
            background:#fff;
            overflow:visible;
          }
          .slider-box{
            position:relative;
            width:100%;
            height:62vw;
            min-height:220px;
            max-height:320px;
            overflow:hidden;
            flex-shrink:0;
            isolation:isolate;
          }
          .copy-desktop{display:none !important}
          .stats-desktop{display:none !important}
          .ctrl-desktop{display:none !important}
          .accent-line{display:none}
          .vert-text{display:none}
          .copy-mobile{display:block !important}
          .stats-mobile{display:flex !important}
          .ctrl-mobile{display:flex !important}
          .mobile-dots{display:flex !important}
        }
      `}</style>

      <section ref={heroRef} className="grain hero-outer" aria-label="Hero slider">
        <div className="slider-box">

          {SLIDES.map((s, i) => {
            const kbMap = {"zoom-in":"kb-zi","zoom-out":"kb-zo","pan-left":"kb-pl","pan-right":"kb-pr"};
            return (
              <div
                key={s.id}
                className={`hs-slide${i===cur?" active":""}${i===prev?" leaving":""}`}
                aria-hidden={i!==cur}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={s.src}
                    alt={s.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`w-full h-full object-cover object-center select-none${i===cur?` ${kbMap[s.kb]}`:""}`}
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}

          <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
            style={{background:"linear-gradient(105deg,rgba(5, 14, 40, 0.29) 0%,rgba(7, 18, 50, 0.2) 10%,rgba(8, 22, 58, 0.17) 5%,rgba(8, 22, 58, 0.18) 7%,transparent 100%)"}} />
          <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
            style={{background:"linear-gradient(to top,rgba(5, 10, 30, 0.28) 0%,rgba(5, 10, 30, 0.19) 22%,transparent 55%)"}} />
          <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
            style={{background:"linear-gradient(to bottom,rgba(7,14,42,.5) 0%,transparent 30%)"}} />
          <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block"
            style={{background:"radial-gradient(ellipse 60% 80% at 12% 55%,rgba(59, 131, 246, 0.07) 0%,transparent 20%)"}} />

          <div className="absolute inset-0 z-10 pointer-events-none sm:hidden"
            style={{background:"linear-gradient(to top,rgba(0, 0, 0, 0.28) 0%,rgba(0, 0, 0, 0.08) 25%,transparent 10%)"}} />

          <div
            className="copy-desktop absolute inset-0 items-center z-20"
            style={{pointerEvents:"none"}}
          >
            <div className="w-full px-8 md:px-14 lg:px-20">
              <div className="max-w-[600px]" style={{pointerEvents:"auto"}}>

                <div ref={badgeRef} className="gsap-init inline-flex items-center gap-2 mb-4 md:mb-5"
                  style={{
                    background:"linear-gradient(135deg,rgba(255,237,213,.12),rgba(254,215,170,.08))",
                    border:"1px solid rgba(251,146,60,.35)",borderRadius:"99px",
                    padding:"5px 14px 5px 10px",backdropFilter:"blur(8px)",
                    boxShadow:"0 0 0 0 rgba(251,146,60,.35)",
                  }}>
                  <span style={{fontSize:"11px",lineHeight:"1",background:"linear-gradient(135deg,#fb923c,#fbbf24)",borderRadius:"50%",width:"18px",height:"18px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✦</span>
                  <span className="body-font" style={{fontSize:"11px",fontWeight:700,letterSpacing:".08em",color:"#fed7aa"}}>
                    Few Seats for July 2026 Batch
                  </span>
                </div>

                <p ref={eyebrowRef} className="gsap-init body-font mb-2"
                  style={{fontSize:"10px",fontWeight:600,letterSpacing:".25em",textTransform:"uppercase",color:"#93c5fd"}}>
                  Fully Accredited · KG – Grade 12 · American Curriculum
                </p>

                <div ref={line1Ref} className="gsap-init">
                  <h1 className="headline text-white"
                    style={{fontSize:"24px",lineHeight:1.04,fontWeight:700,marginBottom:"0.05rem"}}>
                    The Most Trusted &amp; Recommended
                  </h1>
                  
                </div>

                <div ref={line2Ref} className="gsap-init">
                  <h1 className="headline text-yellow-400 text-[25px]"
                  style={{fontSize:"clamp(2.1rem,5.8vw,4.4rem)",lineHeight:1.06,fontWeight:700,}}
                    >
                    American Online School for 
                  </h1>
                  <h1 className="headline"
                    style={{fontSize:"clamp(2.1rem,5.8vw,4.4rem)",lineHeight:1.06,fontWeight:700,marginBottom:"1rem",background:"linear-gradient(135deg,#34d399 0%,#10b981 60%,#059669 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                    European Families
                  </h1>
                </div>

                <div ref={pillsRef} className="gsap-init flex flex-wrap gap-2 mb-5">
                  {ACCREDS.map(a=>(
                    <span key={a} className="accred-pill body-font">{a}</span>
                  ))}
                </div>

                <div ref={ctaRef} className="gsap-init">
                  <a href="https://europe.internationalschooling.org/#book-demo"
                    className="btn-shimmer body-font"
                    style={{display:"inline-flex",alignItems:"center",gap:"7px",padding:"13px 26px",borderRadius:"99px",background:"linear-gradient(135deg,#2563eb 0%,#4f46e5 50%,#7c3aed 100%,#2563eb)",color:"#fff",fontWeight:700,fontSize:"12px",letterSpacing:".09em",textTransform:"uppercase",textDecoration:"none",boxShadow:"0 0 32px rgba(99,102,241,.45),inset 0 1px 0 rgba(255,255,255,.18)",transition:"transform .18s,box-shadow .18s"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 40px rgba(99,102,241,.6),inset 0 1px 0 rgba(255,255,255,.18)"}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 0 32px rgba(99,102,241,.45),inset 0 1px 0 rgba(255,255,255,.18)"}}>
                    Book Free Demo
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>

              </div>
            </div>
          </div>

          <div ref={statsRef}
            className="stats-desktop gsap-init absolute bottom-7 left-8 md:left-14 lg:left-20 items-center gap-6 md:gap-8"
            style={{zIndex:22}}>
            {STATS.map((s,i)=>(
              <div key={s.label} className="flex items-center gap-6 md:gap-8">
                {i>0 && <div style={{width:"1px",height:"26px",background:"rgba(255,255,255,.14)",flexShrink:0}} />}
                <div>
                  <p className="headline text-white leading-none"
                    style={{fontSize:"clamp(1.1rem,2.8vw,1.45rem)",fontWeight:700}}>{s.value}</p>
                  <p className="body-font text-white/40 mt-0.5"
                    style={{fontSize:"9px",letterSpacing:".2em",textTransform:"uppercase",fontWeight:600}}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ctrl-desktop absolute bottom-5 right-6 z-30 flex-col items-end gap-2.5">
            <div style={{display:"flex",alignItems:"baseline",gap:"3px"}}>
              <span className="headline text-white" style={{fontSize:"1.35rem",fontWeight:700,lineHeight:1}}>{String(cur+1).padStart(2,"0")}</span>
              <span className="body-font text-white/25" style={{fontSize:"11px",padding:"0 2px"}}>/</span>
              <span className="headline text-white/35" style={{fontSize:"12px",lineHeight:1}}>{String(total).padStart(2,"0")}</span>
            </div>
            <div style={{display:"flex",gap:"5px",width:"130px"}}>
              {SLIDES.map((_,i)=>(
                <button key={i} onClick={()=>goTo(i)} aria-label={`Slide ${i+1}`}
                  className={`seg${i===cur?" active":""}`}>
                  {i===cur && <div className="seg-fill" style={{width:`${progress}%`}} />}
                </button>
              ))}
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={goPrev} className="arr-btn" style={{width:"40px",height:"40px"}} aria-label="Previous">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onClick={goNext} className="arr-btn" style={{width:"40px",height:"40px"}} aria-label="Next">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <div className="ctrl-mobile absolute bottom-0 left-0 right-0 z-30 items-center justify-between px-3 py-2"
            style={{background:"rgba(0,0,0,.58)",backdropFilter:"blur(8px)"}}>
            <div className="mobile-dots items-center gap-1.5">
              {SLIDES.map((_,i)=>(
                <button key={i} onClick={()=>goTo(i)} aria-label={`Slide ${i+1}`}
                  className={`mdot${i===cur?" active":""}`} />
              ))}
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              <button onClick={goPrev} className="arr-btn" style={{width:"30px",height:"30px"}} aria-label="Previous">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button onClick={goNext} className="arr-btn" style={{width:"30px",height:"30px"}} aria-label="Next">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <div className="accent-line" />
          <span className="vert-text body-font" aria-hidden="true">International Online School</span>
        </div>

        <div className="copy-mobile" style={{background:"#fff",padding:"20px 18px 0"}}>

          <div className="inline-flex items-center gap-2 mb-3"
            style={{background:"linear-gradient(135deg,rgba(255,237,213,.9),rgba(254,215,170,.6))",border:"1px solid rgba(251,146,60,.5)",borderRadius:"99px",padding:"5px 13px 5px 9px"}}>
            <span style={{fontSize:"10px",lineHeight:"1",background:"linear-gradient(135deg,#fb923c,#fbbf24)",borderRadius:"50%",width:"16px",height:"16px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✦</span>
            <span className="body-font" style={{fontSize:"10px",fontWeight:700,letterSpacing:".07em",color:"#92400e"}}>
              Few Seats for July 2026 Batch
            </span>
          </div>

          <p className="body-font mb-1.5" style={{fontSize:"9px",fontWeight:600,letterSpacing:".2em",textTransform:"uppercase",color:"#1d4ed8"}}>
            Fully Accredited · KG – Grade 12 · American Curriculum
          </p>

          <h1 className="headline" style={{fontSize:"clamp(1.65rem,7vw,2.3rem)",lineHeight:1.06,fontWeight:700,color:"#0f1e3e",marginBottom:"0.05rem"}}>
            The Most Trusted &amp; Recommended
          </h1>
          <h1 className="headline"
            style={{fontSize:"clamp(1.85rem,8vw,2.6rem)",lineHeight:1.04,fontWeight:700,marginBottom:"0.05rem",background:"linear-gradient(135deg,#1d4ed8,#4f46e5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            American Online
          </h1>
          <h1 className="headline"
            style={{fontSize:"clamp(1.85rem,8vw,2.6rem)",lineHeight:1.06,fontWeight:700,marginBottom:"12px",background:"linear-gradient(135deg,#059669,#10b981)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            School
          </h1>

          <p className="body-font mb-3" style={{fontSize:"13px",lineHeight:1.62,color:"#374151"}}>
            No Stress. No Commute. No Limits.{" "}
            <span style={{color:"#9ca3af"}}>Thousands of Happy &amp; Satisfied Students across 190+ countries.</span>
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {ACCREDS.map(a=>(
              <span key={a} className="body-font"
                style={{fontSize:"9px",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:"#374151",border:"1px solid rgba(0,0,0,.12)",borderRadius:"99px",padding:"3px 10px",background:"rgba(0,0,0,.04)",whiteSpace:"nowrap"}}>
                {a}
              </span>
            ))}
          </div>

          <div style={{paddingBottom:"0"}}>
            <a href="https://europe.internationalschooling.org/#book-demo"
              className="btn-shimmer body-font"
              style={{display:"inline-flex",alignItems:"center",gap:"7px",padding:"13px 26px",borderRadius:"99px",background:"linear-gradient(135deg,#2563eb 0%,#4f46e5 50%,#7c3aed 100%,#2563eb)",color:"#fff",fontWeight:700,fontSize:"12px",letterSpacing:".09em",textTransform:"uppercase",textDecoration:"none",boxShadow:"0 4px 24px rgba(99,102,241,.4),inset 0 1px 0 rgba(255,255,255,.18)"}}>
              Book Free Demo
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        <div className="stats-mobile"
          style={{background:"#fff",padding:"16px 18px 22px",borderTop:"1px solid rgba(0,0,0,.07)",marginTop:"4px",alignItems:"center",gap:"0"}}>
          {STATS.map((s,i)=>(
            <div key={s.label} style={{display:"flex",alignItems:"center",flex:1,justifyContent:"center"}}>
              {i>0 && <div style={{width:"1px",height:"28px",background:"rgba(0,0,0,.1)",flexShrink:0,marginRight:"0"}} />}
              <div style={{textAlign:"center",paddingLeft:i>0?"14px":"0"}}>
                <p className="headline" style={{fontSize:"1.25rem",fontWeight:700,lineHeight:1,color:"#0f1e3e"}}>{s.value}</p>
                <p className="body-font" style={{fontSize:"8px",letterSpacing:".2em",textTransform:"uppercase",color:"#9ca3af",fontWeight:600,marginTop:"3px"}}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
}