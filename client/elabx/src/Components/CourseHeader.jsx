import React from 'react'

import Header from './header'

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
    fontSize: "2.5rem",
    textDecoration: "underline"
  }
function CourseHeader({props}) {
  return (
    <>
     <Header SearchBar={false}/>
    </>
    
  )
}

export default CourseHeader