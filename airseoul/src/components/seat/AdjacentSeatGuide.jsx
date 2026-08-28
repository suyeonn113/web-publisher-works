import { useState } from 'react';
import CircleAlertIcon from '../icons/CircleAlertIcon';
import { ADJACENT_SEAT_PRICES } from './seatGuideData';
import SeatRouteSelector from './SeatRouteSelector';

export default function AdjacentSeatGuide({ onLogin }) {
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const activePriceRow = ADJACENT_SEAT_PRICES[activeRouteIndex];

  return (
    <div className="adjacent-seat-guide">
      <section className="seat-guide-panel adjacent-seat-guide__main">
        <header className="seat-guide-panel__intro">
          <div>
            <h1>옆 좌석 구매</h1>
            <p>편안한 비행을 위해 본인 좌석과 연결된 좌석을 최대 2석까지 구매할 수 있습니다.</p>
          </div>
          <button className="seat-guide-login-button" type="button" onClick={onLogin}>
            로그인 후 좌석 선택
          </button>
        </header>

        <SeatRouteSelector
          activeIndex={activeRouteIndex}
          idPrefix="adjacent-seat-route"
          labels={ADJACENT_SEAT_PRICES.map((priceRow) => priceRow[0])}
          onChange={setActiveRouteIndex}
          panelId="adjacent-seat-price-panel"
        />

        <section
          className="adjacent-seat-price-panel"
          id="adjacent-seat-price-panel"
          role="tabpanel"
          aria-labelledby={`adjacent-seat-route-tab-${activeRouteIndex}`}
        >
          <h2>옆 좌석 구매 요금</h2>
          <dl className="adjacent-seat-fares">
            <div>
              <dt>
                <strong>1석 구매</strong>
                <span>본인 좌석과 연결된 좌석 1석</span>
              </dt>
              <dd>{activePriceRow[1]}</dd>
            </div>
            <div>
              <dt>
                <strong>2석 구매</strong>
                <span>본인 좌석과 연결된 좌석 2석</span>
              </dt>
              <dd>{activePriceRow[2]}</dd>
            </div>
          </dl>
        </section>
      </section>

      <section className="seat-guide-panel seat-guide-rules adjacent-seat-rules">
        <h2 className="seat-guide-rules__title">
          <CircleAlertIcon size={28} />
          <span>이용 규정</span>
        </h2>
        <ul>
          <li>출발 당일 공항에서 잔여 좌석이 있는 경우에만 구매할 수 있습니다.</li>
          <li>사전 구매는 불가능하며 일반적으로 환불되지 않습니다.</li>
          <li>결항이나 지연으로 서비스를 제공받지 못한 경우에는 환불할 수 있습니다.</li>
        </ul>
      </section>
    </div>
  );
}
