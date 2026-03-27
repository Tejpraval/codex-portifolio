import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../../data/portfolio";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const sections = ["#hero", ...navItems.map((item) => item.href)];

    const handleScroll = () => {
      let current = "#hero";
      sections.forEach((href) => {
        const element = document.querySelector(href);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          current = href;
        }
      });
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-4 md:px-6">
      <nav className="section-shell glass-panel flex items-center justify-between gap-3 rounded-[24px] px-4 py-3 sm:rounded-full md:px-6">
        <a href="#hero" className="font-display text-xs tracking-[0.22em] text-white sm:text-sm sm:tracking-[0.3em]">
          TEJ PRAVAL
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link text-sm transition-colors duration-300 hover:text-white ${active === item.href ? "text-white" : "text-slate-300"}`}
              data-interactive="true"
              aria-current={active === item.href ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          data-interactive="true"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="section-shell mt-3 md:hidden">
          <div className="glass-panel rounded-[28px] p-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-3 py-2 text-sm ${active === item.href ? "bg-white/[0.06] text-white" : "text-slate-300"}`}
                  onClick={() => setOpen(false)}
                  data-interactive="true"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
