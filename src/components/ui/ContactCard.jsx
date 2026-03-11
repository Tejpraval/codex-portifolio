import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function ContactCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -8 }}
      className="glass-panel group flex items-center justify-between rounded-[26px] p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-glow"
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
      <ArrowUpRight className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
    </motion.a>
  );
}
