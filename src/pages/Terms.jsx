import React from 'react';
import './Pages.css';

function Terms() {
  return (
    <div className="page-container">
      <div className="page-card">
        
        {/* Header */}
        <section className="page-section" style={{ textAlign: 'center' }}>
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">Effective Date: May 29, 2026</p>
        </section>

        {/* License */}
        <section className="page-section">
          <h3><i className="fas fa-file-contract"></i> 1. MIT Open Source License</h3>
          <p>
            WitScraper is an open-source development project. The source code, landing page structures, and associated CSV exporter scripts are distributed freely under the **MIT License**. You are free to copy, modify, distribute, and integrate the code for personal or commercial ventures, provided you preserve the original license copyright text.
          </p>
        </section>

        {/* Responsible use */}
        <section className="page-section">
          <h3><i className="fas fa-balance-scale"></i> 2. Responsible Scraping</h3>
          <p>
            You agree to employ this Chrome extension and utility scripts solely in compliance with all relevant international privacy rules, regional laws, and platform policies. You are solely responsible for ensuring that scraping store records does not violate the terms of service of competitor websites or data boundaries.
          </p>
        </section>

        {/* Disclaimer of warranties */}
        <section className="page-section">
          <h3><i className="fas fa-exclamation-triangle"></i> 3. Disclaimer of Warranties</h3>
          <p>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE.
          </p>
        </section>

        {/* Section Updates */}
        <section className="page-section">
          <h3><i className="fas fa-sync-alt"></i> 4. Terms Modifications</h3>
          <p>
            We reserve the right to modify these terms at any time. Any changes to the terms will be posted directly to this page with an updated effective date at the top.
          </p>
        </section>

      </div>
    </div>
  );
}

export default Terms;
