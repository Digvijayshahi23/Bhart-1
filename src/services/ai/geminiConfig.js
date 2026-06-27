/**
 * geminiConfig.js
 * Centralized Gemini AI client configuration.
 * API key loaded exclusively from environment variables.
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL = "gemini-2.0-flash";

const DEFAULT_SYSTEM_INSTRUCTION = `You are BharatOne AI — India's universal citizen assistant.
You help ordinary Indian citizens with government schemes, healthcare, legal guidance, career guidance, financial literacy, and document understanding.
Always respond in the user's language (Hindi or English).
Always append a brief disclaimer for healthcare and legal topics.
Never provide specific investment advice, legal advice, or medical diagnoses.
Keep responses concise, friendly, and actionable.`;

/**
 * Sends a message to Gemini and returns the text response.
 * Includes retry logic (up to 3 attempts), timeout (30s), and fallback.
 */
export async function callGemini(
  userMessage,
  conversationHistory = [],
  systemOverride = null,
) {
  if (!GEMINI_API_KEY) {
    return getFallbackResponse(userMessage);
  }

  const systemInstruction = systemOverride || DEFAULT_SYSTEM_INSTRUCTION;

  const contents = [
    ...conversationHistory,
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const requestBody = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
      },
    ],
  };

  const url = `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 30000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const status = response.status;

        // Rate limit — wait before retry
        if (status === 429 && attempt < MAX_RETRIES) {
          await sleep(attempt * 2000);
          continue;
        }

        throw new Error(
          errorData?.error?.message || `Gemini API error: ${status}`,
        );
      }

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        getFallbackResponse(userMessage);

      // Track token usage (for analytics)
      const usage = data?.usageMetadata || {};
      logTokenUsage(usage);

      return text;
    } catch (error) {
      if (error.name === "AbortError") {
        if (attempt < MAX_RETRIES) {
          await sleep(1000);
          continue;
        }
        return "⏱️ अनुरोध समय सीमा समाप्त हो गई। कृपया पुनः प्रयास करें।\n(Request timed out. Please try again.)";
      }

      if (attempt === MAX_RETRIES) {
        console.error("[Gemini] Max retries reached:", error.message);
        return getFallbackResponse(userMessage);
      }

      await sleep(attempt * 1000);
    }
  }

  return getFallbackResponse(userMessage);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logTokenUsage(usage) {
  if (usage.totalTokenCount) {
    console.debug(
      `[Gemini] Tokens used — input: ${usage.promptTokenCount}, output: ${usage.candidatesTokenCount}, total: ${usage.totalTokenCount}`,
    );
  }
}

function getFallbackResponse(userMessage) {
  const q = (userMessage || "").toLowerCase();

  if (q.includes("scheme") || q.includes("योजना")) {
    return "आप पीएम किसान सम्मान निधि, आयुष्मान भारत और PM Jan Dhan Yojana जैसी योजनाओं के लिए पात्र हो सकते हैं। अधिक जानकारी के लिए 'सरकारी योजनाएं' मॉड्यूल खोलें।";
  }
  if (q.includes("legal") || q.includes("fir") || q.includes("court")) {
    return "यह जानकारी केवल शैक्षणिक उद्देश्यों के लिए है। विस्तृत मार्गदर्शन के लिए 'कानूनी सहायता' मॉड्यूल खोलें।";
  }
  if (q.includes("health") || q.includes("medicine") || q.includes("दवा")) {
    return "यह सूचना केवल शैक्षणिक उद्देश्यों के लिए है। चिकित्सीय सलाह के लिए अपने डॉक्टर से संपर्क करें।";
  }

  return "नमस्ते! मैं BharatOne AI हूँ। सरकारी योजनाओं, स्वास्थ्य, कानूनी, करियर या वित्त से संबंधित किसी भी प्रश्न के लिए मुझसे पूछें।\n\n(Hi! I'm BharatOne AI. Ask me anything about government schemes, health, legal, career, or finance.)";
}

export { GEMINI_MODEL, DEFAULT_SYSTEM_INSTRUCTION };
