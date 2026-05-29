import React from 'react';
import '../styles/InstallGuide.css';

function InstallGuide() {
  const steps = [
    {
      number: "1",
      title: "Download & Unzip Package",
      desc: (
        <>
          Download the official extension bundle. Extract the downloaded <code className="code-highlight">witscraper-extension.zip</code> file to any safe location on your computer.
        </>
      ),
      hasButton: true
    },
    {
      number: "2",
      title: "Open Extensions Dashboard",
      desc: (
        <>
          Launch Google Chrome. In your address bar, type <code className="code-highlight">chrome://extensions/</code> and press <kbd>Enter</kbd> to open the extensions dashboard.
        </>
      ),
      hasButton: false
    },
    {
      number: "3",
      title: "Enable Developer Mode",
      desc: (
        <>
          In the top right corner of the page, locate the toggle switch labeled <strong>"Developer mode"</strong> and slide it to the <code className="code-highlight">ON</code> position.
        </>
      ),
      hasButton: false
    },
    {
      number: "4",
      title: "Load Unpacked Directory",
      desc: (
        <>
          Click on the <strong>"Load unpacked"</strong> button in the top left corner. Select the extracted folder containing the <code className="code-highlight">manifest.json</code> file.
        </>
      ),
      hasButton: false
    }
  ];

  return (
    <section id="install" className="install-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Install In Under 60 Seconds</h2>
          <p className="section-subtitle">Since WitScraper is a fully transparent tool built for creators, you load it directly into Chrome using Developer Mode.</p>
        </div>

        <div className="install-grid">
          {steps.map((step, idx) => (
            <div className="step-card" key={idx}>
              <div className="step-card-header">
                <span className={`step-badge step-badge-${step.number}`}>{`0${step.number}`}</span>
                <span className="step-badge-label">Step</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              {step.hasButton && (
                <a href="/witscraper-extension.zip" className="btn btn-secondary btn-small-landing" download style={{ marginTop: '12px', display: 'inline-flex', width: 'fit-content' }}>
                  Download ZIP File
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InstallGuide;
