import { useState } from 'react';
import BaggageTabPanel from '../components/baggage/BaggageTabPanel';
import BaggageTabs from '../components/baggage/BaggageTabs';

export default function BaggageGuide() {
  const [activeTab, setActiveTab] = useState('carry-on');

  return (
    <main className="information-page baggage-guide-page">
      <div className="information-page__inner">
        <h1>수하물 안내</h1>
        <BaggageTabs activeTab={activeTab} onChange={setActiveTab} />
        <BaggageTabPanel activeTab={activeTab} />
      </div>
    </main>
  );
}
