import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Header from '../Components/header'
import Footer from '../Components/Footer/Footer'
import AddStudent from '../Components/AddStudent'
import SelfEnroll from '../Components/SelfEnroll';

function Enroll() {
  const location = useLocation()
  // const navigate = useNavigate()
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const isTeacher = useSelector((state) => state.role)
  // const token = useSelector((state) => state.token)
  console.log(isTeacher)
  return (
    <>
      <Header />
      {isTeacher ? <AddStudent /> : <SelfEnroll />}
      <Footer />
    </>
  )
}

export default Enroll