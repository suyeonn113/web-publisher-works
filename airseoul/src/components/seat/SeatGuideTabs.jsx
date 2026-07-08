import { useRef } from 'react';
import { getRovingTabNextIndex } from '../../utils/rovingTab';

export default function SeatGuideTabs({ activeTab, onChange, tabs }) {
  const tabRefs = useRef([]);

  const handleKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, tabs.length);
    if (nextIndex === null) return;

    event.preventDefault();
    onChange(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="seat-guide-tabs" role="tablist" aria-label="좌석 안내">
      {tabs.map((tab, index) => (
        <button
          type="button"
          role="tab"
          id={`seat-guide-tab-${tab.id}`}
          aria-controls={`seat-guide-panel-${tab.id}`}
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
