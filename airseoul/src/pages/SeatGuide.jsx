import { useSearchParams } from 'react-router-dom';
import AdjacentSeatGuide from '../components/seat/AdjacentSeatGuide';
import AdvanceSeatGuide from '../components/seat/AdvanceSeatGuide';
import SeatGuideTabs from '../components/seat/SeatGuideTabs';
import { SEAT_TABS } from '../components/seat/seatGuideData';
import { UI_EVENTS } from '../constants/uiEvents';

export default function SeatGuide() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const activeTab = SEAT_TABS.some((tab) => tab.id === requestedTab) ? requestedTab : 'guide';
  const openLogin = () => window.dispatchEvent(new CustomEvent(UI_EVENTS.OPEN_LOGIN_PANEL));

  const handleTabChange = (tabId) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (tabId === 'guide') nextSearchParams.delete('tab');
    else nextSearchParams.set('tab', tabId);

    setSearchParams(nextSearchParams, { replace: true });
  };

  return (
    <main className="seat-guide-page">
      <div className="seat-guide-page__inner">
        <div className="seat-guide-page__layout">
          <SeatGuideTabs activeTab={activeTab} onChange={handleTabChange} tabs={SEAT_TABS} />

          <div className="seat-guide-page__main">
            <div
              className="seat-guide-page__content"
              id={`seat-guide-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`seat-guide-tab-${activeTab}`}
            >
              {activeTab === 'guide' && <AdvanceSeatGuide onLogin={openLogin} />}
              {activeTab === 'adjacent' && <AdjacentSeatGuide onLogin={openLogin} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
