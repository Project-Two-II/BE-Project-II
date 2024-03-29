import React from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import MyCourseList from '../myCourseList.jsx'
import CourseList from '../CourseList.jsx'
import './homepage.css'
import '../../App.css'

const headingStyle = {
  color: "darkblue",
  fontSize: "2rem",
  textDecoration: "underline",
  paddingLeft: "30px",
  fontWeight:"Bolder"
}
const btn_style = {
  color: "white",
  backgroundColor: "green",
  position: "absolute",
  right: "105px",
  width: "max-content"
}

function HomePage() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const token = useSelector((state) => state.token);
  return (
    <div className="HomeMain">
      {isLoggedIn ? (
        <div className="home-container">
          <div className="headingStyle" style={headingStyle}>My Courses</div>
          <div className="courseList">
            <MyCourseList token={token} />
          </div>
          <span className="headingStyle" style={headingStyle}>All Courses</span>
          <div className="courseList">
            <CourseList token={token}/>
          </div>
        </div>
      ) : (
        navigate("/login")
      )
      }
    </div>
  )
}

export default HomePage
