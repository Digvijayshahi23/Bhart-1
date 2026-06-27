/**
 * recommendationEngine.js
 * Generates personalized module recommendations based on profile fields.
 */
export function getRecommendations(profile = {}) {
  const recs = [];

  if (profile.isFarmer || profile.occupation === "farmer") {
    recs.push({
      id: "rec_farmer_1",
      title: "पीएम किसान सम्मान निधि (PM Kisan)",
      desc: "₹6,000 वार्षिक सहायता — किसान परिवारों के लिए पात्रता जांचें।",
      module: "schemes",
      to: "/schemes",
      tag: "Government",
    });
    recs.push({
      id: "rec_farmer_2",
      title: "फसल बीमा योजना (PMFBY)",
      desc: "न्यूनतम प्रीमियम पर फसल नुकसान से सुरक्षा।",
      module: "finance",
      to: "/finance",
      tag: "Finance",
    });
  }

  if (profile.isStudent || profile.occupation === "student") {
    recs.push({
      id: "rec_student_1",
      title: "राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)",
      desc: "अल्पसंख्यक, SC/ST, OBC छात्रवृत्ति — अभी आवेदन करें।",
      module: "career",
      to: "/career",
      tag: "Career",
    });
  }

  if (profile.isBusiness || profile.occupation === "business") {
    recs.push({
      id: "rec_biz_1",
      title: "मुद्रा लोन योजना (Mudra Loan)",
      desc: "लघु व्यवसाय के लिए ₹10 लाख तक ऋण सहायता।",
      module: "finance",
      to: "/finance",
      tag: "Finance",
    });
  }

  // Universal recommendations always added
  recs.push({
    id: "rec_health_1",
    title: "आयुष्मान भारत — पात्रता जांच",
    desc: "₹5 लाख तक स्वास्थ्य बीमा कवरेज — निःशुल्क जांच करें।",
    module: "healthcare",
    to: "/healthcare",
    tag: "Healthcare",
  });

  recs.push({
    id: "rec_legal_1",
    title: "उपभोक्ता अधिकार जागरूकता",
    desc: "ऑनलाइन शॉपिंग धोखाधड़ी और वारंटी नियम जानें।",
    module: "legal",
    to: "/legal",
    tag: "Legal",
  });

  recs.push({
    id: "rec_finance_1",
    title: "बजट योजना शुरू करें (Start Budget Plan)",
    desc: "अपनी मासिक आय और खर्च का ट्रैक रखें।",
    module: "finance",
    to: "/finance",
    tag: "Finance",
  });

  return recs;
}
