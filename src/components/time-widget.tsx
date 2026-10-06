"use client";

import { useEffect, useState } from "react";

function format(date: Date) {
  const tz = "Asia/Kuwait";
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: tz,
  }).format(date);
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", hour12: false, timeZone: tz }).format(date),
  );
  const dayLabel = hour >= 9 && hour < 17 ? "Working hours" : hour >= 17 && hour < 23 ? "After hours" : "Asleep, probably";
  return { time, dayLabel };
}

export function TimeWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="hidden items-center gap-2 font-mono text-xs text-[var(--color-fg-subtle)] lg:inline-flex">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
        Kuwait
      </span>
    );
  }

  const { time, dayLabel } = format(now);

  return (
    <span className="hidden items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--color-fg-subtle)] lg:inline-flex">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
      </span>
      Kuwait · {time} · {dayLabel}
    </span>
  );
}
