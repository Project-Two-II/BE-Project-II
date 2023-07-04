import {React, useState, useEffect} from 'react'
import EditorWindow from "@monaco-editor/react";

import WorkerAPI from '../shared_web.js'


const Editor = () => {

  const [code, setCode] = useState("")

  const handleCodeChange = (code) => {
   setCode(code)
  }

  const RunClickHandler = (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    console.log("Creating a new Worker");
    let API = new WorkerAPI();
    API.compileLinkRun(code);
  }

  return (
    <>
    <button onClick={RunClickHandler}>Run</button>
    <EditorWindow
        height="100vh"
        width="100%"
        defaultLanguage="cpp"
        theme="vs-dark"
        value = {code}
        onChange={handleCodeChange}
    />
    <textarea className="editorFooter" id = "output" placeholder='Output' rows={8}></textarea>
    </>
  )
}

export default Editor;