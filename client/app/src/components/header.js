import '../App.css';
import React from 'react';
import userlogo from '../media/people.svg';

function Header() {
    return (
        <header>
            <span className="elabx">ELabX</span>
            <img className="userProfile-logo" src={userlogo} alt="image" ></img>
            <img></img>
        </header>
    );
}
export default Header;