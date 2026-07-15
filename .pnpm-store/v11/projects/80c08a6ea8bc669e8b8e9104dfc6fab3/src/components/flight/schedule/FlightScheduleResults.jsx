import { useRef, useState } from 'react';
import { formatKoreanMonthDay } from '../../../utils/date';

const STATUS_LABELS = {
  available: '운항 예정',
};

function formatDuration(durationMinutes) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours}시간${minutes ? ` ${minutes}분` : ''}`;
}

function FlightResultHeader({ showDate = false }) {
  return (
    <div className={`flight-schedule-results__columns${showDate ? ' has-date' : ''}`} aria-hidden="true">
      {showDate && <span>운항일</span>}
      <span>편명</span>
      <span>출발</span>
      <span>운항시간</span>
      <span>도착</span>
      <span>상태</span>
    </div>
  );
}

function FlightResultRow({ flight, showDate = false }) {
  return (
    <li className={`flight-schedule-results__row${showDate ? ' has-date' : ''}`}>
      {showDate && (
        <span className="flight-schedule-results__date">
          {formatKoreanMonthDay(flight.schedule.departureDate)}
        </span>
      )}
      <strong className="flight-schedule-results__number">{flight.flightNo}</strong>
      <div className="flight-schedule-results__airport flight-schedule-results__airport--departure">
        <strong>{flight.schedule.departureTime}</strong>
        <span>{flight.route.from.city} · {flight.route.from.code}</span>
      </div>
      <div className="flight-schedule-results__duration">
        <span aria-hidden="true">→</span>
        <small>{formatDuration(flight.schedule.durationMinutes)}</small>
      </div>
      <div className="flight-schedule-results__airport flight-schedule-results__airport--arrival">
        <strong>{flight.schedule.arrivalTime}</strong>
        <span>{flight.route.to.city} · {flight.route.to.code}</span>
      </div>
      <em className="flight-schedule-results__status">
        {STATUS_LABELS[flight.availability.status] ?? flight.availability.status}
      </em>
    </li>
  );
}

function EmptyResult() {
  return (
    <p className="flight-schedule-results__empty">
      선택한 조건에 해당하는 항공편이 없습니다.
    </p>
  );
}

function WeeklyResultGroup({ groups, id, title }) {
  const initialDate = groups.find((group) => group.flights.length > 0)?.date ?? groups[0]?.date;
  const [activeDate, setActiveDate] = useState(initialDate);
  const tabRefs = useRef([]);
  const selectedDate = groups.some((group) => group.date === activeDate)
    ? activeDate
    : initialDate;
  const activeGroup = groups.find((group) => group.date === selectedDate) ?? groups[0];

  const handleDateKeyDown = (event, currentIndex) => {
    const lastIndex = groups.length - 1;
    let nextIndex;

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveDate(groups[nextIndex].date);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="flight-schedule-results__weekly-group">
      <h4>{title}</h4>
      <div className="flight-schedule-results__date-tabs" role="tablist" aria-label={`${title} 운항일`}>
        {groups.map((group, index) => (
          <button
            aria-controls={`${id}-date-panel`}
            aria-selected={selectedDate === group.date}
            className={`${selectedDate === group.date ? 'is-active' : ''}${group.flights.length === 0 ? ' is-empty' : ''}`}
            id={`${id}-date-${group.date}`}
            key={group.date}
            onClick={() => setActiveDate(group.date)}
            onKeyDown={(event) => handleDateKeyDown(event, index)}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            role="tab"
            tabIndex={selectedDate === group.date ? 0 : -1}
            type="button"
          >
            <span>{formatKoreanMonthDay(group.date)}</span>
            <small>{group.flights.length > 0 ? `${group.flights.length}편` : '운항 없음'}</small>
          </button>
        ))}
      </div>
      <div
        className="flight-schedule-results__table"
        id={`${id}-date-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-date-${activeGroup.date}`}
      >
        {activeGroup.flights.length > 0 ? (
          <>
            <FlightResultHeader />
            <ul>
              {activeGroup.flights.map((flight) => (
                <FlightResultRow flight={flight} key={flight.id} />
              ))}
            </ul>
          </>
        ) : (
          <EmptyResult />
        )}
      </div>
    </section>
  );
}

function FlightScheduleResults({ result }) {
  if (!result) return null;

  if (result.type === 'weekly') {
    return (
      <section className="flight-schedule-results" aria-live="polite" aria-label="주간 스케줄 검색 결과">
        <header>
          <h3>주간 스케줄</h3>
          <span>선택일 포함 7일</span>
        </header>
        <WeeklyResultGroup groups={result.outbound} id="outbound" title="가는 편" />
        {result.inbound && (
          <WeeklyResultGroup groups={result.inbound} id="inbound" title="오는 편" />
        )}
      </section>
    );
  }

  return (
    <section className="flight-schedule-results" aria-live="polite" aria-label="출도착 검색 결과">
      <header>
        <h3>출도착 조회 결과</h3>
        <span>총 {result.flights.length}편</span>
      </header>
      {result.flights.length > 0 ? (
        <div className="flight-schedule-results__table">
          <FlightResultHeader showDate />
          <ul>
            {result.flights.map((flight) => (
              <FlightResultRow flight={flight} key={flight.id} showDate />
            ))}
          </ul>
        </div>
      ) : (
        <EmptyResult />
      )}
    </section>
  );
}

export default FlightScheduleResults;
