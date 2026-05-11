import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-fg-subtle)]">
        <span className="h-px w-6 bg-[var(--color-border-strong)]" />
        {eyebrow}
      </div>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-pretty text-base text-[var(--color-fg-muted)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
