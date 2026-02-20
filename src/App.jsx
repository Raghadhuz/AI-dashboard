// App.jsx
import { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import { useInsights } from "./hooks/useInsights";
import InsightCard from "./components/InsightCard";
import LoadingSkeleton from "./components/LoadingSkeleton"; // Changed from LoadingState
import ErrorCallback from "./components/ErrorCallback"; // Changed from ErrorState
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FilterToggle from "./components/FilterToggle"; // Import this if you want to use it
import "./styles.css";

function AppContent() {
  const { insights, loading, error, retry } = useInsights();
  const [filter, setFilter] = useState(false);
  const [pinned, setPinned] = useState(() => {
    try {
      const saved = localStorage.getItem("pinned-insights");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist pinned items
  useEffect(() => {
    localStorage.setItem("pinned-insights", JSON.stringify(pinned));
  }, [pinned]);

  // Handle pin/unpin
  const handlePin = (item) => {
    setPinned(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.filter(p => p.id !== item.id);
      }
      return [...prev, item];
    });
  };

  // Filter high confidence items (≥70% as per PDF)
  const filteredInsights = useMemo(() => {
    if (!filter) return insights;
    return insights.filter(item => 
      (item.meta?.confidence_score || 0) >= 0.7
    );
  }, [insights, filter]);

  // Count high confidence for filter badge
  const highConfidenceCount = useMemo(() => 
    insights.filter(i => (i.meta?.confidence_score || 0) >= 0.7).length,
    [insights]
  );

  if (error) {
    return <ErrorCallback error={error} retry={retry} />;
  }

  return (
    <div className="app">
      <Header />
      
      <main>
        {/* Using your existing FilterToggle component */}
        <FilterToggle 
          filter={filter}
          setFilter={setFilter}
          count={highConfidenceCount}
        />
        
        {/* Confidence Legend */}
        <div className="confidence-legend">
          <span className="legend-item">
            <span className="legend-dot green"></span> High (70-100%)
          </span>
          <span className="legend-item">
            <span className="legend-dot yellow"></span> Medium (40-69%)
          </span>
          <span className="legend-item">
            <span className="legend-dot red"></span> Low (0-39%)
          </span>
        </div>

        {/* Main Layout */}
        <div className="layout">
          <div className="insights-feed">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              filteredInsights.map(item => (
                <InsightCard
                  key={item.id}
                  item={item}
                  onPin={handlePin}
                  pinned={pinned.some(p => p.id === item.id)}
                />
              ))
            )}
            
            {!loading && filteredInsights.length === 0 && (
              <div className="empty-state">
                <p>No insights match your filter</p>
                <button onClick={() => setFilter(false)}>
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          <Sidebar 
            pinned={pinned}
            onUnpin={handlePin}
          />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}