import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Create.css'
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)
  console.log(token)


  if (!isLoggedIn) {
    navigate("/login")
    return
  } else if (!role) {
    navigate("/home")
    return
  }

  const [courseSubject, setCourseSubject] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState('')

  const fetchOption = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      "code_no": courseCode,
      "title": courseSubject,
      "description": courseDesc,
    })
  }

  const handleSubjectChange = (e) => {
    setCourseSubject(e.target.value);
  }

  const handleCourseCodeChange = (e) => {
    setCourseCode(e.target.value);
  }

  const handleDescChange = (e) => {
    setCourseDesc(e.target.value);
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    setThumbnail(file);
  }

  const handleCourseSubmission = async(e) => {
    e.preventDefault();
    setMessage(' ');

   fetch("http://localhost:8000/api/subjects/", fetchOption)
   .then((resp) => {
    return resp.json()
  })
  .then((data) => {
    console.log(data);
    setMessage(data.detail);
  })
  .catch(err => console.log(err))

  navigate("/dashboard/")
  }
>>>>>>> cf71e86 (direct to dashboard after adding course)

  return (

    <div className="formContainer">
      <p>{message}</p>
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
            value={courseDesc}
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

        <button id="submit" className="btn" type="submit" onClick={handleCourseSubmission}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateCourse;
