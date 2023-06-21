import './App.css';
import React from 'react';
import Footer from './components/footer.js';
import Header from './components/header.js'; 
import Body from './components/Body.js';

import WorkerAPI from './shared_web.js';


const CourseHeader = () => {
    const headerStyle = {
      height: "18vh",
      position: "static",
      backgroundColor: "#1F2334"
    }
    const spanStyle = {
      color: "white",
      position: "relative",
      top: "35px",
      left: "100px",
      fontSize: "3rem",
      textDecoration: "underline"
    }
    return (
      <div style={headerStyle} className="courseHeader">
        <span style={spanStyle}>C++ LAB</span>
      </div>
    );
  }

const App = () => {

  let api = new WorkerAPI();

  return (
    <div className="App">
      <Header />
      <CourseHeader />
      <Body my_api={api}/>
      <Footer />
    </div>
  );
}

export default App;
