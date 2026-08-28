import { SEAT_ZONES } from './seatGuideData';

export default function SeatZoneGuide({ onLogin }) {
  return (
    <section className="seat-guide-panel">
      <header className="seat-guide-panel__intro">
        <div>
          <h1>좌석 안내</h1>
          <p>항공기 기종과 좌석 위치에 따라 네 가지 구역으로 구분됩니다.</p>
        </div>
        <button className="seat-guide-login-button" type="button" onClick={onLogin}>
          로그인 후 좌석 선택
        </button>
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
