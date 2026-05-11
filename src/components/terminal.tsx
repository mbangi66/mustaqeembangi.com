"use client";

import { useEffect, useState, useRef } from "react";
import { deployRuns, type DeployStep } from "@/lib/data";

const TYPING_MS_PER_CHAR = 14;
const STEP_PAUSE_MS = 280;
const RUN_HOLD_MS = 4200;

function kindClass(kind: DeployStep["kind"]) {
  switch (kind) {
    case "cmd":
      return "text-[var(--color-fg)]";
    case "ok":
      return "text-emerald-300/90";
    case "info":
      return "text-brand-300";
    case "warn":
      return "text-amber-300";
    default:
      return "text-[var(--color-fg-subtle)]";
  }
}

function prefix(kind: DeployStep["kind"]) {
  switch (kind) {
    case "cmd":
      return <span className="mr-2 text-brand-400">$</span>;
    case "ok":
      return <span className="mr-2 text-[var(--color-fg-subtle)]">→</span>;
    case "info":
      return <span className="mr-2 text-[var(--color-fg-subtle)]">✓</span>;
    case "warn":
      return <span className="mr-2 text-amber-400">!</span>;
    default:
      return null;
  }
}

export function Terminal() {
  const [runIdx, setRunIdx] = useState(0);
  const [shownSteps, setShownSteps] = useState<DeployStep[]>([]);
  const [typing, setTyping] = useState<{ text: string; kind: DeployStep["kind"] } | null>(null);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    const run = deployRuns[runIdx];
    setShownSteps([]);
    setTyping(null);

    const tick = async () => {
      for (let i = 0; i < run.steps.length; i++) {
        if (cancelled.current) return;
        const step = run.steps[i];
        if (step.kind === "cmd") {
          // type out character by character
          for (let j = 0; j <= step.text.length; j++) {
            if (cancelled.current) return;
            setTyping({ text: step.text.slice(0, j), kind: step.kind });
            await new Promise((r) => setTimeout(r, TYPING_MS_PER_CHAR));
          }
          setShownSteps((p) => [...p, step]);
          setTyping(null);
          await new Promise((r) => setTimeout(r, STEP_PAUSE_MS));
        } else {
          await new Promise((r) => setTimeout(r, STEP_PAUSE_MS));
          if (cancelled.current) return;
          setShownSteps((p) => [...p, step]);
        }
      }
      await new Promise((r) => setTimeout(r, RUN_HOLD_MS));
      if (cancelled.current) return;
      setRunIdx((i) => (i + 1) % deployRuns.length);
    };

    tick();
    return () => {
      cancelled.current = true;
    };
  }, [runIdx]);

  const run = deployRuns[runIdx];

  return (
    <div className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/80 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
          ~ / eureka / {run.title}
        </span>
        <span className="font-mono text-[10px] text-[var(--color-fg-subtle)]">zsh</span>
      </div>

      <div className="min-h-[280px] p-5 font-mono text-[13px] leading-[1.8] sm:min-h-[320px] sm:text-sm">
        {shownSteps.map((s, i) => (
          <div key={`${runIdx}-${i}`} className={kindClass(s.kind)}>
            {prefix(s.kind)}
            <span>{s.text}</span>
          </div>
        ))}
        {typing && (
          <div className={kindClass(typing.kind)}>
            {prefix(typing.kind)}
            <span>{typing.text}</span>
            <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 bg-brand-400 align-middle motion-safe:animate-pulse" />
          </div>
        )}
        {!typing && shownSteps.length === run.steps.length && (
          <div className="text-[var(--color-fg-subtle)]">
            <span className="mr-2 text-brand-400">$</span>
            <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 bg-brand-400 align-middle motion-safe:animate-pulse" />
          </div>
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(420px 220px at 90% 0%, rgba(99,102,241,0.12), transparent 60%)",
        }}
      />
    </div>
  );
}
