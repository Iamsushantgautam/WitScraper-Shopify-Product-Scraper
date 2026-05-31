import React, { useState, useEffect } from 'react';
import Toast from './Toast';
import ShopifyPromptCard from '../Shopify AI Prompts/ShopifyPromptCard';
import '../styles/PromptsCarousel.css';
import '../Shopify AI Prompts/ShopifyAiPrompt.css';

function PromptsCarousel() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapPromptsData = (rawPrompts) => {
    return rawPrompts.map(p => {
      const apiTags = (p.tags || []).map(t => t.toLowerCase());
      let tag = 'Content';
      if (apiTags.includes('homepage')) {
        tag = 'Homepage';
      } else if (apiTags.includes('hero')) {
        tag = 'Hero';
      } else if (apiTags.includes('marketing') || apiTags.includes('sale') || apiTags.includes('subscription')) {
        tag = 'Marketing';
      } else if (apiTags.includes('product') || apiTags.includes('products')) {
        tag = 'Product';
      } else if (apiTags.includes('social proof') || apiTags.includes('testimonials') || apiTags.includes('reviews') || apiTags.includes('stars')) {
        tag = 'Social Proof';
      }
      return {
        id: p._id || p.id,
        title: p.title || '',
        tag: tag,
        category: p.category || '',
        tags: p.tags || [],
        desc: p.description || p.desc || p.summary || '',
        prompt: p.prompt || '',
        img: p.image || null
      };
    });
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_PUBLIC_API_KEY || 'wkv_8e77eaa25c99e24079683fc365827c81acf69938fa0a9c8c';

    const handleLoadFromCache = () => {
      const cached = localStorage.getItem('witscraper_cached_prompts');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPrompts(mapPromptsData(parsed));
            setLoading(false);
            return true;
          }
        } catch (e) {
          console.error('Error parsing cached prompts in carousel:', e);
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
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const baseUrl = isLocal ? 'https://witvault-backend.onrender.com' : '';
    const requestUrl = `${baseUrl}/api/apikeys/public/${apiKey}`;

    fetch(requestUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.prompts)) {
          setPrompts(mapPromptsData(data.prompts));
          try {
            localStorage.setItem('witscraper_cached_prompts', JSON.stringify(data.prompts));
          } catch (e) {
            console.error('Error saving prompts to cache in carousel:', e);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching prompts for carousel, trying to serve from local storage cache:', err);
        handleLoadFromCache();
        setLoading(false);
      });
  }, []);

  // Prompts with images first, then fill to 4 total
  const withImg = prompts.filter(p => p.img);
  const withoutImg = prompts.filter(p => !p.img);
  const carouselPrompts = [...withImg, ...withoutImg].slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

  // Auto-rotate
  useEffect(() => {
    if (isPaused || carouselPrompts.length === 0) return;
    const interval = setInterval(() => goTo('next'), 5000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex, carouselPrompts.length]);

  const goTo = (dir, targetIndex = null) => {
    if (animating || carouselPrompts.length === 0) return;
    const next =
      targetIndex !== null
        ? targetIndex
        : dir === 'next'
          ? (activeIndex + 1) % carouselPrompts.length
          : (activeIndex - 1 + carouselPrompts.length) % carouselPrompts.length;

    setDirection(targetIndex !== null
      ? targetIndex > activeIndex ? 'next' : 'prev'
      : dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex(next);
      setAnimating(false);
    }, 300);
  };

  const handleCopy = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(active.id);
    setToastMessage(`"${active.title}" prompt copied!`);
    setShowToast(true);
    setTimeout(() => setCopiedId(null), 2000);
    setTimeout(() => setShowToast(false), 4500);
  };

  if (loading) {
    return (
      <section id="prompts-showcase" className="prompts-section">
        <div className="section-container">
          {/* Header */}
          <div className="section-header">
            <h2 className="section-title">Shopify AI Section Prompts</h2>
            <p className="section-subtitle">
              Copy our optimized, senior-level theme developer prompts to instantly generate
              fully responsive custom Liquid sections with AI.
            </p>
          </div>
          {/* Shimmering Carousel PromptCard Skeleton matching sdv-featured-card */}
          <div className="sdv-featured-card" style={{ boxShadow: 'none', border: '1px solid #e8edf2', maxWidth: '800px', margin: '0 auto' }}>
            <div className="sdv-feat-img">
              <div className="skeleton skeleton-image" style={{ width: '100%', height: '100%', borderRadius: '0' }} />
            </div>
            <div className="sdv-feat-body" style={{ width: '100%' }}>
              <div className="sdv-feat-top">
                <div className="skeleton skeleton-tag" />
              </div>
              <div className="skeleton skeleton-title" style={{ width: '50%', height: '28px' }} />
              <div className="skeleton skeleton-text" style={{ width: '90%', height: '14px' }} />
              <div className="skeleton skeleton-text" style={{ width: '75%', height: '14px' }} />
              <div className="sdv-prompt-box" style={{ flex: 'none', height: '100px', minHeight: '100px' }}>
                <div className="skeleton skeleton-text" style={{ width: '95%' }} />
                <div className="skeleton skeleton-text" style={{ width: '60%' }} />
              </div>
              <div className="skeleton skeleton-button" style={{ width: '150px', height: '44px', borderRadius: '11px' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (carouselPrompts.length === 0) {
    return null;
  }

  const active = carouselPrompts[activeIndex];

  return (
    <>
      <section id="prompts-showcase" className="prompts-section">
        <div className="section-container">

          {/* Header */}
          <div className="section-header">
            <h2 className="section-title">Shopify AI Section Prompts</h2>
            <p className="section-subtitle">
              Copy our optimized, senior-level theme developer prompts to instantly generate
              fully responsive custom Liquid sections with AI.
            </p>
          </div>

          {/* Carousel wrapper */}
          <div
            className="pc-carousel-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            {/* Slide — uses modular ShopifyPromptCard */}
            <div className={`pc-slide-frame ${animating ? `exit-${direction}` : 'enter'}`}>
              <ShopifyPromptCard
                prompt={active}
                index={activeIndex}
                isFeatured={true}
                onCopy={handleCopy}
              />
            </div>

            {/* Navigation bar */}
            <div className="pc-nav-bar">
              <button className="pc-arrow" onClick={() => goTo('prev')} title="Previous">
                <i className="fas fa-chevron-left" />
              </button>

              <div className="pc-dots">
                {carouselPrompts.map((p, i) => (
                  <button
                    key={p.id}
                    className={`pc-dot-btn ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => goTo(null, i)}
                    title={`Slide to step ${i + 1}`}
                  />
                ))}
              </div>

              <button className="pc-arrow" onClick={() => goTo('next')} title="Next">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pc-footer" style={{ maxWidth: '800px', margin: '28px auto 0' }}>
            <span className="pc-footer-hint">
              <i className="fas fa-magic" />&nbsp;{prompts.length} prompts in the library
            </span>
            <a href="/shopifyaiprompts" className="btn btn-secondary">View All Prompts</a>
          </div>

        </div>
      </section>

      <Toast showToast={showToast} toastMessage={toastMessage} />
    </>
  );
}

export default PromptsCarousel;
