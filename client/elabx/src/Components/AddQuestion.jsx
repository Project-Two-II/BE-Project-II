import React, { useState } from 'react';
import './Create.css';

const CreateQuestion = () => {
  const [chapter, setChapter] = useState('');
  const [questions, setQuestions] = useState([{ id: 1, text: '' }]);

  const handleChapterChange = (e) => {
    setChapter(e.target.value);
  }

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].text = e.target.value;
    setQuestions(newQuestions);
  }

  const handleRemoveQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  }

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    const newId = newQuestions.length + 1;
    newQuestions.push({ id: newId, text: '' });
    setQuestions(newQuestions);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show a confirmation dialog before creating the question
    const isConfirmed = window.confirm(`Are you sure you want to create the questions with Chapter Name: ${chapter}?`);
    if (isConfirmed) {
      // Do something with the submitted chapter name and questions
      console.log(`Submitted Chapter Name: ${chapter}`);
      questions.forEach(question => {
        console.log(`Question ${question.id}: ${question.text}`);
      });
      // Clear the form
      setChapter('');
      setQuestions([{ id: 1, text: '' }]);
    }
  }

  return (
    <div className="formContainer">
      <form className="ipContainer" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="chapter">Chapter Name:</label>
          <input name="chapter" id="chapter" value={chapter} onChange={handleChapterChange} required />
        </div>
        {questions.map((question, index) => (
          <div key={question.id} className="inputGroup">
            <label htmlFor={`question${question.id}`}>Question {question.id}:</label>
            <input name={`question${index}`} id={`question${index}`} value={question.question} onChange={(e) => handleQuestionChange(e, index)} required />
            <label htmlFor={`answer${index}`}>Question Description:</label>
            <div className="questionGroup">
              <textarea
                name={`question${question.id}`}
                id={`question${question.id}`}
                value={question.text}
                onChange={(e) => handleQuestionChange(index, e)}
                required
              />
              {questions.length > 1 && (
                <button type="button" className="removeBtn" onClick={() => handleRemoveQuestion(index)}>
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="addBtn" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button className="btn" type="submit">Create Questions</button>
      </form>
    </div>
  );
}

export default CreateQuestion;
