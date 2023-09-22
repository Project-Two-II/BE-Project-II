import React, { useState } from 'react';
import './Create.css';

import { useSelector } from 'react-redux'

import {  useParams} from 'react-router-dom'


const CreateQuestion = () => {

  const token = useSelector((state) => state.token);

  const param = useParams();
  const courseId = param.subId;
  const chapterId = param.chapterId

  const [title, setTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('')
  const [boilerplateText, setBoilerplateText] = useState('');



  const handleQuestionChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setQuestionDescription(e.target.value)
  }

  const handleBoilerplateChange = (e) => {
    setBoilerplateText(e.target.value);
  }


  const handleSubmission = (e) => {
    e.preventDefault();

    const fetchOption = {
      method: "POST",
      headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "title": title,
        "description": questionDescription,
        "boilerplate":boilerplateText
      })
  }

    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/`, fetchOption)
    .then(resp => resp.json())
            .then(data => {
              // todo: add a success message
              console.log(data)
            })
    .catch(err => console.log(err))

  }

  return (
    <div className="formContainer">
      <form className="ipContainer">
        <div className="inputGroup">
        </div>
          <div className="inputGroup">
            <label >Question Title:</label>
            <input value={title} onChange={handleQuestionChange} required />
            <label>Question Description:</label>
            <div className="questionGroup">
              <textarea
                value={questionDescription}
                onChange={handleDescriptionChange}
                required
              />
            </div>
          </div>
      

        
        <div className="inputGroup">
          <label htmlFor="boilerplateText">Boilerplate Text:</label>
          <textarea
            name="boilerplateText"
            id="boilerplateText"
            value={boilerplateText}
            onChange={handleBoilerplateChange}
            required
          />
        </div>
        <button className="btn" type="button" onClick={handleSubmission}>Add</button>
      </form>
    </div>
  );
}

export default CreateQuestion;
