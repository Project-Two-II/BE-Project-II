import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../media/herro.png";
import "./hero-section.css";
import "../../App.css"

import {Link} from 'react-router-dom';

const btnStyle = {
  padding: "15px"
}

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="hero__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <div className="mt-top">
              <Link style={btnStyle} to={"/register"} className="Register btn-hover">Register Now</Link>
          </div>
            </div>
          </Col>
          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img"/>
          </Col>
          
        </Row>
        
      </Container>
    </section>
  );
};

export default HeroSection;
