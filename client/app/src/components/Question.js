import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'


function Question() {
  return (
    <div className="question">
      <div className=" ques questionTitle">1. Write a C++ program to print the factorial of a number</div>
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