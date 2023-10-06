import React from 'react';
import userlogo from '../media/people.svg';
import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";

import { setCred } from '../features/info'


import elabx_logo from '../media/logo-nobg.png'

const header_style = {
  backgroundColor: "#1c305c",
  width: "100%",
  color: "white",
  display: "flex",
  justifyContent: "space-around"
}

const logo_style = {
  display: "inline-block",
  cursor: "pointer"
};

const searchbar_style = {
  minWidth: "200px",
  height: "20px",
};

const dropdown_style = {
  backgroundColor: "rgba(50,50,50)",
  width: "120px",
  padding: "0",
  zIndex: "999",
  display: "block",
  borderRadius: "5px",
  color: "white"
};

const optionStyle = {
  padding: "10px",
  cursor: "pointer",
};

const sideStyle = {
  display: "flex",
  flexDirection: "row",
  paddingTop : "10px"
}

const linkStyle = {
  textDecoration: "none",
  color: "white"
};

function Header({SearchBar}) {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refreshToken = useSelector((state) => state.refreshToken)
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogoClick = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleLogout = () => {
    setShowDropdown(false);
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "refresh": refreshToken
        })
    } 

    fetch("http://localhost:8000/api/userauth/logout/", fetchOption)
        .then((resp) => {return resp.json()})
        .then(data => {
            console.log(data)
        })
        .catch( err => console.log(err))

      dispatch(setCred({isLoggedIn: false, token: null, role: null, refreshToken: null}))
      navigate("/login")
  };

  const handleProfile = () => {

    console.log("userProfile clicked");
    setShowDropdown(true);
  };

  return (
    <header style={header_style}>
      <Link to={"/home"}>
      <span className="elabx">
        <img src={elabx_logo} height={80} width={80}/>
      </span>
      </Link>
      <div style={sideStyle}>
      {SearchBar && <span style={searchbar_style}>
        <input type="text" placeholder="Search" />
      </span>}
      <div className="profile-icon">
        <img
          className="Profile-logo"
          src={userlogo}
          alt="user logo"
          style={logo_style}
          height={60}
          width={60}
          onClick={handleLogoClick}
        />
        {showDropdown && (
          <div className="dropdown-menu" style={dropdown_style}>
            <Link style={linkStyle} to="/profile">
              <div className="dropdown-option" style={optionStyle} onClick={handleProfile}>Profile</div>
            </Link>
              <div className="dropdown-option" style={optionStyle} onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
      </div>
       </header>
  );
}

export default Header;
