import './userprofile.css'
import userlogo from '../../media/people.svg';
import { Link} from 'react-router-dom'
import { Navigate } from "react-router-dom";
import CourseList from '../CourseList.jsx';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';


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

function UserProfile({ prop }) {
    // console.log(prop)
    const [profile, setProfile] = useState([])
    const token = useSelector((state) => state.token);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    if (!isLoggedIn)
        return <Navigate to={'/login'}/>
    console.log(token)
    const fetchOption = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        }
    }

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/userauth/`, fetchOption)
                if(!response.ok){
                    throw new Error("Couldn't fetch user details")
                }
                const data = await response.json()
                console.log(data)
                setProfile(data)
            }
            catch(error){
                console.error("Error fetching user details: " , error)
            }
    }
    fetchDetails();
    }, [prop])
    console.log(profile.role)
    return (
        <>
            <div className="container">
                <div className="user-card user-card-0">
                    <img className="user-info user-logo" src={userlogo} style={logo_style} alt="user-logo" />
                    <h3 className="user-info user-name">{profile.first_name + (' ') + profile.last_name}</h3>
                    {
                        profile.role &&
                         <span className="user-info user-role">Teacher</span>
                        ||

                        !profile.role &&
                        <span className="user-info user-role">Student</span>

                        
                    }
                </div>
                <div className="user-card user-card-1">
                    <div className="col-md-10">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profile.first_name + (' ') + profile.last_name}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {profile.email}
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-sm-12">
                                        <Link to={`/editprofile`}>
                                            <button className="btn btn-info">Edit</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>

    )
}

export default UserProfile