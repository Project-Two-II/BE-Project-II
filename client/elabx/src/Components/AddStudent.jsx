import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import './Create.css';

const errStyle = {
  color: "red",
}

const successStyle = {
  color: "green"
}

const AddStudent = () => {

  const params = useParams()
  const courseId = params.subId;

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) =>  state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)
  console.log(token)

  const [student, setStudent] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const fetchOption = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    },
    body: JSON.stringify({
      "user": student
    })
 }

  const handleStudentChange = (e) => {
    setStudent(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMessage('');
    setSuccessMessage('')
    fetch(`http://localhost:8000/api/subjects/${courseId}/group/`,fetchOption)
    .then((resp) => {
      if(!resp.ok){
         setErrMessage("Something went Wrong.. Try again in a while")
      }
      return resp.json()
    })
    .then((data) => {
      console.log(data);
      setSuccessMessage(data.detail);
    })
    .catch(err => console.log(err))
    navigate(`prompt`)
  }

  return (
      <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
        <p style={errStyle}>{errMessage}</p>
        <p style={successStyle}>{successMessage}</p>

        <div className="inputGroup">
          <label>Student Email:</label>
          <input name="studentEmail" id="studentEmail" value={student} onChange={handleStudentChange} required />
        </div>

        <button id="submit" className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;
