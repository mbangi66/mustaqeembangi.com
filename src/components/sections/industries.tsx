"use client";

import { useLocale } from "@/lib/i18n";

/** A slow ticker of the industries served, just under the hero. */
export function Industries() {
  const { c, t } = useLocale();
  const row = [...c.industries, ...c.industries];
  return (
    <section aria-label={t.industriesLabel} className="relative border-y border-[var(--color-border)] bg-black/30 py-5 backdrop-blur-sm">
      <div className="mask-fade ticker-ltr relative flex overflow-hidden">
        <ul className="flex shrink-0 animate-marquee items-center gap-10 pr-10 motion-reduce:animate-none">
          {row.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= c.industries.length}
              className="flex shrink-0 items-center gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fg-muted)]"
            >
              <span dir="auto">{name}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-orange-300/70" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
