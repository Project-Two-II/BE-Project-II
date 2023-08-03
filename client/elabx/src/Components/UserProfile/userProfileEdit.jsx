import './userprofile.css'
import userlogo from '../../media/people.svg';
import { Link } from 'react-router-dom'

const logo_style = {
    width: "50%",
    margin: "auto"
}

const UserProfileEdit = () => {
    return (
        <>
            <div className="container">
                <div className="user-card user-card-0">
                    <img className="user-info user-logo" src={userlogo} style={logo_style} alt="user-logo" />
                        <p className="user-info">Change Profile Picture</p>
                        <input className="user-info" type="file"></input>
                    <br />
                    <span className="user-info user-role">Student</span>
                    <span className="user-info user-details">BECE VI Day</span>
                </div>
                <div className="user-card user-card-1">
                    <div className="col-md-10">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <input className="input col-sm-9 text-secondary" required placeholder="John Doe">
                                    </input>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">john.191000@ncit.edu.np
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserProfileEdit