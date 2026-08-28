import { formatKRW } from '../../../utils/price';
import FlightPathArrowIcon from '../../icons/FlightPathArrowIcon';
import { FARE_OPTIONS } from './fareOptions';

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}시간 ${String(restMinutes).padStart(2, '0')}분`;
};

function FlightOptionRow({ fareGroupName, flight, onSelectFare, selectedFareKey }) {
  const isFlightSoldOut = flight.availability.seatsLeft <= 0;

  return (
    <article className="flight-option-row">
      <div className="flight-option-row__summary">
        <div className="flight-option-row__time">
          <strong>{flight.schedule.departureTime}</strong>
          <span>{flight.route.from.code}</span>
        </div>

        <div className="flight-option-row__duration">
          <em>{formatDuration(flight.schedule.durationMinutes)}</em>
          <span aria-hidden="true">
            <FlightPathArrowIcon className="flight-option-row__duration-arrow is-horizontal" />
            <FlightPathArrowIcon
              className="flight-option-row__duration-arrow is-vertical"
              direction="down"
            />
          </span>
        </div>

        <div className="flight-option-row__time">
          <strong>{flight.schedule.arrivalTime}</strong>
          <span>{flight.route.to.code}</span>
        </div>

        <div className="flight-option-row__info">
          <strong>{flight.flightNo}</strong>
          <span>{flight.airline.name}</span>
        </div>
      </div>

      <div className="flight-option-row__fares">
        {FARE_OPTIONS.map((option) => {
          const fare = flight.fares[option.key];
          const isFareSoldOut = isFlightSoldOut || fare.seatsLeft <= 0;

          return (
            <label
              className={`flight-option-row__fare flight-option-row__fare--${option.key}${isFareSoldOut ? ' is-sold-out' : ''}`}
              key={option.key}
            >
              <input
                type="radio"
                name={fareGroupName}
                aria-label={`${flight.flightNo} ${option.label} ${isFareSoldOut ? '매진' : `${formatKRW(fare.price)} ${fare.seatsLeft}석`}`}
                checked={!isFareSoldOut && selectedFareKey === option.key}
                disabled={isFareSoldOut}
                onChange={() => {
                  if (!isFareSoldOut) {
                    onSelectFare?.(option.key);
                  }
                }}
              />
              <span>
                <strong className="flight-option-row__fare-label">{option.label}</strong>
                <em>{isFareSoldOut ? '매진' : formatKRW(fare.price)}</em>
                <small>{isFareSoldOut ? '선택 불가' : `잔여 ${fare.seatsLeft}석`}</small>
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

export default FlightOptionRow;
