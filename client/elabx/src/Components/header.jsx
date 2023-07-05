import '../App.css';
import React from 'react';
import userlogo from '../media/people.svg';


const header_style = {
    backgroundColor: "#0d1122",
  width: "100%",
  height: "12vh",
  position: "static",
  color: "white"
}
const elabx_style = {
    position: "relative",
    left: "100px",
    top: "-9px",
    fontSize: "2rem"
}
const logo_style = {
    width: "4%",
  position: "relative",
  top: "8px",
  left: "1100px"
}
function Header() {
    return (
        <header style={header_style}>
            <span className="elabx" style={elabx_style}>ELabX</span>
            <img className="userProfile-logo" src={userlogo} alt="image" style={logo_style}></img>
            <img></img>
        </header>
    );
}
export default Header;