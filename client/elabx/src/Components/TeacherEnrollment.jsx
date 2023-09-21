import React, { useState } from 'react';

function TeacherEnrollmentDialogBox() {
  const [enrollmentKey, setEnrollmentKey] = useState('');
  const [enrollmentSuccessful, setEnrollmentSuccessful] = useState(false);

  const handleEnrollment = () => {
    setEnrollmentSuccessful(true);
  };

  return (
    <div style={{ backgroundColor: '#1E293B', color: 'white', padding: '20px', width: '400px', margin: 'auto', textAlign: 'center' }}>
      <h1>Enrollment Key </h1>
      <input type="text" style={{ border: 'none', backgroundColor: '#2F3E54', color: 'white', padding: '10px', marginBottom: '20px' }} value={enrollmentKey} onChange={(e) => setEnrollmentKey(e.target.value)} />
      <br />
      <br />
      <button style={{ backgroundColor: 'white', color: '#1E293B', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleEnrollment}>Add </button>
      {enrollmentSuccessful && <p>Enrollment Key Added Successfully!</p>}
    </div>
  );
}

export default TeacherEnrollmentDialogBox;