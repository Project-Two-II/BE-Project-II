import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Create.css'
import '../../App.css'
import { useNavigate } from 'react-router-dom';

const UpdateQuestion = () => {

  const param = useParams('');
  const courseId = param.subId;
  const chapterId = param.chapterId;
  const questionId = param.questionId;

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)

  if (!isLoggedIn) {
    navigate("/login")
    return
  } else if (!role) {
    navigate("/home")
    return
  }

  // const [questionId, setQuestionId] = useState('')
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('')
  const [boilerplateText, setBoilerplateText] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [message, setMessage] = useState('')


  const updateQuestionOption = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      "title": questionTitle,
      "description": questionDescription,
      "boilerplate": boilerplateText,
    })
  }

  const updateTestOption = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      "source_code": testDescription
    })
  }

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  useEffect(() => {
    const fetchQuestion = async () => {

      try {
        const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`, fetchOption);
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        // setQuestionId(data);
        // console.log(data)
        setQuestionTitle(data.title)
        setQuestionDescription(data.description)
        setBoilerplateText(data.boilerplate)
        
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    };
    fetchQuestion();
    
    const fetchTest  = async() => {
      try{
        const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/test/`, fetchOption);
        console.log(response)
        if(!response.ok){
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setTestDescription(data.source_code)
        // console.log(data)
      } catch(error){
        console.log("Error fetching data: ", error)
      }
    };
    fetchTest();

  }, [])

  const handleSubmission = async (e) => {
    e.preventDefault();
    setMessage(' ');
    console.log('Question Title:', questionTitle);
    console.log('Question Description:', questionDescription);
    console.log('Boilerplate Code:', boilerplateText);
    console.log('Test Description:', testDescription);
    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`, updateQuestionOption)
      .then((resp) => {
        return resp.json()
      })
      .then((data) => {
        console.log(data);
        setMessage(data.detail);
      })
      .catch(err => console.log(err))

      fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/test/`,updateTestOption)
      .then((resp)=>{
        return resp.json()
      })
      .then((data) => {
        console.log(data);
        setMessage(data.detail);
      })
      .catch(err => console.log(err))
      navigate('prompt')
  }

  return (
    <div className="my-container">
      <div className="left-column" style={{ fontFamily: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif" }}>
        <h2>Add Question</h2>
        <div className="input-group">
          <label htmlFor="questionTitle">Question Title:</label>
        </div>
        <input
          type="text"
          id="questionTitle"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
          placeholder="Enter question title"
          style={{ height: "80px", width: 500, resize: "vertical" }}
        />

        <div className="input-group">
          <label htmlFor="questionDescription">Question Description:</label>
        </div>
        <textarea
          id="questionDescription"
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
          placeholder="Enter question description"
        />

        <div className="input-group">
          <label htmlFor="boilerplate">Boilerplate Code:</label>
        </div>
        <textarea
          id="boilerplate"
          value={boilerplateText}
          onChange={(e) => setBoilerplateText(e.target.value)}
          placeholder="Enter boilerplate code"
          style={{ height: "200px", resize: "vertical" }}
        />
      </div>

      <div className="right-column">
        <h2>Test</h2>
        {/* <div className="box"></div> */}

        <div className="input-group">
          <label htmlFor="testDescription">Test Description:</label>
        </div>
        <textarea
          id="testDescription"
          value={testDescription}
          onChange={(e) => setTestDescription(e.target.value)}
          style={{ height: "300px", width: "400px", resize: "vertical" }}
        />
        <button className="add-question-button btn-hover" onClick={handleSubmission}>
          Add Question
        </button>
      </div>
    </div>
  );
}

export default UpdateQuestion;
