import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export function Dropdown({
  className,
  label,
  options = [],
  value,
  onChange,
  placeholder = "चुनें... (Select...)",
  error,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="flex flex-col gap-1.5 w-full relative">
      {label && (
        <span className="text-sm font-medium text-text-secondary select-none">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "w-full bg-surface border rounded-lg px-4 py-2 text-base flex items-center justify-between text-text-primary transition-all duration-200 outline-none text-left",
          "focus:border-primary focus:ring-1 focus:ring-primary",
          {
            "border-danger focus:border-danger focus:ring-danger": error,
            "border-border-subtle": !error,
          },
          className,
        )}
        {...props}
      >
        <span className={clsx({ "text-text-muted": !selectedOption })}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={clsx(
            "h-5 w-5 text-text-muted transition-transform duration-200",
            { "transform rotate-180": isOpen },
          )}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-[calc(100%+4px)] left-0 z-50 w-full max-h-60 overflow-y-auto bg-surface border border-border-subtle rounded-lg shadow-lg py-1 outline-none">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={clsx(
                "px-4 py-2.5 text-sm text-text-primary hover:bg-surface-hover cursor-pointer transition-colors duration-150",
                {
                  "bg-surface-secondary font-semibold text-accent":
                    opt.value === value,
                },
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <span className="text-xs text-danger font-medium mt-1">{error}</span>
      )}
    </div>
  );
}
