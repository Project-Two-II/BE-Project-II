import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard.jsx';

const course_list_style = {
  padding: "20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gridGap: "20px",
};

function MyCourseList({ token }) {
  const [course, setCourse] = useState([]);

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    }
  }
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/subjects/mysubjects/", fetchOption);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      console.log(data)
      setCourse(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token]);

  return (
    <div className='course-list' style={course_list_style}>

      {course.map((course) => (
        <CourseCard key={course.id} course={course}/>
      ))}
    </div>
  );
}

export default MyCourseList;
