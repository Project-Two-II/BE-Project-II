import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'What is a variable in programming?',
    code: 'const variableName = 42;',
    status: 'Completed',
    marks: 10,
    comment: 'Good explanation of variables.',
  },
  {
    id: 2,
    text: 'Explain the concept of functions.',
    code: 'function functionName() {\n  // Function code here\n}',
    status: 'Incomplete',
    marks: null,
    comment: 'Please provide more details about functions.',
  },
  {
    id: 3,
    text: 'How do you declare an array?',
    code: 'const myArray = [1, 2, 3];',
    status: 'Completed',
    marks: 8,
    comment: 'Correct array declaration.',
  },
  // Add more questions, status, marks, and comments as needed
];

function QuestionList() {
  const [selectedCode, setSelectedCode] = useState(null);

  const handleViewCode = (code) => {
    setSelectedCode(code);
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '20px auto',
    border: '1px solid #ccc',
  };

  const thTdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  };

  const headerStyle = {
    backgroundColor: '#f2f2f2',
  };

  return (
    <div>
      <h2>Chapter 1: Introduction To OOP</h2>
      <p>the description of the chapter goes here</p>
      <table style={tableStyle} className="question-table">
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...headerStyle }}>S.No</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Question</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Status</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Marks</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Comment </th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Code</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={question.id}>
              <td style={thTdStyle}>{index + 1}</td>
              <td style={thTdStyle}>{question.text}</td>
              <td style={thTdStyle}>{question.status}</td>
              <td style={thTdStyle}>{question.marks}</td>
              <td style={thTdStyle}>{question.comment}</td>
              <td style={thTdStyle}>
                <button
                  className="view-button"
                  onClick={() => handleViewCode(question.code)}
                >
                  View Code
                </button>
                {selectedCode === question.code && (
                  <div>
                    <pre>{question.code}</pre>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionList;
