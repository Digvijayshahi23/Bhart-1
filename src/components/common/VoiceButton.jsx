import clsx from "clsx";
import { Mic, MicOff } from "lucide-react";

export function VoiceButton({
  isListening = false,
  onClick,
  className,
  ...props
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative rounded-full flex items-center justify-center transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent shrink-0",
        {
          "w-12 h-12 bg-saffron text-white hover:bg-orange-600 shadow-lg shadow-saffron/20":
            !isListening,
          "w-14 h-14 bg-danger text-white shadow-xl shadow-danger/30":
            isListening,
        },
        className,
      )}
      aria-label={isListening ? "Stop listening" : "Start listening"}
      {...props}
    >
      {/* Listening pulse rings */}
      {isListening && (
        <>
          <span className="absolute inset-0 rounded-full bg-danger/40 animate-ping" />
          <span className="absolute -inset-2 rounded-full bg-danger/25 animate-pulse" />
        </>
      )}
      {isListening ? (
        <MicOff className="h-6 w-6 relative z-10" />
      ) : (
        <Mic className="h-5 w-5 relative z-10" />
      )}
    </button>
  );
}
