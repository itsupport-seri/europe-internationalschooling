import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/sections/HeroSection";
import Whychoosesection from "@/app/components/sections/Whychoosesection";
import Challengessection from "@/app/components/sections/Challengessection";
import Accreditationsection from "@/app/components/sections/Accreditationsection";
import Designedforsection from "@/app/components/sections/Designedforsection";
import Learningstylesection from "@/app/components/sections/Learningstylesection";
import Reviewssection from "@/app/components/sections/Reviewssection";
import Graduationsection from "@/app/components/sections/Graduationsection";
import FAQSection from "@/app/components/sections/FAQSection";
import Neascnewssection from "@/app/components/sections/Neascnewssection";
import SuccessStories from "@/app/components/sections/SuccessStories";
import Footer from "./components/Footer";



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

