import { Search } from "lucide-react";
import clsx from "clsx";
import { VoiceButton } from "./VoiceButton.jsx";
import { Button } from "./Button.jsx";

export function SearchBar({
  placeholder = "आप अपनी समस्या बताएं... (Tell us your issue...)",
  value,
  onChange,
  onSearch,
  onVoiceTrigger,
  isListening = false,
  className,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center gap-3 w-full max-w-2xl mx-auto glass-panel p-2",
        className,
      )}
      {...props}
    >
      <div className="relative flex-1 flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-text-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent pl-10 pr-4 py-2 text-base text-text-primary outline-none placeholder:text-text-muted"
          {...props}
        />
      </div>

      {onVoiceTrigger && (
        <VoiceButton
          isListening={isListening}
          onClick={onVoiceTrigger}
          className="w-10 h-10"
        />
      )}

      {onSearch && (
        <Button
          variant="saffron"
          size="sm"
          onClick={onSearch}
          className="px-4 py-2 text-sm rounded-lg"
        >
          खोजें (Search)
        </Button>
      )}
    </div>
  );
}
