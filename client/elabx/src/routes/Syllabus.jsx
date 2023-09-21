import React from 'react'
import { useSelector } from 'react-redux'

import arrowIcon from '../media/arrowicon.png'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import CourseHeader from '../Components/CourseHeader.jsx'
import Header from '../Components/header'
import Footer from '../Components/Footer/Footer'

import '../App.css'

const iconStyle = {
    width: "5%",
    height: "80%"
}
const iconStyleSmall = {
    width: "5%",
    height: "70%"
}
const mainStyle = {
    backgroundColor: "#1F2334",
    display: "flex",
    flexDirection: "column",
    color: "white"
}
const chapterStyle = {
    height: "8vh",
    width: "80%",
    margin: "10px auto",
    fontSize: "1.2rem",
    display: "flex"
}
const listStyle = {
    height: "8vh",
    width: "80%",
    margin: "10px auto",
    fontSize: "1.2rem",
}
const questionStyle = {
    height: "8vh",
    width: "70%",
    margin: "auto",
    fontSize: "1rem",
    display: "flex"
}
const descStyle = {
    height: "8vh",
    width: "70%",
    margin: "auto",
    fontSize: "1rem",
    display: "flex",
    // flexDirection: "column"
}
const textStyle = {
    padding: '8px'
}

const completedBtnStyle = {
    backgroundColor: "#46A11C"
}
const solveBtnStyle = {
    backgroundColor: "yellow"
}
const lockBtnStyle = {
    backgroundColor: "red"
}
const create_btn_style = {
    color: "white",
    backgroundColor: "green",
    position: "absolute",
    right: "105px",
    width: "max-content"
  }
const enroll_btn_style = {
    color: "white",
    backgroundColor: "green",
    position: "absolute",
    right: "270px",
    width: "max-content"
  }
  

function Syllabus() {

    const param = useParams();
    const courseId = param.id;
    console.log("courseId:" + courseId)
    const token = useSelector((state) => state.token);
    const fetchOption = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    }

    const [course, setCourse] = useState([]);
    function getCourse() {

        fetch(`http://localhost:8000/api/subjects/${courseId}`, fetchOption)
            .then(resp => resp.json())
            .then(data => {
                setCourse(data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getCourse()
    }, [])

    const [chapterList, setChapterList] = useState([]);
    function getChapters() {
        fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setChapterList(data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getChapters()
    }, []);

    const [questionList, setQuestionList] = useState([]);
    function getQuestions() {
        fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/1/questions/`, fetchOption)
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
            <div className="main" style={mainStyle}>
                {/* <CourseHeader state={location.title}/> */} 
                <Link to="/addchapter">
                    <span className="btn create-btn" style={create_btn_style}>Add Chapter</span>
                </Link>
                {/* <Link to="/addquestion">
                    <span className="btn create-btn" style={create_btn_style}>Add Question</span>
                </Link> */}
                <Link to="/enroll">
                    <span className="btn enroll-btn" style={enroll_btn_style}>Enroll Student</span>
                </Link>
                <CourseHeader />
                {chapterList.map((chapter) =>
                (
                    <ol key={chapter.id}>
                            <li className="chapters" style={listStyle}>
                                <div className="chapters" sytle={chapterStyle}>{chapter.id}. {chapter.title}
                                    {/* <img src={arrowIcon} style={iconStyle}></img> */}
                                    {/* <span style={textStyle}>{chapter.id}. {chapter.title}</span> */}
                                </div>
                                <div className="chapter-description">
                                    {chapter.description}
                                </div>
                                {/* {questionList.map((question) =>
                                (
                                    <ul key={chapter.id}>
                                        <div className="questionList">
                                            <li>
                                                <div className="questions" style={questionStyle}>
                                                    <img src={arrowIcon} style={iconStyleSmall}></img>
                                                    <span style={textStyle}>{question.id}. {question.title}</span>
                                                </div>
                                                {
                                                    <Link to={`/syllabus/${chapter.id}/questionsolve/${question.id}`}>
                                                        <button className="statusBtn" style={solveBtnStyle}>Solve this</button>
                                                    </Link>
                                                    // <Link to='/questionSolve/{question.id}'>
                                                    //     <button className="statusBtn" style={solveBtnStyle}>Solve this</button>
                                                    // </Link>
                                                }
                                            </li>
                                        </div>
                                    </ul>
                                ))} */}
                            </li>
                    </ol>
                ))}
            </div>
            <Footer />
        </>
    )

}

export default Syllabus