export const SCHOLARSHIPS = [
  {
    id: "schol_1",
    name: "राष्ट्रीय छात्रवृत्ति पोर्टल (National Scholarship Portal - NSP)",
    amount: "₹10,000 - ₹50,000 प्रति वर्ष",
    eligibility:
      "कक्षा 10वीं/12वीं उत्तीर्ण छात्र, पारिवारिक वार्षिक आय ₹2.5 लाख से कम।",
    deadline: "31 अक्टूबर, 2026",
    link: "https://scholarships.gov.in",
  },
  {
    id: "schol_2",
    name: "अल्पसंख्यक पोस्ट-मैट्रिक छात्रवृत्ति (Minority Post-Matric Scholarship)",
    amount: "₹6,000 - ₹12,000 प्रति वर्ष",
    eligibility:
      "कक्षा 11वीं/12वीं के अल्पसंख्यक छात्र, पिछली परीक्षा में 50% से अधिक अंक।",
    deadline: "15 नवंबर, 2026",
    link: "https://scholarships.gov.in",
  },
  {
    id: "schol_3",
    name: "पीएम छात्रवृत्ति योजना (PM Scholarship Scheme)",
    amount: "₹30,000 प्रति वर्ष (छात्राओं हेतु ₹36,000)",
    eligibility:
      "सशस्त्र बलों के आश्रित बच्चे, व्यावसायिक डिग्री पाठ्यक्रमों में नामांकित।",
    deadline: "31 दिसंबर, 2026",
    link: "https://desw.gov.in",
  },
  {
    id: "schol_4",
    name: "स्वामी विवेकानंद मेरिट छात्रवृत्ति (SVMCM Scholarship)",
    amount: "₹12,000 - ₹60,000 प्रति वर्ष",
    eligibility:
      "पश्चिम बंगाल के छात्र, पिछली बोर्ड परीक्षा में 60% अंक अनिवार्य।",
    deadline: "30 नवंबर, 2026",
    link: "https://svmcm.wb.gov.in",
  },
];

export function getScholarships(query = "") {
  if (!query) return SCHOLARSHIPS;
  const q = query.toLowerCase();
  return SCHOLARSHIPS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.eligibility.toLowerCase().includes(q),
  );
}
export default getScholarships;
