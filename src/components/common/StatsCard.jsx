import clsx from "clsx";
import { Card } from "./Card.jsx";

export function StatsCard({ value, label, icon, trend, className, ...props }) {
  return (
    <Card
      className={clsx(
        "relative overflow-hidden p-6 text-left border-l-4 border-l-green",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-text-secondary select-none">
            {label}
          </span>
          <span className="text-3xl font-extrabold text-primary font-serif leading-none tracking-tight">
            {value}
          </span>
        </div>
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center text-green shrink-0 shadow-sm">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <span className="text-[10px] text-green font-semibold mt-2 inline-flex items-center gap-1 select-none">
          {trend}
        </span>
      )}
    </Card>
  );
}
