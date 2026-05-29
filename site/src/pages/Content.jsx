import React, { useState } from 'react';
import Toast from '../components/Toast';
import './Pages.css';

function Content() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  
  // Toast notifications state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate successful form submission
    setToastMessage(`Thanks ${formData.name}! Your message has been sent successfully.`);
    setShowToast(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: ''
    });

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
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

          <button type="submit" className="btn-submit">
            <i className="fas fa-paper-plane"></i> Send Message
          </button>

        </form>

      </div>

      {/* Global Toast component */}
      <Toast showToast={showToast} toastMessage={toastMessage} />

    </div>
  );
}

export default Content;
