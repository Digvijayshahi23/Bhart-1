/**
 * Simulates resume parsing and evaluates score and keyword metrics.
 */
export function analyzeResume(fileName) {
  const score = Math.floor(72 + Math.random() * 22);

  return {
    score,
    fileName,
    strengths: [
      "स्पष्ट शैक्षणिक विवरण (Clear Education Details)",
      "प्रोजेक्ट्स के विवरण में एक्शन वर्ब्स का उचित उपयोग।",
      "साफ और सुव्यवस्थित सिंगल-पेज फॉर्मेट।",
    ],
    weaknesses: [
      "रिज्यूमे में मात्रात्मक परिणाम (Quantitative Results - % / ₹) की कमी।",
      "करियर ऑब्जेक्टिव (Career Objective) का बहुत ही पुराना स्वरूप।",
    ],
    atsSuggestions: [
      "प्रोजेक्ट्स में 'गिटहब लिंक' या 'लाइव डेमो लिंक' जोड़ें।",
      "नौकरी के विवरण (Job Description) से मेल खाते कीवर्ड्स का उपयोग बढ़ाएं।",
    ],
  };
}
export default analyzeResume;
