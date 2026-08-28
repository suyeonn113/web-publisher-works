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
        {flights.length > 0 ? (
          <>
            <div className="flight-select-section__results-heading">
              <strong>{flights.length}개의 항공편</strong>
              <span>원하는 시간과 운임을 선택해 주세요.</span>
            </div>

            {flights.map((flight) => (
              <FlightOptionRow
                flight={flight}
                fareGroupName={`fare-${selectionName}`}
                key={flight.id}
                onSelectFare={(fareKey) => onSelectFlight?.({ fareKey, flight })}
                selectedFareKey={selectedFlight?.flight.id === flight.id ? selectedFlight.fareKey : ''}
              />
            ))}
          </>
        ) : (
          <div className="flight-select-section__empty">
            <strong>선택한 날짜에는 운항편이 없습니다.</strong>
            <span>위 날짜 목록에서 다른 날짜의 운임을 확인해 주세요.</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default FlightSelectSection;
