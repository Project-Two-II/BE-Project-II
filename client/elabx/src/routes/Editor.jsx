import {React, useState, useEffect} from 'react'
import EditorWindow from "@monaco-editor/react";


function Editor({defaultLang, api}) {

  const [code, setCode] = useState("")

  const handleCodeChange = (code) => {
   setCode(code)
  }

  const RunClickHandler = (e) => {
    e.preventDefault();
    api.compileLinkRun(finalCode);
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
    <textarea className="editorFooter" id = "output" placeholder='Output'></textarea>
    </>
  )
}

export default Editor;