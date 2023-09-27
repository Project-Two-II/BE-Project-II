import { Link, useParams } from "react-router-dom";

import { useNavigate } from 'react-router-dom';


import { useSelector } from 'react-redux';


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
          <p>Student Added Sucessfully.{type}</p>
          <div className="button-container">
            <button onClick={goBack}>OK</button>

          </div>
        </div>
      </div>
    </div>
  )    
}

export default Delete;

