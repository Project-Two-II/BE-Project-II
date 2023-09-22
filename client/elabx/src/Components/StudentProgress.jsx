import React, { useState, useEffect } from 'react';

function StudentProgressTable() {
  const [students, setStudents] = useState([
    { name: 'ram', email: 'ram@example.com', progress: 75 },
    { name: 'shyam', email: 'shyam@example.com', progress: 90 },
    { name: 'hari', email: 'hari@example.com', progress: 50 },
    { name: 'geeta', email: 'geeta@example.com', progress: 85 },
    { name: 'rita', email: 'rita@example.com', progress: 60 },
  ]);


  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Progress</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Progress</th>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Submission</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.email} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>
                <progress value={student.progress} max="100">{student.progress}%</progress>
              </td>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>
                <button style={{ backgroundColor: '#1E293B', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentProgressTable;