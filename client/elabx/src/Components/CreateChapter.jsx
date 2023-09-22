import React, { useState } from 'react';
import './Create.css';

import { useSelector } from 'react-redux'
import {  useParams, useLocation } from 'react-router-dom'


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}  

const CreateChapter = () => {

   const token = useSelector((state) => state.token);

    const param = useParams();
    const courseId = param.subId;

  const [chapterName, setChapterName] = useState('');
  const [chapterDescription, setChapterDescription] = useState('');

  const handleChapterNameChange = (e) => {
    setChapterName(e.target.value);
  };

  const handleChapterDescriptionChange = (e) => {
    setChapterDescription(e.target.value);
  };

  const handleSubmission = (e) =>{
    e.preventDefault();


    const fetchOption = {
      method: "POST",
      headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        "title": chapterName,
        "description": chapterDescription,
      })
  }

    fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption)
    .then(resp => resp.json())
            .then(data => {
              // todo: add a success message
              console.log(data)
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
};

export default CreateChapter;