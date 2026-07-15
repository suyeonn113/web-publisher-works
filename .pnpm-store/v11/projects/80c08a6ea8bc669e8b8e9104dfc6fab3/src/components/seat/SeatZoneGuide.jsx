import { SEAT_ZONES } from './seatGuideData';

export default function SeatZoneGuide() {
  return (
    <section className="seat-guide-panel">
      <header>
        <h2>좌석 구역 안내</h2>
        <p>항공기 기종과 좌석 위치에 따라 네 가지 구역으로 구분됩니다.</p>
      </header>
      <div className="seat-zone-list">
        {SEAT_ZONES.map((zone) => (
          <article key={`${zone.name}-${zone.detail}`}>
            <strong>{zone.name}</strong>
            <span>{zone.detail}</span>
            <p>{zone.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
