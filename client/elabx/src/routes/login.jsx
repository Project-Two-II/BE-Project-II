import React, { useEffect, useState } from 'react';
import {Form, Link, useNavigate} from 'react-router-dom';
import loginimg from "../media/reg.png";


import { useDispatch, useSelector } from 'react-redux'
 import { setCred } from '../features/info'

import { Navigate } from "react-router-dom";
import '../login.css'
import '../App.css'

const errMessageStyle = {
  color: "blue"
}


const Login = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const role  = useSelector((state) => state.role);


  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [hasError, setHasError] = useState(false)


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  
  const handleFormSubmission = (e) => {
    e.preventDefault();

    if(email.length === 0 || password.length === 0 ){
      setHasError(true)
      setErrMessage('All fields are required');
      return;
    }
      const fetchOption = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          "email": email,
          "password": password
        })
     }
      fetch("http://localhost:8000/api/userauth/login/", fetchOption)
      .then((resp) => {
        if(resp.status == 400){
          setHasError(true);
          return resp.json()
        }
        else {
          setHasError(false)
          return resp.json()
        }
      })
      .then(async (data) => {
        if(hasError){
          setErrMessage(data.detail)
        } else{
          dispatch(setCred({isLoggedIn: true, token: data.tokens.access, role: data.role, refreshToken: data.tokens.refresh}))
          
        }
      })
      .catch(err => console.log(err))
      if (role == 1) return <Navigate to={"/dashboard/home"}/>
      if (role == 0) return <Navigate to={"/home"}/>
  };

    // Check isLoggedIn and role here and redirect accordingly
  useEffect(() => {
    if (isLoggedIn) {
      if (role === 1) {
        // Redirect to the teacher dashboard
        navigate("/dashboard/home")
      } else if (role === 0) {
        // Redirect to the home page
        navigate("/dashboard/home")
      }
    }
  }, [isLoggedIn, role]);
 
  return (
    <div className="BoxContainer">
        <div className="FormJumbotron">
        <div className="login__img">
              <img src={loginimg} alt="" className="w-100" />
              <h1 className="col-wh main-heading">ELABX</h1>
            </div>
           </div>
  
        <div className="FormContainer">
            <div className="Headline">
                <p className= "Heading">Login To Continue.</p>
            </div>
            <div>
                <p className="Message"></p>
            </div>
            <Form>
                <p style={errMessageStyle}>{errMessage}</p>
                <div className="InputField">
                    <input type = "text" placeholder = "Email"  name = "email" value={email} onChange={handleEmailChange}/>
                </div>
                <div className="InputField">
                    <input type = "password" placeholder = "Password" name = "password" value={password} onChange={handlePasswordChange}/>
                </div>
  
                <button className="SubmitButton btn-hover" onClick={handleFormSubmission}>Login</button>
                <Link to={"/register"}>Create a new account</Link>
            </Form>
            <br/>
            <hr/>
        </div>
  
    </div>
  );
};

export default Login;
