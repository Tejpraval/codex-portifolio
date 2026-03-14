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
import { ProjectDetailPage } from "./components/pages/ProjectDetailPage";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ResumeSection } from "./components/sections/ResumeSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { BackgroundDepth } from "./components/ui/BackgroundDepth";
import { CustomCursor } from "./components/ui/CustomCursor";
import { projects } from "./data/portfolio";
import { gsap } from "./lib/gsap";

function getRouteFromHash(hash) {
  if (hash.startsWith("#/projects/")) {
    return {
      type: "project",
      slug: hash.replace("#/projects/", ""),
    };
  }

  return { type: "home" };
}

function App() {
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro());
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash));
  const mainRef = useRef(null);

  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash;
      setRoute(getRouteFromHash(nextHash));

      if (nextHash.startsWith("#/projects/") || nextHash === "" || nextHash === "#") {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const target = document.querySelector(nextHash);
          if (target) {
            target.scrollIntoView({ behavior: "auto", block: "start" });
          }
        });
      });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

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
          {route.type === "project" ? (
            <main>
              <ProjectDetailPage project={projects.find((project) => project.slug === route.slug)} />
            </main>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </MouseProvider>
  );
}

export default App;
