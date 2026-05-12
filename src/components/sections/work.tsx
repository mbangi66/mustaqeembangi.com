"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/data";

export function Work() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg)] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="mb-10 flex items-baseline justify-between gap-4 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] sm:text-xs sm:tracking-[0.18em]">
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              Experience
            </div>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
              Where I&apos;ve shipped.
            </h2>
          </div>
          <a
            href="https://www.linkedin.com/in/mustaqeembangi/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 font-mono text-xs text-[var(--color-fg-muted)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-fg)] sm:inline-flex"
          >
            full résumé
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <ul className="group/list">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group/item"
            >
              <div className="relative grid grid-cols-12 items-baseline gap-4 rounded-lg p-4 transition-all duration-300 hover:!opacity-100 hover:bg-[var(--color-bg-subtle)]/50 lg:gap-6 lg:group-hover/list:opacity-50">
                <div className="col-span-12 lg:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-subtle)]">
                    {job.period}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-9">
                  <h3 className="flex items-baseline gap-2 text-lg font-semibold text-[var(--color-fg)] sm:text-xl">
                    <span>{job.role}</span>
                    <span className="text-[var(--color-fg-muted)]">·</span>
                    <span className="text-[var(--color-fg-muted)]">{job.company}</span>
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-fg-subtle)]">
                    {job.location}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {job.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-brand-500/20 bg-brand-500/5 px-2 py-0.5 font-mono text-[10px] text-brand-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
