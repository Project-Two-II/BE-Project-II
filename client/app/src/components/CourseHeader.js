import React from 'react'

const headerStyle = {
    height: "18vh",
    position: "static",
    backgroundColor: "#1F2334"
  }
  const spanStyle = {
    color: "white",
    position: "relative",
    top: "35px",
    left: "100px",
    fontSize: "3rem",
    textDecoration: "underline"
  }
function CourseHeader({props}) {
  return (
    <div style={headerStyle} className="courseHeader">
        {/* <span style={spanStyle}>{props.state}</span> */}
        <span style={spanStyle}>C++ LAB</span>
      </div>
  )
}

export default CourseHeader