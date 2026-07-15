import { useRef, useState } from 'react';
import AirportCongestionPanel from '../components/airport/AirportCongestionPanel';
import AirportInfoPanel from '../components/airport/AirportInfoPanel';
import { getRovingTabNextIndex } from '../utils/rovingTab';

const TABS = [
  { id: 'info', label: '취항지 공항정보' },
  { id: 'congestion', label: '출국장 / 주차장 혼잡도' },
];

export default function AirportService() {
  const [activeTab, setActiveTab] = useState('info');
  const tabRefs = useRef([]);

  const handleTabKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, TABS.length);
    if (nextIndex === null) return;

    event.preventDefault();
    setActiveTab(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <main className="information-page">
      <div className="information-page__inner">
        <h1>공항 서비스</h1>
        <div className="information-tabs" role="tablist" aria-label="공항 서비스">
          {TABS.map((tab, index) => (
            <button
              type="button"
              role="tab"
              id={`airport-service-tab-${tab.id}`}
              aria-controls={`airport-service-panel-${tab.id}`}
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={activeTab === tab.id ? 'is-active' : ''}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          id={`airport-service-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`airport-service-tab-${activeTab}`}
        >
          {activeTab === 'info' ? <AirportInfoPanel /> : <AirportCongestionPanel />}
        </div>
      </div>
    </main>
  );
}
