"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; depth: number; phase: number; speed: number; hue: number };
type Meteor = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * Fixed starfield behind the whole page: three depth layers that drift
 * with scroll, slow twinkle, and an occasional shooting star.
 * Draws one static frame when the visitor prefers reduced motion.
 */
export function SpaceBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let meteor: Meteor | null = null;
    let raf = 0;
    let last = performance.now();
    let nextMeteor = last + 4000;

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 2600);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height * 1.6,
          r: 0.3 + depth * 1.15,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.4,
          // Mostly white, a few blue and warm stars.
          hue: Math.random() < 0.12 ? 215 : Math.random() < 0.08 ? 30 : 0,
        };
      });
    };

    const draw = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        const span = height * 1.6;
        let y = (s.y - scroll * (0.02 + s.depth * 0.08)) % span;
        if (y < 0) y += span;
        if (y > height + 2) continue;
        const twinkle = reduce ? 1 : 0.65 + 0.35 * Math.sin(now * 0.001 * s.speed + s.phase);
        const alpha = (0.25 + s.depth * 0.75) * twinkle;
        ctx.fillStyle =
          s.hue === 0 ? `rgba(255,255,255,${alpha})` : `hsla(${s.hue},90%,80%,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) {
        if (!meteor && now > nextMeteor) {
          meteor = {
            x: Math.random() * width * 0.8 + width * 0.2,
            y: Math.random() * height * 0.4,
            vx: -(0.6 + Math.random() * 0.5),
            vy: 0.25 + Math.random() * 0.2,
            life: 1,
          };
          nextMeteor = now + 6000 + Math.random() * 9000;
        }
        if (meteor) {
          meteor.x += meteor.vx * dt;
          meteor.y += meteor.vy * dt;
          meteor.life -= dt / 1100;
          const tail = 140;
          const g = ctx.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x - meteor.vx * tail,
            meteor.y - meteor.vy * tail,
          );
          g.addColorStop(0, `rgba(255,255,255,${Math.max(meteor.life, 0)})`);
          g.addColorStop(1, "rgba(165,180,252,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - meteor.vx * tail, meteor.y - meteor.vy * tail);
          ctx.stroke();
          if (meteor.life <= 0) meteor = null;
        }
        raf = requestAnimationFrame(draw);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) start();
    };

    const onResize = () => {
      build();
      if (reduce) draw(performance.now());
    };

    const onScroll = () => {
      if (reduce) draw(performance.now());
    };

    build();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Nebula washes */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_80%_10%,rgba(124,58,237,0.16),transparent_70%),radial-gradient(50%_40%_at_10%_60%,rgba(37,99,235,0.12),transparent_70%),radial-gradient(45%_35%_at_70%_95%,rgba(236,72,153,0.08),transparent_70%)]" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
