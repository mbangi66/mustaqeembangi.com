"use client";

import { useEffect, useState } from "react";
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
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqDesktop = window.matchMedia("(min-width: 768px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setShowScene(mqDesktop.matches && !mqReduce.matches);
    update();
    mqDesktop.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    return () => {
      mqDesktop.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-bg)]"
    >
      {showScene && <InteractiveScene />}

      {/* layered atmospherics — visible on all viewports */}
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)] sm:mb-12 sm:text-[11px] sm:tracking-[0.22em]"
        >
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <span>Available · Q3 2026</span>
          <span className="hidden h-3 w-px bg-[var(--color-border-strong)] sm:inline" />
          <span className="hidden sm:inline">Senior Laravel & Systems Engineer</span>
          <span className="hidden h-3 w-px bg-[var(--color-border-strong)] sm:inline" />
          <span>Kuwait · GMT+3</span>
        </motion.div>

        {/* huge mixed-type headline */}
        <h1 className="font-sans text-[clamp(2.75rem,11vw,11rem)] font-extrabold leading-[0.92] tracking-[-0.045em] sm:leading-[0.88]">
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
          className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[var(--color-fg-muted)] sm:mt-10 sm:text-xl"
        >
          I architect and ship production SaaS for the GCC — <span className="text-[var(--color-fg)]">competitive intelligence</span>, <span className="text-[var(--color-fg)]">fleet telematics</span>, <span className="text-[var(--color-fg)]">WhatsApp commerce</span>. Backward compatible from day one.
          {showScene && <span className="hidden md:inline"> Drag the scene above.</span>}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
        >
          <Magnetic strength={0.22}>
            <a
              href="#work"
              data-cursor="link"
              className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--color-fg)] px-6 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-bg)] sm:h-14 sm:w-auto sm:px-7"
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
              aria-label={`Email ${siteConfig.email}`}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/60 px-6 font-mono text-sm text-[var(--color-fg)] backdrop-blur-md transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-muted)] sm:h-14 sm:w-auto sm:px-7"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">{siteConfig.email}</span>
              <span className="sm:hidden">Email me</span>
            </a>
          </Magnetic>
        </motion.div>

        {/* KPI band */}
        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-16 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-[var(--color-border)] pt-8 sm:mt-20 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-10 sm:pt-10"
        >
          {kpis.map((k) => (
            <div key={k.label}>
              <dt className="font-sans text-3xl font-extrabold tracking-[-0.04em] text-[var(--color-fg)] sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-br from-[var(--color-fg)] to-[var(--color-fg-muted)] bg-clip-text text-transparent">
                  {k.value}
                </span>
              </dt>
              <dd className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] sm:mt-2 sm:text-[11px] sm:tracking-[0.18em]">
                {k.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* corner: drag hint — desktop only */}
      {showScene && (
        <div className="pointer-events-none absolute right-6 top-28 hidden flex-col items-end gap-1 text-right md:flex">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)] backdrop-blur-md">
            <MousePointer2 className="h-3 w-3" />
            drag the scene
          </span>
        </div>
      )}

      {/* scroll cue — desktop only (mobile users already know how to scroll) */}
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
