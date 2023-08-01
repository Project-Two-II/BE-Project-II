import React, { useState } from 'react';
import { Form, Link } from 'react-router-dom'

import '../login.css'

const errMessageStyle = {
  color: "red"
}
const okMessageStyle = {
  color: "green"
}

const Register = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [okMessage, setOkMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState();
  const [hasError, setHasError] = useState(false)

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

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    if(e.target.value === "Student"){
      setRole(0);
    }
    else{
      setRole(1);
    }
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    setErrMessage('')
    setOkMessage('')

    if (password != confirmPassword) {
      setErrMessage('Passwords do not match');
    }
    if (email.length === 0 || password.length === 0 || confirmPassword === 0)
      setErrMessage('All fields are required');
    
    const fetchOption = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          "first_name": firstName,
          "last_name": lastName,
          "email": email,
          "username": email,
          "role": role,
          "password": password
        })
     }
      fetch("http://localhost:8000/api/userauth/register/", fetchOption)
      .then((resp) => {
        if(resp.status == 400){
          console.log("400 bad req")
          setHasError(true);
          console.log(hasError)
          return resp.json()
        }
        else {
          setHasError(false)
          return resp.json()
        }
      })
      .then((data) => {
        if(hasError){
          console.log("Has Error")
          setErrMessage(data.detail)
          setHasError(false)
        } else{
          console.log("Has Error")
          setOkMessage(data.detail)
          setHasError(false);
        }
        console.log(data);
        console.log(data.detail)
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="BoxContainer">

      <div className="FormJumbotron">
        <h1 className="col-wh main-heading">ELABX</h1>
        <p className="col-wh" >Set your own Learning Path</p>
      </div>

      <div className="FormContainer">
        <div className="Headline">
          <p className="Heading">Create New Account</p>
        </div>
        <div>
          
        </div>
        <Form method="post">
          <p style={errMessageStyle}>{errMessage}</p>
          <p style={okMessageStyle}>{okMessage}</p>
          <div className="InputField"><input type="text" placeholder="First Name" name="username" value={firstName} onChange={handleFirstNameChange} /></div>
          <div className="InputField"><input type="email" placeholder="Last Name" name="email" value={lastName} onChange={handleLastNameChange} /></div>
          <div className="InputField"><input type="email" placeholder="Email" name="email" value={email} onChange={handleEmailChange} /></div>
          <div className="InputField"><input type="password" placeholder="Password" name="password" value={password} onChange={handlePasswordChange} /></div>
          <div className="InputField"><input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </div>
          <div>
            <select onChange={handleRoleChange}>
               <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button className="SubmitButton" type="submit" onClick={handleFormSubmission}>Register</button>
        </Form>
        <br />
        <hr />
        <Link to={"/login"}> Login instead</Link>
      </div>

    </div>
  );
};

export default Register;