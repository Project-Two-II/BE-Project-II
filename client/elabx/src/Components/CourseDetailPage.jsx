import React, { useState } from 'react';
import Header from './header';
import './CourseDetailsPage.css';

// Define sample chapters with descriptions and questions
const chapters = [
  {
    id: 1,
    title: 'Introduction to C',
    description: 'This chapter covers the basics of C programming language.',
    questions: ['Question 1', 'Question 2'],
  },
  {
    id: 2,
    title: 'Functions',
    description: 'Learn about functions in C and how to use them.',
    questions: ['Question 3', 'Question 4'],
  },
  // Add more chapters here
];

const Dashboard = () => {
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleChapterClick = (chapterId) => {
    const chapter = chapters.find((c) => c.id === chapterId);
    setSelectedChapter(chapter);
  };

  return (
    <>
      <Header SearchBar={false} />
      <div className="main-body">
        <div id="sidebar">
          <h1>ELabX Chapter</h1>
          <div>
            
            <ul>
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter.id)}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                  {chapter.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div id="detail">
          {selectedChapter ? (
            <>
              <h2>{selectedChapter.title}</h2>
              <p>{selectedChapter.description}</p>
              <h3>Questions</h3>
              <ul>
                {selectedChapter.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Select a chapter to see details.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
