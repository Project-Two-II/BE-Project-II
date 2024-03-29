import React, { useState, useEffect } from 'react';
import Header from './header';
import { Link, Outlet, useParams, useLocation, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux'

import {BiSolidLockAlt} from 'react-icons/bi'


import './Dashboard/dashboard.css'

const titleStyle = {
  textAlign: "center",
  opacity: 0.7
}

const listStyle = {
  display: "inline-block",
}

const lockedStyle = {
  color: "green",
  display: "inline-block",

}

const btnStyle = {
  float: "right",
  padding: "15px",
  backgroundColor: "green",
  color: "white",
  margin: "5px",
  border: "none",
  borderRadius: "8px"
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const CourseDetailPage = () => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  if (!isLoggedIn) return <Navigate to={'/login'} />
  const role = useSelector((state) => state.role);
  if (role == 1) return <Navigate to={'/dashboard/home'} />

  let [chapters, setChapters] = useState([]);
  let [course, setCourse] = useState([])
  // let [isLocked, setLock] = useState(false)
  let query = useQuery();
  const param = useParams();
  const courseId = param.subId;
  // const courseTitle = query.get("title");
  console.log("courseId:" + courseId)
  const chapterId = param.chapterId
  console.log(chapterId)
  // console.log("courseTitle:" + courseTitle)
  const token = useSelector((state) => state.token);4

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
  }

  useEffect(() => {

    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption)
      .then(resp => resp.json())
      .then(data => {
        setChapters(data)
        console.log("Chapters",data)
        // console.log("Fetched sth")
      })
      .catch(err => console.log(err))


    fetch(`http://localhost:8000/api/subjects/${courseId}/`, fetchOption)
      .then(resp => resp.json())
      .then(data => {
        setCourse(data)
        console.log(data)
        // console.log("Fetched sth")
      })
      .catch(err => console.log(err))
  }, [])

  // const routeTo = "viewchapters" + `?title=${courseTitle}`;

  // const routeTo = "/syllabus/" + course.id + `?title=${course.title}`
  // const route = `chapters/${chapter.id}/questions/`+`?title=${courseTitle}`

  return (
    <>
      <Header SearchBar={false} />
      <div className="main-body">
        <div id="sidebar">
          <h1>Chapter List</h1>
          <Link to={`viewchapters`}>
            <button style={btnStyle}>View Progress</button>
          </Link>
          <nav>
            <ul>
              {
                chapters.map((chapter, index) => {
                  if(chapter.is_locked){
                    return(
                      <li key={index}>
                        <h6 style={lockedStyle}>{index + 1}. {chapter.title}</h6>
                        <BiSolidLockAlt size={18} color='green'/>
                      </li>
                   
                  )
                } else{
                  return(
                  <li key={index}>
                    <Link style={listStyle} to={`chapters/${chapter.id}/questions`}>{index + 1}. {chapter.title}</Link>
                  </li>
                )}
                 
                 })
              }
            </ul>
          </nav>
        </div>

        <div id="detail">
          <h2 style={titleStyle}>{course.code_no} : {course.title}</h2>
          {(chapterId === undefined) &&
            <p style={titleStyle}>{course.description}</p>
          }
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
