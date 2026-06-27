import { cleanText } from "./textCleaner.js";
import { classifyDocument } from "./documentClassifier.js";
import { parseDocumentFields } from "./documentParser.js";
import { buildSummary } from "./summaryBuilder.js";
import { generateActions } from "./actionGenerator.js";

/**
 * Validates, cleans, classifies, and parses uploaded citizen documents.
 */
export async function processDocument(file, textInput = "") {
  // 1. Security Check: Validate file types
  const validTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];
  if (file && !validTypes.includes(file.type)) {
    throw new Error(
      "अमान्य फ़ाइल प्रकार! कृपया केवल PDF, JPEG, PNG या WEBP अपलोड करें।",
    );
  }
  // 2. Validate maximum file size (10MB limit)
  if (file && file.size > 10 * 1024 * 1024) {
    throw new Error("फ़ाइल का आकार 10MB से अधिक नहीं होना चाहिए।");
  }

  // 3. Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 4. Determine baseline query text
  const docText =
    textInput ||
    `Aadhaar card resident unique identification female male UIDAI ${
      file ? file.name : "Document"
    }`;
  const clean = cleanText(docText);

  // 5. Classify & Parse fields
  const docType = classifyDocument(clean);
  const fields = parseDocumentFields(clean, docType);
  const summaryObj = buildSummary(docType, file ? file.name : "document.pdf");
  const actionsList = generateActions(docType);

  return {
    name: file ? file.name : "document.pdf",
    type: docType,
    text: clean,
    ...fields,
    ...summaryObj,
    actions: actionsList,
    date: new Date().toLocaleDateString(),
  };
}
export default processDocument;
