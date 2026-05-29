import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-brand">
          <div className="logo-area">
            <img src="/extension/icons/icon-32.png" alt="Logo" width="28" height="28" />
            <span className="footer-brand-title">WitScraper</span>
          </div>
          <p className="footer-description">
            handcrafting private e-commerce scrapers and high-performance Shopify section prompt matrices locally.
          </p>
          <div className="footer-social-icons">
            <a href="https://github.com/Iamsushantgautam" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/iamsushantgautam" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="https://www.sushant.online" target="_blank" rel="noopener noreferrer" title="Portfolio"><i className="fas fa-globe"></i></a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-links-col">
            <h4>Products</h4>
            <a href="/csv-maker">CSV Master Tool</a>
            <a href="/shopifyaiprompts">Shopify AI Prompts</a>
            <a href="/shopify-apps">Shopify Apps</a>
          </div>

          <div className="footer-links-col">
            <h4>Creator</h4>
            <a href="/founder">Meet Founder</a>
            <a href="/about-us">About Us</a>
            <a href="https://www.sushant.online" target="_blank" rel="noopener noreferrer">Sushant.online</a>
          </div>

          <div className="footer-links-col">
            <h4>Help & Privacy</h4>
            <a href="/content">Contact Us</a>
            <a href="/feedback">Share Feedback</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 WitScraper • Handcrafted by <a href="https://www.sushant.online" target="_blank" rel="noopener noreferrer">Sushant Gautam</a> • Open source under the MIT License.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
