import { ArrowUpRight } from "lucide-react";
import { cn, isExternalLink } from "../../lib/utils";
import { useMagnetic } from "../../hooks/useMagnetic";

export function Button({
  href,
  children,
  icon: Icon,
  variant = "secondary",
  className,
  onClick,
  type = "button",
}) {
  const baseClass =
    "magnetic-button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 text-sm font-medium transition-all duration-300";
  const variants = {
    primary:
      "bg-brand text-white shadow-glow hover:-translate-y-0.5 hover:bg-brandSoft",
    secondary:
      "border border-white/10 bg-white/[0.05] text-slate-100 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-white/[0.08]",
  };
  const { ref, innerRef } = useMagnetic();

  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span ref={innerRef} className="relative inline-flex items-center gap-2">
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span>{children}</span>
      </span>
      {isExternalLink(href) ? (
        <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(baseClass, variants[variant], className)}
        target={isExternalLink(href) ? "_blank" : undefined}
        rel={isExternalLink(href) ? "noreferrer" : undefined}
        data-interactive="true"
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={cn(baseClass, variants[variant], className)}
      data-interactive="true"
      onClick={onClick}
    >
      {content}
    </button>
  );
}
