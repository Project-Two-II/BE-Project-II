import './App.css';
import React from 'react';
import Footer from './components/footer.js';
import Header from './components/header.js'; 
import Body from './components/Body.js';
import CourseHeader from './components/CourseHeader';
import Syllabus from './components/Syllabus';

function App() {
  return (
    <div className="App">
      <Header />
      <CourseHeader />
      <Syllabus />
      {/* <Body /> */}
      <Footer />
    </div>
  );
}

export default App;
