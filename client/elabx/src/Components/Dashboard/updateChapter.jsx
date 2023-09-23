import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Create.css'
import { useNavigate } from 'react-router-dom';

const UpdateChapter = () => {

  const param = useParams('');
  const courseId = param.subId;
  const chapterId = param.chapterId;

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

  const [chapter, setChapter] = useState('')
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [message, setMessage] = useState('')

  const updateOption = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
        "title": chapterName,
        "description": chapterDescription,
    })
  }

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const handleChapterDescriptionChange = (e) => {
    setChapterDescription(e.target.value);
  };

 useEffect(()=>{
     const fetchChapter = async() => {

         try{
             const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/`, fetchOption);
             console.log(response)
             if (!response.ok) {
                 throw new Error("Network response was not ok.");
                }
                const data = await response.json();
                setChapter(data);
                // console.log(data)
                setChapterName(data.title)
                setChapterDescription(data.description)
                
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

      fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/`, updateOption)
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
        <label htmlFor="chapterName">Chapter Name:</label>
        <input
          name="chapterName"
          id="chapterName"
          value={chapterName}
          onChange={handleChapterNameChange}
          required
          placeholder="Enter Chapter Name"
        />
      </div>

      <div className="inputGroup">
        <label htmlFor="chapterDescription">Chapter Description:</label>
        <textarea
          name="chapterDescription"
          id="chapterDescription"
          value={chapterDescription}
          onChange={handleChapterDescriptionChange}
          required
          placeholder="Enter Chapter Description"
        />
      </div>

      <div className="buttonGroup">
        <button className="btn createBtn" type="button" onClick={handleSubmission}>
          Create
        </button>
      </div>
    </form>
  </div>

  );
}

export default UpdateChapter;
