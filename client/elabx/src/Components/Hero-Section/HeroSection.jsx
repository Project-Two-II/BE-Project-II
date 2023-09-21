import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../media/hero.png";
import "./hero-section.css";

import {Link} from 'react-router-dom';

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
            </div>
          </Col>
          

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
          <div >
              <Link to={"/register"} className="Register">Register Now</Link>
            </div>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
