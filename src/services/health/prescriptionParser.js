/**
 * Simulates OCR-based prescription scanning and schedule layout mapping.
 */
export function parsePrescription() {
  return {
    doctorName: "डॉ. ए. के. सिन्हा (Dr. A.K. Sinha)",
    riskLevel: "Low",
    medicines: [
      {
        name: "Paracetamol 650mg",
        dosage: "1 गोली (Tablet)",
        frequency: "दिन में 3 बार (Thrice a day)",
        duration: "3 दिन",
        instructions: "भोजन के बाद (Post Meal)",
      },
      {
        name: "Pantoprazole 40mg",
        dosage: "1 कैप्सूल (Capsule)",
        frequency: "दिन में 1 बार (Once daily)",
        duration: "5 दिन",
        instructions: "सुबह खाली पेट (Empty Stomach)",
      },
    ],
    precautions:
      "एंटीबायोटिक का कोर्स बिना छोड़े पूरा करें। शराब के सेवन से बचें।",
    followUp: "5 दिन के बाद सामान्य जांच हेतु दोबारा मिलें।",
  };
}
export default parsePrescription;
