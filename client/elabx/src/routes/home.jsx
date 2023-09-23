import React from 'react';
import Header from '../Components/header'
import Footer from '../Components/Footer/Footer'
import HomePage from '../Components/HomePage/homepage'

function Home() {
  return (
    <>
      <Header SearchBar={true}/>
      <HomePage />
      <Footer />
    </>
  )
}

export default Home
