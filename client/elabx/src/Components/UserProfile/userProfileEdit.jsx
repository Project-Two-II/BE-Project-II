import './userprofile.css'
import userlogo from '../../media/people.svg';
import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { stripBasename } from '@remix-run/router';

const logo_style = {
    width: "50%",
    margin: "auto"
}


const UserProfileEdit = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const param = useParams()
    // const userId = param.userId;
    const [profile, setProfile] = useState();

    const token = useSelector((state) => state.token);
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    if (!isLoggedIn)
        return <Navigate to={'/login'}/>
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
                if (!response.ok) {
                    throw new Error("Couldn't fetch user details")
                }
                const data = await response.json()
                console.log(data)
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setProfile(data)
            }
            catch (error) {
                console.error("Error fetching user details: ", error)
            }
        }
        fetchDetails();
    },[])

    const updateOptionUser = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "first_name": firstName,
            "last_name": lastName
        })
    }

    

    const handleSubmission = async (e) => {
        e.preventDefault();

        let formdata = FormData();
        formdata.appendd('avatar',)

        console.log('First Name: ' + firstName);
        console.log('Last Name: ' + lastName);
        fetch(`http://localhost:8000/api/userauth/`, updateOptionUser)
        .then((resp) => {
            return resp.json();
        })
        .then((data) => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <div className="container">
                <div className="user-card user-card-0">
                    <img className="user-info user-logo" src={userlogo} style={logo_style} alt="user-logo" />
                    <p className="user-info">Change Profile Picture</p>
                    <input className="user-info" type="file" accept="image/*" onChange={handleProfileChange}></input>
                    <br />
                    <h3 className="user-info user-name">{firstName + (' ') + lastName}</h3>
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
                                        <h6 className="mb-0">First Name</h6>
                                    </div>
                                    <input className="input col-sm-9 text-secondary" required value={firstName} onChange={(e) => setFirstName(e.target.value)}>
                                    </input>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Last Name</h6>
                                    </div>
                                    <input className="input col-sm-9 text-secondary" required value={lastName} onChange={(e) => setLastName(e.target.value)}>
                                    </input>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">{profile.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                            <button className="btn btn-info" onClick={handleSubmission}>Submit</button>
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <input className="input col-sm-9 text-secondary" required placeholder="9861000000">
                                    </input>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <input className="input col-sm-9 text-secondary" required placeholder="Balkumari, Lalitpur">
                                    </input>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <Link to='/profile'>
                                            <button className="btn btn-info">Save</button>
                                        </Link>
                                    </div>
                                </div>
                                 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserProfileEdit