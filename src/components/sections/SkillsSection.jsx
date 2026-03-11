import { useEffect, useRef } from "react";
import { skillGroups } from "../../data/portfolio";
import { gsap } from "../../lib/gsap";
import { useGlobalMouse } from "../../hooks/useGlobalMouse";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { SectionHeader } from "../ui/SectionHeader";
import { SkillCategoryCard } from "../ui/SkillCategoryCard";

export function SkillsSection() {
  const sectionRef = useRef(null);
  const shellRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const { mouse, isTouchDevice } = useGlobalMouse();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-heading-reveal",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".skills-title-underline",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".skills-card",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".skill-badge",
        { opacity: 0, y: 16, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 74%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isTouchDevice || reducedMotion || !sectionRef.current || !glowRef.current) return undefined;

    let frame = 0;
    const update = () => {
      const { x, y, normalizedX, normalizedY } = mouse.current;
      const bounds = sectionRef.current.getBoundingClientRect();

      if (y >= bounds.top && y <= bounds.bottom) {
        glowRef.current.style.opacity = "1";
        glowRef.current.style.transform = `translate(${x - bounds.left - 180}px, ${y - bounds.top - 180}px)`;
      } else {
        glowRef.current.style.opacity = "0";
      }

      shellRef.current?.style.setProperty("--skills-shift-x", `${normalizedX * 12}px`);
      shellRef.current?.style.setProperty("--skills-shift-y", `${normalizedY * 10}px`);
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [isTouchDevice, mouse, reducedMotion]);

  return (
    <section id="skills" ref={sectionRef} className="section-shell py-24 md:py-32">
      <div ref={shellRef} className="skills-section-shell relative overflow-hidden rounded-[40px] px-1 py-2">
        <div className="skills-mouse-glow pointer-events-none absolute top-0 left-0" ref={glowRef} />
        <div className="skills-backdrop-layer skills-backdrop-layer-a" />
        <div className="skills-backdrop-layer skills-backdrop-layer-b" />

        <div className="skills-heading-reveal relative z-10">
          <SectionHeader
            eyebrow="Skills"
            title="A modern stack across product interfaces, APIs, data, and systems design."
            copy="Each tool is presented with the same emphasis: capability matters, but execution quality matters more."
          />
          <div className="skills-title-glow" />
          <div className="skills-title-underline mt-[-1rem] mb-10 h-px w-full max-w-sm bg-gradient-to-r from-brand via-[#ffd4b5] to-transparent" />
        </div>

        <div className="mb-10 flex justify-end">
          <div className="skill-constellation glass-panel relative hidden h-28 w-48 overflow-hidden rounded-[24px] md:block">
            <div className="skill-constellation-dot left-[14%] top-[42%]" />
            <div className="skill-constellation-dot left-[32%] top-[24%]" />
            <div className="skill-constellation-dot left-[52%] top-[58%]" />
            <div className="skill-constellation-dot left-[72%] top-[34%]" />
            <div className="skill-constellation-dot left-[84%] top-[64%]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 192 112" fill="none">
              <path d="M28 52L62 28L100 66L136 38L164 72" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
            </svg>
            <div className="absolute inset-x-4 bottom-4 text-right text-[10px] uppercase tracking-[0.28em] text-slate-400">
              Skill Constellation
            </div>
          </div>
        </div>

        <div ref={gridRef} className="skills-grid grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <SkillCategoryCard key={group.title} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
