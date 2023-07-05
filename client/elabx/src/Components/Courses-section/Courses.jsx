import React from "react";
import { Container, Row, Col } from "reactstrap";
import courseImg1 from "../../media/lab1.png";
import courseImg2 from "../../media/lab2.png";
import courseImg3 from "../../media/LAB3.png";
import courseImg4 from "../../media/lab4.png";
import courseImg5 from "../../media/lab5.png";
import courseImg6 from "../../media/lab6.png";
import courseImg7 from "../../media/lab7.png";
import courseImg8 from "../../media/lab8.png";
import courseImg9 from "../../media/lab9.png";
import "./courses.css";
import CourseCard from "./CourseCard";

const coursesData = [
  {
    id: "01",
    lesson: 12,
    imgUrl: courseImg1,
  },

  {
    id: "02",
    lesson: 12,
    imgUrl: courseImg2,
  },

  {
    id: "03",
    lesson: 12,
    imgUrl: courseImg3,
  },
  {
  id: "04",
    lesson: 10,
    imgUrl: courseImg4,
  },

  {
    id: "05",
    lesson: 12,
    imgUrl: courseImg5,
  },

  {
    id: "06",
    lesson: 9,
    imgUrl: courseImg6,
  },
  {
    id: "07",
      lesson: 10,
      imgUrl: courseImg7,
    },
  
    {
      id: "08",
      lesson: 12,
      imgUrl: courseImg8,
    },
  
    {
      id: "09",
      lesson: 9,
      imgUrl: courseImg9,
    },



];

const Courses = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Available Labs</h2>
                
              </div>

              <div className="w-50 text-end">
                <button className="btn">See All</button>
              </div>
            </div>
          </Col>
          {coursesData.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
