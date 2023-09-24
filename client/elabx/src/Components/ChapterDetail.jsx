import React, { useState, useEffect } from 'react';
import Header from './header';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux'


import './Dashboard/dashboard.css'

const listStyle = {
  display : "inline-block"
}

const titleStyle = {
  textAlign : "center",
  opacity: 0.7
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}


const ChapterDetail = () => {
    let  [question, setQuestion] = useState([]);
    let query = useQuery();
    const param = useParams();
    const courseId = param.subId;
    const chapterId = param.chapterId;
    console.log("courseId:" + courseId)
    console.log("chapterId:" + chapterId)

    const token = useSelector((state) => state.token);
    const fetchOption = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    }

 useEffect(() => {
  fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/`, fetchOption)
  .then(resp => resp.json())
  .then(data => {
      setQuestion(data)
      console.log(data)
  })
  .catch(err => console.log(err))
 }, [])
    return(
        <ul>
            {question.map((q, index) => (
                <li key={index + 1}>
                    <Link to = {`/syllabus/${courseId}/chapters/${chapterId}/questionsolve/${q.id}/`}>{index + 1}. {q.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export default ChapterDetail;