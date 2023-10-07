import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import './course.css'


const CourseCard = ({ course, showEnrollBtn }) => {

const imageUrl = `http://localhost:8000/${course.thumbnail}`

const progress_bar_style = {
  border: "1px solid #1F2334",
  backgroundColor: "green",
  height: "5px",
  margin: "10px",
  marginBottom: "10px"
};

const style = {
  padding: "10px",
  display: "flex",
  gap: "20px"
};

const cardStyle = {
  display: "flex",
  flexDirection: "column",
};

const linkStyle = {
  textDecoration: "none",
  color: "black"
};

  var routeTo = "/subject/" + course.id + '/enroll'
  console.log(showEnrollBtn)
  if (!showEnrollBtn)
    routeTo = "/syllabus/" + course.id + `?title=${course.title}`;
  const title = course.title;

  return (
    <div className="course-card" style={{ display: "flex", backgroundImage: `url(${imageUrl})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
      <Link style={linkStyle} to={routeTo}>
        <div style={cardStyle}>
          <h2 style={style}>{course.code_no}</h2>
          <hr className="progressBar" style={progress_bar_style}></hr>
          <h3 style={style}>{course.title}</h3>
          {
            showEnrollBtn ? <Link to={routeTo}>Enroll Now</Link> : ''
          }
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
