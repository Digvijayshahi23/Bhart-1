import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { Progress } from "../../../components/common/Progress.jsx";
import { processDocument } from "../../../services/ocr/ocrService.js";
import DocumentChecklist from "../../schemes/components/DocumentChecklist.jsx";
import {
  Upload,
  FileText,
  Trash2,
  Share2,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DocumentsPage() {
  const [activeDoc, setActiveDoc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  // History list persistence
  const [history, setHistory] = useState(() => {
    const cached = localStorage.getItem("document_history");
    return cached ? JSON.parse(cached) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("document_history", JSON.stringify(history));
  }, [history]);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(10);

    try {
      // Simulate progress ticks
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 20;
        });
      }, 250);

      const result = await processDocument(file);
      clearInterval(interval);
      setProgress(100);
      setActiveDoc(result);

      setHistory((prev) => [result, ...prev].slice(0, 10));
      toast.success("दस्तावेज़ विश्लेषण पूर्ण! (Analysis complete!)");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const deleteHistoryItem = (idx) => {
    setHistory((prev) => prev.filter((_, i) => i !== idx));
    toast.success("रिकॉर्ड हटाया गया (Record deleted)");
  };

  const getRiskColor = (risk) => {
    if (risk === "High") return "red";
    if (risk === "Medium") return "saffron";
    return "green";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navbar />

        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="दस्तावेज़ विश्लेषण (AI Document Intelligence)" />

          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* Split layouts: Upload zone vs active report */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left side: Upload Area & Documents history */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Upload Zone */}
                <Card title="नया दस्तावेज़ अपलोड करें (Upload Document)">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 ${
                      isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-border-subtle hover:border-accent bg-surface"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Upload className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col gap-1 text-sm font-semibold select-none">
                      <span>
                        फ़ाइल यहाँ खींचें या चुनें (Drag & Drop or Browse)
                      </span>
                      <span className="text-[10px] text-text-muted">
                        समर्थित: PDF, JPEG, PNG, WEBP (최대 10MB)
                      </span>
                    </div>
                  </div>

                  {uploading && (
                    <div className="flex flex-col gap-2 mt-4 text-left">
                      <span className="text-xs text-text-secondary font-bold">
                        विश्लेषण किया जा रहा है... (AI Analyzing...)
                      </span>
                      <Progress
                        value={progress}
                        max={100}
                        variant="accent"
                        showLabel
                      />
                    </div>
                  )}

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-semibold flex items-center gap-2 text-left">
                      <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}
                </Card>

                {/* Processing history list */}
                <Card title="हालिया विश्लेषण (Recent Documents)">
                  <div className="flex flex-col gap-3">
                    {history.length === 0 ? (
                      <span className="text-xs text-text-muted py-6">
                        कोई पिछला रिकॉर्ड नहीं है।
                      </span>
                    ) : (
                      history.map((h, idx) => (
                        <div
                          key={idx}
                          className="border border-border-subtle p-3 rounded-lg flex items-center justify-between text-xs hover:border-accent cursor-pointer text-left"
                          onClick={() => setActiveDoc(h)}
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary shrink-0" />
                            <div className="flex flex-col">
                              <span className="font-bold text-text-primary truncate max-w-[150px]">
                                {h.name}
                              </span>
                              <span className="text-[10px] text-text-muted mt-0.5">
                                {h.type} | {h.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getRiskColor(h.riskLevel)}>
                              {h.riskLevel} Risk
                            </Badge>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteHistoryItem(idx);
                              }}
                              className="p-1 text-text-muted hover:text-danger rounded hover:bg-slate-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>

              {/* Right side: Selected Document analysis view */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                {activeDoc ? (
                  <>
                    {/* Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-border-subtle shadow-xs">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="accent">{activeDoc.type}</Badge>
                          <Badge variant="secondary">
                            Confidence: {activeDoc.confidenceScore}
                          </Badge>
                        </div>
                        <h3 className="font-bold text-lg font-serif text-primary mt-1.5 leading-tight">
                          {activeDoc.name}
                        </h3>
                        <span className="text-[10px] text-text-muted">
                          संदर्भ संख्या (Ref ID): {activeDoc.referenceNumber}
                        </span>
                      </div>

                      <Badge
                        variant={getRiskColor(activeDoc.riskLevel)}
                        className="self-start sm:self-center shrink-0"
                      >
                        {activeDoc.riskLevel} Risk
                      </Badge>
                    </div>

                    {/* Overall Summary & simple explanations */}
                    <Card title="दस्तावेज़ सारांश (Document Summary)">
                      <div className="flex flex-col gap-3 text-xs leading-relaxed text-text-secondary">
                        <span className="font-bold text-text-primary text-sm font-serif">
                          महत्वपूर्ण सारांश (Analysis Summary):
                        </span>
                        <p>{activeDoc.summary}</p>
                        <hr className="border-border-subtle my-1.5" />
                        <span className="font-bold text-text-primary text-sm font-serif">
                          सरल व्याख्या (Simple Explanation):
                        </span>
                        <p>{activeDoc.simpleExplanation}</p>
                      </div>
                    </Card>

                    {/* Metadata cards (Dates and names) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Card title="महत्वपूर्ण तिथियां (Dates)">
                        <div className="flex flex-col gap-2.5 text-xs text-left">
                          {activeDoc.importantDates.map((d, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between border-b border-border-subtle pb-1.5"
                            >
                              <span className="text-text-secondary">
                                {d.label}:
                              </span>
                              <span className="font-bold text-primary">
                                {d.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card title="उल्लिखित नाम (Names)">
                        <div className="flex flex-col gap-2 text-xs text-left">
                          {activeDoc.importantNames.map((n, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              <span className="font-bold text-text-primary">
                                {n}
                              </span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    {/* Document Checklist integration */}
                    <DocumentChecklist
                      documents={activeDoc.actions}
                      title="अनुशंसित कार्रवाइयां (Recommended Actions Checklist)"
                    />

                    {/* Action Panel buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-border-subtle">
                      <Button
                        variant="secondary"
                        onClick={() => toast.success("Summary PDF downloaded")}
                        className="flex-1 flex gap-2 justify-center text-xs py-2"
                      >
                        <FileText className="h-4 w-4" />
                        <span>सारांश डाउनलोड (Download PDF)</span>
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          navigator.clipboard.writeText(activeDoc.summary);
                          toast.success("Summary copied!");
                        }}
                        className="flex-1 flex gap-2 justify-center text-xs py-2"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>साझा करें (Share)</span>
                      </Button>
                      <Button
                        variant="saffron"
                        onClick={() => {
                          toast.success("Opening chat interface...");
                          navigate("/chat");
                        }}
                        className="flex-1 flex gap-2 justify-center text-xs py-2 shadow-xs"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>पूछें (Ask AI Companion)</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <Card className="flex flex-col items-center justify-center text-center py-20 bg-slate-50 border-2 border-dashed border-border-subtle rounded-2xl">
                    <FileText className="h-14 w-14 text-text-muted animate-bounce mb-3" />
                    <h3 className="font-bold text-base font-serif text-text-secondary">
                      कोई दस्तावेज़ चयनित नहीं है (No Document Selected)
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-sm">
                      विश्लेषण विवरण देखने के लिए कोई फ़ाइल अपलोड करें या अपनी
                      हालिया इतिहास सूची में से किसी पर क्लिक करें।
                    </p>
                  </Card>
                )}
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
