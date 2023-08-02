import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom'
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
    top: "13px",
    fontSize: "2rem"
}
const logo_style = {
    width: "4%",
    position: "relative",
    top: "8px",
    left: "1100px"
}
const btn_style ={
    padding: "7px",
    position: "absolute",
    right: "230px",
    top: "17px",
    fontSize: "1.3rem",
    backgroundColor: "gray",
    borderRadius: "4px"
}
function Header() {
    return (
        <header style={header_style}>
            <span className="elabx" style={elabx_style}>ELabX</span>
            <span classname="create-btn" style={btn_style}>Create Subject</span>
            <Link to="/profile">
                <img className="userProfile-logo" src={userlogo} alt="image" style={logo_style}></img>
            </Link>
        </header>
    );
}
export default Header;