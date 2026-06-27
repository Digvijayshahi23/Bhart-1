/**
 * Compares current skillsets to industry targets to compile gap checklists.
 */
export function analyzeSkills(currentSkills, targetRole) {
  const allSkills = {
    "Frontend Developer": [
      "HTML/CSS",
      "JavaScript",
      "React",
      "Git",
      "Tailwind CSS",
    ],
    "Software Engineer": [
      "Python/Java",
      "Data Structures",
      "Algorithms",
      "SQL",
      "Git",
    ],
    "Data Analyst": [
      "Python/R",
      "Excel",
      "SQL",
      "Tableau/PowerBI",
      "Statistics",
    ],
  };

  const required = allSkills[targetRole] || [
    "JavaScript",
    "SQL",
    "Git",
    "Communication",
  ];
  const currentArray = currentSkills
    .split(",")
    .map((s) => s.trim().toLowerCase());
  const gaps = required.filter((s) => !currentArray.includes(s.toLowerCase()));

  return {
    role: targetRole,
    requiredSkills: required,
    missingSkills: gaps,
    gapPercentage: Math.floor((gaps.length / required.length) * 100),
  };
}
export default analyzeSkills;
