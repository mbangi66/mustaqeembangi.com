import Image from "next/image";
import { cn } from "@/lib/utils";

export type PlanetName =
  | "jupiter"
  | "earth"
  | "neptune"
  | "uranus"
  | "venus"
  | "mars"
  | "mercury"
  | "saturn"
  | "ceres"
  | "makemake";

/**
 * A real planet, pre-rendered from mission-based surface maps (see
 * public/planets). A soft glow in the card's colour sits behind it.
 */
export function Planet({
  name,
  color,
  className,
  sizes = "300px",
}: {
  name: PlanetName;
  color: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      <div
        className="absolute inset-[14%] rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-70"
        style={{ background: color, opacity: 0.35 }}
      />
      <Image
        src={`/planets/${name}.webp`}
        alt=""
        fill
        sizes={sizes}
        className="object-contain transition-transform duration-[1.2s] ease-out group-hover:rotate-[4deg] group-hover:scale-[1.03]"
      />
    </div>
  );
}

/**
 * The Moon, rendered from NASA's Lunar Reconnaissance Orbiter colour map
 * (public domain), lit as a waxing gibbous.
 */
export function Moon({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgba(226,232,240,0.16)_45%,transparent_72%)] blur-2xl" />
      <Image src="/moon.webp" alt="" fill sizes="(max-width: 640px) 72vw, 620px" className="object-contain" />
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
