import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function StudentProgressTable() {

  const navigate = useNavigate();
  const params = useParams()
  const courseId = params.subId

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role = useSelector((state) => state.role)
  const token = useSelector((state) => state.token)
  // console.log(token)

  const [students, setStudents] = useState([]);
  // const [data, setData] = useState([])

  const fetchOption = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": "Bearer " + token
    }
  }

  useEffect(() => {
    const getStudents = () => {
      fetch(`http://localhost:8000/api/report/subjects/${courseId}/students/`, fetchOption)
        .then((resp) => {
          return resp.json()
        })
        .then((data) => {
          const newdata = JSON.parse(data)
          console.log(newdata);
          setStudents(newdata);
        })
    };
    getStudents();
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Progress</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Progress</th>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Submission</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student=> (
            <tr key={student.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>
                <progress value={student.progress} max="100">{student.progress}%</progress>
              </td>
              <td style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>
                <Link to={`${student.id}/chapters/`}>
                  <button style={{ backgroundColor: '#1E293B', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentProgressTable;