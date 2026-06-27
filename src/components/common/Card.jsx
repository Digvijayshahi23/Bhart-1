import clsx from "clsx";

export function Card({
  children,
  className,
  title,
  subtitle,
  actions,
  hoverable = false,
  ...props
}) {
  return (
    <div
      className={clsx(
        "glass-panel p-5 flex flex-col gap-4 transition-all duration-300",
        {
          "hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5":
            hoverable,
        },
        className,
      )}
      {...props}
    >
      {(title || subtitle || actions) && (
        <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-3">
          <div className="flex flex-col gap-0.5">
            {title && (
              <h3 className="text-lg font-semibold text-text-primary leading-tight font-serif">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-text-secondary">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
