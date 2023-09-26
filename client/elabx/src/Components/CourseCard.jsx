import React from 'react';
import { Link } from 'react-router-dom';

import './course.css'

const course_card_style = {
  backgroundColor: "#ffffff",
  borderRadius: "5px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  color: "black",
  display:"flex"
};

const progress_bar_style = {
  border: "1px solid #1F2334",
  backgroundColor: "green",
  height: "5px",
  margin: "10px",
  marginBottom : "10px"
};

const style = {
  padding: "10px",
  display: "flex",
  gap:"20px"
};

const cardStyle = {
  display: "flex",
  flexDirection: "column"
}

const btnStyle = {
  // float: "center",
  width : "120px",
  padding: "10px",
  backgroundColor: "green",
  color: "white",
  margin: "5px",
  border: "none",
  borderRadius: "8px"
}

const CourseCard = ({ course }) => {
  const routeTo = "/syllabus/" + course.id + `?title=${course.title}`;
  const title = course.title;

  return (
     <div className="course-card" style={{display:"flex"}}>
      <img src={`http://localhost:8000/${course.thumbnail}`} alt="Course Thumbnail" style={{ height : '100px', Width: '200px',display:"flex" }} />
     <div style={cardStyle}>
      <h2 style={style}>{course.code_no}</h2>
      <hr className="progressBar" style={progress_bar_style}></hr>
      <Link to={routeTo}> 
       <h3 style={style}>{course.title}</h3>
      </Link> 
      <Link to={`/syllabus/${course.id}/enroll`}><button style={btnStyle}>Enroll</button></Link>
     </div>
      
    </div>
  );
};

export default CourseCard;
