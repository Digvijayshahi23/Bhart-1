import clsx from "clsx";
import { Card } from "./Card.jsx";
import { Bell } from "lucide-react";

export function NotificationCard({
  title,
  message,
  time,
  unread = false,
  className,
  ...props
}) {
  return (
    <Card
      className={clsx(
        "p-4 border-l-4 text-left transition-colors duration-150",
        {
          "border-l-accent bg-accent/5": unread,
          "border-l-border-subtle bg-surface": !unread,
        },
        className,
      )}
      {...props}
    >
      <div className="flex gap-3">
        <div
          className={clsx(
            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
            {
              "bg-accent/10 text-accent": unread,
              "bg-slate-100 text-text-muted": !unread,
            },
          )}
        >
          <Bell className="h-4 w-4" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span
            className={clsx("text-sm font-semibold font-serif leading-tight", {
              "text-text-primary": unread,
              "text-text-secondary": !unread,
            })}
          >
            {title}
          </span>
          <p className="text-xs text-text-secondary mt-1">{message}</p>
          {time && (
            <span className="text-[10px] text-text-muted mt-1.5">{time}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
