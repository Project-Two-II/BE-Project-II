import React from 'react';

const NotFoundPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1 style={{color: 'grey', fontWeight: 'bold' }}>404 Error</h1>
      <div>
        <p style={{ fontStyle: 'italic' }}>Oops! The page you are looking for does not exist.</p>
        <p style={{ fontStyle: 'italic' }}>Please check the URL or go back to the homepage.</p>
      </div>
      <button style={{ backgroundColor:'blue',color:'white', fontWeight: 'bold', marginTop: '20px',padding:'10px' }}>Go to Homepage</button>
    </div>
  );
};

export default NotFoundPage;