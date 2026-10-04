"use client";

import { motion } from "motion/react";
import { highlights } from "@/lib/data";

export function Highlights() {
  return (
    <section id="highlights" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-[11px] sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            Engineering highlights
          </div>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-6xl">
            Hard problems, <span className="font-serif font-normal italic text-[var(--color-fg-muted)]">solved</span>.
          </h2>
          <p className="mt-5 text-base text-[var(--color-fg-muted)] sm:text-lg">
            The parts of the work that don&apos;t show up in a screenshot, but decide whether a system survives real
            customers.
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => (
            <motion.li
              key={h.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative bg-[var(--color-bg)]/90 p-6 backdrop-blur-sm transition-colors hover:bg-[var(--color-bg-subtle)] sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-orange-200/80">
                  {h.tag}
                </span>
                <span className="font-mono text-xs text-[var(--color-fg-subtle)]">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--color-fg)] sm:text-xl">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">{h.body}</p>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-orange-300/70 to-transparent transition-transform duration-500 group-hover:scale-x-100"
              />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
