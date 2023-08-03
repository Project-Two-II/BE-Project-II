import React, { useState } from 'react';
import './TeacherCourseDetails.css';
import AddQuestion from '../Components/AddQuestion';
import QuestionDetails from '../Components/QuestionDetails';

const ChapterDetails = () => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showEditChapter, setShowEditChapter] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const fetchChapterDetails = () => {
    const chapterDetails = {
      chapterName: '1.Introduction',
      chapterDescription: 'This chapter provides an introduction to the topic.',
      questions: ['Print Hello World', 'Print two numbers', 'Print any string'],
    };
    return chapterDetails;
  };

  const handleAddQuestion = () => {
    setShowAddQuestion(true);
    setShowEditChapter(false);
  };

  const handleEditChapter = () => {
    setShowAddQuestion(false);
    setShowEditChapter(true);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const chapterDetails = fetchChapterDetails();

  return (
    <div className="chapter-container">
      <h2>{chapterDetails.chapterName}</h2>
      <p>{chapterDetails.chapterDescription}</p>
      <div className="button-container">
        <button onClick={handleAddQuestion}>Add Question</button>
        <button onClick={handleEditChapter}>Edit</button>
      </div>
      <div className="view-question-container">
        <ul>
          {chapterDetails.questions.map((question, index) => (
            <li key={index} onClick={() => handleQuestionClick(question)}>
              {question}
            </li>
          ))}
        </ul>
        {selectedQuestion && <QuestionDetails question={selectedQuestion} />}
        {showAddQuestion && <AddQuestion />}
      </div>
    </div>
  );
};

export default ChapterDetails;
