import { useEffect, useRef } from "react";
import { featuredProjects, projectSpotlight, projects } from "../../data/portfolio";
import { gsap } from "../../lib/gsap";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCard } from "../ui/ProjectCard";

export function ProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-reveal",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-shell py-24 md:py-32">
      <SectionHeader
        eyebrow="Projects"
        title="Project section structured around title, description, tools used, and skills demonstrated."
        copy="The first project is highlighted in the exact academic format, followed by the broader project portfolio."
      />

      <div className="project-reveal mb-8 rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,24,0.12),rgba(255,255,255,0.04))] p-5 md:rounded-[30px] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-brandSoft sm:tracking-[0.24em]">Strong Project Spotlight</p>
            <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{projectSpotlight.title}</h3>
            <p className="mt-4 text-sm leading-8 text-slate-300">{projectSpotlight.description}</p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Tools Used</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{projectSpotlight.toolsUsed.join(", ")}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Skills Demonstrated</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">{projectSpotlight.skillsDemonstrated.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className={`project-reveal relative overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br ${project.accent} p-[1px] sm:rounded-[30px]`}
          >
            <div className="relative h-full rounded-[25px] bg-[#090c13] p-5 sm:rounded-[29px] sm:p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-brandSoft sm:text-xs sm:tracking-[0.26em]">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{project.subtitle}</p>
                </div>
                <button
                  onClick={() => {
                    window.location.hash = `/projects/${project.slug}`;
                  }}
                  className="w-full rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition-colors hover:border-brand/40 hover:text-brandSoft sm:w-auto"
                  data-interactive="true"
                >
                  Open Case Study
                </button>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">{project.problem}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {project.mock.stats.map((item) => (
                  <div key={item} className="rounded-[20px] border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none mb-8 hidden lg:grid lg:grid-cols-2 lg:gap-5">
        {featuredProjects.map((project) => (
          <div key={`${project.slug}-marker`} className="flex justify-center">
            <div className={`project-link-marker ${project.slug === "policy-control-plane" ? "project-link-marker-cyan" : ""}`}>
              <span className="project-link-marker-line" />
              <span className="project-link-marker-arrow" />
              <span className="project-link-marker-arrow project-link-marker-arrow-delay" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <div key={project.title} className="project-reveal">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
