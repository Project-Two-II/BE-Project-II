import {React, useState} from 'react';

import './UserInput.css'

import '../App.css';

const CreateCourse = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const HandleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const HandleDescChange = (e) => {
        setDesc(e.target.value)
    }
    return(
          <div className="formContainer">
           <form className="ipContainer">
             <label htmlFor="title">CourseTitle:</label>
             <input name = "title" id ="title" value = {title} onChange={HandleTitleChange} required/>
             <label htmlFor="description">Course Description:</label>
             <textarea name = "description" id ="description" value={desc}  onChange ={HandleDescChange} required></textarea>
            
            <button id = "submit" className = "btn" type = "submit">Create</button>
          </form>
        </div>
    )
}

export default CreateCourse;