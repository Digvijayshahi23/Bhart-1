import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext.jsx";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { Card } from "../../../components/common/Card.jsx";
import { ServiceCard } from "../../../components/common/ServiceCard.jsx";
import { NotificationCard } from "../../../components/common/NotificationCard.jsx";
import { AIPromptInput } from "../../../components/common/AIPromptInput.jsx";
import { Badge } from "../../../components/common/Badge.jsx";
import { Progress } from "../../../components/common/Progress.jsx";
import { Avatar } from "../../../components/common/Avatar.jsx";
import { Button } from "../../../components/common/Button.jsx";
import {
  FileText,
  Eye,
  HeartPulse,
  GraduationCap,
  Bookmark,
  LogOut,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user, profile, logout } = useAuth();
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("सफलतापूर्वक लॉगआउट (Logged out successfully)");
    navigate("/");
  };

  const quickActions = [
    {
      title: "योजना खोजें (Find Schemes)",
      desc: "पात्रता एवं लाभ मापदंड जांचें।",
      icon: FileText,
      to: "/schemes",
    },
    {
      title: "दस्तावेज़ समझें (Explain Notice)",
      desc: "सरकारी पत्रों का सारांश पाएं।",
      icon: Eye,
      to: "/documents",
    },
    {
      title: "दवा जांच (Medicine Checker)",
      desc: "दवाइयों के खुराक की समझ।",
      icon: HeartPulse,
      to: "/healthcare",
    },
    {
      title: "रोजगार & स्कॉलरशिप (Jobs & Edu)",
      desc: "नवीनतम रिक्तियों का विवरण।",
      icon: GraduationCap,
      to: "/career",
    },
  ];

  const recentActivity = [
    {
      title: "चैट सहायक: 'वृद्धावस्था पेंशन योजना'",
      type: "chat",
      date: "आज, दोपहर 12:30",
    },
    {
      title: "दस्तावेज़ स्कैन: 'खसरा खतौनी भूमि पत्र.pdf'",
      type: "upload",
      date: "कल, शाम 4:15",
    },
    {
      title: "सहेजी गई योजना: 'पीएम किसान सम्मान'",
      type: "bookmark",
      date: "25 जून, 2026",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Navigation Sidebar */}
        <Navbar />

        {/* Right Dashboard Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="मुख्य डॅशबोर्ड (Citizen Dashboard)" />

          {/* Core Content Grid */}
          <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* 1. Main Welcome Hero Banner */}
            <section className="relative overflow-hidden rounded-2xl bg-primary text-white p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-border-subtle">
              {/* Flag color top line */}
              <div className="absolute top-0 inset-x-0 h-1 flex">
                <div className="flex-1 bg-saffron" />
                <div className="flex-1 bg-white" />
                <div className="flex-1 bg-green" />
              </div>

              <div className="flex flex-col text-left gap-2 z-10 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-saffron uppercase font-bold tracking-widest">
                    डिजिटल सेवा डेस्क
                  </span>
                  <Badge variant="green" className="text-[10px]">
                    प्रोफ़ाइल सक्रिय (Profile Active)
                  </Badge>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold font-serif leading-tight mt-1">
                  नमस्ते, {profile?.name || user?.email || "नागरिक"}
                </h2>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed mt-1">
                  💡 **आज की सलाह**: आपके राज्य **"{profile?.state || "Delhi"}
                  "** और जिला **"{profile?.district || "Unknown"}"** के अनुसार,
                  आप नवीनतम कृषि सब्सिडी योजनाओं और चिकित्सा लाभों के लिए पात्र
                  हो सकते हैं।
                </p>
              </div>

              <div className="shrink-0 flex items-center justify-center relative w-24 h-24 bg-white/10 rounded-full border border-white/20">
                <Sparkles className="h-10 w-10 text-saffron animate-pulse" />
              </div>
            </section>

            {/* 2. Universal AI Search Prompt Bar */}
            <section className="flex flex-col gap-2 text-left">
              <span className="text-xs font-bold text-text-secondary">
                पूछें कुछ भी (Universal AI Helper)
              </span>
              <AIPromptInput
                value={prompt}
                onChange={setPrompt}
                onSend={() => {
                  toast.success(`Prompt sent: ${prompt}`);
                  setPrompt("");
                }}
                onVoiceTrigger={() => toast.success("Voice capture activated")}
                placeholder="योजनाओं, चिकित्सा, दस्तावेज़ों, करियर या कानूनी सहायता के बारे में यहाँ पूछें..."
              />
            </section>

            {/* 3. Quick Action Widgets Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <Card
                    key={idx}
                    hoverable
                    onClick={() => navigate(act.to)}
                    className="p-4 cursor-pointer flex flex-col gap-2 text-left border-l-4 border-l-saffron"
                  >
                    <div className="w-8 h-8 rounded-lg bg-saffron/10 flex items-center justify-center text-saffron shrink-0 shadow-xs">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-bold text-sm font-serif leading-tight">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      {act.desc}
                    </span>
                  </Card>
                );
              })}
            </section>

            {/* 4. Split Dashboard Grid (Activities vs Profile Specs) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Recent Activity & Recommendations */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Services Navigator */}
                <Card
                  title="मेरी सेवाएँ (My Services Dashboard)"
                  className="text-left"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ServiceCard
                      title="योजना खोज एवं आवेदन"
                      category="Government schemes"
                      status="3 Active Claims"
                      statusVariant="green"
                      onClick={() => navigate("/schemes")}
                    />
                    <ServiceCard
                      title="स्वास्थ्य पर्ची एवं सलाह"
                      category="Healthcare assistant"
                      status="No Alerts"
                      statusVariant="primary"
                      onClick={() => navigate("/healthcare")}
                    />
                    <ServiceCard
                      title="रोजगार & सीवी मेकर"
                      category="Career Portal"
                      status="Resume Complete"
                      statusVariant="accent"
                      onClick={() => navigate("/career")}
                    />
                    <ServiceCard
                      title="अधिकार एवं कानूनी सहायता"
                      category="Legal companion"
                      status="Disclaimer Verified"
                      statusVariant="secondary"
                      onClick={() => navigate("/legal")}
                    />
                  </div>
                </Card>

                {/* Recent activity log */}
                <Card
                  title="हालिया गतिविधि (Recent Activity)"
                  className="text-left"
                >
                  <div className="flex flex-col gap-3">
                    {recentActivity.map((act, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between border-b border-border-subtle pb-2.5 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Bookmark className="h-4 w-4 text-saffron shrink-0" />
                          <span className="font-medium text-text-primary">
                            {act.title}
                          </span>
                        </div>
                        <span className="text-xs text-text-muted">
                          {act.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column: Profile summary & Notification Alerts */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Profile Card */}
                <Card
                  title="नागरिक प्रोफ़ाइल (Profile Summary)"
                  className="text-left"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      size="md"
                      fallback={profile?.name?.substring(0, 2) || "CN"}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-base font-serif leading-tight">
                        {profile?.name || "नागरिक (Citizen)"}
                      </span>
                      <span className="text-[10px] text-text-muted mt-1 uppercase font-medium">
                        ID: {user?.uid?.substring(0, 10).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border-subtle pt-3 flex flex-col gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">
                        राज्य (State):
                      </span>
                      <span className="font-semibold text-primary">
                        {profile?.state || "Not Configured"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">
                        जिला (District):
                      </span>
                      <span className="font-semibold text-primary">
                        {profile?.district || "Not Configured"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">
                        पसंदीदा भाषा (Language):
                      </span>
                      <span className="font-semibold text-primary uppercase">
                        {profile?.language || "hi"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[10px] text-text-secondary font-medium">
                      प्रोफ़ाइल पूर्णता (Profile Setup progress)
                    </span>
                    <Progress value={90} max={100} variant="green" showLabel />
                  </div>
                </Card>

                {/* Notifications Center */}
                <Card
                  title="अधिसूचना अलर्ट (Notifications)"
                  className="text-left"
                >
                  <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto">
                    <NotificationCard
                      unread
                      title="योजना पात्रता अपडेट"
                      message="आपके जिला पटना के लिए नए तालाब निर्माण ऋण सब्सिडी जारी।"
                      time="10 मिनट पहले"
                    />
                    <NotificationCard
                      title="दस्तावेज़ सत्यापन"
                      message="आपका आधार विवरण सफलतापूर्वक Sandbox सिंक्रनाइज़ हुआ।"
                      time="2 घंटे पहले"
                    />
                  </div>
                </Card>

                {/* Explicit Logout Button */}
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 shadow-sm"
                >
                  <LogOut className="h-4.5 w-4.5" />
                  <span>सुरक्षित लॉगआउट (Log Out)</span>
                </Button>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}
