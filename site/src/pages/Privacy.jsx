import React from 'react';
import './Pages.css';

function Privacy() {
  return (
    <div className="page-container">
      <div className="page-card">
        
        {/* Header */}
        <section className="page-section" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Effective Date: May 29, 2026</p>
        </section>

        {/* Data processing */}
        <section className="page-section">
          <h3><i className="fas fa-user-shield"></i> 100% Client-Side Privacy</h3>
          <p>
            At WitScraper, we take your data privacy seriously. Unlike traditional scraping web portals, WitScraper runs <strong>entirely locally</strong> inside your Chrome extension and web browser client. We do not host databases, external tracking scripts, or analytical servers that collect product databases compiled by your scraper.
          </p>
        </section>

        {/* Types of Information processed */}
        <section className="page-section">
          <h3><i className="fas fa-database"></i> What Data is Processed?</h3>
          <ul>
            <li><li><i className="fas fa-check-circle"></i> <strong>Shopify Store URLs</strong>: Input coordinates are requested solely to scan products and build sheets in real-time.</li></li>
            <li><li><i className="fas fa-check-circle"></i> <strong>Scraped Product Lists</strong>: Extracted arrays are compiled directly in your browser's local memory and exported immediately as physical CSV/Excel files.</li></li>
            <li><li><i className="fas fa-check-circle"></i> <strong>Form Inputs</strong>: Mappings, synapses, and values set inside the CSV Master Tool are held inside React local state variables and are lost when the page refreshes.</li></li>
          </ul>
        </section>

        {/* Third Party sharing */}
        <section className="page-section">
          <h3><i className="fas fa-server"></i> Third-Party Sharing</h3>
          <p>
            Because we do not store, compile, or transmit your extracted files to any server, there is <strong>zero possibility</strong> of your scanned competitor lists being leaked, shared, sold, or distributed to any third party. Your data remains on your hardware under your absolute authority.
          </p>
        </section>

        {/* Cookie usage */}
        <section className="page-section">
          <h3><i className="fas fa-cookie"></i> Cookies and Tracking</h3>
          <p>
            This website does not utilize analytics cookies, marketing pixels, or custom tracking frames. We believe in providing lightweight, direct open-source utilities without tracking footprints.
          </p>
        </section>

      </div>
    </div>
  );
}

export default Privacy;
