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
  const questionId = param.questionId;
  // const chapterId = param.chapterId;
  return (
    <>
    <CourseHeader />
    <div className="body">
      <Question questionId={questionId} courseId={courseId}/>
      {/* <Question questionId={questionId} courseId={courseId} chapterId={chapterId}/> */}
      <Editor defaultLang = "cpp" api = {my_api} />
    </div>
    </>
  );
}

export default QuestionSolve;
