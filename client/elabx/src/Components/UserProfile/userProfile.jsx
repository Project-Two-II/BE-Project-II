import './userprofile.css'
import userlogo from '../../media/people.svg';
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import CourseList from '../CourseList.jsx';
import { useState } from 'react'
import { useSelector} from 'react-redux'


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
    const navigate = useNavigate();
    const [profile, setProfile] = useState([])
    const token = useSelector((state) =>  state.token);
    const isLoggedIn = useSelector((state) =>  state.isLoggedIn);
    if(!isLoggedIn)
        navigate('/login')
    console.log(token)
    const fetchOption = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " +  token
        }
      }

    fetch(`http://localhost:8000/api/userauth/`, fetchOption)
            .then(resp => resp.json())
            .then(data => {
                setProfile(data)
                console.log(data)
            })
            .catch(err => console.log(err))
            const profileArr = Object.entries(profile)
        
            console.log(profileArr)
    return (
        <>
            <>
            <div className="container">
            <div className="user-card user-card-0">
                <img className="user-info user-logo" src={userlogo} style={logo_style} alt="user-logo" />
                <h3 className="user-info user-name">{profile.first_name + (' ') + profile.last_name}</h3>
                <span className="user-info user-role">{profile.role}</span>
                <span className="user-info user-details">BECE VI Day</span>
            </div>
            <div className="user-card user-card-1">
                <div class="col-md-10">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Name</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                {profile.first_name + (' ') + profile.last_name}
                                </div>
                            </div>
                            <hr />
                            <div class="row">
                                <div class="col-sm-3">
                                    <h6 class="mb-0">Email</h6>
                                </div>
                                <div class="col-sm-9 text-secondary">
                                    {profile.email}
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
        </>
 )       
}
export default UserProfile