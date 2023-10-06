import React from 'react';
import Header from '../Components/header'
import Footer from '../Components/Footer/Footer'
import HomePage from '../Components/HomePage/homepage'

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role  = useSelector((state) => state.role);

  if (!isLoggedIn) return <Navigate to={'/login'}/>
  if(role == 1) return <Navigate to= {'/dashboard/home/'}/>

  return (
    <>
      <Header SearchBar={true}/>
      <HomePage />
      <Footer />
    </>
  )
}

export default Home
