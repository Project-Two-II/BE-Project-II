import React from 'react';
import '../App.css';
import Question from '../Components/Question.jsx';
import Editor from '../Components/Editor.jsx'
import CourseHeader from '../Components/CourseHeader'
import EditorWindow from "@monaco-editor/react";
import { useLocation } from 'react-router-dom';


function QuestionSolve({my_api}) {
  let { state } = useLocation();
  return (
    <>
    <CourseHeader />
    <div className="body">
      <Question />
      {/* <Question state={state.title}/> */}
      <Editor defaultLang = "cpp" api = {my_api} />
    </div>
    </>
  );
}

export default QuestionSolve;
