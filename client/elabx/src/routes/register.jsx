import React, { useState } from 'react';
import {Form, Link} from 'react-router-dom'

import '../login.css'


const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    // Perform registration logic here
    if (email && firstName && lastName && password && role) {
      // Registration successful
      console.log('Registration successful!');
    } else {
      // Invalid registration details
      console.log('Please fill in all the required fields.');
    }
  };

  return (
    <div className="BoxContainer">

    <div className="FormJumbotron">
        <h1 className= "col-wh main-heading">ELABX</h1>
        <p className= "col-wh" >Set your own Learning Path</p>
    </div>
  
    <div className="FormContainer">
        <div className="Headline">
            <p className= "Heading">Create New Account</p>
        </div>
        <div>
            <p className="Message"></p>
        </div>
        <Form method = "post">
            <p></p>
            <div className="InputField"><input type = "text" placeholder = "First Name"  name = "username" value={firstName} onChange={handleFirstNameChange}/></div>
            <div className="InputField"><input type = "email" placeholder = "Last Name"  name = "email" value={lastName} onChange={handleLastNameChange} /></div>
            <div className="InputField"><input type = "password" placeholder = "Email" name = "password" value={email} onChange={handleEmailChange} /></div>
            <div className="InputField"><input type = "email" placeholder = "Password"  name = "email" value={password} onChange={handlePasswordChange} /></div>  
            <button className="SubmitButton" type="submit" onClick={handleFormSubmission}>Register</button>
        </Form>
        <br/>
        <hr/>
        <Link to={"/login"}> Login instead</Link>
    </div>
  
  </div>
  );
};

export default Register;