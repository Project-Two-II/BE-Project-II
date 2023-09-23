
import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';

import {useSelector } from 'react-redux'

import {AiFillEye, AiFillDelete} from 'react-icons/ai'
import {BiSolidPencil} from 'react-icons/bi'

import { Link } from 'react-router-dom';


const iconStyle = {
  cursor: "pointer",
  height: "20px",
  width: "40px",
  color: "black"
}

const ViewCourse = () => {

  const token = useSelector((state) => state.token);
  const [course, setCourse] = useState([]);


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
        const response = await fetch("http://localhost:8000/api/subjects/mysubjects/", fetchOption);
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data)
        setCourse(data);
        console.log(course)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);
  return(
    <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Course Code</th>
            <th>Title</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
            {
              course.map((c, index) => (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                 <td>{c.code_no}</td>
                 <td>{c.title}</td>
                 <td>
                   <Link to={`${c.id}/chapters/`}><AiFillEye style={iconStyle}/></Link> <Link><BiSolidPencil style={iconStyle}/></Link> <Link to={`${c.id}/delete/`}><AiFillDelete  style={iconStyle}/></Link> 
                 </td>
                 </tr>
              ))
            }
            
        </tbody>
      </Table>
  )
}

export default ViewCourse;