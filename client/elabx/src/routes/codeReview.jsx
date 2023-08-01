
import React, { useState } from 'react';
import './codeReview.css';
import logo from '../media/logo.png'


const CodeReviewSection = () => {
  const [code, setCode] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div className="code-review-section">
      
      <div className="code-container">
        <div className='crHeader'>
        <h3>Student Code:</h3>
        <img src={logo} alt="logo" className="logo" height={80} width={80}/> 
        </div>
        

        <div className="code-section">
          <pre>{code}</pre>
        </div>
      </div>

      <div className="comments-container">
        <div className="comments-header">
          
        </div>
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <h3>Add Comment:</h3>
          <textarea
            className="comment-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="submit-comment-btn">
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CodeReviewSection;
