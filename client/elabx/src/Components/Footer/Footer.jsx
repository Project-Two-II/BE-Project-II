import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import "./footer.css";

const footerQuickLinks = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "About US",
    url: "#",
  },

  {
    display: "Courses",
    url: "#",
  },

  
];

const footerInfoLinks = [
  {
    display: "Privacy Policy",
    url: "#",
  },
  {
    display: "Membership",
    url: "#",
  },

  {
    display: "Purchases Guide",
    url: "#",
  },

  {
    display: "Terms of Service",
    url: "#",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" className="mb-4">
            <h2 className=" d-flex align-items-center gap-1">
              <i className="ri-pantone-line"></i> Elabx
            </h2>

            <div className="follows">
              <p className="mb-0">Follow us on social media</p>
              <span>
                {" "}
                <a href="facebook.com">
                  <i className="ri-facebook-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i className="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i className="ri-linkedin-line"></i>
                </a>
              </span>

              <span>
                {" "}
                <a href="facebook.com">
                  <i className="ri-twitter-line"></i>
                </a>
              </span>
            </div>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6><span className="fw-bold">Explore</span></h6>
            <ListGroup className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6" className="mb-4">
            <h6><span className="fw-bold">Information</span></h6>
            <ListGroup className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListGroupItem key={index} className="border-0 ps-0 link__item">
                  {" "}
                  <a href={item.url}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3" md="6">
            <h6><span className="fw-bold">Get in Touch</span></h6>
            <p className="para-graph">Address: NCIT college Balkumari,lalitpur</p>
            <p className="para-graph"> Phone: 0121653 </p>
            <p className="para-graph">Email: ncit@ncit.edu.np</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
