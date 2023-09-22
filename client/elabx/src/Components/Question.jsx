import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
import Markdown from './markdown.jsx'

function Question({courseId, questionId}) {
  console.log("QuestionID: " + questionId )
  return (
    <div className="question">
        <Markdown courseId = {courseId} questionId = {questionId}/>
       <Link to={`/Syllabus/${courseId}/chapters/1`}>
        <button className=" btn backBtn">back</button>
       </Link>
    </div>
  )
}
// function Question({courseId, questionId, chapterId}) {
//   console.log("QuestionID: " + questionId )
//   console.log("ChapterID: " + ChapterId )
//   console.log("CourseID: " + CourseId )
//   return (
//     <div className="question">
//         <Markdown courseId = {courseId} questionId = {questionId}/>
//        <Link to={`/Syllabus/${courseId}/chapters/${chapterId}`}>
//         <button className=" btn backBtn">back</button>
//        </Link>
//     </div>
//   )
// }

export default Question