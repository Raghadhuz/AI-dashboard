// components/ErrorCallback.jsx
export default function ErrorCallback({ error, retry }) {
  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon-wrapper">
          <span className="error-icon">🔌</span>
          <span className="error-icon-secondary">⚠️</span>
        </div>
        
        <h2 className="error-title">Source Disconnected</h2>
        <p className="error-message">{error || "Unable to fetch insights from the server"}</p>
        
        <div className="error-tips">
          <p>Try these solutions:</p>
          <ul>
            <li>✓ Check your internet connection</li>
            <li>✓ Verify the API endpoint</li>
            <li>✓ Refresh the page</li>
          </ul>
        </div>
        
        <button className="retry-button" onClick={retry}>
          <span className="retry-icon">⟳</span>
          Try Again
        </button>
      </div>
    </div>
  );
}