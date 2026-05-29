import React, { useState, useEffect, useRef } from 'react';
import Toast from './Toast';
import PromptCard from './PromptCard';
import { prompts } from '../Shopify AI Prompts/ShopifyAiPrompt';
import '../styles/PromptsCarousel.css';

function PromptsCarousel() {
  // Prompts with images first, then fill to 4 total
  const withImg    = prompts.filter(p => p.img);
  const withoutImg = prompts.filter(p => !p.img);
  const carouselPrompts = [...withImg, ...withoutImg].slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedId,    setCopiedId]    = useState(null);
  const [showToast,   setShowToast]   = useState(false);
  const [toastMessage,setToastMessage]= useState('');
  const [isPaused,    setIsPaused]    = useState(false);
  const [animating,   setAnimating]   = useState(false);
  const [direction,   setDirection]   = useState('next');

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => goTo('next'), 6000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const goTo = (dir, targetIndex = null) => {
    if (animating) return;
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

  const handleCopy = (p) => {
    navigator.clipboard.writeText(p.prompt);
    setCopiedId(p.id);
    setToastMessage(`"${p.title}" prompt copied!`);
    setShowToast(true);
    setTimeout(() => setCopiedId(null), 2000);
    setTimeout(() => setShowToast(false), 4500);
  };

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
          >
            {/* Slide — uses universal PromptCard */}
            <div className={`pc-slide-frame ${animating ? `exit-${direction}` : 'enter'}`}>
              <PromptCard
                prompt={active}
                index={activeIndex}
                isCopied={copiedId === active.id}
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
                    onClick={() => goTo(i > activeIndex ? 'next' : 'prev', i)}
                    title={p.title}
                  >
                    <span className="pc-dot-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pc-dot-label">{p.title}</span>
                  </button>
                ))}
              </div>

              <button className="pc-arrow" onClick={() => goTo('next')} title="Next">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="pc-footer">
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
