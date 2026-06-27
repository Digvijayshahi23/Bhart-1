/**
 * profileAnalyzer.js
 * Calculates profile completion percentage and missing fields.
 */
export function analyzeProfile(profile = {}) {
  const fields = [
    { key: "name", label: "पूरा नाम (Full Name)" },
    { key: "phone", label: "मोबाइल नंबर (Phone)" },
    { key: "state", label: "राज्य (State)" },
    { key: "district", label: "जिला (District)" },
    { key: "occupation", label: "व्यवसाय (Occupation)" },
    { key: "language", label: "भाषा (Language)" },
    { key: "photoURL", label: "प्रोफ़ाइल फ़ोटो (Photo)" },
  ];

  const filled = fields.filter((f) => profile[f.key] && profile[f.key] !== "");
  const missing = fields.filter(
    (f) => !profile[f.key] || profile[f.key] === "",
  );
  const percentage = Math.round((filled.length / fields.length) * 100);

  return { percentage, filled, missing };
}
