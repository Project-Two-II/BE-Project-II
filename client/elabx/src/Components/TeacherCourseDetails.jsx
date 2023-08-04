import React, { useState } from 'react';
import AddStudent from '../Components/AddStudent'
import CreateChapter from '../Components/CreateChapter'
import CreateCourse from '../Components/CreateCourse'
import './TeacherCourseDetails.css';

const TeacherCourseDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showCreateChapter, setShowCreateChapter] = useState(false);
  const [showCreateCourse, setShowCreateCourse] = useState(false);


  const fetchCourseDetails = () => {
    const courseDetails = {
      courseName: 'Programing in C',
      CourseDescription: 'This  provides an Description of course.',
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
    setShowCreateCourse(false)
  };

  const handleAddStudent = () => {
    setShowDetails(false);
    setShowAddStudent(true);
    setShowCreateChapter(false);
    setShowCreateCourse(false)

  };

  const handleCreateChapter = () => {
    setShowDetails(false);
    setShowAddStudent(false);
    setShowCreateCourse(false)
    setShowCreateChapter(true);
  };

  const handleEditClick = () => {
    setShowDetails(false);
    setShowAddStudent(false);
    setShowCreateChapter(false);
    setShowCreateCourse(true)
  }

  const courseDetails = fetchCourseDetails();

  return (
    <div className="page-container">
      <h2>{courseDetails.courseName} - {courseDetails.courseCode}</h2>
      <div className="button-container">
        <button onClick={handleViewDetails}>course Details</button>
        <button onClick={handleAddStudent}>Add Student</button>
        <button onClick={handleCreateChapter}>Add Chapter</button>
        <button onClick={handleCreateChapter}>Student Details</button>
        <button className="edit-button" onClick={handleEditClick}>Edit</button>

      </div>
      {showDetails && (
        <div className="details-container">
          <p>Course Name: {courseDetails.courseName}</p>
          <p>course Description: {courseDetails.CourseDescription}</p>
          <p>Course Code: {courseDetails.courseCode}</p>
          <p>Number of Students: {courseDetails.students.length}</p>
          <p>Number of Chapters: {courseDetails.chapters.length}</p>
          
        </div>
      )}
      
      <div className="view-chapter-container">
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

      {showCreateCourse && (
        <CreateCourse/>
      )}
    </div>
  );
};

export default TeacherCourseDetails;
