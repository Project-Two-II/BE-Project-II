import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdownStyle={
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "14px",
        lineHeight: "1.4",
        color: "#333"
}

function Markdown() {
  return (
    <div style={markdownStyle}>
        <ReactMarkdown >
            ```cpp
                this is where the **code** goes
            ```
        </ReactMarkdown>
    </div>
  )
}

export default Markdown