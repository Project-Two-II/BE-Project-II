import { useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';


import { useSelector } from 'react-redux';
import './Create.css';

const btnContainerStyle = {
  display: "flex",
  justifyContent: "flex-end"
}

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
     .then((resp) => {
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      navigate(-1)
    })
    .catch( err => console.log(err))
    }

    const goBack = () => {
      navigate(-1)
    }
  return(
    <div className="delete-dialog-overlay">
      <div className="delete-dialog">
        <div className="delete-dialog-content">
          <p>Are you sure you want to delete this {type}?</p>
          <div style={btnContainerStyle}>
            <button style={{margin:"4px"}} onClick={del}>Yes</button>
            <button style={{margin:"4px"}} onClick={goBack}>No</button>
          </div>
        </div>
      </div>
    </div>
  )    
}

export default Delete;

