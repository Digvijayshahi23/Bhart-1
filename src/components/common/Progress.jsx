import clsx from "clsx";

export function Progress({
  value = 0,
  max = 100,
  variant = "primary",
  showLabel = false,
  className,
  ...props
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={clsx("flex flex-col gap-1 w-full", className)} {...props}>
      {showLabel && (
        <div className="flex items-center justify-between text-xs font-semibold text-text-secondary select-none">
          <span>प्रगति (Progress)</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden border border-border-subtle">
        <div
          className={clsx("h-full rounded-full transition-all duration-300", {
            "bg-primary": variant === "primary",
            "bg-saffron": variant === "saffron",
            "bg-green": variant === "green",
            "bg-accent": variant === "accent",
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
