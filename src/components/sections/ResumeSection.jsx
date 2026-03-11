import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Eye, FileText, X } from "lucide-react";
import { gsap } from "../../lib/gsap";
import { useTiltCard } from "../../hooks/useTiltCard";
import { Button } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";

const RESUME_PATH = "/resume/Tej_Praval_Resume.pdf";

export function ResumeSection() {
  const sectionRef = useRef(null);
  const cardShellRef = useRef(null);
  const downloadFillRef = useRef(null);
  const { ref, glareRef } = useTiltCard({ maxRotate: 4, depth: 10 });
  const [downloading, setDownloading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".resume-reveal",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".resume-glow-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.1,
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

  useEffect(() => {
    const node = cardShellRef.current;
    if (!node) return undefined;

    const particles = node.querySelectorAll(".resume-particle");
    const enter = () => {
      gsap.to(particles, {
        y: (i) => (i % 2 === 0 ? -10 : 10),
        x: (i) => (i % 2 === 0 ? 8 : -8),
        opacity: 1,
        scale: 1.15,
        stagger: 0.03,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    const leave = () => {
      gsap.to(particles, {
        x: 0,
        y: 0,
        opacity: 0.22,
        scale: 1,
        stagger: 0.02,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointerleave", leave);

    return () => {
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    const timeline = gsap.timeline({
      onComplete: () => {
        const link = document.createElement("a");
        link.href = RESUME_PATH;
        link.download = "Tej_Praval_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDownloading(false);
        gsap.set(downloadFillRef.current, { width: "0%" });
      },
    });

    timeline
      .fromTo(
        downloadFillRef.current,
        { width: "0%" },
        { width: "100%", duration: 0.9, ease: "power2.inOut" },
      )
      .to(cardShellRef.current, {
        y: -4,
        duration: 0.18,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      }, 0);
  };

  return (
    <>
      <section id="resume" ref={sectionRef} className="section-shell py-24 md:py-32">
        <div className="resume-reveal">
          <SectionHeader
            eyebrow="Resume"
            title="Download Resume"
            copy="A polished, recruiter-ready CV presented as an interactive artifact rather than a plain file link."
          />
        </div>

        <div className="resume-glow-line mb-10 h-px w-full max-w-sm bg-gradient-to-r from-brand via-[#ffd8b8] to-transparent" />

        <div className="mx-auto max-w-3xl">
          <div ref={cardShellRef} className="resume-reveal resume-card-shell relative">
            <div className="resume-particle left-[6%] top-[16%]" />
            <div className="resume-particle right-[8%] top-[20%]" />
            <div className="resume-particle left-[14%] bottom-[18%]" />
            <div className="resume-particle right-[12%] bottom-[22%]" />

            <article
              ref={ref}
              className="resume-card glass-panel glow-ring group relative overflow-hidden rounded-[34px] p-7 md:p-9"
              data-interactive="true"
            >
              <div ref={glareRef} className="pointer-events-none absolute inset-0 opacity-25" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,24,0.2),transparent_32%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5">
                  <div className="resume-icon-wrap rounded-[24px] border border-white/10 bg-white/[0.06] p-4 text-brand">
                    <FileText className="h-9 w-9" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white md:text-3xl">
                      Tej Praval Resume
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-300">
                      Premium PDF CV with full-stack, AI/ML, and product engineering experience.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                        PDF
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                        242 KB
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:min-w-[240px]">
                  <div className="relative overflow-hidden rounded-full border border-white/10">
                    <div
                      ref={downloadFillRef}
                      className="pointer-events-none absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-[#ffb173]"
                    />
                    <Button
                      onClick={handleDownload}
                      variant="primary"
                      icon={Download}
                      className="w-full justify-center"
                    >
                      {downloading ? "Preparing Download" : "Download Resume"}
                    </Button>
                  </div>
                  <Button onClick={() => setPreviewOpen(true)} icon={Eye} className="w-full justify-center">
                    Preview Resume
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {previewOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/75 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="glass-panel relative flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-white">Resume Preview</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">PDF Viewer</p>
                </div>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-white transition-colors hover:border-brand/40 hover:text-brand"
                  data-interactive="true"
                  aria-label="Close resume preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <iframe
                src={RESUME_PATH}
                title="Tej Praval Resume PDF Preview"
                className="h-full w-full bg-white"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
