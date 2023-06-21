import React from 'react'
import EditorWindow from "@monaco-editor/react";

function Editor(defaultLang) {
  return (
    <div className="editorSection">
            <div className="editorButtons">
              <button className=" btn submitBtn">Submit</button>
              <button className="btn runBtn">Run</button>
            </div>
            <EditorWindow
              height="50vh"
              width="100%"

              defaultLanguage={defaultLang}
              theme="vs-dark"
            />
            <textarea className="editorFooter" placeholder='Message...'>
            </textarea>
            <textarea className="editorFooter" placeholder='Output'>
            </textarea>
          </div>
  )
}

export default Editor