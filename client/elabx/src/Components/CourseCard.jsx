import React from 'react';
import './course.css'

const course_card_style = {
  // backgroundImage: "url('../media/cpplogo.png')",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "20px"
}
const progress_bar_style = {
  border: "1px solid #1F2334",
  backgroundColor: "green",
  height: "5px",
  margin: "10px"
}
const style={
  padding: "10px"
}
const CourseCard = ({ course }) => {
  return (
      <div className="course-card" style={course_card_style}>
        <h2 style={style}>{course.code_no}</h2>
        <h3 style={style}>{course.title}</h3>
        <hr className="progressBar" style={progress_bar_style}></hr>
      </div>
  );
};

export default CourseCard;
