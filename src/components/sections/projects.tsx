"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Lock } from "lucide-react";
import type { Category, Project } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { BdiList } from "@/components/bidi-list";
import { cn } from "@/lib/utils";
import { Planet } from "@/components/planet";

const pad = (n: number) => String(n).padStart(2, "0");

export function Projects() {
  const { c, t } = useLocale();
  const { projects, moreProjects, projectFilters } = c;
  const publicCount = t.numberWords[[...projects, ...moreProjects].filter((p) => p.href).length] ?? "";
  const total = projects.length + moreProjects.length;
  const numberOf = (p: Project) =>
    projects.includes(p) ? projects.indexOf(p) + 1 : projects.length + moreProjects.indexOf(p) + 1;
  const [filter, setFilter] = useState<Category | "all">("all");
  const [openCase, setOpenCase] = useState<string | null>(null);
  const matches = (p: Project) => filter === "all" || p.categories.includes(filter);
  const featured = projects.filter(matches);
  const more = moreProjects.filter(matches);

  return (
    <section id="work" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-36">
      <div className="shell px-5 sm:px-6">
        <div className="mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-xs sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            {t.workEyebrow}
          </div>
          <h2 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-[var(--color-fg)] sm:mt-4 sm:text-6xl md:text-7xl">
            {t.workTitle.a} <span className="font-serif font-normal italic text-[var(--color-fg-muted)] rtl:not-italic">{t.workTitle.b}</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-base text-[var(--color-fg-muted)] sm:text-lg">
            {t.workIntro(publicCount)}
          </p>

          {/* Filters: plain text tabs, the active one underlined */}
          <div role="tablist" aria-label={t.filterLabel} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--color-border)]">
            {projectFilters.map((f) => {
              const count = f.id === "all" ? total : [...projects, ...moreProjects].filter((p) => p.categories.includes(f.id as Category)).length;
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "-mb-px border-b-2 pb-3 text-sm transition-colors",
                    active
                      ? "border-orange-300 text-[var(--color-fg)]"
                      : "border-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                  )}
                >
                  {f.label} <span className="font-mono text-xs text-[var(--color-fg-subtle)]">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {featured.length > 0 && (
        <div className="grid gap-5 sm:gap-7">
          {featured.map((p, i) => {
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
                        {pad(numberOf(p))} / {pad(total)}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
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

                    <p className="mt-7 max-w-xl text-sm text-[var(--color-fg-subtle)]">
                      {t.builtWith} <span className="text-[var(--color-fg-muted)]"><BdiList items={p.stack} withAnd /></span>.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                      <span className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)]">
                        {live ? (
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                        ) : (
                          <Lock className="h-3.5 w-3.5 text-[var(--color-fg-subtle)]" />
                        )}
                        {p.status}
                      </span>

                      {live && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-fg)] underline decoration-[var(--color-border-strong)] underline-offset-[6px] transition-colors hover:decoration-[color:var(--card-accent)]"
                        >
                          {p.href!.replace(/^https?:\/\//, "")}
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Planet panel */}
                  <div
                    className={cn(
                      "relative flex min-h-[240px] items-center justify-center overflow-hidden border-t border-[var(--color-border)] sm:min-h-[320px] lg:min-h-[460px] lg:border-s lg:border-t-0",
                      reversed && "lg:order-1 lg:border-s-0 lg:border-e",
                    )}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(60% 55% at 50% 50%, color-mix(in srgb, ${p.accent} 22%, transparent), transparent 70%)`,
                      }}
                    />
                    {/* Every card shows its planet. Where a real screenshot exists,
                        hovering the card swaps the planet for the live site. */}
                    <Planet
                      name={p.planet}
                      color={p.accent}
                      className={cn(
                        "w-[62%] max-w-[320px] transition-all duration-700",
                        p.image && "[@media(hover:hover)]:group-hover:scale-75 [@media(hover:hover)]:group-hover:opacity-0",
                      )}
                      sizes="(max-width: 1024px) 62vw, 320px"
                    />
                    {p.image && (
                      <>
                        <figure className="pointer-events-none absolute left-1/2 top-1/2 w-[88%] max-w-[560px] -translate-x-1/2 -translate-y-[46%] overflow-hidden rounded-xl border border-white/10 bg-[#0b0c14] opacity-0 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] transition-all duration-700 [@media(hover:hover)]:group-hover:-translate-y-1/2 [@media(hover:hover)]:group-hover:opacity-100">
                          {/* Plain browser bar so it reads as a real site */}
                          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                            <span className="h-2 w-2 rounded-full bg-white/20" />
                            <span className="h-2 w-2 rounded-full bg-white/20" />
                            <span className="h-2 w-2 rounded-full bg-white/20" />
                            <span className="ms-3 truncate font-mono text-xs text-[var(--color-fg-subtle)]">
                              {p.href?.replace(/^https?:\/\//, "")}
                            </span>
                          </div>
                          <Image
                            src={p.image}
                            alt={t.homePageAlt(p.name)}
                            width={1200}
                            height={720}
                            sizes="(max-width: 1024px) 88vw, 560px"
                            className="block h-auto w-full"
                          />
                        </figure>
                        <span className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fg-subtle)] transition-opacity duration-500 group-hover:opacity-0 [@media(hover:hover)]:inline">
                          {t.hoverPreview}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {p.caseStudy && (
                  <div className="border-t border-[var(--color-border)] bg-black/20">
                  <button
                    type="button"
                    aria-expanded={openCase === p.slug}
                    aria-controls={`case-${p.slug}`}
                    onClick={() => setOpenCase(openCase === p.slug ? null : p.slug)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-start text-sm font-medium text-[var(--color-fg)] transition-colors hover:bg-white/[0.03] sm:px-10"
                  >
                    {openCase === p.slug ? t.hideCase : t.readCase}
                    <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-300", openCase === p.slug && "rotate-180")} />
                  </button>
                  {/* Kept in the page (for search engines), just folded away */}
                  <div
                    id={`case-${p.slug}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out",
                      openCase === p.slug ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                  <div className="overflow-hidden">
                  <div className="grid gap-6 px-6 pb-8 pt-2 sm:px-10 sm:pb-10 lg:grid-cols-[1fr_1.6fr_1fr] lg:gap-10">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: `color-mix(in srgb, ${p.accent} 60%, white)` }}>
                        {t.challenge}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: `color-mix(in srgb, ${p.accent} 60%, white)` }}>
                        {t.whatIBuilt}
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
                      <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: `color-mix(in srgb, ${p.accent} 60%, white)` }}>
                        {t.result}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg)]">{p.caseStudy.outcome}</p>
                    </div>
                  </div>
                  </div>
                  </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
        )}

        {more.length > 0 && (
        <div className={cn(featured.length > 0 && "mt-20 sm:mt-28")}>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-xs sm:tracking-[0.22em]">
            <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            {t.alsoInProduction}
          </div>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p, i) => (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative isolate flex flex-col overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/70 p-6 backdrop-blur-sm transition-all hover:border-[color:var(--card-accent)] hover:shadow-[0_24px_60px_-24px_color-mix(in_srgb,var(--card-accent)_45%,transparent)] sm:p-8",
                  // The last card stretches to fill whatever is left of its row.
                  i === more.length - 1 && i % 2 === 0 && "sm:col-span-2",
                  i === more.length - 1 && i % 3 === 0 && "lg:col-span-3",
                  i === more.length - 1 && i % 3 === 1 && "lg:col-span-2",
                  i === more.length - 1 && i % 3 === 2 && "lg:col-span-1",
                )}
                style={{ ["--card-accent" as string]: p.accent } as React.CSSProperties}
              >
                <Planet name={p.planet} color={p.accent} className="pointer-events-none absolute -end-8 -top-8 -z-10 w-40 sm:w-48" sizes="192px" />
                <span className="font-mono text-xs text-[var(--color-fg-subtle)]">
                  {pad(numberOf(p))} / {pad(total)}
                </span>
                <h3 className="mt-4 max-w-[70%] text-2xl font-extrabold tracking-[-0.02em] text-[var(--color-fg)] sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-2 max-w-[75%] text-[15px] text-[var(--color-fg)]/90">{p.pitch}</p>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">{p.description}</p>
                <p className="mt-4 text-[13px] text-[var(--color-fg-subtle)]">
                  {t.builtWith} <span className="text-[var(--color-fg-muted)]"><BdiList items={p.stack} withAnd /></span>.
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[13px] text-[var(--color-fg-muted)]">
                  <span className="inline-flex items-center gap-2">
                    {p.href ? (
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-[var(--color-fg-subtle)]" />
                    )}
                    {p.role}, {p.status.charAt(0).toLowerCase() + p.status.slice(1)}
                  </span>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[12px] text-[var(--color-fg)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:decoration-[color:var(--card-accent)]"
                    >
                      {p.href.replace(/^https?:\/\//, "")}
                      <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
                    </a>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
        )}
      </div>
    </section>
  );
}
