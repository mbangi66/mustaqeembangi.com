"use client";

import { motion } from "motion/react";
import { stackGroups } from "@/lib/data";

export function Toolbox() {
  return (
    <section id="toolbox" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="shell px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-xs sm:tracking-[0.22em]">
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              Toolbox
            </div>
            <h2 className="mt-3 text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-5xl">
              The whole <span className="font-serif font-normal italic text-[var(--color-fg-muted)]">stack</span>, in
              production.
            </h2>
            <p className="mt-5 text-base text-[var(--color-fg-muted)]">
              Everything here runs in a live system I built or maintain today, not just a course I took.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              >
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-orange-200/80">{g.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-fg)]/85">{g.items.join(", ")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
