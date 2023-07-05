import React, { useState } from 'react';
import {Form, Link} from 'react-router-dom';

import '../login.css'

const errMessage = {
  color: "red"
}
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    if(email.length === 0 || password.length === 0 || confirmPassword === 0)
      setMessage('All fields are required');
  };

  return (
    <div className="BoxContainer">
        <div className="FormJumbotron">
            <h1 className= "col-wh main-heading">ELABX</h1>
            <p className= "col-wh">By:Team ARBA</p>
        </div>
  
        <div className="FormContainer">
            <div className="Headline">
                <p className= "Heading">Login To Continue.</p>
            </div>
            <div>
                <p className="Message"></p>
            </div>
            <Form>
                <p style={errMessage}>{message}</p>
                <div className="InputField">
                    <input type = "text" placeholder = "Email"  name = "email" value={email} onChange={handleEmailChange}/>
                </div>
                <div className="InputField">
                    <input type = "password" placeholder = "Password" name = "password" value={password} onChange={handlePasswordChange}/>
                </div>
  
                <button className="SubmitButton" onClick={handleFormSubmission}>Login</button>
                <Link to={"/register"}>Create a new account</Link>
            </Form>
            <br/>
            <hr/>
        </div>
  
    </div>
  );
};

export default Login;