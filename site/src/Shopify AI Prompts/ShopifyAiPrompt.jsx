import React, { useState, useEffect } from 'react';
import './ShopifyAiPrompt.css';
import ShopifyPromptCard from './ShopifyPromptCard';

export const TAG_META = {
  'Homepage': { color: '#95bf47', light: '#f0f9e4', icon: '🏠' },
  'Hero': { color: '#3b82f6', light: '#eff6ff', icon: '⚡' },
  'Marketing': { color: '#f59e0b', light: '#fffbeb', icon: '📣' },
  'Content': { color: '#8b5cf6', light: '#f5f3ff', icon: '📝' },
  'Product': { color: '#06b6d4', light: '#ecfeff', icon: '🛍️' },
  'Social Proof': { color: '#ec4899', light: '#fdf2f8', icon: '⭐' },
};

// Keep export for safety, but we'll populate it dynamically or leave as empty fallback
export const prompts = [];

const ShopifyAiPrompt = () => {
  const [promptsList, setPromptsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const fetchPrompts = () => {
    setLoading(true);
    setError(null);
    const apiKey = import.meta.env.VITE_PUBLIC_API_KEY;
    if (!apiKey) {
      setError('API key configuration is missing');
      setLoading(false);
      return;
    }
    fetch(`https://witvault-backend.onrender.com/api/apikeys/public/${apiKey}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.prompts)) {
          const mapped = data.prompts.map(p => {
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
              title: p.title,
              tag: tag,
              desc: p.description || p.desc || p.summary,
              prompt: p.prompt,
              img: p.image || null
            };
          });
          setPromptsList(mapped);
        } else {
          throw new Error('Invalid data structure received');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading prompts:', err);
        setError(err.message || 'Unknown error');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const allTags = ['All', ...Object.keys(TAG_META)];

  const filtered = promptsList.filter(p => {
    const matchTag = activeTag === 'All' || p.tag === activeTag;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });

  const featuredCards = filtered.filter(p => p.img);
  const regularCards = filtered.filter(p => !p.img);

  const copyToClipboard = (e, text) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setToast({ show: true, message: 'Prompt copied — paste into your AI tool!' });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  return (
    <div className="sdv-page">

      {/* ── Toast ── */}
      <div className={`sdv-toast ${toast.show ? 'show' : ''}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
        {toast.message}
      </div>

      {/* ── Hero Header ── */}
      <div className="sdv-hero">
        <div className="sdv-hero-inner">
          <div className="sdv-hero-top">
            <div className="sdv-hero-left">
              <div className="sdv-hero-badges">
                <span className="sdv-badge-green">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5" /></svg>
                  Shopify Dev Hub
                </span>
                <span className="sdv-badge-count">
                  {loading ? '...' : `${promptsList.length} prompts`}
                </span>
              </div>
              <h1 className="sdv-hero-title">
                AI Prompts for <span className="sdv-title-glow">Shopify Builders</span>
              </h1>
            </div>
            <div className="sdv-search-wrap">
              <svg className="sdv-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              <input
                className="sdv-search"
                placeholder="Search prompts…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                disabled={loading || error}
              />
              {search && (
                <button className="sdv-clear" onClick={() => setSearch('')}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
          </div>
          <div className="sdv-tags">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`sdv-tag ${activeTag === tag ? 'active' : ''}`}
                style={activeTag === tag && TAG_META[tag] ? {
                  background: TAG_META[tag].color,
                  borderColor: TAG_META[tag].color,
                  color: '#fff'
                } : {}}
                onClick={() => setActiveTag(tag)}
                disabled={loading || error}
              >
                {TAG_META[tag] ? `${TAG_META[tag].icon} ${tag}` : tag}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* ── Content ── */}
      <div className="sdv-content">
        {loading ? (
          <>
            {/* Featured Skeleton Card */}
            <div className="sdv-featured-grid">
              <div className="sdv-featured-card">
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
                  <div className="sdv-prompt-box" style={{ flex: 'none', height: '120px', minHeight: '120px' }}>
                    <div className="skeleton skeleton-text" style={{ width: '95%' }} />
                    <div className="skeleton skeleton-text" style={{ width: '90%' }} />
                    <div className="skeleton skeleton-text" style={{ width: '60%' }} />
                  </div>
                  <div className="skeleton skeleton-button" style={{ width: '150px', height: '44px', borderRadius: '11px' }} />
                </div>
              </div>
            </div>

            {/* Regular Skeleton Cards */}
            <div className="sdv-grid">
              {[1, 2, 3].map(n => (
                <div key={n} className="sdv-card" style={{ '--accent': '#cbd5e1' }}>
                  <div className="sdv-card-accent-bar" style={{ background: '#cbd5e1' }} />
                  <div className="sdv-card-inner">
                    <div className="sdv-card-head">
                      <div className="skeleton skeleton-tag" />
                      <div className="skeleton skeleton-text" style={{ width: '24px', height: '14px', marginBottom: 0 }} />
                    </div>
                    <div className="skeleton skeleton-title" style={{ width: '70%' }} />
                    <div className="skeleton skeleton-text" style={{ width: '95%' }} />
                    <div className="skeleton skeleton-text" style={{ width: '85%' }} />
                    <div className="sdv-prompt-box compact" style={{ flex: 'none', height: '80px' }}>
                      <div className="skeleton skeleton-text" style={{ width: '90%' }} />
                      <div className="skeleton skeleton-text" style={{ width: '40%' }} />
                    </div>
                    <div className="skeleton skeleton-button" style={{ width: '80px', height: '32px', borderRadius: '9px' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : error ? (
          <div className="sdv-empty">
            <div className="sdv-empty-icon">⚠️</div>
            <p>Error loading prompts: {error}</p>
            <button onClick={fetchPrompts}>Retry</button>
          </div>
        ) : (
          <>
            {/* Results label */}
            <div className="sdv-results-bar">
              <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              {(search || activeTag !== 'All') && (
                <button className="sdv-clear-all" onClick={() => { setSearch(''); setActiveTag('All'); }}>
                  Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 && (
              <div className="sdv-empty">
                <div className="sdv-empty-icon">🔍</div>
                <p>No prompts match your search.</p>
                <button onClick={() => { setSearch(''); setActiveTag('All'); }}>Reset filters</button>
              </div>
            )}

            {/* ── Featured Cards (with image) ── */}
            {featuredCards.length > 0 && (
              <div className="sdv-featured-grid">
                {featuredCards.map(p => (
                  <ShopifyPromptCard
                    key={p.id}
                    prompt={p}
                    isFeatured={true}
                    onCopy={copyToClipboard}
                  />
                ))}
              </div>
            )}

            {/* ── Regular Cards Grid ── */}
            {regularCards.length > 0 && (
              <div className="sdv-grid">
                {regularCards.map((p, idx) => (
                  <ShopifyPromptCard
                    key={p.id}
                    prompt={p}
                    index={idx}
                    isFeatured={false}
                    onCopy={copyToClipboard}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShopifyAiPrompt;
