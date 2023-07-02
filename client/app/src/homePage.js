import React from 'react';
import CourseList from './components/CourseList';
import courses from './data/courses';
import './style.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to our CMS</h1>
      <CourseList courses={courses} />
    </div>
  );
};

export default HomePage;
