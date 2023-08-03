import React from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CourseList from '../CourseList.jsx'

const headingStyle = {
  color : "white",
  backgroundColor: "#1F2334",
  fontSize: "2.5rem",
}
const course_list_style = {
  backgroundColor: "#1F2334"
}

function HomePage() {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
  const token = useSelector((state) => state.token);
  return (
    <div className="home-container">
      {isLoggedIn ? (
        <>
          <div className="headingStyle" style={headingStyle}>Your Labs</div>
          <div className="courseList" style={course_list_style}>
            <CourseList token={token} />
          </div>
          <div className="headingStyle" style={headingStyle}>Your Labs</div>
          <div className="courseList" style={course_list_style}>
            <CourseList token={token} />
          </div>
        </>
      ) : (
        navigate("/login")
      )
      }
    </div>
  )
}

export default HomePage
