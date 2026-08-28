import { useId, useState } from 'react';
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
  onComplete,
  outboundSelection,
  passengers,
}) {
  const detailsId = useId();
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const selectedFares = [outboundSelection, inboundSelection]
    .filter(Boolean)
    .map((selection) => selection.flight?.fares?.[selection.fareKey])
    .filter(Boolean);
  const isSelectionComplete = Boolean(outboundSelection) && (!isRoundTrip || Boolean(inboundSelection));
  const fareTotal = selectedFares.reduce((total, fare) => total + fare.price, 0);
  const requiredSelectionCount = isRoundTrip ? 2 : 1;

  return (
    <div className={`booking-summary-aside${isDetailsExpanded ? ' is-expanded' : ''}`}>
      <h2>선택 내역</h2>

      <button
        aria-label={`선택 내역 ${isDetailsExpanded ? '접기' : '펼치기'}`}
        aria-controls={detailsId}
        aria-expanded={isDetailsExpanded}
        className="booking-summary-aside__toggle"
        type="button"
        onClick={() => setIsDetailsExpanded((isExpanded) => !isExpanded)}
      >
        <span>
          <strong>선택 내역</strong>
          <small>
            {selectedFares.length}/{requiredSelectionCount}편 선택
          </small>
        </span>
        <ChevronRightIcon size={18} />
      </button>

      <div className="booking-summary-aside__details" id={detailsId}>
        <SelectedFlightSummary Icon={PlaneTakeoffIcon} selection={outboundSelection} title="가는편" />

        {isRoundTrip && (
          <SelectedFlightSummary Icon={PlaneLandingIcon} selection={inboundSelection} title="오는편" />
        )}

        <section className="booking-summary-aside__passengers">
          <h3>
            <UsersGroupIcon size={18} />
            탑승객
          </h3>
          <dl>
            {PASSENGER_LABELS.map((passenger) => (
              <div key={passenger.key}>
                <dt>{passenger.label}</dt>
                <dd className={passengers[passenger.key] === 0 ? 'is-empty' : undefined}>
                  {passengers[passenger.key]}명
                </dd>
              </div>
            ))}
          </dl>
        </section>

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
      </div>

      <div className="booking-summary-aside__actions">
        <div className="booking-summary-aside__total">
          <span>총 금액</span>
          <strong>{isSelectionComplete ? formatKRW(fareTotal) : '-'}</strong>
        </div>

        <button
          className="booking-summary-aside__next"
          type="button"
          disabled={!isSelectionComplete}
          onClick={onComplete}
        >
          <span className="booking-summary-aside__next-label-full">선택 완료</span>
          <span className="booking-summary-aside__next-label-short">완료</span>
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}

export default BookingSummaryAside;
