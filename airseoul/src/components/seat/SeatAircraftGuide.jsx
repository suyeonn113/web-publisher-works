import { useRef, useState } from 'react';
import { getRovingTabNextIndex } from '../../utils/rovingTab';
import { ADVANCE_SEAT_PRICES, SEAT_AIRCRAFTS } from './seatGuideData';
import SeatRouteSelector from './SeatRouteSelector';

function ZoneTitle({ zone }) {
  return (
    <>
      <strong>{zone.grade}</strong>
      {zone.detail && <span>{zone.detail}</span>}
    </>
  );
}

export default function SeatAircraftGuide() {
  const [activeAircraftId, setActiveAircraftId] = useState(SEAT_AIRCRAFTS[0].id);
  const [activeRouteIndex, setActiveRouteIndex] = useState(0);
  const aircraftTabRefs = useRef([]);
  const activeAircraft = SEAT_AIRCRAFTS.find((aircraft) => aircraft.id === activeAircraftId);
  const activePriceRow = ADVANCE_SEAT_PRICES[activeRouteIndex];

  const handleAircraftTabKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, SEAT_AIRCRAFTS.length);
    if (nextIndex === null) return;

    event.preventDefault();
    setActiveAircraftId(SEAT_AIRCRAFTS[nextIndex].id);
    aircraftTabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="seat-guide-panel seat-aircraft-guide">
      <header>
        <h2>기종별 좌석·요금 및 배치도</h2>
        <p>기종과 노선을 선택하면 좌석 위치와 구매 요금을 한 번에 확인할 수 있습니다.</p>
      </header>

      <div className="seat-aircraft-content">
        <p className="seat-aircraft-tabs__hint">
          <span aria-hidden="true">↔</span>
          좌우로 밀어 다른 기종 보기
        </p>
        <div className="seat-aircraft-tabs" role="tablist" aria-label="항공기 기종 선택">
          {SEAT_AIRCRAFTS.map((aircraft, index) => (
            <button
              type="button"
              role="tab"
              id={`seat-aircraft-tab-${aircraft.id}`}
              aria-controls="seat-aircraft-panel"
              aria-selected={activeAircraftId === aircraft.id}
              tabIndex={activeAircraftId === aircraft.id ? 0 : -1}
              className={activeAircraftId === aircraft.id ? 'is-active' : ''}
              key={aircraft.id}
              onClick={() => setActiveAircraftId(aircraft.id)}
              onKeyDown={(event) => handleAircraftTabKeyDown(event, index)}
              ref={(element) => {
                aircraftTabRefs.current[index] = element;
              }}
            >
              {aircraft.label}
            </button>
          ))}
        </div>

        <article
          className="seat-aircraft-panel"
          id="seat-aircraft-panel"
          role="tabpanel"
          aria-labelledby={`seat-aircraft-tab-${activeAircraft.id}`}
        >
          <SeatRouteSelector
            activeIndex={activeRouteIndex}
            idPrefix="seat-route"
            labels={ADVANCE_SEAT_PRICES.map((priceRow) => priceRow[0])}
            onChange={setActiveRouteIndex}
            panelId="seat-aircraft-zone-prices"
          />

          <section
            className="seat-aircraft-panel__section"
            id="seat-aircraft-zone-prices"
            role="tabpanel"
            aria-labelledby={`seat-route-tab-${activeRouteIndex} seat-aircraft-grade-title`}
          >
            <h3 id="seat-aircraft-grade-title">좌석 구분 및 등급</h3>
            <dl className="seat-aircraft-zone-list">
              {activeAircraft.zones.map((zone, index) => (
                <div key={`${activeAircraft.id}-${zone.grade}-${zone.detail}`}>
                  <dt><ZoneTitle zone={zone} /></dt>
                  <dd>
                    <div className="seat-aircraft-zone-list__seat">
                      <span className="seat-aircraft-zone-list__label">해당 좌석</span>
                      <strong className="seat-aircraft-zone-list__seat-value">{zone.seats}</strong>
                    </div>
                    <div className="seat-aircraft-zone-list__fare">
                      <span className="seat-aircraft-zone-list__label">
                        {activePriceRow[0]} 구매 요금
                      </span>
                      <strong className="seat-aircraft-zone-list__price">{activePriceRow[index + 1]}</strong>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="seat-aircraft-panel__price-note">
            한국 출발 기준이며 출발지 통화와 구매 시점에 따라 달라질 수 있습니다.
          </p>

          <figure className="seat-aircraft-map">
            <figcaption>좌석 배치도</figcaption>
            <div className="seat-map-image">
              <img
                src={activeAircraft.src}
                alt={`${activeAircraft.label} 좌석 배치도`}
                loading="lazy"
              />
            </div>
          </figure>
        </article>
      </div>
    </section>
  );
}
