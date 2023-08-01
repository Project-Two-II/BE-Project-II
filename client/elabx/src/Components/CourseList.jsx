import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard.jsx';

const course_list_style = {
    padding : "20px",
    display : "grid",
    gridTemplateColumns : "repeat(auto-fit, minmax(250px, 1fr))",
    gridGap : "40px",
}

function CourseList() {
  const [course, setCourse] = useState([]);

  function getCourse() {
    fetch("http://localhost:8000/api/subjects/")
      .then(resp => resp.json())
      .then(data => {
        setCourse(data)
      })
      .catch(err => console.log(err))
    }
    console.log(course)

  useEffect(() => {
    getCourse()
  }, [])

  return (
    <div className='course-list' style={course_list_style}>
      {course.map(course => (
          // <Link to={{pathname: '/Syllabus.js', state: course.id}}>
          <Link to="/syllabus">
            <CourseCard key={course.id} course={course} />
          </Link>
      ))}
    </div>
  )
}

export default CourseList;
