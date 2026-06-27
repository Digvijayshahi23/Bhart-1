import { Bell, Search, User } from "lucide-react";
import { Button } from "./Button.jsx";

export function Header({ title = "डॅशबोर्ड (Dashboard)" }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-surface-glass/40 border-b border-border-subtle backdrop-blur-md sticky top-0 z-30">
      {/* Title & Breadcrumb */}
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-text-secondary tracking-wider uppercase font-medium">
          BharatOne AI
        </span>
        <h1 className="text-xl font-bold text-text-primary font-serif leading-none mt-0.5">
          {title}
        </h1>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Search status summary */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="खोजें... (Search...)"
            className="bg-surface-secondary/60 border border-border-subtle rounded-lg pl-9 pr-4 py-1.5 text-xs text-text-primary w-48 focus:w-60 focus:border-primary transition-all duration-300 outline-none"
          />
        </div>

        {/* Notifications Button */}
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover"
          aria-label="View notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-danger rounded-full ring-2 ring-background animate-pulse" />
        </Button>

        {/* User status box */}
        <div className="flex items-center gap-2 pl-2 border-l border-border-subtle">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-text-primary leading-none">
              नमस्ते, नागरिक
            </span>
            <span className="text-[9px] text-text-secondary mt-1">
              Citizen Sandbox
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
