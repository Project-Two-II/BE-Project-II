import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'


function Question(props) {
  return (
    <div className="question">
      <div className=" ques questionTitle">{props.state}</div>
      <div className="ques quesDesc">Ask a number as an input from the user and pass the input to the function and return the factorial.</div>
      <div className="ques quesTest"> //code goes here
      </div>
      <Link to='/'>
        <button className=" btn backBtn">back</button>
      </Link>
    </div>
  )
}

export default Question