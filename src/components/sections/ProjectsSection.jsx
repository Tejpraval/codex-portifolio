import { useEffect, useState, useRef } from "react";
import { featuredProjects, projects } from "../../data/portfolio";
import { gsap } from "../../lib/gsap";
import { ProjectCaseStudyModal } from "../ui/ProjectCaseStudyModal";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCard } from "../ui/ProjectCard";

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

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
        title="Selected builds with stronger product framing, technical depth, and execution clarity."
        copy="Instead of just listing stacks, these projects explain the problem, the role, the impact, and the technical decisions that mattered."
      />

      <div className="mb-8 grid gap-5 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <div
            key={project.slug}
            className={`project-reveal relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br ${project.accent} p-[1px]`}
          >
            <div className="relative h-full rounded-[29px] bg-[#090c13] p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-brandSoft">{project.category}</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{project.subtitle}</p>
                </div>
                <button
                  onClick={() => setActiveProject(project)}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white transition-colors hover:border-brand/40 hover:text-brandSoft"
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
            <ProjectCard project={project} index={index} onOpenCaseStudy={setActiveProject} />
          </div>
        ))}
      </div>

      <ProjectCaseStudyModal
        project={activeProject}
        open={Boolean(activeProject)}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
