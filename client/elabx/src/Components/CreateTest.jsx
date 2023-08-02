import React, { useState } from 'react';

import './Create.css';


const CreateTest = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleQuestionChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], question: e.target.value };
    setQuestions(newQuestions);
  }

  const handleAnswerChange = (e, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], answer: e.target.value };
    setQuestions(newQuestions);
  }

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  }

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the submitted test data
    console.log(`Submitted test: ${title}, questions: ${JSON.stringify(questions)}`);
    // Clear the form
    setTitle('');
    setQuestions([]);
  }

  return (
    <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
        <label htmlFor="title">Test Title:</label>
        <input name="title" id="title" value={title} onChange={handleTitleChange} required />
        {questions.map((question, index) => (
          <div key={index}>
            <label htmlFor={`question${index}`}>Question:</label>
            <textarea name={`answer${index}`} id={`answer${index}`} value={question.answer} onChange={(e) => handleAnswerChange(e, index)} required></textarea>
            <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
        <button id="submit" className="btn" type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTest;