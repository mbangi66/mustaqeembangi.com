"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Planet } from "@/components/planet";

const pad = (n: number) => String(n).padStart(2, "0");

export function Projects() {
  return (
    <section id="work" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-[11px] sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            Selected work · 2024 — now
          </div>
          <h2 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-6xl md:text-7xl">
            Products in <span className="font-serif font-normal italic text-[var(--color-fg-muted)]">orbit</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-[var(--color-fg-muted)] sm:text-lg">
            Three products I designed, built and still run in production. Most of my client work is private, so the
            full range is under <a href="#capabilities" className="text-[var(--color-fg)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:decoration-white">capabilities</a>.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-7">
          {projects.map((p, i) => {
            const reversed = i % 2 === 1;
            const live = !!p.href;
            return (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative isolate overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/70 backdrop-blur-sm transition-all hover:border-[color:var(--card-accent)] hover:shadow-[0_30px_80px_-20px_color-mix(in_srgb,var(--card-accent)_45%,transparent)]"
                style={{ ["--card-accent" as string]: p.accent } as React.CSSProperties}
              >
                <div className={cn("grid gap-0", reversed ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]")}>
                  <div className={cn("relative p-6 sm:p-12", reversed && "lg:order-2")}>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
                        {pad(i + 1)} / {pad(projects.length)}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                        {p.role}
                      </span>
                    </div>

                    <h3 className="mt-5 text-balance text-4xl font-extrabold leading-none tracking-[-0.03em] text-[var(--color-fg)] sm:text-5xl">
                      {p.name}
                    </h3>
                    <p className="mt-4 max-w-xl text-lg text-[var(--color-fg)]/90 sm:text-xl">{p.pitch}</p>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
                      {p.description}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-2">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--color-border)] bg-black/30 px-3 py-1 font-mono text-[11px] text-[var(--color-fg-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <span
                        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px]"
                        style={{
                          borderColor: `color-mix(in srgb, ${p.accent} 35%, transparent)`,
                          background: `color-mix(in srgb, ${p.accent} 10%, transparent)`,
                          color: `color-mix(in srgb, ${p.accent} 55%, white)`,
                        }}
                      >
                        {live ? (
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent, boxShadow: `0 0 10px ${p.accent}` }} />
                        ) : (
                          <Lock className="h-3 w-3" />
                        )}
                        {p.status}
                      </span>

                      {live && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="link"
                          className="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-fg)] underline decoration-[var(--color-border-strong)] underline-offset-[6px] transition-colors hover:decoration-[color:var(--card-accent)]"
                        >
                          {p.href!.replace(/^https?:\/\//, "")}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Planet panel */}
                  <div
                    className={cn(
                      "relative flex min-h-[240px] items-center justify-center overflow-hidden border-t border-[var(--color-border)] sm:min-h-[320px] lg:min-h-[460px] lg:border-l lg:border-t-0",
                      reversed && "lg:order-1 lg:border-l-0 lg:border-r",
                    )}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(60% 55% at 50% 50%, color-mix(in srgb, ${p.accent} 22%, transparent), transparent 70%)`,
                      }}
                    />
                    <Planet color={p.accent} className="w-[62%] max-w-[300px]" />
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
