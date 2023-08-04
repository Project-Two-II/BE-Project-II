import React, { useState } from 'react';
import './TeacherCourseDetails.css';
import CreateTest from './CreateTest';
import AddQuestion from './AddQuestion';

const QuestionDetails = ({ question }) => {
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Add state for selected question description

  const handleAddTest = () => {
    setShowCreateTest(true);
    setShowAddQuestion(false);
  };

  const handleEditQuestions = () => {
    setShowCreateTest(false);
    setShowAddQuestion(true);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="button-container">
        <button onClick={handleAddTest}>Add Test</button>
        <button onClick={handleEditQuestions}>Edit</button>
      </div>
      <p>{selectedQuestion}this is description of question</p> {/* Show selected question description */}
      {showCreateTest && (
        <CreateTest />
      )}
      {showAddQuestion && (
        <AddQuestion />
      )}
    </div>
  );
};

export default QuestionDetails;
