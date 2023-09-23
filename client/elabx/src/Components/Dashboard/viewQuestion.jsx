
import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';

import {useSelector } from 'react-redux'

import {AiFillEye, AiFillDelete} from 'react-icons/ai'
import {BiSolidPencil} from 'react-icons/bi'

import { Link, useParams } from 'react-router-dom';

const iconStyle = {
  cursor: "pointer",
  height: "20px",
  width: "40px",
  color: "black"
}

const btnStyle = {
    float: "right",
    padding: "15px",
    backgroundColor: "green",
    color: "white",
    marginBottom: "5px",
    border: "none",
    borderRadius: "8px"
}

const ViewQuestion = () => {

  const param = useParams();  

  const courseId = param.subId;
  const chapterId = param.chapterId;

  const token = useSelector((state) => state.token);
  const [question, setQuestion] = useState([]);


  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Trying to fetch with", fetchOption)
        const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/${chapterId}/questions/`, fetchOption);
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data)
        setQuestion(data);
        console.log(question)
      } catch (error) {
        console.error("Error fetching Chapters:", error);
      }
    };

    fetchCourses();
  }, []);
  return(
    <>
    <Link style={btnStyle} to={`add`}>Add New Question</Link>
     <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Description</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
            {
              question.map((c, index) => (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                 <td>{c.title}</td>
                 <td>{c.description}</td>
                 <td>
                   <Link to={`${c.id}/questions/`}><AiFillEye style={iconStyle}/></Link>
                   <Link to={`${c.id}/update/`}><BiSolidPencil style={iconStyle}/></Link>
                   <Link><AiFillDelete style={iconStyle}/></Link> 
                 </td>
                 </tr>
              ))
            }
            
        </tbody>
      </Table>
    </>
    
  )
}

export default ViewQuestion;