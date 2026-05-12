"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "link" | "drag" | "hidden">("hidden");
  const [enabled, setEnabled] = useState(false);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let firstMove = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!firstMove) {
        firstMove = true;
        rx = x;
        ry = y;
        setMoved(true);
        setVariant("default");
      }
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      const t = e.target as HTMLElement | null;
      if (t?.closest("canvas")) setVariant("drag");
      else if (t?.closest("a, button, [data-cursor='link']")) setVariant("link");
      else setVariant("default");
    };
    const onLeave = () => setVariant("hidden");
    const onEnter = () => {
      if (firstMove) setVariant("default");
    };

    let raf = 0;
    const tick = () => {
      if (firstMove) {
        rx += (x - rx) * 0.18;
        ry += (y - ry) * 0.18;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!enabled || !moved) return null;

  const ringStyle = (() => {
    if (variant === "hidden") return { opacity: 0, width: 36, height: 36 };
    if (variant === "link") return { opacity: 1, width: 64, height: 64, background: "rgba(99,102,241,0.18)" };
    if (variant === "drag") return { opacity: 1, width: 80, height: 80, background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.9)" };
    return { opacity: 0.7, width: 36, height: 36, background: "transparent" };
  })();

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden rounded-full border transition-[width,height,opacity,background-color,border-color] duration-200 ease-out md:block"
        style={{
          mixBlendMode: "difference",
          borderColor: "rgba(255,255,255,0.55)",
          ...ringStyle,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] hidden h-1.5 w-1.5 rounded-full bg-white transition-opacity duration-150 md:block"
        style={{ mixBlendMode: "difference", opacity: variant === "hidden" ? 0 : 1 }}
      />
      {variant === "drag" && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[201] hidden -translate-x-1/2 translate-y-12 select-none rounded-md border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fg-muted)] backdrop-blur md:block"
          style={{ left: `${ringRef.current?.getBoundingClientRect().left ?? 0}px`, top: `${ringRef.current?.getBoundingClientRect().top ?? 0}px` }}
        >
          drag · spin
        </div>
      )}
    </>
  );
}
