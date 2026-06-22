import { useState } from 'react';
import AdjacentSeatGuide from '../components/seat/AdjacentSeatGuide';
import AdvanceSeatGuide from '../components/seat/AdvanceSeatGuide';
import SeatGuideTabs from '../components/seat/SeatGuideTabs';
import { SEAT_TABS } from '../components/seat/seatGuideData';
import { UI_EVENTS } from '../constants/uiEvents';

export default function SeatGuide() {
  const [activeTab, setActiveTab] = useState('guide');
  const openLogin = () => window.dispatchEvent(new CustomEvent(UI_EVENTS.OPEN_LOGIN_PANEL));

  return (
    <main className="seat-guide-page">
      <div className="seat-guide-page__inner">
        <header className="seat-guide-page__header">
          <div>
            <h1>좌석 안내</h1>
            <p>원하는 좌석을 미리 선택하고 편안한 여행을 준비하세요.</p>
          </div>
          <button type="button" onClick={openLogin}>로그인 후 좌석 선택</button>
        </header>

        <SeatGuideTabs activeTab={activeTab} onChange={setActiveTab} tabs={SEAT_TABS} />
        <div className="seat-guide-page__content" role="tabpanel">
          {activeTab === 'guide' && <AdvanceSeatGuide />}
          {activeTab === 'adjacent' && <AdjacentSeatGuide />}
        </div>
      </div>
    </main>
  );
}
