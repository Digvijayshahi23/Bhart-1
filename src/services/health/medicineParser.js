export const MEDICINES_DB = [
  {
    name: "Paracetamol (पैरासिटामोल)",
    purpose: "बुखार और दर्द निवारक (Fever and Pain Relief)",
    usage: "भोजन के बाद, दिन में 1-3 बार आवश्यकतानुसार।",
    sideEffects: "अत्यधिक सेवन से लीवर को नुकसान, त्वचा पर दाने।",
    foodInstructions: "खाली पेट लेने से बचें। भोजन के बाद लें।",
    storage: "ठंडी और सूखी जगह पर, धूप से दूर रखें।",
    warnings: "शराब के साथ सेवन न करें। लीवर की बीमारी में डॉक्टर से सलाह लें।",
  },
  {
    name: "Metformin (मेटफॉर्मिन)",
    purpose: "टाइप 2 मधुमेह नियंत्रण (Type 2 Diabetes Control)",
    usage: "भोजन के साथ या तुरंत बाद।",
    sideEffects: "उल्टी, दस्त, पेट में गैस, स्वाद बदलना।",
    foodInstructions: "भोजन के साथ लें ताकि पेट की खराबी से बचा जा सके।",
    storage: "कमरे के तापमान (20-25°C) पर स्टोर करें।",
    warnings: "गुर्दे (Kidney) की गंभीर बीमारी में इसका उपयोग न करें।",
  },
  {
    name: "Pantoprazole (पेंटोप्राजोल)",
    purpose: "एसिडिटी और सीने में जलन (Acidity and Heartburn)",
    usage: "सुबह खाली पेट, भोजन से 30 मिनट पहले।",
    sideEffects: "सिरदर्द, दस्त, पेट दर्द, चक्कर आना।",
    foodInstructions: "सुबह खाली पेट पानी के साथ लें।",
    storage: "नमी से बचाकर सूखी जगह पर रखें।",
    warnings: "लंबे समय तक बिना डॉक्टर के पर्चे के न लें।",
  },
  {
    name: "Amoxicillin (एमोक्सिसिलिन)",
    purpose: "जीवाणु संक्रमण (Bacterial Infection Antibiotic)",
    usage: "भोजन के बाद या डॉक्टर के निर्देशानुसार।",
    sideEffects: "एलर्जी, दस्त, त्वचा पर लाल दाने।",
    foodInstructions: "कोर्स पूरा करें, बीच में न छोड़ें।",
    storage: "ठंडी जगह पर रखें।",
    warnings: "पेनिसिलिन से एलर्जी होने पर सेवन न करें।",
  },
  {
    name: "Cetirizine (सेटीरिज़िन)",
    purpose: "एलर्जी और जुकाम (Allergy and Cold Relief)",
    usage: "रात में सोते समय, दिन में 1 बार।",
    sideEffects: "नींद आना, थकान, मुंह सूखना।",
    foodInstructions: "भोजन के साथ या बिना भोजन के ले सकते हैं।",
    storage: "धूप से दूर सूखी जगह पर रखें।",
    warnings:
      "दवा लेने के बाद भारी मशीनरी न चलाएं या वाहन न चलाएं (नींद आने का खतरा)।",
  },
];

export function searchMedicines(query) {
  if (!query) return MEDICINES_DB;
  const q = query.toLowerCase();
  return MEDICINES_DB.filter(
    (m) =>
      m.name.toLowerCase().includes(q) || m.purpose.toLowerCase().includes(q),
  );
}
