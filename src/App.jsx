import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import CsvMaker from './Shopify CSV File Maker/CsvMaker';
import ShopifyAiPrompt from './Shopify AI Prompts/ShopifyAiPrompt';
import ShopifyApps from './ShopifyApps/ShopifyApps';

// Sub-pages imports
import Founder from './pages/Founder';
import AboutUs from './pages/AboutUs';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Content from './pages/Content';
import Feedback from './pages/Feedback';
import Docs from './pages/Docs';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Check if we are on standalone routes
  const isCsvMakerPage = currentPath.startsWith('/csv-maker');
  const isAiPromptsPage = currentPath.startsWith('/shopifyaiprompts');
  const isShopifyAppsPage = currentPath.startsWith('/shopify-apps');
  const isFounderPage = currentPath.startsWith('/founder');
  const isAboutPage = currentPath.startsWith('/about-us');
  const isPrivacyPage = currentPath.startsWith('/privacy');
  const isTermsPage = currentPath.startsWith('/terms');
  const isContentPage = currentPath.startsWith('/content');
  const isFeedbackPage = currentPath.startsWith('/feedback');
  const isDocsPage = currentPath.startsWith('/docs');

  return (
    <>
      {/* Shared Background Cosmic Watercolor Blurs */}
      <div className="cosmic-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Shared Site Header */}
      <Navbar />

      {/* Dynamic Main View switching */}
      {isCsvMakerPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <CsvMaker />
        </main>
      ) : isAiPromptsPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <ShopifyAiPrompt />
        </main>
      ) : isShopifyAppsPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <ShopifyApps />
        </main>
      ) : isFounderPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <Founder />
        </main>
      ) : isAboutPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <AboutUs />
        </main>
      ) : isPrivacyPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <Privacy />
        </main>
      ) : isTermsPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <Terms />
        </main>
      ) : isContentPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <Content />
        </main>
      ) : isFeedbackPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <Feedback />
        </main>
      ) : isDocsPage ? (
        <main style={{ paddingTop: '120px', paddingBottom: '60px' }}>
          <Docs />
        </main>
      ) : (
        <Home />
      )}

      {/* Shared Site Footer */}
      <Footer />
    </>
  );
}

export default App;
