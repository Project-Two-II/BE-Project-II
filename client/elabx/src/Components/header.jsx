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
const btn_style = {
    fontSize: "1.3rem",
    backgroundColor: "gray",
    borderRadius: "4px",
    width: "4%",
    position: "relative",
    top: "8px",
    left: "1100px"
}
function Header() {
    return (
        <header style={header_style}>
            <span className="elabx" style={elabx_style}>ELabX</span>
            <span className="create-btn" style={btn_style}>Create Subject</span>
            <Link to="/profile">
                <img className="userProfile-logo" src={userlogo} alt="image" style={logo_style}></img>
            </Link>
            <Link to="/logout">
                <span className="logout-btn" style={btn_style}>Logout</span>
            </Link>
        </header>
    );
}
export default Header;