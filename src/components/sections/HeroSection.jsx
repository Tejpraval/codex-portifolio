import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Youtube } from "lucide-react";
import { heroIntro, heroLinks, heroRoles, heroSpotlight } from "../../data/portfolio";
import { useGlobalMouse } from "../../hooks/useGlobalMouse";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useTypewriter } from "../../hooks/useTypewriter";
import { gsap } from "../../lib/gsap";
import { Button } from "../ui/Button";
import { HeroScene } from "../three/HeroScene";

export function HeroSection() {
  const heroRef = useRef(null);
  const typedRole = useTypewriter(heroRoles);
  const { mouse, isTouchDevice } = useGlobalMouse();
  const reducedMotion = useReducedMotion();
  const [firstName, ...restName] = heroIntro.name.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.14,
          ease: "power3.out",
          delay: 0.2,
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isTouchDevice || reducedMotion) return undefined;

    let frame = 0;
    const update = () => {
      const { normalizedX, normalizedY } = mouse.current;

      gsap.to(".parallax-layer", {
        x: normalizedX * 22,
        y: normalizedY * 22,
        duration: 1.1,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(".hero-depth-a", {
        x: normalizedX * 18,
        y: normalizedY * 12,
        duration: 1.15,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(".hero-depth-b", {
        x: normalizedX * -26,
        y: normalizedY * -18,
        duration: 1.2,
        ease: "power3.out",
        overwrite: "auto",
      });

      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [isTouchDevice, mouse, reducedMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative isolate min-h-screen overflow-hidden pt-28"
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-30 hero-depth-b" />
      <div className="pointer-events-none absolute inset-x-0 top-24 h-72 hero-depth-a bg-[radial-gradient(circle,rgba(255,122,24,0.3),transparent_55%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-16 h-[28rem] bg-[radial-gradient(circle_at_center,rgba(255,122,24,0.16),transparent_58%)] opacity-90 blur-[120px]" />
      <div className="hero-orb hero-depth-a left-[8%] top-32 hidden lg:block" />
      <div className="hero-orb hero-depth-b bottom-24 right-[12%] hidden lg:block" />
      <div className="hero-orb hero-depth-a bottom-[18%] left-[42%] hidden lg:block" />

      <div className="section-shell relative z-10 flex min-h-[calc(100vh-7rem)] items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="parallax-layer max-w-3xl">
            <span className="chip hero-reveal">Professional Portfolio</span>
            <div className="hero-reveal relative mt-8 inline-flex">
              <div className="absolute inset-0 rounded-full bg-brand/30 blur-3xl" />
              <div className="absolute -inset-x-12 -inset-y-6 rounded-full bg-[conic-gradient(from_90deg,rgba(255,122,24,0.18),transparent,rgba(255,255,255,0.12),transparent,rgba(255,122,24,0.22))] opacity-60 blur-2xl" />
              <h1 className="hero-depth-a relative font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-8xl">
                {firstName} <span className="text-gradient">{restName.join(" ")}</span>
              </h1>
            </div>

            <div className="hero-reveal hero-depth-b mt-6 space-y-4">
              <p className="text-lg text-slate-200 md:text-2xl">
                {heroIntro.targetRole} <span className="mx-2 text-brand">|</span>
                <span className="text-gradient"> {typedRole}</span>
                <span className="ml-1 inline-block h-6 w-px animate-pulse bg-brand align-middle" />
              </p>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                {heroIntro.tagline}
              </p>
            </div>

            <div className="hero-reveal hero-depth-a mt-6 max-w-2xl rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[11px] uppercase tracking-[0.28em] text-brandSoft">Professional Headline</p>
              <p className="mt-3 text-sm leading-7 text-slate-200 md:text-base">{heroIntro.headline}</p>
            </div>

            <div className="hero-reveal hero-depth-b mt-10 flex flex-wrap gap-4">
              {heroLinks.map((link) => (
                <Button
                  key={link.label}
                  href={link.href}
                  variant={link.variant ?? "secondary"}
                  icon={link.icon}
                >
                  {link.label}
                </Button>
              ))}
            </div>

            <a
              href={heroSpotlight.href}
              target="_blank"
              rel="noreferrer"
              data-interactive="true"
              className="hero-reveal hero-depth-a group mt-6 block max-w-xl overflow-hidden rounded-[26px] border border-[#ff7a18]/30 bg-[linear-gradient(135deg,rgba(255,122,24,0.22),rgba(255,255,255,0.06))] p-5 shadow-[0_20px_80px_rgba(255,122,24,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ffb173]/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-3 text-[#ffb173]">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#ffd6b8]">
                      {heroSpotlight.label}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{heroSpotlight.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-7 text-slate-200">
                      {heroSpotlight.copy}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white">
                      <span>{heroSpotlight.cta}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.35 }}
            className="parallax-layer hidden lg:block"
          >
            <div className="glass-panel glow-ring relative ml-auto max-w-md overflow-hidden rounded-[32px] p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.2),transparent_45%)]" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.7)]" />
                  <p className="text-sm text-slate-300">Available for internships and product roles</p>
                </div>
                <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Current Focus</p>
                  <p className="mt-3 text-xl font-medium text-white">{heroIntro.headline}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-3xl font-semibold text-white">MERN</p>
                    <p className="mt-2 text-sm text-slate-400">Product-grade full stack</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-3xl font-semibold text-white">AI/ML</p>
                    <p className="mt-2 text-sm text-slate-400">Applied experimentation</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-pill absolute bottom-8 left-[64%] z-10 flex -translate-x-1/2 items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white lg:left-[72%]"
        data-interactive="true"
      >
        Scroll to explore <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
