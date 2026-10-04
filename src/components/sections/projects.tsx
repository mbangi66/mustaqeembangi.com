"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { moreProjects, projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Planet } from "@/components/planet";

const pad = (n: number) => String(n).padStart(2, "0");
const numberWords = ["No", "One", "Two", "Three", "Four", "Five", "Six"];
const publicCount = numberWords[[...projects, ...moreProjects].filter((p) => p.href).length] ?? "Several";

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
            {projects.length + moreProjects.length} products I designed, built and keep running.{" "}
            {publicCount} have public sites; the rest are client systems, so they are described without naming the client.
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
                        {pad(i + 1)} / {pad(projects.length + moreProjects.length)}
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

                {p.caseStudy && (
                  <div className="grid gap-6 border-t border-[var(--color-border)] bg-black/20 p-6 sm:p-10 lg:grid-cols-[1fr_1.6fr_1fr] lg:gap-10">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: `color-mix(in srgb, ${p.accent} 60%, white)` }}>
                        The challenge
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: `color-mix(in srgb, ${p.accent} 60%, white)` }}>
                        What I built
                      </p>
                      <ul className="mt-3 space-y-2">
                        {p.caseStudy.built.map((b) => (
                          <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-fg)]/85">
                            <span
                              aria-hidden
                              className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: p.accent, boxShadow: `0 0 8px ${p.accent}` }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: `color-mix(in srgb, ${p.accent} 60%, white)` }}>
                        The result
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg)]">{p.caseStudy.outcome}</p>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        <div className="mt-20 sm:mt-28">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-[11px] sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            Also in production
          </div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreProjects.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative isolate flex flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/70 p-6 backdrop-blur-sm transition-all hover:border-[color:var(--card-accent)] hover:shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--card-accent)_45%,transparent)] sm:p-8",
                  // Seven cards: the last one fills its row on every layout.
                  i === moreProjects.length - 1 && "sm:col-span-2 lg:col-span-3",
                )}
                style={{ ["--card-accent" as string]: p.accent } as React.CSSProperties}
              >
                <Planet color={p.accent} className="pointer-events-none absolute -right-10 -top-10 -z-10 w-44 opacity-80 sm:w-52" />
                <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
                  {pad(projects.length + i + 1)} / {pad(projects.length + moreProjects.length)}
                </span>
                <h3 className="mt-4 max-w-[70%] text-2xl font-extrabold tracking-[-0.02em] text-[var(--color-fg)] sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-2 max-w-[75%] text-[15px] text-[var(--color-fg)]/90">{p.pitch}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--color-border)] bg-black/30 px-2.5 py-0.5 font-mono text-[10px] text-[var(--color-fg-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px]"
                  style={{
                    borderColor: `color-mix(in srgb, ${p.accent} 35%, transparent)`,
                    background: `color-mix(in srgb, ${p.accent} 10%, transparent)`,
                    color: `color-mix(in srgb, ${p.accent} 55%, white)`,
                  }}
                >
                  <Lock className="h-3 w-3" />
                  {p.role} · {p.status}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
