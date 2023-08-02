
import React, { useState, useEffect } from 'react';
import './Create.css';

const CreateSubject = () => {
  const [subject, setSubject] = useState('C');
  const [subjects, setSubjects] = useState([{ id: 1, name: '', description: '' }]);

  useEffect(() => {
    if (subjects.length === 0) {
      setSubjects([{ id: 1, name: '', description: '' }]);
    }
  }, [subjects]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSubjectNameChange = (index, e) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = e.target.value;
    setSubjects(newSubjects);
  };

  const handleSubjectDescriptionChange = (index, e) => {
    const newSubjects = [...subjects];
    newSubjects[index].description = e.target.value;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    const newSubjects = [...subjects];
    const newId = newSubjects.length + 1;
    newSubjects.push({ id: newId, name: '', description: '' });
    setSubjects(newSubjects);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(`Are you sure you want to create the subjects for: ${subject}?`);
    if (isConfirmed) {
      console.log(`Submitted Subject: ${subject}`);
      console.log('Submitted Subjects:');
      subjects.forEach((subject) => {
        console.log(`Subject ${subject.id} - Name: ${subject.name}, Description: ${subject.description}`);
      });

      setSubjects([{ id: 1, name: '', description: '' }]);
    }
  };

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

        {subjects.map((subject, index) => (
          <div key={subject.id} className="subjectGroup">
            <div className="inputGroup">
              <label htmlFor={`subjectName${subject.id}`}>Subject Name:</label>
              <input
                name={`subjectName${subject.id}`}
                id={`subjectName${subject.id}`}
                value={subject.name}
                onChange={(e) => handleSubjectNameChange(index, e)}
                required
                placeholder="Enter Subject Name"
              />
            </div>

            <div className="inputGroup">
              <label htmlFor={`subjectDescription${subject.id}`}>Subject Description:</label>
              <textarea
                name={`subjectDescription${subject.id}`}
                id={`subjectDescription${subject.id}`}
                value={subject.description}
                onChange={(e) => handleSubjectDescriptionChange(index, e)}
                required
                placeholder="Enter Subject Description"
              />
            </div>
          </div>
        ))}

        <div className="buttonGroup">
          <button className="btn createBtn" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubject;
