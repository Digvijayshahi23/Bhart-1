import clsx from "clsx";

export function Tabs({ tabs = [], activeTab, onChange, className, ...props }) {
  return (
    <div
      className={clsx(
        "flex items-center gap-1 border-b border-border-subtle overflow-x-auto select-none",
        className,
      )}
      {...props}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={clsx(
            "px-4 py-2 text-sm font-medium transition-all duration-200 border-b-2 outline-none whitespace-nowrap",
            {
              "border-accent text-accent font-semibold":
                activeTab === tab.value,
              "border-transparent text-text-secondary hover:text-text-primary hover:border-border-subtle":
                activeTab !== tab.value,
            },
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
