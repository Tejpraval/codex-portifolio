import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { gsap } from "../../lib/gsap";
import { ContactCopyBurst } from "../three/ContactCopyBurst";

export function ContactCard({ item }) {
  const Icon = item.icon;
  const isCopyCard = item.title === "Email" || item.title === "Phone";
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const glowRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    return () => {
      if (cardRef.current?.copyResetTimer) {
        window.clearTimeout(cardRef.current.copyResetTimer);
      }
    };
  }, []);

  const copyValue = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(item.value);
      } else {
        const input = document.createElement("textarea");
        input.value = item.value;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand("copy");
        input.remove();
      }

      setCopied(true);
      setBurstKey((value) => value + 1);

      const timeline = gsap.timeline();
      timeline
        .fromTo(
          cardRef.current,
          { boxShadow: "0 0 0 rgba(255,122,24,0)" },
          {
            boxShadow: "0 0 36px rgba(255,122,24,0.24)",
            duration: 0.24,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          },
        )
        .fromTo(
          iconRef.current,
          { scale: 0.92, opacity: 0.2 },
          { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(2)" },
          0,
        )
        .fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1.05, duration: 0.34, ease: "power2.out" },
          0,
        )
        .to(
          glowRef.current,
          { opacity: 0, duration: 0.5, ease: "power2.out" },
          0.5,
        );

      window.clearTimeout(cardRef.current?.copyResetTimer);
      cardRef.current.copyResetTimer = window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      setCopied(false);
    }
  };

  if (isCopyCard) {
    return (
      <motion.button
        ref={cardRef}
        type="button"
        onClick={copyValue}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.985 }}
        className="glass-panel group relative flex min-h-[112px] flex-col items-start gap-4 overflow-hidden rounded-[26px] p-5 text-left transition-all duration-300 hover:border-brand/40 hover:shadow-glow sm:flex-row sm:items-center sm:justify-between sm:gap-5"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_center,rgba(255,122,24,0.24),transparent_58%)] opacity-0"
        />
        <div className="pointer-events-none absolute inset-0">
          <ContactCopyBurst trigger={burstKey} />
        </div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-brand">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.title}</p>
            <p className="mt-1 text-sm text-white">{item.value}</p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-3 self-end sm:self-auto">
          <span
            ref={iconRef}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              copied
                ? "border-brand/40 bg-brand/15 text-brandSoft"
                : "border-white/10 bg-white/[0.05] text-slate-300"
            }`}
            aria-hidden="true"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -8 }}
      className="glass-panel group flex min-h-[112px] flex-col items-start gap-4 rounded-[26px] p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-glow sm:flex-row sm:items-center sm:justify-between sm:gap-5"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-brand">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.title}</p>
          <p className="mt-1 text-sm text-white">{item.value}</p>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 self-end text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand sm:self-auto" />
    </motion.a>
  );
}
