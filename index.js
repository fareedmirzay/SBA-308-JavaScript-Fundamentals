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
  
  // Function to calculate learner data
  function getLearnerData(courseInfo, assignmentGroup, submissions) {
    const results = [];
    
    // Check if assignment group belongs to course
    if (assignmentGroup.course_id !== courseInfo.id) {
      throw new Error('Invalid assignment group course ID');
    }
  
    // Create a map for assignments with their details
    const assignmentMap = new Map();
    assignmentGroup.assignments.forEach(assignment => {
      if (assignment.points_possible <= 0) {
        throw new Error('Invalid points_possible value');
      }
      assignmentMap.set(assignment.id, assignment);
    });
  
    // Process submissions
    const learnerScores = new Map();
    
    submissions.forEach(submission => {
      const assignment = assignmentMap.get(submission.assignment_id);
      if (!assignment) {
        throw new Error('Assignment not found');
      }
      
      // Handle late submission
      const now = new Date();
      const dueDate = new Date(assignment.due_at);
      const submittedDate = new Date(submission.submission.submitted_at);
      
      let score = submission.submission.score;
      if (submittedDate > dueDate) {
        score -= (assignment.points_possible * 0.10);
      }
  
      // Calculate percentage
      const percentage = (score / assignment.points_possible) * 100;
      
      if (!learnerScores.has(submission.learner_id)) {
        learnerScores.set(submission.learner_id, { id: submission.learner_id, avg: 0, scores: {} });
      }
  
      const learnerData = learnerScores.get(submission.learner_id);
      learnerData.scores[assignment.id] = percentage;
    });
  
    // Compute averages
    learnerScores.forEach(learner => {
      let totalWeightedScore = 0;
      let totalWeight = 0;
  
      assignmentGroup.assignments.forEach(assignment => {
        if (learner.scores[assignment.id] !== undefined) {
          const weight = assignment.points_possible;
          totalWeightedScore += (learner.scores[assignment.id] / 100) * weight;
          totalWeight += weight;
        }
      });
  
      learner.avg = (totalWeightedScore / totalWeight) * 100;
      results.push(learner);
    });
  
    return results;
  }
  
  // Example Usage
  try {
    const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
  