import { useEffect, useRef, useState } from "react";
import { MouseProvider } from "./hooks/useGlobalMouse";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { AboutSection } from "./components/sections/AboutSection";
import { AchievementsSection } from "./components/sections/AchievementsSection";
import { ClosingSection } from "./components/sections/ClosingSection";
import { ContactSection } from "./components/sections/ContactSection";
import { CertificationsSection } from "./components/sections/CertificationsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { HeroSection } from "./components/sections/HeroSection";
import { IntroLoader, shouldShowIntro } from "./components/intro/IntroLoader";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ResumeSection } from "./components/sections/ResumeSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { BackgroundDepth } from "./components/ui/BackgroundDepth";
import { CustomCursor } from "./components/ui/CustomCursor";
import { gsap } from "./lib/gsap";

function App() {
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro());
  const mainRef = useRef(null);

  useEffect(() => {
    if (!mainRef.current || showIntro) return undefined;

    const tween = gsap.fromTo(
      mainRef.current,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out" },
    );

    return () => tween.kill();
  }, [showIntro]);

  return (
    <MouseProvider>
      <div className="relative overflow-x-clip">
        {showIntro ? <IntroLoader onComplete={() => setShowIntro(false)} /> : null}
        <ScrollProgress />
        <BackgroundDepth />
        <CustomCursor />

        <div ref={mainRef} className="relative z-10">
          <Navbar />
          <main>
            {/* Primary portfolio narrative: immersive intro, credibility, work, and contact. */}
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <AchievementsSection />
            <CertificationsSection />
            <ResumeSection />
            <ContactSection />
            <ClosingSection />
          </main>
          <Footer />
        </div>
      </div>
    </MouseProvider>
  );
}

export default App;
