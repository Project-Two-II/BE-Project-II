import TotalCard from './TotalCard';
import CourseCard from './CourseCard';

import {useSelector } from 'react-redux'


import './teacherhome.css'
import { useEffect, useState } from 'react';



const handleProfile = () => {

  console.log("userProfile clicked");
  setShowDropdown(true);
};

const TeacherHome = () => {

  const token = useSelector((state) => state.token);

  const [statistics, setStatistics] = useState([])

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " +  token
    }
  }


  const fetchStatistics = () => {
    fetch("http://localhost:8000/api/report/statistics/", fetchOption)
    .then((resp) => resp.json())
    .then((data) => {

      // api bata gatillo data aayena
      console.log(data)
      setStatistics(data)

    })
  }

  useEffect(fetchStatistics, [])

  return(
    <>
        <div className="total-card-container">
          <TotalCard title="Total Subjects" count={10} type={"subject"} />
          <TotalCard title="Total Students" count={10} type ={"student"} />
        </div>
          
    </>
  )
}

export default TeacherHome;