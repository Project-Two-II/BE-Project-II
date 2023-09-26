import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard.jsx';

const course_list_style = {
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gridGap: "40px",
};

function CourseList({ token }) {
  const [course, setCourse] = useState([]);
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [enrolledCourseId, setEnrolledCourseId] = useState([])

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    }
  }

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/subjects/", fetchOption);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setCourse(data);
      // It is bad but I've to do this, I need the IDs
      fetch("http://localhost:8000/api/subjects/mysubjects/", fetchOption)
      .then((resp)=> resp.json())
      .then(data => {
        console.log("Enrolled Course", data)
        setEnrolledCourseId(data.map((d) => d.id));

      })
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();

  },[]);

  return (
    <div className='course-list' style={course_list_style}>
      {

        course.map((course) => {
          console.log(enrolledCourseId)
          if(enrolledCourseId.includes(course.id)){
            console.log(enrolledCourseId.includes(course.id))
            return(
              <CourseCard key={course.id} course={course} showEnrollBtn={false}/>
            )
          } else {
            return(
              <CourseCard key={course.id} course={course} showEnrollBtn={true}/>
            )
          }
        })
      }
    </div>
  );
}

export default CourseList;
