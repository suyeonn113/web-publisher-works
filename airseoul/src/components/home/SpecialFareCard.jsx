import { formatKoreanMonthDay } from '../../utils/date';
import { formatKRW } from '../../utils/price';

function SpecialFareCard({ fare, onSelect }) {
  return (
    <button className="special-fare-card" type="button" onClick={() => onSelect(fare)}>
      <span
        className="special-fare-card__image"
        style={{ backgroundImage: `url(${fare.image})` }}
        aria-hidden="true"
      />

      <span className="special-fare-card__content">
        <span className="special-fare-card__from">
          {fare.from.city}/{fare.from.airport}
        </span>

        <strong className="special-fare-card__to">
          {fare.to.city}
        </strong>

        <span className="special-fare-card__price">
          {formatKRW(fare.price)} ~
        </span>

        <span className="special-fare-card__date">
          {formatKoreanMonthDay(fare.searchParams.departureDate)} 출발
        </span>
      </span>
    </button>
  );
}

export default SpecialFareCard;