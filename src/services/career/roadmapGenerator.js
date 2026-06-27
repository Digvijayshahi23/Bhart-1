/**
 * Generates structured study guides and certifications roadmaps.
 */
export function generateRoadmap(education, targetRole) {
  return {
    role: targetRole,
    education,
    timeline: "6 महीने (6 Months)",
    milestones: [
      {
        title: "चरण 1: मुख्य बुनियादी सिद्धांत (Core Fundamentals)",
        duration: "महीना 1-2",
        details: `${targetRole} के लिए आवश्यक तकनीकी/व्यावसायिक बुनियादी सिद्धांतों को समझें।`,
        courses: ["Introduction to IT/Tech Basics", "Programming Fundamentals"],
      },
      {
        title: "चरण 2: व्यावहारिक परियोजनाएं (Hands-on Projects)",
        duration: "महीना 3-4",
        details:
          "लाइब्रेरीज़ और डेटाबेस टूल्स का उपयोग करके 2 व्यावहारिक प्रोजेक्ट बनाएं।",
        courses: ["React & Web App Development", "SQL Database Design"],
      },
      {
        title: "चरण 3: साक्षात्कार तैयारी (Interview Prep & Job Placement)",
        duration: "महीना 5-6",
        details:
          "रिज्यूमे का नवीनीकरण करें, मॉक टेस्ट पास करें और जॉब्स में आवेदन करना प्रारंभ करें।",
        courses: [
          "Interview Prep with AI",
          "Google Project Management Certificate",
        ],
      },
    ],
    certifications: [
      "Google Project Management Certificate",
      "AWS Cloud Practitioner Certificate",
    ],
  };
}
export default generateRoadmap;
