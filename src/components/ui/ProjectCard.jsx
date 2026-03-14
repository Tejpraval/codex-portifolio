import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { useTiltCard } from "../../hooks/useTiltCard";
import { Button } from "./Button";

export function ProjectCard({ project, index, onOpenCaseStudy }) {
  const { ref, glareRef } = useTiltCard({ maxRotate: 4.2, depth: 10 });

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="project-card-shell"
    >
      <article
        ref={ref}
        className="glass-panel glow-ring group relative overflow-hidden rounded-[28px] p-6 [transform-style:preserve-3d]"
        data-interactive="true"
      >
        <div ref={glareRef} className="pointer-events-none absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,24,0.22),transparent_32%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative flex h-full flex-col [transform:translateZ(24px)]">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">{project.category}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-brandSoft/80">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-2 text-sm text-brandSoft">{project.subtitle}</p>
            </div>
            <div className="rounded-full border border-white/10 bg-black/20 p-3 text-brand">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-300">{project.description}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {project.metrics.map((item) => (
              <div key={item.label} className="rounded-[18px] border border-white/10 bg-white/[0.04] p-3">
                <p className="text-sm font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Outcome / Impact</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{project.impact}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.proof.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-200 transition-all duration-300 group-hover:border-brand/40 group-hover:bg-brand/10 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,122,24,0.18)]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={project.github} icon={Github}>
              GitHub
            </Button>
            <Button onClick={() => onOpenCaseStudy(project)} variant="secondary" icon={ArrowRight}>
              Case Study
            </Button>
            {project.demo ? (
              <Button href={project.demo} variant="primary">
                Live Demo
              </Button>
            ) : project.status ? (
              <Button onClick={() => onOpenCaseStudy(project)} variant="secondary">
                Demo coming soon
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </motion.div>
  );
}
