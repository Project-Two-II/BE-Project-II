import {React, useState, useEffect} from 'react'
import EditorWindow from "@monaco-editor/react";

import WorkerAPI from '../shared_web.js'


const Editor = () => {

  let API = new WorkerAPI();

  const [code, setCode] = useState("")

  const handleCodeChange = (code) => {
   setCode(code)
  }

  const RunClickHandler = (e) => {
    e.preventDefault();
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
    {/* <div id = "output"></div> */}
    </>
  )
}

export default Editor;