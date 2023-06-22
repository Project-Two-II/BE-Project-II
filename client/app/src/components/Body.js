import React from 'react';
import '../App.css';
import Question from './Question.js';
import Editor from './Editor.js'
import EditorWindow from "@monaco-editor/react";

function Body() {
  return (
    <div className="body">
      <Question />
      <Editor />
    </div>
  );
}

export default Body