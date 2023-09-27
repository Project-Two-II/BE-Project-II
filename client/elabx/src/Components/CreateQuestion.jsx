import React, { useState } from 'react';
import './Create.css';

import { useSelector } from 'react-redux'

import { useNavigate, useParams } from 'react-router-dom'


const CreateQuestion = () => {

  const token = useSelector((state) => state.token);

  const param = useParams();
  const navigate = useNavigate()
  const courseId = param.subId;
  const chapterId = param.chapterId

  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [boilerplateText, setBoilerplateText] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [message, setMessage] = useState('');
  const [questionId, setQuestionId] = useState('');


  // const handleQuestionChange = (e) => {
  //   setTitle(e.target.value);
  // }

  // const handleDescriptionChange = (e) => {
  //   setQuestionDescription(e.target.value)
  // }

  // const handleBoilerplateChange = (e) => {
  //   setBoilerplateText(e.target.value);
  // }


  const handleSubmission = (e) => {
    e.preventDefault();

    const fetchQuestionOption = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "title": questionTitle,
        "description": questionDescription,
        "boilerplate": boilerplateText
        // "source_code":testDescription
      })
    }

    const fetchTestOption = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "source_code": testDescription
      })
    }

    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/`, fetchQuestionOption)
      .then(resp => resp.json())
      .then(data => {
        // todo: add a success message
        console.log(data.id)
        // setQuestionId(data.id)
        fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${data.id}/test/`, fetchTestOption)
          .then(resp => resp.json())
          .then(data => {
            // todo: add a success message
            console.log(data)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    console.log(questionId)
    navigate(`prompt`)
  }

  return (
    <div className="my-container">
      <div className="left-column" style={{ fontFamily: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
        <h2>Add Question</h2>
        <div className="input-group">
          <label htmlFor="questionTitle">Question Title:</label>
        </div>
        <input
          type="text"
          id="questionTitle"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder="Enter question title"
          style={{ height: "80px", width: 500, resize: "vertical" }}
        />

        <div className="input-group">
          <label htmlFor="questionDescription">Question Description:</label>
        </div>
        <textarea
          id="questionDescription"
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
          placeholder="Enter question description"
        />

        <div className="input-group">
          <label htmlFor="boilerplate">Boilerplate Code:</label>
        </div>
        <textarea
          id="boilerplate"
          value={boilerplateText}
          onChange={(e) => setBoilerplateText(e.target.value)}
          placeholder="Enter boilerplate code"
          style={{ height: "200px", resize: "vertical" }}
        />
      </div>

      <div className="right-column">
        <h2>Test</h2>
        {/* <div className="box"></div> */}

        <div className="input-group">
          <label htmlFor="testDescription">Test Description:</label>
        </div>
        <textarea
          id="testDescription"
          value={testDescription}
          onChange={(e) => setTestDescription(e.target.value)}
          style={{ height: "300px", width: "400px", resize: "vertical" }}
        />
        <button className="add-question-button" onClick={handleSubmission}>
          Add Question
        </button>
      </div>
    </div>
  );
}

export default CreateQuestion;
