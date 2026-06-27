import clsx from "clsx";
import { Card } from "./Card.jsx";
import { Badge } from "./Badge.jsx";
import { ChevronRight } from "lucide-react";

export function ServiceCard({
  title,
  category,
  status,
  statusVariant = "primary",
  onClick,
  className,
  ...props
}) {
  return (
    <Card
      hoverable
      onClick={onClick}
      className={clsx(
        "cursor-pointer relative overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4 text-left">
        <div className="flex flex-col gap-1.5">
          {category && (
            <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase">
              {category}
            </span>
          )}
          <h4 className="text-base font-bold text-text-primary font-serif leading-tight">
            {title}
          </h4>
          {status && (
            <div className="mt-1">
              <Badge variant={statusVariant}>{status}</Badge>
            </div>
          )}
        </div>
        <ChevronRight className="h-5 w-5 text-text-muted shrink-0" />
      </div>
    </Card>
  );
}
