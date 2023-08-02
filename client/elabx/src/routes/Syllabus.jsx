import React from 'react'
import { useSelector} from 'react-redux'

import arrowIcon from '../media/arrowicon.png'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState} from 'react';
import CourseHeader from '../Components/CourseHeader.jsx'

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
const questionStyle = {
    height: "8vh",
    width: "70%",
    margin: "auto",
    fontSize: "1rem",
    display: "flex"
}
const descStyle = {
    height: "8vh",
    width: "60%",
    margin: "auto",
    fontSize: "1rem",
    display: "flex",
    flexDirection: "column"
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


function Syllabus() {

    const param = useParams();
    const chapterId = param.id;
    console.log("ChapterID:" + chapterId)
    const token = useSelector((state) =>  state.token);
    const fetchOption = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " +  token
        },
      }

    const [course, setCourse] = useState([]);
    function getCourse() {
        
        fetch(`http://localhost:8000/api/subjects/${chapterId}`, fetchOption)
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
        fetch(`http://localhost:8000/api/subjects/${chapterId}/chapters/`,fetchOption)
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
        fetch(`http://localhost:8000/api/subjects/${chapterId}/chapters/${chapterId}/questions/`,fetchOption)
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
        <div className="main" style={mainStyle}>
            {/* <CourseHeader state={location.title}/> */}
            <CourseHeader />
            {chapterList.map((chapter) =>
            (
                <ul>
                    <div className="chapterList">
                        <li>
                            <div className="chapters" style={chapterStyle}>
                                <img src={arrowIcon} style={iconStyle}></img>
                                <span style={textStyle}>{chapter.id}. {chapter.title}</span>
                            </div>
                            {questionList.map((question) =>
                            (
                                <ul>
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
                            ))}
                        </li>
                    </div>
                </ul>
            ))}
        </div>
    )

}

export default Syllabus