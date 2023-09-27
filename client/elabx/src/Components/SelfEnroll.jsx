import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from './header';
import Footer from './Footer/Footer';

import './Create.css';

const SelfEnroll = () => {

  const params = useParams()
  const courseId = params.courseId;

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) =>  state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)
  console.log(token)

  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')

  const fetchOption = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    },
    body: JSON.stringify({
      "key": key
    })
 }

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    console.log(courseId)
    console.log(key)

    fetch(`http://127.0.0.1:8000/api/subjects/${courseId}/enroll/`,fetchOption)
    .then((resp) => {
      return resp.json()
    })
    .then((data) => {
      console.log(data);
      setMessage(data.detail);
    })
    .catch(err => console.log(err))
    navigate(`prompt`)
    
  }

  return (
      <>
      <Header />
      <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label>Enter Enrollment Key</label>
          <input name="enrollmentKey" value={key} onChange={handleKeyChange} required />
        </div>

        <button id="submit" className="btn" type="submit">Enroll</button>
      </form>
    </div>
    <Footer />
      </>
  );
}

export default SelfEnroll;
