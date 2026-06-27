/**
 * aiOrchestrator.js
 * Centralized AI orchestrator — intent detection, module routing, context building.
 *
 * Flow:
 *  User Query → detectIntent() → buildContext() → routeToModule() → callGemini() → formatResponse()
 */

import { callGemini } from "./geminiConfig.js";

// ─── Module definitions ─────────────────────────────────────────────────────
const MODULES = {
  SCHEMES: "schemes",
  HEALTHCARE: "healthcare",
  LEGAL: "legal",
  CAREER: "career",
  FINANCE: "finance",
  DOCUMENTS: "documents",
  GENERAL: "general",
};

// ─── Intent keyword maps ─────────────────────────────────────────────────────
const INTENT_KEYWORDS = {
  [MODULES.SCHEMES]: [
    "scheme",
    "योजना",
    "ration",
    "aadhaar",
    "pm kisan",
    "awas",
    "ujjwala",
    "subsidy",
    "सब्सिडी",
    "government benefit",
    "सरकारी लाभ",
  ],
  [MODULES.HEALTHCARE]: [
    "medicine",
    "दवा",
    "doctor",
    "डॉक्टर",
    "prescription",
    "hospital",
    "health",
    "स्वास्थ्य",
    "ayushman",
    "lab report",
    "symptom",
    "बीमारी",
  ],
  [MODULES.LEGAL]: [
    "fir",
    "police",
    "court",
    "legal",
    "कानून",
    "consumer",
    "उपभोक्ता",
    "cybercrime",
    "साइबर",
    "tenant",
    "किरायेदार",
    "rights",
    "अधिकार",
  ],
  [MODULES.CAREER]: [
    "job",
    "नौकरी",
    "upsc",
    "ssc",
    "scholarship",
    "छात्रवृत्ति",
    "resume",
    "career",
    "करियर",
    "interview",
    "college",
    "exam",
  ],
  [MODULES.FINANCE]: [
    "loan",
    "emi",
    "tax",
    "insurance",
    "budget",
    "बजट",
    "pension",
    "पेंशन",
    "bank",
    "बैंक",
    "upi",
    "savings",
    "बचत",
    "mutual fund",
  ],
  [MODULES.DOCUMENTS]: [
    "document",
    "दस्तावेज़",
    "upload",
    "scan",
    "aadhaar card",
    "pan card",
    "certificate",
    "affidavit",
    "rental",
    "agreement",
  ],
};

// ─── System prompt overrides per module ──────────────────────────────────────
const MODULE_PROMPTS = {
  [MODULES.SCHEMES]:
    "You are BharatOne's Government Schemes Expert. Provide eligibility, documents required, and application steps for Indian government welfare programs. Always respond in the user's language.",
  [MODULES.HEALTHCARE]:
    "You are BharatOne's Healthcare Assistant. Provide educational information about medicines, symptoms, and health conditions. Always state this is NOT medical advice and recommend consulting a doctor.",
  [MODULES.LEGAL]:
    "You are BharatOne's Legal Information Guide. Explain Indian laws and rights in simple terms. Always state this is educational information ONLY and NOT legal advice.",
  [MODULES.CAREER]:
    "You are BharatOne's Career Advisor. Help with government exam prep, scholarship applications, resume tips, and career roadmaps for Indian students and job seekers.",
  [MODULES.FINANCE]:
    "You are BharatOne's Financial Literacy Guide. Explain EMI, tax basics, government welfare schemes, and budgeting. Never provide investment advice.",
  [MODULES.DOCUMENTS]:
    "You are BharatOne's Document Explainer. Break down complex government documents and legal notices into simple language any citizen can understand.",
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Detects the intent/module from a user query string.
 */
export function detectIntent(query = "") {
  const q = query.toLowerCase();

  for (const [module, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some((kw) => q.includes(kw))) {
      return module;
    }
  }

  return MODULES.GENERAL;
}

/**
 * Builds context object for the current session.
 */
export function buildContext(profile = {}, history = []) {
  const contextParts = [];

  if (profile?.name) contextParts.push(`User: ${profile.name}`);
  if (profile?.state) contextParts.push(`State: ${profile.state}`);
  if (profile?.occupation)
    contextParts.push(`Occupation: ${profile.occupation}`);
  if (profile?.language)
    contextParts.push(`Preferred language: ${profile.language}`);
  if (profile?.isFarmer) contextParts.push("User is a farmer");
  if (profile?.isStudent) contextParts.push("User is a student");

  return {
    profileSummary: contextParts.join(", "),
    historyLength: history.length,
    module: null, // set after detectIntent
  };
}

/**
 * Main orchestration function — routes query to correct Gemini prompt.
 * @param {string} query - User's message
 * @param {Array} conversationHistory - Prior Gemini turns [{role, parts}]
 * @param {Object} profile - User profile object
 * @returns {Promise<{text: string, module: string, intent: string}>}
 */
export async function orchestrate(
  query,
  conversationHistory = [],
  profile = {},
) {
  const intent = detectIntent(query);
  const context = buildContext(profile, conversationHistory);
  const systemPrompt = buildSystemPrompt(intent, context);

  const responseText = await callGemini(
    query,
    conversationHistory,
    systemPrompt,
  );

  return {
    text: responseText,
    module: intent,
    intent,
    suggestedRoute: intent !== MODULES.GENERAL ? `/${intent}` : null,
  };
}

// ─── Private helpers ──────────────────────────────────────────────────────────

function buildSystemPrompt(module, context) {
  const base =
    MODULE_PROMPTS[module] ||
    "You are BharatOne AI, India's universal citizen assistant. Help citizens with government schemes, healthcare, legal, career, finance, and documents.";

  const contextLine = context.profileSummary
    ? `\n\nUser context: ${context.profileSummary}`
    : "";

  return `${base}${contextLine}`;
}

export { MODULES };
