import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Header from './header';
import Footer from './Footer/Footer';
import './Create.css'
import { useEffect } from 'react';

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

const listStyle = {
  width: "100%",
  margin: "30px"
}

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

const submissionStyle={
  margin: "20px"
}


function CQuestionList() {

  const param = useParams();
  const courseId = param.subId;
  const studentId = param.studentId;
  const chapterId = param.chapterId;

  const token = useSelector((state) => state.token);
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
        // console.log(data)
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
          console.log(data)
          setSubmission(JSON.parse(data))
          // console.log(data)
        })
        .catch(err => console.log(err))
    }
    fetchSubmission();
  }

  const handleMarksInputChange = (event) => {
    // Update the marks input when the teacher types
    setMarksInput(event.target.value);
  };

  const handleReviewInputChange = (event) => {
    // Update the review input when the teacher types
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
    // Logic to submit the review for the selected question
    console.log(marksInput)
    console.log(reviewInput)
    console.log(submissionId)
    console.log(questionId)
    console.log(setMarksOption)
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

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          marks: marksInput,
          review: reviewInput,
        };
      }
      return q;
    });

    // Update the questions state with the new data
    // You can replace this with your data storage logic
    // For now, we're just updating the state
    // In a real app, this data would likely be sent to a server or stored in a database
    // For example: send updatedQuestions to your API
    // console.log(updatedQuestions);

    // Clear the input fields
    // setMarksInput(0);
    // setReviewInput('');
  };

  return (

    <div>
      <ul>
        {questions.map((q, index) => (
          <li style={listStyle} key={index + 1}>
            <span>{index + 1}. {q.title}</span>
            <span>
              <button style={btnStyle} onClick={() => handleQuestionClick(q.id)}>View Submission</button>
            </span>
            {selectedQuestion === q.id && (

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
                  <pre>{submission.solution}</pre>
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

                <button onClick={() => handleSubmitReview(q.id, submission.submission_id)}>
                  Submit Review
                </button>
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default CQuestionList;
