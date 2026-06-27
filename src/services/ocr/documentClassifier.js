/**
 * Classifies text content into standard document types using keyword mapping rules.
 */
export function classifyDocument(text) {
  const query = text.toLowerCase();

  if (/\b(notice|circular|order|court|hearing|advocate|summon)\b/.test(query)) {
    return "Government Notice";
  }
  if (/\b(electricity|bill|utility|power|meter|kwh|discom)\b/.test(query)) {
    return "Electricity Bill";
  }
  if (/\b(insurance|policy|claim|premium|sum assured|insurer)\b/.test(query)) {
    return "Insurance";
  }
  if (
    /\b(loan|finance|emi|interest|sanction|mortgage|creditor)\b/.test(query)
  ) {
    return "Loan";
  }
  if (
    /\b(hospital|prescription|medical|health|patient|lab|report|doctor)\b/.test(
      query,
    )
  ) {
    return "Medical";
  }
  if (
    /\b(salary|slip|payslip|employee|employer|wages|ctc|salary slip)\b/.test(
      query,
    )
  ) {
    return "Employment";
  }
  if (
    /\b(aadhaar|uidai|resident|unique identification|female|male)\b/.test(query)
  ) {
    return "Aadhaar Card";
  }
  if (
    /\b(pan|permanent account|income tax|tax department|nsdl|utitsl)\b/.test(
      query,
    )
  ) {
    return "PAN Card";
  }
  return "Unknown";
}
