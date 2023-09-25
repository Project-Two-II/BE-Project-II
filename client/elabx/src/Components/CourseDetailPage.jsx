import React, { useState, useEffect } from 'react';
import Header from './header';
import { Link, Outlet, useParams, useLocation, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux'


import './Dashboard/dashboard.css'

const titleStyle = {
  textAlign: "center",
  opacity: 0.7
}

const listStyle = {
  display: "inline-block"
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
  let query = useQuery();
  const param = useParams();
  const courseId = param.subId;
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

  useEffect(() => {
    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption)
      .then(resp => resp.json())
      .then(data => {
        setChapters(data)
        console.log(data)
        // console.log("Fetched sth")
      })
      .catch(err => console.log(err))
  }, [])

  // const routeTo = "/syllabus/" + course.id + `?title=${course.title}`
  // const route = `chapters/${chapter.id}/questions/`+`?title=${courseTitle}`

  return (
    <>
    <Header SearchBar={false} />
    <div className="main-body">
      <div id="sidebar">
        <h1>Chapter List</h1>
        <nav>
          <ul>
            {
              chapters.map((chapter, index) => (
                <li key={index}>
                 <Link style={listStyle} to={`chapters/${chapter.id}/questions`}>{index + 1}. {chapter.title}</Link>
              </li>
              ))
            }
          </ul>
        </nav>
      </div>

        <div id="detail">
          <h3 style={titleStyle}>{courseTitle}</h3>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;
