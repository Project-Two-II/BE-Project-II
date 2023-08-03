import React, { useState } from 'react';
import './Create.css';

const CreateQuestion = () => {
  const [chapter, setChapter] = useState('');
  const [questions, setQuestions] = useState([{ id: 1, text: '' }]);
  const chapterTitles = ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Other'];
  const [boilerplateText, setBoilerplateText] = useState('');

  const handleChapterChange = (e) => {
    setChapter(e.target.value);
  }

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].text = e.target.value;
    setQuestions(newQuestions);
  }

  const handleBoilerplateChange = (e) => {
    setBoilerplateText(e.target.value);
  }

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    const newId = newQuestions.length + 1;
    newQuestions.push({ id: newId, text: '' });
    setQuestions(newQuestions);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(`Are you sure you want to create the questions with Chapter Name: ${chapter}?`);
    if (isConfirmed) {
      console.log(`Submitted Chapter Name: ${chapter}`);
      questions.forEach(question => {
        console.log(`Question ${question.id}: ${question.text}`);
      });

      console.log(`Boilerplate Text: ${boilerplateText}`);

      setChapter('');
      setQuestions([{ id: 1, text: '' }]);
      setBoilerplateText('');
    }
  }

  return (
    <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="chapter">Select Chapter Name:</label>
          <select name="chapter" id="chapter" value={chapter} onChange={handleChapterChange} required>
            <option value="">Select a chapter title</option>
            {chapterTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </div>
        {questions.map((question, index) => (
          <div key={question.id} className="inputGroup">
            <label htmlFor={`question${question.id}`}>Question Title:</label>
            <input name={`question${index}`} id={`question${index}`} value={question.question} onChange={(e) => handleQuestionChange(index, e)} required />
            <label htmlFor={`answer${index}`}>Question Description:</label>
            <div className="questionGroup">
              <textarea
                name={`question${question.id}`}
                id={`question${question.id}`}
                value={question.text}
                onChange={(e) => handleQuestionChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        {/* Boilerplate Text Box */}
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

        <button className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateQuestion;
