import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function QuestionList() {


  const tableStyle = {
    borderCollapse: 'collapse',
    width: '80%',
    margin: '20px auto',
    border: '1px solid #ccc',
  };

  const thTdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  };

  const headerStyle = {
    backgroundColor: '#f2f2f2',
  };

  const [selectedCode, setSelectedCode] = useState(null);
  
  const param = useParams()
  const courseId = param.subId
  const chapterId = param.chapterId
  const [questions, setQuestions] = useState([])
  const [chapter, setChapter] = useState([])
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
  
  const handleViewCode = (code) => {
    setSelectedCode(code);
  };
  useEffect(() => {

    const fetchChapters = () => {
      fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/`, fetchOption)
        .then((resp) => {
          return resp.json()
        })
        .then(data => {
          setChapter(data)
          console.log(data)
        })
        .catch(err => console.log(err))
    }
    fetchChapters();

    const fetchQuestions = () => {
      fetch(`http://localhost:8000/api/report/subjects/${courseId}/${chapterId}/`, fetchOption)
        .then((resp) => {
          return resp.json()
        })
        .then(data => {
          console.log(data)
          // console.log(JSON.parse(data))
          // const newdata = JSON.parse(data)
          // setQuestions(JSON.parse(data))
          setQuestions(data)
          // console.log(questions)
          // console.log(chapters)
        })
        .catch(err => console.log(err))
    }
    fetchQuestions();
  }, [])

  return (
    <div>
      <h3>{chapter.title}</h3>
      <p>{chapter.description}</p>
      <table style={tableStyle} className="question-table">
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...headerStyle }}>S.No</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Question</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Status</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Marks</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Comment </th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Code</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{index + 1}</td>
              <td style={thTdStyle}>{question.question_name}</td>
              <td style={thTdStyle}>{question.status}</td>
              <td style={thTdStyle}>{question.marks}</td>
              <td style={thTdStyle}>{question.review}</td>
              <td style={thTdStyle}>
                <button className="view-button"
                  onClick={() => handleViewCode(question.code_no)}
                >
                  View Code
                </button>
                {selectedCode === question.code_no && (
                  <div>
                    <pre>{question.solution}</pre>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionList;
