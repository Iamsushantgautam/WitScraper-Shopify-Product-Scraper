import React from 'react';
import './Pages.css';

function Founder() {
  return (
    <div className="page-container">
      <div className="page-card">
        
        {/* Header */}
        <section className="page-section" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="page-title">Meet The Founder</h1>
          <p className="page-subtitle">The creator behind the WitScraper open-source project.</p>
        </section>

        {/* Founder Spotlight Card Layout */}
        <section className="page-section founder-grid">
          
          {/* Avatar Panel */}
          <div className="founder-avatar-pane">
            <div className="founder-avatar-wrapper">
              <img 
                className="founder-avatar" 
                src="/extension/icons/icon-128.png" 
                alt="Sushant Gautam Avatar" 
              />
            </div>
            <span className="founder-role-badge">Creator & Dev</span>
            
            <div className="founder-socials">
              <a href="https://github.com/Iamsushantgautam" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/iamsushantgautam" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://www.sushant.online" target="_blank" rel="noopener noreferrer" title="Portfolio"><i className="fas fa-globe"></i></a>
            </div>
          </div>

          {/* Biography details */}
          <div style={{ textAlign: 'left' }}>
            <h3><i className="fas fa-user"></i> Sushant Gautam</h3>
            <p>
              Hi there, I'm Sushant. I'm an independent full-stack developer with a passion for designing premium e-commerce utilities, Chrome extensions, and React dashboards. I started WitScraper with a simple goal: to make Shopify store auditing and data migration straightforward.
            </p>
            <p>
              Many tools on the market are hidden behind premium subscription models, store limits, and slow background processes. I built WitScraper to run entirely inside the user's browser sandbox, processing data directly from active Shopify endpoint records instantly and securely.
            </p>
            <p>
              If you have any feedback or would like to collaborate on open-source e-commerce packages, feel free to connect with me through my channels below!
            </p>
          </div>

        </section>

        {/* Accomplishments */}
        <section className="page-section" style={{ marginTop: '24px' }}>
          <h3><i className="fas fa-code"></i> Engineering Philosophy</h3>
          <ul>
            <li><li><i className="fas fa-check-circle"></i> <strong>Sleek Visual Aesthetics</strong>: Designing premium interfaces with micro-interactions.</li></li>
            <li><li><i className="fas fa-check-circle"></i> <strong>User-First Transparency</strong>: Writing clean code that is fully readable and auditable.</li></li>
            <li><li><i className="fas fa-check-circle"></i> <strong>Privacy by Default</strong>: Building client-side engines that never track or store user details.</li></li>
          </ul>
        </section>

      </div>
    </div>
  );
}

export default Founder;
