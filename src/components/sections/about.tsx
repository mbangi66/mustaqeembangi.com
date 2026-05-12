"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-t border-[var(--color-border)] bg-[var(--color-bg)] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(60%_55%_at_50%_30%,rgba(99,102,241,0.22),transparent_70%)] blur-2xl"
            />
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-[0_30px_80px_-30px_rgba(99,102,241,0.35)]">
              <Image
                src={siteConfig.avatar}
                alt={siteConfig.fullName}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 border-t border-[var(--color-border)] bg-[var(--color-bg)]/80 px-3 py-2 backdrop-blur">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  live · github
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
                  @mbangi66
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-fg-subtle)]">
              <MapPin className="h-3 w-3" />
              <span className="font-mono">{siteConfig.location}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              About
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
              I build production <span className="font-serif italic font-normal">Laravel</span> for the Gulf.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
              <p>
                I&apos;m Mustaqeem — a <span className="text-[var(--color-fg)]">Senior Laravel & Systems Engineer</span> based in Kuwait City. Over the last three years I&apos;ve shipped multi-tenant SaaS for retail, fleet, and competitive intelligence — every system live, every change backward compatible.
              </p>
              <p>
                My default is <span className="text-[var(--color-fg)]">add, don&apos;t replace</span>. Public routes, Blade vars, Livewire properties, API response keys, DB columns — preserved across versions. Feature flags, tests, and incremental delivery beat heroic rewrites every time.
              </p>
              <p>
                Outside work I&apos;m exploring AI tooling, photography, and a slow-burning side ambition
                to open a fuel station near Pune.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={siteConfig.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:bg-[var(--color-bg-muted)]"
              >
                <Download className="h-4 w-4" />
                Résumé
              </a>
              <span className="font-mono text-xs text-[var(--color-fg-subtle)]">{siteConfig.capacity}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
