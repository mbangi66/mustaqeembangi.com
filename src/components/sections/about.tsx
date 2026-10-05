"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Download, MapPin } from "lucide-react";
import { principles, siteConfig } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-[var(--color-border)] py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[240px] sm:max-w-xs lg:max-w-sm"
          >
            {/* Orbit rings around the portrait */}
            <div aria-hidden className="pointer-events-none absolute -inset-3 rounded-full border border-white/[0.07] sm:-inset-5" />
            <div aria-hidden className="pointer-events-none absolute -inset-3 motion-safe:animate-[spin_24s_linear_infinite] sm:-inset-5">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-300 shadow-[0_0_14px_3px_rgba(251,146,60,0.7)]" />
            </div>
            <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-full border border-dashed sm:-inset-10 border-white/[0.05]" />
            <div aria-hidden className="pointer-events-none absolute -inset-6 motion-safe:animate-[spin_40s_linear_infinite_reverse] sm:-inset-10">
              <span className="absolute bottom-[14%] left-[6%] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_12px_3px_rgba(167,139,250,0.7)]" />
            </div>

            <div className="relative aspect-square w-full overflow-hidden rounded-full border border-white/10 shadow-[0_0_90px_-20px_rgba(139,92,246,0.7)]">
              <Image
                src={siteConfig.avatar}
                alt={siteConfig.fullName}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </div>
            <div className="mt-14 flex items-center justify-center gap-2 whitespace-nowrap text-xs text-[var(--color-fg-subtle)]">
              <MapPin className="h-3 w-3" />
              <span className="font-mono">
                {siteConfig.location} · {siteConfig.coordinates}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-[11px] sm:tracking-[0.22em]">
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              About
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
              I build the systems Gulf businesses <span className="font-serif font-normal italic">run on</span>.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
              <p>
                I&apos;m Mustaqeem, a <span className="text-[var(--color-fg)]">Senior Laravel & Systems Engineer</span>{" "}
                based in Kuwait City and originally from Maharashtra, India. I&apos;ve been building for the web since
                2020, and today I lead engineering on 30+ live apps for restaurants, shops, clinics, hospitals, car dealers, learning platforms
                and fleet operators.
              </p>
              <p>
                I don&apos;t just write the code and hand it over. I set up the payments and WhatsApp, run the
                servers, ship the updates and keep the backups. Most of what I work on is live and making money for
                someone, so I&apos;m careful with it.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {principles.map((p) => (
                <li
                  key={p.title}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/60 p-4 backdrop-blur-sm"
                >
                  <p className="text-sm font-semibold text-[var(--color-fg)]">{p.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-fg-muted)]">{p.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={siteConfig.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white/[0.04] px-5 text-sm font-medium text-[var(--color-fg)] transition-colors hover:bg-white/[0.08]"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
              <span className="font-mono text-xs text-[var(--color-fg-subtle)]">{siteConfig.availability}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
