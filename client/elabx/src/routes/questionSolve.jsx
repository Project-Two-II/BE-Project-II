import React from 'react';
import Question from '../Components/Question.jsx';
import Editor from '../Components/Editor.jsx'
import CourseHeader from '../Components/CourseHeader'

import '../App.css';


function QuestionSolve({my_api}) {
  return (
    <>
    <CourseHeader />
    <div className="body">
      <Question />
      <Editor defaultLang = "cpp" api = {my_api} />
    </div>
    </>
  );
}

export default QuestionSolve;
