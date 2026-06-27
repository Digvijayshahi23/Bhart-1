import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import {
  Home,
  MessageSquare,
  FileText,
  HeartPulse,
  Briefcase,
  Scale,
  GraduationCap,
  Sprout,
  User,
  Settings,
  Menu,
  X,
  Globe,
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("hi");

  const navItems = [
    { to: "/", label: "होम (Home)", icon: Home },
    { to: "/chat", label: "AI सहायक (AI Chat)", icon: MessageSquare },
    { to: "/schemes", label: "योजनाएँ (Schemes)", icon: FileText },
    { to: "/healthcare", label: "स्वास्थ्य सहायता (Health)", icon: HeartPulse },
    { to: "/career", label: "करियर & नौकरी (Career)", icon: Briefcase },
    { to: "/legal", label: "कानूनी सहायता (Legal)", icon: Scale },
    {
      to: "/education",
      label: "शिक्षा & छात्रवृत्ति (Edu)",
      icon: GraduationCap,
    },
    { to: "/farmers", label: "किसान सेवाएँ (Agriculture)", icon: Sprout },
    { to: "/profile", label: "मेरा प्रोफ़ाइल (Profile)", icon: User },
    { to: "/settings", label: "सेटिंग्स (Settings)", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-surface-glass border-b border-border-subtle backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">
            B
          </div>
          <span className="font-bold text-lg font-serif tracking-tight">
            BharatOne AI
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 rounded-lg hover:bg-surface-hover text-text-primary"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Layout */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 bg-surface-glass border-r border-border-subtle backdrop-blur-lg flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen",
          {
            "translate-x-0": isOpen,
            "-translate-x-full": !isOpen,
          },
        )}
      >
        <div className="flex flex-col gap-6 p-5 overflow-y-auto">
          {/* Logo Heading */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-primary/30">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg font-serif leading-none tracking-tight text-white">
                BharatOne AI
              </span>
              <span className="text-[10px] text-text-muted mt-0.5">
                Unified Citizen Platform
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-surface-hover hover:text-text-primary group",
                      {
                        "bg-primary/10 text-primary border-l-2 border-primary":
                          isActive,
                        "text-text-secondary": !isActive,
                      },
                    )
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Settings & Language Select */}
        <div className="p-5 border-t border-border-subtle flex flex-col gap-4">
          <div className="flex items-center justify-between bg-surface-secondary/50 rounded-lg p-2 border border-border-subtle">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <Globe className="h-4 w-4 text-text-muted" />
              <span>भाषा / Language</span>
            </div>
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-xs text-primary font-bold outline-none cursor-pointer border-none"
            >
              <option
                value="hi"
                className="bg-surface-secondary text-text-primary"
              >
                हिंदी
              </option>
              <option
                value="en"
                className="bg-surface-secondary text-text-primary"
              >
                English
              </option>
              <option
                value="mr"
                className="bg-surface-secondary text-text-primary"
              >
                मराठी
              </option>
              <option
                value="ta"
                className="bg-surface-secondary text-text-primary"
              >
                தமிழ்
              </option>
              <option
                value="te"
                className="bg-surface-secondary text-text-primary"
              >
                తెలుగు
              </option>
            </select>
          </div>
          <div className="text-[10px] text-text-muted text-center">
            BharatOne AI v1.0.0 © 2026
          </div>
        </div>
      </aside>

      {/* Screen Backdrop for mobile nav */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}
    </>
  );
}
