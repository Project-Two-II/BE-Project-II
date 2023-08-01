import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
import Markdown from './markdown.jsx'

function Question(props) {
  return (
    <div className="question">
      <div className=" ques questionTitle">Hello World</div>
      <div className="ques quesDesc">this is a desc</div>
        <Markdown />
      <Link to='/Syllabus'>
        <button className=" btn backBtn">back</button>
      </Link>
    </div>
  )
}

export default Question