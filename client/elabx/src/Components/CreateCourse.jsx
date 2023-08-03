import React, { useState } from 'react';
import './UserInput.css';
import '../App.css';

const CreateCourse = () => {
  const [courseSubject, setCourseSubject] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubjectChange = (e) => {
    setCourseSubject(e.target.value);
  }

  const handleCourseCodeChange = (e) => {
    setCourseCode(e.target.value);
  }

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  }

  return (
    <div className="formContainer">
      <form className="ipContainer">
        <div className="inputGroup">
          <label htmlFor="subject">Course Title:</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={courseSubject}
            onChange={handleSubjectChange}
            required
            placeholder="Enter subject name"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type="text"
            name="courseCode"
            id="courseCode"
            value={courseCode}
            onChange={handleCourseCodeChange}
            required
            placeholder="Enter course code number"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="description">Course Description:</label>
          <textarea
            name="description"
            id="description"
            value={desc}
            onChange={handleDescChange}
            required
            placeholder="Enter course description"
          ></textarea>
        </div>

        <div className="inputGroup">
          <label htmlFor="thumbnail">Course Thumbnail (Image):</label>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            required
          />
        </div>

        <button id="submit" className="btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
