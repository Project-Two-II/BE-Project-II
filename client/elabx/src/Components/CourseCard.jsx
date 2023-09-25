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

const CourseCard = ({ course }) => {
  const routeTo = "/syllabus/" + course.id + `?title=${course.title}`;
  const title = course.title;

const dummyImage = 'https://via.placeholder.com/150'; 
  return (
     <div className="course-card" style={{display:"flex"}}><div>
    <div> <img src={dummyImage} alt="Course Thumbnail" style={{ maxWidth: '70%',diaplay:"flex" }} /></div>
     <div className ="card-style" style={{dispaly:"flex"}}> <h2 style={style}>{course.title}</h2>
     <div><hr className="progressBar" style={progress_bar_style}></hr></div></div>
     </div> <Link to={routeTo}> 
       <div>  <h3 style={style}>{course.code_no}</h3></div>
          </Link>
         
            </div>
  );
};

export default CourseCard;
