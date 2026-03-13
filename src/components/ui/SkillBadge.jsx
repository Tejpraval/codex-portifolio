import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Atom,
  Binary,
  Blocks,
  BrainCircuit,
  Braces,
  Cable,
  CodeXml,
  Compass,
  Database,
  Container,
  FileCode2,
  Figma,
  GitBranch,
  Globe,
  KeyRound,
  LayoutTemplate,
  Lock,
  PenTool,
  Send,
  ShieldCheck,
  ShieldEllipsis,
  Wind,
} from "lucide-react";

const skillIconMap = {
  "C++": Binary,
  TypeScript: FileCode2,
  JavaScript: Braces,
  Python: CodeXml,
  C: Binary,
  "React.js": Atom,
  HTML5: CodeXml,
  CSS3: PenTool,
  Bootstrap: LayoutTemplate,
  Tailwind: Wind,
  "Node.js": Cable,
  "Express.js": Blocks,
  "REST APIs": Globe,
  "JWT Auth": KeyRound,
  Middleware: ShieldEllipsis,
  MongoDB: Database,
  MySQL: Database,
  PostgreSQL: Database,
  Git: GitBranch,
  Postman: Send,
  "MongoDB Compass": Compass,
  Figma: Figma,
  Docker: Container,
  RBAC: ShieldCheck,
  "API Security": Lock,
  "Policy Versioning": FileCode2,
  DSA: BrainCircuit,
};

export function SkillBadge({ children, index = 0 }) {
  const glowRef = useRef(null);
  const Icon = skillIconMap[children] ?? Braces;

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
      <span className="relative inline-flex items-center gap-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
        <span className="inline-flex h-4 w-4 items-center justify-center text-brandSoft/90">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {children}
      </span>
    </motion.div>
  );
}
