/**
 * Sanitizes and cleans raw OCR extracted text.
 * Supports standard English alphanumeric and Devanagari characters.
 */
export function cleanText(rawText) {
  if (!rawText) return "";
  return rawText
    .replace(/[^\w\s\u0900-\u097F.,:\-/()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
