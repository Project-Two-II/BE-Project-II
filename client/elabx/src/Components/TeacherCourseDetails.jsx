import React, { useState } from 'react';
import AddStudent from '../Components/AddStudent'
import CreateChapter from '../Components/CreateChapter'
import './TeacherCourseDetails.css';

const TeacherCourseDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showCreateChapter, setShowCreateChapter] = useState(false);

  const fetchCourseDetails = () => {
    const courseDetails = {
      courseName: 'Programing in C',
      courseCode: 'CMP101',
      students: ['John Doe', 'Jane Smith', 'Michael Johnson'],
      chapters: ['Introduction', 'Structure Programming Language', 'Function', 'Structure'],
    };
    return courseDetails;
  };

  const handleViewDetails = () => {
    setShowDetails(true);
    setShowAddStudent(false);
    setShowCreateChapter(false);
  };

  const handleAddStudent = () => {
    setShowDetails(false);
    setShowAddStudent(true);
    setShowCreateChapter(false);
  };

  const handleCreateChapter = () => {
    setShowDetails(false);
    setShowAddStudent(false);
    setShowCreateChapter(true);
  };

  const courseDetails = fetchCourseDetails();

  return (
    <div className="page-container">
      <h2>{courseDetails.courseName} - {courseDetails.courseCode}</h2>
      <div className="button-container">
        <button onClick={handleViewDetails}>View Details</button>
        <button onClick={handleAddStudent}>Add Student</button>
        <button onClick={handleCreateChapter}>Add Chapter</button>
      </div>
      {showDetails && (
        <div className="details-container">
          <h3>Course Details</h3>
          <p>Course Name: {courseDetails.courseName}</p>
          <p>Course Code: {courseDetails.courseCode}</p>
          <p>Number of Students: {courseDetails.students.length}</p>
          <p>Number of Chapters: {courseDetails.chapters.length}</p>
        </div>
      )}
      
      <div className="view-chapter-container">
        <h3>Chapter Name</h3>
        <ul>
          {courseDetails.chapters.map((chapter, index) => (
            <li key={index}>{chapter}</li>
          ))}
        </ul>
      </div>

      {showAddStudent && (
        <AddStudent/>
      )}

      {showCreateChapter && (
        <CreateChapter/>
      )}

      <div className="edit-button-container">
        <button className="edit-button">Edit</button>
      </div>
    </div>
  );
};

export default TeacherCourseDetails;
