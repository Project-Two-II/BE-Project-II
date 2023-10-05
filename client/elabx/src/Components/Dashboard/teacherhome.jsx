import TotalCard from './TotalCard';
import CourseCard from './CourseCard';

import { useSelector } from 'react-redux'


import './teacherhome.css'
import { useEffect, useState } from 'react';


const TeacherHome = () => {

  const token = useSelector((state) => state.token);

  const [statistics, setStatistics] = useState([])

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }


  const fetchStatistics = () => {
    fetch("http://localhost:8000/api/report/statistics/", fetchOption)
      .then((resp) => {
        if(!resp.ok) throw new Error("Network response is not ok")
        return resp.json()
      })
      .then((data) => {
        console.log(data)
        setStatistics(data)
      })
      .catch((err) => console.log("Something went wrong: ", err))
    }

  useEffect(fetchStatistics, [])

  return (
    <>
      <div className="total-card-container">
        <TotalCard title="Total Subjects" count={statistics.total_subjects} type={"subject"} />
        <TotalCard title="Total Students" count={statistics.total_students} type={"student"} />
      </div>

    </>
  )
}

export default TeacherHome;