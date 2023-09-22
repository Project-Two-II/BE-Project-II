import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

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
    navigate("/syllabus/1/")
  }

  return (
    <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
      <div className="inputGroup">
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
