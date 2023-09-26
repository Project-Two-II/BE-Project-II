import React, { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'


function QuestionList() {

  const containerStyle = {
    backgroundColor: '#1E2D3B',
    color: 'white',
    padding: '20px',
    minHeight: '100vh',
  };

  const chapterContainerStyle = {
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, minmax(20px, 1fr))',
    gridGap: '10px',
  };

  const chapterTitleStyle = {
    margin: '0',
    padding: '10px',
    backgroundColor: '#5B718B',
    borderRadius: '5px',
    color: 'white',
    textAlign: 'center'
  };

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


  const titleStyle = {
    textAlign: "center",
    opacity: 0.7
  }

  const [selectedChapter, setSelectedChapter] = useState(null);

  const param = useParams();
  const courseId = param.subId;
  const studentId = param.studentId;

  const token = useSelector((state) => state.token);
  const [chapters, setChapters] = useState([]);
  const [course, setCourse] = useState({})

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8000/api/subjects/${courseId}/`, fetchOption)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data)
        setCourse(data)
      })
      .catch(err => console.log(err))

    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data)
        setChapters(data)

      })
      .catch(err => console.log(err))


  }, [])

  return (
    <div>
      <div>
        <h2 style={titleStyle}>{course.code_no} : {course.title}</h2>
        <p style={titleStyle}>{course.description}</p>
        <Outlet />
      </div>
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
                <Link to={`${chapter.id}/questions`}>
                  <button className="view-button">
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

export default QuestionList;
