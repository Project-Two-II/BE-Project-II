import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react'
import { useSelector} from 'react-redux'

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

function Markdown({courseId, questionId}) {

  const token = useSelector((state) =>  state.token);

  
  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer  " +  token
    },
  }

  const [description, setDescription] = useState([])
  function getDescription() {
    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${courseId}/questions/${questionId}/`, fetchOption)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.description)
        setDescription(data.description)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDescription()
  }, []);
  
  
const list = description.map(desc => desc.description)
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
