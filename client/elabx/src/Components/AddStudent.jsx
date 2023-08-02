import React, { useState } from 'react';
import './Create.css';

const AddStudent = () => {
  const [subject, setSubject] = useState('c++');
  const [student, setStudent] = useState({ email: '' });

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  }

  const handleStudentChange = (e) => {
    const email = e.target.value;
    setStudent({ email });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the submitted test data
    console.log(`Submitted test: ${subject}, student: ${JSON.stringify(student)}`);
    // Clear the form
    setSubject('c++');
    setStudent({ email: '' });
    alert("Student added successfully!");
  }

  return (
    <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
      <div className="inputGroup">
  <label htmlFor="subject">Select Subject Name:</label>
</div>
<div className="inputGroup">
  <select name="subject" id="subject" value={subject} onChange={handleSubjectChange} required>
    <option value="">Select a subject</option>
    <option value="C">C</option>
    <option value="C++">C++</option>
  </select>
</div>


        <div className="inputGroup">
          <label htmlFor="studentEmail">Student Email:</label>
          <input name="studentEmail" id="studentEmail" value={student.email} onChange={handleStudentChange} required />
        </div>

        <button id="submit" className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;
