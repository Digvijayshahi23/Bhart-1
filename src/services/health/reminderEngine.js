/**
 * Manages daily calendar parameters and schedules.
 */
export function getUpcomingReminders() {
  return [
    {
      id: 1,
      name: "Pantoprazole 40mg",
      time: "सुबह 08:00 बजे",
      instructions: "खाली पेट (Empty stomach)",
      completed: false,
    },
    {
      id: 2,
      name: "Paracetamol 650mg",
      time: "दोपहर 02:00 बजे",
      instructions: "भोजन के बाद (Post meals)",
      completed: false,
    },
    {
      id: 3,
      name: "Metformin 500mg",
      time: "रात 08:30 बजे",
      instructions: "भोजन के साथ (With meals)",
      completed: false,
    },
  ];
}
export default getUpcomingReminders;
