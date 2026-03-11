import { contacts, recruiterSignals } from "../../data/portfolio";
import { SectionHeader } from "../ui/SectionHeader";
import { ContactCard } from "../ui/ContactCard";

export function ContactSection() {
  return (
    <section id="contact" className="section-shell pb-20 pt-24 md:pb-28 md:pt-32">
      <SectionHeader
        eyebrow="Contact"
        title="Open to ambitious products, internships, and serious engineering conversations."
        copy="Reach out through the channel that fits best. Every card is interactive and ready to launch the right destination."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {contacts.map((item) => (
            <ContactCard key={item.title} item={item} />
          ))}
        </div>

        <div className="glass-panel rounded-[30px] p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-brandSoft">Why This Portfolio Exists</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            To make technical range visible before the first interview.
          </h3>
          <div className="mt-6 space-y-4">
            {recruiterSignals.map((item) => (
              <div
                key={item}
                className="rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
