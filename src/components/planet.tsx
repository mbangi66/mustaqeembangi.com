import { cn } from "@/lib/utils";

/**
 * A CSS-only planet with a tilted ring and a small orbiting moon.
 * Coloured by `color`; no images, no WebGL.
 */
export function Planet({ color, className }: { color: string; className?: string }) {
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      {/* Atmosphere glow */}
      <div
        className="absolute inset-[8%] rounded-full blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `color-mix(in srgb, ${color} 55%, transparent)`, opacity: 0.55 }}
      />

      {/* Ring, back half (sits behind the planet) */}
      <div
        className="absolute left-1/2 top-1/2 h-[26%] w-[120%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border-[3px] border-b-transparent border-l-transparent border-r-transparent"
        style={{ borderTopColor: `color-mix(in srgb, ${color} 55%, white 10%)`, opacity: 0.55 }}
      />

      {/* Planet body */}
      <div
        className="absolute inset-[22%] overflow-hidden rounded-full transition-transform duration-700 group-hover:scale-[1.04]"
        style={{
          background: `radial-gradient(circle at 32% 28%, color-mix(in srgb, ${color} 35%, white) 0%, ${color} 28%, color-mix(in srgb, ${color} 45%, #05060d) 62%, #03040a 100%)`,
          boxShadow: `inset -18px -14px 40px rgba(0,0,0,0.75), 0 0 60px -10px ${color}`,
        }}
      >
        {/* Cloud bands */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(-18deg, transparent 0 9%, rgba(255,255,255,0.35) 9% 11%, transparent 11% 19%, rgba(0,0,0,0.35) 19% 23%)",
          }}
        />
      </div>

      {/* Ring, front half (crosses in front of the planet) */}
      <div
        className="absolute left-1/2 top-1/2 h-[26%] w-[120%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] rounded-[50%] border-[3px] border-t-transparent border-l-transparent border-r-transparent"
        style={{
          borderBottomColor: `color-mix(in srgb, ${color} 60%, white 25%)`,
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      />

      {/* Orbiting moon */}
      <div className="absolute inset-[4%] motion-safe:animate-[spin_18s_linear_infinite]">
        <span
          className="absolute left-1/2 top-0 h-[7%] w-[7%] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 30%, #f4f4f5, #71717a 70%)",
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

/** Static CSS black hole, shown when WebGL is off or motion is reduced. */
export function CssBlackHole({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.35)_0%,rgba(124,58,237,0.12)_35%,transparent_65%)] blur-xl" />
      <div
        className="absolute left-1/2 top-1/2 h-[30%] w-[115%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] rounded-[50%] blur-[2px] motion-safe:animate-pulse"
        style={{
          background:
            "radial-gradient(closest-side, transparent 38%, rgba(255,245,230,0.95) 42%, rgba(251,146,60,0.85) 52%, rgba(139,92,246,0.55) 72%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-[31%] rounded-full bg-black"
        style={{ boxShadow: "0 0 0 2px rgba(255,214,170,0.85), 0 0 24px 6px rgba(251,146,60,0.55), 0 0 80px 20px rgba(139,92,246,0.35)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[30%] w-[115%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] rounded-[50%] [clip-path:inset(50%_0_0_0)] blur-[2px]"
        style={{
          background:
            "radial-gradient(closest-side, transparent 38%, rgba(255,245,230,0.95) 42%, rgba(251,146,60,0.85) 52%, rgba(139,92,246,0.55) 72%, transparent 100%)",
        }}
      />
    </div>
  );
}
