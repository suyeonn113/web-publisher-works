import FlightFareOption from './FlightFareOption';
import { formatAirportDisplayName } from '../../../utils/airports';

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
            {formatAirportDisplayName(flight.route.from, { separator: ' ' })}
          </span>
        </div>
        <span>{flight.schedule.durationMinutes}분</span>
        <div>
          <strong>{flight.schedule.arrivalTime}</strong>
          <span>
            {formatAirportDisplayName(flight.route.to, { separator: ' ' })}
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
