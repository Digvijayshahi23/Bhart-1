import { Upload } from "lucide-react";
import clsx from "clsx";

export function UploadButton({
  onUpload,
  label = "दस्तावेज़ अपलोड करें (Upload Document)",
  description = "फ़ाइल यहाँ खींचें या चुनने के लिए क्लिक करें (Drag file here or click to choose)",
  className,
  ...props
}) {
  return (
    <div
      onClick={onUpload}
      className={clsx(
        "flex flex-col items-center justify-center p-6 border-2 border-dashed border-border-subtle rounded-xl bg-surface hover:border-primary/50 hover:bg-surface-secondary/50 cursor-pointer transition-all duration-200 select-none text-center",
        className,
      )}
      {...props}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
        <Upload className="h-5 w-5" />
      </div>
      <span className="text-sm font-semibold text-text-primary font-serif">
        {label}
      </span>
      {description && (
        <span className="text-xs text-text-muted mt-1">{description}</span>
      )}
    </div>
  );
}
