import { ArrowLeft, ArrowUpRight, CheckCircle2, Github } from "lucide-react";
import { ProjectCaseStudyBackdropScene } from "../three/ProjectCaseStudyBackdropScene";
import { Button } from "../ui/Button";

export function ProjectDetailPage({ project }) {
  const pointerRef = {
    current: {
      normalizedX: 0,
      normalizedY: 0,
      velocity: 0,
    },
  };

  if (!project) {
    return (
      <div className="section-shell py-24 md:py-32">
        <div className="glass-panel rounded-[34px] p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-brandSoft">Not Found</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Project case study not found.</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            The requested project route does not match an available case study.
          </p>
          <div className="mt-8">
            <Button href="#projects" icon={ArrowLeft}>
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0">
        <ProjectCaseStudyBackdropScene
          pointerRef={pointerRef}
          accent={project.accent.match(/#(?:[0-9a-fA-F]{3}){1,2}/)?.[0] ?? "#ff7a18"}
        />
      </div>
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_24%)]" />

      <div className="relative z-10 section-shell py-8 md:py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">
              <a href="#hero" className="transition-colors hover:text-white">
                Home
              </a>
              <span>/</span>
              <a href="#projects" className="transition-colors hover:text-white">
                Projects
              </a>
              <span>/</span>
              <span className="text-slate-300">{project.title}</span>
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Project Case Study</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="#projects" icon={ArrowLeft}>
              Back to Projects
            </Button>
            <Button href="#contact">Contact</Button>
          </div>
        </div>

        <article className="glass-panel relative overflow-hidden rounded-[34px] border border-white/10">
          <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />

          <div className="border-b border-white/10 px-5 py-5 md:px-8">
            <p className="text-xs uppercase tracking-[0.28em] text-brandSoft">{project.category}</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{project.title}</h1>
            <p className="mt-2 text-sm text-slate-300 md:text-base">{project.subtitle}</p>
          </div>

          <div className="px-5 py-6 md:px-8 md:py-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br ${project.accent} p-[1px]`}>
                  <div className="relative overflow-hidden rounded-[27px] bg-[#0a0d14] p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{project.mock.eyebrow}</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">{project.mock.title}</h2>
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
        </article>
      </div>
    </div>
  );
}
