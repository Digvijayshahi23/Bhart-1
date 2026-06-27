import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  HeartPulse,
  Scale,
  GraduationCap,
  Landmark,
  Sprout,
  ShieldAlert,
  Bell,
  ShieldCheck,
  Zap,
  Globe,
  HelpCircle,
} from "lucide-react";
import { Button } from "../../components/common/Button.jsx";
import { Card } from "../../components/common/Card.jsx";
import { GlassCard } from "../../components/common/GlassCard.jsx";
import { Badge } from "../../components/common/Badge.jsx";
import { SearchBar } from "../../components/common/SearchBar.jsx";
import { ChatBubble } from "../../components/common/ChatBubble.jsx";
import { LanguageSwitcher } from "../../components/common/LanguageSwitcher.jsx";
import { Avatar } from "../../components/common/Avatar.jsx";

// Animated counter component for citizen statistics
function AnimatedCounter({ value, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const increment = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString("en-IN")}</span>;
}

export default function LandingPage() {
  const [searchVal, setSearchVal] = useState("");
  const [lang, setLang] = useState("hi");
  const [previewMsg, setPreviewMsg] = useState("");

  const services = [
    {
      title: "सरकारी योजनाएँ (Govt Schemes)",
      desc: "सभी केंद्रीय व राज्य कल्याणकारी योजनाओं की खोज और पात्रता मापदंड जानें।",
      icon: FileText,
      color: "border-l-saffron text-saffron",
    },
    {
      title: "दस्तावेज़ समझें (Document AI)",
      desc: "आधिकारिक सरकारी पत्रों, सूचनाओं और प्रमाण-पत्रों का अपनी भाषा में सरल अनुवाद पाएं।",
      icon: Eye,
      color: "border-l-accent text-accent",
    },
    {
      title: "स्वास्थ्य सहायक (Healthcare Assistant)",
      desc: "सत्यापित स्वास्थ्य सलाह, लक्षणों की प्राथमिक जांच और अस्पतालों की जानकारी खोजें।",
      icon: HeartPulse,
      color: "border-l-green text-green",
    },
    {
      title: "कानूनी सहायता (Legal Assistant)",
      desc: "भारतीय न्याय संहिता (BNS) के तहत अपने नागरिक अधिकारों और कानूनी नियमों की समझ।",
      icon: Scale,
      color: "border-l-saffron text-saffron",
    },
    {
      title: "करियर & छात्रवृत्ति (Career & Education)",
      desc: "नवीनतम नौकरी रिक्तियों, राष्ट्रीय स्कॉलरशिप और रोजगार प्रशिक्षण कार्यक्रमों की जानकारी।",
      icon: GraduationCap,
      color: "border-l-accent text-accent",
    },
    {
      title: "वित्त & कल्याण (Finance & Welfare)",
      desc: "पेंशन, ऋण योजनाओं और फसल बीमा दावों की प्रक्रिया का मार्गदर्शन।",
      icon: Landmark,
      color: "border-l-green text-green",
    },
    {
      title: "किसान सेवाएँ (Agriculture Services)",
      desc: "मौसम, मृदा स्वास्थ्य कार्ड और न्यूनतम समर्थन मूल्य (MSP) से संबंधित सहायता।",
      icon: Sprout,
      color: "border-l-saffron text-saffron",
    },
    {
      title: "वरिष्ठ नागरिक सुरक्षा (Senior Citizen)",
      desc: "वृद्धावस्था पेंशन दावों और वरिष्ठ स्वास्थ्य कार्ड पंजीकरण का मार्गदर्शन।",
      icon: ShieldAlert,
      color: "border-l-accent text-accent",
    },
  ];

  const suggestedPrompts = [
    "पीएम किसान सम्मान निधि की पात्रता क्या है?",
    "इस सरकारी नोटिस का क्या अर्थ है? (अपलोड करें)",
    "आयुष्मान भारत कार्ड कैसे बनवाएं?",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 bg-white/80 border-b border-border-subtle backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-extrabold text-white text-base shadow-sm">
            B
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-base font-serif leading-none tracking-tight">
              भारत वन (BharatOne AI)
            </span>
            <span className="text-[10px] text-text-secondary mt-0.5 font-medium">
              India's AI Public Services Companion
            </span>
          </div>
          <Badge variant="saffron" className="ml-2 hidden sm:inline-flex">
            Gov Initiative Sandbox
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher value={lang} onChange={setLang} />

          <Button
            variant="ghost"
            size="sm"
            className="relative p-2 rounded-full text-text-secondary hover:text-text-primary"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
          </Button>

          <Avatar size="sm" fallback="CN" />
        </div>
      </header>

      {/* Main Body Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col gap-12">
        {/* 2. Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-primary text-white p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle Indian Flag colors border banner */}
          <div className="absolute top-0 inset-x-0 h-1.5 flex">
            <div className="flex-1 bg-saffron" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-green" />
          </div>

          <div className="flex flex-col text-left max-w-2xl gap-4 z-10">
            <span className="text-xs text-saffron font-bold tracking-widest uppercase">
              डिजिटल भारत | National Public Services Assistant
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold font-serif leading-tight">
              अपनी भाषा में पाएं हर सरकारी सेवा की सही समझ
            </h1>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              भारत वन AI के साथ योजनाओं की खोज करें, दस्तावेज़ों का अनुवाद करें,
              स्वास्थ्य मार्गदर्शन प्राप्त करें और सरकारी नियमों को आसानी से
              समझें।
            </p>

            {/* Prompt Search Input */}
            <div className="w-full mt-4 text-text-primary">
              <SearchBar
                value={searchVal}
                onChange={setSearchVal}
                placeholder="आप किस सेवा या योजना के बारे में जानना चाहते हैं?..."
                onSearch={() => alert(`Searching for: ${searchVal}`)}
                onVoiceTrigger={() => alert("Listening inputs...")}
              />
            </div>

            {/* Quick Actions Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Button
                variant="glass"
                size="sm"
                className="text-white hover:text-slate-900 border-white/20 text-xs"
                onClick={() => setSearchVal("पीएम किसान सम्मान निधि")}
              >
                🌾 योजनाएँ खोजें (Find Schemes)
              </Button>
              <Button
                variant="glass"
                size="sm"
                className="text-white hover:text-slate-900 border-white/20 text-xs"
                onClick={() =>
                  alert("Redirecting to documents vault upload...")
                }
              >
                📄 दस्तावेज़ समझें (Upload Document)
              </Button>
            </div>
          </div>

          {/* Saffron/Green circular gradient abstract illustration */}
          <div className="relative w-72 h-72 hidden lg:flex items-center justify-center shrink-0">
            <div className="absolute w-64 h-64 rounded-full bg-saffron/20 blur-2xl animate-pulse" />
            <div className="absolute w-48 h-48 rounded-full bg-green/20 blur-xl animate-bounce" />
            <div className="glass-panel w-56 h-56 flex flex-col items-center justify-center gap-3 p-4 border-white/10 text-center relative z-10 shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-saffron flex items-center justify-center text-white text-xl font-bold">
                १
              </div>
              <span className="font-serif font-bold text-sm text-slate-900">
                एक नागरिक, एक सहायक
              </span>
              <span className="text-[10px] text-text-secondary leading-tight">
                भारत सरकार के डिजिटल विजन के तहत नागरिकों के लिए सुरक्षित मंच।
              </span>
            </div>
          </div>
        </section>

        {/* 3. Popular Services Grid */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 text-left">
            <div>
              <h2 className="text-2xl font-bold font-serif text-primary">
                नागरिक सेवाएँ (Popular Services)
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                सभी महत्वपूर्ण विभागों और कल्याणकारी प्रणालियों की सूची।
              </p>
            </div>
            <Badge variant="green">24/7 AI मार्गदर्शन सक्रिय</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  hoverable
                  className={`border-l-4 ${item.color} p-5 flex flex-col gap-3 justify-between hover:shadow-md cursor-pointer`}
                  onClick={() => alert(`Directing to module: ${item.title}`)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-sm font-serif leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[10px] text-accent font-semibold tracking-wider uppercase mt-2 flex items-center gap-1">
                    देखें (View Service) →
                  </span>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 4. AI Assistant Preview Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 flex flex-col text-left gap-4">
            <h2 className="text-2xl font-bold font-serif text-primary">
              AI सहायक से बातचीत (AI Companion Preview)
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              आपकी भाषा में बातचीत करने वाला इंटेलिजेंट चैट इंटरफ़ेस। नीचे दिए
              गए उदाहरणों पर क्लिक करके बातचीत का पूर्वावलोकन देखें:
            </p>

            {/* Example Prompts Buttons */}
            <div className="flex flex-col gap-2 mt-2">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPreviewMsg(p)}
                  className="w-full text-left text-xs bg-surface border border-border-subtle p-3 rounded-xl hover:border-primary/50 transition-colors duration-150 font-medium"
                >
                  💡 "{p}"
                </button>
              ))}
            </div>

            <Button
              variant="saffron"
              className="mt-2 w-fit"
              onClick={() => alert("Directing to voice assistance...")}
            >
              सहायता लें (Start Chat)
            </Button>
          </div>

          {/* Interactive chat preview container */}
          <div className="lg:col-span-7 glass-panel p-5 min-h-[300px] flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green animate-pulse" />
                <span className="text-xs font-bold text-text-secondary">
                  भारत वन AI (BharatOne AI - Online)
                </span>
              </div>
              <span className="text-[10px] text-text-muted">
                10+ भाषाएँ समर्थित (10+ Languages Supported)
              </span>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[220px]">
              <ChatBubble
                sender="bot"
                message="नमस्ते नागरिक! मैं भारत वन AI सहायक हूँ। मैं योजनाओं की पात्रता खोजने, दस्तावेज़ों का अनुवाद करने और स्वास्थ्य सलाह देने में आपकी मदद कर सकता हूँ। आप क्या जानना चाहते हैं?"
              />
              {previewMsg && <ChatBubble sender="user" message={previewMsg} />}
              {previewMsg && (
                <ChatBubble
                  sender="bot"
                  message={`मैंने आपके प्रश्न "${previewMsg}" का विश्लेषण किया है। इस बारे में विवरण हमारी संबंधित सेवा विंग से सत्यापित किया जा रहा है। लाइव परिणामों के लिए, कृपया हमारे वॉयस असिस्टेंट को लॉन्च करें।`}
                />
              )}
            </div>

            {/* Fake inputs area */}
            <div className="border-t border-border-subtle pt-2 text-xs text-text-muted text-center italic">
              यह केवल चैट का लाइव प्रदर्शन है।
            </div>
          </div>
        </section>

        {/* 5. Citizen Statistics Counters */}
        <section className="bg-slate-50 border border-border-subtle rounded-2xl p-6 md:p-8">
          <h2 className="text-center font-bold text-xl font-serif text-primary mb-6">
            मंच का प्रभाव (BharatOne Platform Impact)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-saffron font-serif">
                <AnimatedCounter value={750000} />+
              </span>
              <span className="text-xs font-medium text-text-secondary mt-1">
                मदद प्राप्त नागरिक (Citizens Helped)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-accent font-serif">
                <AnimatedCounter value={120000} />+
              </span>
              <span className="text-xs font-medium text-text-secondary mt-1">
                सरलीकृत दस्तावेज़ (Doc Simplified)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-green font-serif">
                <AnimatedCounter value={450} />+
              </span>
              <span className="text-xs font-medium text-text-secondary mt-1">
                सरकारी योजनाएँ (Govt Schemes)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-saffron font-serif">
                <AnimatedCounter value={22} />
              </span>
              <span className="text-xs font-medium text-text-secondary mt-1">
                समर्थित भाषाएँ (Languages Supported)
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-accent font-serif">
                <AnimatedCounter value={3200000} />+
              </span>
              <span className="text-xs font-medium text-text-secondary mt-1">
                AI बातचीत (AI Conversations)
              </span>
            </div>
          </div>
        </section>

        {/* 6. Trust Section */}
        <section className="flex flex-col gap-6 text-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold font-serif text-primary">
              विश्वास और सुरक्षा (Trust & Security Framework)
            </h2>
            <p className="text-xs text-text-secondary max-w-lg mx-auto">
              हम नागरिक डेटा की संप्रभुता और गोपनीयता बनाए रखने के लिए प्रतिबद्ध
              हैं।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            <GlassCard className="text-left p-5 border-l-4 border-l-green">
              <ShieldCheck className="h-6 w-6 text-green" />
              <h3 className="font-bold text-sm font-serif mt-2">
                DPDP अधिनियम अनुपालन (DPDP Act 2023)
              </h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                नागरिक डेटा सहमति-आधारित संरचनाओं पर आधारित है और सख्त नियमों का
                पालन करता है।
              </p>
            </GlassCard>
            <GlassCard className="text-left p-5 border-l-4 border-l-saffron">
              <Zap className="h-6 w-6 text-saffron" />
              <h3 className="font-bold text-sm font-serif mt-2">
                रीयल-टाइम विश्लेषण (Real-Time AI)
              </h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                Gemini API का उपयोग करके दस्तावेजों और स्वास्थ्य विवरणों का तेज
                सत्यापन।
              </p>
            </GlassCard>
            <GlassCard className="text-left p-5 border-l-4 border-l-accent">
              <Globe className="h-6 w-6 text-accent" />
              <h3 className="font-bold text-sm font-serif mt-2">
                बहुभाषी अनुवाद (Multilingual Pipeline)
              </h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                भाषिणी और गूगल एपीआई के समन्वय से मातृभाषाओं में सही वॉयस सहायक
                सहायता।
              </p>
            </GlassCard>
            <GlassCard className="text-left p-5 border-l-4 border-l-primary">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-sm font-serif mt-2">
                24/7 सहायता डेस्क (24/7 Citizen Help)
              </h3>
              <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                नागरिकों की शंकाओं का तुरंत निवारण करने के लिए हमेशा तत्पर
                कल्याणकारी AI।
              </p>
            </GlassCard>
          </div>
        </section>
      </main>

      {/* 7. Footer Section */}
      <footer className="w-full bg-primary text-white py-10 px-6 mt-12 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-saffron flex items-center justify-center font-bold text-white text-xs">
                B
              </div>
              <span className="font-bold text-base font-serif">
                भारत वन (BharatOne AI)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              India's AI Public Services Companion | Version 1.0.0
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300">
            <a
              href="/privacy"
              className="hover:text-white transition-colors duration-150"
            >
              गोपनीयता नीति (Privacy Policy)
            </a>
            <a
              href="/terms"
              className="hover:text-white transition-colors duration-150"
            >
              सेवा की शर्तें (Terms of Service)
            </a>
            <a
              href="/about"
              className="hover:text-white transition-colors duration-150"
            >
              हमारे बारे में (About Us)
            </a>
            <a
              href="/contact"
              className="hover:text-white transition-colors duration-150"
            >
              संपर्क करें (Contact Us)
            </a>
            <a
              href="https://github.com"
              className="hover:text-white transition-colors duration-150"
            >
              GitHub Repository
            </a>
          </div>

          <div className="text-right text-[10px] text-slate-400">
            डिजिटल इंडिया पहल (Digital India) | Gov Sandbox Sandbox Environment
          </div>
        </div>
      </footer>
    </div>
  );
}
