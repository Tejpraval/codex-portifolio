import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "../../data/portfolio";
import { Button } from "../ui/Button";

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
    <header className="sticky top-4 z-50 px-4 md:px-6">
      <nav className="section-shell glass-panel flex items-center justify-between rounded-full px-4 py-3 md:px-6">
        <a href="#hero" className="font-display text-sm tracking-[0.3em] text-white">
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

        <div className="hidden md:block">
          <Button href="#contact" variant="primary">
            Contact
          </Button>
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
                  className={`text-sm ${active === item.href ? "text-white" : "text-slate-300"}`}
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
