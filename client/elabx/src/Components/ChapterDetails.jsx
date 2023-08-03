import React, { useState } from 'react';
import './TeacherCourseDetails.css';
import AddQuestion from '../Components/AddQuestion'

const ChapterDetails = () => {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showEditChapter, setShowEditChapter] = useState(false);

  const fetchChapterDetails = () => {
    const chapterDetails = {
      chapterName: '1.Introduction',
      questions: ['Print Hello World', 'Print two numbers', 'Print any string '],
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

  const chapterDetails = fetchChapterDetails();

  return (
    <div className="chapter-container">
      <h2>{chapterDetails.chapterName}</h2>
      <div className="button-container">
        <button onClick={handleAddQuestion}>Add Question</button>
        <button onClick={handleEditChapter}>Edit Question</button>
      </div>
      <div className="view-question-container">
        <ul>
          {chapterDetails.questions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
        {showAddQuestion && (
        <AddQuestion/>
      )}
      </div>
    </div>
  );
};

export default ChapterDetails;
