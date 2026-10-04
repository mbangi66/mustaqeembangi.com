import { cn } from "@/lib/utils";

/** Elliptical ring band (with a small gap, like Saturn's) for one planet colour. */
const ringBand = (color: string) =>
  `radial-gradient(closest-side, transparent 66%, color-mix(in srgb, ${color} 55%, white 20%) 68%, color-mix(in srgb, ${color} 70%, white 45%) 78%, transparent 80%, transparent 82%, color-mix(in srgb, ${color} 60%, white 15%) 84%, transparent 92%)`;

/**
 * A CSS-only planet with a full tilted ring. The ring is drawn twice:
 * once behind the planet, and once in front with its top half clipped
 * away, so it reads as one continuous ring wrapping the planet.
 */
export function Planet({ color, className }: { color: string; className?: string }) {
  const ring = "absolute left-1/2 top-1/2 h-[30%] w-[138%] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg]";
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      {/* Atmosphere glow */}
      <div
        className="absolute inset-[8%] rounded-full blur-2xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: `color-mix(in srgb, ${color} 55%, transparent)`, opacity: 0.55 }}
      />

      {/* Ring, far side (hidden behind the planet in the middle) */}
      <div className={ring} style={{ background: ringBand(color), opacity: 0.7 }} />

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
              "repeating-linear-gradient(-16deg, transparent 0 9%, rgba(255,255,255,0.35) 9% 11%, transparent 11% 19%, rgba(0,0,0,0.35) 19% 23%)",
          }}
        />
      </div>

      {/* Ring, near side (crosses in front of the planet) */}
      <div
        className={cn(ring, "[clip-path:inset(50%_0_0_0)]")}
        style={{ background: ringBand(color), filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </div>
  );
}

/**
 * A large CSS moon: grey disc, maria and craters, lit from the upper left
 * with a soft terminator. Used as a backdrop, not part of any orbit.
 */
export function Moon({ className }: { className?: string }) {
  const craters = [
    [28, 34, 9], [58, 22, 6], [70, 48, 11], [40, 62, 7], [22, 70, 5], [62, 74, 8],
    [48, 40, 4], [80, 30, 4], [34, 18, 3], [12, 48, 4], [54, 88, 4], [86, 62, 3],
  ];
  return (
    <div aria-hidden className={cn("relative aspect-square rounded-full", className)}>
      {/* Halo */}
      <div className="absolute -inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.18)_40%,transparent_70%)] blur-2xl" />
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, #f1f1f4 0%, #c9c8d0 30%, #8f8d99 62%, #55535f 100%)",
        }}
      >
        {/* Maria: darker, smoother plains */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(22% 18% at 38% 42%, rgba(80,78,92,0.45), transparent 70%), radial-gradient(18% 22% at 62% 34%, rgba(80,78,92,0.4), transparent 70%), radial-gradient(26% 16% at 54% 64%, rgba(80,78,92,0.35), transparent 70%)",
          }}
        />
        {/* Craters: dark floor, light rim on the sun side */}
        {craters.map(([x, y, r], i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${x - r / 2}%`,
              top: `${y - r / 2}%`,
              width: `${r}%`,
              height: `${r}%`,
              background: "rgba(92,90,104,0.28)",
              boxShadow: "inset 3px 3px 4px rgba(40,38,48,0.35), inset -1px -1px 1px rgba(255,255,255,0.18)",
            }}
          />
        ))}
        {/* Night side */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,transparent_52%,rgba(3,4,10,0.55)_72%,rgba(3,4,10,0.92)_100%)]" />
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
