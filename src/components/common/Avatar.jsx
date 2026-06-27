import clsx from "clsx";

export function Avatar({
  src,
  alt = "User Avatar",
  fallback,
  size = "md",
  className,
  ...props
}) {
  return (
    <div
      className={clsx(
        "relative rounded-full overflow-hidden shrink-0 bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary select-none",
        {
          "w-8 h-8 text-xs": size === "sm",
          "w-10 h-10 text-sm": size === "md",
          "w-14 h-14 text-lg": size === "lg",
        },
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback || "U"}</span>
      )}
    </div>
  );
}
