import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux'


import './Dashboard/dashboard.css'

const listStyle = {
    width: "100%",
    margin: "30px"
}

const btnStyle = {
    textDecoration: "none",
    float: "right",
    padding: "5px",
    width: "150px",
    backgroundColor: "green",
    color: "white",
    margin: "auto",
    border: "none",
    borderRadius: "8px",
    textAlign: "center"
}


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}


const ChapterDetail = () => {
    let [question, setQuestion] = useState([]);
    let query = useQuery();
    const param = useParams();
    const courseId = param.subId;
    const chapterId = param.chapterId;
    // console.log("courseId:" + courseId)
    // console.log("chapterId:" + chapterId)

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


    return (
        <div>
            <ul>
                {question.map((q, index) => (
                    <li style={listStyle} key={index + 1}>
                        <span>{index + 1}. {q.title}</span>
                        <span>
                            <Link style={btnStyle} to={`/syllabus/${courseId}/chapters/${chapterId}/questionsolve/${q.id}/`}>Solve Question</Link>
                        </span>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ChapterDetail;