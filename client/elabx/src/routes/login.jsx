import React, { useState } from 'react';
import {Form, Link} from 'react-router-dom';
import loginimg from "../media/reg.png";


import { useDispatch, useSelector } from 'react-redux'
 import { setCred } from '../features/info'

import { useNavigate } from "react-router-dom";
import '../login.css'

const errMessageStyle = {
  color: "blue"
}


const Login = () => {
  const navigate = useNavigate();


   const isLoggedIn = useSelector((state) => state.isLoggedIn)
   if(isLoggedIn) navigate("/home")
  // const token = useSelector((state) => state.cred.token);
  // const role = 0

  const dispatch = useDispatch()

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
          console.log("400 bad req")
          console.log("HasError: " + hasError)
          setHasError(true);
          console.log("HasError: " + hasError)
          return resp.json()
        }
        else {
          setHasError(false)
          return resp.json()
        }
      })
      .then(async (data) => {
        if(hasError){
          console.log("Has Error")
          setErrMessage(data.detail)
          setHasError(false)
        } else{
          const isLoggedIn = true
         
          setHasError(false);
          console.log("Redirecting...")
          console.log(data.tokens.refresh)
          dispatch(setCred({isLoggedIn: isLoggedIn, token: data.tokens.access, role: data.role, refreshToken: data.tokens.refresh}))
          
          navigate("/home")
        }
      })
      .catch(err => console.log(err))
  };


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
