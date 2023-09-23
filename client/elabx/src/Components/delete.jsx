import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector } from 'react-redux';
import './Create.css';

const Delete = ({type}) => {
    const token = useSelector((state) => state.token)

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
    if (type == "Question"){
        let chapterId = param.chapterId;
        let questionId = param.questionId;
        reqURL = `http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`
    }
    else if (type == "Chapter"){
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
    }
    useEffect(del, [])
  return(
    <div className="delete-dialog-overlay">
      <div className="delete-dialog">
        <div className="delete-dialog-content">
          <p>Are you sure you want to delete this item?</p>
          <div className="button-container">
            <button onClick={del}>Yes</button>
            <Link>No</Link>
          </div>
        </div>
      </div>
    </div>
  )    
}

export default Delete;

