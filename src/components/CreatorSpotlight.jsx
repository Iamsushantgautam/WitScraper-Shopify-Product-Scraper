import React from 'react';
import '../styles/CreatorSpotlight.css';

function CreatorSpotlight() {
  return (
    <section id="creator" className="creator-section">
      <div className="section-container">
        <div className="creator-card">
          <div className="creator-glow"></div>
          <div className="creator-details">
            <div className="creator-header">
              <span className="creator-tag">💡 About The Creator</span>
              <h2>Sushant Gautam</h2>
            </div>
            <p className="creator-bio">
              I am dedicated to crafting fast, elegant, and reliable developer utilities and automation scrapers. I believe tools should be powerful but lightweight, completely private, and highly aesthetic. I designed WitScraper to solve the exact problems faced by creators and developers trying to analyze store product architectures without paying premium monthly fees or compromising security.
            </p>
            <div className="creator-actions">
              <a href="https://www.sushant.online" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow">
                Visit Creator Portfolio
              </a>
              <span className="disclosure-badge">🔒 100% Private, No Trackers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreatorSpotlight;
