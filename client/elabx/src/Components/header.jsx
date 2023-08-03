import React from 'react';
import { Link } from 'react-router-dom'
import userlogo from '../media/people.svg';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const header_style = {
  backgroundColor: "#0d1122",
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

const icon_style = {
  position: "absolute",
  right: "-50px",
  top: "7px"
}

const logo_style = {
  width: "20%",
  cursor: "pointer"
};

const searchbar_style = {
  width: "200px",
  height: "20px",
  position: "relative",
  top: "7px",
  marginLeft: "550px",
};

const dropdown_style = {
  position: "relative",
  right: "25px",
  top: "15px",
  backgroundColor: "#3C3D47",
  width: "120px",
  padding: "0px",
  zIndex: "1",
  display: "block",
  borderRadius: "5px",
};

const optionStyle = {
  padding: "10px",
  cursor: "pointer"
};

function Header() {
  const token = useSelector((state) => state.token);
  console.log(token)
  const refreshToken = useSelector((state) => state.refreshToken)
  console.log(refreshToken)
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
  };

  const handleProfile = () => {

    console.log("userProfile clicked");
    setShowDropdown(true);
  };

  return (
    <header style={header_style}>
      <span className="elabx" style={elabx_style}>
        ELabX
      </span>
      <span style={searchbar_style}>
        <input type="text" placeholder="Search" />
      </span>
      <span className="profile-icon" style={icon_style}>
        <img
          className="Profile-logo"
          src={userlogo}
          alt="user logo"
          style={logo_style}
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
      </span>
    </header>
  );
}

export default Header;
