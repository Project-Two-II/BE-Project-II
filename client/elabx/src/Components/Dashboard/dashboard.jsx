import { Link } from 'react-router-dom';
import Header from '../header';
import { Outlet } from 'react-router-dom';
import './dashboard.css';

import TotalCard from './TotalCard';
import CourseCard from './CourseCard';

import courseImg2 from '../../media/lab2.png';
import courseImg3 from '../../media/LAB3.png';
import courseImg4 from '../../media/lab4.png';
import courseImg5 from '../../media/lab5.png';
import courseImg6 from '../../media/lab6.png';
import courseImg7 from '../../media/lab7.png';
import courseImg8 from '../../media/lab8.png';
import courseImg9 from '../../media/lab9.png';

const Dashboard = () => {
  return (
    <>
      <Header SearchBar={false} />
      <div className="main-body">
        <div id="sidebar">
          <h1>ELabX Dashboard</h1>
          <div></div>
          <nav>
            <ul>
              <li>
                <Link to={`courses/`}>My Courses</Link>
              </li>
              <li>
                <Link to={`CreateCourse/`}>Create New Course</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
        <div className="total-card-container">
          <TotalCard title="Total Subjects" count={10} type={"subject"} />
  <TotalCard title="Total Students" count={100} type ={"student"} />
</div>
          <div className="all-courses-section">
    <h2>All Courses</h2>
    <div className="course-cards-container"> <CourseCard imageSrc={courseImg2} />
          <CourseCard imageSrc={courseImg3} />
          <CourseCard imageSrc={courseImg4} />
          <CourseCard imageSrc={courseImg5} />
          <CourseCard imageSrc={courseImg6} />
          <CourseCard imageSrc={courseImg7} />
          <CourseCard imageSrc={courseImg8} />
          <CourseCard imageSrc={courseImg9} /></div>
         
        </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
