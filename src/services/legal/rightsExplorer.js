export const RIGHTS_DB = [
  {
    id: "consumer_1",
    category: "Consumer Rights",
    title: "ऑनलाइन शॉपिंग धोखाधड़ी (Online Shopping Fraud)",
    desc: "यदि कोई नकली उत्पाद प्राप्त होता है, तो उपभोक्ता संरक्षण अधिनियम 2019 के अंतर्गत रिफंड और उत्पाद बदलने का आपका अधिकार है।",
    actions: [
      "ऑर्डर पुष्टिकरण स्क्रीनशॉट सहेजें।",
      "सपोर्ट डेस्क को लिखित ईमेल शिकायत भेजें।",
      "समाधान न होने पर राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर कॉल करें।",
    ],
  },
  {
    id: "consumer_2",
    category: "Consumer Rights",
    title: "वारंटी और दोष (Product Warranty)",
    desc: "दोषपूर्ण उत्पाद को वारंटी अवधि के भीतर कंपनी द्वारा मुफ्त ठीक करना या बदलना अनिवार्य है।",
    actions: [
      "वारंटी कार्ड और मूल बिल पास रखें।",
      "सर्विस सेंटर में शिकायत दर्ज कर रसीद लें।",
    ],
  },
  {
    id: "cyber_1",
    category: "Cybercrime Guidance",
    title: "यूपीआई पेमेंट धोखाधड़ी (UPI Fraud)",
    desc: "UPI पिन केवल पैसे भेजने के लिए आवश्यक है, प्राप्त करने के लिए नहीं। किसी भी धोखाधड़ी पर 24 घंटे के भीतर बैंक को रिपोर्ट करें।",
    actions: [
      "धोखाधड़ी वाली यूपीआई ट्रांजैक्शन आईडी नोट करें।",
      "तत्काल साइबर क्राइम हेल्पलाइन 1930 पर संपर्क करें।",
      "cybercrime.gov.in पोर्टल पर शिकायत दर्ज करें।",
    ],
  },
  {
    id: "tenant_1",
    category: "Rental Agreements",
    title: "किरायेदार के मूल अधिकार (Tenant Rights)",
    desc: "बिना उचित नोटिस अवधि (आमतौर पर 1 महीना) के मकान मालिक आपको जबरन घर से बाहर नहीं निकाल सकते।",
    actions: [
      "लिखित रेंटल एग्रीमेंट पंजीकृत करवाएं।",
      "सिक्योरिटी डिपॉजिट वापसी की शर्तें स्पष्ट रखें।",
    ],
  },
  {
    id: "employment_1",
    category: "Employment Rights",
    title: "वेतन भुगतान नियम (Salary Payment)",
    desc: "कामगारों का वेतन तय तिथि तक मिलना चाहिए। भुगतान न होने पर लेबर कमिश्नर कार्यालय में शिकायत की जा सकती है।",
    actions: [
      "ऑफर लेटर और जॉइनिंग लेटर को सुरक्षित रखें।",
      "लेबर कोर्ट में आवेदन की प्रक्रिया जानें।",
    ],
  },
  {
    id: "women_1",
    category: "Women's Rights",
    title: "कार्यस्थल पर उत्पीड़न (Workplace Harassment)",
    desc: "पोश (POSH Act) के अंतर्गत प्रत्येक संस्था में आंतरिक शिकायत समिति (ICC) होना अनिवार्य है।",
    actions: [
      "ICC सेल में लिखित शिकायत दर्ज कराएं।",
      "राष्ट्रीय महिला आयोग (NCW) हेल्पलाइन 7827170170 पर संपर्क करें।",
    ],
  },
  {
    id: "senior_1",
    category: "Senior Citizen Rights",
    title: "माता-पिता भरण-पोषण (Maintenance Rights)",
    desc: "वरिष्ठ नागरिक अधिनियम के अनुसार, बच्चे माता-पिता के भरण-पोषण और गरिमापूर्ण जीवन सुनिश्चित करने के लिए कानूनी रूप से बाध्य हैं।",
    actions: [
      "एसडीएम (SDM) कोर्ट में भरण-पोषण का आवेदन करें।",
      "वरिष्ठ नागरिक हेल्पलाइन 14567 पर सहायता लें।",
    ],
  },
];

export function searchRights(query = "") {
  if (!query) return RIGHTS_DB;
  const q = query.toLowerCase();
  return RIGHTS_DB.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q),
  );
}
export default searchRights;
