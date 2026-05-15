import { useState } from 'react';
import ArrowRightLeftIcon from '../../icons/ArrowRightLeftIcon';
import CalendarIcon from '../../icons/CalendarIcon';

const REALTIME_FLIGHTS = {
  departures: [
    { flightNo: 'RS 701', time: '09:24', route: '서울/인천(ICN) → 도쿄/나리타(NRT)' },
    { flightNo: 'RS 741', time: '08:41', route: '서울/인천(ICN) → 다카마쓰(TAK)' },
    { flightNo: 'RS 705', time: '08:11', route: '서울/인천(ICN) → 도쿄/나리타(NRT)' },
    { flightNo: 'RS 723', time: '08:04', route: '서울/인천(ICN) → 후쿠오카(FUK)' },
  ],
  arrivals: [
    { flightNo: 'RS 512', time: '07:24', route: '다낭(DAD) → 서울/인천(ICN)' },
    { flightNo: 'RS 528', time: '07:18', route: '나트랑(CXR) → 서울/인천(ICN)' },
  ],
};

function FlightSchedulePanel() {
  const [searchType, setSearchType] = useState('status');
  const [routeType, setRouteType] = useState('route');

  return (
    <div className="flight-booking-service flight-booking-service--schedule">
      <div className="flight-booking-service__schedule-options">
        <div className="flight-booking-panel__chips" role="group" aria-label="조회 유형">
          <button
            className={searchType === 'status' ? 'is-active' : ''}
            type="button"
            onClick={() => setSearchType('status')}
          >
            출도착 조회
          </button>
          <button
            className={searchType === 'weekly' ? 'is-active' : ''}
            type="button"
            onClick={() => setSearchType('weekly')}
          >
            주간 스케줄
          </button>
        </div>
        <div className="flight-booking-panel__chips" role="group" aria-label="조회 기준">
          <button
            className={routeType === 'route' ? 'is-active' : ''}
            type="button"
            onClick={() => setRouteType('route')}
          >
            출/도착지
          </button>
          <button
            className={routeType === 'flightNo' ? 'is-active' : ''}
            type="button"
            onClick={() => setRouteType('flightNo')}
          >
            편명
          </button>
        </div>
      </div>

      <div className="flight-booking-service__schedule-search">
        <div className="flight-booking-service__route-summary">
          <button type="button">
            <strong>From</strong>
            <span>출발지</span>
          </button>
          <button className="flight-booking-panel__swap" type="button" aria-label="출발지와 도착지 바꾸기">
            <ArrowRightLeftIcon size={22} />
          </button>
          <button type="button">
            <strong>To</strong>
            <span>도착지</span>
          </button>
        </div>
        <button className="flight-booking-panel__field flight-booking-panel__date" type="button">
          <span>출발일</span>
          <strong className="flight-booking-panel__date-value">
            <CalendarIcon size={18} />
            05월 15일 (금)
          </strong>
        </button>
        <button className="flight-booking-service__submit" type="button">
          조회
        </button>
      </div>

      <section className="flight-booking-realtime" aria-label="실시간 출도착 정보">
        <header>
          <h3>실시간 출도착 정보</h3>
          <span>2026.05.15(금) 11:16 기준</span>
        </header>
        <div className="flight-booking-realtime__board">
          <section>
            <h4>출발</h4>
            {REALTIME_FLIGHTS.departures.map((flight) => (
              <div className="flight-booking-realtime__row" key={`${flight.flightNo}-${flight.time}`}>
                <strong>{flight.flightNo}</strong>
                <span>{flight.time}</span>
                <em>{flight.route}</em>
              </div>
            ))}
          </section>
          <section>
            <h4>도착</h4>
            {REALTIME_FLIGHTS.arrivals.map((flight) => (
              <div className="flight-booking-realtime__row" key={`${flight.flightNo}-${flight.time}`}>
                <strong>{flight.flightNo}</strong>
                <span>{flight.time}</span>
                <em>{flight.route}</em>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
}

export default FlightSchedulePanel;
