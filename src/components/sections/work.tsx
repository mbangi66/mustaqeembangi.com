"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { education, experience } from "@/lib/data";

export function Work() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-32"
    >
      <div className="shell-narrow px-5 sm:px-6">
        <div className="mb-10 flex items-baseline justify-between gap-4 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] sm:text-xs sm:tracking-[0.18em]">
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              Mission log
            </div>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
              Where I&apos;ve worked.
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

        <ul className="group/list relative before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-gradient-to-b before:from-orange-400/60 before:via-violet-500/40 before:to-transparent lg:before:hidden">
          {experience.map((job, i) => (
            <motion.li
              key={`${job.company}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group/item relative"
            >
              <span aria-hidden className="absolute left-0 top-6 h-[15px] w-[15px] rounded-full border border-orange-300/60 bg-[var(--color-bg)] shadow-[0_0_12px_rgba(251,146,60,0.6)] lg:hidden" />
              <div className="relative grid grid-cols-12 items-baseline gap-4 rounded-lg p-4 pl-8 lg:pl-4 transition-all duration-300 hover:!opacity-100 hover:bg-white/[0.03] lg:gap-6 lg:group-hover/list:opacity-50">
                <div className="col-span-12 lg:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-fg-subtle)]">
                    {job.period}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-9">
                  <h3 className="flex items-baseline gap-2 text-lg font-semibold text-[var(--color-fg)] sm:text-xl">
                    <span>{job.role}</span>
                    <span className="text-[var(--color-fg-muted)]">·</span>
                    <span className="text-[var(--color-fg-muted)]">{job.company}</span>
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]">
                    {job.location}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {job.summary}
                  </p>
                  {job.highlights && (
                    <ul className="mt-4 max-w-2xl space-y-2">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-relaxed text-[var(--color-fg)]/85">
                          <span aria-hidden className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-orange-300/80" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-3 text-[13px] text-[var(--color-fg-subtle)]">{job.stack.join(", ")}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 border-t border-[var(--color-border)] pt-10 sm:mt-16">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-orange-200/80">Education</h3>
          <ul className="mt-5 grid gap-6 sm:grid-cols-2">
            {education.map((e) => (
              <li key={e.school}>
                <p className="text-base font-semibold text-[var(--color-fg)]">{e.course}</p>
                <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{e.school}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--color-fg-subtle)]">{e.period}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
