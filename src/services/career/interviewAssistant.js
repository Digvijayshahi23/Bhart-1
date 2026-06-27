/**
 * Contains mock questions database and response guidelines.
 */
export function getMockQuestions(category) {
  const questions = {
    HR: [
      {
        q: "अपने बारे में बताएं (Tell me about yourself).",
        hint: "अपनी शिक्षा, महत्वपूर्ण प्रोजेक्ट्स और वर्तमान लक्ष्यों पर ध्यान केंद्रित करें।",
      },
      {
        q: "आप इस संस्था में क्यों काम करना चाहते हैं (Why this role)?",
        hint: "दिखाएं कि आपने उनके कार्य और डिजिटल पहलों के बारे में शोध किया है।",
      },
    ],
    Technical: [
      {
        q: "जावास्क्रिप्ट में let और const में क्या अंतर है?",
        hint: "ब्लॉक स्कोप (block scope) और मान बदलने की स्वतंत्रता (mutability) पर प्रकाश डालें।",
      },
      {
        q: "डेटाबेस में इंडेक्स (Index) का क्या महत्व है?",
        hint: "यह डेटा खोजने की गति बढ़ाता है, परन्तु अतिरिक्त डिस्क स्पेस लेता है।",
      },
    ],
    Government: [
      {
        q: "भारतीय संविधान की 8वीं अनुसूची क्या है?",
        hint: "यह भारत की 22 आधिकारिक क्षेत्रीय भाषाओं से संबंधित है।",
      },
    ],
  };

  return questions[category] || questions.HR;
}
export default getMockQuestions;
