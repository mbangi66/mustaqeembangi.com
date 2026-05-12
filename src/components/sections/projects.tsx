"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section
      id="work"
      className="relative scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)] py-20 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-6 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-[11px] sm:tracking-[0.22em]">
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              Selected work · 2024 — 2026
            </div>
            <h2 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-6xl md:text-7xl">
              Three production <span className="font-serif italic font-normal text-[var(--color-fg-muted)]">SaaS</span>.
              <br />
              Live now.
            </h2>
          </div>
        </div>

        <div className="grid gap-5 sm:gap-7">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative isolate overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)] transition-all hover:border-[color:var(--card-accent)] hover:shadow-[0_30px_80px_-20px_color-mix(in_srgb,var(--card-accent)_45%,transparent)]"
                style={{ ["--card-accent" as string]: p.accent ?? "#6366f1" } as React.CSSProperties}
              >
                <div className={cn("grid gap-0", reversed ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]")}>
                  <div className={cn("relative p-6 sm:p-12", reversed && "lg:order-2")}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[var(--color-fg-subtle)]">0{i + 1} / 03</span>
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: p.accent ?? "#6366f1", boxShadow: `0 0 16px ${p.accent ?? "#6366f1"}` }}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                        {p.role}
                      </span>
                    </div>

                    <h3 className="mt-5 text-balance text-4xl font-extrabold leading-none tracking-[-0.03em] text-[var(--color-fg)] sm:text-5xl">
                      {p.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-lg text-[var(--color-fg-muted)] sm:text-xl">{p.pitch}</p>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.description}</p>

                    <div className="mt-7 flex flex-wrap items-center gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 py-1 font-mono text-[11px] text-[var(--color-fg-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {p.metric && (
                      <p
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px]"
                        style={{
                          borderColor: `color-mix(in srgb, ${p.accent ?? "#6366f1"} 30%, transparent)`,
                          background: `color-mix(in srgb, ${p.accent ?? "#6366f1"} 8%, transparent)`,
                          color: `color-mix(in srgb, ${p.accent ?? "#6366f1"} 70%, white)`,
                        }}
                      >
                        {p.metric}
                      </p>
                    )}

                    {p.href && (
                      <div className="mt-8">
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="link"
                          className="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-fg)] underline decoration-[var(--color-border-strong)] underline-offset-[6px] transition-colors hover:decoration-[color:var(--card-accent)]"
                        >
                          Visit live site
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Visual panel */}
                  <div
                    className={cn(
                      "relative min-h-[180px] overflow-hidden border-t border-[var(--color-border)] sm:min-h-[260px] lg:min-h-[440px] lg:border-l lg:border-t-0",
                      reversed && "lg:order-1 lg:border-l-0 lg:border-r",
                    )}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(80% 70% at 50% 40%, color-mix(in srgb, ${p.accent ?? "#6366f1"} 32%, transparent), transparent 70%), radial-gradient(50% 50% at 80% 80%, color-mix(in srgb, ${p.accent ?? "#6366f1"} 18%, transparent), transparent 70%)`,
                      }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-dot-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="font-sans text-[14vw] font-extrabold leading-none tracking-[-0.05em] text-[var(--color-fg)] opacity-[0.08] transition-all duration-700 group-hover:opacity-[0.18] group-hover:scale-105 sm:text-[12vw] lg:text-[8vw]"
                        aria-hidden
                      >
                        {p.name.split(" ")[0]}
                      </div>
                    </div>

                    <div className="relative flex h-full min-h-[180px] flex-col justify-end gap-1 p-5 sm:min-h-[260px] sm:p-6 lg:min-h-[440px] lg:p-10">
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: p.accent ?? "#6366f1" }}
                        />
                        live · {p.href?.replace(/^https?:\/\//, "") ?? "internal"}
                      </div>
                      <p className="font-serif text-2xl italic leading-tight text-[var(--color-fg-muted)] sm:text-3xl lg:text-4xl">
                        {p.pitch}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
