import React from 'react';
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Header from '../Components/header'
import Footer from '../Components/Footer/Footer'
import AddStudent from '../Components/AddStudent'
import SelfEnroll from '../Components/SelfEnroll';

function Enroll() {
  const param = useParams();
  const courseId = param.courseId;
  console.log(param)
  const isTeacher = useSelector((state) => state.role)
  console.log(isTeacher)
  return (
    <>
      <Header />
      {isTeacher ? <AddStudent courseId={courseId}/> : <SelfEnroll courseId={courseId}/>}
      <Footer />
    </>
  )
}

export default Enroll