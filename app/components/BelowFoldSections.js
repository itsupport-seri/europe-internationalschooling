"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Whychoosesection = dynamic(() => import("@/app/components/sections/Whychoosesection"), { ssr: false });
const Challengessection = dynamic(() => import("@/app/components/sections/Challengessection"), { ssr: false });
const Designedforsection = dynamic(() => import("@/app/components/sections/Designedforsection"), { ssr: false });
const Accreditationsection = dynamic(() => import("@/app/components/sections/Accreditationsection"), { ssr: false });
const Learningstylesection = dynamic(() => import("@/app/components/sections/Learningstylesection"), { ssr: false });
const Reviewssection = dynamic(() => import("@/app/components/sections/Reviewssection"), { ssr: false });
const Graduationsection = dynamic(() => import("@/app/components/sections/Graduationsection"), { ssr: false });
const SuccessStories = dynamic(() => import("@/app/components/sections/SuccessStories"), { ssr: false });
const FAQSection = dynamic(() => import("@/app/components/sections/FAQSection"), { ssr: false });
const Neascnewssection = dynamic(() => import("@/app/components/sections/Neascnewssection"), { ssr: false });
const Footer = dynamic(() => import("@/app/components/Footer"), { ssr: false });

const sections = [
  { key: "why", minHeight: 760, Component: Whychoosesection },
  { key: "challenges", minHeight: 1080, Component: Challengessection },
  { key: "designed", minHeight: 680, Component: Designedforsection },
  { key: "accreditation", minHeight: 620, Component: Accreditationsection },
  { key: "learning", minHeight: 640, Component: Learningstylesection },
  { key: "reviews", minHeight: 980, Component: Reviewssection },
  { key: "graduation", minHeight: 900, Component: Graduationsection },
  { key: "success", minHeight: 900, Component: SuccessStories },
  { key: "faq", minHeight: 1180, Component: FAQSection },
  { key: "news", minHeight: 520, Component: Neascnewssection },
  { key: "footer", minHeight: 1500, Component: Footer },
];

function LazyMount({ children, minHeight }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;

    if (!("IntersectionObserver" in window)) {
      const id = window.setTimeout(() => setMounted(true), 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1400px 0px", threshold: 0 }
    );

    const node = ref.current;
    if (node) observer.observe(node);

    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div ref={ref} style={mounted ? undefined : { minHeight }} aria-busy={!mounted}>
      {mounted ? children : null}
    </div>
  );
}

export default function BelowFoldSections() {
  return (
    <>
      {sections.map(({ key, minHeight, Component }) => (
        <LazyMount key={key} minHeight={minHeight}>
          <Component />
        </LazyMount>
      ))}
    </>
  );
}
