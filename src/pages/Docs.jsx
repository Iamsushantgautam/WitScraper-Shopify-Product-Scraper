import React, { useState, useEffect, useRef } from 'react';
import './Pages.css';

function Docs() {
  const [activeSection, setActiveSection] = useState('intro');
  const [activeFaq, setActiveFaq] = useState(null);

  const sections = [
    { id: 'intro', label: 'Introduction', icon: 'fa-info-circle' },
    { id: 'extension', label: 'Chrome Extension Scraper', icon: 'fa-puzzle-piece' },
    { id: 'csv-maker', label: 'CSV Master Tool', icon: 'fa-file-csv' },
    { id: 'ai-prompts', label: 'Shopify AI Prompts', icon: 'fa-magic' },
    { id: 'apps-dir', label: 'Shopify Apps Directory', icon: 'fa-store' },
    { id: 'faq', label: 'Frequently Asked Questions', icon: 'fa-question-circle' }
  ];

  const faqItems = [
    {
      question: "Is WitScraper safe to use with Shopify's anti-scraping measures?",
      answer: "Absolutely. Unlike bulk scraper bots that spam Shopify endpoints from cloud servers, WitScraper runs 100% locally inside your standard browser window. It acts precisely as a standard client requesting collections JSON files, which is fully compliant and highly secure. There is zero risk to your IP or credentials."
    },
    {
      question: "Why does the Bulk Inventory Export default to 50?",
      answer: "Many modern Shopify themes hide absolute inventory numbers in their public JSON output to protect operational data. In these scenarios, WitScraper automatically detects the missing inventory levels and implements a reliable default threshold value of 50. This ensures seamless imports into external spreadsheet software or secondary storefronts without breaking catalog sync routines."
    },
    {
      question: "Where is my scraped data stored?",
      answer: "Nowhere but your local device. We respect absolute privacy. Scraping routines, parsed product JSON streams, and custom spreadsheet conversions are performed purely client-side. The code does not contain any backend telemetry, keeping your store data, margins, and supplier records entirely private."
    },
    {
      question: "How do I import my exported CSV files directly into Shopify?",
      answer: "Every CSV generated via our CSV Master Tool or Chrome Extension adheres strictly to the official Shopify CSV schema. Simply head to your Shopify Admin Panel, navigate to 'Products', click 'Import', select the downloaded CSV file, and press 'Upload'. The mapping conforms 100% without manually matching headers."
    },
    {
      question: "Are there any licensing or usage restrictions?",
      answer: "No. WitScraper is completely free and open-source under the MIT license. You are free to modify the source code, distribute customs extensions, and deploy components inside your enterprise drop-shipping teams."
    }
  ];

  // Set up intersection observer to auto-track active section as user scrolls
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavLinkClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="docs-container">
      <div className="docs-grid">
        
        {/* Sticky Sidebar Navigation */}
        <aside className="docs-sidebar">
          <h4>Documentation</h4>
          <nav className="docs-nav">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`docs-nav-link ${activeSection === sec.id ? 'active' : ''}`}
                onClick={(e) => handleNavLinkClick(e, sec.id)}
              >
                <i className={`fas ${sec.icon}`}></i>
                {sec.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Documentation Content Sections */}
        <main className="docs-content-pane">
          <div className="docs-card">

            {/* SECTION 1: Introduction */}
            <section id="intro" className="docs-section">
              <div className="docs-title-wrapper">
                <h2>Introduction</h2>
                <span className="docs-badge">Overview</span>
              </div>
              <p className="docs-intro-p">
                Welcome to the <strong>WitScraper Suite</strong>—a premium ecosystem of modern Shopify scraping tools, prompt matrices, and utilities designed to accelerate e-commerce pipelines. 
              </p>
              <p>
                We believe finding, parsing, and staging store data should be fast, private, and painless. By eliminating expensive server subscriptions and complex scraper setups, WitScraper runs 100% locally inside your browser window. All products, tags, options, and imagery formats are processed directly within your browser, ensuring absolute security.
              </p>
              
              <div className="docs-divider"></div>

              <h3>Key Core Strengths</h3>
              <ul className="docs-list">
                <li>
                  <i className="fas fa-shield-alt"></i>
                  <span><strong>100% Client-Side Privacy:</strong> Your scraping sessions and product records never leave your local environment.</span>
                </li>
                <li>
                  <i className="fas fa-bolt"></i>
                  <span><strong>Instant Processing:</strong> Optimized parsing scripts extract records from JSON API layers without rate delays.</span>
                </li>
                <li>
                  <i className="fas fa-code"></i>
                  <span><strong>Standard Compliance:</strong> Output matches official Shopify schemas, ready for immediate platform importing.</span>
                </li>
              </ul>
            </section>

            <div className="docs-divider"></div>

            {/* SECTION 2: Chrome Extension Scraper */}
            <section id="extension" className="docs-section">
              <div className="docs-title-wrapper">
                <h2>Chrome Extension Scraper</h2>
                <span className="docs-badge chrome">Browser Extension</span>
              </div>
              <p>
                The <strong>WitScraper Chrome Extension</strong> is a high-speed, local extraction utility. It lives right inside your browser header and activates on any Shopify-powered domain, parsing products in single or bulk operations.
              </p>

              <div className="docs-features-grid">
                <div className="docs-feature-item">
                  <div className="docs-feature-item-header">
                    <i className="fas fa-location-arrow"></i>
                    <h4>Auto Domain Detection</h4>
                  </div>
                  <p>Instantly identifies Shopify setups and locks onto raw catalog streams without manual configurations.</p>
                </div>

                <div className="docs-feature-item">
                  <div className="docs-feature-item-header">
                    <i className="fas fa-tasks"></i>
                    <h4>Batch Action Drawer</h4>
                  </div>
                  <p>Select individual items, choose subsets, or download thousands of product variants in bulk clicks.</p>
                </div>

                <div className="docs-feature-item">
                  <div className="docs-feature-item-header">
                    <i className="fas fa-sort-amount-down"></i>
                    <h4>Smart Inventory Fallback</h4>
                  </div>
                  <p>Automatically defaults hidden stock levels to <strong>50</strong>, maintaining perfect integrity during import updates.</p>
                </div>

                <div className="docs-feature-item">
                  <div className="docs-feature-item-header">
                    <i className="fas fa-download"></i>
                    <h4>Instant JSON/CSV</h4>
                  </div>
                  <p>Exports directly to robust spreadsheet files matching the standard Shopify CSV blueprint.</p>
                </div>
              </div>

              <h3>Advanced Extension Workflows</h3>
              <p>
                To extract store data, simply load any store domain, open the Chrome Extension sidebar panel, select your target collections, set your limits, and hit <strong>Export</strong>. In case of hidden stock levels, the scraper activates its smart threshold layers automatically to prevent empty inventory cells.
              </p>
            </section>

            <div className="docs-divider"></div>

            {/* SECTION 3: CSV Master Tool */}
            <section id="csv-maker" className="docs-section">
              <div className="docs-title-wrapper">
                <h2>CSV Master Tool</h2>
                <span className="docs-badge csv">CSV Maker</span>
              </div>
              <p>
                The <strong>Shopify CSV Master Tool</strong> is an interactive web dashboard designed to construct Shopify import spreadsheets from scratch or modify external records.
              </p>

              <ul className="docs-list">
                <li>
                  <i className="fas fa-table"></i>
                  <span><strong>Full Column Schema:</strong> Maps exact headers such as Handles, Titles, Descriptions, Vendors, Types, Tags, Option Names/Values, Images, Variant Prices, SKUs, weights, and barcodes.</span>
                </li>
                <li>
                  <i className="fas fa-copy"></i>
                  <span><strong>Bulk & Single Item Creation:</strong> Toggle views to insert individual variants, or load multiple listings synchronously.</span>
                </li>
                <li>
                  <i className="fas fa-sliders-h"></i>
                  <span><strong>Custom Injection Columns:</strong> Seamlessly declare values like default inventory levels, publishing flags, and vendor prefixes with automatic populating.</span>
                </li>
              </ul>
            </section>

            <div className="docs-divider"></div>

            {/* SECTION 4: Shopify AI Prompts */}
            <section id="ai-prompts" className="docs-section">
              <div className="docs-title-wrapper">
                <h2>Shopify AI Prompts</h2>
                <span className="docs-badge ai">AI Assistant</span>
              </div>
              <p>
                Unlock high-converting descriptions, optimized search rankings, and compelling social copies with the <strong>Shopify AI Prompts Matrix</strong>.
              </p>
              <p>
                This interactive panel delivers finely-tuned, copy-ready prompt engineering structures custom-made for e-commerce developers and managers. Select the category, adjust target tones (e.g. persuasive, professional, casual), click to copy, and run in ChatGPT, Gemini, or Claude to build instant rich-text assets.
              </p>
            </section>

            <div className="docs-divider"></div>

            {/* SECTION 5: Shopify Apps Directory */}
            <section id="apps-dir" className="docs-section">
              <div className="docs-title-wrapper">
                <h2>Shopify Apps Directory</h2>
                <span className="docs-badge apps">Directory</span>
              </div>
              <p>
                Sifting through thousands of apps in the Shopify App Store is time-consuming. The <strong>Shopify Apps Directory</strong> compiles an optimized catalog of high-performing, verified companion apps to supercharge your storefront.
              </p>
              <p>
                Browse through curated, categorized collections including:
              </p>
              <ul className="docs-list">
                <li>
                  <i className="fas fa-shipping-fast"></i>
                  <span><strong>Fulfillment & Sourcing:</strong> Top utilities to automate supplier connections.</span>
                </li>
                <li>
                  <i className="fas fa-search-dollar"></i>
                  <span><strong>Marketing & SEO:</strong> High-performance tools for conversion rates and structured schema injections.</span>
                </li>
                <li>
                  <i className="fas fa-chart-line"></i>
                  <span><strong>Reviews & Social Proof:</strong> Highly-scalable components to drive trust metrics.</span>
                </li>
              </ul>
            </section>

            <div className="docs-divider"></div>

            {/* SECTION 6: FAQ */}
            <section id="faq" className="docs-section">
              <div className="docs-title-wrapper">
                <h2>Frequently Asked Questions</h2>
                <span className="docs-badge">FAQ</span>
              </div>
              
              <div className="docs-faq-list">
                {faqItems.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
                  >
                    <button 
                      className="faq-trigger" 
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={activeFaq === idx ? 'true' : 'false'}
                    >
                      <h4 className="faq-question">{item.question}</h4>
                      <i className="fas fa-chevron-down faq-icon"></i>
                    </button>
                    <div className="faq-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Docs;
