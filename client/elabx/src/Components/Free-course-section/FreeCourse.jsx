import React from "react";
import { Container, Row, Col } from "reactstrap";

import courseImg01 from "../../media/platform1.png";
import courseImg02 from "../../media/platform2.png";
import courseImg03 from "../../media/platform3.png";
import courseImg04 from "../../media/platform4.png";
import courseImg05 from "../../media/platform5.png";
import FreeCourseCard from "./FreeCourseCard";

import "./free-course.css";

const freeCourseData = [
  {
    id: "01",
    imgUrl: courseImg01,
  },
  {
    id: "02",
    imgUrl: courseImg02,
  },

  {
    id: "03",
    imgUrl: courseImg03,
  },

  {
    id: "04",
    imgUrl: courseImg04,
  },
  {
    id: "05",
    imgUrl: courseImg05,
  },

];

const FreeCourse = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">We provide platform for</h2>
          </Col>

          {freeCourseData.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <FreeCourseCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FreeCourse;
