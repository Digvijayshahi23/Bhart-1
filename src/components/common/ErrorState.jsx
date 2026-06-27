import { AlertCircle } from "lucide-react";
import { Button } from "./Button.jsx";

export function ErrorState({
  title = "त्रुटि हुई (An Error Occurred)",
  description = "सर्वर से संपर्क करने में असमर्थ। कृपया पुनः प्रयास करें। (Unable to connect to the server. Please try again.)",
  retryLabel = "पुनः प्रयास करें (Try Again)",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-danger/20 rounded-2xl bg-danger/5">
      <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center text-danger mb-4 shrink-0">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-danger font-serif leading-tight">
        {title}
      </h3>
      <p className="text-sm text-text-secondary max-w-sm mt-2 leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry} className="mt-5">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
