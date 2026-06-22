export default function SeatGuideTabs({ activeTab, onChange, tabs }) {
  return (
    <div className="seat-guide-tabs" role="tablist" aria-label="좌석 안내">
      {tabs.map((tab) => (
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          className={activeTab === tab.id ? 'is-active' : ''}
          key={tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
