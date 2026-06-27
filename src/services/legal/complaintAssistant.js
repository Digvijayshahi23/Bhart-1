/**
 * Structuring educational timelines for consumer and cybercrime dispute resolution.
 */
export function getComplaintFlow(type) {
  const flows = {
    "Consumer Complaint": {
      title: "उपभोक्ता शिकायत गाइड (Consumer Complaint Guide)",
      reqDocs: [
        "खरीद का मूल बिल/रसीद (Invoice/Receipt)",
        "दोषपूर्ण उत्पाद की तस्वीर/वीडियो",
        "कंपनी की कस्टमर केयर को भेजा गया लिखित मेल",
      ],
      steps: [
        "संबंधित कंपनी के कस्टमर केयर को लिखित शिकायत भेजकर 15 दिन प्रतीक्षा करें।",
        "यदि समाधान न मिले, तो राष्ट्रीय उपभोक्ता हेल्पलाइन (NCH) पर ऑनलाइन पंजीकरण करें।",
        "अंतिम चरण के रूप में जिला उपभोक्ता फोरम (e-Daakhil) पर मामला दर्ज करें।",
      ],
      officialLink: "https://consumerhelpline.gov.in",
    },
    "Cyber Complaint": {
      title: "साइबर धोखाधड़ी शिकायत गाइड (Cybercrime Report Guide)",
      reqDocs: [
        "बैंक खाता विवरण/स्टेटमेंट (Bank Statement)",
        "धोखाधड़ी यूपीआई स्क्रीनशॉट/एसएमएस",
        "धोखाधड़ी करने वाले का मोबाइल नंबर/ईमेल आईडी",
      ],
      steps: [
        "धोखाधड़ी के तुरंत बाद हेल्पलाइन नंबर 1930 पर कॉल कर शिकायत दर्ज करें।",
        "आधिकारिक राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (cybercrime.gov.in) पर जाएँ।",
        "संबंधित बैंक में जाकर धोखाधड़ी वाली ट्रांजैक्शन की चार्जबैक शिकायत दर्ज कराएं।",
      ],
      officialLink: "https://cybercrime.gov.in",
    },
  };

  return flows[type] || flows["Consumer Complaint"];
}
export default getComplaintFlow;
