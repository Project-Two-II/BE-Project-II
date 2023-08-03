import React, { useState } from 'react';
import './TeacherCourseDetails.css';
import CreateTest from './CreateTest';

const QuestionDetails = ({ question }) => {
  const [showCreateTest, setShowCreateTest] = useState(false);
  const [showEditQuestions, setShowEditQuestions] = useState(false);

  const handleAddTest = () => {
    setShowCreateTest(true);
    setShowEditQuestions(false);
  };

  const handleEditQuestions = () => {
    setShowCreateTest(false);
    setShowEditQuestions(true);
  };

  return (
    <div className="question-container">
      <h2>{question}</h2>
      <div className="button-container">
        <button onClick={handleAddTest}>Add Test</button>
        <button onClick={handleEditQuestions}>Edit</button>
      </div>
      {showCreateTest && (
        <CreateTest />
      )}
    </div>
  );
};

export default QuestionDetails;