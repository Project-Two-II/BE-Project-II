import React from 'react';

const chapters = [
  { id: 1, subjectId: 1, name: 'Introduction to C Programming' },
  { id: 2, subjectId: 1, name: 'Data Types and Operators' },
  { id: 3, subjectId: 1, name: 'Control Structures' },
  { id: 4, subjectId: 1, name: 'Functions and Arrays' },
  { id: 5, subjectId: 1, name: 'Pointers and Strings' },
];

const tableStyle = {
  borderCollapse: 'collapse',
  width: '80%',
  margin: '20px auto',
};

const thTdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

const headerStyle = {
  backgroundColor: '#f2f2f2',
};

function ChapterList() {
  const handleViewRemarks = (chapterId) => {
    alert(`Viewing remarks for Chapter ${chapterId}`);
  };

  return (
    <div>
      <h1>C programming</h1>
      <p>This is descrition of C programming.</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...headerStyle }}>S.No</th>
            <th style={thTdStyle}>Chapter</th>
            <th style={thTdStyle}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter, index) => (
            <tr key={chapter.id}>
              <td style={thTdStyle}>{chapter.id}</td>
              <td style={thTdStyle}>{chapter.name}</td>
              <td style={thTdStyle}>
                <button
                  className="view-button"
                  onClick={() => handleViewRemarks(chapter.id)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChapterList;
