import React, { useState } from 'react';
import './UserInput.css';
import '../App.css';
import './Create.css';


const CreateTest = () => {
  const [testTitle, setTestTitle] = useState("");
  const [testDescription, setTestDescription] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("printHelloWorld");

  const handleTestTitleChange = (e) => {
    setTestTitle(e.target.value);
  }

  const handleTestDescriptionChange = (e) => {
    setTestDescription(e.target.value);
  }

  const handleQuestionChange = (e) => {
    setSelectedQuestion(e.target.value);
  }

  return (
    <div className="formContainer">
      <form className="ipContainer">
          <div className="inputGroup">
          <label htmlFor="testDescription">Source Code:</label>
          <textarea
            name="testDescription"
            id="testDescription"
            value={testDescription}
            onChange={handleTestDescriptionChange}
            required
            placeholder="Enter source code"
          ></textarea>
        </div>

        <button id="submit" className="btn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateTest;
