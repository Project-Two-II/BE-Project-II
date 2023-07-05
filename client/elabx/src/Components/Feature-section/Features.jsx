import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "To optimize quick learning in a lab, prepare ahead, follow instructions attentively, actively participate in hands-on activities, take thorough notes, and engage in collaborative discussions with peers to clarify doubts and reinforce understanding.",
 icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "Peers and Teachers offer all-time support by being available around the clock to provide assistance, share insights, and collaborate on learning",
    icon: "ri-discuss-line",
  },

  {
    title: "Progress Tracking",
    desc: "Teachers track progress through assessment and feedback, while autograding systems automate grading and provide timely feedback, improving the efficiency and effectiveness of monitoring student learning",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section className="section">
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single__feature text-center px-4">
                <h2 className="mb-3">
                  <i class={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p className="para">{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
