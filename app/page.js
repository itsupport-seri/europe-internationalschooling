import dynamic from "next/dynamic";
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/sections/HeroSection";

// Dynamic imports for below-fold components — reduces initial JS bundle dramatically
const Whychoosesection = dynamic(() => import("@/app/components/sections/Whychoosesection"), { ssr: true });
const Challengessection = dynamic(() => import("@/app/components/sections/Challengessection"), { ssr: true });
const Accreditationsection = dynamic(() => import("@/app/components/sections/Accreditationsection"), { ssr: true });
const Designedforsection = dynamic(() => import("@/app/components/sections/Designedforsection"), { ssr: true });
const Learningstylesection = dynamic(() => import("@/app/components/sections/Learningstylesection"), { ssr: true });
const Reviewssection = dynamic(() => import("@/app/components/sections/Reviewssection"), { ssr: true });
const Graduationsection = dynamic(() => import("@/app/components/sections/Graduationsection"), { ssr: true });
const SuccessStories = dynamic(() => import("@/app/components/sections/SuccessStories"), { ssr: true });
const FAQSection = dynamic(() => import("@/app/components/sections/FAQSection"), { ssr: true });
const Neascnewssection = dynamic(() => import("@/app/components/sections/Neascnewssection"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: true });


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-0">
        <HeroSection />
        <Whychoosesection />
        <Challengessection />
        <Designedforsection />
        <Accreditationsection />
        <Learningstylesection />
        <Reviewssection />
        <Graduationsection />
        <SuccessStories />
        <FAQSection />
        <Neascnewssection />

      </main>
      <Footer />
    </>
  );
}

