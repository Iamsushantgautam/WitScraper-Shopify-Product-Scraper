import React from 'react';
import './ShopifyApps.css';


function ShopifyAppCard({ app, onCopyName }) {
  return (
    <article className="sapps-card">
      <div className="sapps-card-header">
        <div className={`sapps-icon-box ${app.color}`}>
          <img
            src={`https://www.google.com/s2/favicons?domain=${new URL(app.link).hostname}&sz=64`}
            alt={app.name}
            className="sapps-favicon"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="sapps-title-area">
          <div className="sapps-meta-row">
            <span className="sapps-tag sapps-category-badge">{app.category}</span>
            <span className="sapps-rating-badge">★ {app.rating} <small>({app.reviews})</small></span>
          </div>
          <h3
            className="sapps-app-name"
            onClick={() => onCopyName(app.name)}
            title="Click to copy name"
          >
            {app.name}
          </h3>
        </div>
      </div>

      <div className="sapps-card-body">
        <p className="sapps-app-desc">{app.desc}</p>
        <div className="sapps-highlight-box">
          <strong>⭐ Why it's the best:</strong>
          <p>{app.whyBest}</p>
        </div>
        <div className="sapps-badges-row">
          <span className="sapps-badge-benefit">✓ {app.benefit}</span>
          <span className="sapps-badge-price">💰 {app.price}</span>
        </div>
      </div>

      <footer className="sapps-card-footer">
        <button className="sapps-copy-name-btn" onClick={() => onCopyName(app.name)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy Name
        </button>
        <a href={app.link} target="_blank" rel="noopener noreferrer" className="sapps-visit-btn">
          Visit App Store
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </footer>
    </article>
  );
}

export default ShopifyAppCard;
