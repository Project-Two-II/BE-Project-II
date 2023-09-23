import React, { useState } from "react";
import './Create.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CreateQuestionTest = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('');
  const [boilerplate, setBoilerplate] = useState('');
  const [testDescription, setTestDescription] = useState('');

  
  const handleAddQuestion = () => {
    
    console.log('Question Title:', questionTitle);
    console.log('Question Description:', questionDescription);
    console.log('Boilerplate Code:', boilerplate);
    console.log('Test Description:', testDescription);

  };

  return (
    <div className="container">
  <div className="left-column" style={{ fontFamily: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" }}>
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
          style={{ height: "80px",width:500, resize: "vertical" }}
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
          value={boilerplate}
          onChange={(e) => setBoilerplate(e.target.value)}
          placeholder="Enter boilerplate code"
          style={{ height: "200px", resize: "vertical" }}
        />
      </div>

      <div className="right-column">
        <h2>Test</h2>
        <div className="box"></div>

        <div className="input-group">
          <label htmlFor="testDescription">Test Description:</label>
        </div>
        <textarea
          id="testDescription"
          value={testDescription}
          onChange={(e) => setTestDescription(e.target.value)}
          style={{ height: "300px", width: "400px", resize: "vertical" }}
        />
        <button className="add-question-button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
}

export default CreateQuestionTest;
