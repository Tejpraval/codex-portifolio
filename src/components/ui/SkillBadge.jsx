import { motion } from "framer-motion";
import { useRef } from "react";

export function SkillBadge({ children, index = 0 }) {
  const glowRef = useRef(null);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,165,92,0.32), transparent 48%)`;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.1 }}
      transition={{ type: "spring", stiffness: 280, damping: 16 }}
      className="group skill-badge relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-white/[0.08] hover:shadow-glow"
      data-interactive="true"
      onPointerMove={handleMove}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <span ref={glowRef} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 animate-[ripple_1.3s_ease-out_infinite] rounded-2xl border border-brand/30" />
      </span>
      <span className="skill-badge-sparks pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="skill-badge-spark left-[18%] top-[30%]" />
        <span className="skill-badge-spark left-[72%] top-[24%]" />
        <span className="skill-badge-spark left-[64%] top-[68%]" />
      </span>
      <span className="relative bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
        {children}
      </span>
    </motion.div>
  );
}
