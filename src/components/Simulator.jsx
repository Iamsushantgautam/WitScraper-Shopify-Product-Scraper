import React, { useState } from 'react';
import Toast from './Toast';
import '../styles/Simulator.css';

function Simulator() {
  /* Simulator Hook Logic & State Management */
  const [simStatus, setSimStatus] = useState('Not Started');
  const [progress, setProgress] = useState(0);
  const [logLines, setLogLines] = useState([{ text: 'Ready to simulate scraping...', type: 'text-sub' }]);
  const [isScraping, setIsScraping] = useState(false);
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(false);
  const [scrapedProducts, setScrapedProducts] = useState([]);
  const [scanningCardId, setScanningCardId] = useState(null);
  const [scrapedCardIds, setScrapedCardIds] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const mockProductsData = [
    {
      id: 1,
      title: "Nebula Oversized Hoodie",
      handle: "nebula-oversized-hoodie",
      price: "59.00",
      icon: "🧥",
      gradient: "gradient-orange",
      type: "Apparel > Hoodie",
      tags: "summer, cozy, oversized, premium"
    },
    {
      id: 2,
      title: "Cyberpunk Graphic Tee",
      handle: "cyberpunk-graphic-tee",
      price: "28.00",
      icon: "👕",
      gradient: "gradient-blue",
      type: "Apparel > Tee",
      tags: "cyber, neon, graphic, summer"
    },
    {
      id: 3,
      title: "Utility Cargo Pants",
      handle: "utility-cargo-pants",
      price: "75.00",
      icon: "👖",
      gradient: "gradient-purple",
      type: "Apparel > Pants",
      tags: "tactical, street, cargo"
    },
    {
      id: 4,
      title: "Retro Grid Snapback",
      handle: "retro-grid-snapback",
      price: "22.00",
      icon: "🧢",
      gradient: "gradient-red",
      type: "Accessories > Cap",
      tags: "retro, snapback, grid, summer"
    }
  ];

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const runScrapingSimulation = async () => {
    setIsScraping(true);
    setIsDownloadEnabled(false);
    setProgress(0);
    setSimStatus('Running...');
    setScrapedProducts([]);
    setScanningCardId(null);
    setScrapedCardIds([]);
    setLogLines([{ text: '⚡ WitScraper Core v1.0 initialized...', type: 'text-sub' }]);

    await delay(600);
    setLogLines(prev => [...prev, { text: '🔍 Scanning shop global variables...', type: 'text-sub' }]);
    await delay(500);
    
    setLogLines(prev => [
      ...prev, 
      { text: '✓ Shopify environment detected successfully.', type: 'green-text' },
      { text: '📦 Fetching index product collection endpoints...', type: 'text-sub' }
    ]);
    await delay(700);

    setLogLines(prev => [...prev, { text: '✨ Starting multi-threaded product iteration...', type: 'text-sub' }]);
    await delay(400);

    const accumulatedScraped = [];
    for (let i = 0; i < mockProductsData.length; i++) {
      const product = mockProductsData[i];
      setScanningCardId(product.id);
      setLogLines(prev => [...prev, { text: `⚙️ Extracting data: /products/${product.handle}.json...`, type: 'text-sub' }]);
      await delay(700);
      
      accumulatedScraped.push(product);
      setScrapedProducts([...accumulatedScraped]);
      setProgress(((i + 1) / mockProductsData.length) * 100);
      setScanningCardId(null);
      setScrapedCardIds(prev => [...prev, product.id]);
      
      setLogLines(prev => [...prev, { text: `✓ Scraped: "${product.title}" - Variant detected ($${product.price})`, type: 'green-text' }]);
      await delay(400);
    }

    setSimStatus('Complete');
    setLogLines(prev => [
      ...prev,
      { text: '==========================================', type: 'text-sub' },
      { text: '✓ Scraping processing cycle completed.', type: 'green-text' },
      { text: `✓ Processed ${accumulatedScraped.length} items in 4.8 seconds.`, type: 'green-text' },
      { text: '✓ Generated verified Shopify Import CSV format.', type: 'green-text' },
      { text: '★ Click \'Download Scraped CSV\' to retrieve output!', type: 'text-sub' }
    ]);
    setIsScraping(false);
    setIsDownloadEnabled(true);
  };

  const downloadCSV = () => {
    if (scrapedProducts.length === 0) return;

    const csvHeaders = [
      "Handle", "Title", "Body (HTML)", "Vendor", "Product Category", "Type", 
      "Tags", "Published", "Option1 Name", "Option1 Value", "Variant SKU", 
      "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty", 
      "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price", 
      "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable", 
      "Variant Image", "Image Src", "Image Position", "Image Alt Text", "Gift Card", 
      "SEO Title", "SEO Description", "Google Product Category", "Variant Image", 
      "Variant Weight Unit", "Variant Tax Code", "Cost per item", "Status"
    ];

    const csvRows = [csvHeaders.join(",")];
    scrapedProducts.forEach((p) => {
      const row = [
        p.handle,
        `"${p.title.replace(/"/g, '""')}"`,
        `"<p>Premium high-quality ${p.title} crafted from the finest materials.</p>"`,
        "\"Aesthetic Apparel Co.\"",
        "",
        `"${p.type}"`,
        `"${p.tags}"`,
        "true",
        "Size",
        "OS",
        `"AP-${p.handle.substring(0, 5).toUpperCase()}-OS"`,
        "450",
        "shopify",
        "100",
        "deny",
        "manual",
        p.price,
        "",
        "true",
        "true",
        "",
        `"${p.image}"`,
        "1",
        `"${p.title} Product Photo"`,
        "false",
        `"${p.title} | Premium Clothing"`,
        `"Buy the premium ${p.title} online now."`,
        "",
        "",
        "g",
        "",
        (parseFloat(p.price) * 0.4).toFixed(2),
        "active"
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "witscraper_export_simulated.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Exported: ${scrapedProducts.length} Shopify products downloaded!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <>
      <section id="demo" className="demo-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">See It In Action</h2>
            <p className="section-subtitle">Experience how WitScraper works by simulating a product scraping run on our interactive mock store below!</p>
          </div>

          <div className="demo-display">
            {/* Left Column: Mock Shopify Store */}
            <div className="mock-store">
              <div className="store-topbar">
                <span className="store-circle red"></span>
                <span className="store-circle yellow"></span>
                <span className="store-circle green"></span>
                <span className="store-url">https://aesthetic-hoodies.myshopify.com</span>
              </div>
              <div className="store-hero">
                <h4>🔥 Summer Drop 2026</h4>
                <p>Premium aesthetic apparel</p>
              </div>
              <div className="mock-product-grid">
                {mockProductsData.map((prod) => {
                  const isScanning = scanningCardId === prod.id;
                  const isScraped = scrapedCardIds.includes(prod.id);
                  let cardClass = "mock-p-card";
                  if (isScanning) cardClass += " scanning";
                  if (isScraped) cardClass += " scraped";

                  return (
                    <div className={cardClass} key={prod.id}>
                      <div className={`mock-p-image ${prod.gradient}`}>{prod.icon}</div>
                      <div className="mock-p-info">
                        <div className="mock-p-title">{prod.title}</div>
                        <div className="mock-p-price">${prod.price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Dynamic React Extension Widget */}
            <div className="simulator-extension">
              <div className="sim-header">
                <div className="sim-brand">
                  <img src="/extension/icons/icon-32.png" width="20" height="20" alt="Icon" />
                  <span>WitScraper</span>
                </div>
                <span 
                  className="sim-badge" 
                  style={{
                    background: simStatus === 'Complete' ? '#10b981' : simStatus === 'Running...' ? '#8b5cf6' : 'rgba(0, 0, 0, 0.05)',
                    color: simStatus === 'Not Started' ? 'var(--text-muted)' : '#ffffff'
                  }}
                >
                  {simStatus}
                </span>
              </div>

              <div className="sim-body">
                <div className="sim-main-panel">
                  <div className="sim-stat">
                    <span className="sim-stat-label">Detected Shopify Store:</span>
                    <span className="sim-stat-value green-text">Yes (Aesthetic Hoodies)</span>
                  </div>
                  <div className="sim-stat">
                    <span className="sim-stat-label">Product Count:</span>
                    <span className="sim-stat-value">{scrapedProducts.length} / 4</span>
                  </div>
                  
                  <div className="sim-progress-bar">
                    <div className="sim-progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>

                  <div className="sim-log">
                    {logLines.map((line, index) => (
                      <div className={`log-line ${line.type}`} key={index}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sim-footer">
                  <button 
                    className="btn btn-primary btn-block-landing" 
                    onClick={runScrapingSimulation}
                    disabled={isScraping}
                  >
                    {isScraping ? '⚡ Scraping Site...' : simStatus === 'Complete' ? '⚡ Re-run Scraper Simulation' : '⚡ Run Scraper Simulation'}
                  </button>
                  <button 
                    className="btn btn-green btn-block-landing" 
                    onClick={downloadCSV}
                    disabled={!isDownloadEnabled}
                  >
                    📥 Download Scraped CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toast showToast={showToast} toastMessage={toastMessage} />
    </>
  );
}

export default Simulator;
