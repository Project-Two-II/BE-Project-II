import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard.jsx';

const course_list_style = {
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gridGap: "40px",
};

function MyCourseList({ token }) {
  const [course, setCourse] = useState([]);
  const myCourses =[]

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/subjects/mysubjects/", fetchOption);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data)
        setCourse(data);
        // enrolledCourses.push(course.id)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    
    fetchCourses();
    // course.map(course => (myCourses.push(course.id)))
    // console.log(myCourses)
  }, [token]);

  return (
    <div className='course-list' style={course_list_style}>
      {/* {course.map((course) =>(myCourses.push(course.id))) } */}
      {/* {course.map((course) => (myCourses.push(course.id)))} */}
      {course.map((course) => (
        <CourseCard key={course.id} course={course} myCourses={myCourses}/>
      ))}
    </div>
  );
}

export default MyCourseList;
