import React, { useState } from 'react';
import ShopifyAppCard from '../ShopifyApps/ShopifyAppCard';
import { featuredApps } from '../ShopifyApps/appsData';
import '../styles/ShopifyAppsCarousel.css';

function ShopifyAppsCarousel() {
  const [toast, setToast] = useState({ show: false, message: '' });

  const handleCopyName = (name) => {
    navigator.clipboard.writeText(name);
    setToast({ show: true, message: `Copied "${name}" to clipboard!` });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  return (
    <>
      <section id="apps-showcase" className="sac-section">
        <div className="section-container">

          <div className="section-header">
            <h2 className="section-title">Top Shopify Apps</h2>
            <p className="section-subtitle">
              Handpicked, high-conversion apps to supercharge your store's design, marketing, and revenue.
            </p>
          </div>

          {/* 4-column grid on desktop */}
          <div className="sac-grid">
            {featuredApps.map(app => (
              <ShopifyAppCard
                key={app.id}
                app={app}
                onCopyName={handleCopyName}
              />
            ))}
          </div>

          <div className="sac-footer">
            <span className="sac-footer-hint">
              <i className="fas fa-store" />&nbsp;Explore the full directory
            </span>
            <a href="/shopify-apps" className="btn btn-secondary">View All Apps</a>
          </div>

        </div>
      </section>

      <div className={`sac-toast ${toast.show ? 'show' : ''}`}>
        <i className="fas fa-check" /> {toast.message}
      </div>
    </>
  );
}

export default ShopifyAppsCarousel;
