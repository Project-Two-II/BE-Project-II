import {React, useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import EditorWindow from "@monaco-editor/react";

import WorkerAPI from '../shared_web.js'


const initialHeader = "#include <iostream>\n";


function Editor({defaultLang}) {

  const token = useSelector((state) =>  state.token);

  
  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer  " +  token
    },
  }

  const [code, setCode] = useState("")
  const [testCode, setTestCode] = useState("");

  const handleCodeChange = (code) => {
   setCode(code)
  }

  function getData() {
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