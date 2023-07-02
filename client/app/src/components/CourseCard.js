import React from 'react';
import '../style.css'
const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h2>{course.code}</h2>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseCard;
