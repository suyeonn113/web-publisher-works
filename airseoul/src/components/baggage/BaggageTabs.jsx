import { BAGGAGE_TABS } from './baggageGuideData';

export default function BaggageTabs({ activeTab, onChange }) {
  return (
    <div className="baggage-guide-tabs" role="tablist" aria-label="수하물 안내">
      {BAGGAGE_TABS.map((tab) => (
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
