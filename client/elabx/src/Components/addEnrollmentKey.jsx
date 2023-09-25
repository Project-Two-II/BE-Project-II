import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Header from './header';
import Footer from './Footer/Footer';

import './Create.css';

const AddEnrollmentKey = () => {

  const params = useParams()
  const courseId = params.subId;

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) =>  state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)
  console.log(token)

  const [key, setKey] = useState('')
  const [message, setMessage] = useState('')

  /*
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
*/

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    console.log(key)

    /*
    fetch(`http://localhost:8000/api/subjects/${courseId}/group/`,fetchOption)
    .then((resp) => {
      return resp.json()
    })
    .then((data) => {
      console.log(data);
      setMessage(data.detail);
    })
    .catch(err => console.log(err))
    */
  }

  return (
      <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label>Add Key</label>
          <input name="enrollmentKey" id="enrollmentKey" value={key} onChange={handleKeyChange} required />
        </div>

        <button id="submit" className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddEnrollmentKey;
