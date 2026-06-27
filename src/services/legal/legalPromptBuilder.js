export const LEGAL_DISCLAIMER =
  "यह जानकारी केवल शैक्षणिक उद्देश्यों के लिए है और इसे कानूनी सलाह नहीं माना जाना चाहिए। कृपया कानूनी मामलों के लिए किसी योग्य कानूनी पेशेवर से परामर्श लें। (This info is for educational reference and is not legal advice.)";

export const SYSTEM_PROMPTS = {
  rights:
    "You are BharatOne's Citizen Legal Rights Assistant. Help citizens understand consumer rights, employment contracts, and tenant laws. Always append the legal disclaimer.",
  complaint:
    "You are BharatOne's Legal Complaint Draft Assistant. Guide users on standard templates for consumer grievances and cybercrime reports. Always append the legal disclaimer.",
};

export function buildPrompt(type, query) {
  return `${SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.rights}\n\nQuery: ${query}`;
}
