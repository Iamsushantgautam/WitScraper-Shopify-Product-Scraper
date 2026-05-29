import React from 'react';
import { TAG_META } from '../Shopify AI Prompts/ShopifyAiPrompt';
import './PromptCard.css';

function PromptCard({ prompt: p, isCopied, onCopy, index }) {
  const meta = TAG_META[p.tag] || { color: '#64748b', light: '#f1f5f9', icon: '📄' };

  return (
    <article className="pcard">

      {/* Left: Image */}
      <div className="pcard-img-col">
        {p.img
          ? <img src={p.img} alt={p.title} className="pcard-img" />
          : <div className="pcard-placeholder">{meta.icon}</div>
        }
        {p.img && <span className="pcard-featured-badge">✦ Featured</span>}
      </div>

      {/* Right: Content */}
      <div className="pcard-body">

        <span className="pcard-tag" style={{ background: meta.light, color: meta.color }}>
          {meta.icon}&nbsp;{p.tag}
        </span>

        <h3 className="pcard-title">{p.title}</h3>
        <p className="pcard-desc">{p.desc}</p>

        <div className="pcard-prompt-box">
          <pre className="pcard-prompt-pre">{p.prompt.slice(0, 220)}…</pre>
        </div>

        <div className="pcard-actions">
          <button className={`pcard-copy-btn ${isCopied ? 'copied' : ''}`} onClick={() => onCopy(p)}>
            <i className={`fas fa-${isCopied ? 'check' : 'copy'}`} />
            {isCopied ? 'Copied!' : 'Copy Prompt'}
          </button>
          <a href="/shopifyaiprompts" className="pcard-browse-btn">
            Browse All
          </a>
        </div>

      </div>
    </article>
  );
}

export default PromptCard;
