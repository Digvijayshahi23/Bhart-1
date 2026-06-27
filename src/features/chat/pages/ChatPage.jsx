import { useState } from "react";
import { useChat } from "../../../contexts/ChatContext.jsx";
import { Navbar } from "../../../components/common/Navbar.jsx";
import { Header } from "../../../components/common/Header.jsx";
import { Footer } from "../../../components/common/Footer.jsx";
import { ChatBubble } from "../../../components/common/ChatBubble.jsx";
import { AIPromptInput } from "../../../components/common/AIPromptInput.jsx";
import { Button } from "../../../components/common/Button.jsx";
import {
  Sparkles,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  Bookmark,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ChatPage() {
  const { messages, loading, history, sendMessage, clearChat } = useChat();
  const [inputText, setInputText] = useState("");

  const quickPrompts = [
    {
      label: "पीएम किसान योजना पात्रता",
      text: "पीएम किसान सम्मान निधि की पात्रता क्या है?",
    },
    {
      label: "सरकारी नोटिस अनुवाद",
      text: "इस सरकारी नोटिस का क्या अर्थ है? (Notice translate)",
    },
    { label: "दवा पर्ची अनुवाद", text: "इस दवा की पर्ची को हिंदी में समझाएं।" },
    {
      label: "स्कॉलरशिप जानकारी",
      text: "12वीं के बाद राष्ट्रीय छात्रवृत्ति (National Scholarship) कैसे पाएं?",
    },
    {
      label: "सरकारी नौकरी अपडेट",
      text: "नवीनतम सरकारी नौकरियों और आवेदन प्रक्रियाओं की सूची।",
    },
    {
      label: "उपभोक्ता अधिकार",
      text: "सामान खराब निकलने पर उपभोक्ता अधिकार (Consumer Rights) क्या हैं?",
    },
  ];

  const handleSend = () => {
    if (!inputText || inputText.trim() === "") return;
    sendMessage(inputText);
    setInputText("");
  };

  const handleQuickPromptClick = (text) => {
    sendMessage(text);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("पाठ कॉपी किया गया (Text copied to clipboard)");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar */}
        <Navbar />

        {/* Conversation Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title="AI सहायक बातचीत (Conversational Assistant)" />

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Main Chat Workspace */}
            <div className="flex-1 flex flex-col justify-between p-6 overflow-hidden min-h-[500px]">
              {/* Conversation Area */}
              <div className="flex-1 overflow-y-auto mb-6 flex flex-col gap-4 max-h-[60vh] pr-2">
                {messages.length === 0 ? (
                  // Welcome Greeting & Quick Prompts
                  <div className="flex flex-col items-center justify-center text-center py-8 gap-4 max-w-2xl mx-auto">
                    <div className="w-14 h-14 rounded-full bg-saffron/10 flex items-center justify-center text-saffron shrink-0 shadow-sm">
                      <Sparkles className="h-7 w-7 animate-pulse" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl md:text-2xl font-bold font-serif text-primary">
                        Namaste 👋 I'm BharatOne AI
                      </h2>
                      <p className="text-sm text-text-secondary leading-relaxed px-4">
                        मैं सरकारी योजनाओं, दस्तावेज़ सारांश, प्राथमिक स्वास्थ्य
                        सलाह, करियर मार्गदर्शन और कानूनी अधिकारों की समझ में
                        आपका साथी हूँ। आप अपनी भाषा में मुझसे कुछ भी पूछ सकते
                        हैं।
                      </p>
                    </div>

                    {/* Quick Prompts Grid */}
                    <div className="w-full mt-6 flex flex-col gap-2 text-left">
                      <span className="text-xs font-bold text-text-secondary mb-1">
                        सुझाए गए प्रश्न (Suggested Prompts)
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {quickPrompts.map((qp, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleQuickPromptClick(qp.text)}
                            className="bg-surface border border-border-subtle hover:border-primary/50 hover:bg-slate-50 p-3 rounded-xl transition-all duration-150 text-left text-xs font-semibold flex items-center justify-between group"
                          >
                            <span>{qp.label}</span>
                            <ChevronRight className="h-3.5 w-3.5 text-text-muted group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active Chat Bubbles
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col gap-1.5 ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <ChatBubble sender={msg.sender} message={msg.text} />

                      {/* Bot Response Controls Toolbar */}
                      {msg.sender === "bot" && !msg.isError && (
                        <div className="flex items-center gap-3 pl-12 text-text-muted select-none">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-accent">
                            Intent: {msg.intent}
                          </span>
                          <button
                            onClick={() => copyToClipboard(msg.text)}
                            className="p-1 rounded-md hover:bg-surface-hover hover:text-text-primary transition-colors"
                            title="Copy reply"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => sendMessage(messages[idx - 1]?.text)}
                            className="p-1 rounded-md hover:bg-surface-hover hover:text-text-primary transition-colors"
                            title="Regenerate reply"
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </button>
                          <div className="flex gap-1 border-l border-border-subtle pl-2">
                            <button
                              onClick={() => toast.success("Feedback recorded")}
                              className="p-0.5 rounded hover:bg-surface-hover hover:text-text-primary transition-colors"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => toast.success("Feedback recorded")}
                              className="p-0.5 rounded hover:bg-surface-hover hover:text-text-primary transition-colors"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}

                {loading && (
                  <div className="flex gap-3 items-center text-xs text-text-muted">
                    <RefreshCw className="h-4 w-4 animate-spin text-saffron" />
                    <span>AI विश्लेषण कर रहा है... (AI is analyzing...)</span>
                  </div>
                )}
              </div>

              {/* Chat Textarea Box */}
              <div className="w-full">
                <AIPromptInput
                  value={inputText}
                  onChange={setInputText}
                  onSend={handleSend}
                  isListening={loading}
                  onVoiceTrigger={() => toast.success("Listening...")}
                />
              </div>
            </div>

            {/* Right Sidebar: Sessions History */}
            <aside className="w-full lg:w-64 bg-slate-50 border-t lg:border-t-0 lg:border-l border-border-subtle p-5 flex flex-col gap-5 text-left shrink-0">
              <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                <h3 className="font-bold text-sm font-serif text-primary">
                  बातचीत इतिहास (History)
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  disabled={messages.length === 0}
                  className="p-1 text-danger hover:bg-red-50 hover:text-red-700"
                  title="Clear current session"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* History sessions list */}
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
                {history.length === 0 ? (
                  <span className="text-xs text-text-muted text-center py-4">
                    कोई इतिहास नहीं है।
                  </span>
                ) : (
                  history.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => handleQuickPromptClick(h.title)}
                      className="w-full text-left text-xs bg-surface border border-border-subtle p-2.5 rounded-lg hover:border-primary/40 truncate font-medium flex items-center gap-2 group"
                    >
                      <Bookmark className="h-3 w-3 text-saffron shrink-0" />
                      <span className="truncate flex-1">{h.title}</span>
                    </button>
                  ))
                )}
              </div>
            </aside>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
