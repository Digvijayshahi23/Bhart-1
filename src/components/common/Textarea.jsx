import React from "react";
import clsx from "clsx";

export const Textarea = React.forwardRef(
  ({ className, label, error, id, helperText, rows = 4, ...props }, ref) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text-secondary select-none"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={clsx(
            "w-full bg-surface border rounded-lg px-4 py-2 text-base text-text-primary transition-all duration-200 outline-none placeholder:text-text-muted resize-y",
            "focus:border-primary focus:ring-1 focus:ring-primary",
            {
              "border-danger focus:border-danger focus:ring-danger": error,
              "border-border-subtle": !error,
            },
            className,
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-danger font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-text-muted">{helperText}</span>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
