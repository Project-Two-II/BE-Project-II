import {React, useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import EditorWindow from "@monaco-editor/react";

import WorkerAPI from '../shared_web.js'


const initialHeader = "#include <iostream>\n";


function Editor({defaultLang}) {
  const token = useSelector((state) =>  state.token);
  const [code, setCode] = useState("")
  const [testCode, setTestCode] = useState("");

  const handleCodeChange = (code) => {
   setCode(code)
  }

  function getData() {

    const fetchOption = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer  " +  token
      },
    }

    fetch("http://localhost:8000/api/subjects/1/chapters/1/questions/2/test/", fetchOption)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setTestCode(data.source_code)
        })
        .catch(err => console.log(err))
}
  
  const RunClickHandler = (e) => {
    e.preventDefault();
    let finalCode = initialHeader + code + testCode;
    let API = new WorkerAPI();
    API.compileLinkRun(finalCode);
  }

  const submissionHandler = (e) => {
    e.preventDefault();
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer  " +  token
      },
      body: JSON.stringify({
        "solution": code
      })
    }
    fetch("http://localhost:8000/api/submission/1/chapters/1/questions/2/submit/", fetchOption)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
        })
        .catch(err => console.log(err))
  }

  useEffect(() => {
    getData()
}, []);

  return (
    <div className="editorSection">
            <div className="editorButtons">
              <button  className=" btn submitBtn" onClick={submissionHandler}>Submit</button>
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