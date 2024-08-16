// Sample Data
const courseInfo = {
    id: 1,
    name: "JavaScript Fundamentals"
  };
  
  const assignmentGroup = {
    id: 1,
    name: "Assignments",
    course_id: 1,
    group_weight: 40,
    assignments: [
      { id: 1, name: "Quiz 1", due_at: "2024-08-16", points_possible: 100 },
      { id: 2, name: "Project", due_at: "2024-08-23", points_possible: 200 }
    ]
  };
  
  const learnerSubmissions = [
    { learner_id: 1, assignment_id: 1, submission: { submitted_at: "2024-08-15", score: 90 } },
    { learner_id: 1, assignment_id: 2, submission: { submitted_at: "2024-08-22", score: 180 } }
  ];
  
  