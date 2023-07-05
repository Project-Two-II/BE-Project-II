import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const markdownStyle = {
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  padding: "10px",
  fontFamily: "monospace",
  fontSize: "14px",
  lineHeight: "1.4",
  color: "#333"
};

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter language={language} style={coy}>
        {value}
      </SyntaxHighlighter>
    );
  }
};

function Markdown() {
  const [description, setDescription] = useState([])
  function getDescription() {
    fetch("http://localhost:8000/api/subjects/1/chapters/1/questions/")
      .then(resp => resp.json())
      .then(data => {
        setDescription(data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDescription()
  }, []);
  
  
const list = description.map((desc) => desc.description)
const markdownContent = list[0];

  return (
    <div style={markdownStyle}>
      <ReactMarkdown plugins={[remarkGfm]} renderers={renderers}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;