import React from 'react';
import '../App.css';
import Question from './Question.js';
import Editor from './Editor.js'


function questionSolve({my_api}) {
  return (
    <div className="body">
      <Question />
      <Editor defaultLang = "cpp" api = {my_api}/>
    </div>
  );
}

export default questionSolve;
