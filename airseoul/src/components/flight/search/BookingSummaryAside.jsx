import ChevronRightIcon from '../../icons/ChevronRightIcon';
import UsersGroupIcon from '../../icons/UsersGroupIcon';
import PlaneLandingIcon from '../../icons/PlaneLandingIcon';
import PlaneTakeoffIcon from '../../icons/PlaneTakeoffIcon';
import { formatKoreanMonthDay } from '../../../utils/date';
import { formatKRW } from '../../../utils/price';

const PASSENGER_LABELS = [
  { key: 'adult', label: '성인' },
  { key: 'child', label: '소아' },
  { key: 'infant', label: '유아' },
];

function SelectedFlightSummary({ Icon, selection, title }) {
  const flight = selection?.flight;
  const fare = flight?.fares?.[selection?.fareKey];

  return (
    <section className="booking-summary-aside__flight">
      <h3>
        <Icon size={18} />
        {title}
      </h3>

      {flight ? (
        <>
          <strong>{formatKoreanMonthDay(flight.schedule.departureDate)}</strong>
          <p>
            <span className="flight-route__item">
              <b>{flight.route.from.code}</b>
              <span>{flight.schedule.departureTime}</span>
            </span>
            <i aria-hidden="true">→</i>
            <span className="flight-route__item">
              <b>{flight.route.to.code}</b>
              <span>{flight.schedule.arrivalTime}</span>
            </span>
          </p>
          <em>
            {flight.airline.name} {flight.flightNo}
          </em>
          <small>
            {fare?.label ?? '운임 선택'}
            {fare ? ` ${formatKRW(fare.price)}` : ''}
          </small>
        </>
      ) : (
        <p className="booking-summary-aside__empty">항공편을 선택해 주세요.</p>
      )}
    </section>
  );
}

function BookingSummaryAside({
  inboundSelection,
  isRoundTrip,
  outboundSelection,
  passengers,
}) {
  const selectedFares = [outboundSelection, inboundSelection]
    .filter(Boolean)
    .map((selection) => selection.flight?.fares?.[selection.fareKey])
    .filter(Boolean);
  const isSelectionComplete = Boolean(outboundSelection) && (!isRoundTrip || Boolean(inboundSelection));
  const fareTotal = selectedFares.reduce((total, fare) => total + fare.price, 0);

  return (
    <div className="booking-summary-aside">
      <h2>여정 및 운임</h2>

      <SelectedFlightSummary Icon={PlaneTakeoffIcon} selection={outboundSelection} title="가는편" />

      {isRoundTrip && (
        <SelectedFlightSummary Icon={PlaneLandingIcon} selection={inboundSelection} title="오는편" />
      )}

      <dl className="booking-summary-aside__passengers">
        <h3>
          <UsersGroupIcon size={18} />
          탑승객
        </h3>
        {PASSENGER_LABELS.map((passenger) => (
          <div key={passenger.key}>
            <dt>{passenger.label}</dt>
            <dd>{passengers[passenger.key]}명</dd>
          </div>
        ))}
      </dl>

      <dl className="booking-summary-aside__fare">
        <div>
          <dt>항공운임</dt>
          <dd>{isSelectionComplete ? formatKRW(fareTotal) : '-'}</dd>
        </div>
        <div>
          <dt>세금/제반요금</dt>
          <dd className="is-placeholder">추후 표시</dd>
        </div>
      </dl>

      <div className="booking-summary-aside__total">
        <span>총 금액</span>
        <strong>{isSelectionComplete ? formatKRW(fareTotal) : '-'}</strong>
      </div>

      <button
        className="booking-summary-aside__next"
        type="button"
        disabled={!isSelectionComplete}
      >
        다음 단계
        <ChevronRightIcon size={18} />
      </button>
    </div>
  );
}

export default BookingSummaryAside;
