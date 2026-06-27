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
import { Dropdown } from "../../../components/common/Dropdown.jsx";
import { Input } from "../../../components/common/Input.jsx";
import { getScholarships } from "../../../services/career/scholarshipEngine.js";
import { getJobs } from "../../../services/career/jobRecommendationEngine.js";
import { generateRoadmap } from "../../../services/career/roadmapGenerator.js";
import { analyzeResume } from "../../../services/career/resumeAnalyzer.js";
import { analyzeSkills } from "../../../services/career/skillAnalyzer.js";
import {
  GraduationCap,
  Upload,
  AlertTriangle,
  Bookmark,
  Sparkles,
  Award,
  FileText,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Scholarships & Jobs lists
  const scholarships = getScholarships(searchQuery);
  const jobs = getJobs(searchQuery);

  // Roadmap states
  const [edu, setEdu] = useState("Graduate");
  const [targetRole, setTargetRole] = useState("Frontend Developer");
  const [activeRoadmap, setActiveRoadmap] = useState(null);

  // Skill analysis states
  const [currentSkills, setCurrentSkills] = useState("");
  const [skillAnalysisResult, setSkillAnalysisResult] = useState(null);

  // Resume states
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resumeReport, setResumeReport] = useState(null);

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState(() => {
    const cached = localStorage.getItem("career_bookmarks");
    return cached ? JSON.parse(cached) : [];
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("career_bookmarks", JSON.stringify(bookmarks));
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

  const handleResumeDrop = async (files) => {
    const file = files[0];
    if (!file) return;

    setUploading(true);
    setProgress(20);
    try {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 85 ? 85 : p + 20));
      }, 150);

      // Simulate parsing delay
      await new Promise((res) => setTimeout(res, 1000));
      clearInterval(interval);
      setProgress(100);

      const parsed = analyzeResume(file.name);
      setResumeReport(parsed);
      toast.success("रिज्यूमे विश्लेषण पूर्ण! (Resume analysis complete!)");
    } catch {
      toast.error("त्रुटि: विश्लेषण विफल हुआ।");
    } finally {
      setUploading(false);
    }
  };

  const resumeDropzone = useDropzone({
    onDrop: handleResumeDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  const triggerRoadmap = () => {
    const rm = generateRoadmap(edu, targetRole);
    setActiveRoadmap(rm);

    if (currentSkills) {
      const skillsReport = analyzeSkills(currentSkills, targetRole);
      setSkillAnalysisResult(skillsReport);
    }
    toast.success("करियर रोडमैप जनरेट किया गया!");
  };

  const tabsConfig = [
    { value: "dashboard", label: "डैशबोर्ड (Dashboard)" },
    { value: "scholarships", label: "छात्रवृत्ति (Scholarships)" },
    { value: "jobs", label: "सरकारी नौकरियां (Jobs)" },
    { value: "roadmap", label: "करियर रोडमैप (Roadmap)" },
    { value: "resume", label: "रिज्यूमे विश्लेषक (Resume Analyzer)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navbar />

        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="करियर एवं छात्रवृत्ति मार्गदर्शिका (Career Portal)" />

          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
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
                  <div className="absolute top-0 inset-x-0 h-1 bg-saffron" />
                  <div className="flex flex-col gap-1 max-w-xl">
                    <span className="text-[10px] text-saffron uppercase font-bold tracking-wider">
                      करियर विकास सेवा
                    </span>
                    <h3 className="font-bold text-base font-serif leading-tight">
                      क्या आप यूपीएससी परीक्षा या स्कॉलरशिप की तैयारी कर रहे
                      हैं?
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      💡 **AI परामर्श**: नवीनतम राष्ट्रीय छात्रवृत्ति (NSP) के
                      आवेदन प्रारंभ हो चुके हैं। अपनी योग्यता के आधार पर पात्रता
                      सत्यापित करने के लिए सीधे AI असिस्टेंट से बात करें।
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
                  {/* Left Column: Quick Actions & Recommended lists */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* Active Jobs lists stubs */}
                    <Card title="अग्रणी सरकारी नौकरियां (Government Jobs)">
                      <div className="flex flex-col gap-3">
                        {getJobs()
                          .slice(0, 3)
                          .map((job) => (
                            <div
                              key={job.id}
                              className="border border-border-subtle p-3 rounded-lg flex items-start justify-between gap-4 text-xs"
                            >
                              <div className="flex flex-col gap-1 text-left">
                                <span className="font-bold text-text-primary font-serif text-sm">
                                  {job.title}
                                </span>
                                <span className="text-text-secondary">
                                  विभाग: {job.org}
                                </span>
                                <span className="text-text-muted mt-0.5">
                                  वेतनमान (Salary): {job.salary}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  toggleBookmark(job.id, job.title);
                                }}
                                className="text-primary hover:bg-slate-50 shrink-0"
                              >
                                बुकमार्क
                              </Button>
                            </div>
                          ))}
                      </div>
                    </Card>

                    {/* Quick navigation to sub-features */}
                    <Card title="त्वरित उपकरण (Career Utilities)">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-left">
                        <div
                          onClick={() => setActiveTab("resume")}
                          className="border border-border-subtle hover:border-primary/50 p-4 rounded-xl cursor-pointer flex flex-col gap-1.5 transition-colors"
                        >
                          <FileText className="h-5 w-5 text-saffron" />
                          <span className="font-bold text-text-primary">
                            रिज्यूमे स्कोर जाँच (ATS Check)
                          </span>
                          <span className="text-[10px] text-text-muted">
                            दस्तावेज़ विश्लेषण और सुधार सुझाव।
                          </span>
                        </div>
                        <div
                          onClick={() => setActiveTab("roadmap")}
                          className="border border-border-subtle hover:border-primary/50 p-4 rounded-xl cursor-pointer flex flex-col gap-1.5 transition-colors"
                        >
                          <TrendingUp className="h-5 w-5 text-green" />
                          <span className="font-bold text-text-primary">
                            कोर्स रोडमैप (Roadmaps)
                          </span>
                          <span className="text-[10px] text-text-muted">
                            करियर लक्ष्य अध्ययन योजना गाइड।
                          </span>
                        </div>
                        <div
                          onClick={() => {
                            toast.success(
                              "Opening AI mock interview session...",
                            );
                            navigate("/chat");
                          }}
                          className="border border-border-subtle hover:border-primary/50 p-4 rounded-xl cursor-pointer flex flex-col gap-1.5 transition-colors"
                        >
                          <Award className="h-5 w-5 text-accent" />
                          <span className="font-bold text-text-primary">
                            साक्षात्कार अभ्यास (Mock Prep)
                          </span>
                          <span className="text-[10px] text-text-muted">
                            AI इंटरव्यू कोच बातचीत गाइड।
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Bookmarks count */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card title="सहेजे गए अवसर (Saved Opportunities)">
                      <div className="flex flex-col gap-3 text-xs">
                        {bookmarks.length === 0 ? (
                          <span className="text-text-muted py-6">
                            कोई सहेजे गए अवसर नहीं हैं।
                          </span>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <span className="text-text-secondary font-medium">
                              कुल {bookmarks.length} अवसर बुकमार्क हैं।
                            </span>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setActiveTab("scholarships")}
                              className="w-full mt-1.5"
                            >
                              सूची देखें (View List)
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* --- SCHOLARSHIPS TAB --- */}
            {activeTab === "scholarships" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="max-w-md w-full">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="छात्रवृत्ति योजना नाम खोजें..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {scholarships.map((sch) => (
                    <Card
                      key={sch.id}
                      className="p-5 border-t-4 border-t-saffron flex flex-col justify-between gap-4"
                    >
                      <div className="flex flex-col gap-1.5 text-left">
                        <Badge variant="saffron" className="self-start">
                          Scholarship
                        </Badge>
                        <h4 className="font-bold text-sm font-serif text-text-primary mt-1 leading-tight">
                          {sch.name}
                        </h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          पात्रता: {sch.eligibility}
                        </p>
                        <div className="text-[11px] text-text-muted mt-1.5">
                          राशि:{" "}
                          <span className="font-semibold text-text-secondary">
                            {sch.amount}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border-subtle pt-3">
                        <button
                          onClick={() => toggleBookmark(sch.id, sch.name)}
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
                          onClick={() => window.open(sch.link, "_blank")}
                          className="text-xs text-accent font-semibold"
                        >
                          आवेदन लिंक देखें →
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* --- JOBS TAB --- */}
            {activeTab === "jobs" && (
              <div className="flex flex-col gap-4 text-left">
                <div className="max-w-md w-full">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="जॉब विज्ञापन नाम खोजें..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {jobs.map((job) => (
                    <Card
                      key={job.id}
                      className="p-5 border-l-4 border-l-accent flex flex-col justify-between gap-4"
                    >
                      <div className="flex flex-col gap-1.5 text-left">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <Badge variant="accent">Government Job</Badge>
                          <span className="text-[10px] text-text-muted font-bold">
                            अंतिम तिथि: {job.deadline}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm font-serif text-text-primary mt-1 leading-tight">
                          {job.title}
                        </h4>
                        <span className="text-xs text-text-secondary">
                          विभाग: {job.org}
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-[10px] text-text-secondary mt-1.5 bg-slate-50 p-2.5 rounded-lg">
                          <div>योग्यता: {job.qualification}</div>
                          <div>आयु सीमा: {job.ageLimit}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-border-subtle pt-3">
                        <button
                          onClick={() => toggleBookmark(job.id, job.title)}
                          className={`p-1.5 rounded hover:bg-slate-50 ${
                            bookmarks.includes(job.id)
                              ? "text-saffron bg-saffron/10"
                              : "text-text-muted"
                          }`}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(job.link, "_blank")}
                          className="text-xs text-accent font-semibold"
                        >
                          अधिसूचना देखें →
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* --- CAREER ROADMAP TAB --- */}
            {activeTab === "roadmap" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Inputs Setup Panel */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <Card title="रोडमैप सेटिंग्स (Roadmap Generator)">
                    <div className="flex flex-col gap-4">
                      <Dropdown
                        label="वर्तमान शिक्षा (Current Education)"
                        options={[
                          {
                            value: "12th Pass",
                            label: "12वीं पास (12th Pass)",
                          },
                          { value: "Graduate", label: "स्नातक (Graduate)" },
                          {
                            value: "Post Graduate",
                            label: "परास्नातक (Post Graduate)",
                          },
                        ]}
                        value={edu}
                        onChange={setEdu}
                      />
                      <Dropdown
                        label="लक्ष्य भूमिका (Target Role)"
                        options={[
                          {
                            value: "Frontend Developer",
                            label: "Frontend Developer",
                          },
                          {
                            value: "Software Engineer",
                            label: "Software Engineer",
                          },
                          { value: "Data Analyst", label: "Data Analyst" },
                        ]}
                        value={targetRole}
                        onChange={setTargetRole}
                      />
                      <Input
                        label="आपके वर्तमान कौशल (Current Skills - Split by comma)"
                        placeholder="e.g. HTML, CSS, JavaScript"
                        value={currentSkills}
                        onChange={(e) => setCurrentSkills(e.target.value)}
                      />
                      <Button
                        onClick={triggerRoadmap}
                        className="w-full flex gap-1.5 justify-center mt-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>रोडमैप तैयार करें (Generate)</span>
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Generated Output Timeline Display */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {activeRoadmap ? (
                    <>
                      {/* Skill Analysis Result card if present */}
                      {skillAnalysisResult && (
                        <Card title="कौशल अंतर विश्लेषण (Skill Gap Analysis)">
                          <div className="flex flex-col gap-2.5 text-xs text-left">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-text-secondary">
                                कौशल अंतर प्रतिशत (Missing skills %):
                              </span>
                              <Badge variant="red">
                                {skillAnalysisResult.gapPercentage}% Missing
                              </Badge>
                            </div>
                            <div>
                              <span className="font-bold text-text-primary">
                                आवश्यक कौशल:
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {skillAnalysisResult.requiredSkills.map(
                                  (s, idx) => (
                                    <Badge key={idx} variant="secondary">
                                      {s}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                            <div className="mt-1">
                              <span className="font-bold text-text-primary text-red-600 block">
                                सीखने योग्य कौशल (Missing Gaps):
                              </span>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {skillAnalysisResult.missingSkills.map(
                                  (s, idx) => (
                                    <Badge key={idx} variant="red">
                                      {s}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}

                      {/* Main roadmap milestones timeline */}
                      <Card
                        title={`करियर पथ: ${activeRoadmap.role} (${activeRoadmap.timeline})`}
                      >
                        <div className="flex flex-col gap-4 text-left">
                          {activeRoadmap.milestones.map((mil, idx) => (
                            <div
                              key={idx}
                              className="border-l-2 border-l-accent pl-4 relative flex flex-col gap-1 text-xs"
                            >
                              <div className="absolute w-3 h-3 bg-accent rounded-full -left-[7px] top-1" />
                              <div className="flex items-center justify-between font-bold text-sm text-text-primary">
                                <span>{mil.title}</span>
                                <Badge variant="secondary">
                                  {mil.duration}
                                </Badge>
                              </div>
                              <p className="text-text-secondary mt-1">
                                {mil.details}
                              </p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {mil.courses.map((c, i) => (
                                  <Badge key={i} variant="primary">
                                    {c}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </>
                  ) : (
                    <Card className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-border-subtle bg-slate-50">
                      <GraduationCap className="h-12 w-12 text-text-muted animate-pulse mb-3" />
                      <h4 className="font-bold text-sm text-text-secondary">
                        कोई रोडमैप नहीं बनाया गया है
                      </h4>
                      <p className="text-xs text-text-muted max-w-xs mt-1">
                        अपनी लक्ष्य भूमिका और शिक्षा का चयन करें ताकि AI अध्ययन
                        योजना और अनुशंसित कोर्स गाइड जनरेट कर सके।
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* --- RESUME ANALYZER TAB --- */}
            {activeTab === "resume" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                {/* Left: Upload card */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <Card title="रिज्यूमे अपलोड (Upload Resume)">
                    <div
                      {...resumeDropzone.getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center gap-3 ${
                        resumeDropzone.isDragActive
                          ? "border-primary bg-primary/5"
                          : "border-border-subtle hover:border-saffron bg-surface"
                      }`}
                    >
                      <input {...resumeDropzone.getInputProps()} />
                      <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                        <Upload className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col gap-1 text-sm font-semibold">
                        <span>
                          रिज्यूमे पीडीएफ फ़ाइल चुनें (Drag & Drop CV)
                        </span>
                        <span className="text-[10px] text-text-muted">
                          समर्थित: PDF, DOCX
                        </span>
                      </div>
                    </div>

                    {uploading && (
                      <div className="flex flex-col gap-2 mt-4 text-left">
                        <span className="text-xs text-text-secondary font-bold">
                          ATS स्कोर की जांच की जा रही है... (Checking Resume...)
                        </span>
                        <Progress
                          value={progress}
                          max={100}
                          variant="accent"
                          showLabel
                        />
                      </div>
                    )}
                  </Card>
                </div>

                {/* Right: Analyzer reports */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {resumeReport ? (
                    <>
                      <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-xs flex justify-between items-center">
                        <div className="flex flex-col gap-0.5">
                          <Badge variant="saffron">Resume Checked</Badge>
                          <h4 className="font-bold text-base font-serif text-primary mt-1">
                            {resumeReport.fileName}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary font-bold">
                            ATS Score:
                          </span>
                          <Badge variant="green">
                            {resumeReport.score}/100
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Card title="मजबूत बिंदु (Strengths)">
                          <div className="flex flex-col gap-2 text-xs text-left">
                            {resumeReport.strengths.map((str, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-green" />
                                <span className="text-text-secondary">
                                  {str}
                                </span>
                              </div>
                            ))}
                          </div>
                        </Card>

                        <Card title="कमजोर बिंदु (Weaknesses)">
                          <div className="flex flex-col gap-2 text-xs text-left">
                            {resumeReport.weaknesses.map((w, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                                <span className="text-text-secondary">{w}</span>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </div>

                      <Card title="सुधार सुझाव (ATS Checklist suggestions)">
                        <div className="flex flex-col gap-3.5 text-xs text-left text-text-secondary">
                          {resumeReport.atsSuggestions.map((s, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-saffron shrink-0" />
                              <span>{s}</span>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </>
                  ) : (
                    <Card className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-border-subtle bg-slate-50">
                      <FileText className="h-12 w-12 text-text-muted animate-pulse mb-3" />
                      <h4 className="font-bold text-sm text-text-secondary">
                        कोई रिज्यूमे चयनित नहीं है
                      </h4>
                      <p className="text-xs text-text-muted max-w-xs mt-1">
                        अपना रिज्यूमे अपलोड करें ताकि AI उसका फॉर्मेट, व्याकरण
                        और ATS स्कोर विश्लेषण पूरा कर सके।
                      </p>
                    </Card>
                  )}
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
