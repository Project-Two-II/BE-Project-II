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
  height: "12vh",
  // position: "absolute",
  color: "white"
}
const elabx_style = {
  fontSize: "2rem",
  marginLeft: "100px",
  position: "relative",
  top: "15px"
};

// const icon_style = {
//   position: "absolute",
//   right: "-50px",
//   top: "7px"
// }

const logo_style = {
  display: "inline-block",
  cursor: "pointer"
};

const searchbar_style = {
  minWidth: "200px",
  height: "20px",
};

const dropdown_style = {
  backgroundColor: "black",
  width: "120px",
  padding: "0px",
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

      dispatch(setCred({isLoggedIn: false, token: '', role: '', refreshToken: ''}))
      navigate("/login")
  };

  const handleProfile = () => {

    console.log("userProfile clicked");
    setShowDropdown(true);
  };

  return (
    <header style={header_style}>
      <span className="elabx">
        <img src={elabx_logo} height={80} width={80}/>
      </span>
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
            <Link className="route-link-style" to="/profile">
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
