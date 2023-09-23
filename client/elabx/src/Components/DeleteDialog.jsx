import React, { useState } from 'react';
import './Create.css';

function DeleteDialog({ onDelete, onCancel }) {
  return (
    <div className="delete-dialog-overlay">
      <div className="delete-dialog">
        <div className="delete-dialog-content">
          <p>Are you sure you want to delete this item?</p>
          <div className="button-container">
            <button onClick={onDelete}>Yes</button>
            <button onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
