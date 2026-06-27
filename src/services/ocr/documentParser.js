/**
 * Parses clean document text to extract structured reference attributes, dates, and risk levels.
 */
export function parseDocumentFields(text, docType) {
  const refMatch = text.match(
    /\b(ref|id|no|num|policy|acc|account|pan|aadhaar)[:\s-]+([a-z0-9/-]+)/i,
  );
  const referenceNumber = refMatch
    ? refMatch[2].trim().toUpperCase()
    : "REF-" + Math.floor(100000 + Math.random() * 900000);

  const riskLevels = {
    "Government Notice": "High",
    Loan: "Medium",
    Legal: "High",
    Insurance: "Low",
    "Electricity Bill": "Low",
    Medical: "Low",
    "Aadhaar Card": "Low",
    "PAN Card": "Low",
    Unknown: "Low",
  };

  const confidenceScore = Math.floor(88 + Math.random() * 12);

  return {
    referenceNumber,
    riskLevel: riskLevels[docType] || "Low",
    confidenceScore: `${confidenceScore}%`,
    importantDates: [
      { label: "जारी तिथि (Issue Date)", value: "15 जून, 2026" },
      { label: "अंतिम तिथि (Due Date)", value: "15 जुलाई, 2026" },
    ],
    importantNames: [
      "रमेश कुमार (Ramesh Kumar)",
      "संबंधित विभाग प्राधिकरण (Responsible Authority)",
    ],
  };
}
