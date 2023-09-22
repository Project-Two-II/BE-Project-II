import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
import Markdown from './markdown.jsx'

import { useParams} from 'react-router-dom'


function Question() {
    const param = useParams();
    const courseId = param.subId;
    const chapterId = param.chapterId;
    const questionId = param.questionId;
  return (
    <div className="question">
        <Markdown courseId = {courseId} chapterId = {chapterId} questionId = {questionId}/>
       <Link to={`/Syllabus/${courseId}`}>
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