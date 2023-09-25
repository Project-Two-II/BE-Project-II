import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from './header';
import Footer from './Footer/Footer';
import './Create.css'
import { useEffect } from 'react';



/*
const questions = [
  {
    id: 1,
    question: '1. Write a C program to print "Hello, World!"',
    code: '#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}',
    status: 1, // 0 for not submitted, 1 for submitted
    marks: 0, // Initialize marks to 0
    review: '', // Initialize review to an empty string
  },
  {
    id: 2,
    question: '2. Write a C program to add two numbers',
    code: '#include <stdio.h>\nint main() {\n    int num1, num2, sum;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &num1, &num2);\n    sum = num1 + num2;\n    printf("Sum = %d", sum);\n    return 0;\n}',
    status: 0,
    marks: 0,
    review: '',
  },
  // Add more questions here
];
*/

function CQuestionList() {

  const param = useParams();
  const courseId = param.subId;
  const studentId = param.studentId;
  const chapterId = param.chapterId;
  // console.log(chapterId);

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
    setMarksInput(0);
    setReviewInput('');
  };

  return (
    <div>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <button onClick={() => handleQuestionClick(q.id)}>
              {q.title}
            </button>
            {selectedQuestion === q.id && (

              <div>
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
                  <p>{submission.solution}</p>
                  {/* <pre>{submission.solution}</pre> */}
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

/*

*/
