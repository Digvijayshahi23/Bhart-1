import { createContext, useContext, useState } from "react";
import { detectIntent } from "../services/gemini/intentDetection.js";
import { sendPromptToGemini } from "../services/gemini/geminiClient.js";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [activeIntent, setActiveIntent] = useState("General");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const sendMessage = async (text) => {
    if (!text || text.trim() === "") return;

    // Add user message
    const userMsg = {
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // 1. Detect Intent
      const intent = detectIntent(text);
      setActiveIntent(intent);

      // 2. Call simulated Gemini service
      const botResponse = await sendPromptToGemini(intent, text);

      // Format response text with markdown layout
      const formattedText = `### ${botResponse.title}

${botResponse.summary}

**मुख्य विवरण (Details):**
${botResponse.details}

**मुख्य क्रियाएँ (Action Items):**
${botResponse.actions.map((action) => `- ${action}`).join("\n")}

---
*${botResponse.disclaimer}*`;

      const botMsg = {
        sender: "bot",
        text: formattedText,
        timestamp: new Date().toLocaleTimeString(),
        intent,
        rawResponse: botResponse,
      };

      setMessages((prev) => [...prev, botMsg]);

      // Add to session history sidebar
      setHistory((prev) => {
        const entry = { id: Date.now(), title: text.substring(0, 30) + "..." };
        return [entry, ...prev.filter((e) => e.title !== entry.title)].slice(
          0,
          10,
        );
      });
    } catch {
      const errorMsg = {
        sender: "bot",
        text: "सर्वर त्रुटि। कृपया पुनः प्रयास करें। (Server error. Please retry.)",
        timestamp: new Date().toLocaleTimeString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setActiveIntent("General");
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        activeIntent,
        loading,
        history,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
