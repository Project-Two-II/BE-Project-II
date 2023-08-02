import './userprofile.css'
import userlogo from '../../media/people.svg';
import { Link } from 'react-router-dom'
import CourseList from '../CourseList.jsx';


const logo_style = {
    width: "50%",
    margin: "auto"
}
const headerStyle = {
    height: "15vh",
    position: "static",
  }
  const spanStyle = {
    color: "#1F2334",
    position: "relative",
    top: "35px",
    left: "200px",
    fontSize: "2.5rem",
    textDecoration: "underline"
  }

const UserProfile = () => {
    return (
        <>
            <div class="container">
                <div className="user-card user-card-0">
                    <img className="user-info user-logo" src={userlogo} style={logo_style} alt="user-logo" />
                    <h3 className="user-info user-name">John Doe</h3>
                    <span className="user-info user-role">Student</span>
                    <span className="user-info user-details">BECE VI Day</span>
                </div>
                <div className="user-card user-card-1">
                    <div class="col-md-10">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Full Name</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        John Doe
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Email</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        john.191333@ncit.edu.np
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Phone</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        9861000000
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-3">
                                        <h6 class="mb-0">Address</h6>
                                    </div>
                                    <div class="col-sm-9 text-secondary">
                                        Balkumari, Lalitpur
                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <div class="col-sm-12">
                                        <Link to='/editprofile'>
                                            <button className="btn btn-info">Edit</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={headerStyle} className="courseHeader">
                <span style={spanStyle}>Your Courses</span>
            </div>
            <div class="course-container">
                {/* <CourseList /> */}
            </div>
        </>
    )
}
export default UserProfile