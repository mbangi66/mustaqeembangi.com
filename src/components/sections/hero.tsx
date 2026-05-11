"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, Mail, MoveDown, MousePointer2 } from "lucide-react";
import { kpis, siteConfig } from "@/lib/data";
import { Magnetic } from "@/components/magnetic";

const InteractiveScene = dynamic(
  () => import("@/components/interactive-scene").then((m) => m.InteractiveScene),
  { ssr: false },
);

const lineUp = {
  hidden: { y: "115%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.95, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-bg)]"
    >
      <InteractiveScene />

      {/* layered atmospherics */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-[radial-gradient(70%_55%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%),radial-gradient(45%_35%_at_85%_80%,rgba(6,182,212,0.10),transparent_70%),radial-gradient(40%_30%_at_15%_70%,rgba(59,130,246,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-dot-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-40 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fg-subtle)] sm:mb-12"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span>Available · Q3 2026</span>
          <span className="h-3 w-px bg-[var(--color-border-strong)]" />
          <span>Senior Laravel & Systems Engineer</span>
          <span className="hidden h-3 w-px bg-[var(--color-border-strong)] sm:inline" />
          <span className="hidden sm:inline">Kuwait City · GMT+3</span>
        </motion.div>

        {/* huge mixed-type headline */}
        <h1 className="font-sans text-[clamp(3.5rem,12vw,11rem)] font-extrabold leading-[0.88] tracking-[-0.045em]">
          <span className="block overflow-hidden">
            <motion.span variants={lineUp} initial="hidden" animate="show" custom={0} className="inline-block">
              I&nbsp;ship&nbsp;
            </motion.span>
            <motion.span variants={lineUp} initial="hidden" animate="show" custom={1} className="inline-block bg-gradient-to-br from-brand-300 via-brand-500 to-accent-500 bg-clip-text text-transparent">
              Laravel
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span variants={lineUp} initial="hidden" animate="show" custom={2} className="inline-block font-serif italic font-normal text-[var(--color-fg-muted)]">
              to&nbsp;
            </motion.span>
            <motion.span variants={lineUp} initial="hidden" animate="show" custom={3} className="inline-block bg-gradient-to-tr from-accent-400 via-brand-500 to-cyan-400 bg-clip-text text-transparent">
              production.
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--color-fg-muted)] sm:text-xl"
        >
          I architect and ship production SaaS for the GCC — <span className="text-[var(--color-fg)]">competitive intelligence</span>, <span className="text-[var(--color-fg)]">fleet telematics</span>, <span className="text-[var(--color-fg)]">WhatsApp commerce</span>. Backward compatible from day one. Drag the scene above.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <Magnetic strength={0.22}>
            <a
              href="#work"
              data-cursor="link"
              className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-fg)] px-7 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-bg)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                See the work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span
                aria-hidden
                className="absolute inset-0 z-0 translate-y-full bg-gradient-to-tr from-brand-500 via-brand-400 to-accent-400 transition-transform duration-500 group-hover:translate-y-0"
              />
            </a>
          </Magnetic>

          <Magnetic strength={0.22}>
            <a
              href={`mailto:${siteConfig.email}`}
              data-cursor="link"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/60 px-7 font-mono text-sm text-[var(--color-fg)] backdrop-blur-md transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-muted)]"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
          </Magnetic>
        </motion.div>

        {/* KPI band */}
        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-[var(--color-border)] pt-10 sm:grid-cols-4 sm:gap-x-10"
        >
          {kpis.map((k) => (
            <div key={k.label}>
              <dt className="font-sans text-4xl font-extrabold tracking-[-0.04em] text-[var(--color-fg)] sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-br from-[var(--color-fg)] to-[var(--color-fg-muted)] bg-clip-text text-transparent">
                  {k.value}
                </span>
              </dt>
              <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:text-[11px]">
                {k.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* corner: drag hint */}
      <div className="pointer-events-none absolute right-6 top-28 hidden flex-col items-end gap-1 text-right md:flex">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)] backdrop-blur-md">
          <MousePointer2 className="h-3 w-3" />
          drag the scene
        </span>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        data-cursor="link"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <MoveDown className="h-3.5 w-3.5 motion-safe:animate-bounce" />
      </motion.a>
    </section>
  );
}
