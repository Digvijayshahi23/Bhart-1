import clsx from "clsx";
import { CheckCircle2, Circle } from "lucide-react";

export function Timeline({ steps = [], className, ...props }) {
  return (
    <div className={clsx("flex flex-col w-full", className)} {...props}>
      {steps.map((step, idx) => {
        const isCompleted = step.status === "completed";
        const isActive = step.status === "active";

        return (
          <div key={idx} className="flex gap-4 group">
            {/* Timeline Line & Icon */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 shrink-0",
                  {
                    "bg-green/10 border-green text-green": isCompleted,
                    "bg-accent/10 border-accent text-accent animate-pulse":
                      isActive,
                    "bg-surface border-border-subtle text-text-muted":
                      !isCompleted && !isActive,
                  },
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Circle className="h-4 w-4 fill-current" />
                )}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={clsx("w-0.5 h-12 transition-colors duration-200", {
                    "bg-green": isCompleted,
                    "bg-border-subtle": !isCompleted,
                  })}
                />
              )}
            </div>

            {/* Timeline Content */}
            <div className="flex flex-col pb-6 text-left">
              <span
                className={clsx(
                  "text-base font-semibold leading-tight font-serif",
                  {
                    "text-text-primary": isCompleted || isActive,
                    "text-text-secondary": !isCompleted && !isActive,
                  },
                )}
              >
                {step.title}
              </span>
              {step.description && (
                <p className="text-sm text-text-secondary mt-1">
                  {step.description}
                </p>
              )}
              {step.date && (
                <span className="text-[10px] text-text-muted mt-1.5 uppercase font-medium tracking-wider">
                  {step.date}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
