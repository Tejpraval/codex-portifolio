import { useEffect, useRef } from "react";
import { contacts } from "../../data/portfolio";
import { ContactSignalScene } from "../three/ContactSignalScene";
import { SectionHeader } from "../ui/SectionHeader";
import { ContactCard } from "../ui/ContactCard";

export function ContactSection() {
  const panelRef = useRef(null);
  const glowRef = useRef(null);
  const panelMouseRef = useRef({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocity: 0,
    active: false,
  });

  useEffect(() => {
    const panel = panelRef.current;
    const glow = glowRef.current;
    if (!panel || !glow) return undefined;

    const handleMove = (event) => {
      const rect = panel.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const normalizedX = localX / rect.width - 0.5;
      const normalizedY = localY / rect.height - 0.5;

      panelMouseRef.current = {
        x: localX,
        y: localY,
        normalizedX,
        normalizedY,
        velocity: Math.min(Math.hypot(event.movementX ?? 0, event.movementY ?? 0) / 40, 1.5),
        active: true,
      };

      glow.style.opacity = "1";
      glow.style.transform = `translate(${localX - 140}px, ${localY - 140}px)`;
    };

    const handleLeave = () => {
      panelMouseRef.current.active = false;
      glow.style.opacity = "0";
    };

    panel.addEventListener("pointermove", handleMove);
    panel.addEventListener("pointerleave", handleLeave);

    return () => {
      panel.removeEventListener("pointermove", handleMove);
      panel.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <section id="contact" className="section-shell pb-20 pt-24 md:pb-28 md:pt-32">
      <SectionHeader
        eyebrow="Contact"
        title="Open to internships, project work, and engineering conversations."
        copy="Contact details are listed below for email, LinkedIn, GitHub, and other channels."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {contacts.map((item) => (
            <ContactCard key={item.title} item={item} />
          ))}
        </div>

        <div ref={panelRef} className="glass-panel relative overflow-hidden rounded-[30px] p-6">
          <ContactSignalScene panelMouseRef={panelMouseRef} />
          <div
            ref={glowRef}
            className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.18),transparent_62%)] opacity-0 blur-xl transition-opacity duration-200"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.12),transparent_32%)]" />
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.24em] text-brandSoft">Live Collaboration Signal</p>
            <h3 className="mt-4 max-w-sm text-2xl font-semibold text-white">
              Work across frontend interfaces, backend systems, and applied AI.
            </h3>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                Frontend polish
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                Backend systems
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs uppercase tracking-[0.22em] text-slate-300">
                AI-native ideas
              </span>
            </div>
            <div className="mt-10 rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl">
              <p className="text-sm leading-7 text-slate-300">
                Available for internships, project work, and general engineering conversations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
