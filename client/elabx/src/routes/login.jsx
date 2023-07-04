import React, { useState } from 'react';
import {Form, Link} from 'react-router-dom';

import '../login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    // Perform login logic here
    if (email && password) {
      // Login successful
      console.log('Login successful!');
    } else {
      // Invalid login credentials
      console.log('Please provide your email and password.');
    }
  };

  return (
    <div class="BoxContainer">
        <div class="FormJumbotron">
            <h1 class = "col-wh main-heading">ELABX</h1>
            <p class = "col-wh">By:Team ARBA</p>
        </div>
  
        <div class="FormContainer">
            <div class="Headline">
                <p class = "Heading">Login To Continue.</p>
            </div>
            <div>
                <p class="Message"></p>
            </div>
            <Form>
                <p></p>
                <div class="InputField">
                    <input type = "text" placeholder = "Email"  name = "email" value={email} onChange={handleEmailChange}/>
                </div>
                <div class="InputField">
                    <input type = "password" placeholder = "Password" name = "password" value={password} onChange={handlePasswordChange}/>
                </div>
  
                <button class="SubmitButton" onClick={handleFormSubmission}>Login</button>
                <Link to={"/register"}>Create a new account</Link>
            </Form>
            <br/>
            <hr/>
        </div>
  
    </div>
  );
};

export default Login;