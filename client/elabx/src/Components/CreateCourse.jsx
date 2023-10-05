import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Create.css'
import { useNavigate} from 'react-router-dom';

const errMessageStyle = {
  color: "red"
}
const successMessageStyle = {
  color: "green"
}
const CreateCourse = () => {

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)


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
  const [errMessage, setErrMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')


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
    setErrMessage(' ');
    setSuccessMessage('')

    // check if all fields are filled
    if(courseSubject === "" || courseCode === "" || courseDesc === "" || thumbnail === null){
      setErrMessage("All the fields are required");
      return;
    }


    let formData = new FormData();
    formData.append("code_no",courseCode)
    formData.append("title", courseSubject)
    formData.append("description",courseDesc)
    formData.append("thumbnail",thumbnail, thumbnail.name)

    const fetchOption = {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token
      },
      body: formData
    }

    console.log(formData)
    fetch("http://localhost:8000/api/subjects/", fetchOption)
    .then((resp) => {
      if(!resp.ok){
        throw new Error("Network response was not OK")
      } 
      // todo: display sucess dialog
      setSuccessMessage("Course Added Successfully. Exiting soon")
      navigate(-1)
      })
     .catch(err => {
        console.log(err)
        setErrMessage("Something Went Wrong");
        setSuccessMessage("");
       }
      )

<<<<<<< HEAD
  navigate(`prompt`)
=======
>>>>>>> 1574ef8 (bulk add)
  }

  return (

    <div className="formContainer">
      <form className="ipContainer">
      <p style={errMessageStyle}>{errMessage}</p>
      <p style={successMessageStyle}>{successMessage}</p>
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
