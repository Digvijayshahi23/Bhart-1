import { Inbox } from "lucide-react";
import { Button } from "./Button.jsx";

export function EmptyState({
  title = "कोई डेटा नहीं मिला (No Data Found)",
  description = "यहाँ दिखाने के लिए अभी कोई जानकारी मौजूद नहीं है। (No information is currently available to show here.)",
  actionLabel,
  onAction,
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-border-subtle rounded-2xl bg-surface/30">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-text-muted mb-4 shrink-0">
        {icon || <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-lg font-bold text-text-primary font-serif leading-tight">
        {title}
      </h3>
      <p className="text-sm text-text-secondary max-w-sm mt-2 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          className="mt-5"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
