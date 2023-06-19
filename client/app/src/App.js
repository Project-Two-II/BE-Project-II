import './App.css';
import Editor from "@monaco-editor/react";
import {React, useState} from 'react';

import WorkerAPI from './shared_web.js';


const EditorNav = (props) => {

  const navbarStyle = {
    background:"#0D1122",
    width: "100%",
    height: "10vh",
    marginTop: "-19px"
  }

  const btnStyle = {
     border: "1px solid black",
     outline:"none",
     padding: "5px",
     color: "white",
     background:"#6366f1",
     fontSize:"20px",
     cursor:"pointer",
     margin: "10px"
  }

  function RunClickHandler(e){
    e.preventDefault();
    props.my_api.compileLinkRun(props.sourceCode);
    
  }

  return(
    <nav style={navbarStyle}>
      <ul>
         <button onClick = {RunClickHandler} style={btnStyle}>Run</button>
      </ul>
    </nav>
  )
}

const EditorWindow = (myprops) => {

  const [code, setCode] = useState("")

  const handleCodeChange = (code) => {
   setCode(code)
  }

  let props = {
    sourceCode: code,
    my_api: myprops.API
  }

  const courseStyle = {
    height: "100vh",
    width: "50%",
    background: "#1F2334",
  }


  return (
    <>
      <EditorNav {...props}/>
      <div className="body">
        <div style = {courseStyle} className="course">
          <textarea id = "output" ></textarea>
        </div>

        <Editor
          height = "100vh"
          width = "50%"
          defaultLanguage= "cpp"
          theme= "vs-dark"
          value = {code}
          onChange={handleCodeChange}
        />
      </div>
    </>
  )
}


const  App = ({defaultLang}) => {

  // will create a new worker that works on background thread.
  let api = new WorkerAPI();

  return (
    <div className="App">
        <EditorWindow API = {api}/>
      </div>

  );
}

export default App;
