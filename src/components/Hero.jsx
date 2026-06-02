import React, { useState, useEffect, useRef } from 'react';
import '../styles/Hero.css';

function Hero() {
  /* 3D Tilt Hook Logic */
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s ease'
  });
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateY(-5deg) rotateX(5deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease'
    });
  };

  // Dynamic products parsing ticking animation
  const [productCount, setProductCount] = useState(0);
  useEffect(() => {
    let count = 0;
    const duration = 1200; // 1.2 seconds animation
    const increment = Math.ceil(842 / (duration / 20));
    
    const interval = setInterval(() => {
      count += increment;
      if (count >= 842) {
        setProductCount(842);
        clearInterval(interval);
      } else {
        setProductCount(count);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      <div className="section-container hero-grid">
        <div className="hero-content">
          <div className="badge-pill">
            <span className="live-spark"></span>
            🚀 100% Free & Open Source Scraper
          </div>
          
          <h1 className="hero-title">
            Extract Shopify Product Catalogs <span className="gradient-text">Instantly</span>
          </h1>
          
          <p className="hero-subtitle">
            A powerful Chrome extension designed to extract product details, variant listings, image assets, and SEO metadata from any Shopify-powered store. Export direct to verified Shopify-import compatible CSVs.
          </p>
          
          <div className="hero-actions">
            <a href="/witscraper-extension.zip" className="btn btn-primary btn-large-landing" download>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Extension ZIP
            </a>
            <a href="#install" className="btn btn-secondary btn-large-landing">
              Learn How to Install
            </a>
          </div>
          
          <div className="hero-meta">
            <span><i className="fas fa-check-circle"></i> No Signup Required</span>
            <span><i className="fas fa-check-circle"></i> Works on Any Shopify Store</span>
            <span><i className="fas fa-check-circle"></i> 100% Clean Local Code</span>
          </div>
        </div>

        {/* Floating Extension Preview (Glassmorphic Mockup) */}
        <div
          className="hero-mockup-wrapper"
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="hero-mockup-glow"></div>
          <div className="extension-mockup" style={tiltStyle}>
            
            {/* Mockup Header aligned with Emerald brand colors */}
            <div className="mockup-header">
              <div className="logo-area">
                <img src="/extension/icons/icon-48.png" alt="Logo" width="36" height="36" style={{ borderRadius: '4px' }} />
                <span>WitScraper Dashboard</span>
              </div>
              <div className="connection-status">
                <span className="dot"></span> <span>Connected</span>
              </div>
            </div>

            {/* Mockup Body (Dashboard) */}
            <div className="mockup-body">
              
              {/* Store Card */}
              <div className="m-card store-card">
                <div className="m-store-header">
                  <div>
                    <h3>Aesthetic Clothing Co.</h3>
                    <div className="m-store-link">aesthetic-apparel.com</div>
                  </div>
                  <span className="m-badge verified">✓ Verified Shopify</span>
                </div>

                <div className="m-info-row">
                  <span className="m-icon">📍</span>
                  <span>Store Location: <strong>New York, USA</strong></span>
                </div>
                <div className="m-info-row">
                  <span className="m-icon">🎨</span>
                  <span>Theme Name: <strong>Dawn (Custom v12.1)</strong></span>
                </div>

                {/* Stats Grid with dynamic counting animation */}
                <div className="m-stats-grid">
                  
                  <div className="m-stat-item">
                    <div className="m-stat-icon blue">📦</div>
                    <div className="m-stat-content">
                      <strong className="counting-stat">{productCount}</strong>
                      <span>Products</span>
                    </div>
                  </div>
                  
                  <div className="m-stat-item">
                    <div className="m-stat-icon purple">📚</div>
                    <div className="m-stat-content">
                      <strong className="counting-stat">{Math.min(24, Math.ceil(productCount / 35))}</strong>
                      <span>Collections</span>
                    </div>
                  </div>
                  
                  <div className="m-stat-item">
                    <div className="m-stat-icon light-blue">📅</div>
                    <div className="m-stat-content">
                      <strong>2023-01-14</strong>
                      <span>First Product</span>
                    </div>
                  </div>
                  
                  <div className="m-stat-item">
                    <div className="m-stat-icon light-purple">🕒</div>
                    <div className="m-stat-content">
                      <strong>Active</strong>
                      <span>Catalog Age</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Mock Actions */}
              <div className="m-export-btn">
                <span className="m-btn-icon">⚡</span>
                <span>Export All Products</span>
                <span className="m-btn-badge">{productCount}</span>
              </div>

              <div className="m-card collections-card">
                <div className="m-card-title">📚 Filter by Collection</div>
                <div className="m-select">Summer Collection (128 items)</div>
                <div className="m-export-btn btn-pink">
                  <span>Export Collection</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
