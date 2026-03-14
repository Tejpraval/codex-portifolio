import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Flag, Sparkles } from "lucide-react";
import { achievements } from "../../data/portfolio";
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
        eyebrow="Achievements"
        title="Recognition for initiative, contribution, and visible community impact."
        copy="Short-form wins that reflect leadership, consistency, and the ability to contribute beyond assigned coursework."
      />

      <div className="achievements-reveal achievement-hero glass-panel relative overflow-hidden rounded-[34px] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,24,0.15),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_24%)]" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brandSoft">Standout Signals</p>
            <h3 className="mt-4 max-w-2xl text-2xl font-semibold text-white md:text-3xl">
              Achievements that show ownership, follow-through, and visible contribution.
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Recognitions</p>
              <p className="mt-2 text-lg font-semibold text-white">2 highlights</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Themes</p>
              <p className="mt-2 text-lg font-semibold text-white">Leadership + Community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {achievements.map((item, index) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -8, rotateX: 1.2, rotateY: index % 2 === 0 ? -1.2 : 1.2 }}
            transition={{ type: "spring", stiffness: 210, damping: 18 }}
            className="achievements-reveal achievement-card glass-panel group relative overflow-hidden rounded-[30px]"
            style={{ transformPerspective: 1400 }}
          >
            <div className="achievement-card-sheen pointer-events-none absolute inset-y-0 left-[-30%] w-[36%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.12),transparent_28%)]" />

            <div className="relative aspect-[16/8.2] overflow-hidden border-b border-white/10 bg-[#0b1020]">
              <img
                src={item.image}
                alt={`${item.title} achievement`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(6,7,10,0.92)_100%)]" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-100 backdrop-blur-xl">
                {index === 0 ? <BadgeCheck className="h-3.5 w-3.5 text-brandSoft" /> : <Flag className="h-3.5 w-3.5 text-brandSoft" />}
                {item.date}
              </div>
            </div>

            <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.06] p-3 text-brand">
                    {index === 0 ? <BadgeCheck className="h-5 w-5" /> : <Flag className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brandSoft">{item.organization}</p>
                    <h3 className="mt-1.5 text-[1.65rem] font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-brandSoft" />
                Achievement highlight
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-300 transition-colors duration-300 group-hover:border-brand/20 group-hover:bg-white/[0.08]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
