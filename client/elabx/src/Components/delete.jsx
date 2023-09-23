import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Delete = ({type}) => {
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
        reqURL = `/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`
    }
    else if (type == "Chapter"){
    reqURL = `/api/subjects/${courseId}/chapters/${chapterId}/`
    }
    else if (type == "Question"){
    reqURL = `/api/subjects/${courseId}/`
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
    <h1></h1>
  )    
}

