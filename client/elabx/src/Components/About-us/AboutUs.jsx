import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../media/about-us.png";
import "./about.css";

const AboutUs = () => {
  return (
    <section className="section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2><span className="title">About Us</span></h2>
              <p>
               ElabX is a digital platform that facilitates the organization, scheduling, and management of laboratory resources and activities. It is designed to streamline the processes involved in running a laboratory, ranging from sample tracking and equipment management to experiment planning and data analysis. 
              </p>

              </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
