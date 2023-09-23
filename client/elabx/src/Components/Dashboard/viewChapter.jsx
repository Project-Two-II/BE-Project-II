
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

const ViewChapter = () => {

  const param = useParams();
  const courseId = param.subId;
 
  const token = useSelector((state) => state.token);
  const [chapter, setChapter] = useState([]);


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
        const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption);
        console.log(response)
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        console.log(data)
        setChapter(data);
        console.log(chapter)
      } catch (error) {
        console.error("Error fetching Chapters:", error);
      }
    };

    fetchCourses();
  }, []);
  return(
    <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Chapter Name</th>
            <th>Description</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
            {
              chapter.map((c, index) => (
                <tr key={index}>
                <th scope="row">{index + 1}</th>
                 <td>{c.title}</td>
                 <td>{c.description}</td>
                 <td>
                   <Link to={`${c.id}/questions/`}><AiFillEye style={iconStyle}/></Link><Link><BiSolidPencil style={iconStyle}/></Link><Link><AiFillDelete style={iconStyle}/></Link> 
                 </td>
                 </tr>
              ))
            }
            
        </tbody>
      </Table>
  )
}

export default ViewChapter;