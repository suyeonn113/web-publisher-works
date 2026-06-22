import { useState } from 'react';
import AirportCongestionPanel from '../components/airport/AirportCongestionPanel';
import AirportInfoPanel from '../components/airport/AirportInfoPanel';

const TABS = [
  { id: 'info', label: '취항지 공항정보' },
  { id: 'congestion', label: '출국장 / 주차장 혼잡도' },
];

export default function AirportService() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <main className="information-page">
      <div className="information-page__inner">
        <h1>공항 서비스</h1>
        <div className="information-tabs" role="tablist" aria-label="공항 서비스">
          {TABS.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? 'is-active' : ''}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'info' ? <AirportInfoPanel /> : <AirportCongestionPanel />}
      </div>
    </main>
  );
}
