import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { ThreeScene } from "./ThreeScene";

const INTRO_STORAGE_KEY = "tej-praval-intro-seen";

export function shouldShowIntro() {
  try {
    return !window.localStorage.getItem(INTRO_STORAGE_KEY);
  } catch {
    return true;
  }
}

export function markIntroSeen() {
  try {
    window.localStorage.setItem(INTRO_STORAGE_KEY, "true");
  } catch {
    // Ignore storage failures and continue.
  }
}

export function IntroLoader({ onComplete }) {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const completeRef = useRef(false);
  const [phase, setPhase] = useState("dark");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const scatterTime = isMobile ? 1.95 : 2.45;
    const finishTime = isMobile ? 2.75 : 3.45;

    const finish = () => {
      if (completeRef.current) return;
      completeRef.current = true;
      markIntroSeen();
      onComplete();
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.set(".intro-overlay", { autoAlpha: 1 })
        .fromTo(
          ".intro-vignette, .intro-grid-shell, .intro-core-frame",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          0,
        )
        .to(".intro-particles", { autoAlpha: 1, duration: 0.55, ease: "power2.out" }, 0.22)
        .fromTo(
          ".intro-top-line, .intro-bottom-line",
          { scaleX: 0, transformOrigin: "center center" },
          { scaleX: 1, duration: 0.8, ease: "power2.out" },
          0.45,
        )
        .call(() => setPhase("connect"), null, 0.82)
        .fromTo(
          ".intro-line-copy",
          { autoAlpha: 0, y: 38, filter: "blur(14px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.62,
            stagger: 0.16,
            ease: "power3.out",
          },
          1.02,
        )
        .fromTo(
          ".intro-name",
          { autoAlpha: 0, scale: 0.9, letterSpacing: "0.48em", y: 18 },
          {
            autoAlpha: 1,
            scale: 1,
            letterSpacing: "0.18em",
            y: 0,
            duration: 0.95,
            ease: "power3.out",
          },
          1.14,
        )
        .fromTo(
          ".intro-name-glow",
          { autoAlpha: 0, scale: 0.7 },
          { autoAlpha: 1, scale: 1.35, duration: 0.9, ease: "power2.out" },
          1.1,
        )
        .fromTo(
          ".intro-flash",
          { autoAlpha: 0 },
          { autoAlpha: 0.4, duration: 0.16, yoyo: true, repeat: 1, ease: "power1.out" },
          2.08,
        )
        .call(() => setPhase("scatter"), null, scatterTime)
        .to(
          ".intro-copy-wrap, .intro-core-frame",
          {
            y: -24,
            autoAlpha: 0,
            scale: 0.96,
            duration: 0.62,
            ease: "power2.in",
          },
          finishTime,
        )
        .to(
          ".intro-overlay",
          {
            autoAlpha: 0,
            scale: 1.03,
            duration: 0.72,
            ease: "power2.inOut",
            onComplete: finish,
          },
          finishTime + 0.12,
        );
    }, root);

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      timelineRef.current?.progress(1);
      finish();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      timelineRef.current?.kill();
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className="intro-overlay fixed inset-0 z-[120] overflow-hidden bg-[#030407]">
      <ThreeScene phase={phase} />
      <div className="intro-flash pointer-events-none absolute inset-0 bg-white/10 opacity-0" />
      <div className="intro-particles intro-grid-shell pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="intro-vignette pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,24,0.14),transparent_36%)]" />
      <div className="intro-vignette pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_24%)]" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="intro-core-frame relative rounded-[32px] border border-white/10 bg-white/[0.03] px-8 py-10 text-center backdrop-blur-xl md:px-14 md:py-14">
          <div className="intro-top-line absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-brandSoft to-transparent" />
          <div className="intro-bottom-line absolute left-8 right-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="intro-copy-wrap relative text-center">
            <div className="intro-name-glow absolute inset-x-0 top-[-1.75rem] mx-auto h-48 w-48 rounded-full bg-brand/25 blur-[86px]" />
            <p className="mb-3 text-[10px] uppercase tracking-[0.42em] text-slate-500 md:text-xs">
              Developer Portfolio
            </p>
            <p className="intro-name relative font-display text-4xl font-semibold uppercase tracking-[0.18em] text-white md:text-7xl">
              Tej Praval
            </p>
            <div className="mt-8 space-y-3">
              <p className="intro-line-copy text-sm uppercase tracking-[0.42em] text-slate-300 md:text-base">
                Tej Praval
              </p>
              <p className="intro-line-copy text-sm uppercase tracking-[0.42em] text-brandSoft md:text-base">
                Full Stack Developer
              </p>
              <p className="intro-line-copy text-sm uppercase tracking-[0.42em] text-slate-400 md:text-base">
                AI &amp; ML Engineer
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
        Press ESC to skip
      </div>
    </div>
  );
}
