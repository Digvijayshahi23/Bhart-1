export const FINANCE_DISCLAIMER =
  "यह जानकारी केवल शैक्षणिक और सूचनात्मक उद्देश्यों के लिए प्रदान की गई है और इसे वित्तीय या निवेश सलाह नहीं माना जाना चाहिए। (This info is for educational reference and is not financial advice.)";

export const SYSTEM_PROMPTS = {
  welfare:
    "You are BharatOne's Financial Welfare Guide. Detail eligibility, application steps, and document checklist for pension and micro-loan programs.",
  taxation:
    "You are BharatOne's Taxation Assistant. Explain tax-saving rules, TDS guidelines, and ITR schedules in simple terms.",
};

export function buildPrompt(type, query) {
  return `${SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.welfare}\n\nQuery: ${query}`;
}
