const FILTERS = [
  { key: "all", label: "All" },
  { key: "todo", label: "To Do" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Done" },
];

function FilterBar({ active, onChange, tasks }) {
  // Count per status for the badge numbers
  const countFor = (key) =>
    key === "all" ? tasks.length : tasks.filter((t) => t.status === key).length;

  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${active === f.key ? "filter-active" : ""}`}
          onClick={() => onChange(f.key)}
        >
          {f.label}
          <span className="filter-count">{countFor(f.key)}</span>
        </button>
      ))}
    </div>
  );
}

export default FilterBar;