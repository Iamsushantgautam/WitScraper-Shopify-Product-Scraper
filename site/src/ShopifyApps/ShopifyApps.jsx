import React, { useState, useEffect } from 'react';
import './ShopifyApps.css';
import ShopifyAppCard from './ShopifyAppCard';

const SappsDropdown = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentOption = options.find(o => o.value === value) || options[0];

    useEffect(() => {
        if (!isOpen) return;
        const handleOutsideClick = () => setIsOpen(false);
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [isOpen]);

    return (
        <div className="sapps-dropdown-wrapper" onClick={e => e.stopPropagation()}>
            <label className="sapps-filter-label">{label}</label>
            <div className={`sapps-dropdown-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span>{currentOption.label}</span>
                <svg className={`sapps-dropdown-arrow ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <ul className="sapps-dropdown-menu">
                    {options.map(opt => {
                        const isSelected = opt.value === value;
                        return (
                            <li
                                key={opt.value}
                                className={`sapps-dropdown-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{opt.label}</span>
                                {isSelected && (
                                    <svg className="sapps-dropdown-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

const APP_CATEGORIES_META = {
    'All': { icon: '🛍️', color: '#008060' },
    'Page Builders': { icon: '🎨', color: '#3b82f6' },
    'Marketing': { icon: '📣', color: '#f59e0b' },
    'Social Proof': { icon: '⭐', color: '#ec4899' },
    'SEO & Speed': { icon: '⚡', color: '#8b5cf6' },
    'Subscriptions & Upsell': { icon: '🚀', color: '#06b6d4' },
    'Customer Support': { icon: '💬', color: '#10b981' },
    'Shipping & Delivery': { icon: '📦', color: '#f43f5e' },
    'Inventory & Wholesale': { icon: '🏭', color: '#047857' },
    'Data & Operations': { icon: '📊', color: '#6366f1' }
};

const ShopifyApps = () => {
    const [appsList, setAppsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [toast, setToast] = useState({ show: false, message: '' });

    // Advanced Filters State
    const [showFilters, setShowFilters] = useState(false);
    const [priceFilter, setPriceFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Reviews');

    // Custom Dropdown Option Sets
    const priceOptions = [
        { value: 'All', label: 'All Pricing Types' },
        { value: 'Free', label: 'Forever Free / Free Install' },
        { value: 'Plan', label: 'Free Plan Available' },
        { value: 'Trial', label: 'Free Trial Included' }
    ];

    const ratingOptions = [
        { value: 'All', label: 'All Ratings' },
        { value: '4.8', label: '4.8+ Stars' },
        { value: '4.9', label: '4.9+ Stars' },
        { value: '5.0', label: '5.0 Stars (Perfect)' }
    ];

    const sortOptions = [
        { value: 'Reviews', label: 'Popularity (Most Reviews)' },
        { value: 'Rating', label: 'Highest Rating' }
    ];

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

    const fetchApps = () => {
        setLoading(true);
        setError(null);
        const apiKey = import.meta.env.VITE_PUBLIC_API_KEY || 'wkv_8e77eaa25c99e24079683fc365827c81acf69938fa0a9c8c';

        const handleLoadFromCache = (fallbackErrorMsg) => {
            const cached = localStorage.getItem('witscraper_cached_apps');
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        setAppsList(mapAppsData(parsed));
                        setLoading(false);
                        return true;
                    }
                } catch (e) {
                    console.error('Error parsing cached apps:', e);
                }
            }
            return false;
        };

        if (!apiKey) {
            const loaded = handleLoadFromCache('API key configuration is missing');
            if (!loaded) {
                setError('API key configuration is missing');
                setLoading(false);
            }
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
                if (data && Array.isArray(data.shopifyApps)) {
                    const mapped = mapAppsData(data.shopifyApps);
                    setAppsList(mapped);
                    try {
                        localStorage.setItem('witscraper_cached_apps', JSON.stringify(data.shopifyApps));
                    } catch (e) {
                        console.error('Error saving apps to cache:', e);
                    }
                } else {
                    throw new Error('Invalid data structure received');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching apps from API, trying to serve from local storage cache:', err);
                const loaded = handleLoadFromCache(err.message || 'Unknown error');
                if (!loaded) {
                    setError(err.message || 'Unknown error');
                    setLoading(false);
                }
            });
    };

    useEffect(() => {
        fetchApps();
    }, []);

    // Automatically generate unique category list dynamically from the actual apps array
    const categories = ['All', ...new Set(appsList.map(app => app.category))];

    const filteredApps = appsList
        .filter(app => {
            const matchCategory = activeCategory === 'All' || app.category === activeCategory;

            const q = search.toLowerCase();
            const nameText = (app.name || '').toLowerCase();
            const descText = (app.desc || '').toLowerCase();
            const benefitText = (app.benefit || '').toLowerCase();
            const matchSearch = !q ||
                nameText.includes(q) ||
                descText.includes(q) ||
                benefitText.includes(q);

            // Price Filter Matching
            let matchPrice = true;
            if (priceFilter === 'Free') {
                const lowerPrice = app.price.toLowerCase();
                matchPrice = lowerPrice.includes('forever free') || lowerPrice.includes('free to install');
            } else if (priceFilter === 'Plan') {
                matchPrice = app.price.toLowerCase().includes('plan');
            } else if (priceFilter === 'Trial') {
                matchPrice = app.price.toLowerCase().includes('trial');
            }

            // Rating Filter Matching
            let matchRating = true;
            if (ratingFilter !== 'All') {
                const appRatingNum = parseFloat(app.rating);
                const filterRatingNum = parseFloat(ratingFilter);
                if (ratingFilter === '5.0') {
                    matchRating = appRatingNum === 5.0;
                } else {
                    matchRating = appRatingNum >= filterRatingNum;
                }
            }

            return matchCategory && matchSearch && matchPrice && matchRating;
        })
        .sort((a, b) => {
            if (sortBy === 'Rating') {
                return parseFloat(b.rating) - parseFloat(a.rating);
            } else {
                // Parse Reviews (e.g. "24,000+" -> 24000)
                const getReviewCount = (reviewStr) => {
                    const cleanStr = reviewStr.replace(/,/g, '').replace(/\+/g, '');
                    return parseInt(cleanStr, 10) || 0;
                };
                return getReviewCount(b.reviews) - getReviewCount(a.reviews);
            }
        });

    const triggerToast = (appName) => {
        setToast({ show: true, message: `Copied "${appName}" to clipboard!` });
        navigator.clipboard.writeText(appName);
        setTimeout(() => setToast({ show: false, message: '' }), 2500);
    };

    return (
        <div className="sapps-container">
            {/* ── Notification Toast ── */}
            <div className={`sapps-toast ${toast.show ? 'show' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {toast.message}
            </div>

            {/* ── Hero section ── */}
            <div className="sapps-hero">
                <div className="sapps-hero-inner">
                    <div className="sapps-hero-top">
                        <div className="sapps-hero-left">
                            <div className="sapps-hero-badges">
                                <span className="sapps-badge-green">
                                    <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5" /></svg>
                                    Shopify App Hub
                                </span>
                                <span className="sapps-badge-count">
                                    {loading ? '...' : `${filteredApps.length} app${filteredApps.length !== 1 ? 's' : ''}`}
                                </span>
                            </div>
                            <h1 className="sapps-hero-title">
                                Best Apps for <span className="sapps-title-glow">Shopify Builders</span>
                            </h1>
                            <p className="sapps-hero-subtitle">
                                Handpicked, high-conversion apps designed to supercharge your design, automation, speed, and revenues.
                            </p>
                        </div>

                        <div className="sapps-search-row">
                            <div className="sapps-search-wrap">
                                <svg className="sapps-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                                <input
                                    className="sapps-search"
                                    placeholder="Search apps…"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    disabled={loading || error}
                                />
                                {search && (
                                    <button className="sapps-clear" onClick={() => setSearch('')}>
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>
                            <button
                                className={`sapps-filter-toggle ${showFilters ? 'active' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                                title="Toggle advanced filters"
                                disabled={loading || error}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 12h6" />
                                </svg>
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* ── Advanced Filters Drawer ── */}
                    {showFilters && (
                        <div className="sapps-filters-drawer">
                            <SappsDropdown
                                label="Pricing Structure"
                                value={priceFilter}
                                options={priceOptions}
                                onChange={setPriceFilter}
                            />
                            <SappsDropdown
                                label="Rating Requirement"
                                value={ratingFilter}
                                options={ratingOptions}
                                onChange={setRatingFilter}
                            />
                            <SappsDropdown
                                label="Sort Directory"
                                value={sortBy}
                                options={sortOptions}
                                onChange={setSortBy}
                            />
                        </div>
                    )}

                    <div className="sapps-tags">
                        {categories.map(cat => {
                            const info = APP_CATEGORIES_META[cat] || { icon: '🛍️', color: '#008060' };
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    className={`sapps-tag ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                    disabled={loading || error}
                                    style={isActive ? {
                                        background: info.color,
                                        borderColor: info.color,
                                        color: '#fff',
                                        boxShadow: `0 2px 8px ${info.color}33`
                                    } : {}}
                                >
                                    {info.icon} {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Main Apps Grid ── */}
            <main className="sapps-grid-wrapper">
                {loading ? (
                    <div className="sapps-grid">
                        {[1, 2, 3, 4, 5, 6].map(n => (
                            <article key={n} className="sapps-card" style={{ height: 'auto' }}>
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
                                        <div className="skeleton skeleton-text" style={{ width: '60%', height: '12px' }} />
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
                        ))}
                    </div>
                ) : error ? (
                    <div className="sapps-empty-state">
                        <span className="sapps-empty-icon">⚠️</span>
                        <h3>Error Loading Apps</h3>
                        <p>{error}</p>
                        <button className="btn-primary" onClick={fetchApps}>
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="sapps-results-count">
                            Found <strong>{filteredApps.length}</strong> top-performing Shopify app{filteredApps.length !== 1 ? 's' : ''}
                        </div>

                        {filteredApps.length === 0 ? (
                            <div className="sapps-empty-state">
                                <span className="sapps-empty-icon">🔍</span>
                                <h3>No Apps Match Your Query</h3>
                                <p>Try searching for a different category or clearing your current text search filter.</p>
                                <button className="btn-primary" onClick={() => {
                                    setSearch('');
                                    setActiveCategory('All');
                                    setPriceFilter('All');
                                    setRatingFilter('All');
                                    setSortBy('Reviews');
                                }}>
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="sapps-grid">
                                {filteredApps.map(app => (
                                    <ShopifyAppCard
                                        key={app.id}
                                        app={app}
                                        onCopyName={triggerToast}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};


export default ShopifyApps;
