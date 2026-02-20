// components/FilterToggle.jsx
export default function FilterToggle({ filter, setFilter, count }) {
  return (
    <div className="filter-section">
      <label className="filter-label">
        <input
          type="checkbox"
          className="filter-checkbox"
          checked={filter}
          onChange={(e) => setFilter(e.target.checked)}
        />
        <span>Show High Confidence Only (≥70%)</span>
        {count > 0 && (
          <span className="filter-count">{count}</span>
        )}
      </label>
    </div>
  );
}