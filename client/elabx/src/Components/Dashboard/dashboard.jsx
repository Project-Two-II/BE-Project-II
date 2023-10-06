import { Link } from 'react-router-dom';
import Header from '../header';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './dashboard.css';


const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role  = useSelector((state) => state.role);

  if(!isLoggedIn) return <Navigate to={"/login"}/>
  if(role == 0) return <Navigate to={"/home"}/>


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
