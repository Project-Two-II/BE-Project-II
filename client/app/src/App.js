import './App.css';
// import { Editor } from 'monaco-editor';
import Editor from "@monaco-editor/react";
import React from 'react';

function App({
  defaultLang
}) {
  return (
    <div className="App">
      <header>Blah</header>
      <div className="body">
        <div className="course">

        </div>
        <Editor
          height="100vh"
          width="50%"
          defaultLanguage={defaultLang}
          theme="vs-dark"
        />
      </div>

    </div>
  );
}

export default App;
