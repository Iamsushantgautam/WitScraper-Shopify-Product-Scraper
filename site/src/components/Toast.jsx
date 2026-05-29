import React from 'react';
import '../styles/Toast.css';

function Toast({ showToast, toastMessage }) {
  return (
    <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
      <span className="toast-icon">✨</span>
      <span className="toast-message">{toastMessage}</span>
    </div>
  );
}

export default Toast;
