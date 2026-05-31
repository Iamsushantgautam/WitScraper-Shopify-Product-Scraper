import React, { useState } from 'react';
import './Pages.css';

function Feedback() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackCategory, setFeedbackCategory] = useState('Usability');
  const [comments, setComments] = useState('');
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: 'b3b48ffe-9e5e-41c5-b7f6-b4e505acff7e',
        formType: 'Feedback Form',
        email: 'iamsushantgatam@gmail.com',
        _email: 'iamsushantgatam@gmail.com',
        _replyto: 'iamsushantgatam@gmail.com',
        rating: rating,
        category: feedbackCategory,
        comments: comments
      }),
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) {
          const errMsg = json.message || `Submission failed with status ${res.status}`;
          throw new Error(errMsg);
        }
        const msg = `Thank you! Your ${rating}-star feedback has been registered.`;
        setStatus({ type: 'success', message: msg });
        // Reset inputs
        setRating(5);
        setComments('');
        setFeedbackCategory('Usability');
      })
      .catch(err => {
        console.error('Error submitting feedback form:', err);
        const errMsg = err.message === 'Failed to fetch'
          ? "Network error. Please check your internet or domain restriction settings."
          : `Submission failed: ${err.message}`;
        setStatus({ type: 'error', message: errMsg });
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => {
          setStatus({ type: '', message: '' });
        }, 6000);
      });
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <button type="submit" className="btn-submit" disabled={isSubmitting} style={{ marginTop: 0 }}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i> Submit Feedback
                </>
              )}
            </button>

            {status.message && (
              <div className={`form-status-msg ${status.type}`}>
                {status.type === 'success' ? (
                  <i className="fas fa-check-circle"></i>
                ) : (
                  <i className="fas fa-exclamation-circle"></i>
                )}
                <span>{status.message}</span>
              </div>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}

export default Feedback;
