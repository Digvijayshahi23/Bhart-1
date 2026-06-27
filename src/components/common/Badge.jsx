import clsx from "clsx";

export function Badge({ children, variant = "primary", className, ...props }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none border",
        {
          "bg-primary/5 text-primary border-primary/20": variant === "primary",
          "bg-saffron/10 text-saffron border-saffron/20": variant === "saffron",
          "bg-green/10 text-green border-green/20": variant === "green",
          "bg-accent/10 text-accent border-accent/20": variant === "accent",
          "bg-danger/10 text-danger border-danger/20": variant === "danger",
          "bg-surface-secondary text-text-secondary border-border-subtle":
            variant === "secondary",
        },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
