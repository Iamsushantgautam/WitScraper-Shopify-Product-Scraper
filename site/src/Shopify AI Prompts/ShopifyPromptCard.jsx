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
          <div className="sdv-feat-top" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="sdv-card-tag" style={{ background: meta.light, color: meta.color, borderColor: meta.color + '40' }}>
              {meta.icon} {p.tag}
            </span>
            {p.category && (
              <span className="sdv-card-category" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                📁 {p.category}
              </span>
            )}
          </div>
          <h2 className="sdv-feat-title">{p.title}</h2>
          <p className="sdv-feat-desc">{p.desc}</p>
          {p.tags && p.tags.length > 0 && (
            <div className="sdv-feat-tags-row" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px', marginBottom: '12px' }}>
              {p.tags.map(t => (
                <span key={t} className="sdv-feat-subtag" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#94a3b8', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: '6px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2px', textTransform: 'lowercase' }}>
                  #{t}
                </span>
              ))}
            </div>
          )}
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
        <div className="sdv-card-head" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="sdv-card-tag" style={{ background: meta.light, color: meta.color, borderColor: meta.color + '33' }}>
              {meta.icon} {p.tag}
            </span>
            {p.category && (
              <span className="sdv-card-category" style={{ background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px 6px', fontSize: '0.7rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                📁 {p.category}
              </span>
            )}
          </div>
          <span className="sdv-card-num">#{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="sdv-card-title">{p.title}</h3>
        <p className="sdv-card-desc">{p.desc}</p>
        {p.tags && p.tags.length > 0 && (
          <div className="sdv-card-tags-row" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px', marginBottom: '8px' }}>
            {p.tags.map(t => (
              <span key={t} className="sdv-card-subtag" style={{ background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '1px 5px', fontSize: '0.65rem', fontWeight: 600, textTransform: 'lowercase' }}>
                #{t}
              </span>
            ))}
          </div>
        )}
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
