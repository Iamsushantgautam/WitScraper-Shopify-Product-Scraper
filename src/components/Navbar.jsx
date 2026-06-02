import React, { useState } from 'react';
import '../styles/Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo Area */}
        <a href="/" className="logo-area" onClick={closeMobileMenu}>
          <img src="/extension/icons/icon-48.png" alt="WitScraper Logo" className="nav-logo" />
          <span className="nav-brand">WitScraper</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links">
          <a href="/csv-maker">CSV Master Tool</a>
          <a href="/shopifyaiprompts">Shopify AI Prompts</a>
          <a href="/shopify-apps">Shopify Apps</a>
          <a href="/docs">Docs</a>
          <a href="/founder">Meet Founder</a>
        </nav>

        {/* Desktop CTA */}
        <div className="nav-cta-wrapper">
          <a href="/witscraper-extension.zip" className="btn btn-nav" download>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download ZIP
          </a>
        </div>

        {/* Mobile Hamburger Button Toggle */}
        <button 
          className={`nav-hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </div>

      {/* Mobile Drawer Side Panel Overlay */}
      <div className={`nav-mobile-drawer ${isMobileMenuOpen ? 'show' : ''}`}>
        <nav className="mobile-nav-links">
          <a href="/csv-maker" onClick={closeMobileMenu}>
            <i className="fas fa-file-csv"></i> CSV Master Tool
          </a>
          <a href="/shopifyaiprompts" onClick={closeMobileMenu}>
            <i className="fas fa-magic"></i> Shopify AI Prompts
          </a>
          <a href="/shopify-apps" onClick={closeMobileMenu}>
            <i className="fas fa-store"></i> Shopify Apps
          </a>
          <a href="/docs" onClick={closeMobileMenu}>
            <i className="fas fa-book"></i> Features & Docs
          </a>
          <a href="/founder" onClick={closeMobileMenu}>
            <i className="fas fa-user-circle"></i> Meet Founder
          </a>
          
          <a href="/witscraper-extension.zip" className="btn btn-nav mobile-cta-btn" download onClick={closeMobileMenu}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download ZIP
          </a>

          {/* Mobile Drawer Footer Info & Socials */}
          <div className="mobile-drawer-footer">
            <div className="mobile-social-links">
              <a href="https://github.com/Iamsushantgautam" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/iamsushantgautam" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://www.sushant.online" target="_blank" rel="noopener noreferrer" title="Portfolio"><i className="fas fa-globe"></i></a>
            </div>
            <p className="mobile-version-text">WitScraper v1.0.0 • Handcrafted by Sushant</p>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Side Panel Dim Backdrop */}
      {isMobileMenuOpen && (
        <div className="nav-mobile-backdrop" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
}

export default Navbar;
