import { formatKRW } from '../../../utils/price';

function FlightFareOption({ fare }) {
  return (
    <article className="flight-fare-option">
      <strong>{fare.label}</strong>
      <span>{formatKRW(fare.price)}</span>
    </article>
  );
}

export default FlightFareOption;
