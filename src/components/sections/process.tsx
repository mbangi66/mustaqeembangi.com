"use client";

import { motion } from "motion/react";
import { useLocale } from "@/lib/i18n";

export function Process() {
  const { c, t } = useLocale();
  const { workSteps } = c;
  return (
    <section id="process" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="shell px-5 sm:px-6">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-xs sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            {t.processEyebrow}
          </div>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-5xl">
            {t.processTitle.a} <span className="font-serif font-normal italic text-[var(--color-fg-muted)] rtl:not-italic">{t.processTitle.b}</span>.
          </h2>
        </div>

        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Trajectory line connecting the steps on wide screens */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-px bg-gradient-to-r rtl:bg-gradient-to-l from-orange-400/60 via-fuchsia-400/40 to-violet-500/10 lg:block"
          />
          {workSteps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-orange-300/50 bg-[var(--color-bg)] font-mono text-xs text-orange-200 shadow-[0_0_18px_-2px_rgba(251,146,60,0.6)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-fg)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
