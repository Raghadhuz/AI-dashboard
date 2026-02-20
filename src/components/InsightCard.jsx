import { getConfidenceColor, formatConfidenceScore, getInsightTitle } from "../utils/confidenceUtils";
import { useState } from "react";

export default function InsightCard({ item, onPin, pinned }) {
  const [expanded, setExpanded] = useState(false);
  
  const confidenceScore = item.meta?.confidence_score || 0;
  const confidenceColor = getConfidenceColor(confidenceScore);
  const confidenceDisplay = formatConfidenceScore(confidenceScore);
  const title = getInsightTitle(item.payload.type, item.payload.severity);
  
  // Format timestamp
  const timestamp = item.meta?.generated_at 
    ? new Date(item.meta.generated_at).toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    : null;

  // Get icon for source type
  const getSourceIcon = (source) => {
    if (source.includes('.pdf')) return '📄';
    if (source.includes('.xlsx') || source.includes('.xls')) return '📊';
    if (source.includes('.sql')) return '🗄️';
    if (source.includes('.txt') || source.includes('.log')) return '📋';
    return '🌐';
  };

  // Extract source name for display
  const getSourceName = (source) => {
    const parts = source.split('/');
    const filename = parts[parts.length - 1];
    if (filename.includes('.')) {
      return filename.split('.')[0]; // Remove extension
    }
    return filename;
  };

  // Check if content is long
  const isLongContent = item.payload.content?.length > 100;

  return (
    <div className={`insight-card ${item.status} ${pinned ? 'pinned' : ''}`}>
      {/* Header with Title and Confidence Score */}
      <div className="card-header">
        <div className="title-wrapper">
          <h3 className="card-title">{title}</h3>
          {item.payload.severity === 'high' && (
            <span className="priority-badge">High Priority</span>
          )}
        </div>
        <div className={`confidence-badge ${confidenceColor}`}>
          {confidenceDisplay}
        </div>
      </div>

      {/* Source Tags */}
      <div className="sources-section">
        {item.payload.sources?.map((source, index) => (
          <span key={index} className="source-tag">
            <span className="source-icon">{getSourceIcon(source)}</span>
            <span className="source-name">{getSourceName(source)}</span>
            <span className="source-type">{source.split('.').pop()}</span>
          </span>
        ))}
      </div>

      {/* Insight Text */}
      <div className="insight-content">
        <p className={!expanded ? 'clamp-text' : ''}>
          {item.payload.content}
        </p>
        {isLongContent && (
          <button 
            className="expand-button"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Footer with Metadata and Pin */}
      <div className="card-footer">
        <div className="metadata">
          {timestamp && (
            <span className="timestamp">
              <span className="meta-icon">🕒</span> {timestamp}
            </span>
          )}
          {item.meta?.model_version && (
            <span className="model-version">
              <span className="meta-icon">🤖</span> v{item.meta.model_version}
            </span>
          )}
          {item.status === 'processing' && (
            <span className="status-badge processing">
              <span className="spinner">⟳</span> Processing
            </span>
          )}
        </div>
        <button 
          className={`pin-button ${pinned ? 'active' : ''}`}
          onClick={() => onPin(item)}
          aria-label={pinned ? 'Unpin insight' : 'Pin insight'}
        >
          <span className="pin-icon">{pinned ? '📌' : '📍'}</span>
          <span className="pin-text">{pinned ? 'Pinned' : 'Pin'}</span>
        </button>
      </div>
    </div>
  );
}