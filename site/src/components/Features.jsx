import React from 'react';
import '../styles/Features.css';

function Features() {
  const features = [
    {
      icon: "fas fa-search",
      gradient: "bg-gradient-1",
      name: "Shopify Auto-Detection",
      desc: "Instantly identifies Shopify structures in active tabs. Keeps tabs clean, operating background-detection processes seamlessly."
    },
    {
      icon: "fas fa-chart-line",
      gradient: "bg-gradient-2",
      name: "Complete Meta Extract",
      desc: "Scrapes variants, titles, descriptions (HTML formatted), handle paths, exact stock listings, images, prices, and tags."
    },
    {
      icon: "fas fa-sliders-h",
      gradient: "bg-gradient-3",
      name: "Catalog Diagnostics",
      desc: "Displays comprehensive diagnostic reports about targets, including collection setups, oldest/newest products, and active themes."
    },
    {
      icon: "fas fa-file-csv",
      gradient: "bg-gradient-4",
      name: "Shopify Ready CSV",
      desc: "Generates formatted files ready to be imported back into Shopify without adjustments. Includes precise multi-row variant support."
    },
    {
      icon: "fas fa-file-export",
      gradient: "bg-gradient-5",
      name: "Flexible Export Scope",
      desc: "Download entire product databases, filter by designated store collections, select custom rows in grid view, or export individually."
    },
    {
      icon: "fas fa-user-shield",
      gradient: "bg-gradient-6",
      name: "No Setup & 100% Secure",
      desc: "Runs entirely on your local machine as an unpackaged local extension. No remote accounts, no cloud APIs, and zero tracking scripts."
    }
  ];
  
  return (
    <section id="features" className="features-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Designed for Maximum Speed & Accuracy</h2>
          <p className="section-subtitle">WitScraper streamlines your e-commerce analysis pipeline by providing instantaneous access to complete store records.</p>
        </div>

        <div className="features-grid">
          {features.map((feat, index) => (
            <div className="feature-card" key={index}>
              <div className={`feature-icon ${feat.gradient}`}>
                <i className={feat.icon}></i>
              </div>
              <div className="feature-info">
                <h3 className="feature-name">{feat.name}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
