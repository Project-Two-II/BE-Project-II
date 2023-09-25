import React from 'react';
import { Link } from 'react-router-dom';

import './course.css'

const course_card_style = {
  // backgroundImage: "url('../media/cpplogo.png')",
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  color: "black"
}
const progress_bar_style = {
  border: "1px solid #1F2334",
  backgroundColor: "green",
  height: "5px",
  margin: "10px"
}
const style = {
  padding: "10px"
}
const CourseCard = ({ course, myCourses }) => {
  const routeTo = "/syllabus/" + course.id + `?title=${course.title}`
  const title = course.title
  // const enrolled = course.enrolled
  // console.log(myCourses)
  return (
    <div className="course-card" style={course_card_style}>
      <h2 style={style}>{course.code_no}</h2>

      <Link to={routeTo}>
        <h3 style={style}>{course.title}</h3>
      </Link>
      {/* { myCourses.includes(course.id) && (
        <Link to={`/syllabus/${course.id}/enroll`}>
          <button>Enroll</button>
        </Link>)
      } */}
      <hr className="progressBar" style={progress_bar_style}></hr>
    </div>
  );
};

export default CourseCard;
