import React from 'react';
import './Pages.css';

function AboutUs() {
  return (
    <div className="page-container">
      <div className="page-card">
        
        {/* Header */}
        <section className="page-section" style={{ textAlign: 'center' }}>
          <h1 className="page-title">About WitScraper</h1>
          <p className="page-subtitle">handcrafting high-speed, local Shopify extraction mechanisms.</p>
        </section>

        {/* Mission */}
        <section className="page-section">
          <h3><i className="fas fa-bullseye"></i> Our Mission</h3>
          <p>
            At WitScraper, we believe in building tools that empower developers, drop-shippers, and creators. Finding, parsing, and formatting Shopify product details should be direct, private, and instantaneous. We make the bridge between raw Shopify store product collections and standard spreadsheet software seamless.
          </p>
        </section>

        {/* Core Values Cards Grid */}
        <section className="page-section">
          <h3><i className="fas fa-star"></i> Core Pillars</h3>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card-icon"><i className="fas fa-user-shield"></i></div>
              <h4>100% Privacy</h4>
              <p>All scraping routines run inside your browser. Your data is yours and never touches external databases.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon"><i className="fas fa-bolt"></i></div>
              <h4>Zero Delay</h4>
              <p>Optimized algorithms extract product JSON formats immediately from Shopify API streams.</p>
            </div>
            <div className="about-card">
              <div className="about-card-icon"><i className="fas fa-laptop-code"></i></div>
              <h4>Open Source</h4>
              <p>Built transparently for developers, allowing you to review code, add parameters, and build custom sheets.</p>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="page-section">
          <h3><i className="fas fa-users"></i> Who is this for?</h3>
          <ul>
            <li><li><i className="fas fa-check-circle"></i> <strong>Drop-shippers</strong> compiling supplier records quickly.</li></li>
            <li><li><i className="fas fa-check-circle"></i> <strong>E-Commerce Developers</strong> migrating Shopify products onto sandbox testing stores.</li></li>
            <li><li><i className="fas fa-check-circle"></i> <strong>Theme Designers</strong> setting up custom preview blocks immediately.</li></li>
          </ul>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;
