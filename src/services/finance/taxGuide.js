export const TAX_SLABS = [
  { income: "₹0 - ₹3,000,000", rate: "0% (Nil)" },
  { income: "₹3,000,001 - ₹700,000", rate: "5%" },
  { income: "₹700,001 - ₹1,000,000", rate: "10%" },
  { income: "₹1,000,001 - ₹1,200,000", rate: "15%" },
  { income: "₹1,200,001 - ₹1,500,000", rate: "20%" },
  { income: "Above ₹1,500,000", rate: "30%" },
];

export function getTaxTopics() {
  return [
    {
      title: "पैन कार्ड (PAN Card)",
      desc: "10-अंकीय अल्फ़ान्यूमेरिक पहचान पत्र, जो सभी वित्तीय और बैंक लेनदेन के लिए आवश्यक है।",
    },
    {
      title: "जीएसटी बेसिक्स (GST Basics)",
      desc: "वस्तु एवं सेवा कर (Goods and Services Tax), जो पूरे देश में वस्तुओं और सेवाओं की आपूर्ति पर लगाया जाने वाला एकल अप्रत्यक्ष कर है।",
    },
    {
      title: "आईटीआर (Income Tax Return)",
      desc: "आयकर विभाग को अपनी वार्षिक आय और भुगतान किए गए करों की घोषणा करने का आधिकारिक विवरणी फॉर्म।",
    },
  ];
}
export default getTaxTopics;
