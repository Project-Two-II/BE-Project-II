import { React, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


import Header from '../Components/header'
import Footer from '../Components/Footer/Footer'

import '../App.css'

const create_btn_style = {
    color: "white",
    backgroundColor: "green",
    width: "max-content",
    margin: "10px",
    position: "relative",
    right: "-1000px"
}
const headerStyle = {
    height: "fit-content",
    backgroundColor: "#1f2334",
    color: "white",
    fontSize: "2.3rem",
    textDecoration: "underline",
    marginBottom: "25px",
    position: "relative",
    right: "-150px"
}
const listStyle = {
    width: "80%",
    margin: "auto",
    fontSize: "1.2rem",
}
const textStyle = {
    padding: '8px'
}
const solveBtnStyle = {
    backgroundColor: "yellow"
}

function Questions() {
    const param = useParams();
    const courseId = param.subId;
    const chapterId = param.chapterId
    const token = useSelector((state) => state.token);
    const fetchOption = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    }

    const [questionList, setQuestionList] = useState([]);
    function getQuestions() {
            fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/`, fetchOption)
            .then(resp => resp.json())
            .then(data => {
                setQuestionList(data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getQuestions()
    }, []);
    return (
        <>
            <Header />
            <div className="main">
                <div>
                    <Link to="/addquestion">
                        <span className="btn create-btn" style={create_btn_style}>Add Question</span>
                    </Link>
                </div>
                <div style={headerStyle}>
                    <span>course</span>
                </div>
                <div>
                    {questionList.map((question) => (
                        <ol key={question.id}>
                            <li className="question-list" style={listStyle}>
                                <div className="questions">{question.id}. {question.title}</div>
                                <div className="question-description" style={textStyle}>{question.description}</div>
                                <div>
                                    <Link to={`/syllabus/${courseId}/chapters/${chapterId}/questionSolve/${question.id}`}>
                                        <button className="statusBtn" style={solveBtnStyle}>Solve this</button>
                                    </Link>
                                </div>
                            </li>
                        </ol>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Questions