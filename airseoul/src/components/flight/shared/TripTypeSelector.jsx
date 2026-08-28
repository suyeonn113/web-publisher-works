import { TRIP_TYPES } from '../../../data/flight-service/tripType';

function TripTypeSelector({ className = '', onChange, tripType }) {
  const rootClassName = [
    'flight-service-chips',
    'flight-service-chips--trip',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={rootClassName} role="group" aria-label="여정 유형">
      <button
        aria-pressed={tripType === TRIP_TYPES.ROUND_TRIP}
        className={tripType === TRIP_TYPES.ROUND_TRIP ? 'is-active' : ''}
        type="button"
        onClick={() => onChange(TRIP_TYPES.ROUND_TRIP)}
      >
        왕복
      </button>
      <button
        aria-pressed={tripType === TRIP_TYPES.ONE_WAY}
        className={tripType === TRIP_TYPES.ONE_WAY ? 'is-active' : ''}
        type="button"
        onClick={() => onChange(TRIP_TYPES.ONE_WAY)}
      >
        편도
      </button>
    </div>
  );
}

export default TripTypeSelector;
