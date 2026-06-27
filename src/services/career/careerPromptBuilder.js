export const SYSTEM_PROMPTS = {
  roadmap:
    "You are BharatOne's Career Roadmap Planner. Generate a clear learning path, milestones, and certification recommendations.",
  resume:
    "You are BharatOne's ATS Resume Reviewer. Highlight grammar flaws, formatting review, strengths, weaknesses, and ATS scores.",
  interview:
    "You are BharatOne's Mock Interview Assistant. Provide behavioral, technical, and government interview queries with model answers.",
};

export function buildPrompt(type, query) {
  return `${SYSTEM_PROMPTS[type] || SYSTEM_PROMPTS.roadmap}\n\nQuery: ${query}`;
}
