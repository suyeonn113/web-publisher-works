import { formatKRW } from '../../../utils/price';

const FARE_OPTIONS = [
  { key: 'special', label: '특가운임' },
  { key: 'discount', label: '할인운임' },
  { key: 'normal', label: '정상운임' },
];

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}시간 ${String(restMinutes).padStart(2, '0')}분`;
};

function FlightOptionRow({ flight }) {
  return (
    <article className="flight-option-row">
      <div className="flight-option-row__info">
        <strong>{flight.flightNo}</strong>
        <span>{flight.airline.name}</span>
      </div>

      <div className="flight-option-row__time">
        <strong>{flight.schedule.departureTime}</strong>
        <span>{flight.route.from.code}</span>
      </div>

      <div className="flight-option-row__duration">
        <span aria-hidden="true" />
        <em>{formatDuration(flight.schedule.durationMinutes)}</em>
      </div>

      <div className="flight-option-row__time">
        <strong>{flight.schedule.arrivalTime}</strong>
        <span>{flight.route.to.code}</span>
      </div>

      <div className="flight-option-row__fares">
        {FARE_OPTIONS.map((option, index) => {
          const fare = flight.fares[option.key];

          return (
            <label className="flight-option-row__fare" key={option.key}>
              <input
                type="radio"
                name={`fare-${flight.id}`}
                defaultChecked={index === 0}
              />
              <span>
                <strong>{option.label}</strong>
                <em>{formatKRW(fare.price)}</em>
                <small>{fare.seatsLeft}석</small>
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}

export default FlightOptionRow;
