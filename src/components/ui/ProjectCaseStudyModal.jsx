import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Github, X } from "lucide-react";
import { Button } from "./Button";

export function ProjectCaseStudyModal({ project, open, onClose }) {
  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="glass-panel relative flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-[34px]"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-brandSoft">{project.category}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-white/10 p-2 text-white transition-colors hover:border-brand/40 hover:text-brand"
                data-interactive="true"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-6 md:px-8 md:py-8">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${project.accent} p-[1px]`}>
                    <div className="relative overflow-hidden rounded-[27px] bg-[#0a0d14] p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{project.mock.eyebrow}</p>
                          <h4 className="mt-2 text-2xl font-semibold text-white">{project.mock.title}</h4>
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/[0.05] p-3 text-brand">
                          <ArrowUpRight className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        {project.mock.stats.map((stat) => (
                          <div key={stat} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200">
                            {stat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    <div className="glass-panel rounded-[28px] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Problem</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.problem}</p>
                    </div>
                    <div className="glass-panel rounded-[28px] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Role</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.role}</p>
                    </div>
                    <div className="glass-panel rounded-[28px] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Impact</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.impact}</p>
                    </div>
                    <div className="glass-panel rounded-[28px] p-5">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Standout Decision</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{project.standout}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="glass-panel rounded-[28px] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Architecture</p>
                    <div className="mt-4 space-y-3">
                      {project.architecture.map((item) => (
                        <div key={item} className="flex gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand" />
                          <p className="text-sm leading-7 text-slate-300">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel rounded-[28px] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Key Decisions</p>
                    <div className="mt-4 space-y-3">
                      {project.decisions.map((item) => (
                        <div key={item} className="rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-slate-300">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel rounded-[28px] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Tech Stack</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button href={project.github} icon={Github}>
                        GitHub
                      </Button>
                      {project.demo ? (
                        <Button href={project.demo} variant="primary">
                          Live Demo
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
