import { Send, CornerDownLeft } from "lucide-react";
import { VoiceButton } from "./VoiceButton.jsx";
import { Button } from "./Button.jsx";

export function AIPromptInput({
  value,
  onChange,
  onSend,
  onVoiceTrigger,
  isListening = false,
  placeholder = "यहाँ संदेश लिखें... (Type message here...)",
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (onSend) onSend();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-3 flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={2}
        className="w-full bg-transparent resize-none text-base text-text-primary outline-none placeholder:text-text-muted px-2 py-1"
        {...props}
      />
      <div className="flex items-center justify-between border-t border-border-subtle pt-2">
        <span className="text-[10px] text-slate-400 flex items-center gap-1">
          <CornerDownLeft className="h-3 w-3" />
          <span>भेजने के लिए Enter दबाएं (Enter to Send)</span>
        </span>
        <div className="flex items-center gap-3">
          {onVoiceTrigger && (
            <VoiceButton
              isListening={isListening}
              onClick={onVoiceTrigger}
              className="w-9 h-9"
            />
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={onSend}
            disabled={!value || value.trim() === ""}
            className="flex items-center gap-1.5"
          >
            <Send className="h-4 w-4" />
            <span>भेजें (Send)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
