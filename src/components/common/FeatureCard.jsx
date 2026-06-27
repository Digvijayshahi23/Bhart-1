import clsx from "clsx";
import { Card } from "./Card.jsx";

export function FeatureCard({
  title,
  description,
  icon,
  onClick,
  className,
  ...props
}) {
  return (
    <Card
      hoverable
      onClick={onClick}
      className={clsx(
        "cursor-pointer relative overflow-hidden select-none border-l-4 border-l-saffron",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-saffron/10 flex items-center justify-center text-saffron shrink-0 shadow-sm">
            {icon}
          </div>
        )}
        <div className="flex flex-col text-left">
          <h4 className="text-base font-bold text-text-primary font-serif leading-tight">
            {title}
          </h4>
          <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}
