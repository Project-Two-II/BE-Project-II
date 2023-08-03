import React from 'react';
import { useParams } from 'react-router-dom';
import Question from '../Components/Question.jsx';
import Editor from '../Components/Editor.jsx'
import CourseHeader from '../Components/CourseHeader'


import '../App.css';


function QuestionSolve({my_api}) {
  const param = useParams();
  console.log(param)
  const courseId = param.courseId;
  const chapterId = param.questionId;
  return (
    <>
    <CourseHeader />
    <div className="body">
      <Question chapterId={chapterId} courseId={courseId}/>
      <Editor defaultLang = "cpp" api = {my_api} />
    </div>
    </>
  );
}

export default QuestionSolve;
