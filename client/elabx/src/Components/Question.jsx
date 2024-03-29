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
    </div>
  )
}
export default Question;