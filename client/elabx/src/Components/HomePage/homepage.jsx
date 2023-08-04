import React from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CourseList from '../CourseList.jsx'
import { Link } from 'react-router-dom'
import './homepage.css'
import '../../App.css'

const headingStyle = {
  color: "white",
  fontSize: "2rem",
  textDecoration: "underline",
  paddingLeft: "30px"
}
const course_list_style = {
  backgroundColor: "#1F2334"
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
  console.log(isLoggedIn)
  const token = useSelector((state) => state.token);
  return (
    <div className="main">
      <Link to="/addcourse">
        <span className="btn create-btn" style={btn_style}>Create Course</span>
      </Link>
      {isLoggedIn ? (
        <div className="home-container">
          <div className="headingStyle" style={headingStyle}>My Courses</div>
          <div className="courseList" style={course_list_style}>
            <CourseList token={token} />
          </div>
          <span className="headingStyle" style={headingStyle}>All Courses</span>
          <div className="courseList" style={course_list_style}>
            <CourseList token={token} />
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
