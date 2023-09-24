import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';


import { useSelector } from 'react-redux';
import './Create.css';

const Delete = ({type}) => {
    const token = useSelector((state) => state.token)
    const navigate = useNavigate();

    let param = useParams();
    let courseId = param.subId;
    const fetchOption = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    } 
    
    var reqURL;
    var questionId;
    var chapterId;
    if (type == "Question"){
        chapterId = param.chapterId;
        questionId = param.questionId;
        reqURL = `http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`
    }
    else if (type == "Chapter"){
        chapterId = param.chapterId;
        reqURL = `http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/`
    }
    else if (type == "Course"){
        reqURL = `http://localhost:8000/api/subjects/${courseId}/`
    }

    const del = () => {
     fetch(reqURL, fetchOption)
     .then((resp) => {return resp.json()})
     .then(data => {
        console.log(data)
     })
    .catch( err => console.log(err))
    //  navigate("/dashboard/courses/")
    }
  return(
    <div className="delete-dialog-overlay">
      <div className="delete-dialog">
        <div className="delete-dialog-content">
          <p>Are you sure you want to delete this item?</p>
          <div className="button-container">
            <button onClick={del}>Yes</button>
            {type === "Course" ? <Link to={`/dashboard/courses/`}>No</Link> : ''}
            {type === "Chapter" ? <Link to={`/dashboard/courses/${courseId}/chapters/`}>No</Link> : ''}
            {type === "Question" ? <Link to={`/dashboard/courses/{courseId}/chapters/${chapterId}/`}>No</Link> : ''}

          </div>
        </div>
      </div>
    </div>
  )    
}

export default Delete;

