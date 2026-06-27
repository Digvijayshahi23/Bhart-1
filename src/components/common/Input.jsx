import React from "react";
import clsx from "clsx";

export const Input = React.forwardRef(
  (
    {
      className,
      label,
      error,
      type = "text",
      id,
      leftIcon,
      rightIcon,
      helperText,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-secondary select-none"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-text-muted pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={clsx(
              "w-full bg-surface-secondary border rounded-lg px-4 py-2 text-base text-text-primary transition-all duration-200 outline-none placeholder:text-text-muted",
              "focus:border-primary focus:ring-1 focus:ring-primary",
              {
                "pl-10": leftIcon,
                "pr-10": rightIcon,
                "border-danger focus:border-danger focus:ring-danger": error,
                "border-border-subtle": !error,
              },
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-text-muted pointer-events-none flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <span className="text-xs text-danger font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-text-muted">{helperText}</span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
