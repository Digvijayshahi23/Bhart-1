import { Globe } from "lucide-react";
import clsx from "clsx";

export function LanguageSwitcher({
  value = "hi",
  onChange,
  className,
  ...props
}) {
  const languages = [
    { value: "hi", label: "हिंदी (Hindi)" },
    { value: "en", label: "English" },
    { value: "mr", label: "मराठी (Marathi)" },
    { value: "ta", label: "தமிழ் (Tamil)" },
    { value: "te", label: "తెలుగు (Telugu)" },
    { value: "bn", label: "বাংলা (Bengali)" },
    { value: "gu", label: "ગુજરાતી (Gujarati)" },
    { value: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { value: "ml", label: "മലയാളം (Malayalam)" },
    { value: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
  ];

  return (
    <div
      className={clsx(
        "flex items-center gap-2 bg-surface border border-border-subtle rounded-lg px-3 py-1.5 shadow-sm text-xs font-semibold text-text-primary",
        className,
      )}
      {...props}
    >
      <Globe className="h-4 w-4 text-text-muted shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="bg-transparent text-primary outline-none cursor-pointer border-none font-bold pr-4 py-0.5"
      >
        {languages.map((lang) => (
          <option
            key={lang.value}
            value={lang.value}
            className="bg-surface text-text-primary"
          >
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
