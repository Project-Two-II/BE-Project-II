import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import EditorWindow from "@monaco-editor/react";

import WorkerAPI from '../shared_web.js';
import './Editor.css'
import { Navigate, redirect } from 'react-router-dom';


const initialHeader = "#include <iostream>\n";


function Editor(props) {

  const token = useSelector((state) =>  state.token);
  const [code, setCode] = useState("")
  const [testCode, setTestCode] = useState("");

  var API = null;

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
    // test type verifier starts : checks if testCode actually contains a source code or expected string
    // If you just want to verify for output string
    // the test should contain something like this
    // Expected:Hello, World
    // For the above scenario, our program will check if Hello, World is written or not
    // It is somewhat stricter

    if (testCode.includes("Expected:")){
      var expected_output = testCode.slice(9)
    }


    //test type verifier ends
    var finalCode;
    if(expected_output) {
      API = new WorkerAPI(expected_output);
      finalCode = initialHeader + code;

    }
    else {
      API = new WorkerAPI(null)
      finalCode = initialHeader + code + testCode;
    }
    API.compileLinkRun(finalCode);
  }

  const submissionHandler = (e) => {
    e.preventDefault();
    console.log("Submission clicked")
    console.log(API)
    if(API !== null && API.getTestPassStatus()){
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
      fetch(`http://localhost:8000/api/submission/${props.props.courseId}/${props.props.chapterId}/${props.props.questionId}/submit/`, fetchOption)
          .then(resp => resp.json())
          .then(data => {
            console.log(fetchOption)
            console.log(data)
          })
          .catch(err => console.log(err))
    } else{
      console.log("Trying hard to navigate")
      redirect('testfail')
      // return <Navigate to={'testfail'}/>
    }
    
  }
  return (
    <div className="editorSection">
        <div className="editorButtons">
          <button type='button' className='submitBtn' onClick={submissionHandler}>Submit</button>
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
        </div>
      </div>
  )
}

export default Editor