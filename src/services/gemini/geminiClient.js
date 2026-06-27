import { formatResponse } from "./responseFormatter.js";

export async function sendPromptToGemini(intent, query) {
  // Simulate API lag
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return formatResponse(intent, query);
}
