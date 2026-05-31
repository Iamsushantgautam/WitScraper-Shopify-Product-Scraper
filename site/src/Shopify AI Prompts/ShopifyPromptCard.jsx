import React from 'react';
import { TAG_META } from './ShopifyAiPrompt';

function ShopifyPromptCard({ prompt: p, index, isFeatured, onCopy }) {
  const meta = TAG_META[p.tag] || { color: '#64748b', light: '#f1f5f9', icon: '📄' };

  if (isFeatured) {
    return (
      <div className="sdv-featured-card">
        <div className="sdv-feat-img">
          <img src={p.img} alt={p.title} />
          <div className="sdv-feat-img-overlay" />
          <span className="sdv-feat-badge">✦ Featured</span>
        </div>
        <div className="sdv-feat-body">
          <div className="sdv-feat-top">
            <span className="sdv-card-tag" style={{ background: meta.light, color: meta.color, borderColor: meta.color + '40' }}>
              {meta.icon} {p.tag}
            </span>
          </div>
          <h2 className="sdv-feat-title">{p.title}</h2>
          <p className="sdv-feat-desc">{p.desc}</p>
          <div className="sdv-prompt-box">
            <p className="sdv-prompt-text">{p.prompt}</p>
          </div>
          <button className="sdv-copy-btn primary" onClick={e => onCopy(e, p.prompt)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy Prompt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sdv-card" style={{ '--accent': meta.color }}>
      <div className="sdv-card-accent-bar" style={{ background: `linear-gradient(90deg, ${meta.color}, ${meta.color}88)` }} />
      <div className="sdv-card-inner">
        <div className="sdv-card-head">
          <span className="sdv-card-tag" style={{ background: meta.light, color: meta.color, borderColor: meta.color + '33' }}>
            {meta.icon} {p.tag}
          </span>
          <span className="sdv-card-num">#{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="sdv-card-title">{p.title}</h3>
        <p className="sdv-card-desc">{p.desc}</p>
        <div className="sdv-prompt-box compact">
          <p className="sdv-prompt-text">{p.prompt}</p>
        </div>
        <button className="sdv-copy-btn" onClick={e => onCopy(e, p.prompt)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
          </button>
      </div>
    </div>
  );
}

export default ShopifyPromptCard;
