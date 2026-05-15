import FlightCard from './FlightCard';

function FlightSearchResultList({ flights }) {
  if (flights.length === 0) {
    return <p className="flight-search-results__empty">조건에 맞는 항공편이 없습니다.</p>;
  }

  return (
    <div className="flight-search-results__list">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}

export default FlightSearchResultList;
