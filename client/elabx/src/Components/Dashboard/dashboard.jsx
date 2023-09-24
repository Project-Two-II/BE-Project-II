import { Link } from 'react-router-dom';
import Header from '../header';
import { Outlet } from 'react-router-dom';
import './dashboard.css';


const Dashboard = () => {
  return (
    <>
      <Header SearchBar={false} />
      <div className="main-body">
        <div id="sidebar">
          <h1>ELabX Dashboard</h1>
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
        <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
