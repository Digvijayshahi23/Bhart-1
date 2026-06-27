/**
 * Simulates lab report scanning and flags abnormal parameters.
 */
export function analyzeLabReport(_fileName) {
  return {
    testName: "रक्त परीक्षण रिपोर्ट (Blood Count & Lipid Profile)",
    riskLevel: "Medium",
    summary:
      "रिपोर्ट में हीमोग्लोबिन का स्तर सामान्य सीमा से थोड़ा कम पाया गया है, जो हल्के एनीमिया का संकेत हो सकता है। कोलेस्ट्रॉल का स्तर भी थोड़ा बढ़ा हुआ है।",
    biomarkers: [
      {
        name: "Hemoglobin (हीमोग्लोबिन)",
        value: "11.2 g/dL",
        normalRange: "12.0 - 15.5 g/dL",
        status: "Low",
      },
      {
        name: "Total Cholesterol",
        value: "215 mg/dL",
        normalRange: "Less than 200 mg/dL",
        status: "High",
      },
      {
        name: "White Blood Cells (WBC)",
        value: "6,500 /mcL",
        normalRange: "4,500 - 11,000 /mcL",
        status: "Normal",
      },
      {
        name: "Platelets (प्लेटलेट्स)",
        value: "2,50,000 /mcL",
        normalRange: "1,50,000 - 4,50,000 /mcL",
        status: "Normal",
      },
    ],
    doctorQuestions: [
      "क्या हीमोग्लोबिन बढ़ाने के लिए आयरन सप्लीमेंट आवश्यक हैं?",
      "कोलेस्ट्रॉल को नियंत्रित करने के लिए मुझे किस प्रकार के आहार बदलाव करने चाहिए?",
    ],
  };
}
export default analyzeLabReport;
