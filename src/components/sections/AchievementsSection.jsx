import { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { softSkills, technicalActivities } from "../../data/portfolio";
import { gsap } from "../../lib/gsap";
import { SectionHeader } from "../ui/SectionHeader";

export function AchievementsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".achievements-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="section-shell py-24 md:py-32">
      <SectionHeader
        eyebrow="Soft Skills"
        title="Soft skills and technical activities selected for relevance instead of filler content."
        copy="This section keeps the list tight with four soft skills and two technical extracurricular highlights."
      />

      <div className="achievements-reveal achievement-hero glass-panel relative overflow-hidden rounded-[34px] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,24,0.15),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_24%)]" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brandSoft">Soft Skills & Activities</p>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold text-white md:text-3xl">
              Relevant interpersonal strengths backed by visible technical activity.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {technicalActivities.map((item) => (
          <article
            key={item.title}
            className="achievements-reveal glass-panel group relative overflow-hidden rounded-[30px] p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.12),transparent_28%)]" />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-3 text-brand">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brandSoft">Technical Activity</p>
                  <h3 className="mt-1.5 text-[1.65rem] font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
