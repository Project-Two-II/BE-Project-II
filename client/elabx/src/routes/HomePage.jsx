import React from 'react';
import { useSelector} from 'react-redux'


import CourseList from '../Components/CourseList.jsx';

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

  //const isLoggedIn = useSelector((state) => state.cred.isLoggedIn)
  const token = useSelector((state) =>  state.token);
  //const role = 0
  return (
    <>  
      <div style={headerStyle} className="courseHeader">
        <span style={spanStyle}>Your Labs</span>
      </div>
      <div className="courseList" style={course_list_style}>
        <CourseList token={token}/>
      </div>
    </>
  );
};

export default HomePage;
