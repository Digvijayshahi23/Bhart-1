import clsx from "clsx";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function ChatBubble({ message, sender = "bot", className, ...props }) {
  const isUser = sender === "user";

  return (
    <div
      className={clsx(
        "flex gap-3 w-full max-w-2xl",
        {
          "ml-auto flex-row-reverse": isUser,
          "mr-auto": !isUser,
        },
        className,
      )}
      {...props}
    >
      {/* Sender Avatar Icon */}
      <div
        className={clsx(
          "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 shadow-sm",
          {
            "bg-saffron/10 border-saffron/30 text-saffron": isUser,
            "bg-primary/10 border-primary/30 text-primary": !isUser,
          },
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Balloon */}
      <div
        className={clsx(
          "px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed text-left shadow-sm",
          {
            "bg-saffron text-white rounded-tr-none": isUser,
            "bg-white border border-border-subtle rounded-tl-none text-text-primary":
              !isUser,
          },
        )}
      >
        {isUser ? (
          message
        ) : (
          <ReactMarkdown className="prose prose-sm prose-slate max-w-none text-text-primary">
            {message}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
