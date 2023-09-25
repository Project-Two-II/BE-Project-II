import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useParams, useLocation, Navigate } from 'react-router-dom';

// const chapters = [
//   { id: 1, subjectId: 1, name: 'Introduction to C Programming' },
//   { id: 2, subjectId: 1, name: 'Data Types and Operators' },
//   { id: 3, subjectId: 1, name: 'Control Structures' },
//   { id: 4, subjectId: 1, name: 'Functions and Arrays' },
//   { id: 5, subjectId: 1, name: 'Pointers and Strings' },
// ];

const tableStyle = {
  borderCollapse: 'collapse',
  width: '80%',
  margin: '20px auto',
};

const thTdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  textAlign: 'left',
};

const headerStyle = {
  backgroundColor: '#f2f2f2',
};


function ChapterList() {
  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const param = useParams()
  let query = useQuery();
  
  const courseId = param.subId  
  const courseTitle = query.get("title");

  const [chapters, setChapters] = useState([])
  const [course, setCourse] = useState([])
  const token = useSelector((state) => state.token);

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  const handleViewRemarks = (chapterId) => {
    alert(`Viewing remarks for Chapter ${chapterId}`);
  };

  useEffect(() => {

    const fetchCourse = () => {

      fetch(`http://localhost:8000/api/subjects/${courseId}/`, fetchOption)
      .then(resp => resp.json())
      .then(data => {
        setCourse(data)
        console.log(data)
        // console.log("Fetched sth")
      })
      .catch(err => console.log(err))
    }
    fetchCourse();

    const fetchChapters=() => {
      fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption)
      .then((resp) => {
        return resp.json()
      })
      .then(data => {
        console.log()
        // const newdata = JSON.parse(data)
        setChapters(data)
        console.log(chapters)
        // console.log(chapters)
      })
      .catch(err => console.log(err))
    }
    fetchChapters();
  }, [])

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...headerStyle }}>S.No</th>
            <th style={thTdStyle}>Chapter</th>
            <th style={thTdStyle}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter, index) => (
            <tr key={chapter.id}>
              <td style={thTdStyle}>{chapter.id}</td>
              <td style={thTdStyle}>{chapter.title}</td>
              <td style={thTdStyle}>
                <Link to={`${chapter.id}/viewquestions`}>
                  <button
                    className="view-button"
                  // onClick={() => handleViewRemarks(chapter.id)}
                  >
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ChapterList;
