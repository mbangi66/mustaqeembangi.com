"use client";

import { useRef, useEffect } from "react";

const MAX_SHIFT = 6; // px

export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Only nudge: never move far enough to overlap a neighbour.
      const clamp = (v: number) => Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, v));
      const dx = clamp((e.clientX - cx) * strength);
      const dy = clamp((e.clientY - cy) * strength);
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };

    // Listen on the element itself, not its parent, so hovering one
    // button never drags its neighbour across.
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", transition: "transform 300ms cubic-bezier(0.22,1,0.36,1)" }}
    >
      {children}
    </span>
  );
}
