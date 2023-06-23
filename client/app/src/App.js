import './App.css';
import React from 'react';
import Footer from './components/footer.js';
import Header from './components/header.js'; 

import WorkerAPI from './shared_web.js';

import QuestionSolve from './components/questionSolve.js';
import CourseHeader from './components/CourseHeader';
import Syllabus from './components/Syllabus'
import { Route, Routes } from "react-router-dom"

const App = () => {

  let api = new WorkerAPI();

  return (
    <div className="App">
      <Header />
      <CourseHeader />
      <Routes>
        <Route index element={<Syllabus />}/>
        <Route path="/questionSolve" element={<QuestionSolve my_api={api}/>}/>
        <Route path='/' element={<Syllabus />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
