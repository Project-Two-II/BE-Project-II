import {React, useState, useEffect} from 'react'
import EditorWindow from "@monaco-editor/react";

import WorkerAPI from '../shared_web.js'


const initialHeader = "#include <iostream>\n";


function Editor({defaultLang}) {

  const [code, setCode] = useState("")
  const [testCode, setTestCode] = useState("");

  const handleCodeChange = (code) => {
   setCode(code)
  }

  function getData() {
    fetch("http://localhost:8000/api/subjects/1/chapters/1/questions/1/test/")
        .then(resp => resp.json())
        .then(data => {
          setTestCode(data.source_code)
        })
        .catch(err => console.log(err))
}
  
  const RunClickHandler = (e) => {
    e.preventDefault();
    let finalCode = initialHeader + code;
    let API = new WorkerAPI();
    API.compileLinkRun(finalCode);
  }

  useEffect(() => {
    getData()
}, []);

  return (
    <div className="editorSection">
            <div className="editorButtons">
              <button  className=" btn submitBtn">Submit</button>
              <button onClick = {RunClickHandler} className="btn runBtn">Run</button>
            </div>
            <EditorWindow
              height="50vh"
              width="100%"
              defaultLanguage={defaultLang}
              theme="vs-dark"
              value = {code}
              onChange={handleCodeChange}
            />  
            <textarea className="editorFooter" id = "output" placeholder='Output'>
            </textarea>
          </div>
  )
}

export default Editor