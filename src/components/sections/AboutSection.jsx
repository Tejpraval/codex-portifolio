import { useEffect, useRef } from "react";
import { highlights, interests, stats } from "../../data/portfolio";
import { useTiltCard } from "../../hooks/useTiltCard";
import { gsap } from "../../lib/gsap";
import { SectionHeader } from "../ui/SectionHeader";

function Counter({ value, suffix, label }) {
  const numberRef = useRef(null);

  useEffect(() => {
    const node = numberRef.current;
    if (!node) return undefined;

    const state = { value: 0 };
    const tween = gsap.to(state, {
      value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: node,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        node.textContent = `${Math.round(state.value)}${suffix}`;
      },
    });

    return () => tween.kill();
  }, [suffix, value]);

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
      <p ref={numberRef} className="text-4xl font-semibold text-white">
        0{suffix}
      </p>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </div>
  );
}

export function AboutSection() {
  const sectionRef = useRef(null);
  const { ref, glareRef } = useTiltCard({ maxRotate: 4, depth: 10 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-photo-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".about-photo-ring",
        { scale: 0.82, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 76%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-shell py-24 md:py-32">
      <SectionHeader
        eyebrow="About"
        title="Engineering software that feels both intelligent and refined."
        copy="Computer Science (AI & ML) student at Lovely Professional University focused on building scalable backend systems, intelligent AI applications, and modern web platforms."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel glow-ring rounded-[32px] p-7 md:p-8">
          <p className="text-lg leading-8 text-slate-200">
            works at the intersection of product design, backend architecture, and applied
            machine learning, with a strong preference for software that ships cleanly and scales
            responsibly.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-sm text-brandSoft"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {stats.map((item) => (
              <Counter key={item.label} {...item} />
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="glass-panel rounded-[28px] p-6 transition-all duration-300 hover:border-brand/30 hover:shadow-glow"
                >
                  <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">{item.copy}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="about-photo-reveal relative">
          <div className="about-photo-ring pointer-events-none absolute inset-0 m-auto h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.2),transparent_62%)] blur-[70px]" />
          <div className="about-photo-shell relative mx-auto max-w-md perspective-[1200px]">
            <article
              ref={ref}
              className="glass-panel about-photo-card group relative overflow-hidden rounded-[36px] p-4 md:p-5"
              data-interactive="true"
            >
              <div ref={glareRef} className="pointer-events-none absolute inset-0 opacity-20" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.22),transparent_38%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-black/20">
                <img
                  src="/images/tej-praval.png"
                  alt="Tej Praval"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="relative mt-4 flex items-center justify-between gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3">
                <div>
                  <p className="text-lg font-semibold text-white">Tej Praval</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Full Stack Developer | AI & ML
                  </p>
                </div>
                <div className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-brandSoft">
                  Profile
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
