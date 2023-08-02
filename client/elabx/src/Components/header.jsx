import '../App.css';
import React, { useState } from 'react';
import userlogo from '../media/people.svg';

const header_style = {
  backgroundColor: "#0d1122",
  width: "100%",
  height: "12vh",
  position: "static",
  color: "white",
  display: "flex",
  alignItems: "center",
};

const elabx_style = {
  fontSize: "2rem",
  marginLeft: "100px",
};

const logo_style = {
  width: "4%",
  marginLeft: "auto",
  marginRight: "100px",
  cursor: "pointer",
};

const searchbar_style = {
  width: "200px",
  height: "20px",
  marginLeft: "650px", 
};

const dropdown_style = {
  position: "absolute",
  top: "10%",
  right: "50px",
  backgroundColor: "darkblue",
  color: "white",
  width: "120px",
  padding: "10px",
  zIndex: "1",
  display: "block",
};

const optionStyle = {
  padding: "5px",
  cursor: "pointer"

};

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false); 
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
      <div style={searchbar_style}>
        
        <input type="text" placeholder="Search" />
      </div>
      <img
        className="Profile-logo"
        src={userlogo}
        alt="user logo"
        style={logo_style}
        onClick={handleLogoClick}
      />
      {showDropdown && (
        <div style={dropdown_style}>
          <div style={optionStyle} onClick={handleProfile}>Profile</div>
          <div style={optionStyle} onClick={handleLogout}>Logout</div>
        </div>
       )}
    </header>
  );
}

export default Header;
