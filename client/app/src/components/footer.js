import '../App.css';
import React from 'react';

const elabxStyle={
  fontSize: "2rem",
  textAlign: "center",
  height: "fit-content",
  color: "white"
}
const linkStyle={
  color: "white",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around"
}
const copyrightStyle ={
  textAlign: "center",
  color: "white"
}
function Footer(){
  return (
    <footer className="footer">
      <div className="footerelabx" style={elabxStyle}>ELabX</div>
      <div className="footerLinks" style={linkStyle}>
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Terms and Conditions</li>
          <li>Contact Us</li>
      </div>
      <hr></hr>
      <div className="copyright" style={copyrightStyle}> &copy; 2023, ELabX all rights reserevd</div>
    </footer>
  );
}

export default Footer;
