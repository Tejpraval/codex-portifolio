import { closingPillars } from "../../data/portfolio";
import { Button } from "../ui/Button";

export function ClosingSection() {
  return (
    <section className="section-shell py-24 md:py-28">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,122,24,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-8 md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_26%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="chip">Closing Note</p>
            <h2 className="section-title mt-5 max-w-3xl">
              Built to signal taste, clarity, and technical depth before the first conversation.
            </h2>
            <p className="section-copy mt-5 max-w-2xl">
              The goal is simple: show enough product thinking, engineering range, and execution quality that
              recruiters, startups, and teams can immediately see the upside of a deeper conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#contact" variant="primary">
                Start a Conversation
              </Button>
              <Button href="#resume">View Resume</Button>
            </div>
          </div>

          <div className="space-y-4">
            {closingPillars.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.05] px-5 py-4 text-sm leading-7 text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
