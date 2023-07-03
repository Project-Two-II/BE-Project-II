import React, { useState, useEffect } from 'react';
import CourseList from './CourseList';

const headerStyle = {
  height: "15vh",
  position: "static",
  backgroundColor: "#1F2334"
}
const spanStyle = {
  color: "white",
  position: "relative",
  top: "35px",
  left: "100px",
  fontSize: "2.5rem",
  textDecoration: "underline"
}
const course_list_style = {
  backgroundColor: "#1F2334"
}


function HomePage() {
  return (
    <>
      <div style={headerStyle} className="courseHeader">
        <span style={spanStyle}>Your Labs</span>
      </div>
      <div className="courseList" style={course_list_style}>
        <CourseList />
      </div>
    </>
  );
};

export default HomePage;
