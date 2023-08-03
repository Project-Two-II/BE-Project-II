import React, { useState } from 'react';
import { Form, Link, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import { setCred } from '../features/info'

import { useNavigate } from "react-router-dom";

// const Logout = () => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate();

//     dispatch(setCred({isLoggedIn: isLoggedIn, token: data.tokens.access, role: data.role}))
//     navigate("/home")
//     return (
//         <>
//         </>
//     )
// }

const Logout = () => {
    // const dispatch = useDispatch()
    // dispatch(setCred({isLoggedIn: isLoggedIn, token: data.tokens.access, role: data.role}))
    const token = useSelector((state) => state.token);
    console.log(token)
    const refreshToken = useSelector((state) => state.refreshToken)
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        body:{
            "refresh" : refreshToken
        }
    }
    fetch("http://localhost:8000/api/userauth/logout/", fetchOption)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
        .catch( err => console.log(err))
    // .then((resp)=>{
    //     if(resp.status == 205)
    //         console.log(resp.json())
    //     else
    //         console.log(resp.json())
    // })
    return (
        <>
        </>
    )
}

export default Logout