import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Github, X } from "lucide-react";
import { gsap } from "../../lib/gsap";
import { ProjectCaseStudyBackdropScene } from "../three/ProjectCaseStudyBackdropScene";
import { Button } from "./Button";

export function ProjectCaseStudyModal({ project, open, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const auraRef = useRef(null);
  const pointerRef = useRef({
    normalizedX: 0,
    normalizedY: 0,
    velocity: 0,
  });

  const accentColor = useMemo(() => {
    if (!project?.accent) return "#ff7a18";
    const match = project.accent.match(/#(?:[0-9a-fA-F]{3}){1,2}/);
    return match?.[0] ?? "#ff7a18";
  }, [project?.accent]);

  useEffect(() => {
    if (!open || !overlayRef.current || !modalRef.current) return undefined;

    const modalX = gsap.quickTo(modalRef.current, "x", { duration: 0.45, ease: "power3.out" });
    const modalY = gsap.quickTo(modalRef.current, "y", { duration: 0.45, ease: "power3.out" });
    const modalRotateX = gsap.quickTo(modalRef.current, "rotationX", { duration: 0.45, ease: "power3.out" });
    const modalRotateY = gsap.quickTo(modalRef.current, "rotationY", { duration: 0.45, ease: "power3.out" });
    const auraX = auraRef.current
      ? gsap.quickTo(auraRef.current, "x", { duration: 0.35, ease: "power2.out" })
      : null;
    const auraY = auraRef.current
      ? gsap.quickTo(auraRef.current, "y", { duration: 0.35, ease: "power2.out" })
      : null;

    const handleMove = (event) => {
      const rect = overlayRef.current.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const normalizedX = localX / rect.width - 0.5;
      const normalizedY = localY / rect.height - 0.5;
      const previous = pointerRef.current;
      const velocity = Math.min(
        Math.hypot(normalizedX - previous.normalizedX, normalizedY - previous.normalizedY) * 16,
        1.8,
      );

      pointerRef.current = { normalizedX, normalizedY, velocity };
      modalX(normalizedX * 18);
      modalY(normalizedY * 14);
      modalRotateX(normalizedY * -3.5);
      modalRotateY(normalizedX * 4.5);
      auraX(localX - rect.width / 2);
      auraY(localY - rect.height / 2);
    };

    const handleLeave = () => {
      pointerRef.current = { normalizedX: 0, normalizedY: 0, velocity: 0 };
      modalX(0);
      modalY(0);
      modalRotateX(0);
      modalRotateY(0);
    };

    const overlay = overlayRef.current;
    overlay.addEventListener("pointermove", handleMove);
    overlay.addEventListener("pointerleave", handleLeave);

    return () => {
      overlay.removeEventListener("pointermove", handleMove);
      overlay.removeEventListener("pointerleave", handleLeave);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && project ? (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden bg-black/80 p-4 backdrop-blur-xl md:p-6"
        >
          <ProjectCaseStudyBackdropScene pointerRef={pointerRef} accent={accentColor} />
          <div
            ref={auraRef}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.2),transparent_62%)] opacity-80 blur-[90px]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_24%)]" />
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ transformPerspective: 1600 }}
            className="glass-panel relative z-10 flex max-h-[92vh] w-full max-w-[min(92rem,96vw)] flex-col overflow-hidden rounded-[34px] border border-white/10"
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
                    {project.status ? (
                      <div className="mt-6 rounded-[22px] border border-sky-400/20 bg-sky-400/[0.05] p-4">
                        <p className="text-xs uppercase tracking-[0.22em] text-sky-200">{project.status.label}</p>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{project.status.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.status.progress.map((item) => (
                            <span
                              key={item.label}
                              className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200"
                            >
                              {item.label}: {item.value}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button href={project.github} icon={Github}>
                        GitHub
                      </Button>
                      {project.demo ? (
                        <Button href={project.demo} variant="primary">
                          Live Demo
                        </Button>
                      ) : project.status ? (
                        <span className="inline-flex items-center rounded-full border border-sky-400/20 bg-sky-400/[0.06] px-4 py-3 text-sm font-medium text-sky-100">
                          Demo coming soon
                        </span>
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
