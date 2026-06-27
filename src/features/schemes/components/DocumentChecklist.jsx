import { useState } from "react";
import { Card } from "../../../components/common/Card.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { CheckSquare, Square, Download, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function DocumentChecklist({
  documents = [],
  title = "आवश्यक दस्तावेज़ (Required Documents)",
}) {
  const [checkedDocs, setCheckedDocs] = useState({});
  const [expanded, setExpanded] = useState(true);

  const toggleCheck = (doc) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [doc]: !prev[doc],
    }));
  };

  return (
    <Card className="text-left w-full p-4" title={title}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-xs font-bold text-text-secondary select-none mb-3 outline-none"
      >
        <span>दस्तावेज़ सूची (Checklist Guide)</span>
        <ChevronRight
          className={`h-4 w-4 transition-transform duration-200 ${
            expanded ? "transform rotate-90" : ""
          }`}
        />
      </button>

      {expanded && (
        <div className="flex flex-col gap-2.5">
          {documents.map((doc, idx) => {
            const isChecked = checkedDocs[doc];
            return (
              <div
                key={idx}
                onClick={() => toggleCheck(doc)}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-border-subtle hover:bg-slate-50 cursor-pointer text-xs transition-colors"
              >
                {isChecked ? (
                  <CheckSquare className="h-4.5 w-4.5 text-green shrink-0" />
                ) : (
                  <Square className="h-4.5 w-4.5 text-text-muted shrink-0" />
                )}
                <span
                  className={
                    isChecked
                      ? "line-through text-text-muted font-medium"
                      : "text-text-primary font-semibold"
                  }
                >
                  {doc}
                </span>
              </div>
            );
          })}

          <Button
            variant="glass"
            size="sm"
            onClick={() =>
              toast.success("पीडीएफ डाउनलोड (Checklist PDF Downloaded - Demo)")
            }
            className="mt-3 flex gap-1.5 justify-center text-xs py-1.5"
          >
            <Download className="h-3.5 w-3.5 text-primary" />
            <span>चेकलिस्ट डाउनलोड करें (Download PDF)</span>
          </Button>
        </div>
      )}
    </Card>
  );
}
