import clsx from "clsx";

export function GlassCard({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "glass-panel p-5 flex flex-col gap-4 transition-all duration-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
