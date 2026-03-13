import { useEffect, useRef } from "react";
import { Award, BriefcaseBusiness } from "lucide-react";
import { experiences } from "../../data/portfolio";
import { gsap } from "../../lib/gsap";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";

export function ExperienceSection() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-entry",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section-shell py-24 md:py-32">
      <SectionHeader
        eyebrow="Experience"
        title="Internship experience across applied AI and frontend development."
        copy="A timeline of roles, responsibilities, and project work completed during internships."
      />

      <div ref={timelineRef} className="relative mx-auto max-w-4xl">
        <div className="timeline-line absolute left-4 top-0 h-full w-px bg-gradient-to-b from-brand via-brand/40 to-transparent md:left-1/2" />
        <div className="space-y-8">
          {experiences.map((item, index) => (
            <div
              key={item.title}
              className={`timeline-entry relative md:grid md:grid-cols-2 ${index % 2 === 0 ? "" : ""}`}
            >
              <div className={`mb-4 md:mb-0 ${index % 2 === 0 ? "md:pr-10" : "md:col-start-2 md:pl-10"}`}>
                <div className="glass-panel rounded-[28px] p-6 hover:border-brand/30 hover:shadow-glow">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-brand">
                      {index === 0 ? (
                        <Award className="h-5 w-5" />
                      ) : (
                        <BriefcaseBusiness className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-brandSoft">{item.company}</p>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
                        {item.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                  <div className="mt-6">
                    <Button href={item.certificate}>View Certificate</Button>
                  </div>
                </div>
              </div>

              <div className="absolute left-4 top-8 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-brand/40 bg-background shadow-[0_0_20px_rgba(255,122,24,0.45)] md:left-1/2">
                <div className="h-2 w-2 rounded-full bg-brand" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
