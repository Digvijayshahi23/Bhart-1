import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { SearchBar } from "../../../components/common/SearchBar.jsx";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { Dropdown } from "../../../components/common/Dropdown.jsx";
import { Timeline } from "../../../components/common/Timeline.jsx";
import { LEGAL_DISCLAIMER } from "../../../services/legal/legalPromptBuilder.js";
import { searchRights } from "../../../services/legal/rightsExplorer.js";
import { explainDocument } from "../../../services/legal/documentExplainer.js";
import { getComplaintFlow } from "../../../services/legal/complaintAssistant.js";
import { getLegalSummary } from "../../../services/legal/legalSummary.js";
import { getLegalFaq } from "../../../services/legal/faqEngine.js";
import {
  Scale,
  ShieldAlert,
  AlertTriangle,
  Bookmark,
  PhoneCall,
  FileText,
  HelpCircle,
  CheckSquare,
} from "lucide-react";
import toast from "react-hot-toast";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Rights filter
  const [selectedCategory, setSelectedCategory] = useState(null);
  const rightsResults = searchRights(searchQuery).filter((r) =>
    selectedCategory ? r.category === selectedCategory : true,
  );

  // Document explainer selection
  const [selectedDoc, setSelectedDoc] = useState("Rental Agreement");
  const docExplanation = explainDocument(selectedDoc);

  // Complaint Assistant selection
  const [selectedComplaint, setSelectedComplaint] =
    useState("Consumer Complaint");
  const complaintFlow = getComplaintFlow(selectedComplaint);

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState(() => {
    const cached = localStorage.getItem("legal_bookmarks");
    return cached ? JSON.parse(cached) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("legal_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id, name) => {
    if (bookmarks.includes(id)) {
      setBookmarks((prev) => prev.filter((b) => b !== id));
      toast.success("बुकमार्क हटाया गया (Removed bookmark)");
    } else {
      setBookmarks((prev) => [...prev, id]);
      toast.success(`"${name}" बुकमार्क किया गया!`);
    }
  };

  const tabsConfig = [
    { value: "dashboard", label: "डैशबोर्ड (Dashboard)" },
    { value: "rights", label: "अधिकार गाइड (Rights Explorer)" },
    { value: "documents", label: "दस्तावेज़ विश्लेषण (Clause Reader)" },
    { value: "complaints", label: "शिकायत सहायक (Complaints)" },
  ];

  const emergencyContacts = [
    {
      name: "साइबर अपराध हेल्पलाइन (Cyber Cell)",
      number: "1930",
      icon: ShieldAlert,
    },
    {
      name: "राष्ट्रीय उपभोक्ता हेल्पलाइन (Consumer Care)",
      number: "1915",
      icon: Scale,
    },
    {
      name: "महिला हेल्पलाइन (NCW Helpline)",
      number: "7827170170",
      icon: PhoneCall,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navbar />

        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="कानूनी सहायता गाइड (Legal Information Assistant)" />

          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* 1. Mandatory Legal Disclaimer Warning Banner */}
            <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 text-left">
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 text-xs text-red-800 font-semibold leading-relaxed">
                <span>{LEGAL_DISCLAIMER}</span>
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
                {/* AI Advice Summary Banner */}
                <div className="bg-primary text-white p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border-subtle shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-red-600" />
                  <div className="flex flex-col gap-1.5 max-w-xl">
                    <span className="text-[10px] text-red-300 font-bold uppercase tracking-widest">
                      कानूनी साक्षरता
                    </span>
                    <h3 className="font-bold text-base font-serif leading-tight">
                      अधिकार एवं सुरक्षा डाइजेस्ट (Rights Digest)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {getLegalSummary()}
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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Popular guides & FAQ */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Common FAQs reference list */}
                    <Card title="बार-बार पूछे जाने वाले प्रश्न (Legal FAQs)">
                      <div className="flex flex-col gap-4 text-xs text-left">
                        {getLegalFaq().map((f, idx) => (
                          <div
                            key={idx}
                            className="border-b border-border-subtle pb-3 last:border-b-0"
                          >
                            <div className="font-bold text-text-primary flex items-start gap-2">
                              <HelpCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                              <span>प्र: {f.q}</span>
                            </div>
                            <div className="text-text-secondary mt-1.5 pl-6">
                              उ: {f.a}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Government Legal Aid Section */}
                    <Card title="निःशुल्क सरकारी कानूनी सहायता (Free Legal Aid)">
                      <div className="flex flex-col gap-1.5 text-xs text-left">
                        <span className="font-bold text-text-primary text-sm font-serif">
                          राष्ट्रीय कानूनी सेवा प्राधिकरण (NALSA)
                        </span>
                        <p className="text-text-secondary leading-relaxed">
                          समाज के कमजोर वर्गों को मुफ्त कानूनी सहायता प्रदान
                          करने के लिए संविधान के अनुच्छेद 39A के तहत नालसा
                          (NALSA) का गठन किया गया है। आप ऑनलाइन पोर्टल
                          (nalsa.gov.in) पर जाकर मुफ्त वकील के लिए आवेदन कर सकते
                          हैं।
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Emergency Contacts */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Emergency Contacts list */}
                    <Card title="कानूनी आपातकालीन सेवाएँ (Helplines)">
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
                                    डायल करें: {c.number}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() =>
                                  toast.success(`Dialing helpline: ${c.number}`)
                                }
                                className="text-red-600 border-red-200 hover:bg-red-50 text-[10px]"
                              >
                                कॉल करें
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

            {/* --- RIGHTS EXPLORER TAB --- */}
            {activeTab === "rights" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="max-w-md w-full">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="अधिकार विषय खोजें..."
                    />
                  </div>
                  {selectedCategory && (
                    <Badge
                      variant="saffron"
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(null)}
                    >
                      Filter: {selectedCategory} (Clear X)
                    </Badge>
                  )}
                </div>

                {/* Categories selection chips */}
                <div className="flex flex-wrap gap-1.5 my-1">
                  {[
                    "Consumer Rights",
                    "Cybercrime Guidance",
                    "Rental Agreements",
                    "Employment Rights",
                    "Women's Rights",
                    "Senior Citizen Rights",
                  ].map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                        selectedCategory === cat
                          ? "bg-saffron text-white border-saffron shadow-xs"
                          : "bg-surface border-border-subtle text-text-secondary hover:bg-surface-hover"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Rights details list cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {rightsResults.map((r) => (
                    <Card
                      key={r.id}
                      className="p-5 border-l-4 border-l-red-500 flex flex-col justify-between gap-4"
                    >
                      <div className="flex flex-col gap-1.5 text-left">
                        <Badge variant="secondary" className="self-start">
                          {r.category}
                        </Badge>
                        <h4 className="font-bold text-sm font-serif text-text-primary mt-1 leading-tight">
                          {r.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {r.desc}
                        </p>
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="text-[10px] text-text-primary font-bold">
                            कार्रवाई कदम (Immediate Steps):
                          </span>
                          <ul className="list-disc pl-4 flex flex-col gap-1 text-[11px] text-text-secondary">
                            {r.actions.map((act, i) => (
                              <li key={i}>{act}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border-subtle pt-3 mt-1">
                        <button
                          onClick={() => toggleBookmark(r.id, r.title)}
                          className={`p-1.5 rounded hover:bg-slate-50 ${
                            bookmarks.includes(r.id)
                              ? "text-saffron bg-saffron/10"
                              : "text-text-muted"
                          }`}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast.success("Help file download started...");
                          }}
                          className="text-xs text-accent font-semibold"
                        >
                          गाइड डाउनलोड (PDF)
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* --- DOCUMENTS TAB --- */}
            {activeTab === "documents" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Inputs Setup Panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <Card title="दस्तावेज़ चुने (Select Document)">
                    <div className="flex flex-col gap-4">
                      <Dropdown
                        label="दस्तावेज़ प्रकार (Document Type)"
                        options={[
                          {
                            value: "Rental Agreement",
                            label: "Rental Agreement",
                          },
                          { value: "Affidavit", label: "Affidavit" },
                          { value: "Sale Deed", label: "Sale Deed" },
                        ]}
                        value={selectedDoc}
                        onChange={setSelectedDoc}
                      />
                      <span className="text-[10px] text-text-muted leading-relaxed">
                        💡 **AI सलाह**: दस्तावेज़ में शामिल प्रमुख धाराओं को
                        समझें ताकि किसी भी प्रकार के शोषण या विवाद से बचा जा
                        सके।
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Detailed Analyzed Clauses view */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs">
                    <span className="text-[10px] text-accent font-bold tracking-wider uppercase">
                      दस्तावेज़ अवलोकन (Overview)
                    </span>
                    <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                      {docExplanation.summary}
                    </p>
                  </div>

                  <Card title="महत्वपूर्ण धाराएं (Important Clauses)">
                    <div className="flex flex-col gap-4 text-xs text-left text-text-secondary">
                      {docExplanation.clauses.map((c, idx) => (
                        <div
                          key={idx}
                          className="border-b border-border-subtle pb-3 last:border-b-0"
                        >
                          <span className="font-bold text-text-primary text-sm font-serif block mb-1">
                            {c.name}
                          </span>
                          <p>{c.text}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card title="आवश्यक कार्रवाई और चेकलिस्ट (Actions & Checklists)">
                    <div className="flex flex-col gap-3.5 text-xs text-left text-text-secondary">
                      {docExplanation.actions.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-accent shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* --- COMPLAINTS TAB --- */}
            {activeTab === "complaints" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Inputs Selection Panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <Card title="शिकायत श्रेणी चुनें (Select Complaint Category)">
                    <div className="flex flex-col gap-4">
                      <Dropdown
                        label="शिकायत प्रभाग (Complaint Type)"
                        options={[
                          {
                            value: "Consumer Complaint",
                            label: "Consumer Complaint",
                          },
                          {
                            value: "Cyber Complaint",
                            label: "Cyber Complaint",
                          },
                        ]}
                        value={selectedComplaint}
                        onChange={setSelectedComplaint}
                      />
                      <span className="text-[10px] text-text-muted leading-relaxed">
                        💡 **AI निर्देश**: शिकायत दाखिल करने के लिए आवश्यक
                        दस्तावेज़ों और चरणों का मिलान करें।
                      </span>
                    </div>
                  </Card>
                </div>

                {/* Complaint detailed guidelines timeline */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs flex justify-between items-center flex-wrap gap-3">
                    <div className="flex flex-col gap-0.5">
                      <Badge variant="red">Filing Process Outline</Badge>
                      <h4 className="font-bold text-base font-serif text-primary mt-1">
                        {complaintFlow.title}
                      </h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open(complaintFlow.officialLink, "_blank")
                      }
                      className="text-xs text-accent font-bold"
                    >
                      आधिकारिक लिंक खोलें →
                    </Button>
                  </div>

                  <Card title="आवश्यक दस्तावेज़ चेकलिस्ट (Required Documents Checklist)">
                    <div className="flex flex-col gap-2.5 text-xs text-text-secondary">
                      {complaintFlow.reqDocs.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckSquare className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card title="आवेदन चरण और प्रक्रिया (Filing Timeline Steps)">
                    <div className="text-xs">
                      <Timeline
                        steps={complaintFlow.steps.map((st, idx) => ({
                          title: `चरण ${idx + 1}: ${st}`,
                          status: idx === 0 ? "active" : "pending",
                        }))}
                      />
                    </div>
                  </Card>
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
