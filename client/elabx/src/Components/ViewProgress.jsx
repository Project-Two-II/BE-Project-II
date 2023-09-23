import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {useSelector } from 'react-redux'


function QuestionList() {
  const [selectedChapter, setSelectedChapter] = useState(null);

    const param = useParams();
    const courseId = param.subId;
    const studentId = param.studentId;
   
    const token = useSelector((state) => state.token);
    const [chapters, setChapters] = useState([]);
    // const [student, setStudent] = useState({})
    const [course, setCourse] = useState({})
  
  
    const fetchOption = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " +  token
      }
    }

    /*
    useEffect(()=>{
      const fetchStudent= async() => {
        try{
          const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/students/${studentId}/`,fetchOption)
          // console.log(response)
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          // console.log(data)
          setStudent(data);
          // console.log(student)
        } catch (error) {
          console.error("Error fetching Students:", error);
        }
      };
      fetchStudent();
    },[])
    */

    useEffect(()=>{
      const fetchCourse= async() => {
        try{
          const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/`,fetchOption)
          // console.log(response)
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          // console.log(data)
          setCourse(data);
          // console.log(course)
        } catch (error) {
          console.error("Error fetching Courses:", error);
        }
      };
      fetchCourse();
    },[])
  
    useEffect(() => {
      const fetchChapters = async () => {
        try {
          console.log("Trying to fetch with", fetchOption)
          const response = await fetch(`http://localhost:8000/api/subjects/${courseId}/chapters/`, fetchOption);
          // console.log(response)
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          const data = await response.json();
          // console.log(data)
          setChapters(data);
          // console.log(chapters)
        } catch (error) {
          console.error("Error fetching Chapters:", error);
        }
      };
  
      fetchChapters();
    }, []);

  const containerStyle = {
    backgroundColor: '#1E2D3B',
    color: 'white',
    padding: '20px',
    minHeight: '100vh',
  };

  const chapterContainerStyle = {
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, minmax(20px, 1fr))',
    gridGap: '10px',
  };

  const chapterStyle = {
    backgroundColor: '#3F5368',
    padding: '10px',
    width: '100%',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'center',
  };

  const chapterTitleStyle = {
    fontWeight: 'bold',
    margin: '0',
    padding: '10px',
    backgroundColor: '#5B718B',
    borderRadius: '5px',
    color: 'white',
  };

  const selectedChapterTitleStyle = {
    backgroundColor: '#4C6080',
  };

  const questionTableStyle = {
    backgroundColor: '#5B718B',
    borderCollapse: 'collapse',
    margin: '10px 0',
    borderRadius: '5px',
  };

  const questionTableHeaderStyle = {
    backgroundColor: '#3F5368',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const questionTableRowStyle = {
    borderBottom: '1px solid white',
  };

  const questionTableDataStyle = {
    padding: '10px',
    textAlign: 'center',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <h1><b>Course Id: {course.title}</b></h1>
      <h3><b>Progress of Student Id: {studentId}</b></h3>
      <p color="darkgrey">courseCode:CMP240</p>
      <p color ="darkgrey">This is course Description</p>
      <h3><b>Chapters</b></h3>
      <div style={chapterContainerStyle}>
        {chapters.map(chapter => (
          <div
            key={chapter.id}
            style={{
              ...chapterStyle,
              ...(selectedChapter === chapter.id ? selectedChapterTitleStyle : null),
            }}
            onClick={() => setSelectedChapter(selectedChapter === chapter.id ? null : chapter.id)}
          >
            <p style={{ ...chapterTitleStyle }}>{chapter.title}</p>
          </div>
        ))}
      </div>
      {selectedChapter !== null && (
        <table style={questionTableStyle}>
          <thead>
            <tr style={questionTableRowStyle}>
              <th style={{ ...questionTableHeaderStyle, borderTopLeftRadius: '5px' }}>Question</th>
              <th style={questionTableHeaderStyle}>Auto Grade</th>
              <th style={{ ...questionTableHeaderStyle, borderTopRightRadius: '5px' }}>Marks</th>
            </tr>
          </thead>
          <tbody>
            {questions.filter(question => question.chapterId === selectedChapter).map(question => (
              <tr key={question.id} style={questionTableRowStyle}>
                <td style={questionTableDataStyle}>{question.name}</td>
                <td style={questionTableDataStyle}>{question.autoGrade ? 'Yes' : 'No'}</td>
                <td style={questionTableDataStyle}>{`${question.marks} marks`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default QuestionList;

/*
const subjects = [
  { id: 1, name: 'Programming in C' },
  { id: 2, name: 'Data Structures' },
  { id: 3, name: 'Algorithms' },
];

const chapters = [
  { id: 1, subjectId: 1, name: 'Introduction to C Programming' },
  { id: 2, subjectId: 1, name: 'Data Types and Operators' },
  { id: 3, subjectId: 1, name: 'Control Structures' },
  { id: 4, subjectId: 1, name: 'Functions and Arrays' },
  { id: 5, subjectId: 1, name: 'Pointers and Strings' },
];

const questions = [
  { id: 1, chapterId: 1, name: 'Write a C program to print "Hello, World!"', autoGrade: true, marks: 5 },
  { id: 2, chapterId: 1, name: 'Write a C program to add two numbers', autoGrade: true, marks: 5 },
  { id: 3, chapterId: 2, name: 'What is the difference between int and float data types?', autoGrade: true, marks: 10 },
  { id: 4, chapterId: 2, name: 'What is the modulus operator in C?', autoGrade: true, marks: 10 },
  { id: 5, chapterId: 3, name: 'Write a C program to find the largest of three numbers', autoGrade: true, marks: 10 },
  { id: 6, chapterId: 4, name: 'What is a function in C?', autoGrade: true, marks: 5 },
  { id: 7, chapterId: 4, name: 'Write a C program to find the sum of elements in an array', autoGrade: true, marks: 5 },
  { id: 8, chapterId: 5, name: 'What is a pointer in C?', autoGrade: true, marks: 5 },
  { id: 9, chapterId: 5, name: 'Write a C program to reverse a string', autoGrade: true, marks: 5 },
];
*/