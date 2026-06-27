/**
 * Returns basic parameters for medical, life and crop insurance.
 */
export function getInsuranceInfo(category) {
  const policies = {
    "Crop Insurance": {
      title: "फसल बीमा योजना (PM Fasal Bima Yojana)",
      desc: "प्राकृतिक आपदाओं, कीटों और बीमारियों के कारण फसल के नुकसान के लिए किसानों को न्यूनतम प्रीमियम पर व्यापक वित्तीय सुरक्षा प्रदान करता है।",
    },
    "Health Insurance": {
      title: "स्वास्थ्य बीमा (Health Insurance Basics)",
      desc: "चिकित्सा आपातकाल, अस्पताल में भर्ती होने और गंभीर बीमारियों के इलाज के भारी-भरकम खर्चों को कवर करने वाली पॉलिसी।",
    },
    "Life Insurance": {
      title: "जीवन बीमा (Life Insurance Basics)",
      desc: "पॉलिसीधारक की मृत्यु की स्थिति में नामांकित परिवार को वित्तीय सुरक्षा और बीमित राशि का एकमुश्त भुगतान।",
    },
  };

  return policies[category] || policies["Crop Insurance"];
}
export default getInsuranceInfo;
