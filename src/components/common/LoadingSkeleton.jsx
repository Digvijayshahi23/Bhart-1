import clsx from "clsx";

export function LoadingSkeleton({ variant = "text", className, ...props }) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-surface-hover rounded",
        {
          "h-4 w-full": variant === "text",
          "h-6 w-32": variant === "title",
          "w-12 h-12 rounded-full": variant === "avatar",
          "h-40 w-full rounded-xl": variant === "card",
        },
        className,
      )}
      {...props}
    />
  );
}
