import React from 'react'

import { useSelector } from 'react-redux'

import arrowIcon from '../media/arrowicon.png'
import { Link, useParams, useLocation } from 'react-router-dom'
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
const chapterStyle = {
    height: "8vh",
    width: "80%",
    margin: "10px auto",
    fontSize: "1.2rem",
}
const listStyle = {
    width: "80%",
    margin: "auto",
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
    fontSize: "1rem"
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

  
  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }  

function Syllabus({ course }) {
    // const routeTo = "/syllabus/" + course.id + `?title=${course.title}`

    let query = useQuery();
    const param = useParams();
    const courseId = param.id;
    const courseTitle = query.get("title");
    console.log("courseId:" + courseId)
    console.log("courseTitle:" + courseTitle)
    const token = useSelector((state) => state.token);
    const fetchOption = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
    }
    // const [course, setCourse] = useState([]);
    // function getCourse() {

    //     fetch(`http://localhost:8000/api/subjects/${courseId}`, fetchOption)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             setCourse(data)
    //         })
    //         .catch(err => console.log(err))
    // }
    // useEffect(() => {
    //     getCourse()
    // }, [])

    const [chapterList, setChapterList] = useState([])
    function getChapters() {
        fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setChapterList(data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getChapters()
    }, []);

    return (
        <>
            <Header />
            <div className="main">
                {/* <CourseHeader state={location.title}/> */} 
                <Link to="/addchapter">
                    <span className="btn create-btn" style={create_btn_style}>Add Chapter</span>
                </Link>
                <Link to="/enroll">
                    <span className="btn enroll-btn" style={enroll_btn_style}>Enroll Student</span>
                </Link>
                {/* <CourseHeader /> */}
                <div><span style={headerStyle}>{courseTitle}</span></div>
                {chapterList.map((chapter) =>
                (
                    <ol key={chapter.id}>
                        <Link to={`/syllabus/${courseId}/chapters/${chapter.id}/questions/`} className="route-link">
                            <li className="chapter-list" style={listStyle}>
                                <div className="chapters">{chapter.id}. {chapter.title}
                                </div>
                                <div className="chapter-description" style={textStyle}>
                                    {chapter.description}
                                </div>
                            </li>
                        </Link>
                    </ol>
                ))}
            </div>
            <Footer />
        </>
    )

}

export default Syllabus