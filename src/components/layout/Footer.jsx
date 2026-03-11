import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { label: "GitHub", href: "https://github.com/Tejpraval", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tej-praval-pula", icon: Linkedin },
  { label: "Email", href: "mailto:tejpraval32@gmail.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="section-shell pb-10 pt-4">
      <div className="glass-panel flex flex-col items-start justify-between gap-5 rounded-[28px] px-5 py-5 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg text-white">Tej Praval</p>
          <p className="mt-1 text-sm text-slate-400">
            Full-stack developer building polished products, backend systems, and AI-native workflows.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-200 transition-all duration-300 hover:border-brand/40 hover:text-white"
                data-interactive="true"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
