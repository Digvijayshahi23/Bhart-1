export const CATEGORIES = [
  "Students",
  "Women",
  "Senior Citizens",
  "Agriculture",
  "Employment",
  "Housing",
  "Healthcare",
  "MSME",
  "Disabled",
  "Financial Inclusion",
];

export const STATES = [
  "Delhi",
  "Bihar",
  "Maharashtra",
  "Uttar Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "West Bengal",
  "Rajasthan",
  "Gujarat",
  "Punjab",
];

// Generate 25 Government Services
export const SERVICES = [
  {
    id: "aadhaar",
    title: "आधार कार्ड (Aadhaar Card)",
    desc: "भारतीय विशिष्ट पहचान प्राधिकरण (UIDAI) द्वारा जारी बायोमेट्रिक पहचान पत्र।",
    category: "Identity",
    eligibility: "भारत का प्रत्येक नागरिक। (Every Indian citizen)",
    documents: [
      "पहचान का प्रमाण (Aadhaar/Voter ID)",
      "पते का प्रमाण (Utility Bill/Rent Agreement)",
      "जन्म तिथि प्रमाण (Birth Certificate/10th Marksheet)",
    ],
    steps: [
      "नजदीकी आधार नामांकन केंद्र पर जाएं।",
      "नामांकन फॉर्म भरें और सहायक दस्तावेज़ संलग्न करें।",
      "बायोमेट्रिक डेटा (फिंगरप्रिंट और आईरिस स्कैन) प्रदान करें।",
      "पावती पर्ची (Acknowledgement slip) प्राप्त करें।",
    ],
    timeline: "15-30 कार्य दिवस (Working Days)",
    faq: [
      {
        q: "क्या मैं पते को ऑनलाइन बदल सकता हूँ?",
        a: "हाँ, UIDAI के आधिकारिक स्वयं सेवा अपडेट पोर्टल पर।",
      },
      {
        q: "आधार नामांकन शुल्क क्या है?",
        a: "नया नामांकन बिल्कुल निःशुल्क है।",
      },
    ],
  },
  {
    id: "pan",
    title: "पैन कार्ड (PAN Card)",
    desc: "आयकर विभाग द्वारा जारी स्थायी खाता संख्या पत्रक।",
    category: "Finance",
    eligibility: "करदाता, व्यक्तिगत नागरिक एवं व्यावसायिक संस्थाएं।",
    documents: [
      "पहचान का प्रमाण (Aadhaar Card/Voter ID)",
      "पते का प्रमाण (Utility Bill/Rent Agreement)",
      "जन्म तिथि प्रमाण (Birth Certificate)",
    ],
    steps: [
      "NSDL/UTIITSL पोर्टल पर ऑनलाइन आवेदन करें।",
      "फॉर्म 49A भरें और दस्तावेज़ अपलोड करें।",
      "आवेदन शुल्क का ऑनलाइन भुगतान करें।",
      "फिजिकल कार्ड डाक द्वारा पते पर प्राप्त होगा।",
    ],
    timeline: "7-10 कार्य दिवस (Working Days)",
    faq: [
      {
        q: "क्या आधार-पैन लिंकिंग अनिवार्य है?",
        a: "हाँ, आयकर नियमों के अनुसार यह अनिवार्य है।",
      },
    ],
  },
  {
    id: "passport",
    title: "पासपोर्ट (Passport Services)",
    desc: "भारतीय नागरिकों के लिए अंतर्राष्ट्रीय यात्रा दस्तावेज़।",
    category: "Identity",
    eligibility: "भारत का प्रत्येक नागरिक।",
    documents: [
      "पहचान का प्रमाण (Aadhaar Card)",
      "पते का प्रमाण (Utility Bill/Bank Passbook)",
      "गैर-ईसीआर प्रमाण (10th pass certificate)",
    ],
    steps: [
      "पासपोर्ट सेवा पोर्टल पर पंजीकरण करें।",
      "ऑनलाइन आवेदन फॉर्म भरें और स्लॉट बुक करें।",
      "पासपोर्ट सेवा केंद्र (PSK) पर जाकर साक्षात्कार दें।",
      "पुलिस सत्यापन (Police verification) पूरा करें।",
    ],
    timeline: "15-20 कार्य दिवस (Working Days)",
    faq: [
      {
        q: "तत्काल पासपोर्ट में कितना समय लगता है?",
        a: "आमतौर पर 3 से 7 कार्य दिवस।",
      },
    ],
  },
  {
    id: "license",
    title: "ड्राइविंग लाइसेंस (Driving Licence)",
    desc: "वाहन चलाने का आधिकारिक प्रमाण पत्र।",
    category: "Identity",
    eligibility: "18 वर्ष या उससे अधिक आयु के नागरिक।",
    documents: [
      "लर्नर लाइसेंस (Learner's Licence)",
      "पते का प्रमाण (Aadhaar Card/Ration Card)",
      "आयु का प्रमाण (Birth Certificate)",
    ],
    steps: [
      "सारथी परिवहन पोर्टल पर ऑनलाइन आवेदन करें।",
      "ड्राइविंग टेस्ट के लिए स्लॉट बुक करें।",
      "संबंधित RTO पर ड्राइविंग टेस्ट पास करें।",
      "सफल टेस्ट के बाद लाइसेंस डाक से प्राप्त करें।",
    ],
    timeline: "15 कार्य दिवस",
    faq: [
      {
        q: "लर्नर लाइसेंस की वैधता क्या है?",
        a: "यह 6 महीने के लिए वैध होता है।",
      },
    ],
  },
  {
    id: "voter_id",
    title: "वोटर आईडी (Voter ID Card)",
    desc: "भारत निर्वाचन आयोग द्वारा जारी मतदाता पहचान पत्र।",
    category: "Identity",
    eligibility: "18 वर्ष या उससे अधिक आयु के नागरिक।",
    documents: ["पहचान पत्र", "पते का प्रमाण", "आयु प्रमाण पत्र"],
    steps: [
      "NVSP पोर्टल पर पंजीकरण करें।",
      "फॉर्म 6 भरें और आवश्यक दस्तावेज़ संलग्न करें।",
      "बूथ स्तर के अधिकारी (BLO) द्वारा भौतिक सत्यापन।",
      "सफल सत्यापन पर डाक से कार्ड प्राप्त करें।",
    ],
    timeline: "20-30 कार्य दिवस",
    faq: [
      {
        q: "क्या मैं वोटर आईडी ऑनलाइन सुधार सकता हूँ?",
        a: "हाँ, NVSP पर फॉर्म 8 भरकर।",
      },
    ],
  },
  // Add another 20 government services as list tags for seed validation
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `service_${i + 6}`,
    title: [
      "जन्म प्रमाण पत्र (Birth Certificate)",
      "आय प्रमाण पत्र (Income Certificate)",
      "मूल निवास प्रमाण पत्र (Domicile Certificate)",
      "जाति प्रमाण पत्र (Caste Certificate)",
      "राशन कार्ड (Ration Card)",
      "आयुष्मान भारत पंजीकरण (Ayushman Bharat)",
      "पीएम किसान पंजीकरण (PM Kisan Registration)",
      "डिजीलॉकर सिंक (DigiLocker Setup)",
      "उद्यम पंजीकरण (UDYAM Registration)",
      "ई-श्रम कार्ड (e-Shram Card)",
      "विवाह प्रमाण पत्र (Marriage Certificate)",
      "मृत्यु प्रमाण पत्र (Death Certificate)",
      "भूमि नक्शा खसरा खतौनी (Land Records)",
      "पेंशन दावा (Pension Claim)",
      "छात्रवृत्ति दावा (Scholarship Application)",
      "किसान क्रेडिट कार्ड (KCC)",
      "पानी कनेक्शन (Water Connection)",
      "बिजली नया कनेक्शन (Electricity Connection)",
      "व्यापार लाइसेंस (Trade License)",
      "अग्निशमन प्रमाण पत्र (Fire NOC)",
    ][i % 20],
    desc: "भारतीय नागरिकों के लिए सुव्यवस्थित सरकारी दस्तावेज जारी करने की प्रक्रिया।",
    category: "Welfare",
    eligibility: "पात्रता नियमों के अनुसार संबंधित राज्य के नागरिक।",
    documents: ["आधार कार्ड", "पहचान पत्र", "स्व-घोषणा पत्र"],
    steps: [
      "आधिकारिक राज्य पोर्टल पर लॉग इन करें।",
      "पंजीकरण विवरण भरें।",
      "शुल्क का भुगतान करें और आवेदन जमा करें।",
    ],
    timeline: "10-15 कार्य दिवस",
    faq: [
      {
        q: "आवेदन शुल्क क्या है?",
        a: "यह अलग-अलग राज्यों में भिन्न हो सकता है।",
      },
    ],
  })),
];

// Generate 50 Government Schemes
export const SCHEMES = Array.from({ length: 50 }).map((_, i) => {
  const categories = CATEGORIES;
  const states = STATES;
  const category = categories[i % categories.length];
  const state = i % 2 === 0 ? "Central" : states[i % states.length];

  const titles = [
    "प्रधानमंत्री किसान सम्मान निधि (PM Kisan)",
    "आयुष्मान भारत जन आरोग्य योजना (PM-JAY)",
    "प्रधानमंत्री आवास योजना (PMAY)",
    "अटल पेंशन योजना (APY)",
    "सुकन्या समृद्धि योजना (SSY)",
    "पोस्ट मैट्रिक छात्रवृत्ति योजना (Post Matric Scholarship)",
    "प्रधानमंत्री मुद्रा योजना (MUDRA Loan)",
    "स्टैंडअप इंडिया योजना (Stand Up India)",
    "लाडली बहना योजना (Ladli Behna)",
    "प्रधानमंत्री जन धन योजना (PMJDY)",
  ];

  const title = `${titles[i % titles.length]} - बैच #${i + 1}`;

  return {
    id: `scheme_${i + 1}`,
    title,
    category,
    state,
    desc: `नागरिकों को वित्तीय सहायता, सामाजिक सुरक्षा और विकास के अवसर प्रदान करने के लिए एक कल्याणकारी सरकारी योजना। (Gov scheme for citizen development)`,
    target: `पात्र ${category} नागरिक`,
    eligibilityRules: {
      minAge: i % 3 === 0 ? 18 : 60,
      maxAge: 85,
      incomeMax: i % 2 === 0 ? 300000 : 800000,
      farmerOnly: i % 5 === 0,
      studentOnly: i % 4 === 0,
    },
    documentsRequired: ["आधार कार्ड", "बैंक पासबुक", "आय प्रमाण पत्र"],
  };
});
