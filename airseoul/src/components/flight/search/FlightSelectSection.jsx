import DateFareBar from './DateFareBar';
import FlightOptionRow from './FlightOptionRow';

function FlightSelectSection({
  dateFareItems,
  flights,
  from,
  Icon,
  onSelectDate,
  onSelectFlight,
  selectedFlight,
  selectionName,
  title,
  to,
}) {
  return (
    <section className="flight-select-section">
      <header className="flight-select-section__header">
        <div className="flight-select-section__heading">
          <Icon size={24} />
          <h2>{title}</h2>
          <p>
            {from} <span aria-hidden="true">→</span> {to}
          </p>
        </div>
        <span>통화 : KRW</span>
      </header>

      <DateFareBar items={dateFareItems} onSelectDate={onSelectDate} />

      <div className="flight-select-section__table">
        <div className="flight-select-section__table-head" aria-hidden="true">
          <span>편명</span>
          <span>출발시간</span>
          <span>소요시간</span>
          <span>도착시간</span>
          <span>운임</span>
        </div>

        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightOptionRow
              flight={flight}
              fareGroupName={`fare-${selectionName}`}
              key={flight.id}
              onSelectFare={(fareKey) => onSelectFlight?.({ fareKey, flight })}
              selectedFareKey={selectedFlight?.flight.id === flight.id ? selectedFlight.fareKey : ''}
            />
          ))
        ) : (
          <p className="flight-select-section__empty">
            조건에 맞는 항공편이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}

export default FlightSelectSection;
