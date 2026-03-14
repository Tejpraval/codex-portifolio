import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, ShieldCheck } from "lucide-react";
import { certifications } from "../../data/portfolio";
import { gsap } from "../../lib/gsap";
import { SectionHeader } from "../ui/SectionHeader";

export function CertificationsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".certifications-reveal",
        { opacity: 0, y: 30 },
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
    <section id="certifications" ref={sectionRef} className="section-shell py-24 md:py-32">
      <SectionHeader
        eyebrow="Certifications"
        title="Certificates that back technical curiosity and continuous learning."
        copy="Focused training and project credentials across AI workflows, product experimentation, and security-oriented analysis."
      />

      <div className="certifications-reveal certification-hero glass-panel relative overflow-hidden rounded-[34px] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,122,24,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_26%)]" />
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.24em] text-brandSoft">Verified Learning</p>
            <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
              Practical credentials across AI product building and security analysis.
            </h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Issued by</p>
              <p className="mt-2 text-lg font-semibold text-white">NxtWave</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Credentials</p>
              <p className="mt-2 text-lg font-semibold text-white">3 certifications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-3">
        {certifications.map((item, index) => (
          <motion.a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -10, rotateX: 1.5, rotateY: index % 2 === 0 ? -1.5 : 1.5 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="certifications-reveal certification-card glass-panel group relative block overflow-hidden rounded-[30px]"
            style={{ transformPerspective: 1400 }}
          >
            <div className="certification-card-sheen pointer-events-none absolute inset-y-0 left-[-35%] w-[38%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-0 transition-all duration-700 group-hover:left-[110%] group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.12),transparent_26%)] opacity-80" />

            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#0b1020]">
              <img
                src={item.image}
                alt={`${item.title} certificate`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(6,7,10,0.92)_100%)]" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-slate-100 backdrop-blur-xl">
                {index === 2 ? <ShieldCheck className="h-3.5 w-3.5 text-brandSoft" /> : <Award className="h-3.5 w-3.5 text-brandSoft" />}
                {item.date}
              </div>
            </div>

            <div className="relative z-10 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-brandSoft">{item.issuer}</p>
                  <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">{item.title}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
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
          </motion.a>
        ))}
      </div>
    </section>
  );
}
