import React, { useState } from 'react';
import Toast from '../components/Toast';
import './Pages.css';

function Feedback() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackCategory, setFeedbackCategory] = useState('Usability');
  const [comments, setComments] = useState('');
  
  // Toast notifications state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate feedback submission
    setToastMessage(`Thank you! Your ${rating}-star feedback has been registered.`);
    setShowToast(true);
    
    // Reset inputs
    setRating(5);
    setComments('');
    setFeedbackCategory('Usability');

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="page-container">
      <div className="page-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Header */}
        <section className="page-section" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Share Feedback</h1>
          <p className="page-subtitle">Your insights help us refine our tools and prompt databases.</p>
        </section>

        {/* Feedback Form */}
        <form className="pages-form" onSubmit={handleSubmit}>
          
          {/* Star selector */}
          <div className="form-group">
            <label>Overall Rating</label>
            <div className="star-selector">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  className={`star-btn ${(hoverRating || rating) >= star ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  aria-label={`Rate ${star} Stars`}
                >
                  ★
                </button>
              ))}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '12px', fontWeight: 600 }}>
                {rating === 5 ? 'Excellent!' : rating === 4 ? 'Great!' : rating === 3 ? 'Good' : rating === 2 ? 'Needs Work' : 'Poor'}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">What area needs improvement?</label>
            <select 
              id="category" 
              className="form-select"
              value={feedbackCategory}
              onChange={e => setFeedbackCategory(e.target.value)}
            >
              <option value="Usability">CSV Maker Usability</option>
              <option value="AI Prompts">Shopify AI Prompts Quality</option>
              <option value="Scraper Performance">Scraper Simulator Speed</option>
              <option value="Documentation">General Documentation / Stepper guides</option>
              <option value="Other">Other Issues</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Additional Comments</label>
            <textarea 
              id="comments" 
              className="form-textarea" 
              placeholder="What do you think we could do better?" 
              required
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit">
            <i className="fas fa-check-circle"></i> Submit Feedback
          </button>

        </form>

      </div>

      {/* Global Toast component */}
      <Toast showToast={showToast} toastMessage={toastMessage} />

    </div>
  );
}

export default Feedback;
