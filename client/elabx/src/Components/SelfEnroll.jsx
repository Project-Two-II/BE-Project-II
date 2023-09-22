import React, { useState } from 'react';

const divStyle ={
    backgroundColor: '#1E293B', 
    color: 'white', 
    padding: '20px', 
    width: '400px', 
    margin: '20px auto', 
    textAlign: 'center' 
}
const inputStyle = {
    border: 'none', 
    backgroundColor: '#ffffff', 
    color: 'black', 
    padding: '10px', 
    margin: '20px'
}
const btnStyle ={
    backgroundColor: 'white', 
    color: '#1E293B', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer'
}

function SelfEnroll() {
    const [enrollmentKey, setEnrollmentKey] = useState('');
    const [enrollmentSuccessful, setEnrollmentSuccessful] = useState(false);

    const handleEnrollment = () => {
        setEnrollmentSuccessful(true);
    };

    return (
        <div style={divStyle}>
            <h2>Enrollment Key </h2>
            <input type="text" style={inputStyle} value={enrollmentKey} onChange={(e) => setEnrollmentKey(e.target.value)} />
            <br />
            <br />
            <button style={btnStyle} onClick={handleEnrollment}>Add </button>
            {enrollmentSuccessful && <p>Enrollment Key Added Successfully!</p>}
        </div>
    );
}

export default SelfEnroll;