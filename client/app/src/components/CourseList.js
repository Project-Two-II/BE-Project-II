import React from 'react';
import CourseCard from './CourseCard';
import '../style.css'

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      {courses.map((course) => (
        <CourseCard key={course.code} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
