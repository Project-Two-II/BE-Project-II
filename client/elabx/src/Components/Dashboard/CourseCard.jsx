import React from 'react';

const CourseCard = ({ imageSrc }) => {
  return (
    <div className="course-card">
      <img style={imgStyle} src={imageSrc} alt="Course" />
    </div>
  );
};

export default CourseCard;