import { useState } from 'react';
import { ADVANCE_SEAT_PRICES } from './seatGuideData';

const PRICE_COLUMNS = ['노선', 'MINT 1열·비상구', 'MINT 2~3열', 'A구역', 'B구역'];

export default function SeatPriceGuide() {
  const [activeRoute, setActiveRoute] = useState(ADVANCE_SEAT_PRICES[0][0]);
  const activePrice = ADVANCE_SEAT_PRICES.find((row) => row[0] === activeRoute);
  const activeRouteIndex = ADVANCE_SEAT_PRICES.findIndex((row) => row[0] === activeRoute);

  return (
    <section className="seat-guide-panel">
      <header>
        <h2>사전 좌석 구매 요금</h2>
        <p>아래 금액은 한국 출발 기준이며 출발지 통화와 구매 시점에 따라 달라질 수 있습니다.</p>
      </header>

      <div className="seat-price-table">
        <table>
          <thead>
            <tr>{PRICE_COLUMNS.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {ADVANCE_SEAT_PRICES.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  index === 0 ? (
                    <th scope="row" data-label={PRICE_COLUMNS[index]} key={cell}>{cell}</th>
                  ) : (
                    <td data-label={PRICE_COLUMNS[index]} key={cell}>{cell}</td>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="seat-price-mobile">
        <div className="seat-price-mobile__tabs" role="tablist" aria-label="좌석 요금 노선 선택">
          {ADVANCE_SEAT_PRICES.map((row, index) => (
            <button
              type="button"
              role="tab"
              id={`seat-price-tab-${index}`}
              aria-controls="seat-price-mobile-panel"
              aria-selected={activeRoute === row[0]}
              className={activeRoute === row[0] ? 'is-active' : ''}
              key={row[0]}
              onClick={() => setActiveRoute(row[0])}
            >
              {row[0]}
            </button>
          ))}
        </div>

        <div
          className="seat-price-mobile__panel"
          id="seat-price-mobile-panel"
          role="tabpanel"
          aria-labelledby={`seat-price-tab-${activeRouteIndex}`}
        >
          <dl>
            <div className="is-heading">
              <dt>노선</dt>
              <dd>{activePrice[0]}</dd>
            </div>
            {PRICE_COLUMNS.slice(1).map((column, index) => (
              <div key={column}>
                <dt>{column}</dt>
                <dd>{activePrice[index + 1]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <p className="seat-guide-caption">
        공항 현장 구매는 MINT ZONE 좌석에 한해 가능하며 사전 구매보다 높은 요금이 적용될 수 있습니다.
      </p>
    </section>
  );
}
