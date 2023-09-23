import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Create.css'
import { useNavigate } from 'react-router-dom';

const UpdateCourse = () => {

  const param = useParams('');
  const courseId = param.subId;

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)
//   console.log(token)


  if (!isLoggedIn) {
    navigate("/login")
    return
  } else if (!role) {
    navigate("/home")
    return
  }

  const [course, setCourse] = useState('')
  const [courseSubject, setCourseSubject] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState('')

  const updateOption = {
    method: "PUT",
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

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  const handleSubjectChange = (e) => {
    e.target.value = courseSubject
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

 useEffect(()=>{
     const fetchCourse = async() => {

         try{
             const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/`, fetchOption);
             console.log(response)
             if (!response.ok) {
                 throw new Error("Network response was not ok.");
                }
                const data = await response.json();
                setCourse(data);
                // console.log(data)
                setCourseSubject(data.title)
                setCourseDesc(data.description)
                setCourseCode(data.code_no)
            } catch(error)
            {
                console.error("Error fetching data: ", error)
            }
        };
        fetchCourse();
 },[])

 const handleCourseSubmission = async(e) => {
    e.preventDefault();
    setMessage(' ');

      fetch(`http://localhost:8000/api/subjects/${courseId}/`, updateOption)
        .then((resp) => {
          return resp.json()
        })
        .then((data) => {
          console.log(data);
          setMessage(data.detail);
        })
        .catch(err => console.log(err))
    }

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
            // value={updateDb ? title : { courseSubject }}
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
            // value={updateDb ? code : { courseCode }}
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
            // value={updateDb ? desc : { courseDesc }}
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

export default UpdateCourse;