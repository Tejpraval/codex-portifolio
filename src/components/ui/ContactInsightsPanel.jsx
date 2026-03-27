import { AudioWaveform, Clock3, MapPin, Sparkles } from "lucide-react";

const metrics = [
  { label: "Response window", value: "Usually within 24h", icon: Clock3 },
  { label: "Base", value: "India, IST timezone", icon: MapPin },
  { label: "Focus", value: "Frontend, backend, AI", icon: Sparkles },
];

const bars = [42, 68, 54, 81, 47, 74, 58, 66, 39, 63, 51, 77];

export function ContactInsightsPanel() {
  return (
    <div className="glass-panel contact-insights-panel relative overflow-hidden rounded-[28px] p-6 md:col-span-2">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,122,24,0.16),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(59,130,246,0.12),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.02))]" />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.18em] text-brandSoft sm:tracking-[0.24em]">Quick Snapshot</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Built for fast contact and clear next steps.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              A compact overview for recruiters, founders, and collaborators before they send a message.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-slate-300 sm:text-xs sm:tracking-[0.2em]">
            <AudioWaveform className="h-4 w-4 text-brandSoft" />
            Contact signal
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-2.5 text-brand">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-medium text-white">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 backdrop-blur-xl">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:tracking-[0.22em]">Conversation readiness</p>
              <p className="mt-2 text-sm text-slate-300">Open to internships, project work, and technical collaboration.</p>
            </div>
            <p className="shrink-0 text-2xl font-semibold text-white">88%</p>
          </div>

          <div className="mt-5 flex h-20 items-end gap-2">
            {bars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="contact-wave-bar flex-1 rounded-t-full"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
