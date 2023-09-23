import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Create.css'
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

  const [question, setQuestion] = useState('')
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionDescription, setQuestionDescription] = useState('')
  const [boilerplateText, setBoilerplateText] = useState('');
  const [message, setMessage] = useState('')


  const updateOption = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
        "title": questionTitle,
        "description": questionDescription,
        "boilerplate":boilerplateText
    })
  }

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  const handleQuestionChange = (e) => {
    setQuestionTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setQuestionDescription(e.target.value)
  }

  const handleBoilerplateChange = (e) => {
    setBoilerplateText(e.target.value);
  }


 useEffect(()=>{
     const fetchChapter = async() => {

         try{
             const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`, fetchOption);
             console.log(response)
             if (!response.ok) {
                 throw new Error("Network response was not ok.");
                }
                const data = await response.json();
                setQuestion(data);
                // console.log(data)
                setQuestionTitle(data.title)
                setQuestionDescription(data.description)
                setBoilerplateText(data.boilerplate)
                
            } catch(error)
            {
                console.error("Error fetching data: ", error)
            }
        };
        fetchChapter();
 },[])

 const handleSubmission = async(e) => {
    e.preventDefault();
    setMessage(' ');

      fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/${questionId}/`, updateOption)
        .then((resp) => {
          return resp.json()
        })
        .then((data) => {
          console.log(data);
          setMessage(data.detail);
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="formContainer">
      <form className="ipContainer">
        <div className="inputGroup">
        </div>
          <div className="inputGroup">
            <label >Question Title:</label>
            <input value={questionTitle} onChange={handleQuestionChange} required />
            <label>Question Description:</label>
            <div className="questionGroup">
              <textarea
                value={questionDescription}
                onChange={handleDescriptionChange}
                required
              />
            </div>
          </div>
      

        
        <div className="inputGroup">
          <label htmlFor="boilerplateText">Boilerplate Text:</label>
          <textarea
            name="boilerplateText"
            id="boilerplateText"
            value={boilerplateText}
            onChange={handleBoilerplateChange}
            required
          />
        </div>
        <button className="btn" type="button" onClick={handleSubmission}>Add</button>
      </form>
    </div>
  );
}

export default UpdateQuestion;
