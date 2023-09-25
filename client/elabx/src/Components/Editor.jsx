import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import EditorWindow from "@monaco-editor/react";

import { useLocation} from 'react-router-dom';


import WorkerAPI from '../shared_web.js';
import './Editor.css'


const initialHeader = "#include <iostream>\n";


function Editor(props) {

  const token = useSelector((state) =>  state.token);
  const [code, setCode] = useState("")
  const [testCode, setTestCode] = useState("");

  const handleCodeChange = (code) => {
   setCode(code)
  }

  useEffect(() => {
    getData()
   }, []);

  const getData = () => {

    const fetchOption = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer  " +  token
      },
    }

    fetch(`http://localhost:8000/api/subjects/${props.props.courseId}/chapters/${props.props.chapterId}/questions/${props.props.questionId}/test/`, fetchOption)
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
    fetch(`http://localhost:8000/api/submission/${props.props.courseId}/chapters/${props.props.chapterId}/questions/${questionId}/submit/`, fetchOption)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
        })
        .catch(err => console.log(err))
  }

 

  return (
    <div className="editorSection">
        <div className="editorButtons">
          <button  className="submitBtn" onClick={submissionHandler}>Submit</button>
          <button onClick = {RunClickHandler} className="runBtn">Run</button>
        </div>

        <div className="editorMain">
          <EditorWindow
            height="100%"
            defaultLanguage={props.props.defaultLang}
            theme="vs-dark"
            value = {code}
            onChange={handleCodeChange}
          />  
          {/* <textarea className="editorFooter" id = "output" placeholder='Output'></textarea> */}
        </div>
      </div>
  )
}

export default Editor