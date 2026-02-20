// components/LoadingSkeleton.jsx
export default function LoadingSkeleton() {
  return (
    <div className="loading-container">
      <div className="thinking-animation">
        <div className="ai-avatar">
          <span className="brain-icon">🧠</span>
          <div className="pulse-ring"></div>
        </div>
        <div className="thinking-text">
          <h3>AI is analyzing data...</h3>
          <p>Generating insights from your sources</p>
        </div>
      </div>

      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-title"></div>
            <div className="skeleton-badge"></div>
          </div>
          <div className="skeleton-tags">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>
          <div className="skeleton-lines">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
          </div>
        </div>
      ))}
    </div>
  );
}