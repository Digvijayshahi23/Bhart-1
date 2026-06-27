import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { SearchBar } from "../../../components/common/SearchBar.jsx";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { Progress } from "../../../components/common/Progress.jsx";
import { HEALTH_DISCLAIMER } from "../../../services/health/healthPromptBuilder.js";
import { searchMedicines } from "../../../services/health/medicineParser.js";
import { analyzeLabReport } from "../../../services/health/labAnalyzer.js";
import { parsePrescription } from "../../../services/health/prescriptionParser.js";
import { getUpcomingReminders } from "../../../services/health/reminderEngine.js";
import { buildHealthSummary } from "../../../services/health/healthSummary.js";
import {
  HeartPulse,
  Upload,
  AlertOctagon,
  PhoneCall,
  CheckSquare,
  Square,
  FileText,
  Activity,
} from "lucide-react";
import toast from "react-hot-toast";

export default function HealthcarePage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [medQuery, setMedQuery] = useState("");
  const medResults = searchMedicines(medQuery);

  // Medical upload triggers
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeRecord, setActiveRecord] = useState(null);
  const [activeReport, setActiveReport] = useState(null);

  // Reminders checklist state
  const [reminders, setReminders] = useState(() => {
    const cached = localStorage.getItem("health_reminders");
    return cached ? JSON.parse(cached) : getUpcomingReminders();
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("health_reminders", JSON.stringify(reminders));
  }, [reminders]);

  const toggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((rem) =>
        rem.id === id ? { ...rem, completed: !rem.completed } : rem,
      ),
    );
    toast.success("शेड्यूल अपडेट किया गया (Schedule Updated)");
  };

  const handlePrescriptionDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    setUploading(true);
    setProgress(15);
    try {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 85 ? 85 : p + 25));
      }, 200);

      // Simulate parsing
      await new Promise((res) => setTimeout(res, 1200));
      clearInterval(interval);
      setProgress(100);

      const parsed = parsePrescription();
      setActiveRecord(parsed);
      toast.success("पर्ची का विश्लेषण पूर्ण! (Prescription parsed!)");
    } catch {
      toast.error("त्रुटि: विश्लेषण विफल हुआ।");
    } finally {
      setUploading(false);
    }
  };

  const handleLabDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    setUploading(true);
    setProgress(15);
    try {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 85 ? 85 : p + 25));
      }, 200);

      // Simulate parsing
      await new Promise((res) => setTimeout(res, 1200));
      clearInterval(interval);
      setProgress(100);

      const analyzed = analyzeLabReport(file.name);
      setActiveReport(analyzed);
      toast.success("रिपोर्ट का विश्लेषण पूर्ण! (Report parsed!)");
    } catch {
      toast.error("त्रुटि: विश्लेषण विफल हुआ।");
    } finally {
      setUploading(false);
    }
  };

  const prescriptionDropzone = useDropzone({
    onDrop: handlePrescriptionDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const labDropzone = useDropzone({
    onDrop: handleLabDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".webp"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const emergencyContacts = [
    {
      name: "राष्ट्रीय आपातकालीन नंबर (Emergency Line)",
      number: "112",
      icon: PhoneCall,
    },
    {
      name: "सरकारी एम्बुलेंस सेवा (Ambulance)",
      number: "108",
      icon: HeartPulse,
    },
    {
      name: "महिला सुरक्षा हेल्पलाइन (Women Safety)",
      number: "1091",
      icon: PhoneCall,
    },
    {
      name: "बाल संरक्षण हेल्पलाइन (Child Line)",
      number: "1098",
      icon: PhoneCall,
    },
  ];

  const govHospitals = [
    {
      name: "एम्स (AIIMS, New Delhi)",
      address: "अंसारी नगर, नई दिल्ली",
      phone: "011-26588500",
    },
    {
      name: "सफदरजंग अस्पताल (Safdarjung Hospital)",
      address: "नई दिल्ली, भारत",
      phone: "011-26707100",
    },
    {
      name: "पीजीआईएमईआर (PGIMER, Chandigarh)",
      address: "मध्य मार्ग, चंडीगढ़",
      phone: "0172-2747585",
    },
  ];

  const tabsConfig = [
    { value: "dashboard", label: "डैशबोर्ड (Dashboard)" },
    { value: "prescription", label: "पर्ची पाठक (Prescription Reader)" },
    { value: "lab_report", label: "लैब रिपोर्ट (Lab Analyzer)" },
    { value: "medicines", label: "दवा निर्देशिका (Medicines)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navbar />

        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="स्वास्थ्य सहायक (AI Healthcare Assistant)" />

          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* 1. Mandatory Healthcare Disclaimer Alert Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-3 text-left">
              <AlertOctagon className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 text-xs text-emerald-800 font-semibold leading-relaxed">
                <span>{HEALTH_DISCLAIMER}</span>
              </div>
            </div>

            {/* Layout tabs switcher */}
            <Tabs
              tabs={tabsConfig}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* --- DASHBOARD TAB --- */}
            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-6 text-left">
                {/* AI Healthcare Suggestion summary banner */}
                <div className="bg-primary text-white p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border-subtle shadow-xs relative overflow-hidden">
                  {/* Flag Accent top edge */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
                  <div className="flex flex-col gap-1.5 max-w-xl">
                    <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
                      सेहत सुरक्षा
                    </span>
                    <h3 className="font-bold text-base font-serif leading-tight">
                      साप्ताहिक स्वास्थ्य सारांश (Health Summary)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {buildHealthSummary()}
                    </p>
                  </div>
                  <Button
                    variant="glass"
                    size="sm"
                    onClick={() => navigate("/chat")}
                    className="text-white hover:bg-white/10 shrink-0 self-start sm:self-center"
                  >
                    सलाहकार खोलें (Open AI Chat)
                  </Button>
                </div>

                {/* Dashboard layout grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Reminders checklist & Timeline */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Medicine Schedule reminders */}
                    <Card title="आज की दवा समय सारिणी (Today's Reminders)">
                      <div className="flex flex-col gap-3">
                        {reminders.map((rem) => (
                          <div
                            key={rem.id}
                            onClick={() => toggleReminder(rem.id)}
                            className="border border-border-subtle p-3 rounded-lg flex items-center justify-between hover:border-emerald-500/40 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {rem.completed ? (
                                <CheckSquare className="h-5 w-5 text-emerald-600 shrink-0" />
                              ) : (
                                <Square className="h-5 w-5 text-text-muted shrink-0" />
                              )}
                              <div className="flex flex-col text-left text-xs">
                                <span
                                  className={`font-bold ${
                                    rem.completed
                                      ? "line-through text-text-muted"
                                      : "text-text-primary"
                                  }`}
                                >
                                  {rem.name}
                                </span>
                                <span className="text-[10px] text-text-muted mt-0.5">
                                  समय: {rem.time} | {rem.instructions}
                                </span>
                              </div>
                            </div>
                            <Badge
                              variant={rem.completed ? "green" : "secondary"}
                            >
                              {rem.completed ? "लिया गया" : "बाकी"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Government Hospital listings */}
                    <Card title="सरकारी अस्पताल मार्गदर्शिका (Government Hospitals)">
                      <div className="flex flex-col gap-3">
                        {govHospitals.map((h, idx) => (
                          <div
                            key={idx}
                            className="border border-border-subtle p-3.5 rounded-xl flex items-start justify-between gap-4 text-xs"
                          >
                            <div className="flex flex-col gap-1 text-left">
                              <span className="font-bold text-sm text-text-primary font-serif">
                                {h.name}
                              </span>
                              <span className="text-text-secondary">
                                पत्ता: {h.address}
                              </span>
                              <span className="text-text-muted mt-0.5">
                                फ़ोन: {h.phone}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                toast.success(`Call routed to ${h.phone}`)
                              }
                              className="text-emerald-600 hover:bg-emerald-50 shrink-0"
                            >
                              कॉल करें
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Emergency Contacts */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Emergency Contacts card list */}
                    <Card title="आपातकालीन सेवाएँ (Emergency Contacts)">
                      <div className="flex flex-col gap-3">
                        {emergencyContacts.map((c, idx) => {
                          const Icon = c.icon;
                          return (
                            <div
                              key={idx}
                              className="border border-border-subtle p-3 rounded-lg flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center gap-2.5 text-left">
                                <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                                  <Icon className="h-4.5 w-4.5" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold text-text-primary">
                                    {c.name}
                                  </span>
                                  <span className="text-[10px] text-text-muted mt-0.5">
                                    नंबर: {c.number}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() =>
                                  toast.success(
                                    `Dialing emergency: ${c.number}`,
                                  )
                                }
                                className="text-red-600 border-red-200 hover:bg-red-50 text-[10px]"
                              >
                                डायल करें
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* --- PRESCRIPTION READER TAB --- */}
            {activeTab === "prescription" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Left Column: Upload box */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card title="पर्ची अपलोड (Upload Prescription)">
                    <div
                      {...prescriptionDropzone.getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 ${
                        prescriptionDropzone.isDragActive
                          ? "border-primary bg-primary/5"
                          : "border-border-subtle hover:border-emerald-500 bg-surface"
                      }`}
                    >
                      <input {...prescriptionDropzone.getInputProps()} />
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col gap-1 text-sm font-semibold">
                        <span>
                          पर्ची की तस्वीर यहाँ खींचें (Drag & Drop Prescription)
                        </span>
                        <span className="text-[10px] text-text-muted">
                          समर्थित: PDF, JPEG, PNG, WEBP
                        </span>
                      </div>
                    </div>

                    {uploading && (
                      <div className="flex flex-col gap-2 mt-4 text-left">
                        <span className="text-xs text-text-secondary font-bold">
                          दवाओं की जांच की जा रही है... (Extracting
                          Medicines...)
                        </span>
                        <Progress
                          value={progress}
                          max={100}
                          variant="green"
                          showLabel
                        />
                      </div>
                    )}
                  </Card>
                </div>

                {/* Right Column: Detailed Analyzed Report */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {activeRecord ? (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                          <Badge variant="green">Prescription Analyzed</Badge>
                          <h4 className="font-bold text-base font-serif text-primary mt-1">
                            {activeRecord.doctorName}
                          </h4>
                        </div>
                        <Badge variant="green">Low Risk</Badge>
                      </div>

                      <Card title="दवाओं की सूची (Medicines Schedule)">
                        <div className="flex flex-col gap-4 text-xs">
                          {activeRecord.medicines.map((m, idx) => (
                            <div
                              key={idx}
                              className="border-b border-border-subtle pb-3 last:border-b-0"
                            >
                              <div className="flex items-center justify-between font-bold text-sm text-text-primary">
                                <span>{m.name}</span>
                                <Badge variant="secondary">{m.frequency}</Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-2 text-text-secondary text-[11px]">
                                <div>खुराक: {m.dosage}</div>
                                <div>अवधि: {m.duration}</div>
                                <div>नियम: {m.instructions}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card title="सावधानियां & डॉक्टर निर्देश (Precautions & Follow-up)">
                        <div className="flex flex-col gap-3 text-xs leading-relaxed text-text-secondary">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-text-primary">
                              सावधानियां:
                            </span>
                            <p>{activeRecord.precautions}</p>
                          </div>
                          <div className="flex flex-col gap-1 mt-1.5">
                            <span className="font-bold text-text-primary">
                              दोबारा मिलने की सलाह (Follow-up):
                            </span>
                            <p>{activeRecord.followUp}</p>
                          </div>
                        </div>
                      </Card>
                    </>
                  ) : (
                    <Card className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-border-subtle bg-slate-50">
                      <FileText className="h-12 w-12 text-text-muted animate-pulse mb-3" />
                      <h4 className="font-bold text-sm text-text-secondary">
                        कोई पर्ची चयनित नहीं है
                      </h4>
                      <p className="text-xs text-text-muted max-w-xs mt-1">
                        पर्ची की तस्वीर अपलोड करें ताकि AI दवा की खुराक और
                        निर्देशों को समझने में आपकी सहायता कर सके।
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* --- LAB REPORT TAB --- */}
            {activeTab === "lab_report" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Left Column: Upload box */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card title="लैब रिपोर्ट अपलोड (Upload Lab Report)">
                    <div
                      {...labDropzone.getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 ${
                        labDropzone.isDragActive
                          ? "border-primary bg-primary/5"
                          : "border-border-subtle hover:border-emerald-500 bg-surface"
                      }`}
                    >
                      <input {...labDropzone.getInputProps()} />
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col gap-1 text-sm font-semibold">
                        <span>
                          जांच रिपोर्ट यहाँ खींचें (Drag & Drop Lab Report)
                        </span>
                        <span className="text-[10px] text-text-muted">
                          समर्थित: PDF, JPEG, PNG, WEBP
                        </span>
                      </div>
                    </div>

                    {uploading && (
                      <div className="flex flex-col gap-2 mt-4 text-left">
                        <span className="text-xs text-text-secondary font-bold">
                          बायोमार्कर डिकोड किए जा रहे हैं... (Decoding Lab
                          Metrics...)
                        </span>
                        <Progress
                          value={progress}
                          max={100}
                          variant="green"
                          showLabel
                        />
                      </div>
                    )}
                  </Card>
                </div>

                {/* Right Column: Lab Report Analysis View */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {activeReport ? (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs flex justify-between items-center">
                        <div className="flex flex-col gap-0.5 text-left">
                          <Badge variant="green">Lab Report Decoded</Badge>
                          <h4 className="font-bold text-base font-serif text-primary mt-1.5 leading-tight">
                            {activeReport.testName}
                          </h4>
                        </div>
                        <Badge variant="saffron">
                          {activeReport.riskLevel} Risk
                        </Badge>
                      </div>

                      <Card title="परीक्षण परिणाम एवं सामान्य सीमा (Test Parameters)">
                        <div className="flex flex-col gap-3.5 text-xs text-left">
                          {activeReport.biomarkers.map((b, idx) => (
                            <div
                              key={idx}
                              className="border-b border-border-subtle pb-3 last:border-b-0 flex items-center justify-between gap-4"
                            >
                              <div className="flex flex-col gap-0.5">
                                <span className="font-semibold text-text-primary">
                                  {b.name}
                                </span>
                                <span className="text-[10px] text-text-muted">
                                  सामान्य सीमा: {b.normalRange}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-primary">
                                  {b.value}
                                </span>
                                <Badge
                                  variant={
                                    b.status === "Normal"
                                      ? "green"
                                      : b.status === "Low"
                                        ? "blue"
                                        : "red"
                                  }
                                >
                                  {b.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>

                      <Card title="अस्पष्टीकरण & डॉक्टर से पूछने योग्य प्रश्न (Key Insights)">
                        <div className="flex flex-col gap-3 text-xs leading-relaxed text-text-secondary">
                          <p>{activeReport.summary}</p>
                          <hr className="border-border-subtle my-1.5" />
                          <span className="font-bold text-text-primary">
                            डॉक्टर से पूछें (Questions for Doctor):
                          </span>
                          <ul className="list-disc pl-4 flex flex-col gap-1.5 mt-1">
                            {activeReport.doctorQuestions.map((q, idx) => (
                              <li key={idx}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      </Card>
                    </>
                  ) : (
                    <Card className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-border-subtle bg-slate-50">
                      <Activity className="h-12 w-12 text-text-muted animate-pulse mb-3" />
                      <h4 className="font-bold text-sm text-text-secondary">
                        कोई रिपोर्ट चयनित नहीं है
                      </h4>
                      <p className="text-xs text-text-muted max-w-xs mt-1">
                        रक्त परीक्षण या शुगर रिपोर्ट पीडीएफ अपलोड करें ताकि AI
                        उसे समझने में आपकी सहायता कर सके।
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* --- MEDICINES TAB --- */}
            {activeTab === "medicines" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="max-w-md w-full">
                  <SearchBar
                    value={medQuery}
                    onChange={setMedQuery}
                    placeholder="दवा का नाम खोजें (e.g. Paracetamol)..."
                  />
                </div>

                {/* Medicine cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {medResults.map((m, idx) => (
                    <Card
                      key={idx}
                      className="p-5 border-l-4 border-l-emerald-500 flex flex-col gap-3"
                    >
                      <div className="flex flex-col gap-1">
                        <h4 className="font-bold text-sm font-serif text-text-primary leading-tight">
                          {m.name}
                        </h4>
                        <span className="text-xs text-text-secondary font-medium">
                          उद्देश्य: {m.purpose}
                        </span>
                      </div>
                      <div className="text-[11px] text-text-secondary leading-relaxed border-t border-border-subtle pt-3 flex flex-col gap-1.5">
                        <div>
                          <span className="font-bold text-text-primary">
                            उपयोग नियम:
                          </span>{" "}
                          {m.usage}
                        </div>
                        <div>
                          <span className="font-bold text-text-primary">
                            दुष्प्रभाव:
                          </span>{" "}
                          {m.sideEffects}
                        </div>
                        <div>
                          <span className="font-bold text-text-primary">
                            सावधानियां:
                          </span>{" "}
                          {m.warnings}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
