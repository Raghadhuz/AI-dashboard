import { memo } from "react";

const Sidebar = memo(({ pinned, onUnpin }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          📌 Pinned Insights
          {pinned.length > 0 && (
            <span className="sidebar-count">{pinned.length}</span>
          )}
        </h2>
      </div>

      <div className="sidebar-content">
        {pinned.length === 0 ? (
          <div className="sidebar-empty">
            <p>No pinned insights yet</p>
            <p className="hint">
              Click the pin button on any insight to save it here
            </p>
          </div>
        ) : (
          pinned.map(item => (
            <div key={item.id} className="sidebar-item">
              <div className="sidebar-item-content">
                <div className="sidebar-item-header">
                  <span className="sidebar-item-type">
                    {item.payload.type === 'alert' ? '🚨' : '💡'}
                  </span>
                  <span className="sidebar-item-score">
                    {Math.round(item.meta?.confidence_score * 100)}%
                  </span>
                </div>
                <p className="sidebar-item-text">
                  {item.payload.content.substring(0, 60)}...
                </p>
              </div>
              <button
                className="sidebar-item-unpin"
                onClick={() => onUnpin(item)}
                aria-label="Unpin insight"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar;