import { useRef } from 'react';
import { getRovingTabNextIndex } from '../../utils/rovingTab';
import { BAGGAGE_TABS } from './baggageGuideData';

export default function BaggageTabs({ activeTab, onChange }) {
  const tabRefs = useRef([]);

  const handleKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, BAGGAGE_TABS.length);
    if (nextIndex === null) return;

    event.preventDefault();
    onChange(BAGGAGE_TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="baggage-guide-tabs" role="tablist" aria-label="수하물 안내">
      {BAGGAGE_TABS.map((tab, index) => (
        <button
          type="button"
          role="tab"
          id={`baggage-tab-${tab.id}`}
          aria-controls={`baggage-panel-${tab.id}`}
          aria-selected={activeTab === tab.id}
          tabIndex={activeTab === tab.id ? 0 : -1}
          className={activeTab === tab.id ? 'is-active' : ''}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          ref={(element) => {
            tabRefs.current[index] = element;
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
