import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard.jsx';

const course_list_style = {
    padding : "20px",
    display : "grid",
    gridTemplateColumns : "repeat(auto-fit, minmax(250px, 1fr))",
    gridGap : "40px",
}


function CourseList({token}) {
  const [course, setCourse] = useState([]);

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    },

  }
  
  // function getCourse() {
  //   fetch("http://localhost:8000/api/subjects/", fetchOption)
  //     .then((resp) => {
  //       console.log(resp.status)
  //       return resp.json()
  //     })
  //     .then(data => {
  //       console.log(data)
  //       setCourse(data)
  //     })
  //     .catch(err => console.log(err))
  //   }
  //   console.log(course)

  // useEffect(() => {
  //   getCourse()
  // }, [])


    fetch("http://localhost:8000/api/subjects/", fetchOption)
      .then((resp) => {
        console.log(resp.status)
        return resp.json()
      })
      .then(data => {
        console.log(data)
        setCourse(data)
      })
      .catch(err => console.log(err))
    console.log(course)

  return (
    <div className='course-list' style={course_list_style}>
      {course.map(course => (
          // <Link to={{pathname: '/Syllabus.js', state: course.id}}>
            <CourseCard key={course.id} course={course} />
          
      ))}
    </div>
  )
}

export default CourseList;
