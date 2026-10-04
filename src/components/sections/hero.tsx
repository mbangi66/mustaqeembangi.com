"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, Download, MoveDown } from "lucide-react";
import { kpis, siteConfig } from "@/lib/data";
import { Magnetic } from "@/components/magnetic";
import { CssBlackHole } from "@/components/planet";

const BlackHoleScene = dynamic(
  () => import("@/components/black-hole-scene").then((m) => m.BlackHoleScene),
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

let webglSupport: boolean | undefined;
function supportsWebGL() {
  if (webglSupport === undefined) {
    try {
      const c = document.createElement("canvas");
      webglSupport = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

const REDUCE = "(prefers-reduced-motion: reduce)";
const NARROW = "(max-width: 767px)";

function subscribeMedia(onChange: () => void) {
  const queries = [REDUCE, NARROW].map((q) => window.matchMedia(q));
  queries.forEach((mq) => mq.addEventListener("change", onChange));
  return () => queries.forEach((mq) => mq.removeEventListener("change", onChange));
}

type SceneMode = "pending" | "webgl" | "css";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const mode = useSyncExternalStore<SceneMode>(
    subscribeMedia,
    () => (!window.matchMedia(REDUCE).matches && supportsWebGL() ? "webgl" : "css"),
    () => "pending",
  );
  const narrow = useSyncExternalStore(
    subscribeMedia,
    () => window.matchMedia(NARROW).matches,
    () => false,
  );
  const [visible, setVisible] = useState(true);

  // Stop rendering the 3D scene once the hero scrolls out of view.
  useEffect(() => {
    if (!section.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(section.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {mode === "webgl" && (
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.2 }}
        >
          <BlackHoleScene active={visible} particles={narrow ? 250 : 500} />
        </motion.div>
      )}

      {mode === "css" && (
        <CssBlackHole className="absolute left-1/2 top-[8%] -z-10 w-[min(80vw,340px)] -translate-x-1/2 md:left-auto md:right-[6%] md:top-1/2 md:w-[min(38vw,520px)] md:translate-x-0 md:-translate-y-1/2" />
      )}

      {/* Keep text readable over the scene */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(90deg,rgba(3,4,10,0.85)_0%,rgba(3,4,10,0.45)_45%,transparent_70%)] max-md:bg-[linear-gradient(180deg,transparent_0%,transparent_30%,rgba(3,4,10,0.75)_52%,rgba(3,4,10,0.9)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-40 bg-gradient-to-b from-transparent to-[var(--color-bg)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-24">
        {/* On phones the black hole sits above the headline */}
        <div aria-hidden className="h-[30svh] md:hidden" />

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
          <span>Available for work</span>
          <span className="hidden h-3 w-px bg-[var(--color-border-strong)] sm:inline" />
          <span className="hidden sm:inline">{siteConfig.coordinates}</span>
          <span className="h-3 w-px bg-[var(--color-border-strong)]" />
          <span>Kuwait · GMT+3</span>
        </motion.div>

        <h1 className="max-w-4xl font-sans text-[clamp(2.75rem,8.6vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.045em] sm:leading-[0.88]">
          <span className="-mb-[0.26em] block overflow-hidden pb-[0.26em]">
            <motion.span variants={lineUp} initial="hidden" animate="show" custom={0} className="inline-block">
              From&nbsp;
            </motion.span>
            <motion.span
              variants={lineUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="inline-block bg-gradient-to-br from-amber-200 via-orange-400 to-fuchsia-500 bg-clip-text text-transparent"
            >
              first&nbsp;idea
            </motion.span>
          </span>
          <span className="-mb-[0.26em] block overflow-hidden pb-[0.26em]">
            <motion.span
              variants={lineUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="inline-block font-serif font-normal italic text-[var(--color-fg-muted)]"
            >
              to&nbsp;
            </motion.span>
            <motion.span
              variants={lineUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="inline-block bg-gradient-to-tr from-violet-400 via-brand-400 to-sky-300 bg-clip-text text-transparent"
            >
              full&nbsp;orbit.
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-[var(--color-fg-muted)] sm:mt-10 sm:text-xl"
        >
          I&apos;m a Laravel engineer in Kuwait. I take business ideas from a sketch to a live system:{" "}
          <span className="text-[var(--color-fg)]">restaurants</span>,{" "}
          <span className="text-[var(--color-fg)]">clinics</span>,{" "}
          <span className="text-[var(--color-fg)]">online stores</span>,{" "}
          <span className="text-[var(--color-fg)]">WhatsApp</span> and{" "}
          <span className="text-[var(--color-fg)]">AI</span>. Then I keep them flying.
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
              <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
                See the work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span
                aria-hidden
                className="absolute inset-0 z-0 translate-y-full bg-gradient-to-tr from-orange-500 via-fuchsia-500 to-violet-500 transition-transform duration-500 group-hover:translate-y-0"
              />
            </a>
          </Magnetic>

          <Magnetic strength={0.22}>
            <a
              href={siteConfig.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-white/[0.03] px-6 font-mono text-sm text-[var(--color-fg)] backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/[0.07] sm:h-14 sm:w-auto sm:px-7"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </Magnetic>
        </motion.div>

        {/* KPI band */}
        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-16 grid max-w-4xl grid-cols-2 gap-x-5 gap-y-8 border-t border-[var(--color-border)] pt-8 sm:mt-20 sm:grid-cols-4 sm:gap-x-10 sm:pt-10"
        >
          {kpis.map((k) => (
            <div key={k.label} className="flex flex-col-reverse">
              <dt className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] sm:mt-2 sm:text-[11px] sm:tracking-[0.18em]">
                {k.label}
              </dt>
              <dd className="font-sans text-3xl font-extrabold tracking-[-0.04em] text-[var(--color-fg)] sm:text-5xl">
                {k.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

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
