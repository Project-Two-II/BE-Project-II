import './App.css';
import React from 'react';
import Footer from './components/footer.js';
import Header from './components/header.js'; 

import WorkerAPI from './shared_web.js';

import QuestionSolve from './components/questionSolve.js';
import CourseHeader from './components/CourseHeader';
import Syllabus from './components/Syllabus'
import { Route, Routes } from "react-router-dom"
import HomePage from './components/HomePage';

const App = () => {

  let api = new WorkerAPI();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<HomePage />}/>
        <Route path="/Syllabus" element={<Syllabus />} />
        <Route path="/questionSolve" element={<QuestionSolve my_api={api}/>}/>
        {/* <Route path="/questionSolve/:id" element={<QuestionSolve my_api={api}/>}/> */}
        <Route path='/Syllabus' element={<Syllabus />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
