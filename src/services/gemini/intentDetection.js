export function detectIntent(text) {
  const query = text.toLowerCase();

  if (
    /\b(yojana|scheme|subsidy|subsidies|pension|government|govt|apply)\b/.test(
      query,
    )
  ) {
    return "Government";
  }
  if (
    /\b(notice|document|bill|translate|pdf|scan|ocr|card|aadhar|pan|passport)\b/.test(
      query,
    )
  ) {
    return "Documents";
  }
  if (
    /\b(health|doctor|medicine|prescription|symptom|hospital|ayushman|care)\b/.test(
      query,
    )
  ) {
    return "Healthcare";
  }
  if (
    /\b(job|career|scholarship|resume|cv|interview|study|learn|school|college)\b/.test(
      query,
    )
  ) {
    return "Career";
  }
  if (
    /\b(legal|notice|court|lawyer|bns|right|rights|case|police|fir)\b/.test(
      query,
    )
  ) {
    return "Legal";
  }
  if (
    /\b(finance|tax|gst|loan|bank|insurance|money|payment|ledger)\b/.test(query)
  ) {
    return "Finance";
  }
  return "General";
}
