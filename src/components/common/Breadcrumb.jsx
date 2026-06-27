import React from "react";
import { ChevronRight, Home } from "lucide-react";
import clsx from "clsx";

export function Breadcrumb({ items = [], className, ...props }) {
  return (
    <nav
      className={clsx(
        "flex items-center gap-1.5 text-xs text-text-secondary select-none",
        className,
      )}
      {...props}
    >
      <a
        href="/"
        className="hover:text-primary transition-colors flex items-center gap-1"
      >
        <Home className="h-3.5 w-3.5" />
      </a>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="h-3 w-3 text-text-muted shrink-0" />
          {item.to ? (
            <a href={item.to} className="hover:text-primary transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-text-muted font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
