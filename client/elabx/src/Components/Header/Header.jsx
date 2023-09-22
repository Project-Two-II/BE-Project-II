import React, { useRef } from "react";
import { Container } from "reactstrap";
import {Link} from 'react-router-dom'
import "./header.css";
import logo from "../../media/logo-nobg.png";


const navLinks = [
  {
    id : 1,
    display: "Home",
    url: "/",
  },
  {
    id : 2,
    display: "About",
    url: "#",
  },

  {
    id : 3,
    display: "Courses",
    url: "#",
  },

  {
    id : 4,
    display: "Login",
    url: "/login",
  }
]
const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
              <i className="logo"></i> 
              <Link to={"/"}><img src={logo} alt="" className="w-100" height={80} width={80}/></Link>
            </h2>
          </div>

          <div className="margin-left nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {navLinks.map(item => (
                  <li key={item.id} className="nav__item">
                    <Link to={item.url}>{item.display}</Link>
                  </li>
                ))}
              </ul>
            </div>

            
          </div>

          <div className="mobile__menu">
            <span>
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
