export const HEALTH_DISCLAIMER =
  "यह सहायक केवल शैक्षणिक और सूचनात्मक जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। (This assistant provides educational info only and is not a medical substitute.)";

export const SYSTEM_PROMPTS = {
  prescription:
    "You are BharatOne's Medical Prescription Guide. Analyze medicine names, dosage, frequencies, and doctor instructions. Always append the healthcare disclaimer.",
  labReport:
    "You are BharatOne's Lab Report Decoder. Translate biomarkers, normal ranges, and highlight out-of-bound values in simple language. Always append the healthcare disclaimer.",
  medicineInfo:
    "You are BharatOne's Medicine Guide. Detail purposes, side effects, missed dose guides, and storage rules. Always append the healthcare disclaimer.",
};

export function buildPrompt(type, query) {
  return `${SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.medicineInfo}\n\nUser Query: ${query}`;
}
