import React, { useState } from 'react';
import './Pages.css';

function Content() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        formType: 'Contact Form',
        name: formData.name,
        email: formData.email || 'iamsushantgatam@gmail.com',
        _email: formData.email || 'iamsushantgatam@gmail.com',
        _replyto: formData.email || 'iamsushantgatam@gmail.com',
        subject: formData.subject,
        message: formData.message
      }),
    })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) {
          const errMsg = json.message || `Submission failed with status ${res.status}`;
          throw new Error(errMsg);
        }
        const msg = `Thanks ${formData.name}! Your message has been sent successfully.`;
        setStatus({ type: 'success', message: msg });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: ''
        });
      })
      .catch(err => {
        console.error('Error submitting contact form:', err);
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
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Have questions or want to collaborate? Send a message!</p>
        </section>

        {/* Contact Form */}
        <form className="pages-form" onSubmit={handleSubmit}>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-input" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-input" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select 
              id="subject" 
              name="subject" 
              className="form-select"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Suggestion">Feature Suggestion</option>
              <option value="Collaboration">Collaboration</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea 
              id="message" 
              name="message" 
              className="form-textarea" 
              placeholder="Write your message here..." 
              required
              value={formData.message}
              onChange={handleChange}
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
                  <i className="fas fa-paper-plane"></i> Send Message
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

export default Content;
