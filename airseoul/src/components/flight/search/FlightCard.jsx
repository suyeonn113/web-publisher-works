import FlightFareOption from './FlightFareOption';

function FlightCard({ flight }) {
  return (
    <article className="flight-card">
      <header className="flight-card__header">
        <strong>{flight.flightNo}</strong>
        <span>{flight.airline.name}</span>
      </header>

      <div className="flight-card__route">
        <div>
          <strong>{flight.schedule.departureTime}</strong>
          <span>
            {flight.route.from.city} {flight.route.from.airport}
          </span>
        </div>
        <span>{flight.schedule.durationMinutes}분</span>
        <div>
          <strong>{flight.schedule.arrivalTime}</strong>
          <span>
            {flight.route.to.city} {flight.route.to.airport}
          </span>
        </div>
      </div>

      <div className="flight-card__fares">
        <FlightFareOption fare={flight.fares.special} />
        <FlightFareOption fare={flight.fares.discount} />
        <FlightFareOption fare={flight.fares.normal} />
      </div>
    </article>
  );
}

export default FlightCard;
