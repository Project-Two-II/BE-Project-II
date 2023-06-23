import React from 'react';
import '../App.css';
import Question from './Question.js';
import Editor from './Editor.js'

import EditorWindow from "@monaco-editor/react";
import { useLocation } from 'react-router-dom';


function QuestionSolve({my_api}) {
  let { state } = useLocation();
  return (
    <div className="body">
      <Question state={state.title}/>
      <Editor defaultLang = "cpp" api = {my_api} />
    </div>
  );
}

export default QuestionSolve;
