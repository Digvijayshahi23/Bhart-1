import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { SearchBar } from "../../../components/common/SearchBar.jsx";
import { Tabs } from "../../../components/common/Tabs.jsx";
import { Dialog } from "../../../components/common/Dialog.jsx";
import { Timeline } from "../../../components/common/Timeline.jsx";
import { Button } from "../../../components/common/Button.jsx";
import { SERVICES, SCHEMES, CATEGORIES } from "../data/sampleData.js";
import EligibilityWizard from "../components/EligibilityWizard.jsx";
import DocumentChecklist from "../components/DocumentChecklist.jsx";
import { Bookmark, Share2, Sparkles, FileText } from "lucide-react";
import toast from "react-hot-toast";

export default function GovernmentPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState(() => {
    const cached = localStorage.getItem("scheme_bookmarks");
    return cached ? JSON.parse(cached) : [];
  });

  // Selected Service detail dialog state
  const [activeService, setActiveService] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("scheme_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id, title) => {
    if (bookmarks.includes(id)) {
      setBookmarks((prev) => prev.filter((b) => b !== id));
      toast.success("योजना हटाई गई (Scheme removed from bookmarks)");
    } else {
      setBookmarks((prev) => [...prev, id]);
      toast.success(`"${title}" सहेजी गई (Scheme bookmarked!)`);
    }
  };

  const handleShare = (title) => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(`"${title}" लिंक कॉपी किया गया (Link copied to share!)`);
  };

  const tabsConfig = [
    { value: "dashboard", label: "डैशबोर्ड (Dashboard)" },
    { value: "schemes", label: "सरकारी योजनाएँ (Schemes)" },
    { value: "services", label: "नागरिक सेवाएँ (Services)" },
    { value: "eligibility", label: "पात्रता जाँच (Eligibility)" },
  ];

  // Filtering Schemes
  const filteredSchemes = SCHEMES.filter((scheme) => {
    const matchesSearch = scheme.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? scheme.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // Filtering Services
  const filteredServices = SERVICES.filter((ser) =>
    ser.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navbar />

        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="सरकारी सेवाएँ एवं योजनाएँ (Govt Services Portal)" />

          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* Tab selection strip */}
            <Tabs
              tabs={tabsConfig}
              activeTab={activeTab}
              onChange={setActiveTab}
            />

            {/* --- DASHBOARD TAB --- */}
            {activeTab === "dashboard" && (
              <div className="flex flex-col gap-6 text-left">
                {/* Search Prompt Header */}
                <div className="max-w-2xl w-full">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="कोई योजना या सेवा खोजें... (e.g. पीएम किसान / आधार)"
                    onSearch={() => setActiveTab("schemes")}
                  />
                </div>

                {/* Categories Filter Chips */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-text-secondary">
                    श्रेणियाँ (Welfare Categories)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                        !selectedCategory
                          ? "bg-saffron text-white border-saffron shadow-xs"
                          : "bg-surface border-border-subtle text-text-secondary hover:bg-surface-hover"
                      }`}
                    >
                      सभी योजनाएँ (All)
                    </button>
                    {CATEGORIES.map((cat, idx) => (
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
                </div>

                {/* Split layouts: Schemes highlights vs shortcuts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Popular Schemes */}
                  <div className="lg:col-span-8 flex flex-col gap-4">
                    <Card title="अग्रणी योजनाएँ (Trending Schemes)">
                      <div className="flex flex-col gap-3">
                        {SCHEMES.slice(0, 4).map((sch) => (
                          <div
                            key={sch.id}
                            className="border border-border-subtle p-4 rounded-xl flex items-start justify-between gap-4 hover:border-saffron/40 transition-colors"
                          >
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <Badge variant="saffron">{sch.state}</Badge>
                                <span className="text-xs text-text-muted font-semibold">
                                  {sch.category}
                                </span>
                              </div>
                              <span className="font-bold text-sm font-serif text-text-primary">
                                {sch.title}
                              </span>
                              <p className="text-xs text-text-secondary leading-relaxed">
                                {sch.desc}
                              </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() =>
                                  toggleBookmark(sch.id, sch.title)
                                }
                                className={`p-1.5 rounded-md border border-border-subtle hover:bg-slate-50 ${
                                  bookmarks.includes(sch.id)
                                    ? "text-saffron bg-saffron/10 border-saffron/30"
                                    : "text-text-muted"
                                }`}
                              >
                                <Bookmark className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleShare(sch.title)}
                                className="p-1.5 rounded-md border border-border-subtle hover:bg-slate-50 text-text-muted"
                              >
                                <Share2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: AI Suggestion & Saved items counts */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card
                      title="AI अनुशंसा (AI Recommendations)"
                      className="border-l-4 border-l-green"
                    >
                      <div className="flex flex-col gap-3 text-xs leading-relaxed">
                        <div className="w-9 h-9 rounded-lg bg-green/10 flex items-center justify-center text-green">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="font-bold text-sm text-text-primary font-serif">
                          किसान परिवार हेतु (For Farmers)
                        </span>
                        <p className="text-text-secondary">
                          "पीएम किसान सम्मान निधि" की नवीनतम 17वीं किस्त जारी की
                          गई है। यदि आपने ई-केवाईसी (e-KYC) प्रक्रिया अभी तक
                          पूरी नहीं की है, तो तुरंत अपने आधार के माध्यम से
                          करवाएं।
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toast.success("Directing to voice assistance...");
                            navigate("/chat");
                          }}
                          className="text-green hover:bg-green/5 font-bold self-start mt-2"
                        >
                          मदद लें (Ask Assistant) →
                        </Button>
                      </div>
                    </Card>

                    {/* Bookmarks counter summary */}
                    <Card title="सहेजी गई योजनाएं (Saved Bookmarks)">
                      <div className="flex flex-col gap-2">
                        {bookmarks.length === 0 ? (
                          <span className="text-xs text-text-muted py-4">
                            यहाँ कोई योजना बुकमार्क नहीं है।
                          </span>
                        ) : (
                          <div className="flex flex-col gap-2.5">
                            <span className="text-xs text-text-secondary font-medium">
                              कुल {bookmarks.length} योजनाएं सहेजी गई हैं।
                            </span>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setActiveTab("schemes")}
                              className="w-full"
                            >
                              बुकमार्क सूची देखें (View List)
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* --- SCHEMES TAB --- */}
            {activeTab === "schemes" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="max-w-md w-full">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="योजना नाम खोजें..."
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

                {/* Schemes Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {filteredSchemes.map((sch) => (
                    <Card
                      key={sch.id}
                      className="p-5 flex flex-col justify-between gap-4 border-t-4 border-t-saffron"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{sch.category}</Badge>
                          <Badge variant="primary">{sch.state}</Badge>
                        </div>
                        <h4 className="font-bold text-sm font-serif text-text-primary leading-tight mt-1">
                          {sch.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {sch.desc}
                        </p>
                        <div className="text-[10px] text-text-muted mt-1.5">
                          लाभार्थी:{" "}
                          <span className="font-semibold text-text-secondary">
                            {sch.target}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2 border-t border-border-subtle pt-3 mt-1">
                        <button
                          onClick={() => toggleBookmark(sch.id, sch.title)}
                          className={`p-1.5 rounded hover:bg-slate-50 ${
                            bookmarks.includes(sch.id)
                              ? "text-saffron bg-saffron/10"
                              : "text-text-muted"
                          }`}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toast.success(
                              `"${sch.title}" eligibility verified!`,
                            )
                          }
                          className="text-xs text-accent font-bold"
                        >
                          योग्यता जांचें →
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* --- SERVICES TAB --- */}
            {activeTab === "services" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="max-w-md w-full">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="नागरिक सेवा खोजें (e.g. पासपोर्ट, पैन)..."
                  />
                </div>

                {/* Services cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {filteredServices.map((ser) => (
                    <Card
                      key={ser.id}
                      hoverable
                      onClick={() => setActiveService(ser)}
                      className="p-5 cursor-pointer flex flex-col gap-3 justify-between border-l-4 border-l-accent"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent shrink-0">
                          <FileText className="h-4.5 w-4.5" />
                        </div>
                        <h4 className="font-bold text-sm font-serif mt-1 text-text-primary">
                          {ser.title}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {ser.desc}
                        </p>
                      </div>
                      <span className="text-[10px] text-accent font-bold mt-2">
                        प्रक्रिया विवरण देखें (View Steps Guide) →
                      </span>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* --- ELIGIBILITY CALCULATOR TAB --- */}
            {activeTab === "eligibility" && (
              <div className="py-4">
                <EligibilityWizard />
              </div>
            )}
          </main>

          <Footer />
        </div>
      </div>

      {/* --- SERVICE DETAIL POPUP DIALOG --- */}
      {activeService && (
        <Dialog
          isOpen={!!activeService}
          onClose={() => setActiveService(null)}
          title={activeService.title}
          className="max-w-2xl w-full"
        >
          <div className="flex flex-col gap-5 text-left p-2">
            <div>
              <span className="text-[10px] text-accent font-bold tracking-wider uppercase">
                अवलोकन (Overview)
              </span>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                {activeService.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-saffron font-bold tracking-wider uppercase block mb-1">
                  पात्रता मापदंड (Eligibility)
                </span>
                <span className="text-xs text-text-primary font-semibold">
                  {activeService.eligibility}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-green font-bold tracking-wider uppercase block mb-1">
                  अनुमानित समय (Timeline)
                </span>
                <span className="text-xs text-text-primary font-semibold">
                  {activeService.timeline}
                </span>
              </div>
            </div>

            {/* Documents Checklist components */}
            <DocumentChecklist documents={activeService.documents} />

            {/* Step-by-Step guides list inside a vertical timeline */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-accent font-bold tracking-wider uppercase block mb-2">
                आवेदन चरण प्रक्रिया (Step-by-Step Guidelines)
              </span>
              <Timeline
                steps={activeService.steps.map((st, idx) => ({
                  title: `चरण ${idx + 1}: ${st}`,
                  status: idx === 0 ? "active" : "pending",
                }))}
              />
            </div>

            {/* FAQ collapse folds */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-text-secondary font-bold tracking-wider uppercase block mb-1">
                बार-बार पूछे जाने वाले प्रश्न (FAQs)
              </span>
              {activeService.faq.map((fq, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-border-subtle p-3 rounded-lg text-xs"
                >
                  <div className="font-bold text-text-primary">प्र: {fq.q}</div>
                  <div className="text-text-secondary mt-1">उ: {fq.a}</div>
                </div>
              ))}
            </div>

            {/* Chat Assistant shortcut button */}
            <Button
              variant="saffron"
              onClick={() => {
                setActiveService(null);
                toast.success("AI Assistant opened");
                navigate("/chat");
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 mt-2"
            >
              <Sparkles className="h-4.5 w-4.5" />
              <span>भारत वन AI से पूछें (Ask AI Companion)</span>
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
}
