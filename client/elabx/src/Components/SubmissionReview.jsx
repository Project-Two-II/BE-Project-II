import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './Footer/Footer';
import './Create.css';
import { useEffect } from 'react';

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
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

const listStyle = {
  width: "100%",
  margin: "30px"
}

const questionCellStyle = { 
  width: '200 %'
};

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

const submissionStyle = {
  margin: "20px"
}

function CQuestionList() {
  const param = useParams();
  const courseId = param.subId;
  const studentId = param.studentId;
  const chapterId = param.chapterId;

  const token = useSelector((state) => state.token);
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([]);

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/`, fetchOption)
      .then((resp) => {
        return resp.json()
      })
      .then(data => {
        setQuestions(data)
      })
  }, [])

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [marksInput, setMarksInput] = useState(0);
  const [reviewInput, setReviewInput] = useState('');
  const [submission, setSubmission] = useState([]);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId === selectedQuestion ? null : questionId);
    const fetchSubmission = () => {
      fetch(`http://localhost:8000/api/report/subjects/${courseId}/${chapterId}/${questionId}/students/${studentId}/`, fetchOption)
        .then((resp) => {
          return resp.json()
        })
        .then(data => {
          console.log(JSON.parse(data))
          setSubmission(JSON.parse(data))
          setMarksInput(JSON.parse(data).marks)
          setReviewInput(JSON.parse(data).review)

          
          // console.log(data)
        })
        .catch(err => console.log(err))
    }
    fetchSubmission();
  }

  const handleMarksInputChange = (event) => {
    setMarksInput(event.target.value);
  };

  const handleReviewInputChange = (event) => {
    setReviewInput(event.target.value);
  };

  const setMarksOption = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      "marks": parseInt(marksInput)
    })
  }

  const setReviewOption = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      "message": reviewInput
    })
  }

  const handleSubmitReview = (questionId, submissionId) => {
    fetch(`http://localhost:8000/api/submission/${courseId}/${chapterId}/${questionId}/${submissionId}/result/`, setMarksOption)
      .then((resp) => {
        return resp.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))

    fetch(`http://localhost:8000/api/submission/${courseId}/${chapterId}/${questionId}/${submissionId}/review/`, setReviewOption)
      .then((resp) => {
        return resp.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))

      navigate(`prompt`)
  };

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Question</th>
            <th style={headerStyle}>View Submission</th>
          </tr>
        </thead>
        <tbody>

          {questions.map((q, index) => (
            <tr key={index + 1}>
              <td style={thTdStyle}>{q.title}</td>
              <td style={thTdStyle}>
                <button style={btnStyle} onClick={() => handleQuestionClick(q.id)}>
                  View Submission
                </button>
                {selectedQuestion && (
        <div style={submissionStyle}>
          <p>Status: {submission.status === 0 ? 'Not Submitted' : 'Submitted'}</p>

          <div>
            <p>Marks:</p>
            <input
              type="number"
              value={marksInput}
              onChange={handleMarksInputChange}
            />
          </div>

          <div>
            <p>Code:</p>
            <div style={{ border: '1px solid #ccc', padding: '10px' }}>
              <pre>{submission.solution}</pre>
            </div>
          </div>

          <div>
            <p>Review:</p>
            <textarea
              rows="4"
              cols="50"
              value={reviewInput}
              onChange={handleReviewInputChange}
            />
          </div>
          <button onClick={() => handleSubmitReview(selectedQuestion, submission.submission_id)}>
            Submit Review
          </button>
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

export default CQuestionList;
