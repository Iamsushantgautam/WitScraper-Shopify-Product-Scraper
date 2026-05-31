import React, { useState, useEffect } from 'react';
import ShopifyAppCard from '../ShopifyApps/ShopifyAppCard';
import '../styles/ShopifyAppsCarousel.css';

function ShopifyAppsCarousel() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive Cards-Per-View Handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch Live Apps from API
  const mapAppsData = (rawApps) => {
    return rawApps.map(p => {
      const getCategoryColor = (cat) => {
        switch (cat) {
          case 'Page Builders':
          case 'Data & Operations':
            return 'icon-blue';
          case 'Marketing':
          case 'Subscriptions & Upsell':
            return 'icon-orange';
          case 'Social Proof':
            return 'icon-purple';
          case 'SEO & Speed':
          case 'Customer Support':
          case 'Inventory & Wholesale':
            return 'icon-green';
          case 'Shipping & Delivery':
            return 'icon-red';
          default:
            return 'icon-blue';
        }
      };

      const getBenefitText = () => {
        if (p.tags && p.tags.length > 0) {
          const tag = p.tags[0];
          return tag.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
        return 'Premium Feature';
      };

      const getPriceText = () => {
        if (p.pricingTags && p.pricingTags.length > 0) {
          return p.pricingTags[0];
        }
        return 'Free plan available';
      };

      return {
        id: p._id || p.id,
        name: p.title || '',
        category: p.category || '',
        rating: String(p.rating || '0.0'),
        reviews: p.reviewsCount || '0',
        price: getPriceText(),
        desc: p.description || p.desc || '',
        link: p.url || '',
        benefit: getBenefitText(),
        whyBest: p.whyItsBest || '',
        color: getCategoryColor(p.category)
      };
    });
  };

  // Fetch Live Apps from API
  useEffect(() => {
    const apiKey = import.meta.env.VITE_PUBLIC_API_KEY || 'wkv_8e77eaa25c99e24079683fc365827c81acf69938fa0a9c8c';

    const handleLoadFromCache = () => {
      const cached = localStorage.getItem('witscraper_cached_apps');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setApps(mapAppsData(parsed));
            setLoading(false);
            return true;
          }
        } catch (e) {
          console.error('Error parsing cached apps in carousel:', e);
        }
      }
      return false;
    };

    if (!apiKey) {
      console.warn('VITE_PUBLIC_API_KEY is not defined in the environment. Trying local storage cache.');
      handleLoadFromCache();
      setLoading(false);
      return;
    }
    fetch(`https://witvault-backend.onrender.com/api/apikeys/public/${apiKey}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.shopifyApps)) {
          setApps(mapAppsData(data.shopifyApps));
          try {
            localStorage.setItem('witscraper_cached_apps', JSON.stringify(data.shopifyApps));
          } catch (e) {
            console.error('Error saving apps to cache in carousel:', e);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching apps for carousel, trying to serve from local storage cache:', err);
        handleLoadFromCache();
        setLoading(false);
      });
  }, []);

  // Limit carousel selections to first 6 apps
  const carouselApps = apps.slice(0, 6);

  // Auto-rotate effect
  useEffect(() => {
    if (isPaused || carouselApps.length === 0) return;
    const interval = setInterval(() => {
      goTo('next');
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex, carouselApps.length, cardsPerView]);

  const goTo = (dir, targetIndex = null) => {
    if (carouselApps.length === 0) return;
    const maxIndex = Math.max(0, carouselApps.length - cardsPerView);

    if (targetIndex !== null) {
      setActiveIndex(Math.min(targetIndex, maxIndex));
      return;
    }

    if (dir === 'next') {
      if (activeIndex >= maxIndex) {
        setActiveIndex(0); // Wrap around to first slide
      } else {
        setActiveIndex(activeIndex + 1);
      }
    } else {
      if (activeIndex <= 0) {
        setActiveIndex(maxIndex); // Wrap around to last slide
      } else {
        setActiveIndex(activeIndex - 1);
      }
    }
  };

  const handleCopyName = (name) => {
    navigator.clipboard.writeText(name);
    setToast({ show: true, message: `Copied "${name}" to clipboard!` });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  // Get total slides possible based on view size
  const maxSlidesCount = Math.max(1, carouselApps.length - cardsPerView + 1);

  if (loading) {
    return (
      <section id="apps-showcase" className="sac-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Top Shopify Apps</h2>
            <p className="section-subtitle">
              Handpicked, high-conversion apps to supercharge your store's design, marketing, and revenue.
            </p>
          </div>
          {/* Shimmering Skeleton viewport matches desktop cards per view */}
          <div className="sac-carousel-viewport" style={{ overflow: 'hidden' }}>
            <div className="sac-carousel-track">
              {[...Array(cardsPerView)].map((_, idx) => (
                <div key={idx} className="sac-carousel-item" style={{ width: `${100 / cardsPerView}%` }}>
                  <article className="sapps-card" style={{ height: 'auto' }}>
                    <div className="sapps-card-header" style={{ marginBottom: '1.25rem' }}>
                      <div className="sapps-icon-box" style={{ background: 'transparent', boxShadow: 'none' }}>
                        <div className="skeleton skeleton-image" style={{ width: '100%', height: '100%', borderRadius: '16px' }} />
                      </div>
                      <div className="sapps-title-area" style={{ width: '100%' }}>
                        <div className="sapps-meta-row" style={{ gap: '8px' }}>
                          <div className="skeleton skeleton-tag" />
                          <div className="skeleton skeleton-tag" style={{ width: '60px' }} />
                        </div>
                        <div className="skeleton skeleton-title" style={{ width: '80%', height: '20px', marginTop: '8px', marginBottom: '0' }} />
                      </div>
                    </div>
                    <div className="sapps-card-body" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
                      <div className="skeleton skeleton-text" style={{ width: '95%' }} />
                      <div className="skeleton skeleton-text" style={{ width: '70%' }} />
                      <div className="sapps-highlight-box" style={{ borderRadius: '12px', borderLeftColor: '#e2e8f0', background: '#f8fafc', padding: '0.85rem' }}>
                        <div className="skeleton skeleton-text" style={{ width: '35%', height: '10px' }} />
                        <div className="skeleton skeleton-text" style={{ width: '90%', height: '12px' }} />
                      </div>
                      <div className="sapps-badges-row">
                        <div className="skeleton skeleton-tag" style={{ width: '110px', height: '24px', borderRadius: '8px' }} />
                        <div className="skeleton skeleton-tag" style={{ width: '90px', height: '24px', borderRadius: '8px' }} />
                      </div>
                    </div>
                    <div className="sapps-card-footer" style={{ gap: '0.75rem', paddingTop: '1.25rem' }}>
                      <div className="skeleton skeleton-button" style={{ flex: '1', height: '38px', borderRadius: '12px' }} />
                      <div className="skeleton skeleton-button" style={{ flex: '1', height: '38px', borderRadius: '12px' }} />
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (carouselApps.length === 0) {
    return null;
  }

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

          {/* Carousel Viewport Container */}
          <div
            className="sac-carousel-viewport"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel track */}
            <div
              className="sac-carousel-track"
              style={{
                transform: `translateX(-${activeIndex * (100 / cardsPerView)}%)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {carouselApps.map(app => (
                <div key={app.id} className="sac-carousel-item" style={{ width: `${100 / cardsPerView}%` }}>
                  <ShopifyAppCard
                    app={app}
                    onCopyName={handleCopyName}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Floating Navigation Controls */}
          {maxSlidesCount > 1 && (
            <div className="sac-nav-bar">
              <button className="sac-arrow" onClick={() => goTo('prev')} title="Previous">
                <i className="fas fa-chevron-left" />
              </button>

              <div className="sac-dots">
                {[...Array(maxSlidesCount)].map((_, i) => (
                  <button
                    key={i}
                    className={`sac-dot-btn ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => goTo(null, i)}
                    title={`Slide to step ${i + 1}`}
                  />
                ))}
              </div>

              <button className="sac-arrow" onClick={() => goTo('next')} title="Next">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          )}

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
