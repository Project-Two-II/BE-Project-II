import {React, useState} from 'react';

import './UserInput.css'

import {Remarkable} from 'remarkable';

import '../App.css';

const splitStyle = {
    display: "flex",
}

const md = new Remarkable();

const previewStyle = {
    backgroundColor:"#21262d",
    color: "white",
    width:"50%",
    height:"100vh",
    padding: "10px",
}

const PreviewMd = (props) => {
     console.log(props.userText)
    return(
      <div 
      style={previewStyle}
      dangerouslySetInnerHTML={{
        __html: md.render(props.userText)
      }}>
      </div>
     
    );
}

const AddQuestion = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const HandleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const HandleDescChange = (e) => {
        setDesc(e.target.value)
    }
    console.log(title);
    return(
        <div style={splitStyle}>
          <div className="formContainer">
           <form className="ipContainer">
             <label htmlFor="title">Title:</label>
             <input name = "title" id ="title" value = {title} onChange={HandleTitleChange} required/>
             <label htmlFor="description">Description:</label>
             <textarea name = "description" id ="description" value={desc}  onChange ={HandleDescChange} required></textarea>
            
            <button id = "submit" className = "btn" type = "submit">Add</button>
          </form>
        </div>
          <PreviewMd userText={title + '\n' + desc}/>
        </div>
    )
}

export default AddQuestion;
