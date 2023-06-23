import {React, useState} from 'react'
import EditorWindow from "@monaco-editor/react";

const initialHeader = "#include <iostream>\n";

const myMain = "int main(){try{}}"

function Editor({defaultLang, api}) {

  const [code, setCode] = useState("")

  const handleCodeChange = (code) => {
   setCode(code)
  }

  
  
  const RunClickHandler = (e) => {
    e.preventDefault();
    api.compileLinkRun(code);
  }
  
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
            <textarea className="editorFooter" placeholder='Message...'>
            </textarea>
            <textarea className="editorFooter" id = "output" placeholder='Output'>
            </textarea>
          </div>
  )
}

export default Editor