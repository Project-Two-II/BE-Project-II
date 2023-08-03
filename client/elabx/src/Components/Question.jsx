import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
import Markdown from './markdown.jsx'

function Question({courseId, chapterId}) {
  console.log("QuestionID: " + chapterId )
  return (
    <div className="question">
        <Markdown courseId = {courseId} questionId = {chapterId}/>
       <Link to={`/Syllabus/${courseId}`}>
        <button className=" btn backBtn">back</button>
       </Link>
    </div>
  )
}

export default Question