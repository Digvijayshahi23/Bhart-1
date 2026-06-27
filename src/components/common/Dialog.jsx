import { useEffect, useRef } from "react";
import clsx from "clsx";
import { X } from "lucide-react";
import { Button } from "./Button.jsx";

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  className,
  ...props
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className={clsx(
        "glass-panel fixed inset-0 m-auto max-w-lg w-full p-6 flex flex-col gap-4 text-text-primary bg-surface-glass border border-border-subtle shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm outline-none transition-all duration-300 open:scale-100 scale-95 opacity-0 open:opacity-100",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border-subtle pb-3">
        <h3 className="text-xl font-bold font-serif leading-none">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[70vh]">{children}</div>
    </dialog>
  );
}
