import { useState } from "react";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

export function Accordion({
  title,
  children,
  defaultExpanded = false,
  className,
  ...props
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={clsx(
        "border border-border-subtle rounded-xl overflow-hidden bg-surface transition-all duration-200",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 font-semibold text-text-primary hover:bg-surface-hover outline-none text-left"
        aria-expanded={isExpanded}
      >
        <span className="font-serif text-base">{title}</span>
        <ChevronRight
          className={clsx(
            "h-5 w-5 text-text-muted transition-transform duration-200",
            { "transform rotate-90": isExpanded },
          )}
        />
      </button>
      <div
        className={clsx(
          "transition-all duration-300 ease-in-out overflow-hidden border-t border-border-subtle",
          {
            "max-h-[1000px] p-4 bg-surface-secondary/30": isExpanded,
            "max-h-0 border-t-transparent": !isExpanded,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}
