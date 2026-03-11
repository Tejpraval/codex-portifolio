import { useEffect, useRef } from "react";
import { Braces, Database, Layers3, ServerCog, Sparkles, Wrench } from "lucide-react";
import { gsap } from "../../lib/gsap";
import { useTiltCard } from "../../hooks/useTiltCard";
import { SkillBadge } from "./SkillBadge";

const iconMap = {
  Languages: Braces,
  Frontend: Layers3,
  Backend: ServerCog,
  Database: Database,
  Tools: Wrench,
  Concepts: Sparkles,
};

export function SkillCategoryCard({ group, index }) {
  const { ref, glareRef } = useTiltCard({ maxRotate: 5, depth: 12 });
  const countRef = useRef(null);
  const badgeRowRef = useRef(null);
  const cardRef = useRef(null);
  const Icon = iconMap[group.title] ?? Sparkles;

  useEffect(() => {
    const node = countRef.current;
    if (!node) return undefined;

    const state = { value: 0 };
    const tween = gsap.to(state, {
      value: group.items.length,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        node.textContent = `${Math.round(state.value)} items`;
      },
    });

    return () => tween.kill();
  }, [group.items.length]);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || !badgeRowRef.current) return undefined;

    const badges = badgeRowRef.current.querySelectorAll(".skill-badge");
    const streak = node.querySelector(".skill-card-streak");

    const handleEnter = () => {
      gsap.to(node, {
        y: -8,
        duration: 0.35,
        ease: "power2.out",
        boxShadow: "0 24px 64px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,122,24,0.28), 0 0 40px rgba(255,122,24,0.18)",
      });
      gsap.to(badges, {
        y: (i) => (i % 2 === 0 ? -3 : -1),
        stagger: 0.03,
        duration: 0.28,
        ease: "power2.out",
      });
      if (streak) {
        gsap.fromTo(
          streak,
          { xPercent: -140, opacity: 0 },
          { xPercent: 140, opacity: 0.65, duration: 1.2, ease: "power2.out" },
        );
      }
    };

    const handleLeave = () => {
      gsap.to(node, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
      });
      gsap.to(badges, {
        y: 0,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    node.addEventListener("pointerenter", handleEnter);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div className="skills-card-shell">
      <article
        ref={(node) => {
          ref.current = node;
          cardRef.current = node;
        }}
        className="skills-card glass-panel relative overflow-hidden rounded-[30px] p-6 md:p-7"
        data-interactive="true"
        style={{ animationDelay: `${index * 0.12}s` }}
      >
        <div className="skill-card-streak pointer-events-none absolute inset-y-0 left-[-22%] w-24 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 blur-xl" />
        <div className="skills-card-glow pointer-events-none absolute inset-0 opacity-70" />
        <div ref={glareRef} className="pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-brand">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="skills-card-title text-xl font-semibold text-white md:text-2xl">
              {group.title}
            </h3>
          </div>
          <div className="skills-card-count-wrap text-right">
            <div ref={countRef} className="skills-card-count text-sm uppercase tracking-[0.24em] text-slate-500">
              0 items
            </div>
            <div className="mt-2 h-px w-20 bg-gradient-to-r from-brand/60 to-transparent" />
          </div>
        </div>

        <div className="skills-card-divider my-6" />

        <div ref={badgeRowRef} className="flex flex-wrap gap-3">
          {group.items.map((item, badgeIndex) => (
            <SkillBadge key={item} index={badgeIndex}>
              {item}
            </SkillBadge>
          ))}
        </div>
      </article>
    </div>
  );
}
